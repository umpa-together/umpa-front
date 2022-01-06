import React from 'react';
import ProfileEdit from 'templates/Main/Account/ProfileEdit';
import StatusBar from 'components/StatusBar';
import ProfileEditProvider from 'providers/profileEdit';
import ScrollProvider from 'providers/scroll';

export default function () {
  return (
    <>
      <StatusBar />
      <ScrollProvider>
        <ProfileEditProvider>
          <ProfileEdit />
        </ProfileEditProvider>
      </ScrollProvider>
    </>
  );
}
