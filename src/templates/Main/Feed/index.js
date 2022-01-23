/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import style from 'constants/styles';
import TabTitle from 'components/TabTitle';
import { Context as UserContext } from 'context/User';
import { Context as FeedContext } from 'context/Feed';
import { Context as StoryContext } from 'context/Story';
import Contents from 'components/Feed/Contents';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import RefreshProvider from 'providers/refresh';
import Icon from 'widgets/Icon';
import SortModal from 'components/Modal/SortModal';
import FloatingButton from 'components/Feed/FloatingButton';
import SongActionsProvider from 'providers/songActions';

const FOLLOWING_NUMBER = 30;
const FeedActions = ({ setModal }) => {
  const { state } = useContext(FeedContext);

  const onClickActions = async () => {
    setModal(true);
  };

  return (
    <TouchableOpacity onPress={onClickActions} activeOpacity={0.9} style={style.flexRow}>
      <Text style={styles.type}>{state.type ? '피드' : '팔로잉'}</Text>
      <Icon source={require('public/icons/feed-down.png')} style={styles.actions} />
    </TouchableOpacity>
  );
};

export default function Feed() {
  const [sortModal, setSortModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const {
    state: { user },
  } = useContext(UserContext);
  const { state, setFeedType, getFeeds, getFeedWithFollowing, getFeedType } =
    useContext(FeedContext);
  const { getMyStory } = useContext(StoryContext);
  const [isScroll, setIsScroll] = useState(false);
  const opacity = useState(new Animated.Value(1))[0];

  const sortLists = [
    { title: '전체보기', key: 'all' },
    { title: '팔로우한 유저들만 보기', key: 'following' },
  ];
  const sortFunction = (key) => {
    if (key === 'all') {
      setFeedType();
    } else if (key === 'following') {
      if (user.following.length > FOLLOWING_NUMBER) {
        setFeedType();
      } else {
        setAlertModal(true);
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }).start();
          setTimeout(() => {
            setAlertModal(false);
            opacity.setValue(1);
          }, 1500);
        }, 1500);
      }
    }
  };

  const AlertModal = () => {
    return (
      <>
        {alertModal && (
          <Animated.View style={[styles.alertBox, { opacity }]}>
            <Animated.Image source={require('public/icons/tool-tip.png')} style={styles.tooltip} />
            <Animated.Text style={[styles.alertText, { opacity }]}>
              팔로우한 유저 <Text style={styles.bold}>{FOLLOWING_NUMBER}</Text>명 이상부터
              가능합니다.
            </Animated.Text>
            <Animated.Text style={[styles.alertText, { opacity }]}>
              더 많은 유저들을 팔로우 해보세요!
            </Animated.Text>
          </Animated.View>
        )}
      </>
    );
  };

  const dataFetch = async () => {
    if (state.type) {
      await Promise.all([getFeeds(), getMyStory()]);
    } else {
      await Promise.all([getFeedWithFollowing(), getMyStory()]);
    }
  };

  useEffect(() => {
    getFeedType();
  }, []);

  useEffect(() => {
    if (state.type !== null) dataFetch();
  }, [state.type]);

  return (
    <View style={style.background}>
      <TabTitle
        title="피드"
        titleStyle={styles.title}
        actions={[<FeedActions setModal={setSortModal} />]}
      />
      <SongActionsProvider>
        <RefreshProvider>
          <Contents setIsScroll={setIsScroll} />
        </RefreshProvider>
      </SongActionsProvider>
      <FloatingButton show={isScroll} />
      <SortModal
        modal={sortModal}
        setModal={setSortModal}
        sortInfo={{
          list: sortLists,
          func: sortFunction,
          current: state.type ? '전체보기' : '팔로우한 유저들만 보기',
        }}
        actions={<AlertModal />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FS(24),
    fontWeight: '500',
    marginLeft: 16 * SCALE_WIDTH,
    marginTop: 6 * SCALE_HEIGHT,
    marginBottom: 15 * SCALE_HEIGHT,
  },
  floating: {
    width: 52 * SCALE_WIDTH,
    height: 52 * SCALE_WIDTH,
    position: 'absolute',
    bottom: 25 * SCALE_HEIGHT,
    right: 23 * SCALE_WIDTH,
  },
  actions: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
  },
  type: {
    fontSize: FS(16),
    right: -8 * SCALE_WIDTH,
  },
  alertBox: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 157 * SCALE_HEIGHT,
    left: 40 * SCALE_WIDTH,
    width: 278 * SCALE_WIDTH,
    height: 93 * SCALE_HEIGHT,
    paddingTop: 19 * SCALE_HEIGHT,
  },
  alertText: {
    fontSize: FS(14),
    lineHeight: 20 * SCALE_HEIGHT,
    color: '#fff',
    zIndex: 98,
  },
  bold: {
    fontWeight: 'bold',
  },
  tooltip: {
    width: 278 * SCALE_WIDTH,
    height: 93 * SCALE_HEIGHT,
    position: 'absolute',
  },
});
