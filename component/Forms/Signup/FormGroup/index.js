import React, { useState, useEffect, useRef } from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import suggestAddreses from 'util/suggestAddresses';

export default function FormGroup({ group, setGroup }){

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
    setGroup( id, { value, isChosen: false } );
    if ( isInvalid ) setGroup( id, { isInvalid: false } );
    if (id === 'address') getAddresses(value);
  };

  // address debounce states
  const [ timer, setTimer ] = useState(null);
  const [ addresses, setAddresses ] = useState([]);

  // get adresses
  const getAddresses = (value) => {
    setShow(true);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      suggestAddreses(value)
        .then(res => res.json())
        .then(res => {
          setShow(false);
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

  // set address if chosen
  const target = useRef(null);
  const click = (event) => {
    const isInside = target.current.contains(event.target);
    if (isInside) {
      setGroup('address', {
        value: event.target.textContent,
        isChosen: true,
      });
    };
    setAddresses([]);
  };

  // add click event for choosing address
  useEffect(() => {
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);

  // show spinner when loading address
  const [ show, setShow ] = useState(false);
  const spinner = (
    <li className="list-group-item text-center">
      <div className="spinner-border" role="status"/>
    </li>
  );

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
          { show && id === "address" ? spinner : autocomplete }
        </ul>
      </div>
    </div>
  );

}
