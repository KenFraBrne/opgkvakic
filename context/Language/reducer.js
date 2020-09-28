import * as types from './types.js';
import * as actions from './actions.js';

const reducer = (language, action) => {
  const { type } = action;
  switch(type){
    case(types.SET_HR): return actions.setLanguage('data/langHR.json');
    case(types.SET_EN): return actions.setLanguage('data/langEN.json');
    case(types.SET_FR): return actions.setLanguage('data/langFR.json');
    default: return language;
  };
};

export default reducer;
