import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NoticeScreen from 'screens/Main/Notice';

import OtherAccount from 'screens/Main/Account/OtherAccount';
import FollowPage from 'screens/Main/Account/FollowPage';
import ProfileEditPage from 'screens/Main/Account/ProfileEditPage';
import SettingPage from 'screens/Main/Account/SettingPage';
import SongEditPage from 'screens/Main/Account/SongEditPage';
import FeedBackPage from 'screens/Main/Account/FeedbackPage';
import InformationUsePage from 'screens/Main/Account/InformationUsePage';
import MusicBoxScreen from 'screens/Main/Account/MusicBoxScreen';

import CreatePlayListPage from 'screens/Main/Playlist/CreatePlayListPage';
import SelectedPlaylist from 'screens/Main/Playlist/SelectedPlaylist';

import SearchScreen from 'screens/Main/Home/SearchScreen';
import SelectedHashtagScreen from 'screens/Main/Home/SelectedHashtagScreen';
import AllContentsScreen from 'screens/Main/Home/AllContentsScreen';
import ContentsMoreScreen from 'screens/Main/Home/ContentsMoreScreen';

import Chat from 'screens/Main/Chat/Chat';
import CreateChat from 'screens/Main/Chat/CreateChat';
import SelectedChat from 'screens/Main/Chat/SelectedChat';

import SelectedDaily from 'screens/Main/Daily/SelectedDaily';
import DailyCreate from 'screens/Main/Daily/DailyCreate';

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
