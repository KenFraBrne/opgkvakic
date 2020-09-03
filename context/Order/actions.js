export const addProduct = (order, id, products) => {
  const product = products.find(product => product._id === id);
  const amount = order.products[id] ? order.products[id] : 0;
  const newAmount =
    ( amount < product.max ) && ( amount < product.total ) ?
    ( ( amount === 0 ) && ( product.min > 0) ?
      amount + product.min :
      amount + product.by ) :
    amount;
  const newOrder = {
    ...order,
    products: {
      ...order.products,
      [id]: newAmount,
    }
  }
  return newOrder;
}

export const subProduct = (order, id, products) => {
  const product = products.find(product => product._id === id);
  const amount = order.products[id] ? order.products[id] : 0;
  const newAmount = 
    ( amount > 0 ) ?
    ( ( amount === product.min ) && ( product.min > 0) ? 
      amount - product.min :
      amount - product.by ) :
    amount;
  const newOrder = {
    ...order,
    products: {
      ...order.products,
      [id]: newAmount,
    }
  }
  if (newAmount === 0){
    delete newOrder.products[id];
  }
  return newOrder;

}

export const setOrder = (order) => {
  return {
    ...order,
  }
}

export const setDelivery = (order, id) => {
  return {
    ...order,
    delivery: id,
  }
}