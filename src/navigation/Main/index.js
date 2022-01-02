import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Follow from 'screens/Main/Account/FollowScreen';
import OtherAccount from 'screens/Main/Account/OtherAccountScreen';
import SelectedRelay from 'screens/Main/Relay/SelectedRelayScreen';
import Swipe from 'screens/Main/Relay/SwipeScreen';
import PlaylistCreate from 'screens/Main/Playlist/PlaylistCreateScreen';
import PlaylistUpload from 'screens/Main/Playlist/PlaylistUploadScreen';

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
    <MainStack.Screen name="PlaylistCreate" component={PlaylistCreate} />
    <MainStack.Screen name="PlaylistUpload" component={PlaylistUpload} />
  </MainStack.Navigator>
);

export default MainStackScreen;
