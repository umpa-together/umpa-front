import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useProfileEdit } from 'providers/profileEdit';
import { useModal } from 'providers/modal';
import ScrollSong from 'components/ScrollSong';
import Movable from 'components/ScrollSong/Movable';
import ScrollSongView from 'components/SongView/ScrollSongView';
import TrackPlayerProvider from 'providers/trackPlayer';
import { useSongActions } from 'providers/songActions';
import ProfileImage from 'widgets/ProfileImage';
import { onClickSingle, onClickCrop } from 'lib/utils/imageEditor';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_3, MAIN_COLOR } from 'constants/colors';
import GenreModal from 'components/Modal/GenreModal';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import SongDeleteModal from 'components/Modal/SongDeleteModal';

export function ImageSection() {
  const { profileImage, setProfileImage, backgroundImage, setBackgroundImage } = useProfileEdit();
  const onClickProfile = () => {
    onClickSingle(setProfileImage);
  };

  const onClickBackground = () => {
    onClickCrop(setBackgroundImage);
  };

  return (
    <View style={styles.background}>
      {backgroundImage.name !== '' && (
        <Image source={{ uri: backgroundImage.uri }} style={styles.backgroundImg} />
      )}
      <TouchableOpacity style={styles.backgroundContainer} onPress={onClickBackground}>
        <Icon source={require('public/icons/opacity-rectangle.png')} style={styles.changeBox} />
        <Text style={styles.backgroundText}>배경 변경</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileContainer} onPress={onClickProfile}>
        <Icon source={require('public/icons/opacity-circle.png')} style={styles.circle} />
        <ProfileImage img={profileImage.uri} imgStyle={styles.profile} />
        <Text style={styles.changeText}>변경</Text>
      </TouchableOpacity>
    </View>
  );
}
export function GenreSection() {
  const [genreModal, setGenreModal] = useState(false);
  const onClickSelect = () => {
    setGenreModal(true);
  };

  return (
    <View>
      <Text style={styles.title}>선호장르</Text>
      <TouchableOpacity style={styles.sectionBox} onPress={onClickSelect}>
        <Text style={styles.title}>선호 장르 선택</Text>
      </TouchableOpacity>
      <GenreModal modal={genreModal} setModal={setGenreModal} />
    </View>
  );
}

const SongLandings = ({ song }) => {
  const [songDeletemodal, setSongDeleteModal] = useState(false);
  const { setSongs } = useProfileEdit();
  const onClickDeleteSongModal = () => {
    setSongDeleteModal(true);
  };
  return (
    <>
      <TouchableOpacity style={styles.box} activeOpacity={0.9} onPress={onClickDeleteSongModal}>
        <View style={styles.removeCircle}>
          {songDeletemodal && <View style={styles.activeCircle} />}
        </View>
      </TouchableOpacity>
      <SongDeleteModal
        song={song}
        setSong={setSongs}
        modal={songDeletemodal}
        setModal={setSongDeleteModal}
      />
    </>
  );
};

export function RepresentSongSection() {
  const { searchModal, setSearchModal } = useModal();
  const { setActionType } = useSongActions();
  const { songs } = useProfileEdit();
  const onClickAddSong = () => {
    setSearchModal(true);
  };

  useEffect(() => {
    if (searchModal) {
      setActionType('playlistAddSong');
    }
  }, [searchModal]);

  return (
    <View style={{ marginBottom: 30 * SCALE_HEIGHT }}>
      <View style={[styles.songHeader, style.flexRow, style.space_between]}>
        <Text style={styles.title}>대표곡 (최대 5곡)</Text>
        <TouchableOpacity style={styles.plusBox} onPress={onClickAddSong}>
          <Text style={styles.plusText}>+ 곡 추가</Text>
        </TouchableOpacity>
      </View>
      <TrackPlayerProvider>
        <ScrollSong songs={songs}>
          {songs.map((song) => {
            return (
              <Movable key={song.id} id={song.id} songsCount={songs.length}>
                <ScrollSongView song={song} landings={<SongLandings song={song} />} />
              </Movable>
            );
          })}
        </ScrollSong>
      </TrackPlayerProvider>
    </View>
  );
}

export default function EditSection({ title, placeholder }) {
  const { profile, onChangeValue } = useProfileEdit();

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.sectionBox}
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
        placeholderTextColor={COLOR_3}
        maxLength={title === '닉네임' || title === '이름' ? 10 : null}
        // multiline={title === '소개글'}
        onChangeText={(text) => onChangeValue(title, text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 122 * SCALE_HEIGHT,
    marginBottom: 60 * SCALE_HEIGHT,
  },
  backgroundImg: {
    height: 122 * SCALE_HEIGHT,
    width: '100%',
    position: 'absolute',
  },
  backgroundContainer: {
    position: 'absolute',
    bottom: 8 * SCALE_HEIGHT,
    right: 16 * SCALE_WIDTH,
    zIndex: 98,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeBox: {
    width: 81 * SCALE_WIDTH,
    height: 24 * SCALE_HEIGHT,
  },
  backgroundText: {
    fontSize: FS(12),
    color: '#fff',
    position: 'absolute',
  },
  title: {
    color: COLOR_3,
    fontSize: FS(12),
  },
  sectionBox: {
    width: 343 * SCALE_WIDTH,
    minHeight: 32 * SCALE_HEIGHT,
    borderColor: '#dbdbdb',
    borderWidth: 1 * SCALE_WIDTH,
    borderRadius: 6 * SCALE_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 12 * SCALE_WIDTH,
    marginTop: 10 * SCALE_HEIGHT,
    marginBottom: 24 * SCALE_HEIGHT,
  },
  profileContainer: {
    position: 'absolute',
    width: 90 * SCALE_WIDTH,
    height: 90 * SCALE_WIDTH,
    top: 76 * SCALE_HEIGHT,
    left: 142 * SCALE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    width: 90 * SCALE_WIDTH,
    height: 90 * SCALE_WIDTH,
    borderRadius: 90 * SCALE_HEIGHT,
    position: 'absolute',
  },
  circle: {
    width: 90 * SCALE_WIDTH,
    height: 90 * SCALE_WIDTH,
    position: 'absolute',
    zIndex: 1,
  },
  changeText: {
    fontSize: FS(14),
    fontWeight: '400',
    color: '#fff',
    zIndex: 98,
  },
  songHeader: {
    borderBottomWidth: 1 * SCALE_WIDTH,
    borderColor: '#dbdbdb',
    width: 343 * SCALE_WIDTH,
    paddingBottom: 6 * SCALE_HEIGHT,
  },
  plusBox: {
    paddingHorizontal: 8 * SCALE_WIDTH,
    paddingVertical: 5 * SCALE_HEIGHT,
    borderColor: MAIN_COLOR,
    borderWidth: 1 * SCALE_WIDTH,
    borderRadius: 44 * SCALE_HEIGHT,
  },
  plusText: {
    fontSize: FS(11),
    fontWeight: '300',
    color: MAIN_COLOR,
  },
  removeCircle: {
    width: 20 * SCALE_WIDTH,
    height: 20 * SCALE_WIDTH,
    borderRadius: 20 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: '#dbdbdb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10 * SCALE_WIDTH,
  },
  activeCircle: {
    width: 12 * SCALE_WIDTH,
    height: 12 * SCALE_WIDTH,
    borderRadius: 12 * SCALE_HEIGHT,
    backgroundColor: MAIN_COLOR,
  },
});
