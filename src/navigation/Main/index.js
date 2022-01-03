import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FollowScreen from 'screens/Main/Account/FollowScreen';
import OtherAccountScreen from 'screens/Main/Account/OtherAccountScreen';
import SelectedRelay from 'screens/Main/Relay/SelectedRelayScreen';
import Swipe from 'screens/Main/Relay/SwipeScreen';
import SearchDetail from 'screens/Main/Search/SearchDetailScreen';
import ResultMore from 'screens/Main/Search/ResultMoreScreen';
import SelectedSong from 'screens/Main/Search/SelectedSongScreen';
import SelectedHashtag from 'screens/Main/Search/SelectedHashtagScreen';
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
    <MainStack.Screen name="SearchDetail" component={SearchDetail} />
    <MainStack.Screen name="ResultMore" component={ResultMore} />
    <MainStack.Screen name="SelectedSong" component={SelectedSong} />
    <MainStack.Screen name="SelectedHashtag" component={SelectedHashtag} />
  </MainStack.Navigator>
);

export default MainStackScreen;
