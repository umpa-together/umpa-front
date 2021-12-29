import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import SelectedRelay from 'screens/Main/Relay/SelectedRelayScreen';
import FollowScreen from 'screens/Main/Account/FollowScreen';
import OtherAccountScreen from 'screens/Main/Account/OtherAccountScreen';
import TabScreen from './Tab';

const MainStack = createNativeStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainStack.Screen name="Tab" component={TabScreen} />
    <MainStack.Screen name="Follow" component={FollowScreen} />
    <MainStack.Screen name="OtherAccount" component={OtherAccountScreen} />
    {
      //<MainStack.Screen name="SelectedRelay" component={SelectedRelay} />
    }
  </MainStack.Navigator>
);

export default MainStackScreen;
