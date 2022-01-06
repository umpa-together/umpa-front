import React from 'react';
import { View } from 'react-native';
import CommentView from '../CommentView';

export default function SelectedComment({ playlistId, comments }) {
  return (
    <View>
      {comments.map((item) => {
        return <CommentView opt="playlist" targetId={playlistId} key={item._id} comment={item} />;
      })}
    </View>
  );
}
