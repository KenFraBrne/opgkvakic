import React from 'react';

import Table from 'react-bootstrap/Table';

import amountPretty from 'util/amountPretty';
import getServerData from 'util/getServerData';

const ProductSummary = () => {

  // order & products
  const { order } = getServerData('/api/order');
  const { products } = getServerData('/api/products');

  // create a verbose order (with amounts and total price) and sort it
  const _ids = order?.products && Object.keys(order.products);
  const orderVerbose = _ids && products && _ids.map(_id => {
    const product = products.find(product => product._id === _id );
    product.amount = order.products[_id];
    product.priceTotal = product.amount * product.price / product.priceUnit;
    return product;
  }).sort((a, b) => a.name.localeCompare(b.name));

  // calculate total price
  const totalPrice = 
    orderVerbose && 
    orderVerbose.reduce((total, product) => total+ +product.priceTotal, 0) ||
    0;

  // table rows
  const tableRows = orderVerbose && orderVerbose.map( (product, ind) => {
    const amountString = amountPretty(product, product.amount);
    return (
      <tr key={ind}>
        <td>{ind+1}</td>
        <td>{`${product.name} (${product.price}kn/${product.priceUnit === 1 ? '' : product.priceUnit}${product.priceText})`}</td>
        <td>{amountString}</td>
        <td>{product.priceTotal}</td>
      </tr>
    )
  });

  return (

    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th></th>
          <th>Proizvod</th>
          <th>Količina</th>
          <th>Cijena</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
        <tr>
          <th className="text-center" colSpan={3}> Totalna cijena </th>
          <td>{`${totalPrice} kn`}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default ProductSummary;
