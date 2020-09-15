import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import UserLayout from 'layout/UserLayout'
import ProductSummary from 'component/ProductSummary';

import getServerData from 'util/getServerData';

const UserOrdersPage = () => {

  const { orders } = getServerData('/api/user/orders');
  const { deliveries } = getServerData('/api/deliveries');
  const { products } = getServerData('/api/products');

  const orderCards = orders?.map( ( order, ind ) => {

    // get delivery date
    const from = deliveries?.find( delivery => delivery._id === order.delivery )?.from;
    const date = new Date(from);

    // calculate total price
    const total = order?.products?.reduce( (total, orderedProduct) => {
      const product = products?.find(product => product._id === orderedProduct._id);
      return total+orderedProduct?.amount*product?.price/product?.priceUnit;
    }, 0);

    const cardHead = 
      <div>
        <b>{ `${ind+1}. Narudžba` }</b> <br/>
        {`Cijena: ${total} kn`} <br/>
        {`Datum: ${from && date.toLocaleDateString()}`} <br/>
      </div>;

    const cardBody = <ProductSummary order={order}/>;

    return (
      <Card
        key={order._id}
        className="mb-2 border-bottom">
        <Accordion.Toggle
          as={Card.Header}
          eventKey={ind.toString()}>
          {cardHead}
        </Accordion.Toggle>
        <Accordion.Collapse
          eventKey={ind.toString()}>
          <Card.Body>
            {cardBody}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  });

  return (
    <UserLayout>
      <Accordion className="m-3">
        {orderCards || <h3> Trenutno nemate narudžbi </h3>}
      </Accordion>
    </UserLayout>
  );
};

export default UserOrdersPage;
