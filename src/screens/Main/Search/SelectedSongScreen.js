import React from 'react';
import { Provider as SearchProvider } from 'context/Search';
import SelectedSong from 'templates/Main/Search/SelectedSong';

export default function ({ route }) {
  const { song } = route.params;
  return (
    <SearchProvider>
      <SelectedSong song={song} />
    </SearchProvider>
  );
}
