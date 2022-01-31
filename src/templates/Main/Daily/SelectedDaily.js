import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import Header from 'components/Header';
import { Context as DailyContext } from 'context/Daily';
import { Context as UserContext } from 'context/User';
import PostUser from 'components/PostUser';
import Dailyimage from 'components/DailyImage';
import DailySong from 'components/Daily/DailySong';
import SelectedText from 'components/Daily/SelectedText';
import Divider from 'widgets/Divider';
import SelectedComment from 'components/SelectedComment';
import CommentBar from 'components/CommentBar';
import KeyboradProvider from 'providers/keyboard';
import timeConverter from 'lib/utils/time';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import Footer from 'components/Footer';
import Icon from 'widgets/Icon';
import SelectModal from 'components/Modal/SelectModal';
import PlayBar from 'components/PlayBar';
import { useTrackPlayer } from 'providers/trackPlayer';
import { Provider as AddedProvider } from 'context/Added';
import AddedModal from 'components/Modal/AddedModal';
import { useModal } from 'providers/modal';
import { navigate, goBack } from 'lib/utils/navigation';
import CommentProvider from 'providers/comment';
import { Context as ReportContext } from 'context/Report';
import ActionModal from 'components/Modal/ActionModal';
import LoadingIndicator from 'components/LoadingIndicator';

const PostUserAction = ({ setSelectModal }) => {
  const onClickMenu = () => {
    setSelectModal(true);
  };
  return (
    <TouchableOpacity onPress={onClickMenu} activeOpacity={0.5}>
      <Icon source={require('public/icons/dot-menu.png')} style={styles.icon} />
    </TouchableOpacity>
  );
};

const LandingAction = () => {
  const onPressLanding = () => {
    navigate('Feed');
  };
  return (
    <TouchableOpacity onPress={onPressLanding} style={styles.back} activeOpacity={0.9}>
      <Icon source={require('public/icons/back-40.png')} style={style.icons} />
    </TouchableOpacity>
  );
};

export default function SelectedDaily({ post, id, postUserId }) {
  const [selectModal, setSelectModal] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState(null);
  const [comment, setComment] = useState(null);
  const [daily, setDaily] = useState({
    _id: '',
    postUserId: '',
    image: '',
    time: '',
    song: null,
  });

  const {
    state: { currentComments, currentDaily },
    deleteDaily,
    getSelectedDaily,
  } = useContext(DailyContext);
  const {
    state: { user },
    getMyInformation,
  } = useContext(UserContext);
  const { postReport } = useContext(ReportContext);
  const { currentSong, duration } = useTrackPlayer();
  const { addedModal } = useModal();

  const getDaily = async () => {
    if (id) {
      await getSelectedDaily({ id, postUserId });
    }
  };
  const setSelected = () => {
    if (currentDaily != null && currentDaily._id === id) {
      setDaily(currentDaily);
      setComment(currentComments);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDaily();
  }, [id]);

  useEffect(() => {
    setSelected();
  }, [currentDaily]);

  const { postUserId: postUser, image, time, song } = daily;

  const timeConverted = timeConverter(time);
  const checkMyPost = user._id === postUser._id;

  const selectLists = checkMyPost
    ? [
        { title: '수정하기', key: 'edit' },
        { title: '삭제하기', key: 'delete' },
      ]
    : [{ title: '신고하기', key: 'report' }];

  const deleteActionLists = [
    { title: '취소하기', key: 'cancel' },
    { title: '삭제하기', key: 'delete' },
  ];

  const deleteActionFunction = async (key) => {
    if (key === 'delete') {
      await deleteDaily({ id });
      getMyInformation();
      goBack();
    }
    setActionModal(false);
  };

  const reportActionLists = [
    { title: '취소하기', key: 'cancel' },
    { title: '신고하기', key: 'report' },
  ];

  const reportActionFunction = async (key) => {
    if (key === 'report') {
      postReport({ type: 'daily', reason: '데일리 부적절', subjectId: id });
    }
    setActionModal(false);
  };

  const selectFunction = checkMyPost
    ? (key) => {
        setSelectModal(false);
        if (key === 'edit') {
          navigate('DailyCreate', {
            edit: true,
            data: {
              information: {
                content: daily.textcontent,
                hashtags: daily.hashtag,
                dailyId: daily._id,
              },
              song: daily.song,
              images: daily.image
                ? daily.image.map((img) => {
                    return { uri: img };
                  })
                : [],
            },
          });
        } else if (key === 'delete') {
          setActions({
            mainTitle: '삭제된 데일리는 복구할 수 없습니다. 삭제하시겠습니까?',
            func: deleteActionFunction,
            list: deleteActionLists,
          });
          setTimeout(() => {
            setActionModal(true);
          }, 400);
        }
      }
    : (key) => {
        setSelectModal(false);
        if (key === 'report') {
          setActions({
            mainTitle: '데일리를 신고하시겠습니까?',
            func: reportActionFunction,
            list: reportActionLists,
          });
          setTimeout(() => {
            setActionModal(true);
          }, 400);
        }
      };
  return (
    <View style={style.background}>
      <Header
        title="데일리"
        titleStyle={styles.headerTitle}
        landings={post && [<LandingAction />]}
        back={!post}
      />
      {!loading ? (
        <>
          <CommentProvider>
            <ScrollView>
              <PostUser
                user={postUser}
                action={<PostUserAction setSelectModal={setSelectModal} />}
              />
              <DailySong
                selected
                containerStyle={styles.songContainer}
                time={timeConverted}
                song={song}
              />
              {image.length > 0 && <Dailyimage image={image} />}
              <SelectedText />
              <Footer object={daily} type="daily" />
              <Divider containerStyle={styles.dividerContainer} />
              <SelectedComment opt="daily" comments={comment} />
            </ScrollView>
            {currentSong && duration !== 0 && (
              <AddedProvider>
                <PlayBar />
              </AddedProvider>
            )}
            <KeyboradProvider>
              <CommentBar />
            </KeyboradProvider>
          </CommentProvider>
          <SelectModal
            modal={selectModal}
            setModal={setSelectModal}
            selectInfo={{ func: selectFunction, list: selectLists }}
          />

          {addedModal && <AddedModal title="1곡을 저장한 곡 목록에 담았습니다." />}
          <ActionModal modal={actionModal} setModal={setActionModal} actionInfo={actions} />
        </>
      ) : (
        <LoadingIndicator />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  songContainer: {
    paddingLeft: 17 * SCALE_WIDTH,
    paddingRight: 14 * SCALE_WIDTH,
    paddingVertical: 10 * SCALE_HEIGHT,
  },
  dividerContainer: {
    height: 1 * SCALE_HEIGHT,
    backgroundColor: '#DCDCDC',
    marginTop: 8 * SCALE_HEIGHT,
    marginBottom: 17 * SCALE_HEIGHT,
    width: 343 * SCALE_WIDTH,
    marginLeft: 16 * SCALE_WIDTH,
  },
  headerTitle: {
    fontSize: FS(18),
  },
  icon: {
    width: 40 * SCALE_HEIGHT,
    height: 40 * SCALE_WIDTH,
  },
});
