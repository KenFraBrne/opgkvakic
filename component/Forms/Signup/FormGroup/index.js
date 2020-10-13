import React, { useState, useEffect, useRef } from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import suggestAddreses from 'util/suggestAddresses';

export default function FormGroup({ group, setError, setValue, resetInvalid }){

  // group values 
  const { id, value, error, isInvalid } = group;

  // language change
  const { language } = useContext(LanguageContext);
  const content = language.content.component.Forms.Signup.formGroups[id];
  const { placeholder, label } = content;

  // type
  const type = id === 'password' || id === 'email' ? id : 'text';
  
  // handle onChange
  const handleOnChange = (event) => {
    const { id, value } = event.currentTarget;
    setValue( id, value );
    if ( isInvalid ) resetInvalid(id);
    if (id === 'address') getAddresses(value);
  };

  // address debounce states
  const [ timer, setTimer ] = useState(null);
  const [ addresses, setAddresses ] = useState([]);

  // get adresses
  const getAddresses = (value) => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      suggestAddreses(value)
        .then(res => res.json())
        .then(res => {
          const { suggestions } = res;
          setAddresses(suggestions.map( suggestion => suggestion.text ));
        })
        .catch(() => setAddresses([]));
    }, 1000);
    setTimer(newTimer);
  };

  // autocomplete results
  const autocomplete = addresses.map( ( address, i ) =>
    <button
      key={i}
      type="button"
      className="list-group-item list-group-item-action">
      { address }
    </button>
  );

  // set address if clicked on
  const target = useRef(null);
  const click = (event) => {
    const isInside = target.current.contains(event.target);
    if (isInside) setValue('address', event.target.textContent);
    setAddresses([]);
  };

  // add click event for choosing address
  useEffect(() => {
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);

  // render
  return (
    <div className="form-group w-100">
      <label>{ label }</label>
      <input {...{
        id,
        type,
        value,
        placeholder,
        required: true,
        className: isInvalid ? 'form-control is-invalid' : 'form-control',
        onChange: (event) => handleOnChange(event),
      }}/>
      <div className="invalid-feedback">{ content.feedback[error] } </div>
      <div
        ref={target}
        style={{ zIndex: 99 }}
        className="position-relative">
        <ul className="list-group position-absolute w-100" >
          { autocomplete }
        </ul>
      </div>
    </div>
  );

}
