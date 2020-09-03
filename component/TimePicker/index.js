import React, { useContext, useState, useEffect } from 'react';

import { OrderContext } from 'context/Order';
import * as types from 'context/Order/types';

import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Container from 'react-bootstrap/Container';

import getFloorDate from 'util/getFloorDate';
import fromUntilString from 'util/fromUntilString';

const TimePicker = ({deliveries, deliveryDay}) => {

  // order context
  const { order, orderDispatch } = useContext(OrderContext);

  // delivery time state
  const [ deliveryWin, setDeliveryWin ] = useState(null);
  
  // set delivery time if it exists in order
  useEffect(() => {
    if (order.delivery) {
      const delivery = deliveries.find(delivery => delivery._id === order.delivery);
      let date = new Date(delivery.from);
      setDeliveryWin(date);
    };
  }, [])

  // delivery time dropdown items
  const dropdownItems = !deliveryDay ? null :
    deliveries.filter( delivery => {
      const date = getFloorDate(delivery.from);
      return deliveryDay.getTime() === date.getTime();
    }).sort((a, b) => (
      a.from - b.from
    )).map( delivery => {
      const date = new Date(delivery.from);
      return (
        <DropdownItem
          onSelect={() => selectDeliveryTime(delivery._id)}
          key={delivery._id}>
          {fromUntilString(delivery)}
        </DropdownItem>
      )
    });

  // select delivery time & set delivery in order
  const selectDeliveryTime = (id) => {
    const delivery = deliveries.find(delivery => delivery._id === id);
    const date = new Date(delivery.from);
    orderDispatch({
      type: types.SET_DELIVERY,
      deliveryId: id,
    });
    setDeliveryWin(date);
  };
  
  // dropdown title
  let dropdownTitle = "Izaberite vrijeme dostave";
  if (deliveryWin && deliveryDay.getTime() === getFloorDate(deliveryWin).getTime()) {
    const delivery = deliveries.find(delivery => (new Date(delivery.from)).getTime() === deliveryWin.getTime());
    dropdownTitle = fromUntilString(delivery);
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
