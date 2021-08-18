import React, { useState, useContext, useEffect } from 'react';
import { RefreshControl, View, ScrollView } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import AccountPlaylist from  'components/Account/AccountPlaylist';
import AccountCurating from  'components/Account/AccountCurating';
import Header from 'components/Account/Header'
import LoadingIndicator from 'components/LoadingIndicator'
import SongProfile from 'components/Account/SongProfile'
import FollowBox from 'components/Account/FollowBox'
import Introduction from 'components/Account/Introduction'
import Menu from 'components/Account/Menu'

require('date-utils');

const MyAccountScreen = () => {
    const { state: userState, getMyInfo, getMyStory } = useContext(UserContext);
    const [menu, setMenu] = useState('playlist');
    const [url, setUrl] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        if (refreshing){
            return;
        }else{
            fetchData();
        }
    }

    const fetchData = async () => {
        setRefreshing(true);
        await Promise.all([
            getMyInfo(),
            getMyStory()
        ])
        setRefreshing(false);
    };

    useEffect(() => {
        if(userState.myStory != null){
            setUrl(userState.myStory.song.attributes.artwork.url);
        }else {
            setUrl('')
        }
    }, [userState.myStory]);

    return (
        <View style={{backgroundColor: 'rgb(250,250,250)', flex: 1}}>
            { userState.myInfo == null ? <LoadingIndicator /> :
            <View style={{flex: 1}}>
                <Header user={userState.myInfo} isMyAccount={true} />
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}       
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[1]}
                >
                    <View>
                        <SongProfile user={userState.myInfo} url={url} story={userState.myStory} isMyAccount={true} />
                        <FollowBox user={userState.myInfo} isMyAccount={true} />
                        <Introduction user={userState.myInfo} />
                    </View>
                    <View>
                        <Menu user={userState.myInfo} menu={menu} setMenu={setMenu} />
                    </View>
                    <View style={{backgroundColor: 'rgb(255,255,255))'}}>
                        { menu == 'playlist' ?  <AccountPlaylist playList={userState.myInfo.playlists} /> :
                        <AccountCurating curating={userState.myInfo.curationposts} /> }
                    </View>
                </ScrollView>
            </View> }
        </View>
    );
};

export default MyAccountScreen;