import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Context as NoticeContext } from 'context/Notice';
import style from 'constants/styles';
import Header from 'components/Header';
import Section from 'components/Notice/Section';
import LoadingIndicator from 'components/LoadingIndicator';
import { useRefresh } from 'providers/refresh';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';

export default function Notice() {
  const { state, getNotice, getNextNotice } = useContext(NoticeContext);
  const [loading, setLoading] = useState(false);
  const [newNotice, setNewNotice] = useState([]);
  const [weekNotice, setWeekNotice] = useState([]);
  const [lastNotice, setLastNotice] = useState([]);
  const { refreshing, onRefresh, setRefresh } = useRefresh();

  const now = new Date();

  const getData = async () => {
    if (state.notice.length >= 20 && !state.notNextNotice) {
      setLoading(true);
      await getNextNotice({ page: state.currentNoticePage });
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
    data.map((notice) => {
      const { time } = notice;
      const postTime = new Date(time);
      const betweenTime = Math.floor((now.getTime() - postTime.getTime()) / 1000 / 60 / 60 / 24);
      if (betweenTime < 3) {
        setNewNotice((prev) => [...prev, notice]);
      } else if (betweenTime <= 7) {
        setWeekNotice((prev) => [...prev, notice]);
      } else {
        setLastNotice((prev) => [...prev, notice]);
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

  useEffect(() => {
    getNotice();
    setRefresh(getNotice);
  }, []);

  useEffect(() => {
    if (state.notice) {
      divideSection(
        state.notice.slice(20 * (state.currentNoticePage - 1), 20 * state.currentNoticePage),
      );
    }
  }, [state.notice]);

  return (
    <View style={[style.background]}>
      <Header titleStyle={style.headertitle} title="알림" />
      {state.notice === null ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={state.notice}
          keyExtractor={(_) => _._id}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.6}
          ListFooterComponent={loading && <ActivityIndicator />}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => {
            getSectionHeader(item);
            return (
              <>
                {getSectionHeader(item)}
                <Section data={item} />
                {getDivider(item)}
              </>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    marginTop: 16 * SCALE_HEIGHT,
    height: 0.7 * SCALE_HEIGHT,
    width: '100%',
    backgroundColor: '#CFCFCF',
  },
  titleText: {
    marginLeft: 20 * SCALE_WIDTH,
    marginTop: 20 * SCALE_HEIGHT,
    fontSize: FS(16),
    fontWeight: 'bold',
    color: COLOR_1,
  },
});
