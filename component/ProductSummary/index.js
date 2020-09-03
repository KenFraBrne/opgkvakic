import React, { useContext } from 'react';

import { OrderContext } from 'context/Order';

import Table from 'react-bootstrap/Table';

import amountPretty from 'util/amountPretty';

const ProductSummary = ({ products }) => {

  const { order } = useContext(OrderContext);

  // create a verbose order (with amounts and total price)
  let orderVerbose = [];
  for (let [id, amount] of Object.entries(order.products)){
    if (amount>0){
      let product = products.find(product => product._id === id);
      product.amount = amount;
      product.priceTotal = amount * product.price/product.priceUnit;
      orderVerbose.push(product);
    }
  }

  // sort order products by name
  orderVerbose.sort((a, b) => a.name.localeCompare(b.name));

  // calculate total price
  const totalPrice = orderVerbose.reduce((total, product) => total+ +product.priceTotal, 0);

  // table rows
  const tableRows = orderVerbose.map( (product, ind) => {
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
