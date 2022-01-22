import React, { useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlaylistCreate } from 'providers/playlistCreate';
import UploadSongs from 'components/Playlist/UploadSongs';
import UploadHashtag from 'components/Playlist/UploadHashtag';
import Header from 'components/Header';
import style from 'constants/styles';
import { navigate } from 'lib/utils/navigation';
import { useSongActions } from 'providers/songActions';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'widgets/Icon';
import FS from 'lib/utils/normalize';
import { MAIN_COLOR } from 'constants/colors';
import UploadInfo from 'components/Playlist/UploadInfo';

const NextActions = () => {
  const { onClickUpload } = usePlaylistCreate();
  return (
    <TouchableOpacity style={[style.icons, styles.textContainer]} onPress={onClickUpload}>
      <Text style={styles.uploatText}>저장</Text>
    </TouchableOpacity>
  );
};

const BackLandings = () => {
  const { information, songs, image } = usePlaylistCreate();

  const onPressBack = () => {
    navigate('PlaylistCreate', {
      data: { information, songs, image },
    });
  };

  return (
    <TouchableOpacity style={styles.backContainer} title="back" onPress={onPressBack}>
      <Icon source={require('public/icons/back-40.png')} style={style.icons} />
    </TouchableOpacity>
  );
};

export default function PlaylistUpload({ data }) {
  const { information, setParams, songs, setSongs } = usePlaylistCreate();
  const { songsRef, actionsRef } = useSongActions();
  const { title, content, hashtags } = information;

  useEffect(() => {
    if (data) {
      setParams(data);
    }
  }, [data]);

  useEffect(() => {
    songsRef.current = songs;
  }, [songs]);

  useFocusEffect(
    useCallback(() => {
      actionsRef.current = setSongs;
    }, []),
  );

  return (
    <View style={style.background}>
      <Header
        titleStyle={style.headertitle}
        title="새 플레이리스트"
        landings={[<BackLandings />]}
        actions={[<NextActions />]}
      />
      <ScrollView>
        <UploadInfo songs={songs} title={title} content={content} />
        <UploadHashtag hashtags={hashtags} />
        <UploadSongs songs={songs} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  uploatText: {
    fontSize: FS(14),
    color: MAIN_COLOR,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
