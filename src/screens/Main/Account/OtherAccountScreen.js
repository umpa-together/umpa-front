import React from 'react';
import OtherAccount from 'templates/Main/Account/OtherAccount';
import { Provider as ReportProvider } from 'context/Report';

export default function OtherAccountScreen({ route }) {
  const { id } = route.params;
  return (
    <ReportProvider>
      <OtherAccount id={id} />
    </ReportProvider>
  );
}
