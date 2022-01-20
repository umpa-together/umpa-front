/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useEffect, memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import style from 'constants/styles';
import Songbackground from 'components/Search/SongBackground';
import TrackPlayerProvider from 'providers/trackPlayer';
import { Playlist, Daily, DJ } from 'components/Search/SelectedSection';
import TabView from 'components/TabView';
import { Provider as AddedProvider } from 'context/Added';
import SelectedTabBar from 'components/TabView/SelectedTabBar';
import AddedModal from 'components/Modal/AddedModal';
import { useModal } from 'providers/modal';

export default function SelectedSong({ song }) {
  const { state, getSelectedContents } = useContext(SearchContext);
  const { addedModal } = useModal();
  useEffect(() => {
    getSelectedContents({ id: song.id });
  }, []);

  const PlaylistSection = () => {
    return (
      <ScrollView>
        <Playlist />
      </ScrollView>
    );
  };

  const DailySection = () => {
    return (
      <ScrollView>
        <Daily />
      </ScrollView>
    );
  };

  const DJSection = () => {
    return (
      <ScrollView>
        <DJ />
      </ScrollView>
    );
  };

  return (
    <View style={[style.background, styles.container]}>
      <AddedProvider>
        <TrackPlayerProvider>
          <Songbackground song={song} />
        </TrackPlayerProvider>
      </AddedProvider>
      {state.selected && (
        <TabView
          routesMap={[
            { key: 'playlist', title: '플레이리스트' },
            { key: 'daily', title: '데일리' },
            { key: 'dj', title: '대표곡' },
          ]}
          sceneMap={{
            playlist: memo(PlaylistSection),
            daily: memo(DailySection),
            dj: memo(DJSection),
          }}
          renderTabBar={(props) => <SelectedTabBar props={props} />}
        />
      )}
      {addedModal && <AddedModal title="1곡을 저장한 곡 목록에 담았습니다." />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
