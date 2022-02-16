import React, { useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlaylistCreate } from 'providers/playlistCreate';
import UploadSongs from 'components/Playlist/UploadSongs';
import UploadHashtag from 'components/UploadHashtag';
import Header from 'components/Header';
import style from 'constants/styles';
import { navigate } from 'lib/utils/navigation';
import Icon from 'widgets/Icon';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR } from 'constants/colors';
import UploadInfo from 'components/Playlist/UploadInfo';
import Text from 'components/Text';

const NextActions = ({ edit }) => {
  const { onClickUpload } = usePlaylistCreate();
  return (
    <TouchableOpacity
      style={[style.icons, styles.textContainer]}
      onPress={() => onClickUpload(edit)}
    >
      <Text style={styles.uploatText}>저장</Text>
    </TouchableOpacity>
  );
};

const BackLandings = ({ edit }) => {
  const { information, songs, image } = usePlaylistCreate();

  const onPressBack = () => {
    navigate('PlaylistCreate', {
      data: { information, songs, image },
      edit,
    });
  };

  return (
    <TouchableOpacity onPress={onPressBack}>
      <Icon source={require('public/icons/back-40.png')} style={style.icons} />
    </TouchableOpacity>
  );
};

export default function PlaylistUpload({ data, edit }) {
  const {
    setParams,
    information: { hashtags },
    onClickAddHashtag,
    onClickDeleteHashtag,
  } = usePlaylistCreate();

  const info = {
    data: hashtags,
    deleteAction: onClickDeleteHashtag,
    addAction: onClickAddHashtag,
  };
  useEffect(() => {
    if (data) {
      setParams(data);
    }
  }, [data]);

  return (
    <View style={style.background}>
      <Header
        titleStyle={style.headertitle}
        title={edit ? '플레이리스트 편집' : '새 플레이리스트'}
        landings={[<BackLandings edit={edit} />]}
        actions={[<NextActions edit={edit} />]}
      />
      <ScrollView>
        <UploadInfo edit={edit} />
        <UploadHashtag info={info} containerStyle={styles.containerStyle} />
        <UploadSongs />
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
  containerStyle: {
    paddingTop: 18 * SCALE_HEIGHT,
    paddingBottom: 16 * SCALE_HEIGHT,
    paddingHorizontal: 26 * SCALE_WIDTH,
  },
});
