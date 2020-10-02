import React from 'react';

import Table from 'react-bootstrap/Table';

import amountPretty from 'util/amountPretty';
import getServerData from 'util/getServerData';

const ProductSummary = ({ order, products, language }) => {
  // language change
  const lang = language.lang;
  const content = language.content.component.ProductSummary;
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
    const amountString = amountPretty({ product, amount, lang });
    return (
      <tr key={ind}>
        <td>{`${name[lang] || name} (${price}kn/${priceUnit === 1 ? '' : priceUnit}${priceText[lang] || priceText})`}</td>
        <td>{amountString}</td>
        <td>{amount*price/priceUnit + ' kn'}</td>
      </tr>
    )
  });
  // render
  return (
    <Table
      striped
      bordered
      responsive
      className="text-nowrap">
      <thead>
        <tr>
          <th>{ content.thead.article }</th>
          <th>{ content.thead.quantity }</th>
          <th>{ content.thead.price }</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
        <tr>
          <th colSpan={2} className="text-center"> { content.tbody } </th>
          <td>{`${totalPrice} kn`}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default ProductSummary;
