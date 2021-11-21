import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NoticeScreen from 'screens/NoticeScreen';

import OtherAccount from 'screens/Account/OtherAccount';
import FollowPage from 'screens/Account/FollowPage';
import ProfileEditPage from 'screens/Account/ProfileEditPage';
import SettingPage from 'screens/Account/SettingPage';
import SongEditPage from 'screens/Account/SongEditPage';
import FeedBackPage from 'screens/Account/FeedbackPage';
import InformationUsePage from 'screens/Account/InformationUsePage';
import MusicBoxScreen from 'screens/Account/MusicBoxScreen';

import CreatePlayListPage from 'screens/Playlist/CreatePlayListPage';
import SelectedPlaylist from 'screens/Playlist/SelectedPlaylist';

import SearchScreen from 'screens/Main/SearchScreen';
import SelectedHashtagScreen from 'screens/Main/SelectedHashtagScreen';
import AllContentsScreen from 'screens/Main/AllContentsScreen';
import ContentsMoreScreen from 'screens/Main/ContentsMoreScreen';

import Chat from 'screens/Chat/Chat';
import CreateChat from 'screens/Chat/CreateChat';
import SelectedChat from 'screens/Chat/SelectedChat';

import SelectedDaily from 'screens/Daily/SelectedDaily';
import DailyCreate from 'screens/Daily/DailyCreate';

import CreateModal from 'components/Modal/CreateModal';

import TabScreen from './Tab';

const MainStack = createNativeStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainStack.Screen name="Tab" component={TabScreen} />
    <MainStack.Screen name="Search" component={SearchScreen} />
    <MainStack.Screen name="Create" component={CreatePlayListPage} />
    <MainStack.Screen name="AllContents" component={AllContentsScreen} />
    <MainStack.Screen name="ContentsMore" component={ContentsMoreScreen} />
    <MainStack.Screen name="SelectedDaily" component={SelectedDaily} />
    <MainStack.Screen name="Chat" component={Chat} />
    <MainStack.Screen name="SelectedChat" component={SelectedChat} />
    <MainStack.Screen name="CreateChat" component={CreateChat} />
    <MainStack.Screen name="SelectedPlaylist" component={SelectedPlaylist} />
    <MainStack.Screen name="SelectedHashtag" component={SelectedHashtagScreen} />
    <MainStack.Screen name="CreateDaily" component={DailyCreate} />
    <MainStack.Screen name="OtherAccount" component={OtherAccount} />
    <MainStack.Screen name="Follow" component={FollowPage} />
    <MainStack.Screen name="ProfileEdit" component={ProfileEditPage} />
    <MainStack.Screen name="Setting" component={SettingPage} />
    <MainStack.Screen name="SongEdit" component={SongEditPage} />
    <MainStack.Screen name="FeedBack" component={FeedBackPage} />
    <MainStack.Screen name="InformationUse" component={InformationUsePage} />
    <MainStack.Screen name="MusicBox" component={MusicBoxScreen} />
    <MainStack.Screen name="Notice" component={NoticeScreen} />
    <MainStack.Screen
      name="CreatePosts"
      component={CreateModal}
      options={{
        presentation: 'transparentModal',
      }}
    />
  </MainStack.Navigator>
);

export default MainStackScreen;
