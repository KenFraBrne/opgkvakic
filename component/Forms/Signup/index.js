import React, { useState, useEffect } from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import { FormGroup } from 'component/Forms/FormGroup';

import { inDeliveryArea } from 'util/addressAutocomplete';

export default function Signup({ setStatus }){

  // language change
  const { language } = useContext(LanguageContext);
  const content = language.content.component.Forms.Signup;

  // group states
  const initGroup = {
    id: null,
    value: '',
    error: 'empty',
    isChosen: false,
    isInvalid: false,
  };
  const emailGroup = useState({ ...initGroup, id: 'email' });
  const usernameGroup = useState({ ...initGroup, id: 'username' });
  const passwordGroup = useState({ ...initGroup, id: 'password' });
  const addressGroup = useState({ ...initGroup, id: 'address' });
  const groupList = [
    usernameGroup,
    passwordGroup,
    emailGroup,
    addressGroup,
  ];

  // form group components to render
  const formGroups = groupList.map( ([ group, setGroup ]) => {
    const id = group.id;
    return <FormGroup {...{
      key: id,
      group,
      setGroup,
    }}/>
  });

  // handle form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    return checkEmpty();
  };

  // check if group values are empty
  const checkEmpty = () => {
    const isEmpty = groupList.some( ([ group, _ ]) => group.value.length === 0 );
    if ( isEmpty ) {
      // if yes, set error key & isInvalid
      return groupList.forEach( ([ group, setGroup ]) => {
        if (group.value.length === 0) {
          setGroup({
            ...group,
            error: 'empty',
            isInvalid: true
          });
        };
      });
    } else {
      // if no, check if address is chosen
      return checkChosen();
    };
  };

  // check if address is chosen
  const checkChosen = () => {
    const [ group, setGroup ] = addressGroup;
    const { isChosen } = group;
    // if no, set address click error key
    if ( !isChosen ) {
      return setGroup( {
        ...group,
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
    const [ group, setGroup ] = addressGroup;
    const { inArea, addressVerbose } = await inDeliveryArea(group.value);
    if (!inArea) {
      // if no, set address area error key
      return setGroup({
        ...group,
        error: 'area',
        isChosen: false,
        isInvalid: true,
      });
    } else {
      // otherwise post it
      return postData(addressVerbose);
    };
  };

  // post data
  const postData = (addressVerbose) => {
    const entries = groupList.map( ([ group, _ ]) => [group.id, group.value]);
    const body = {
      ...Object.fromEntries(entries),
      address: addressVerbose,
      lang: language.lang,
    };
    const promise = fetch('/api/user/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });
    return resolveFetch(promise);
  };

  // resolve based on fetch promise response
  const resolveFetch = (promise) => {
    return promise.then( res => {
      switch (res.status) {
        case 201: // OK
        case 500: // Registration error
        case 503: // Verification email error
        case 511: // Signup required
          setValidated(true);
          return setTimeout(() => setStatus(res.status), 500);
        case 400: // Email not good
        case 403: // Email exists
        default:
          const [ group, setGroup ] = emailGroup;
          return setGroup({
            ...group,
            error: res.status,
            isInvalid: true
          });
      };
    });
  };

  // form validated state
  const [ validated, setValidated ] = useState(false);

  // render
  return (
    <form
      noValidate
      className={ validated ? "was-validated" : "" }
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
