import React, { useState, useEffect, useRef } from 'react';

import suggestAddreses from 'util/suggestAddresses';

export default function FormGroup({ group, setGroup, content }){

  // group values 
  const { id, value, error, isInvalid } = group;

  // form values
  const { label, placeholder, feedback } = content;

  // addresses debounce states
  const [ timer, setTimer ] = useState(null);
  const [ addresses, setAddresses ] = useState([]);

  // spinner show state
  const [ show, setShow ] = useState(false);

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

  // handle onChange
  const handleOnChange = (event) => {
    const { id, value } = event.currentTarget;
    setGroup({
      ...group,
      value,
      isChosen: false,
      isInvalid: false,
    });
    if (id === 'address') getAddresses(value);
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
      setGroup({
        ...group,
        isChosen: true,
        value: event.target.textContent,
      });
    };
    setAddresses([]);
  };

  // add click event for choosing address
  useEffect(() => {
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);

  // spinner ( when loading addresses )
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
        value,
        placeholder,
        required: true,
        type: id === 'password' || id === 'email' ? id : 'text',
        className: isInvalid ? 'form-control is-invalid' : 'form-control',
        onChange: (event) => handleOnChange(event),
      }}/>
      <div className="invalid-feedback">
        { feedback[error] }
      </div>
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
