import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SvgUri from 'react-native-svg-uri';

import AccountScreen from 'screens/Account/MyAccountScreen';
import MainFeedPage from 'screens/Feed/MainFeed';
import FreeBoardPage from 'screens/Board/FreeBoardPage';
import MainSearchScreen from 'screens/Main/MainSearchScreen';

const Tab = createBottomTabNavigator();

const MyModalBackgroundScreen = () => null;

const TabScreen = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      // eslint-disable-next-line consistent-return
      tabBarIcon: ({ focused }) => {
        if (route.name === 'Home') {
          return (
            <View>
              {focused ? (
                <SvgUri
                  width="40"
                  height="40"
                  source={require('assets/icons/tabFocusedHome.svg')}
                />
              ) : (
                <SvgUri width="40" height="40" source={require('assets/icons/tabHome.svg')} />
              )}
            </View>
          );
        }
        if (route.name === 'Feed') {
          return (
            <View>
              {focused ? (
                <SvgUri
                  width="40"
                  height="40"
                  source={require('assets/icons/tabFocusedSearch.svg')}
                />
              ) : (
                <SvgUri width="40" height="40" source={require('assets/icons/tabSearch.svg')} />
              )}
            </View>
          );
        }
        if (route.name === 'CreateModal') {
          return <Text>+</Text>;
        }
        if (route.name === 'Board') {
          return (
            <View>
              {focused ? (
                <SvgUri
                  width="40"
                  height="40"
                  source={require('assets/icons/tabFocusedBoard.svg')}
                />
              ) : (
                <SvgUri width="40" height="40" source={require('assets/icons/tabBoard.svg')} />
              )}
            </View>
          );
        }
        if (route.name === 'Account') {
          return (
            <View>
              {focused ? (
                <SvgUri
                  width="40"
                  height="40"
                  source={require('assets/icons/tabFocusedAccount.svg')}
                />
              ) : (
                <SvgUri width="40" height="40" source={require('assets/icons/tabAccount.svg')} />
              )}
            </View>
          );
        }
      },
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: 'rgb(254,254,254)',
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
          height: 4,
          width: 0,
        },
        shadowRadius: 4,
        shadowOpacity: 0.6,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={MainSearchScreen} />
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
    <Tab.Screen name="Board" component={FreeBoardPage} />
    <Tab.Screen name="Account" component={AccountScreen} />
  </Tab.Navigator>
);

export default TabScreen;
