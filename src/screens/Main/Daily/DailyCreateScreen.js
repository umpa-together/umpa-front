import React from 'react';
import DailyCreate from 'templates/Main/Daily/DailyCreate';
import DailyCreateProvider from 'providers/dailyCreate';
import StatusBar from 'components/StatusBar';
import ScrollProvider from 'providers/scroll';

export default function ({ route }) {
  return (
    <>
      <StatusBar />
      <ScrollProvider>
        <DailyCreateProvider>
          <DailyCreate data={route.params && route.params.data} />
        </DailyCreateProvider>
      </ScrollProvider>
    </>
  );
}
