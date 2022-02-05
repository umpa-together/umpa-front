import React from 'react';
import SignUp from 'templates/Auth/SignUp';
import StatusBar from 'components/StatusBar';
import SignUpProvider from 'providers/signUp';

export default function ({ route }) {
  const { data } = route.params;
  return (
    <>
      <StatusBar />
      <SignUpProvider>
        <SignUp data={data} />
      </SignUpProvider>
    </>
  );
}
