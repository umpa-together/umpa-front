import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayerInitializer from 'lib/utils/trackPlayer';
import FastImage from 'react-native-fast-image';

export default function Splash({ setIsSplash }) {
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    TrackPlayerInitializer();
    fadeIn();
    const loading = setTimeout(() => setIsSplash(false), 1500);
    return () => clearTimeout(loading);
  }, []);

  return (
    <LinearGradient
      colors={['rgb(229,229,255)', 'rgba(229,231,239,0)']}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.View style={{ width: 194.9, height: 119.9, opacity }}>
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={require('public/icons/logo.png')}
        />
      </Animated.View>
      <Animated.Text
        style={{
          fontSize: 16,
          color: 'rgb(169,193,255)',
          marginTop: 26.5,
          opacity,
        }}
      >
        퍼져나가는 음악 취향, 음파
      </Animated.Text>
    </LinearGradient>
  );
}
