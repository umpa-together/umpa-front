import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { Context as NoticeContext } from 'context/Notice';
import style from 'constants/styles';
import Header from 'components/Header';
import Section from 'components/Notice/Section';
import LoadingIndicator from 'components/LoadingIndicator';
import { useRefresh } from 'providers/refresh';

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
        return <Text>새로운 알림</Text>;
      }
    } else if (betweenTime <= 7) {
      if (weekNotice[0] && weekNotice[0]._id === id) {
        return <Text>이번 주</Text>;
      }
    } else if (lastNotice[0] && lastNotice[0]._id === id) {
      return <Text>지난 알림</Text>;
    }
    return null;
  };

  const getDivider = (data) => {
    const { _id: id, time } = data;
    const postTime = new Date(time);
    const betweenTime = Math.floor((now.getTime() - postTime.getTime()) / 1000 / 60 / 60 / 24);
    if (betweenTime < 3) {
      if (newNotice[newNotice.length - 1] && newNotice[newNotice.length - 1]._id === id) {
        return <View style={{ height: 3, width: '100%', backgroundColor: '#000' }} />;
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
    <View style={[style.background, { borderWidth: 1 }]}>
      <Header title="알림" />
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
