import React, { useState, useRef } from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import FormGroup from 'component/Forms/Signup/FormGroup';

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
  const initGroups = ids.reduce( ( obj, id ) => {
    obj[id] = {
      error: 'empty',
      isInvalid: false,
    };
    return obj;
  }, {});
  const [ groups, setGroups ] = useState(initGroups);

  // set feedback error
  const setError = (id, error) => {
    groups[id].isInvalid = true;
    groups[id].error = error;
    setGroups({...groups});
  };

  // reset isInvalid
  const resetIsInvalid = (id) => {
    groups[id].isInvalid = false;
    setGroups({...groups});
  };

  // form groups
  const formGroups = ids.map( id => {
    const group = groups[id];
    return <FormGroup {...{
      id,
      group,
      key: id,
      resetIsInvalid
    }}/>
  });

  // handle form submit
  const handleFormSubmit = async (event) => {

    // prevent default behaviour
    event.preventDefault();

    // return if some values are empty
    const form = event.currentTarget;
    const isEmpty = ids.some( id => form[id].value.length === 0 );
    if ( isEmpty  ) {
      return ids.forEach( id => form[id].value.length === 0 && setError(id, 'empty'));
    } else {

      // otherwise post info
      const entries = ids.map( id => [ id, form[id].value ] );
      const body = {
        username: form.username.value,
        password: form.password.value,
        email: form.email.value,
        lang: language.lang,
      };
      const res = await fetch('/api/user/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      });

      // and resolve based on status
      switch (res.status) {
        case 201: // OK
        case 500: // Registration error
        case 503: // Verification email error
        case 511: // Signup required
          return setTimeout(() => setStatus(res.status), 500);
        case 400: // Email not good
        case 403: // Email exists
        default:
          return setError('email', res.status);
      };

    };
  };

  // render
  return (
    <form
      noValidate
      onSubmit={handleFormSubmit}>
      { formGroups }
      <button
        type="submit"
        className="mr-3 btn-primary">
        { content.Button }
      </button>
    </form>
  );
}
