import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {fcmService} from './src/FCMService';
import {localNotificationService} from './src/LocalNotificationService';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as SearchProvider } from './src/context/SearchContext';
import { Provider as BoardProvider } from './src/context/BoardContext';
import { Provider as PlaylistProvider } from './src/context/PlaylistContext';
import { Provider as SearchPlaylistProvider } from './src/context/SearchPlaylistContext';
import { Provider as UserProvider } from './src/context/UserContext';
import { Provider as DJProvider } from './src/context/DJContext';
import { Provider as CurationProvider } from './src/context/CurationContext';
import { Provider as NoticeProvider } from './src/context/NoticeContext';
import { Provider as WeeklyProvider } from './src/context/WeeklyContext';
import { Provider as ReportProvider } from './src/context/ReportContext';

import TrackPlayerProvider from './src/providers/trackPlayer'
import ModalProvider from './src/providers/modal'

import MainNavigator from './src/navigator.js';

export default () => {
    useEffect(()=> {
        fcmService.registerAppWithFCM();
        fcmService.register(onRegister, onNotification, onOpenNotification);
        localNotificationService.configure(onOpenNotification);

        async function onRegister(token){
            await AsyncStorage.setItem('noticetoken', token);
            console.log("[APP] onRegsiter: ", token)
        }

        function onNotification(notify){
            console.log("[App] onNotificagtion: ", notify)
            const options = {
                soundName : 'default',
                playSound : true
            };
            localNotificationService.showNotification(
                0,
                notify.title,
                notify.body,
                notify,
                options
            )
        }

        function onOpenNotification(notify){
            console.log("[App] onOpenNotification: ", notify)
        }

        return() => {
            console.log("[App] unRegsiter")
            fcmService.unRegister()
            localNotificationService.unregister()
        }
    }, []);

    return (
        <ModalProvider>
        <TrackPlayerProvider>
            <ReportProvider>
                <WeeklyProvider>
                    <NoticeProvider>
                        <CurationProvider>
                            <DJProvider>
                                <UserProvider>
                                    <SearchPlaylistProvider>
                                        <PlaylistProvider>
                                            <BoardProvider>
                                                <SearchProvider>
                                                    <AuthProvider>
                                                        <MainNavigator/>
                                                    </AuthProvider>
                                                </SearchProvider>
                                            </BoardProvider>
                                        </PlaylistProvider>
                                    </SearchPlaylistProvider>
                                </UserProvider>
                            </DJProvider>
                        </CurationProvider>
                    </NoticeProvider>
                </WeeklyProvider>
            </ReportProvider>
        </TrackPlayerProvider>
        </ModalProvider>
    )
}