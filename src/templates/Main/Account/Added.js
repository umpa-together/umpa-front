import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Context as AddedContext } from 'context/Added';
import Header from 'components/Header';
import style from 'constants/styles';
import { AddedSong, AddedPlaylist } from 'components/Account/AddedSection';
import { COLOR_1, COLOR_5, MAIN_COLOR } from 'constants/colors';
import FS from 'lib/utils/normalize';

const HeaderActions = ({ edit, setEdit }) => {
  const onClickActions = () => {
    setEdit(!edit);
  };
  return (
    <TouchableOpacity onPress={onClickActions}>
      <Text style={edit ? styles.complete : styles.edit}>{edit ? '완료' : '편집'}</Text>
    </TouchableOpacity>
  );
};

export default function Added({ type }) {
  const { state, getAddedSong, getAddedPlaylist } = useContext(AddedContext);
  const [edit, setEdit] = useState(false);

  const titleLists = {
    Song: {
      title: '저장한 곡',
      component: <AddedSong edit={edit} />,
    },
    Playlist: {
      title: '저장한 플레이리스트',
      component: <AddedPlaylist edit={edit} />,
    },
  };

  const dataFetch = () => {
    if (type === 'Song') {
      getAddedSong();
    } else if (type === 'Playlist') {
      getAddedPlaylist();
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <View style={style.background}>
      <Header
        title={titleLists[type].title}
        back
        titleStyle={styles.titleStyle}
        actions={[<HeaderActions edit={edit} setEdit={setEdit} />]}
      />
      {(state.songLists || state.playlists) && titleLists[type].component}
    </View>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    color: COLOR_1,
    fontSize: FS(18),
  },
  edit: {
    color: COLOR_5,
    fontSize: FS(16),
  },
  complete: {
    color: MAIN_COLOR,
    fontSize: FS(16),
  },
});
