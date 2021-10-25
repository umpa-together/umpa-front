import React, { useState } from 'react';
import DailyProvider from 'providers/daily';
import CreateMain from 'components/Daily/CreateMain';
import SearchSong from 'components/Daily/SearchSong';
import HarmfulModal from 'components/HarmfulModal';

const DailyCreatePage = ({ route }) => {
  const { data: daily, isEdit } = route.params;
  const [isSearch, setIsSearch] = useState(false);

  return (
    <>
      <DailyProvider>
        {!isSearch ? (
          <CreateMain isEdit={isEdit} setIsSearch={setIsSearch} daily={daily} />
        ) : (
          <SearchSong isEdit={isEdit} setIsSearch={setIsSearch} daily={daily} />
        )}
      </DailyProvider>
      <HarmfulModal />
    </>
  );
};

export default DailyCreatePage;
