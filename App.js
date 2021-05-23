import React, { useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SvgUri from 'react-native-svg-uri';
import {fcmService} from './src/FCMService';
import {localNotificationService} from './src/LocalNotificationService';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import Signupopt from './src/screens/Signupopt';
import NoticeScreen from './src/screens/NoticeScreen';

import CurationSearchPage from './src/screens/Curation/CurationSearchPage';
import SelectedCuration from './src/screens/Curation/SelectedCuration';


import AccountScreen from './src/screens/Account/MyAccountScreen';
import OtherAccount from './src/screens/Account/OtherAccount';
import FollowPage from './src/screens/Account/FollowPage';
import ProfileEditPage from './src/screens/Account/ProfileEditPage';
import SettingPage from './src/screens/Account/SettingPage';
import SongEditPage from './src/screens/Account/SongEditPage';

import HelloScreen from './src/screens/HelloScreen';
import LoadingPage from './src/screens/LoadingPage';
import MainPage from './src/screens/MainPage';
import SearchSongPage from './src/screens/Playlist/SearchSongPage';
import CreatePlayListPage from './src/screens/Playlist/CreatePlayListPage';
import SelectedPlaylist from './src/screens/Playlist/SelectedPlaylist';

import FreeBoardPage from './src/screens/Board/FreeBoardPage';
import SearchBoardPage from './src/screens/Board/SearchBoardPage';
import CreateBoardPage from './src/screens/Board/CreateBoardPage';
import SelectedBoardPage from './src/screens/Board/SelectedBoardPage';
import CreateContentPage from './src/screens/Board/CreateContentPage';
import SelectedContentPage from './src/screens/Board/SelectedContentPage';
import MyContentsPage from './src/screens/Board/MyContentsPage';
import SearchContentPage from './src/screens/Board/SearchContentPage';
import MusicArchivePage from './src/screens/Board/MusicArchivePage';
import SearchMusicPage from './src/screens/Board/SearchMusicPage';
import MySharedSongsPage from './src/screens/Board/MySharedSongsPage';

import MainSearchScreen from './src/screens/Search/MainSearchScreen';
import SearchScreen from './src/screens/Search/SearchScreen';
import SearchResultScreen from './src/screens/Search/SearchResultScreen';
import SelectedSongScreen from './src/screens/Search/SelectedSongScreen';
import SelectedHashtagScreen from './src/screens/Search/SelectedHashtagScreen';



import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as SearchProvider } from './src/context/SearchContext';
import { Provider as BoardProvider } from './src/context/BoardContext';
import { Provider as PlaylistProvider } from './src/context/PlaylistContext';
import { Provider as SearchPlaylistProvider } from './src/context/SearchPlaylistContext';
import { Provider as UserProvider } from './src/context/UserContext';
import { Provider as DJProvider } from './src/context/DJContext';
import { Provider as CurationProvider } from './src/context/CurationContext';
import { Provider as NoticeProvider } from './src/context/NoticeContext';
import { Provider as WeeklyProvider } from './src/context/WeeklyContext';

import { setNavigator } from './src/navigationRef';

const main = createStackNavigator({
    Main: MainPage,
    Create : CreatePlayListPage,
    SearchSong : SearchSongPage,
    SelectedPlaylist :SelectedPlaylist,
    FollowPage : FollowPage,
    SelectedCuration:SelectedCuration,
    CurationSearch :CurationSearchPage,
    SelectedHashtag: SelectedHashtagScreen,
    Account : AccountScreen,
    OtherAccount : OtherAccount,
});

const Search = createStackNavigator({
    MainSearch: MainSearchScreen,
    Search: SearchScreen,
    SearchResult: SearchResultScreen,
    SelectedSong: SelectedSongScreen,
    SelectedHashtag: SelectedHashtagScreen,
    SelectedCuration:SelectedCuration,
    SelectedPlaylist :SelectedPlaylist,
    Account : AccountScreen,
    OtherAccount : OtherAccount,
    Create : CreatePlayListPage,
    SearchSong : SearchSongPage,
});

const Board = createStackNavigator({
    FreeBoard: FreeBoardPage,
    SearchBoard: SearchBoardPage,
    CreateBoard: CreateBoardPage,
    SelectedBoard: SelectedBoardPage,
    CreateContent: CreateContentPage,
    SelectedContent: SelectedContentPage,
    MyContents: MyContentsPage,
    SearchContent: SearchContentPage,
    MusicArchive: MusicArchivePage,
    SearchMusic: SearchMusicPage,
    MySharedSongs: MySharedSongsPage,
    Account : AccountScreen,
    OtherAccount : OtherAccount,
});

const Notice = createStackNavigator({
    Notice: NoticeScreen,
    Account : AccountScreen,
    OtherAccount : OtherAccount,
    SelectedCuration:SelectedCuration,
    SelectedPlaylist :SelectedPlaylist,
    SelectedContent: SelectedContentPage,
    MusicArchive: MusicArchivePage,
});

const Account = createStackNavigator({
    Account : AccountScreen,
    OtherAccount : OtherAccount,
    Follow : FollowPage,
    ProfileEdit: ProfileEditPage,
    Setting: SettingPage,
    SongEdit: SongEditPage,
    SelectedPlaylist :SelectedPlaylist,
    SelectedCuration:SelectedCuration,
    SelectedHashtag: SelectedHashtagScreen,
});

main.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if(navigation.state.routes[navigation.state.index].routeName != 'Main' 
    && navigation.state.routes[navigation.state.index].routeName != 'Account' 
    && navigation.state.routes[navigation.state.index].routeName != 'OtherAccount'){
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
};
Search.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if(navigation.state.routes[navigation.state.index].routeName != 'MainSearch' 
    && navigation.state.routes[navigation.state.index].routeName != 'Account' 
    && navigation.state.routes[navigation.state.index].routeName != 'OtherAccount'){
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
};
Board.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if(navigation.state.routes[navigation.state.index].routeName != 'FreeBoard' 
    && navigation.state.routes[navigation.state.index].routeName != 'Account' 
    && navigation.state.routes[navigation.state.index].routeName != 'OtherAccount'){
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
};
Notice.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if(navigation.state.routes[navigation.state.index].routeName != 'Notice' 
    && navigation.state.routes[navigation.state.index].routeName != 'Account' 
    && navigation.state.routes[navigation.state.index].routeName != 'OtherAccount'){
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
}
Account.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if(navigation.state.routes[navigation.state.index].routeName != 'Account' 
    && navigation.state.routes[navigation.state.index].routeName != 'OtherAccount'){
        tabBarVisible = false;
    }
    return {
        tabBarVisible,
    };
};

const loginFlow =  createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen,
    Signupopt:Signupopt ,
});
const mainFlow =  createBottomTabNavigator(
{
    main,
    Search,
    Board,
    Notice,
    Account
},
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        if (routeName === 'main') {
            return  <View>{ focused ? 
                <SvgUri width='40' height='40' source={require('./src/assets/icons/tabFocusedHome.svg')} /> : 
                <SvgUri width='40' height='40' source={require('./src/assets/icons/tabHome.svg')} /> }</View>
        } else if (routeName === 'Search') {
            return  <View>{ focused ? 
                <SvgUri width='40' height='40' source={require('./src/assets/icons/tabFocusedSearch.svg')} /> : 
                <SvgUri width='40' height='40' source={require('./src/assets/icons/tabSearch.svg')} />}</View>
        } else if (routeName === 'Board') {
            return  <View>{ focused ? 
                <SvgUri width='40' height='40' source={require('./src/assets/icons/tabFocusedBoard.svg')} /> : 
                <SvgUri width='40' height='40' source={require('./src/assets/icons/tabBoard.svg')} />}</View>
        } else if (routeName === 'Notice') {
            return  <View>{ focused ? 
                <SvgUri width='40' height='40' source={require('./src/assets/icons/tabFocusedNotice.svg')} /> : 
                <SvgUri width='40' height='40' source={require('./src/assets/icons/tabNotice.svg')} />}</View>
        } else if (routeName === 'Account') {
            return  <View>{ focused ? 
                <SvgUri width='40' height='40' source={require('./src/assets/icons/tabFocusedAccount.svg')} /> : 
                <SvgUri width='40' height='40' source={require('./src/assets/icons/tabAccount.svg')} />}</View>
        }

      },
    }),
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: 'rgb(254,254,254)',
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            height: 4,
            width: 0,
        },
        shadowRadius: 4,
        shadowOpacity: 0.6,
      },
    },
  }
    
);
const switchNavigator = createSwitchNavigator({
    Hello: HelloScreen,
    loginFlow,
    Loading : LoadingPage,
    mainFlow
});

const App = createAppContainer(switchNavigator);

export default () => {
    useEffect(()=> {
        fcmService.registerAppWithFCM();
        fcmService.register(onRegister, onNotification, onOpenNotification);
        localNotificationService.configure(onOpenNotification);

        async function onRegister(token){
            await AsyncStorage.setItem('noticetoken', token);
            console.log("[APP] onRegsiter: ", token)
        }

        function onNotification(notify){
            console.log("[App] onNotificagtion: ", notify)
            const options = {
                soundName : 'default',
                playSound : true
            };
            localNotificationService.showNotification(
                0,
                notify.title,
                notify.body,
                notify,
                options
            )
        }

        function onOpenNotification(notify){
            console.log("[App] onOpenNotification: ", notify)
        }

        return() => {
            console.log("[App] unRegsiter")
            fcmService.unRegister()
            localNotificationService.unregister()
        }
    }, []);


    return (
        <WeeklyProvider>
            <NoticeProvider>
                <CurationProvider>
                    <DJProvider>
                        <UserProvider>
                            <SearchPlaylistProvider>
                                <PlaylistProvider>
                                    <BoardProvider>
                                        <SearchProvider>
                                            <AuthProvider>
                                                <App ref={(navigator) => setNavigator(navigator) }/>
                                            </AuthProvider>
                                        </SearchProvider>
                                    </BoardProvider>
                                </PlaylistProvider>
                            </SearchPlaylistProvider>
                        </UserProvider>
                    </DJProvider>
                </CurationProvider>
            </NoticeProvider>
        </WeeklyProvider>
    )
}
