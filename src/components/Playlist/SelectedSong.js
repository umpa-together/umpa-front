import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import SongView from 'components/SongView';

export default function SelectedSong({ songs }) {
  const [isMore, setIsMore] = useState(false);
  const onClickMore = () => {
    setIsMore(!isMore);
  };
  const songCount = songs.length;

  return (
    <View>
      <Text>{`총 ${songCount}곡`}</Text>
      <View style={[!isMore && { maxHeight: 240 }, { overflow: 'hidden' }]}>
        {songs.map((item) => {
          return <SongView key={item.id} song={item} />;
        })}
      </View>
      {songCount > 4 && <Button title={isMore ? '줄이기' : '더보기'} onPress={onClickMore} />}
    </View>
  );
}
