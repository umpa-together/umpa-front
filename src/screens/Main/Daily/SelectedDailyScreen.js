import React from 'react';
import StatusBar from 'components/StatusBar';
import SelectedDaily from 'templates/Main/Daily/SelectedDaily';

export default function ({ route }) {
  const { post } = route.params;

  return (
    <>
      <StatusBar />
      <SelectedDaily post={post} />
    </>
  );
}
