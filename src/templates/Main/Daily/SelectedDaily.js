import React, { useContext, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import Header from 'components/Header';
import { Context as DailyContext } from 'context/Daily';
import { Context as UserContext } from 'context/User';
import PostUser from 'components/PostUser';
import Dailyimage from 'components/DailyImage';
import DailySong from 'components/Daily/DailySong';
import SelectedText from 'components/Daily/SelectedText';
import DeleteModal from 'components/Modal/DeleteMoal';
import Divider from 'widgets/Divider';
import SelectedComment from 'components/SelectedComment';
import CommentBar from 'components/CommentBar';
import TrackPlayerProvider from 'providers/trackPlayer';
import KeyboradProvider from 'providers/keyboard';
import timeConverter from 'lib/utils/time';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import Footer from 'components/Feed/Footer';
import Icon from 'widgets/Icon';
import SelectModal from 'components/Modal/SelectModal';

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
export default function SelectedDaily({ dailyId }) {
  const [selectModal, setSelectModal] = useState(false);
  const { state, addComment } = useContext(DailyContext);
  const {
    state: { user },
  } = useContext(UserContext);
  const { currentComments, currentDaily, currentSong } = state;
  const { postUserId: postUser, image, textcontent, time } = currentDaily;
  const timeConverted = timeConverter(time);
  const checkMyPost = user._id === postUser._id;

  const selectLists = checkMyPost
    ? [
        { title: '수정하기', key: 'edit' },
        { title: '삭제하기', key: 'delete' },
      ]
    : [{ title: '신고하기', key: 'report' }];

  const selectFunction = checkMyPost
    ? (key) => {
        if (key === 'edit') {
          console.log('edit');
        } else if (key === 'delete') {
          console.log('delete');
        }
      }
    : (key) => {
        if (key === 'report') {
          console.log('report');
        }
      };

  return (
    <View style={style.background}>
      <Header title="데일리" titleStyle={styles.headerTitle} back />
      <ScrollView>
        <PostUser user={postUser} action={<PostUserAction setSelectModal={setSelectModal} />} />
        <TrackPlayerProvider>
          <DailySong
            containerStyle={styles.songContainer}
            time={timeConverted}
            song={currentSong}
          />
        </TrackPlayerProvider>
        {image.length > 0 && <Dailyimage image={image} />}
        <SelectedText textcontent={textcontent} />
        <Footer object={currentDaily} type="daily" />
        <Divider containerStyle={styles.dividerContainer} />
        <SelectedComment opt="daily" targetId={dailyId} comments={currentComments} />
      </ScrollView>
      <KeyboradProvider>
        <CommentBar targetId={dailyId} action={addComment} />
      </KeyboradProvider>
      <DeleteModal />
      <SelectModal
        modal={selectModal}
        setModal={setSelectModal}
        selectInfo={{ func: selectFunction, list: selectLists }}
      />
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
  },
  headerTitle: {
    fontSize: FS(18),
  },
  icon: {
    width: 40 * SCALE_HEIGHT,
    height: 40 * SCALE_WIDTH,
  },
});
