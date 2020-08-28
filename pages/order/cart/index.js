import React, { useContext, useState } from 'react';

import { OrderContext } from 'context/Order';

import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Container from 'react-bootstrap/Container';

import MainLayout from 'layout/MainLayout';
import ProductSummary from 'component/ProductSummary';
import DatePicker from 'component/DatePicker';
import TimePicker from 'component/TimePicker';

import amountPretty from 'util/amountPretty';

const CartPage = ({products, deliveries}) => {

  // order date & time variables
  const [ orderDate, setOrderDate ] = useState(null);
  const [ orderTime, setOrderTime ] = useState(null);

  return (
    <MainLayout>
      <Container fluid style={{maxWidth: 650}}>

        <h1> Vaša narudžba </h1>

        <br/>

        <h4> Detalji: </h4>

        <ProductSummary products={products}/>

        <DatePicker
          setOrderDate={(date) => setOrderDate(date)}
          orderDate={orderDate}
          deliveries={deliveries}/>

        {/* <Container fluid className="d-flex px-0 py-2"> */}
        {/*   <div className="h4 pr-3">Vrijeme:</div> */}
        {/*   <div> */}
        {/*     <DropdownButton */}
        {/*       variant="outline-dark" */}
        {/*       disabled={ !!order.delivery ? false : true} */}
        {/*       title={ !order.delivery ?  "Izaberite vrijeme dostave" : dropdownTitle()}> */}
        {/*       {orderTimes} */}
        {/*     </DropdownButton> */}
        {/*   </div> */}
        {/* </Container> */}

      </Container>
    </MainLayout>

  );
}

export async function getServerSideProps(){
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
