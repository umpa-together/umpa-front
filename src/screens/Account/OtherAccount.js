import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import AccountPlaylist from  'components/Account/AccountPlaylist';
import AccountCurating from  'components/Account/AccountCurating';
import Header from 'components/Account/Header'
import Menu from 'components/Account/Menu'
import LoadingIndicator from 'components/LoadingIndicator'
import ProfileSong from 'components/Account/ProfileSong'
import Profile from 'components/Account/Profile'
import { tmpWidth } from 'components/FontNormalize'
import ProfileButton from 'components/Account/Button'
import Information from 'components/Account/Information'

require('date-utils');

const OtherAccountScreen = ({ route }) => {
    const {state: userState } = useContext(UserContext);
    const [menu, setMenu] = useState('playlist');
    const [story, setStory] = useState(null);
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [url, setUrl] = useState('');
    const [user, setUser] = useState(null);   
    const { otherUserId: id } = route.params
    const [FollwerNum, setFollowerNum] = useState(0)

    useEffect(() => {
        const trackPlayer = setTimeout(() => setIsPlayingid('0'), 30000);
        return () => clearTimeout(trackPlayer);
    },[isPlayingid])

    useEffect(() => {
        if(user != null){
            var newDate = new Date();
            let time = newDate.toFormat('YYYY-MM-DD');
            if(userState.otherUser.todaySong != undefined)  setStory(userState.otherUser.todaySong.filter(item => item.time == time)[0]);
            setFollowerNum(user.follower.length)
        }
    }, [user]);

    useEffect(() => {
        if(story != null){
            setUrl(story['song'].attributes.artwork.url);
        }
    }, [story]);

    useEffect(() => {
        if(userState.otherUser != null){
            setUser(userState.otherUser);
        }
    }, [id]);

    return (
        <View style={styles.container}>
            {user === null ? <LoadingIndicator /> :
            <View style={styles.flex}>
                <Header user={user} isMyAccount={false} />
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[1]}
                >
                    <View>
                        <View style={styles.profile}>
                            <View style={styles.column}>
                                <Profile user={user} isMyAccount={false} url={url} story={story} />
                                <ProfileButton isMyAccount={false} user={user} setFollowerNum={setFollowerNum} />
                            </View>
                            <Information user={user} followerNum={FollwerNum}/>
                        </View>
                        <ProfileSong song={user.songs} isMyAccount={false} />
                    </View>
                    <View>
                        <Menu menu={menu} setMenu={setMenu} />
                    </View>
                    <View style={styles.background}>
                        {menu == 'playlist' ?  <AccountPlaylist playList={user.playlists} /> :
                        <AccountCurating curating={user.curationposts} />}
                    </View>
                </ScrollView>
            </View> }
        </View>
    )
};

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    flex: {
        flex: 1
    },
    profile: {
        flexDirection: 'row', 
        marginLeft: 22 * tmpWidth
    },
    background: {
        backgroundColor: '#ffffff'
    },
    column: {
        flexDirection: 'column', 
        alignItems: 'center'
    }
})

export default OtherAccountScreen;