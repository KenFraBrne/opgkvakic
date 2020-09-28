import React, { createContext, useReducer } from 'react';

import reducer from './reducer.js';

// set initial language based on browser
function getLanguage (lang){
  switch (lang){
    case 'en': return { lang, content: require('data/langEN.json') };
    case 'fr': return { lang, content: require('data/langFR.json') };
    default: return { lang, content: require('data/langHR.json') };
  };
}
const lang = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[0];
const initialLanguage = getLanguage(lang);

// language context
const LanguageContext = React.createContext({
  language: initialLanguage,
  languageDispatch: () => {},
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
