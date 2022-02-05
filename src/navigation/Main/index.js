import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Follow from 'screens/Main/Account/FollowScreen';
import OtherAccount from 'screens/Main/Account/OtherAccountScreen';
import SelectedRelay from 'screens/Main/Relay/SelectedRelayScreen';
import Swipe from 'screens/Main/Relay/SwipeScreen';
import SearchDetail from 'screens/Main/Search/SearchDetailScreen';
import SelectedSong from 'screens/Main/Search/SelectedSongScreen';
import SelectedHashtag from 'screens/Main/Search/SelectedHashtagScreen';
import PlaylistCreate from 'screens/Main/Playlist/PlaylistCreateScreen';
import PlaylistUpload from 'screens/Main/Playlist/PlaylistUploadScreen';
import DailyCreate from 'screens/Main/Daily/DailyCreateScreen';
import DailyUpload from 'screens/Main/Daily/DailyUploadScreen';
import Added from 'screens/Main/Account/AddedScreen';
import ProfileEdit from 'screens/Main/Account/ProfileEditScreen';
import SelectedPlaylist from 'screens/Main/Playlist/SelectedPlaylistScreen';
import SelectedDaily from 'screens/Main/Daily/SelectedDailyScreen';
import Participant from 'screens/Main/Relay/ParticipantScreen';
import Tab from './Tab';

const MainStack = createNativeStackNavigator();

const screenLists = [
  { title: 'Tab', component: Tab },
  { title: 'SelectedRelay', component: SelectedRelay },
  { title: 'Swipe', component: Swipe },
  { title: 'Follow', component: Follow },
  { title: 'OtherAccount', component: OtherAccount },
  { title: 'SearchDetail', component: SearchDetail },
  { title: 'SelectedSong', component: SelectedSong },
  { title: 'SelectedHashtag', component: SelectedHashtag },
  { title: 'PlaylistCreate', component: PlaylistCreate },
  { title: 'PlaylistUpload', component: PlaylistUpload },
  { title: 'DailyCreate', component: DailyCreate },
  { title: 'DailyUpload', component: DailyUpload },
  { title: 'Added', component: Added },
  { title: 'ProfileEdit', component: ProfileEdit },
  { title: 'SelectedPlaylist', component: SelectedPlaylist },
  { title: 'SelectedDaily', component: SelectedDaily },
  { title: 'Participant', component: Participant },
];

const MainStackScreen = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {screenLists.map((screen) => {
      const { title, component } = screen;
      return <MainStack.Screen name={title} component={component} key={title} />;
    })}
  </MainStack.Navigator>
);

export default MainStackScreen;
