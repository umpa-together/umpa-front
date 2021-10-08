import React, { useEffect, useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import navigationRef from 'navigationRef';
import SvgUri from 'react-native-svg-uri';
import { Context as AuthContext } from 'context/AuthContext';

import LoadingPage from 'screens/LoadingPage';

import SigninScreen from 'screens/SigninScreen';
import SignupScreen from 'screens/SignupScreen';
import Signupopt from 'screens/Signupopt';
import NoticeScreen from 'screens/NoticeScreen';

import AccountScreen from 'screens/Account/MyAccountScreen';
import OtherAccount from 'screens/Account/OtherAccount';
import FollowPage from 'screens/Account/FollowPage';
import ProfileEditPage from 'screens/Account/ProfileEditPage';
import SettingPage from 'screens/Account/SettingPage';
import SongEditPage from 'screens/Account/SongEditPage';
import FeedBackPage from 'screens/Account/FeedbackPage';
import InformationUsePage from 'screens/Account/InformationUsePage';
import MusicBoxScreen from 'screens/Account/MusicBoxScreen'

import MainFeedPage from 'screens/Feed/MainFeed';
import CreatePlayListPage from 'screens/Playlist/CreatePlayListPage';
import SelectedPlaylist from 'screens/Playlist/SelectedPlaylist';

import FreeBoardPage from 'screens/Board/FreeBoardPage';
import SearchBoardPage from 'screens/Board/SearchBoardPage';
import CreateBoardPage from 'screens/Board/CreateBoardPage';
import SelectedBoardPage from 'screens/Board/SelectedBoardPage';
import CreateContentPage from 'screens/Board/CreateContentPage';
import SelectedContentPage from 'screens/Board/SelectedContentPage';
import MyContentsPage from 'screens/Board/MyContentsPage';
import SearchContentPage from 'screens/Board/SearchContentPage';
import MusicArchivePage from 'screens/Board/MusicArchivePage';
import SearchMusicPage from 'screens/Board/SearchMusicPage';
import MySharedSongsPage from 'screens/Board/MySharedSongsPage';

import MainSearchScreen from 'screens/Main/MainSearchScreen';
import SearchScreen from 'screens/Main/SearchScreen';
import SelectedHashtagScreen from 'screens/Main/SelectedHashtagScreen';
import AllContentsScreen from 'screens/Main/AllContentsScreen';
import ContentsMoreScreen from 'screens/Main/ContentsMoreScreen';
import CreateModal from 'components/CreateModal';

import Chat from 'screens/Chat/Chat';
import SelectedChat from 'screens/Chat/SelectedChat';
import CreateChat from 'screens/Chat/CreateChat';


import DailyCreate from 'screens/Daily/DailyCreate';
import SelectedDaily from 'screens/Daily/SelectedDaily';

const LoginStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const MainStack = createNativeStackNavigator()

const LoginStackScreen = () => {
    return (
        <LoginStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <LoginStack.Screen name="Signin" component={SigninScreen}/>
            <LoginStack.Screen name="Signup" component={SignupScreen}/>
            <LoginStack.Screen name="Signupopt" component={Signupopt}/>
        </LoginStack.Navigator>
    )
}
const TabScreen = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
                if (route.name === 'Home') {
                    return (
                        <View>
                            { focused ? 
                            <SvgUri width='40' height='40' source={require('assets/icons/tabFocusedHome.svg')} /> : 
                            <SvgUri width='40' height='40' source={require('assets/icons/tabHome.svg')} /> }
                        </View>
                    )
                } else if (route.name === 'Feed') {
                    return (
                        <View>
                            { focused ? 
                            <SvgUri width='40' height='40' source={require('assets/icons/tabFocusedSearch.svg')} /> : 
                            <SvgUri width='40' height='40' source={require('assets/icons/tabSearch.svg')} /> }
                        </View>
                    )
                } else if (route.name === 'CreateModal') {
                    return (
                        <Text>
                            +
                        </Text>
                    )
                } else if (route.name === 'Board') {
                    return (
                        <View>
                            { focused ? 
                            <SvgUri width='40' height='40' source={require('assets/icons/tabFocusedBoard.svg')} /> : 
                            <SvgUri width='40' height='40' source={require('assets/icons/tabBoard.svg')} /> }
                        </View>
                    )
                } else if (route.name === 'Account') {
                    return ( 
                        <View>
                            { focused ? 
                            <SvgUri width='40' height='40' source={require('assets/icons/tabFocusedAccount.svg')} /> : 
                            <SvgUri width='40' height='40' source={require('assets/icons/tabAccount.svg')} /> }
                        </View>
                    )
                }
            },
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: 'rgb(254,254,254)',
                shadowColor: "rgb(0, 0, 0)",
                shadowOffset: {
                    height: 4,
                    width: 0,
                },
                shadowRadius: 4,
                shadowOpacity: 0.6,
            },
            headerShown: false,
        })}>
            <Tab.Screen name="Home" component={MainSearchScreen}/>
            <Tab.Screen name="Feed" component={MainFeedPage}/>
            <Tab.Screen 
                name="CreateModal" 
                component={MyModalBackgroundScreen}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate(`CreatePosts`)
                    }
                })}
            />
            <Tab.Screen name="Board" component={FreeBoardPage}/>
            <Tab.Screen name="Account" component={AccountScreen}/>
        </Tab.Navigator>
    )
}

const MainStackScreen = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <MainStack.Screen name="Tab" component={TabScreen}/>
            <MainStack.Screen name="Search" component={SearchScreen} />
            <MainStack.Screen name="Create" component={CreatePlayListPage} />
            <MainStack.Screen name="AllContents" component={AllContentsScreen} />
            <MainStack.Screen name="ContentsMore" component={ContentsMoreScreen} />
            <MainStack.Screen name="SelectedDaily" component={SelectedDaily} />
            <MainStack.Screen name="Chat" component={Chat} />
            <MainStack.Screen name="SelectedChat" component={SelectedChat} />
            <MainStack.Screen name="CreateChat" component={CreateChat} />

            <MainStack.Screen name="SelectedPlaylist" component={SelectedPlaylist} />
            <MainStack.Screen name="SelectedHashtag" component={SelectedHashtagScreen} />
            <MainStack.Screen name="SearchBoard" component={SearchBoardPage} />
            <MainStack.Screen name="CreateBoard" component={CreateBoardPage} />
            <MainStack.Screen name="SelectedBoard" component={SelectedBoardPage} />
            <MainStack.Screen name="CreateDaily" component={DailyCreate} />

            <MainStack.Screen name="CreateContent" component={CreateContentPage} />
            <MainStack.Screen name="SelectedContent" component={SelectedContentPage} />
            <MainStack.Screen name="MyContents" component={MyContentsPage} />
            <MainStack.Screen name="SearchContent" component={SearchContentPage} />
            <MainStack.Screen name="MusicArchive" component={MusicArchivePage} />
            <MainStack.Screen name="SearchMusic" component={SearchMusicPage} />
            
            <MainStack.Screen name="MySharedSongs" component={MySharedSongsPage} />
            <MainStack.Screen name="OtherAccount" component={OtherAccount} />
            <MainStack.Screen name="Follow" component={FollowPage} />
            <MainStack.Screen name="ProfileEdit" component={ProfileEditPage} />
            <MainStack.Screen name="Setting" component={SettingPage} />
            <MainStack.Screen name="SongEdit" component={SongEditPage} />
            <MainStack.Screen name="FeedBack" component={FeedBackPage} />
            <MainStack.Screen name="InformationUse" component={InformationUsePage} />
            <MainStack.Screen name="MusicBox" component={MusicBoxScreen} />
            <MainStack.Screen name="Notice" component={NoticeScreen} />
            <MainStack.Screen name="CreatePosts" component={CreateModal} 
                options={{
                    presentation: "transparentModal",
                }}
            />
        </MainStack.Navigator>
    )
}

const MyModalBackgroundScreen = () => null

export default MainNavigator = () => {
    const { state: authState, tryLocalSignin } = useContext(AuthContext);
    const [isSplash, setIsSplash] = useState(true)

    useEffect(() => {
        tryLocalSignin();
    }, [])

    if(isSplash){
        return <LoadingPage setIsSplash={setIsSplash}/>
    }

    return (
        <NavigationContainer ref={navigationRef}>
            {authState.token ? 
            <MainStackScreen /> : 
            <LoginStackScreen /> }
        </NavigationContainer>
    )
}