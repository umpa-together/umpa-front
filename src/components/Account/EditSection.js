import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useProfileEdit } from 'providers/profileEdit';
import { Context as UserContext } from 'context/User';
import ScrollSong from 'components/ScrollSong';
import Movable from 'components/ScrollSong/Movable';
import ScrollSongView from 'components/SongView/ScrollSongView';
import ProfileImage from 'widgets/ProfileImage';
import { onClickSingle } from 'lib/utils/imageEditor';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_3, MAIN_COLOR, COLOR_5 } from 'constants/colors';
import GenreModal from 'components/Modal/GenreModal';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import DeleteModal from 'components/Modal/DeleteModal';
import SearchSongModal from 'components/Modal/SearchSongModal';
import { useSongActions } from 'providers/songActions';
import { useFocusEffect } from '@react-navigation/native';
import Text from 'components/Text';
import ProfileBackground from './ProfileBackground';

export function ImageSection() {
  const { profileImage, setProfileImage, backgroundImage, setBackgroundImage } = useProfileEdit();
  const onClickProfile = () => {
    onClickSingle(setProfileImage);
  };

  const onClickBackground = () => {
    onClickSingle(setBackgroundImage);
  };

  return (
    <View style={styles.background}>
      <ProfileBackground img={backgroundImage.uri} imgStyle={styles.backgroundImg} />
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
  const { getGenreLists } = useContext(UserContext);
  const { profile } = useProfileEdit();
  const [genreModal, setGenreModal] = useState(false);
  const onClickSelect = () => {
    setGenreModal(true);
  };

  useEffect(() => {
    getGenreLists();
  }, []);

  return (
    <View style={styles.genreContainer}>
      <Text style={styles.title}>선호장르</Text>
      <TouchableOpacity style={styles.sectionBox} onPress={onClickSelect}>
        {profile.genre.length === 0 ? (
          <Text style={styles.genreText}>선호 장르 선택</Text>
        ) : (
          <View style={style.flexRow}>
            {profile.genre.map((item, index) => {
              return (
                <View key={item} style={style.flexRow}>
                  <Text style={styles.title}>{item}</Text>
                  {index !== profile.genre.length - 1 && <Text style={styles.title}>, </Text>}
                </View>
              );
            })}
          </View>
        )}
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
  const deleteFunction = () => {
    setSongs((prev) => prev.filter((item) => item.id !== song.id));
  };
  return (
    <>
      <TouchableOpacity style={styles.box} activeOpacity={0.9} onPress={onClickDeleteSongModal}>
        <View style={styles.removeCircle}>
          {songDeletemodal && <View style={styles.activeCircle} />}
        </View>
      </TouchableOpacity>
      <DeleteModal
        deleteFunc={deleteFunction}
        modal={songDeletemodal}
        setModal={setSongDeleteModal}
      />
    </>
  );
};

export function RepresentSongSection() {
  const [searchModal, setSearchModal] = useState(false);
  const { songs, setSongs } = useProfileEdit();
  const { searchInfoRef, setSelectedSongs, selectedSongs } = useSongActions();

  const onClickAddSong = () => {
    setSelectedSongs(songs);
    setSearchModal(true);
  };

  useFocusEffect(
    useCallback(() => {
      searchInfoRef.current = { title: '대표곡 선택', key: 'represent', completeFunc: setSongs };
    }, []),
  );

  return (
    <View>
      <View style={[styles.songHeader, style.flexRow, style.space_between]}>
        <Text style={styles.title}>
          대표곡<Text style={styles.accent}>*</Text> (최대 3곡)
        </Text>
        <TouchableOpacity style={styles.plusBox} onPress={onClickAddSong}>
          <Text style={styles.plusText}>+ 곡 추가</Text>
        </TouchableOpacity>
      </View>
      <ScrollSong songs={songs}>
        {songs.map((song) => {
          return (
            <Movable key={song.id} id={song.id} songsCount={songs.length}>
              <ScrollSongView song={song} landings={<SongLandings song={song} />} />
            </Movable>
          );
        })}
      </ScrollSong>
      <SearchSongModal
        modal={searchModal}
        setModal={setSearchModal}
        activeCheck={selectedSongs.length > 0}
      />
    </View>
  );
}

export default function EditSection({ title, placeholder }) {
  const { profile, onChangeValue } = useProfileEdit();
  const valueLists = {
    닉네임: profile.nickName,
    이름: profile.realName,
    소개글: profile.introduction,
  };
  return (
    <View style={styles.sectionContainer}>
      <View style={style.flexRow}>
        <Text style={styles.title}>{title}</Text>
        {title === '닉네임' && <Text style={styles.accent}>*</Text>}
      </View>
      <TextInput
        style={styles.sectionBox}
        value={valueLists[title]}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={COLOR_3}
        maxLength={title === '닉네임' ? 10 : null}
        // multiline={title === '소개글'}
        onChangeText={(text) => onChangeValue(title, text)}
      />
      {title === '닉네임' && (
        <Text style={styles.subText}>* 한글 7자 이내, 영문 포함 10자 이내</Text>
      )}
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
  genreText: {
    color: COLOR_3,
    fontSize: FS(15),
  },
  sectionContainer: {
    marginBottom: 24 * SCALE_HEIGHT,
  },
  sectionBox: {
    width: 343 * SCALE_WIDTH,
    minHeight: 32 * SCALE_HEIGHT,
    borderColor: '#dbdbdb',
    borderWidth: 1 * SCALE_WIDTH,
    borderRadius: 6 * SCALE_HEIGHT,
    justifyContent: 'center',
    padding: 0,
    paddingHorizontal: 12 * SCALE_WIDTH,
    marginTop: 10 * SCALE_HEIGHT,
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
  accent: {
    color: MAIN_COLOR,
    marginLeft: 3 * SCALE_WIDTH,
  },
  active: {
    width: 343 * SCALE_WIDTH,
    height: 49 * SCALE_HEIGHT,
    backgroundColor: MAIN_COLOR,
    borderRadius: 20 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subText: {
    fontSize: FS(11),
    marginTop: 8 * SCALE_HEIGHT,
    color: COLOR_5,
  },
  genreContainer: {
    marginBottom: 62 * SCALE_HEIGHT,
  },
});
