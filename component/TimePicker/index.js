import React, { useState, useEffect } from 'react';

import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Container from 'react-bootstrap/Container';

import getFloorDate from 'util/getFloorDate';
import getServerData from 'util/getServerData';
import fromUntilString from 'util/fromUntilString';

const TimePicker = ({ deliveryDay }) => {

  const { order, mutateOrder } = getServerData('/api/order');
  const { deliveries } = getServerData('/api/deliveries');
  
  // set delivery time if it exists in order
  useEffect(() => {
    if (order?.delivery && deliveries) {
      const delivery = deliveries.find(delivery => delivery._id === order.delivery);
      let date = new Date(delivery?.from);
      setDeliveryWin(date);
    };
  }, [order, deliveries])

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
  
  // changeDelivery
  const changeDelivery = async (_id) => {
    let newOrder = {
      ...order,
      delivery: _id,
    };
    mutateOrder({ order: newOrder }, false);
    await fetch('/api/order', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newOrder),
    });
    mutateOrder();
  };

  // select delivery time & set delivery in order
  const selectDeliveryTime = (_id) => {
    const delivery = deliveries.find(delivery => delivery._id === _id);
    const date = new Date(delivery.from);
    changeDelivery(_id);
    setDeliveryWin(date);
  };

  // dropdown title
  const [ deliveryWin, setDeliveryWin ] = useState(null);
  let dropdownTitle = "Izaberite vrijeme dostave";
  if (deliveryWin && deliveryDay && deliveryDay.getTime() === getFloorDate(deliveryWin).getTime()) {
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
