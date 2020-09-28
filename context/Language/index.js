import React, { createContext, useReducer } from 'react';

import reducer from './reducer.js';
import * as actions from './actions.js';

// set initial language based on browser
function getLanguage (lang){
  switch (lang){
    case 'en': return actions.setEN();
    case 'fr': return actions.setFR();
    default:  return actions.setHR();
  };
}
const lang = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[0];
const initialLanguage = getLanguage(lang);

// language context
const LanguageContext = React.createContext({
  language: initialLanguage,
  languageDispatch: ({ type }) => {},
});

// language provider
const LanguageProvider = ({ children }) => {
  const [ language, languageDispatch ] = useReducer(reducer, initialLanguage);
  return (
    <LanguageContext.Provider value={ { language, languageDispatch } }>
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, LanguageProvider };
