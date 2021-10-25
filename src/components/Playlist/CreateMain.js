import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { useFocusEffect } from '@react-navigation/native';
import Header from 'components/Playlist/Header';
import CreateTitle from 'components/Playlist/CreateTitle';
import CreateHashtag from 'components/Playlist/CreateHashtag';
import CreateSongsLists from 'components/Playlist/CreateSongsLists';
import CreateThumbnail from 'components/Playlist/CreateThumbnail';
import CreateFooter from 'components/Playlist/CreateFooter';
import { usePlaylist } from 'providers/playlist';

const CreateMain = ({ isEdit, setIsSearch, playList }) => {
  const { state } = useContext(PlaylistContext);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { informationRef, setTitle, setImage, image } = usePlaylist();

  const onKeyboardDidShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  useFocusEffect(
    useCallback(() => {
      Keyboard.addListener('keyboardWillShow', onKeyboardDidShow);
      Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
      return () => {
        Keyboard.removeListener('keyboardWillShow', onKeyboardDidShow);
        Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
      };
    }, []),
  );

  useEffect(() => {
    if (isEdit && !image) {
      informationRef.current.hashtagLists = state.current_playlist.hashtag;
      informationRef.current.songs = playList;
      informationRef.current.isEdit = true;
      informationRef.current.title = state.current_playlist.title;
      setTitle(state.current_playlist.title);
      setImage(state.current_playlist.image);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={`플레이리스트${isEdit ? '수정하기' : '만들기'}`}
        click="업로드"
        isEdit={isEdit}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <View>
          <CreateTitle />
          <CreateHashtag isEdit={isEdit} />
          <CreateSongsLists songs={playList} />
          <CreateThumbnail />
        </View>
        <View style={{ marginBottom: keyboardHeight }}>
          <CreateFooter songs={playList} setIsSearch={setIsSearch} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
});

export default CreateMain;
