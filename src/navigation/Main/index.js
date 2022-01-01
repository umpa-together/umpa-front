import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FollowScreen from 'screens/Main/Account/FollowScreen';
import OtherAccountScreen from 'screens/Main/Account/OtherAccountScreen';
import SelectedRelay from 'screens/Main/Relay/SelectedRelayScreen';
import Swipe from 'screens/Main/Relay/SwipeScreen';
import PlaylistCreateScreen from 'screens/Main/Playlist/PlaylistCreateScreen';
import PlaylistUploadScreen from 'screens/Main/Playlist/PlaylistUploadScreen';

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
    <MainStack.Screen name="Follow" component={FollowScreen} />
    <MainStack.Screen name="OtherAccount" component={OtherAccountScreen} />
    <MainStack.Screen name="PlaylistCreate" component={PlaylistCreateScreen} />
    <MainStack.Screen name="PlaylistUpload" component={PlaylistUploadScreen} />
  </MainStack.Navigator>
);

export default MainStackScreen;
