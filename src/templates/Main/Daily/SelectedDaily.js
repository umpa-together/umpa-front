import React, { useContext } from 'react';
import { View, ScrollView, Button } from 'react-native';
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

const PostUserAction = () => {
  return <Button title="더보기" />;
};
export default function SelectedDaily({ dailyId }) {
  const { state, addComment } = useContext(DailyContext);
  const { state: user } = useContext(UserContext);
  const { myId } = user.user._id;
  const { currentComments, currentDaily, currentSong } = state;
  const { postUserId: postUser, image, textcontent, likes } = currentDaily;
  const commentCount = currentComments.length;
  const checkMypost = postUser === myId;

  return (
    <View style={style.background}>
      <ScrollView>
        <Header title="데일리" back />
        <PostUser user={postUser} action={checkMypost && <PostUserAction />} />
        {image.length > 0 && <Dailyimage image={image} />}
        <DailySong song={currentSong} />
        <SelectedText textcontent={textcontent} />
        <SelectedInfo myId={myId} dailyId={dailyId} likes={likes} commentCount={commentCount} />
        <Divider />
        <SelectedComment opt="daily" targetId={dailyId} comments={currentComments} />
      </ScrollView>
      <CommentBar targetId={dailyId} action={addComment} />
      <DeleteModal />
    </View>
  );
}
