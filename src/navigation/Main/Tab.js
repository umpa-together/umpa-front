/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyAccount from 'screens/Main/Account';
import Relay from 'screens/Main/Relay';
import Feed from 'screens/Main/Feed';
import Search from 'screens/Main/Search';
import Notice from 'screens/Main/Notice';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import { MAIN_COLOR } from 'constants/colors';

const Tab = createBottomTabNavigator();

const tabLists = [
  {
    title: 'Relay',
    component: Relay,
    activeIcon: require('public/icons/tab-home-active.png'),
    inactiveIcon: require('public/icons/tab-home-inactive.png'),
    name: '홈',
  },
  {
    title: 'Feed',
    component: Feed,
    activeIcon: require('public/icons/tab-feed-active.png'),
    inactiveIcon: require('public/icons/tab-feed-inactive.png'),
    name: '피드',
  },
  {
    title: 'Search',
    component: Search,
    activeIcon: require('public/icons/tab-search-active.png'),
    inactiveIcon: require('public/icons/tab-search-inactive.png'),
    name: '검색',
  },
  {
    title: 'Notice',
    component: Notice,
    activeIcon: require('public/icons/tab-notice-active.png'),
    inactiveIcon: require('public/icons/tab-notice-inactive.png'),
    name: '알림',
  },
  {
    title: 'MyAccount',
    component: MyAccount,
    activeIcon: require('public/icons/tab-account-active.png'),
    inactiveIcon: require('public/icons/tab-account-inactive.png'),
    name: '프로필',
  },
];

const TabScreen = () => (
  <Tab.Navigator
    screenOptions={() => ({
      headerShown: false,
    })}
    tabBarOptions={{
      activeTintColor: MAIN_COLOR,
      inactiveTintColor: '#4B4B4B',
    }}
  >
    {tabLists.map((tab) => {
      const { name, title, component, activeIcon, inactiveIcon } = tab;
      return (
        <Tab.Screen
          name={name}
          key={title}
          component={component}
          options={{
            tabBarIcon: ({ focused }) => {
              return <Icon style={style.icons} source={focused ? activeIcon : inactiveIcon} />;
            },
          }}
        />
      );
    })}
  </Tab.Navigator>
);

export default TabScreen;
