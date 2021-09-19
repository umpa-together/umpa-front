import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {fcmService} from 'FCMService';
import {localNotificationService} from 'LocalNotificationService';

import { Provider as AuthProvider } from 'context/AuthContext';
import { Provider as SearchProvider } from 'context/SearchContext';
import { Provider as BoardProvider } from 'context/BoardContext';
import { Provider as PlaylistProvider } from 'context/PlaylistContext';
import { Provider as SearchPlaylistProvider } from 'context/SearchPlaylistContext';
import { Provider as UserProvider } from 'context/UserContext';
import { Provider as DJProvider } from 'context/DJContext';
import { Provider as CurationProvider } from 'context/CurationContext';
import { Provider as NoticeProvider } from 'context/NoticeContext';
import { Provider as WeeklyProvider } from 'context/WeeklyContext';
import { Provider as ReportProvider } from 'context/ReportContext';
import { Provider as DailyProvider } from './src/context/DailyContext';
import { Provider as ChatProvider } from './src/context/ChatContext';

import TrackPlayerProvider from 'providers/trackPlayer'
import ModalProvider from 'providers/modal'

import MainNavigator from 'navigator.js';

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
                        <DailyProvider>
                            <CurationProvider>
                                <ChatProvider>
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
                                </ChatProvider>
                            </CurationProvider>
                        </DailyProvider>
                    </NoticeProvider>
                </WeeklyProvider>
            </ReportProvider>
        </TrackPlayerProvider>
        </ModalProvider>
    )
}