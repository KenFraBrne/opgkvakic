import React, { useState } from 'react';

import Accordion from 'react-bootstrap/Accordion';

import OrderCard from 'component/OrderCards/OrderCard';

import getServerData from 'util/getServerData';

export default function OrderCards({ orders, products, setOrderId, setShow }){

  // handle chevrons
  const [isDown, setIsDown] = useState( Array(50).fill(true) );
  const handleUpDown = (ind) => {
    const down = Array(isDown.length).fill(true);
    if (isDown[ind]) down[ind] = false;
    setIsDown(down);
  };

  // handle trash click
  const handleTrashClick = (_id) => {
    setOrderId(_id);
    setShow(true);
  };
  
  // order cards
  const orderCards = orders?.map( (order, ind) => {
    const props = {
      ind,
      order,
      isDown,
      products,
      handleUpDown,
      handleTrashClick,
    };
    return <OrderCard key={ind} {...props}/>
  });

  // render
  return (
    <Accordion className="p-3">
      { orders?.length ? orderCards.reverse() : <h3> Trenutno nemate narudžbi </h3> }
    </Accordion>
  )
}
