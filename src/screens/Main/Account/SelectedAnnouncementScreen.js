import React from 'react';
import StatusBar from 'components/StatusBar';
import SelectedAnnouncement from 'templates/Main/Account/SelectedAnnouncement';

export default function ({ route }) {
  const { title, time, content } = route.params;

  return (
    <>
      <StatusBar />
      <SelectedAnnouncement title={title} time={time} content={content} />
    </>
  );
}
