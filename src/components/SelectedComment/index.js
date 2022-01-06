import React from 'react';
import { View } from 'react-native';
import CommentView from 'components/CommentView';

export default function SelectedComment({ opt, targetId, comments }) {
  return (
    <View>
      {comments.map((item) => {
        return <CommentView opt={opt} targetId={targetId} key={item._id} comment={item} />;
      })}
    </View>
  );
}
