import React, { useState } from 'react';

import UserLayout from 'layout/UserLayout'
import OrderCards from 'component/OrderCards';
import OrderEraseModal from 'component/Modals/OrderErase';

import getServerData from 'util/getServerData';

const UserOrdersPage = () => {

  // load products & user orders
  const { products } = getServerData('/api/products');
  const { orders, mutateOrders } = getServerData('/api/user/orders');

  // handle modal & order delete
  const [ show, setShow ] = useState(false);
  const [ orderId, setOrderId ] = useState(null);

  // common props
  const props = {
    products,
    orders,
    mutateOrders,
    show,
    setShow,
    orderId,
    setOrderId,
  };

  return (
    <UserLayout>
      <OrderCards {...props}/>
      <OrderEraseModal {...props}/>
    </UserLayout>
  );
};

export default UserOrdersPage;
