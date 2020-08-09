import * as types from './types.js';
import * as actions from './actions.js';

const reducer = (order, action) => {
  const id = action.id;
  const products = action.products;
  const localOrder = action.localOrder;
  switch(action.type){
    case(types.ADD_PRODUCT): return actions.addProduct(order, id, products);
    case(types.SUB_PRODUCT): return actions.subProduct(order, id, products);
    case(types.SET_ORDER): return actions.setOrder(localOrder);
    default: return order;
  }
};

export default reducer;
