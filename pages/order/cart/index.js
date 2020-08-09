import React, { useContext, useState, useEffect } from 'react';

import { OrderContext } from 'context/Order';

import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import MainLayout from 'layout/MainLayout';
import DeliveryPicker from 'component/DeliveryPicker';

import amountPretty from 'util/amountPretty';

const CartPage = ({products, deliveries}) => {

  const { order, orderDispatch } = useContext(OrderContext);

  const [ orderDate, setOrderDate ] = useState(null);

  // create verbose order
  let orderVerbose = [];
  for (let [id, amount] of Object.entries(order.products)){
    if (amount>0){
      let product = products.find(product => product.id === id);
      product.amount = amount;
      product.priceTotal = amount * product.price/product.priceUnit;
      orderVerbose.push(product);
    }
  }

  // sort the order by name
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

  // order times
  const orderTimes = deliveries
    .filter(delivery => {
      const day = new Date(delivery.from);
      day.setHours(0);
      return day.getTime() === (orderDate ? orderDate.getTime() : false);
    }).map(delivery => {
      const options = {hour: 'numeric'};
      const from = (new Date(delivery.from)).toLocaleString([], options);
      const to = (new Date(delivery.until)).toLocaleString([], options);
      return (
        <DropdownItem key={delivery.id}>
          {from + ' - ' + to}
        </DropdownItem>
      )
    });

  return (
    <MainLayout>
      <Container fluid style={{maxWidth: 650}}>

        <h1> Vaša narudžba </h1> <br/>

        <h4> Detalji: </h4>

        <Table striped bordered hover size="sm" className="my-3">
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

        <Container fluid className="d-flex px-0 py-2">
          <div className="h4 pr-3">Dostava:</div>
          <div>
            <DeliveryPicker
              setOrderDate={(date) => setOrderDate(date)}
              orderDate={orderDate}
              deliveries={deliveries}/>
          </div>
        </Container>

        <Container fluid className="d-flex px-0 py-2">
          <div className="h4 pr-3">Vrijeme:</div>
          <div>
            <DropdownButton
              disabled={ !orderDate ? true : false}
              variant="outline-dark"
              title={ !order.delivery ? 'blu' : "Izaberite vrijeme dostave" }>
              {orderTimes}
            </DropdownButton>
          </div>
        </Container>

      </Container>
    </MainLayout>

  );
}

export async function getStaticProps(){
  let products = await require('data/products.json');
  let deliveries = await require('data/deliveries.json');
  return {
    props: {
      products: products,
      deliveries: deliveries,
    }
  }
}

export default CartPage;
