import React from 'react';
import { View, StyleSheet } from 'react-native';
import { usePlaylist } from 'providers/playlist';
import { useSearch } from 'providers/search';
import MyArchiveLists from './MyArchiveLists';
import SongHint from './SongHint';
import SongResult from './SongResult';

const SearchView = () => {
  const { isArchive } = usePlaylist();
  const { isHint } = useSearch();

  return (
    <View style={styles.container}>
      {isArchive ? <MyArchiveLists /> : <>{isHint ? <SongHint /> : <SongResult />}</>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
  },
});

export default SearchView;
