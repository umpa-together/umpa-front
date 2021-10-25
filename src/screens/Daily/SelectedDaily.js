import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Keyboard,
  Platform,
  StatusBar,
} from 'react-native';

import { navigate } from 'navigationRef';
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';

import DailyProvider from 'providers/daily';

import Thumbnail from 'components/Daily/Thumbnail';
import DailyLikes from 'components/Daily/DailyLikes';
import DailySong from 'components/Daily/DailySong';
import HashtagLists from 'components/Daily/HashtagLists';
import MusicBar from 'components/MusicBar';
import Comments from 'components/Daily/Comments';
import CommentBar from 'components/Daily/CommentBar';
import TextContent from 'components/Daily/TextContent';

import LoadingIndicator from 'components/LoadingIndicator';
import { useTrackPlayer } from 'providers/trackPlayer';
import { useFocusEffect } from '@react-navigation/native';
import { useRefresh } from 'providers/refresh';
import { tmpWidth } from '../../components/FontNormalize';
import { Context as DailyContext } from '../../context/DailyContext';

const SelectedDaily = ({ route }) => {
  const { state, getDaily } = useContext(DailyContext);
  const { state: searchState } = useContext(SearchPlaylistContext);
  const { id: Dailyid } = route.params;

  const { refreshing, onRefresh, setRefresh } = useRefresh();

  const [, setKeyboardHeight] = useState(0);

  const [hashtag, setHashtag] = useState('');
  const [, setDeletedModal] = useState(false);

  const [currentDaily, setCurrentDaily] = useState(state.current_daily);
  const [comments, setComments] = useState(state.current_comments);
  const [, setCurrentSongs] = useState(state.current_songs);
  const { isPlayingId } = useTrackPlayer();

  const fetchData = () => {
    getDaily({ id: state.current_daily._id, postUserId: state.current_daily.postUserId._id });
  };

  const onKeyboardDidShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  };
  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };
  const addEventListener = () => {
    Keyboard.addListener('keyboardWillShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
  };

  const removeEventListener = () => {
    Keyboard.removeListener('keyboardWillShow', onKeyboardDidShow);
    Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
  };

  useFocusEffect(
    useCallback(() => {
      addEventListener();
      return () => removeEventListener();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      setRefresh(fetchData);
      setCurrentSongs(state.current_songs);
    }, []),
  );

  useEffect(() => {
    if (state.current_daily != null && state.current_daily._id === Dailyid) {
      setComments(state.current_comments);
    }
  }, [Dailyid, state.current_comments]);

  useEffect(() => {
    if (state.current_daily != null && state.current_daily._id === Dailyid) {
      setCurrentDaily(state.current_daily);
    }
  }, [Dailyid, state.current_daily]);

  useEffect(() => {
    if (searchState.playList != null && hashtag !== '') {
      navigate('SelectedHashtag', {
        data: searchState.playList,
        text: hashtag,
        searchOption: 'Hashtag',
      });
    }
  }, [searchState.playList]);

  useEffect(() => {
    if (state.current_daily != null && state.current_daily.length === 0) setDeletedModal(true);
  }, [state.current_daily]);

  return (
    <View style={styles.container}>
      {currentDaily == null || currentDaily === undefined ? (
        <LoadingIndicator />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
          >
            <Thumbnail img={currentDaily.image} />
            <DailyProvider>
              <DailyLikes daily={currentDaily} />
            </DailyProvider>
            <DailySong song={currentDaily.song} />
            <TextContent daily={currentDaily} />
            <HashtagLists hashtag={currentDaily.hashtag} setHashtag={setHashtag} />
            <DailyProvider>
              <Comments comments={comments} />
            </DailyProvider>
          </ScrollView>
          {isPlayingId === '0' ? <CommentBar dailyId={Dailyid} /> : <MusicBar />}
        </View>
      )}
    </View>
  );
};

SelectedDaily.navigationOptions = () => ({
  headerShown: false,
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(251,251,251)',
    flex: 1,
  },
  activityIndicatorContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    height: 359 * tmpWidth,
    width: '100%',
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 44 * tmpWidth : StatusBar.currentHeight * tmpWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 18 * tmpWidth,
    marginRight: 24 * tmpWidth,
    position: 'absolute',
    zIndex: 2,
  },
  profileBox: {
    marginTop: 4 * tmpWidth,
    marginLeft: 28 * tmpWidth,
    marginRight: 20 * tmpWidth,
    flexDirection: 'row',
    zIndex: 2,
  },
  profile: {
    height: 40 * tmpWidth,
    width: 40 * tmpWidth,
    borderRadius: 40 * tmpWidth,
  },
  profileTextBox: {
    flex: 1,
    marginLeft: 8 * tmpWidth,
    marginTop: 9 * tmpWidth,
  },
  nameText: {
    height: 19 * tmpWidth,
    color: 'rgb(0,0,0)',
    paddingLeft: 5 * tmpWidth,
    paddingTop: 2 * tmpWidth,
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 18 * tmpWidth,
    zIndex: 2,
  },
  infoBox: {
    width: 319 * tmpWidth,
    height: 89 * tmpWidth,
    marginTop: 69 * tmpWidth,
    backgroundColor: 'rgba(252,252,255,0.98)',
    borderRadius: 10 * tmpWidth,
    shadowColor: '#6c6c6c',
    shadowOffset: {
      height: 2 * tmpWidth,
      width: 0,
    },
    shadowRadius: 5 * tmpWidth,
    shadowOpacity: 0.14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  contentText: {
    color: 'rgb(94,94,94)',
    marginTop: 6 * tmpWidth,
    marginBottom: 2 * tmpWidth,
    height: 18 * tmpWidth,
    fontSize: 14 * tmpWidth,
  },
  hashtagView: {
    borderWidth: 1 * tmpWidth,
    borderRadius: 10 * tmpWidth,
    borderColor: 'rgb(169,193,255)',
    marginRight: 6 * tmpWidth,
  },
  hashtagBox: {
    paddingLeft: 5 * tmpWidth,
    paddingRight: 5 * tmpWidth,
    paddingTop: 3 * tmpWidth,
    paddingBottom: 3 * tmpWidth,
    fontSize: 11 * tmpWidth,
    color: 'rgb(169,193,255)',
  },
  mainContainer: {
    justifyContent: 'space-between',
    height: '100%',
    flex: 1,
  },
  songWidthBox: {
    width: 80 * tmpWidth,
    alignItems: 'center',
    marginTop: 12 * tmpWidth,
  },

  inputBox: {
    width: '100%',
    paddingTop: 18 * tmpWidth,
    paddingBottom: 18 * tmpWidth,
    backgroundColor: 'rgb(255,255,255)',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      height: -1 * tmpWidth,
      width: 0,
    },
    shadowRadius: 10 * tmpWidth,
    shadowOpacity: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20 * tmpWidth,
    paddingRight: 20 * tmpWidth,
    justifyContent: 'space-between',
    elevation: 5,
  },
  commentHeader: {
    marginTop: 24 * tmpWidth,
    marginLeft: 20 * tmpWidth,
    marginRight: 20 * tmpWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerCommentText: {
    fontSize: 14 * tmpWidth,
  },
  headerText: {
    fontSize: 14 * tmpWidth,
    color: 'rgb(95,95,95)',
  },
  commentProfile: {
    height: 32 * tmpWidth,
    width: 32 * tmpWidth,
    borderRadius: 32 * tmpWidth,
    marginRight: 14 * tmpWidth,
  },
  commentUserText: {
    marginRight: 14 * tmpWidth,
    fontSize: 14 * tmpWidth,
    color: 'rgba(0,0,0,0.72)',
  },
  commentTimeText: {
    fontSize: 12 * tmpWidth,
    color: 'rgba(0,0,0,0.72)',
  },
  commentText: {
    fontSize: 14 * tmpWidth,
    marginTop: 8 * tmpWidth,
    marginBottom: 8 * tmpWidth,
  },
  likeText: {
    fontSize: 14 * tmpWidth,
    color: 'rgb(193,74,73)',
  },
  notLikeText: {
    fontSize: 14 * tmpWidth,
    color: 'rgb(93,93,93)',
  },
  likeLengthText: {
    fontSize: 14 * tmpWidth,
    color: 'rgb(93,93,93)',
    marginLeft: 2 * tmpWidth,
  },
  deleteText: {
    fontSize: 14 * tmpWidth,
    color: 'rgb(93,93,93)',
    marginLeft: 8 * tmpWidth,
  },
  textInput: {
    width: '80%',
    marginTop: 4 * tmpWidth,
    padding: 0,
  },
  commentBox: {
    marginLeft: 20 * tmpWidth,
    marginBottom: 24 * tmpWidth,
    flexDirection: 'row',
    marginRight: 20 * tmpWidth,
  },
  recommentBox: {
    width: '100%',
    height: 509 * tmpWidth,
    backgroundColor: 'rgb(255,255,255)',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      height: -1 * tmpWidth,
      width: 0,
    },
    shadowRadius: 8 * tmpWidth,
    shadowOpacity: 0.1,
  },
  recommentText: {
    width: '100%',
    backgroundColor: 'rgb(238,244,255)',
    flexDirection: 'row',
    paddingLeft: 20 * tmpWidth,
    paddingTop: 30 * tmpWidth,
    fontSize: 14 * tmpWidth,
    paddingBottom: 16 * tmpWidth,
  },
  inputRecommentBox: {
    marginTop: 20 * tmpWidth,
    borderBottomWidth: 1 * tmpWidth,
    borderBottomColor: 'rgb(207,207,207)',
    marginLeft: 20 * tmpWidth,
    marginRight: 20 * tmpWidth,
    paddingBottom: 6 * tmpWidth,
    flexDirection: 'row',
    marginBottom: 12 * tmpWidth,
  },
  textWhite: {
    color: 'rgb(255,255,255)',
  },
  deleteContainer: {
    width: 285 * tmpWidth,
    height: 131 * tmpWidth,
    backgroundColor: 'rgb(254,254,254)',
    borderRadius: 4 * tmpWidth,
    alignItems: 'center',
  },
  cancelBox: {
    width: 105 * tmpWidth,
    height: 34 * tmpWidth,
    borderRadius: 8 * tmpWidth,
    backgroundColor: 'rgb(245,245,245)',
    borderWidth: 1 * tmpWidth,
    borderColor: 'rgb(245,245,245)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5.5 * tmpWidth,
  },
  deleteBox: {
    width: 105 * tmpWidth,
    height: 34 * tmpWidth,
    borderRadius: 8 * tmpWidth,
    borderWidth: 1 * tmpWidth,
    borderColor: 'rgb(169,193,255)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5.5 * tmpWidth,
  },

  songcontainer: {
    paddingLeft: 18 * tmpWidth,
    paddingRight: 23 * tmpWidth,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 13 * tmpWidth,
    color: '#838383',
    marginLeft: 4 * tmpWidth,
  },
  textArea: {
    width: 260 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20 * tmpWidth,
    height: 20 * tmpWidth,
  },
  iconArea: {
    width: 40 * tmpWidth,
    height: 40 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectedDaily;
