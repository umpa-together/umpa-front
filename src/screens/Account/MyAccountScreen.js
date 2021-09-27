import React, { useState, useContext, useEffect } from 'react';
import { RefreshControl, View, ScrollView, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import AccountPlaylist from  'components/Account/AccountPlaylist';
import AccountDaily from 'components/Account/AccountDaily'
import AccountCurating from  'components/Account/AccountCurating';
import Header from 'components/Account/Header'
import LoadingIndicator from 'components/LoadingIndicator'
import Menu from 'components/Account/Menu'
import Information from 'components/Account/Information'
import ProfileSong from 'components/Account/ProfileSong'
import Profile from 'components/Account/Profile'
import { tmpWidth } from 'components/FontNormalize'
import ProfileButton from 'components/Account/Button'

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
        <View style={styles.container}>
            { userState.myInfo == null ? <LoadingIndicator /> :
            <View style={styles.flex}>
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
                        <View style={styles.profile}>
                            <View style={styles.column}>
                                <Profile user={userState.myInfo} isMyAccount={true} url={url} story={userState.myStory} />
                                <ProfileButton isMyAccount={true} />
                            </View>
                            <Information user={userState.myInfo} />
                        </View>
                        <ProfileSong song={userState.myInfo.songs} isMyAccount={true} />
                    </View>
                    <View>
                        <Menu menu={menu} setMenu={setMenu} />
                    </View>
                    <View style={styles.background}>
                        { menu == 'playlist' ?  <AccountPlaylist playList={userState.myInfo.playlists} isMyAccount={true} /> :
                        <AccountDaily daily={userState.myInfo.dailys} isMyAccount={true} /> }
                    </View>
                </ScrollView>
            </View> }
        </View>
    );
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: '#ffffff', 
        flex: 1
    },
    flex: {
        flex: 1
    },
    profile: {
        flexDirection: 'row', 
        marginLeft: 22 * tmpWidth 
    },
    column: {
        flexDirection: 'column', 
        alignItems: 'center'
    },
    background: {
        backgroundColor: '#ffffff'
    }
})

export default MyAccountScreen;