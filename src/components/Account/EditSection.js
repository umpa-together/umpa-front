import React, { useContext, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import { useProfileEdit } from 'providers/profileEdit';
import { Context as UserContext } from 'context/User';
import { useModal } from 'providers/modal';
import ScrollSong from 'components/ScrollSong';
import Movable from 'components/ScrollSong/Movable';
import SongView from 'components/SongView';
import TrackPlayerProvider from 'providers/trackPlayer';
import { useSongActions } from 'providers/songActions';
import ProfileImage from 'widgets/ProfileImage';
import { onClickSingle } from 'lib/utils/imageEditor';

export function ProfileImageSection() {
  const { image, setImage } = useProfileEdit();
  const onClickProfile = () => {
    onClickSingle(setImage);
  };
  return (
    <TouchableOpacity onPress={onClickProfile}>
      <ProfileImage img={image.uri} imgStyle={styles.profile} />
    </TouchableOpacity>
  );
}

export function GenreSection() {
  const { state, getGenreLists } = useContext(UserContext);
  const { onClickGenre } = useProfileEdit();

  useEffect(() => {
    getGenreLists();
  }, []);

  return (
    <>
      <Text>선호장르</Text>
      <View style={[styles.wrap, style.flexRow]}>
        {state.genreLists &&
          state.genreLists.map((item) => {
            const { _id: id, genre } = item;
            return (
              <TouchableOpacity key={id} onPress={() => onClickGenre(genre)}>
                <Text>{genre}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </>
  );
}

export function RepresentSongSection() {
  const { searchModal, setSearchModal } = useModal();
  const { setActionType, getActionComponent } = useSongActions();
  const { songs } = useProfileEdit();

  const onClickAddSong = () => {
    setSearchModal(true);
  };

  useEffect(() => {
    if (!searchModal) {
      setActionType('playlistDeleteSong');
    } else {
      setActionType('playlistAddSong');
    }
  }, [searchModal]);

  return (
    <>
      <Text>대표곡</Text>
      <TouchableOpacity onPress={onClickAddSong}>
        <Text>곡 추가</Text>
      </TouchableOpacity>
      <TrackPlayerProvider>
        <ScrollSong songs={songs}>
          {songs.map((song) => {
            return (
              <Movable key={song.id} id={song.id} songsCount={songs.length}>
                <SongView song={song} actions={getActionComponent({ data: song })} />
              </Movable>
            );
          })}
        </ScrollSong>
      </TrackPlayerProvider>
    </>
  );
}

export default function EditSection({ title, placeholder }) {
  const { profile, onChangeValue } = useProfileEdit();

  return (
    <View style={style.flexRow}>
      <Text>{title}</Text>
      <TextInput
        value={
          // eslint-disable-next-line no-nested-ternary
          title === '닉네임'
            ? profile.nickName
            : title === '이름'
            ? profile.name
            : profile.introduction
        }
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => onChangeValue(title, text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexWrap: 'wrap',
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
  },
});
