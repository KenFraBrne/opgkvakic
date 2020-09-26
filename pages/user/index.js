import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';

import UserLayout from 'layout/UserLayout'
import UserInfoForm from 'component/Forms/UserInfo';
import UserEraseModal from 'component/Modals/UserErase';

import getServerData from 'util/getServerData';

const UserPage = () => {

  const [ show, setShow ] = useState(false);
  const { user, mutateUser } = getServerData('/api/user');
  const props = {
    show,
    setShow,
    user,
    mutateUser,
  };

  return (
    <UserLayout>
      <Container fluid className="py-2 px-3">
        <UserInfoForm {...props}/>
        <UserEraseModal {...props}/>
      </Container>
    </UserLayout>
  );
};

export default UserPage;
