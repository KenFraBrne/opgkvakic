import React, { useContext, useState, useEffect } from 'react';

import { OrderContext } from 'context/Order';
import * as types from 'context/Order/types';

import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Container from 'react-bootstrap/Container';

const TimePicker = ({deliveries, deliveryDay}) => {

  // order context
  const { order, orderDispatch } = useContext(OrderContext);

  // delivery time state
  const [ deliveryTime, setDeliveryTime ] = useState(null);
  
  // set delivery time if it exists in order
  useEffect(() => {
    if (order.delivery) {
      const id = order.delivery;
      const delivery = deliveries.find(delivery => delivery.id === id);
      let date = new Date(delivery.from);
      setDeliveryTime(date);
    }
  }, [])

  // delivery time dropdown items
  const dropdownItems = !deliveryDay ? null :
    deliveries.filter( delivery => {
      let date = new Date(delivery.from);
      date.setHours(0);
      return deliveryDay.getTime() === date.getTime();
    }).sort((a, b) => (
      a.from - b.from
    )).map( delivery => {
      const date = new Date(delivery.from);
      return (
        <DropdownItem
          onSelect={() => selectDeliveryTime(delivery.id)}
          key={delivery.id}>
          {date.toLocaleTimeString()}
        </DropdownItem>
      )
    });

  // select delivery time & set delivery in order
  const selectDeliveryTime = (id) => {
    const delivery = deliveries.find(delivery => delivery.id === id);
    const date = new Date(delivery.from);
    orderDispatch({
      type: types.SET_DELIVERY,
      deliveryId: id,
    });
    setDeliveryTime(date);
  };
  
  // dropdown title
  let dropdownTitle = "Izaberite vrijeme dostave";
  if (deliveryTime) {
    const date = new Date(deliveryTime.getTime());
    date.setHours(0);
    if (date.getTime() === deliveryDay.getTime()) {
      dropdownTitle = deliveryTime.toLocaleTimeString();
    }
  };

  return (
    <DropdownButton
      variant="outline-dark"
      disabled={!deliveryDay}
      title={dropdownTitle}>
      {dropdownItems}
    </DropdownButton>
  );
}

export default TimePicker;
