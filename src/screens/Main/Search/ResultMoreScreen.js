import React from 'react';
import ResultMore from 'templates/Main/Search/ResultMore';
import StatusBar from 'components/StatusBar';

export default function ({ route }) {
  const { keyword, title, data } = route.params;
  return (
    <>
      <StatusBar />
      <ResultMore keyword={keyword} title={title} data={data} />
    </>
  );
}
