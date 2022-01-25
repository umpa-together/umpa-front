import React, { useContext } from 'react';
import ProfileEdit from 'templates/Main/Account/ProfileEdit';
import StatusBar from 'components/StatusBar';
import ProfileEditProvider from 'providers/profileEdit';
import ScrollProvider from 'providers/scroll';
import { Context as UserContext } from 'context/User';

export default function ({ route }) {
  const { state: user } = useContext(UserContext);
  return (
    <>
      <StatusBar />
      {user && (
        <ScrollProvider>
          <ProfileEditProvider>
            <ProfileEdit signUp={route.params && route.params.signUp} />
          </ProfileEditProvider>
        </ScrollProvider>
      )}
    </>
  );
}
