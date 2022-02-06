import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Context as AddedContext } from 'context/Added';
import SongView from 'components/SongView';
import Icon from 'widgets/Icon';
import { useModal } from 'providers/modal';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_1, MAIN_COLOR } from 'constants/colors';
import style from 'constants/styles';
import Text from 'components/Text';

export default function MusicSection({ title, songs, icon }) {
  const { onClickAdded } = useModal();
  const { postAddedSong } = useContext(AddedContext);

  const onClickAdd = (song) => {
    postAddedSong({ song });
    onClickAdded();
  };

  const onClickAddActions = (song) => {
    return (
      <TouchableOpacity onPress={() => onClickAdd(song)}>
        <Icon source={require('public/icons/add-song.png')} style={styles.icon} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={[styles.titleContainer, style.flexRow]}>
        <Text style={[styles.title, title === '내가 도전한 곡' && styles.activeTitle]}>
          {title}
        </Text>
        {icon && (
          <Icon source={require('public/icons/relay-first-song.png')} style={styles.songIcon} />
        )}
      </View>
      {songs &&
        songs.map((item) => {
          const key = item._id || item.id;
          const song = item.song ? item.song : item;
          return (
            <View style={title === '내가 도전한 곡' && styles.active} key={key}>
              <SongView song={song} actions={onClickAddActions(song)} />
            </View>
          );
        })}
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
  },
  titleContainer: {
    marginBottom: 13 * SCALE_HEIGHT,
    marginTop: 20 * SCALE_HEIGHT,
  },
  title: {
    fontSize: FS(14),
    color: COLOR_1,
    marginLeft: 15 * SCALE_WIDTH,
  },
  active: {
    backgroundColor: '#E6ECFF',
  },
  activeTitle: {
    color: MAIN_COLOR,
  },
  songIcon: {
    width: 22 * SCALE_WIDTH,
    height: 22 * SCALE_WIDTH,
  },
});
