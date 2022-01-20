import React, { useContext } from 'react';
import { View, ScrollView, Button, StyleSheet } from 'react-native';
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
import SelectedInfo from 'components/Daily/SelectedInfo';
import TrackPlayerProvider from 'providers/trackPlayer';
import KeyboradProvider from 'providers/keyboard';
import timeConverter from 'lib/utils/time';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

const PostUserAction = () => {
  return <Button title="더보기" />;
};
export default function SelectedDaily({ dailyId }) {
  const { state, addComment } = useContext(DailyContext);
  const { state: user } = useContext(UserContext);
  const { myId } = user.user._id;
  const { currentComments, currentDaily, currentSong } = state;
  const { postUserId: postUser, image, textcontent, likes, time } = currentDaily;
  const commentCount = currentComments.length;
  const checkMypost = postUser === myId;
  const timeConverted = timeConverter(time);

  return (
    <View style={style.background}>
      <Header title="데일리" titleStyle={styles.headerTitle} back />
      <ScrollView>
        <PostUser user={postUser} action={checkMypost && <PostUserAction />} />
        <TrackPlayerProvider>
          <DailySong
            containerStyle={styles.songContainer}
            time={timeConverted}
            song={currentSong}
            selected
          />
        </TrackPlayerProvider>
        {image.length > 0 && <Dailyimage image={image} />}
        <SelectedText textcontent={textcontent} />
        <SelectedInfo myId={myId} dailyId={dailyId} likes={likes} commentCount={commentCount} />
        <Divider containerStyle={styles.dividerContainer} />
        <SelectedComment opt="daily" targetId={dailyId} comments={currentComments} />
      </ScrollView>
      <KeyboradProvider>
        <CommentBar targetId={dailyId} action={addComment} />
      </KeyboradProvider>
      <DeleteModal />
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
    marginBottom: 17 * SCALE_HEIGHT,
  },
  headerTitle: {
    fontSize: FS(18),
  },
});
