import React from 'react';

import { OrderContext } from 'context/Order';
import * as types from 'context/Order/types';

import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Container from 'react-bootstrap/Container';

const TimePicker = ({products, deliveries}) => {

  const { order, orderDispatch } = useContext(OrderContext);

  // save order locally
  useEffect(() => {
    const localOrderJSON = JSON.stringify(order)
    localStorage.setItem('localOrder', localOrderJSON);
  }, [order]);

  // order time handler
  const setOrderDeliveryHandler = (id) => {
    orderDispatch({
      type: types.SET_DELIVERY,
      deliveryId: id,
    });
  };

  // dropdown title
  const dropdownTitle = () => {
    const delivery = deliveries.find(delivery => delivery.id == order.delivery);
    const options = {hour: 'numeric'};
    const from = (new Date(delivery.from)).toLocaleString([], options);
    const to = (new Date(delivery.until)).toLocaleString([], options);
    return from + '-' + to;
  };

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
        <DropdownItem
          key={delivery.id}
          onClick={() => setOrderDeliveryHandler(delivery.id)}>
          {from + ' - ' + to}
        </DropdownItem>
      )
    });


  return (
    <Container fluid className="d-flex px-0 py-2">
      <div className="h4 pr-3">Vrijeme:</div>
      <div>
        <DropdownButton
          variant="outline-dark"
          disabled={ !!order.delivery ? false : true}
          title={ !order.delivery ?  "Izaberite vrijeme dostave" : dropdownTitle()}>
          {orderTimes}
        </DropdownButton>
      </div>
    </Container>
  );
}

export default TimePicker;
