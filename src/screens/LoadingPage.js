import React, { useEffect, useState } from 'react';
import { Animated, Image } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import LinearGradient from 'react-native-linear-gradient';
import { tmpWidth } from 'components/FontNormalize';

const LoadingPage = ({ setIsSplash }) => {
  const opacity = useState(new Animated.Value(0))[0];

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
    }).start();
  };

  useEffect(() => {
    TrackPlayer.setupPlayer({ waitForBuffer: true }).then(async () => {
      await TrackPlayer.updateOptions({
        stopWithApp: false,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
        ],
        notificationCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
        ],
      });
    });
    fadeIn();
    const loading = setTimeout(() => setIsSplash(false), 1500);
    return () => clearTimeout(loading);
  }, []);
  return (
    <LinearGradient
      colors={['rgb(229,229,255)', 'rgba(229,231,239,0)']}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.View style={{ width: 194.9 * tmpWidth, height: 119.9 * tmpWidth, opacity }}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={require('assets/icons/logo.png')}
        />
      </Animated.View>
      <Animated.Text
        style={{
          fontSize: 16 * tmpWidth,
          color: 'rgb(169,193,255)',
          marginTop: 26.5 * tmpWidth,
          opacity,
        }}
      >
        퍼져나가는 음악 취향, 음파
      </Animated.Text>
    </LinearGradient>
  );
};

export default LoadingPage;
