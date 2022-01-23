import React, { useContext } from 'react';
import MyAccount from 'templates/Main/Account/MyAccount';
import { Context as UserContext } from 'context/User';

export default function Account() {
  const {
    state: { user, myContents },
  } = useContext(UserContext);
  return <>{user && myContents && <MyAccount />}</>;
}
