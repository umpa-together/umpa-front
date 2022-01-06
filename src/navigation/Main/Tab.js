import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyAccount from 'screens/Main/Account';
import Relay from 'screens/Main/Relay';
import Feed from 'screens/Main/Feed';
import Search from 'screens/Main/Search';
import Notice from 'screens/Main/Notice';

const Tab = createBottomTabNavigator();

const TabScreen = () => (
  <Tab.Navigator
    screenOptions={() => ({
      headerShown: false,
    })}
  >
    <Tab.Screen name="Relay" component={Relay} />
    <Tab.Screen name="Feed" component={Feed} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Notice" component={Notice} />
    <Tab.Screen name="MyAccount" component={MyAccount} />
  </Tab.Navigator>
);

export default TabScreen;
