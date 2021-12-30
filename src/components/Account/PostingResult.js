/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View } from 'react-native';
import PostingCard from '../PostingCard';

export default function PostingResult({ data }) {
  return (
    <View>
      {data.map((item) => {
        const { _id, image, content, title, time } = item;
        return <PostingCard key={_id} image={image} title={title} content={content} time={time} />;
      })}
    </View>
  );
}
