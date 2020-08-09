import * as types from './types.js';
import * as actions from './actions.js';

const reducer = (order, action) => {

  const type = action.type;
  const products = action.products;
  const productId = action.productId;
  const localOrder = action.localOrder;
  const deliveryId = action.deliveryId;

  switch(type){
    case(types.ADD_PRODUCT): return actions.addProduct(order, productId, products);
    case(types.SUB_PRODUCT): return actions.subProduct(order, productId, products);
    case(types.SET_ORDER): return actions.setOrder(localOrder);
    case(types.SET_DELIVERY): return actions.setDelivery(order, deliveryId);
    default: return order;
  }
};

export default reducer;
