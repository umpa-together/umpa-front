/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyAccount from 'screens/Main/Account';
import Relay from 'screens/Main/Relay';
import Feed from 'screens/Main/Feed';
import Search from 'screens/Main/Search';
import Notice from 'screens/Main/Notice';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import { MAIN_COLOR } from 'constants/colors';
import { useTabRef } from 'providers/tabRef';
import { SCALE_HEIGHT } from 'lib/utils/normalize';

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

const TabScreen = () => {
  const { relayRef, feedRef, searchRef, noticeRef } = useTabRef();
  const [currentScreen, setCurrentScreen] = useState('Relay');
  const screenOptions = useCallback(
    () => ({
      headerShown: false,
      activeTintColor: MAIN_COLOR,
      inactiveTintColor: '#4B4B4B',
      tabBarStyle: {
        height: 80 * SCALE_HEIGHT,
      },
    }),
    [],
  );
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {tabLists.map((tab) => {
        const { name, title, component, activeIcon, inactiveIcon } = tab;
        return (
          <Tab.Screen
            name={title}
            key={title}
            component={component}
            listeners={{
              tabPress: () => {
                if (currentScreen === title) {
                  if (title === 'Relay') {
                    if (relayRef.current) {
                      relayRef.current.scrollToOffset({ offset: 0, animated: true });
                    }
                  } else if (title === 'Feed') {
                    if (feedRef.current) {
                      feedRef.current.scrollToOffset({ offset: 0, animated: true });
                    }
                  } else if (title === 'Search') {
                    if (searchRef.current) {
                      searchRef.current.scrollTo({ x: 5, y: 5, animated: true });
                    }
                  } else if (title === 'Notice') {
                    if (noticeRef.currnet) {
                      noticeRef.current.scrollToOffset({ offset: 0, animated: true });
                    }
                  }
                } else {
                  setCurrentScreen(title);
                }
              },
            }}
            options={{
              tabBarLabel: name,
              tabBarLabelStyle: {
                bottom: Platform.OS === 'android' ? 10 * SCALE_HEIGHT : 0,
              },
              tabBarIcon: ({ focused }) => {
                return <Icon style={style.icons} source={focused ? activeIcon : inactiveIcon} />;
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabScreen;
