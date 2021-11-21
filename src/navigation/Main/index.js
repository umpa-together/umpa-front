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

import SearchBoardPage from 'screens/Board/SearchBoardPage';
import CreateBoardPage from 'screens/Board/CreateBoardPage';
import SelectedBoardPage from 'screens/Board/SelectedBoardPage';
import CreateContentPage from 'screens/Board/CreateContentPage';
import SelectedContentPage from 'screens/Board/SelectedContentPage';
import MyContentsPage from 'screens/Board/MyContentsPage';
import SearchContentPage from 'screens/Board/SearchContentPage';
import MusicArchivePage from 'screens/Board/MusicArchivePage';
import SearchMusicPage from 'screens/Board/SearchMusicPage';
import MySharedSongsPage from 'screens/Board/MySharedSongsPage';

import SearchScreen from 'screens/Main/SearchScreen';
import SelectedHashtagScreen from 'screens/Main/SelectedHashtagScreen';
import AllContentsScreen from 'screens/Main/AllContentsScreen';
import ContentsMoreScreen from 'screens/Main/ContentsMoreScreen';
import CreateModal from 'components/CreateModal';

import Chat from 'screens/Chat/Chat';
import SelectedChat from 'screens/Chat/SelectedChat';
import CreateChat from 'screens/Chat/CreateChat';

import DailyCreate from 'screens/Daily/DailyCreate';
import SelectedDaily from 'screens/Daily/SelectedDaily';

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
    <MainStack.Screen name="SearchBoard" component={SearchBoardPage} />
    <MainStack.Screen name="CreateBoard" component={CreateBoardPage} />
    <MainStack.Screen name="SelectedBoard" component={SelectedBoardPage} />
    <MainStack.Screen name="CreateDaily" component={DailyCreate} />

    <MainStack.Screen name="CreateContent" component={CreateContentPage} />
    <MainStack.Screen name="SelectedContent" component={SelectedContentPage} />
    <MainStack.Screen name="MyContents" component={MyContentsPage} />
    <MainStack.Screen name="SearchContent" component={SearchContentPage} />
    <MainStack.Screen name="MusicArchive" component={MusicArchivePage} />
    <MainStack.Screen name="SearchMusic" component={SearchMusicPage} />

    <MainStack.Screen name="MySharedSongs" component={MySharedSongsPage} />
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
