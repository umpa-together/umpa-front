import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import navigationRef from './navigationRef';
import SvgUri from 'react-native-svg-uri';

import { Context as AuthContext } from './context/AuthContext';
import { Context as UserContext } from './context/UserContext';

import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import Signupopt from './screens/Signupopt';
import NoticeScreen from './screens/NoticeScreen';

import CurationSearchPage from './screens/Curation/CurationSearchPage';
import SelectedCuration from './screens/Curation/SelectedCuration';

import AccountScreen from './screens/Account/MyAccountScreen';
import OtherAccount from './screens/Account/OtherAccount';
import FollowPage from './screens/Account/FollowPage';
import ProfileEditPage from './screens/Account/ProfileEditPage';
import SettingPage from './screens/Account/SettingPage';
import SongEditPage from './screens/Account/SongEditPage';
import FeedBackPage from './screens/Account/FeedbackPage';
import InformationUsePage from './screens/Account/InformationUsePage';
import MusicBoxScreen from './screens/Account/MusicBoxScreen'

import MainPage from './screens/MainPage';
import SearchSongPage from './screens/Playlist/SearchSongPage';
import CreatePlayListPage from './screens/Playlist/CreatePlayListPage';
import SelectedPlaylist from './screens/Playlist/SelectedPlaylist';

import FreeBoardPage from './screens/Board/FreeBoardPage';
import SearchBoardPage from './screens/Board/SearchBoardPage';
import CreateBoardPage from './screens/Board/CreateBoardPage';
import SelectedBoardPage from './screens/Board/SelectedBoardPage';
import CreateContentPage from './screens/Board/CreateContentPage';
import SelectedContentPage from './screens/Board/SelectedContentPage';
import MyContentsPage from './screens/Board/MyContentsPage';
import SearchContentPage from './screens/Board/SearchContentPage';
import MusicArchivePage from './screens/Board/MusicArchivePage';
import SearchMusicPage from './screens/Board/SearchMusicPage';
import MySharedSongsPage from './screens/Board/MySharedSongsPage';

import MainSearchScreen from './screens/Search/MainSearchScreen';
import SearchScreen from './screens/Search/SearchScreen';
import SearchResultScreen from './screens/Search/SearchResultScreen';
import SelectedSongScreen from './screens/Search/SelectedSongScreen';
import SelectedHashtagScreen from './screens/Search/SelectedHashtagScreen';
import AllContentsScreen from './screens/Search/AllContentsScreen';

import { tmpWidth, tmpHeight } from './components/FontNormalize';

const LoginStack = createNativeStackNavigator()
const MainStack = createNativeStackNavigator()
const SearchStack = createNativeStackNavigator()
const BoardStack = createNativeStackNavigator()
const NoticeStack = createNativeStackNavigator()
const AccountStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const LoginStackScreen = () => {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen name="Signin" component={SigninScreen}/>
            <LoginStack.Screen name="Signup" component={SignupScreen}/>
            <LoginStack.Screen name="Signupopt" component={Signupopt}/>
        </LoginStack.Navigator>
    )
}

const MainStackScreen = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <MainStack.Screen name="Main" component={MainPage} />
            <MainStack.Screen name="Create" component={CreatePlayListPage} />
            <MainStack.Screen name="SearchSong" component={SearchSongPage} />
            <MainStack.Screen name="CurationSearch" component={CurationSearchPage} />
            <MainStack.Screen name="OtherAccount" component={OtherAccount} />
            <MainStack.Screen name="Follow" component={FollowPage} />
            <MainStack.Screen name="SelectedPlaylist" component={SelectedPlaylist} />
            <MainStack.Screen name="SelectedCuration" component={SelectedCuration} />
            <MainStack.Screen name="SelectedHashtag" component={SelectedHashtagScreen} />
        </MainStack.Navigator>
    )
}

const SearchStackScreen = () => {
    return (
        <SearchStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <SearchStack.Screen name="MainSearch" component={MainSearchScreen} />
            <SearchStack.Screen name="Search" component={SearchScreen} />
            <SearchStack.Screen name="SearchResult" component={SearchResultScreen} />
            <SearchStack.Screen name="SelectedSong" component={SelectedSongScreen} />
            <SearchStack.Screen name="Create" component={CreatePlayListPage} />
            <SearchStack.Screen name="SearchSong" component={SearchSongPage} />
            <SearchStack.Screen name="AllContents" component={AllContentsScreen} />
            <SearchStack.Screen name="OtherAccount" component={OtherAccount} />
            <SearchStack.Screen name="Follow" component={FollowPage} />
            <SearchStack.Screen name="SelectedPlaylist" component={SelectedPlaylist} />
            <SearchStack.Screen name="SelectedCuration" component={SelectedCuration} />
            <SearchStack.Screen name="SelectedHashtag" component={SelectedHashtagScreen} />
        </SearchStack.Navigator>
    )
}

const BoardStackScreen = () => {
    return (
        <BoardStack.Navigator
            screenOptions={{
                title: '게시판',
                headerTitleStyle: {
                    fontSize: 18 * tmpWidth,
                    fontWeight: "400"
                }, 
                headerStyle: {
                    backgroundColor: 'rgb(255,255,255)',
                    height: 92 * tmpWidth,
                    shadowColor: "rgb(0, 0, 0)",
                    shadowOffset: {
                        height: 3 * tmpWidth,
                        width: 0,
                    },
                    shadowRadius: 8 * tmpWidth,
                    shadowOpacity: 0.07,
                },
            }}
        >
            <BoardStack.Screen name="FreeBoard" component={FreeBoardPage} />
            <BoardStack.Screen name="SearchBoard" component={SearchBoardPage} />
            <BoardStack.Screen name="CreateBoard" component={CreateBoardPage} />
            <BoardStack.Screen name="SelectedBoard" component={SelectedBoardPage} />
            <BoardStack.Screen name="CreateContent" component={CreateContentPage} />
            <BoardStack.Screen name="SelectedContent" component={SelectedContentPage} />
            <BoardStack.Screen name="MyContents" component={MyContentsPage} />
            <BoardStack.Screen name="SearchContent" component={SearchContentPage} />
            <BoardStack.Screen name="MusicArchive" component={MusicArchivePage} />
            <BoardStack.Screen name="SearchMusic" component={SearchMusicPage} />
            <BoardStack.Screen name="MySharedSongs" component={MySharedSongsPage} />
            <BoardStack.Screen name="OtherAccount" component={OtherAccount} />
            <BoardStack.Screen name="Follow" component={FollowPage} />
            <BoardStack.Screen name="SelectedPlaylist" component={SelectedPlaylist} />
            <BoardStack.Screen name="SelectedCuration" component={SelectedCuration} />
            <BoardStack.Screen name="SelectedHashtag" component={SelectedHashtagScreen} />
        </BoardStack.Navigator>
    ) 
}

const NoticeStackScreen = () => {
    return (
        <NoticeStack.Navigator
            screenOptions={{
                title: '알림',
                headerTitleStyle: {
                    fontSize: 18  * tmpWidth,
                    fontWeight: "400",
                }, 
                headerStyle: {
                    backgroundColor: 'rgb(255,255,255)',
                    height: 92 * tmpHeight,
                    shadowColor: "rgb(0, 0, 0)",
                    shadowOffset: {
                        height: 3  * tmpWidth,
                        width: 0,
                    },
                    shadowRadius: 8  * tmpWidth,
                    shadowOpacity: 0.07,
                },            
            }}
        >
            <NoticeStack.Screen name="Notice" component={NoticeScreen} />
            <NoticeStack.Screen name="SelectedContent" component={SelectedContentPage} />
            <NoticeStack.Screen name="MusicArchive" component={MusicArchivePage} />
            <NoticeStack.Screen name="OtherAccount" component={OtherAccount} />
            <NoticeStack.Screen name="Follow" component={FollowPage} />
            <NoticeStack.Screen name="SelectedPlaylist" component={SelectedPlaylist} />
            <NoticeStack.Screen name="SelectedCuration" component={SelectedCuration} />
            <NoticeStack.Screen name="SelectedHashtag" component={SelectedHashtagScreen} />
        </NoticeStack.Navigator>
    ) 
}

const AccountStackScreen = () => {
    return (
        <AccountStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <AccountStack.Screen name="Account" component={AccountScreen} />
            <AccountStack.Screen name="OtherAccount" component={OtherAccount} />
            <AccountStack.Screen name="Follow" component={FollowPage} />
            <AccountStack.Screen name="ProfileEdit" component={ProfileEditPage} />
            <AccountStack.Screen name="Setting" component={SettingPage} />
            <AccountStack.Screen name="SongEdit" component={SongEditPage} />
            <AccountStack.Screen name="SelectedPlaylist" component={SelectedPlaylist} />
            <AccountStack.Screen name="SelectedCuration" component={SelectedCuration} />
            <AccountStack.Screen name="SelectedHashtag" component={SelectedHashtagScreen} />
            <AccountStack.Screen name="FeedBack" component={FeedBackPage} />
            <AccountStack.Screen name="Create" component={CreatePlayListPage} />
            <AccountStack.Screen name="SearchSong" component={SearchSongPage} />
            <AccountStack.Screen name="InformationUse" component={InformationUsePage} />
            <AccountStack.Screen name="MusicBox" component={MusicBoxScreen} />
        </AccountStack.Navigator>
    ) 
}

const MyModalBackgroundScreen = () => {
    return null
}

export default MainNavigator = () => {
    const { state: authState, tryLocalSignin } = useContext(AuthContext);
    const { getMyInfo } = useContext(UserContext);
    
    useEffect(() => {
        tryLocalSignin();
        getMyInfo();
    }, [])

    return (
        <NavigationContainer ref={navigationRef}>
            {authState.token ? 
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        if (route.name === 'MainTab') {
                            return (
                                <View>
                                    { focused ? 
                                    <SvgUri width='40' height='40' source={require('./assets/icons/tabFocusedHome.svg')} /> : 
                                    <SvgUri width='40' height='40' source={require('./assets/icons/tabHome.svg')} /> }
                                </View>
                            )
                        } else if (route.name === 'SearchTab') {
                            return (
                                <View>
                                    { focused ? 
                                    <SvgUri width='40' height='40' source={require('./assets/icons/tabFocusedSearch.svg')} /> : 
                                    <SvgUri width='40' height='40' source={require('./assets/icons/tabSearch.svg')} /> }
                                </View>
                            )
                        } else if (route.name === 'BoardTab') {
                            return (
                                <View>
                                    { focused ? 
                                    <SvgUri width='40' height='40' source={require('./assets/icons/tabFocusedBoard.svg')} /> : 
                                    <SvgUri width='40' height='40' source={require('./assets/icons/tabBoard.svg')} /> }
                                </View>
                            )
                        } else if (route.name === 'NoticeTab') {
                            return (
                                <View>
                                    { focused ? 
                                    <SvgUri width='40' height='40' source={require('./assets/icons/tabFocusedNotice.svg')} /> : 
                                    <SvgUri width='40' height='40' source={require('./assets/icons/tabNotice.svg')} /> }
                                </View>
                            )
                        } else if (route.name === 'AccountTab') {
                            return ( 
                                <View>
                                    { focused ? 
                                    <SvgUri width='40' height='40' source={require('./assets/icons/tabFocusedAccount.svg')} /> : 
                                    <SvgUri width='40' height='40' source={require('./assets/icons/tabAccount.svg')} /> }
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
                    headerShown: false
                })}
            >
                <Tab.Screen name="MainTab" component={MainStackScreen}/>
                <Tab.Screen name="SearchTab" component={SearchStackScreen}/>
                <Tab.Screen name="BoardTab" component={BoardStackScreen}/>
                <Tab.Screen name="NoticeTab" component={NoticeStackScreen}/>
                <Tab.Screen name="AccountTab" component={AccountStackScreen}/>
            </Tab.Navigator> : 
            <LoginStackScreen /> }
        </NavigationContainer>
    )
}