import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Relay from 'screens/Main/Relay';

const Tab = createBottomTabNavigator();

const TabScreen = () => (
  <Tab.Navigator
    screenOptions={() => ({
      headerShown: false,
    })}
  >
    <Tab.Screen name="Relay" component={Relay} />
    {/*
    <Tab.Screen name="Feed" component={MainFeedPage} />
    <Tab.Screen
      name="CreateModal"
      component={MyModalBackgroundScreen}
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate(`CreatePosts`);
        },
      })}
    />
    <Tab.Screen name="Notice" component={NoticeScreen} />
    <Tab.Screen name="Account" component={AccountScreen} />
    */}
  </Tab.Navigator>
);

export default TabScreen;
