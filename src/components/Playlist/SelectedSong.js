import React, { useContext, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AddedContext } from 'context/Added';
import SongView from 'components/SongView';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_3 } from 'constants/colors';
import Icon from 'widgets/Icon';
import { useModal } from 'providers/modal';
import Text from 'components/Text';
import TouchableNoDouble from 'components/TouchableNoDouble';

const AddActions = (song) => {
  const { postAddedSong } = useContext(AddedContext);
  const { onClickAdded } = useModal();

  const onClickAdd = () => {
    postAddedSong({ song });
    onClickAdded({ opt: 'save' });
  };

  return (
    <TouchableNoDouble onPress={() => onClickAdd(song)}>
      <Icon source={require('public/icons/add-song.png')} style={styles.icon} />
    </TouchableNoDouble>
  );
};

export default memo(function SelectedSong({ songs }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>총 {songs.length}곡</Text>
      <View>
        {songs.map((item) => {
          return <SongView key={item.id} song={item} actions={AddActions(item)} playlist />;
        })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 13 * SCALE_HEIGHT,
  },
  titleText: {
    fontSize: FS(12),
    color: COLOR_3,
    marginBottom: 13 * SCALE_HEIGHT,
    marginLeft: 16 * SCALE_WIDTH,
  },
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
  },
});
