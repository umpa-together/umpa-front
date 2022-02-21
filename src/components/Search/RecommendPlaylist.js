import React, { useCallback, useContext } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Context as MainContentsContext } from 'context/MainContents';
import PlaylistCard from 'components/Search/PlaylistCard';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';
import Text from 'components/Text';
import Icon from 'widgets/Icon';
import style from 'constants/styles';

export default function RecommendPlaylist() {
  const { state, getMainRecommendPlaylist } = useContext(MainContentsContext);
  const keyExtractor = useCallback((_) => _.title, []);
  const renderItem = useCallback(({ item }) => <PlaylistCard info={item} />, []);
  const onPressRefresh = () => {
    getMainRecommendPlaylist();
  };

  return (
    <>
      <View style={[style.flexRow, styles.conatiner]}>
        <Text style={styles.title}>음파 강력 추천 플리🔥</Text>
        <TouchableOpacity onPress={onPressRefresh}>
          <Icon source={require('public/icons/search-refresh.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={state.mainPlaylist}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        renderItem={renderItem}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    marginBottom: 6 * SCALE_HEIGHT,
  },
  title: {
    fontSize: FS(14),
    color: COLOR_1,
    marginLeft: 16 * SCALE_WIDTH,
  },
  flatList: {
    paddingHorizontal: 16 * SCALE_WIDTH,
  },
  icon: {
    width: 34 * SCALE_WIDTH,
    height: 34 * SCALE_WIDTH,
  },
});
