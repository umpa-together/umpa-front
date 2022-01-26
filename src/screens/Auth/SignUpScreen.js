import React from 'react';
import SignUp from 'templates/Auth/SignUp';
import StatusBar from 'components/StatusBar';
import SignUpProvider from 'providers/signUp';

export default function () {
  return (
    <>
      <StatusBar />
      <SignUpProvider>
        <SignUp />
      </SignUpProvider>
    </>
  );
}
