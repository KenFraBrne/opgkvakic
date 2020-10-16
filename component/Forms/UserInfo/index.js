import React, { useState, useEffect } from 'react';

import { useContext } from 'react';
import { LanguageContext } from 'context/Language';

import FormGroup from 'component/Forms/FormGroup';

import inDeliveryArea from 'util/inDeliveryArea';

function UserInfo({ user, mutateUser, setShow }){
  
  // language
  const { language } = useContext(LanguageContext);
  const content = language.content.component.Forms.UserInfo;

  // group states
  const initGroup = {
    id: null,
    value: '',
    error: 'empty',
    readOnly: false,
    isChosen: true,
    isInvalid: false,
  };
  const emailGroup = useState({ ...initGroup, id: 'email', readOnly: true });
  const usernameGroup = useState({ ...initGroup, id: 'username', readOnly: true });
  const firstGroup = useState({ ...initGroup, id: 'first' });
  const lastGroup = useState({ ...initGroup, id: 'last' });
  const addressGroup = useState({ ...initGroup, id: 'address' });
  const telephoneGroup = useState({ ...initGroup, id: 'telephone' });
  const groupList = [
    usernameGroup,
    emailGroup,
    firstGroup,
    lastGroup,
    addressGroup,
    telephoneGroup,
  ];

  // set group values
  useEffect(() => {
    groupList.forEach( ([ group, setGroup ]) => {
      const id = group.id;
      const value = user[id];
      const newGroup = { ...group, value};
      switch (id){
        case 'username':
        case 'email':
          return setGroup({ ...newGroup, readOnly: true});
        case 'address':
          const value = [
            `${user[id].road} ${user[id].house_number}`,
            user[id].postcode,
            user[id].city,
          ].join(', ');
          return setGroup({ ...newGroup, value});
        default:
          return setGroup(newGroup);
      };
    });
  }, []);

  // form group components to render
  const formGroups = groupList.map( ([ group, setGroup ]) => {
    const { id } = group;
    return <FormGroup {...{
      key: id,
      group,
      setGroup,
    }}/>
  });

  // form submit handler
  const handleFormSubmit = (event) => {
    event.preventDefault();
    return checkEmpty();
  };

  // check if group values are empty
  const checkEmpty = () => {
    const groups = groupList.filter( ([ group, _ ]) => {
      return group.id !== 'username' && group.id !== 'email'
    });
    const isEmpty = groups.some( ([ group, _ ]) => !( group.value?.length > 0 ) );
    if ( isEmpty ) {
      // if yes, set error key & isInvalid
      return groups.forEach( ([ group, setGroup ]) => {
        if ( !( group.value?.length > 0 ) )
          return setGroup({
            ...group,
            error: 'empty',
            isInvalid: true
          });
      });
    } else {
      // if no, check if telephone is ok
      return checkTelephone();
    };
  };

  // check if telephone is ok
  const checkTelephone = () => {
    const [ group, setGroup ] = telephoneGroup;
    const re = /(\b0\d{8,9}\b|\b385\d{8,9}\b)/;
    const isTelephone = re.test(group.value);
    if (!isTelephone) {
      return setGroup({
        ...group,
        error: 'nok',
        isInvalid: true,
      })
    } else {
      return checkChosen();
    }
  };

  // check if address is chosen
  const checkChosen = () => {
    const [ group, setGroup ] = addressGroup;
    const { isChosen } = group;
    // if no, set address click error key
    if ( !isChosen ) {
      return setGroup( {
        ...group,
        error: 'chosen',
        isChosen: false,
        isInvalid: true,
      });
    } else {
      // if yes, check if address is in the delivery zone
      return checkArea();
    }
  };

  // check if address is in delivery area
  const checkArea = async () => {
    const [ group, setGroup ] = addressGroup;
    const { inArea, addressVerbose } = await inDeliveryArea(group.value);
    if (!inArea) {
      // if no, set address area error key
      return setGroup({
        ...group,
        error: 'area',
        isChosen: false,
        isInvalid: true,
      });
    } else {
      // otherwise post it
      return postData(addressVerbose);
    };
  };

  // post data
  const postData = (addressVerbose) => {
    const body = groupList.reduce( (obj, [group, _ ]) => {
      const value = group.id !== 'address' ? group.value : addressVerbose;
      return { ...obj, [group.id]: value };
    }, {});
    fetch('/api/user/update', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    }).then(res => res.json())
      .then(res => {
        // change existing user
        mutateUser({ user: res.user });
        setValidated(true);
        setTimeout(() => {
          setValidated(false)
        }, 1000);
      });
  };

  // form validated state
  const [ validated, setValidated ] = useState(false);

  // render
  return (
    <form
      noValidate
      className={ validated ? "was-validated" : null }
      onSubmit={handleFormSubmit}>
      {formGroups}
      <button
        type="submit"
        className="m-1 btn btn-primary">
        { content.Button.change }
      </button>
      <button
        className="m-1 btn btn-danger"
        onClick={() => setShow(true)}>
        { content.Button.delete }
      </button>
    </form>
  )
}

export default UserInfo;
