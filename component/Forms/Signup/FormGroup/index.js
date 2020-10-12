import React, { useState } from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

export default function FormGroup({ id, group, resetIsInvalid }){

  // id & error 
  const { error, isInvalid } = group;

  // language change
  const { language } = useContext(LanguageContext);
  const content = language.content.component.Forms.Signup.formGroups[id];
  const { placeholder, label } = content;

  // type
  const type = id === 'password' || id === 'email' ? id : 'text';

  // render
  return (
    <div className="form-group">
      <label>{label}</label>
      <input {...{
        id,
        type,
        placeholder,
        required: true,
        className: !isInvalid ? 'form-control' : 'form-control is-invalid',
        onChange: () => resetIsInvalid(id),
      }}/>
      <div className="invalid-feedback">
        { content.feedback[error] }
      </div>
    </div>
  );

}
