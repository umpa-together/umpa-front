import React, { useState, useRef, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import { useTrackPlayer } from 'providers/trackPlayer';

const MusicBar = () => {
  const { addSonginPlaylists } = useContext(UserContext);
  const { currentSong, playTime } = useTrackPlayer();
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  const opacity = useState(new Animated.Value(1))[0];
  const [addModal, setAddModal] = useState(false);
  const songsTime = 30;

  const onClickAdd = () => {
    setAddModal(true);
    addSonginPlaylists({ song: currentSong });
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setAddModal(false);
        opacity.setValue(1);
      }, 1000);
    }, 1000);
  };

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactive.setValue(-width + width * (playTime / songsTime));
  }, [playTime, width]);

  return (
    <View style={styles.container}>
      {addModal && (
        <Animated.View style={[styles.addBox, { opacity }]}>
          <Animated.Text style={[styles.addText, { opacity }]}>
            곡을 보관함에 담았습니다!
          </Animated.Text>
        </Animated.View>
      )}
      <View
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={styles.statusBar}
      >
        <Animated.View
          style={{
            width: '100%',
            backgroundColor: '#8bc0ff',
            height: '100%',
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          }}
        />
      </View>
      <View style={styles.optionBox}>
        <TouchableOpacity style={styles.option}>
          <View style={styles.icon}>
            <SvgUri width="17" height="20" source={require('assets/icons/musicBarPlay.svg')} />
          </View>
          <Text style={styles.text}>재생</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={onClickAdd}>
          <View style={styles.icon}>
            <SvgUri width="16" height="16" source={require('assets/icons/musicBarAdd.svg')} />
          </View>
          <Text style={styles.text}>담기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  optionBox: {
    height: 62 * tmpWidth,
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  option: {
    alignItems: 'center',
  },
  icon: {
    width: 40 * tmpWidth,
    height: 40 * tmpWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14 * tmpWidth,
    fontWeight: '400',
    color: '#ffffff',
  },
  statusBar: {
    height: 4 * tmpWidth,
    backgroundColor: '#c4c4c4',
  },
  addBox: {
    backgroundColor: 'rgba(0,0,0,0.46)',
    width: 196 * tmpWidth,
    height: 29 * tmpWidth,
    borderRadius: 100 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 16 * tmpWidth,
    left: 89 * tmpWidth,
  },
  addText: {
    fontSize: 14 * tmpWidth,
    color: '#ffffff',
  },
});

export default MusicBar;
