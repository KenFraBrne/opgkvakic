import * as types from './types.js';
import * as actions from './actions.js';

const reducer = (language, action) => {
  const { type } = action;
  switch(type){
    case(types.SET_HR): return actions.setHR();
    case(types.SET_EN): return actions.setEN();
    case(types.SET_FR): return actions.setFR();
    default: return language;
  };
};

export default reducer;
