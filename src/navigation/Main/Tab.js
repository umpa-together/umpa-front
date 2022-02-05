import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyAccount from 'screens/Main/Account';
import Relay from 'screens/Main/Relay';
import Feed from 'screens/Main/Feed';
import Search from 'screens/Main/Search';
import Notice from 'screens/Main/Notice';

const Tab = createBottomTabNavigator();

const tabLists = [
  { title: 'Relay', component: Relay },
  { title: 'Feed', component: Feed },
  { title: 'Search', component: Search },
  { title: 'Notice', component: Notice },
  { title: 'MyAccount', component: MyAccount },
];

const TabScreen = () => (
  <Tab.Navigator
    screenOptions={() => ({
      headerShown: false,
    })}
  >
    {tabLists.map((tab) => {
      const { title, component } = tab;
      return <Tab.Screen name={title} key={title} component={component} />;
    })}
  </Tab.Navigator>
);

export default TabScreen;
