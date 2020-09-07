import * as types from './types.js';
import * as actions from './actions.js';

const reducer = (order, action) => {

  const {
    type,
    products,
    productId,
    savedOrder,
    deliveryId,
  } = action;

  switch(type){
    case(types.ADD_PRODUCT): return actions.addProduct(order, productId, products);
    case(types.SUB_PRODUCT): return actions.subProduct(order, productId, products);
    case(types.SET_ORDER): return actions.setOrder(savedOrder);
    case(types.SET_DELIVERY): return actions.setDelivery(order, deliveryId);
    default: return order;
  }
};

export default reducer;
