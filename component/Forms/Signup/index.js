import React, { useState } from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import FormGroup from 'component/Forms/Signup/FormGroup';

import searchAddress from 'util/searchAddress';
import inPolygon from 'util/inPolygon';

export default function Signup({ setStatus }){

  // language change
  const { language } = useContext(LanguageContext);
  const content = language.content.component.Forms.Signup;

  // group control ids
  const ids = [
    'username',
    'password',
    'email',
    'address',
  ];

  // groups' state
  const initGroups = ids.map( id => ({
    id,
    value: '',
    error: 'empty',
    isChosen: false,
    isInvalid: false,
  }));
  const [ groups, setGroups ] = useState(initGroups);

  // set group function
  const setGroup = ( id, obj ) => {
    const group = groups.find( group => group.id === id );
    setGroups([
      ...groups.filter( group => group.id !== id ),
      Object.assign( group, obj ),
    ]);
  };

  // form group components to render
  const formGroups = ids.map( id => {
    const group = groups.find(group => group.id === id);
    return <FormGroup {...{
      group,
      key: id,
      setGroup
    }}/>
  });

  // handle form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    return checkEmpty();
  };

  // check if group values are empty
  const checkEmpty = () => {
    const isEmpty = groups.some( group => group.value.length === 0 );
    if ( isEmpty ) {
      // if yes, set error key & isInvalid
      const newGroups = groups.map( group => {
        if ( group.value.length === 0 ) return {...group, error: 'empty', isInvalid: true }
        else return {...group}
      });
      return setGroups(newGroups);
    } else {
      // if no, check if address is chosen
      return checkChosen();
    };
  };

  // check if address is chosen
  const checkChosen = () => {
    const { isChosen } = groups.find( group => group.id === 'address' );
    if ( !isChosen ) {
      // if no, set address click error key
      return setGroup( 'address', {
        error: 'chosen',
        isChosen: false,
        isInvalid: true,
      });
    } else {
      // if yes, check if address is in the delivery zone
      return checkArea();
    }
  };

  // check if address is in delivery area
  const checkArea = async () => {
    const { value } = groups.find( group => group.id === 'address' );
    const [ address ] = await searchAddress(value).then(res => res.json());
    const [ polygon ] = require('data/area.json').geometry.coordinates;
    const point = [
      Number(address.lon),
      Number(address.lat),
    ];
    const inArea = inPolygon(point, polygon);
    if (!inArea) {
      return setGroup( 'address', {
        error: 'area',
        isChosen: false,
        isInvalid: true,
      })
    } else {
      return postBody();
    };
  };

  // post groups data
  const postBody = () => {
    console.log('jesmo tu?');
    return;
    const entries = groups.map( group => [ group.id, group.value ] );
    const body = {
      ...Object.fromEntries(entries),
      lang: language.lang,
    };
    const promise = fetch('/api/user/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });
    return resolveFetch(promise);
  }

  // resolve based on fetch promise response
  const resolveFetch = (promise) => {
    return promise.then( res => {
      switch (res.status) {
        case 201: // OK
        case 500: // Registration error
        case 503: // Verification email error
        case 511: // Signup required
          return setTimeout(() => setStatus(res.status), 500);
        case 400: // Email not good
        case 403: // Email exists
        default:
          return setGroup('email', { error: res.status, isInvalid: true });
      };
    });
  };

  // render
  return (
    <form
      noValidate
      onSubmit={handleFormSubmit}>
      { formGroups }
      <button
        type="submit"
        className="mr-3 btn btn-primary">
        { content.Button }
      </button>
    </form>
  );
}
