import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

import UserLayout from 'layout/UserLayout'

import getServerData from 'util/getServerData';

const UserOrdersPage = () => {

  const { orders } = getServerData('/api/user/orders');

  const orderCards = orders && orders.map( ( order, ind ) => {

    const date = new Date(order.date);
    const { amount, name, price, unit, text } = order;

    const total = amount.reduce((tot, val, i) => tot+val*price[i]/unit[i], 0);
    const cardHead = 
      <div>
        <b>{ `${ind+1}. Narudžba` }</b> <br/>
        {`Cijena: ${total} kn`} <br/>
        {`Datum: ${date.toLocaleDateString()}`} <br/>
      </div>;


    const tableRows = order.amount.map( (val, ind) =>{
      const total = amount[ind]*price[ind]/unit[ind];
      return (
        <tr key={ind}>
          <td>{ind+1}</td>
          <td>{`${name[ind]} (${price[ind]}kn/${unit[ind] === 1 ? '' : unit[ind]}${text[ind]})`}</td>
          <td>{`${amount[ind]} ${text[ind]}`}</td>
          <td>{total}</td>
        </tr>
      )
    });

    const cardBody =
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
            <td>{`${total} kn`}</td>
          </tr>
        </tbody>
      </Table>;

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
          <Card.Body>{cardBody}</Card.Body>
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
