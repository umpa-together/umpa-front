import React, { useEffect, useContext, useCallback, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Context as RelayContext } from 'context/Relay';
import style from 'constants/styles';
import { Context as UserContext } from 'context/User';
import { useFocusEffect } from '@react-navigation/native';
import CurrentRelayList from 'components/Relay/CurrentRelayList';
import PlayBar from 'components/PlayBar';
import AddedModal from 'components/Modal/AddedModal';
import { useModal } from 'providers/modal';
import { navigate } from 'lib/utils/navigation';
import YoutubeLink from 'components/youtubeLink';
import OpenYoutube from 'lib/utils/youtube';
import Text from 'components/Text';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';
import RelayCardView from 'components/Relay/RelayCardView';

const ListsHeader = () => {
  const onClickYoutube = () => {
    OpenYoutube();
  };
  return (
    <View style={styles.container}>
      <View style={[style.flexRow, style.space_between, styles.margin]}>
        <Text style={styles.titleText}>릴레이 플레이리스트</Text>
        <YoutubeLink relay func={onClickYoutube} />
      </View>
    </View>
  );
};

export default function () {
  const {
    state: { currentRelay, relayLists, notNextRelay, currentRelayPage },
    getCurrentRelay,
    getRelayLists,
    initRelay,
    getNextRelayLists,
  } = useContext(RelayContext);
  const {
    getMyInformation,
    state: { user },
  } = useContext(UserContext);
  const { addedModal } = useModal();
  const [loading, setLoading] = useState(false);
  const dataFetch = async () => {
    await Promise.all([getCurrentRelay(), getRelayLists(), getMyInformation()]);
  };
  const getData = async () => {
    if (relayLists.length >= 20 && !notNextRelay) {
      setLoading(true);
      await getNextRelayLists({ page: currentRelayPage });
      setLoading(false);
    }
  };

  const onEndReached = () => {
    if (!loading) {
      getData();
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  useFocusEffect(
    useCallback(() => {
      initRelay();
    }, []),
  );

  useEffect(() => {
    if (user) {
      if (user.genre.length === 0) {
        navigate('ProfileEdit');
      }
    }
  }, [user]);

  const ListHeaderComponent = useCallback(() => {
    return (
      <>
        {currentRelay && (
          <>
            <CurrentRelayList currentRelay={currentRelay} />
            <ListsHeader />
          </>
        )}
      </>
    );
  }, [currentRelay]);
  const keyExtractor = useCallback((_) => _._id, []);
  const renderItem = useCallback(({ item }) => {
    return <RelayCardView relay={item} />;
  }, []);
  const ListFooterComponent = useCallback(() => loading && <ActivityIndicator />, [loading]);

  return (
    <View style={style.background}>
      {currentRelay && (
        <FlatList
          ListHeaderComponent={ListHeaderComponent}
          data={relayLists}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          maxToRenderPerBatch={5}
          windowSize={5}
          ListFooterComponent={ListFooterComponent}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.6}
        />
      )}
      <PlayBar />
      {addedModal && <AddedModal />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10 * SCALE_HEIGHT,
    paddingHorizontal: 17 * SCALE_WIDTH,
  },
  titleText: {
    fontSize: FS(18),
    color: COLOR_1,
    fontWeight: 'bold',
  },
  margin: {
    marginBottom: 20 * SCALE_HEIGHT,
  },
});
