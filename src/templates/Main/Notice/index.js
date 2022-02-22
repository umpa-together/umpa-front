/* eslint-disable no-nested-ternary */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Context as NoticeContext } from 'context/Notice';
import style from 'constants/styles';
import Section from 'components/Notice/Section';
import LoadingIndicator from 'components/LoadingIndicator';
import { useRefresh } from 'providers/refresh';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';
import { navigate } from 'lib/utils/navigation';
import EmptyData from 'components/EmptyData';
import NavigateButton from 'components/EmptyData/NavigateButton';
import Text from 'components/Text';
import PlayBar from 'components/PlayBar';
import AddedModal from 'components/Modal/AddedModal';
import { useModal } from 'providers/modal';
import { useTabRef } from 'providers/tabRef';
import TabTitle from 'components/TabTitle';

export default function Notice() {
  const {
    state: { notice, currentNoticePage, notNextNotice },
    getNotice,
    getNextNotice,
  } = useContext(NoticeContext);
  const [loading, setLoading] = useState(false);
  const [newNotice, setNewNotice] = useState([]);
  const [weekNotice, setWeekNotice] = useState([]);
  const [lastNotice, setLastNotice] = useState([]);
  const { refreshing, onRefresh, setRefresh } = useRefresh();
  const { addedModal } = useModal();
  const { noticeRef } = useTabRef();
  const now = new Date();
  const textList = ['아직 새로운 알림이 없습니다'];

  const getData = async () => {
    if (notice.length >= 20 && !notNextNotice) {
      setLoading(true);
      await getNextNotice({ page: currentNoticePage });
      setLoading(false);
    }
  };

  const onEndReached = () => {
    if (!loading) {
      getData();
    }
  };

  const divideSection = (data) => {
    // eslint-disable-next-line array-callback-return
    data.map((item) => {
      const { time } = item;
      const postTime = new Date(time);
      const betweenTime = Math.floor((now.getTime() - postTime.getTime()) / 1000 / 60 / 60 / 24);
      if (betweenTime < 3) {
        setNewNotice((prev) => [...prev, item]);
      } else if (betweenTime <= 7) {
        setWeekNotice((prev) => [...prev, item]);
      } else {
        setLastNotice((prev) => [...prev, item]);
      }
    });
  };

  const getSectionHeader = (data) => {
    const { _id: id, time } = data;
    const postTime = new Date(time);
    const betweenTime = Math.floor((now.getTime() - postTime.getTime()) / 1000 / 60 / 60 / 24);
    if (betweenTime < 3) {
      if (newNotice[0] && newNotice[0]._id === id) {
        return <Text style={styles.titleText}>새로운 알림</Text>;
      }
    } else if (betweenTime <= 7) {
      if (weekNotice[0] && weekNotice[0]._id === id) {
        return <Text style={styles.titleText}>이번 주</Text>;
      }
    } else if (lastNotice[0] && lastNotice[0]._id === id) {
      return <Text style={styles.titleText}>지난 알림</Text>;
    }
    return null;
  };

  const getDivider = (data) => {
    const { _id: id, time } = data;
    const postTime = new Date(time);
    const betweenTime = Math.floor((now.getTime() - postTime.getTime()) / 1000 / 60 / 60 / 24);
    if (betweenTime < 3) {
      if (newNotice[newNotice.length - 1] && newNotice[newNotice.length - 1]._id === id) {
        return <View style={styles.divider} />;
      }
    } else if (betweenTime <= 7) {
      if (weekNotice[weekNotice.length - 1] && weekNotice[weekNotice.length - 1]._id === id) {
        return <View style={styles.divider} />;
      }
    }
    return null;
  };

  const onPress = () => {
    navigate('Relay');
  };

  const refreshFunc = () => {
    getNotice();
    setNewNotice([]);
    setWeekNotice([]);
    setLastNotice([]);
  };

  useEffect(() => {
    getNotice();
    setRefresh(refreshFunc);
  }, []);

  useEffect(() => {
    if (notice) {
      divideSection(notice.slice(20 * (currentNoticePage - 1), 20 * currentNoticePage));
    }
  }, [notice]);

  const keyExtractor = useCallback((_) => _._id, []);
  const ListFooterComponent = useCallback(() => loading && <ActivityIndicator />, [loading]);
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <>
          {getSectionHeader(item)}
          <Section data={item} />
          {getDivider(item)}
        </>
      );
    },
    [newNotice, lastNotice, weekNotice],
  );

  return (
    <View style={style.background}>
      <TabTitle title="알림" titleStyle={styles.title} />
      {notice === null ? (
        <LoadingIndicator />
      ) : notice.length === 0 ? (
        <EmptyData
          textList={textList}
          icon
          action={<NavigateButton onPress={onPress} text="릴레이 플레이리스트 구경하기" />}
        />
      ) : (
        <FlatList
          data={notice}
          keyExtractor={keyExtractor}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.6}
          ListFooterComponent={ListFooterComponent}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={renderItem}
          maxToRenderPerBatch={5}
          windowSize={5}
          ref={noticeRef}
        />
      )}
      <PlayBar />
      {addedModal && <AddedModal />}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FS(24),
    color: COLOR_1,
    marginLeft: 16 * SCALE_WIDTH,
    marginVertical: 20 * SCALE_HEIGHT,
    fontWeight: 'bold',
  },
  divider: {
    marginTop: 16 * SCALE_HEIGHT,
    height: 0.7 * SCALE_HEIGHT,
    width: '100%',
    backgroundColor: '#CFCFCF',
    marginBottom: 20 * SCALE_HEIGHT,
  },
  titleText: {
    marginLeft: 20 * SCALE_WIDTH,
    fontSize: FS(16),
    fontWeight: 'bold',
    color: COLOR_1,
  },
});
