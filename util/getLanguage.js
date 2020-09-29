import * as actions from 'context/Language/actions';
export default function getLanguage(lang){
  switch (lang){
    case "en": return actions.setEN();
    case "fr": return actions.setFR();
    default:   return actions.setHR();
  };
};
