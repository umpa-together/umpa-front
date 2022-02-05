/* eslint-disable import/named */
import React, { useEffect } from 'react';
import { Provider as UserProvider } from 'context/User';
import { Provider as AuthProvider } from 'context/Auth';
import { Provider as AppleMusicProvider } from 'context/AppleMusic';
import { Provider as RelayProvider } from 'context/Relay';
import { Provider as PlaylistProvider } from 'context/Playlist';
import { Provider as DailyProvider } from 'context/Daily';
import ModalProvider from 'providers/modal';
import TrackPlayerProvider from 'providers/trackPlayer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { fcmService } from 'lib/utils/fcmService';
import { localNotificationService } from 'lib/utils/localNotificationService';

import MainNavigator from './src/navigation';

export default () => {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    async function onRegister(token) {
      await AsyncStorage.setItem('noticetoken', token);
      console.log('[APP] onRegsiter: ', token);
    }

    function onNotification(notify) {
      console.log('[App] onNotificagtion: ', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(0, notify.title, notify.body, notify, options);
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify);
    }

    return () => {
      console.log('[App] unRegsiter');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  return (
    <AppleMusicProvider>
      <UserProvider>
        <AuthProvider>
          <DailyProvider>
            <PlaylistProvider>
              <RelayProvider>
                <ModalProvider>
                  <TrackPlayerProvider>
                    <MainNavigator />
                  </TrackPlayerProvider>
                </ModalProvider>
              </RelayProvider>
            </PlaylistProvider>
          </DailyProvider>
        </AuthProvider>
      </UserProvider>
    </AppleMusicProvider>
  );
};
