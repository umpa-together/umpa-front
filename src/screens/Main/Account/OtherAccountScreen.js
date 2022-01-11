import React from 'react';
import OtherAccount from 'templates/Main/Account/OtherAccount';

export default function OtherAccountScreen({ route }) {
  const { id } = route.params;
  return (
    <>
      <OtherAccount id={id} />
    </>
  );
}
