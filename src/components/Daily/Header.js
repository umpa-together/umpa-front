import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as DailyContext } from 'context/DailyContext';
import { Context as UserContext } from 'context/UserContext';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from 'components/FontNormalize';
import StatusBarHeight from 'components/StatusBarHeight';
import { goBack, navigate } from 'navigationRef';
import { useDaily } from 'providers/daily';

const Header = ({ title, click, setIsSearch, isEdit }) => {
  const { state, addDaily, editDaily, getDailys } = useContext(DailyContext);
  const { getMyInfo } = useContext(UserContext);
  const { songs, informationRef, setValidity, image, title: dailyTitle } = useDaily();
  const [isClick, setIsClick] = useState(false);

  const onClickRightOption = async () => {
    if (click === '완료') {
      if (isClick) {
        informationRef.current.songs = songs;
        setIsSearch(false);
        navigate('CreateDaily', { data: songs, isEdit: informationRef.current.isEdit });
        if (informationRef.current.title.length === 0 || !image) {
          setIsClick(false);
        }
      } else {
        setValidity((prev) => ({
          ...prev,
          song: false,
        }));
      }
    } else if (isClick) {
      if (informationRef.current.isEdit) {
        await editDaily({
          textcontent: informationRef.current.title,
          songs: informationRef.current.songs,
          hashtag: informationRef.current.hashtagLists,
          DailyId: state.current_daily._id,
        });
      } else {
        // eslint-disable-next-line no-undef
        const fd = new FormData();

        image.forEach((item) => {
          fd.append('img', {
            name: item.name,
            type: item.type,
            uri: item.uri,
          });
        });

        await addDaily({
          textcontent: informationRef.current.title,
          songs: informationRef.current.songs,
          hashtag: informationRef.current.hashtagLists,
          fd,
        });
      }
      getMyInfo();
      getDailys();
    } else {
      if (informationRef.current.title.length === 0) {
        setValidity((prev) => ({
          ...prev,
          title: false,
        }));
        return;
      }
      setValidity((prev) => ({
        ...prev,
        title: true,
      }));

      if (informationRef.current.songs.length !== 1) {
        setValidity((prev) => ({
          ...prev,
          song: false,
        }));
      } else {
        setValidity((prev) => ({
          ...prev,
          song: true,
        }));
      }
    }
  };

  const onClickBack = () => {
    if (click === '완료') {
      setIsSearch(false);
    } else {
      goBack();
    }
  };

  useEffect(() => {
    if (click === '완료') {
      if (songs.length === 1) {
        setIsClick(true);
      } else {
        setIsClick(false);
      }
    } else {
      if (songs.length === 1 && informationRef.current.title.length !== 0) {
        setIsClick(true);
      } else {
        setIsClick(false);
      }
      if (isEdit) setIsClick(true);
    }
  }, [songs, image, dailyTitle, isEdit]);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.back} onPress={onClickBack}>
        <SvgUri
          width={40 * tmpWidth}
          height={40 * tmpWidth}
          source={require('assets/icons/back.svg')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.right} onPress={onClickRightOption}>
        <Text style={[styles.text, isClick && styles.active]}>{click}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: (48 + StatusBarHeight) * tmpWidth,
    paddingTop: StatusBarHeight * tmpWidth,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 5 * tmpWidth,
    top: (2 + StatusBarHeight) * tmpWidth,
  },
  title: {
    textAlign: 'center',
    fontSize: 16 * tmpWidth,
    fontWeight: '500',
  },
  text: {
    fontWeight: '500',
    fontSize: 16 * tmpWidth,
    color: '#94979e',
  },
  active: {
    color: '#8bc0ff',
  },
  right: {
    position: 'absolute',
    right: 18 * tmpWidth,
    top: (14 + StatusBarHeight) * tmpWidth,
  },
});

export default Header;
