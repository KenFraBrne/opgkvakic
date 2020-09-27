import React from 'react';

import Table from 'react-bootstrap/Table';

import amountPretty from 'util/amountPretty';
import getServerData from 'util/getServerData';

const ProductSummary = ({ order, products }) => {

  // create verbose products (with amounts) and sort it
  const productsVerbose = order?.products?.map( product => {
    return {
      ...product,
      ...products?.find(prod => prod._id == product._id ),
    };
  });

  // calculate total price
  const totalPrice = products && productsVerbose.reduce((total, product) => {
    const { amount, price, priceUnit } = product;
    return total + amount*price/priceUnit;
  }, 0);

  // table rows
  const tableRows = products && productsVerbose.map( (product, ind) => {
    const { name, amount, price, priceText, priceUnit } = product;
    const amountString = amountPretty(product, amount);
    return (
      <tr key={ind}>
        <td>{`${name} (${price}kn/${priceUnit === 1 ? '' : priceUnit}${priceText})`}</td>
        <td>{amountString}</td>
        <td>{amount*price/priceUnit + ' kn'}</td>
      </tr>
    )
  });

  return (

    <Table
      striped
      bordered
      responsive
      className="text-center">
      <thead>
        <tr>
          <th>Proizvod</th>
          <th>Količina</th>
          <th>Cijena</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
        <tr>
          <th colSpan={2}> Totalna cijena </th>
          <td>{`${totalPrice} kn`}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default ProductSummary;
