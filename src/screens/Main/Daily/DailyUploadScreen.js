import React from 'react';
import DailyUpload from 'templates/Main/Daily/DailyUpload';
import DailyCreateProvider from 'providers/dailyCreate';
import StatusBar from 'components/StatusBar';

export default function ({ route }) {
  const { data, edit } = route.params;
  return (
    <>
      <StatusBar />
      <DailyCreateProvider>
        <DailyUpload data={data} edit={edit} />
      </DailyCreateProvider>
    </>
  );
}
