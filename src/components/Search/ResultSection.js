/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import SongView from 'components/SongView';
import { navigate } from 'lib/utils/navigation';
import { useSearch } from 'providers/search';

const Header = ({ title, data }) => {
  const { text } = useSearch();
  const onClickMore = () => {
    navigate('ResultMore', { keyword: text, title, data: title !== '곡' ? data : null });
  };

  return (
    <View>
      <Text>{title}</Text>
      <Button title="더보기" onPress={onClickMore} />
    </View>
  );
};

export default function ResultSection({ title, data }) {
  const onClickItem = (item) => {
    if (title === '곡') {
      navigate('SelectedSong', { song: item });
    }
  };

  return (
    <>
      <Header title={title} data={data} />
      {data.slice(0, 5).map((item) => {
        const id = item.id ? item.id : item._id;
        return (
          <TouchableOpacity key={id} onPress={() => onClickItem(item)}>
            {title === '곡' ? (
              <SongView song={item} />
            ) : title === '플레이리스트' ? (
              <Text>플레이리스트</Text>
            ) : title === '데일리' ? (
              <Text>데일리</Text>
            ) : title === '계정' ? (
              <Text>계정</Text>
            ) : (
              <Text>해시태그</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </>
  );
}
