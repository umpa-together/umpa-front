import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Follow from 'screens/Main/Account/FollowScreen';
import OtherAccount from 'screens/Main/Account/OtherAccountScreen';
import SelectedRelay from 'screens/Main/Relay/SelectedRelayScreen';
import Swipe from 'screens/Main/Relay/SwipeScreen';
import SearchDetail from 'screens/Main/Search/SearchDetailScreen';
import ResultMore from 'screens/Main/Search/ResultMoreScreen';
import SelectedSong from 'screens/Main/Search/SelectedSongScreen';
import SelectedHashtag from 'screens/Main/Search/SelectedHashtagScreen';
import PlaylistCreate from 'screens/Main/Playlist/PlaylistCreateScreen';
import PlaylistUpload from 'screens/Main/Playlist/PlaylistUploadScreen';
import Added from 'screens/Main/Account/AddedScreen';
import ProfileEdit from 'screens/Main/Account/ProfileEditScreen';
import SelectedPlaylist from 'screens/Main/Playlist/SelectedPlaylistScreen';
import SelectedDaily from 'screens/Main/Daily/SelectedDailyScreen';

import TabScreen from './Tab';

const MainStack = createNativeStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainStack.Screen name="Tab" component={TabScreen} />
    <MainStack.Screen name="SelectedRelay" component={SelectedRelay} />
    <MainStack.Screen name="Swipe" component={Swipe} />
    <MainStack.Screen name="Follow" component={Follow} />
    <MainStack.Screen name="OtherAccount" component={OtherAccount} />
    <MainStack.Screen name="SearchDetail" component={SearchDetail} />
    <MainStack.Screen name="ResultMore" component={ResultMore} />
    <MainStack.Screen name="SelectedSong" component={SelectedSong} />
    <MainStack.Screen name="SelectedHashtag" component={SelectedHashtag} />
    <MainStack.Screen name="PlaylistCreate" component={PlaylistCreate} />
    <MainStack.Screen name="PlaylistUpload" component={PlaylistUpload} />
    <MainStack.Screen name="Added" component={Added} />
    <MainStack.Screen name="ProfileEdit" component={ProfileEdit} />
    <MainStack.Screen name="SelectedPlaylist" component={SelectedPlaylist} />
    <MainStack.Screen name="SelectedDaily" component={SelectedDaily} />
  </MainStack.Navigator>
);

export default MainStackScreen;
