/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useEffect, memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import style from 'constants/styles';
import Songbackground from 'components/Search/SongBackground';
import { Playlist, Daily, DJ } from 'components/Search/SelectedSection';
import TabView from 'components/TabView';
import SelectedTabBar from 'components/TabView/SelectedTabBar';
import AddedModal from 'components/Modal/AddedModal';
import { useModal } from 'providers/modal';

export default function SelectedSong({ song }) {
  const {
    state: { selected },
    getSelectedContents,
  } = useContext(SearchContext);
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
        <Daily song={song} />
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

  const routesMap = [
    { key: 'playlist', title: '플레이리스트' },
    { key: 'daily', title: '데일리' },
    { key: 'dj', title: '대표곡' },
  ];

  const sceneMap = {
    playlist: memo(PlaylistSection),
    daily: memo(DailySection),
    dj: memo(DJSection),
  };
  return (
    <View style={[style.background, styles.container]}>
      <Songbackground song={song} />
      {selected && (
        <TabView
          routesMap={routesMap}
          sceneMap={sceneMap}
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
