import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import AccountPlaylist from  'components/Account/AccountPlaylist';
import AccountCurating from  'components/Account/AccountCurating';
import Header from 'components/Account/Header'
import SongProfile from 'components/Account/SongProfile'
import FollowBox from 'components/Account/FollowBox';
import Introduction from 'components/Account/Introduction'
import Menu from 'components/Account/Menu'
import LoadingIndicator from 'components/LoadingIndicator'

require('date-utils');

const OtherAccountScreen = ({ route }) => {
    const {state: userState } = useContext(UserContext);
    const [menu, setMenu] = useState('playlist');
    const [story, setStory] = useState(null);
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [url, setUrl] = useState('');
    const [user, setUser] = useState(null);   
    const { otherUserId: id } = route.params
    
    useEffect(() => {
        const trackPlayer = setTimeout(() => setIsPlayingid('0'), 30000);
        return () => clearTimeout(trackPlayer);
    },[isPlayingid])

    useEffect(() => {
        if(user != null){
            var newDate = new Date();
            let time = newDate.toFormat('YYYY-MM-DD');
            if(userState.otherUser.todaySong != undefined)  setStory(userState.otherUser.todaySong.filter(item => item.time == time)[0]);
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
        <View style={{flex:1,backgroundColor: 'rgb(250,250,250)'}}>
            {user === null ? <LoadingIndicator /> :
            <View style={{flex: 1}}>
                <Header user={user} isMyAccount={false} />
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[1]}
                >
                    <View>
                        <SongProfile user={user} url={url} story={story} isMyAccount={false} />
                        <FollowBox user={user} isMyAccount={false} />
                        <Introduction user={user} />
                    </View>
                    <View>
                        <Menu user={user} menu={menu} setMenu={setMenu} />
                    </View>
                    <View style={{backgroundColor: 'rgb(255,255,255)'}}>
                        {menu == 'playlist' ?  <AccountPlaylist playList={user.playlists} /> :
                        <AccountCurating curating={user.curationposts} />}
                    </View>
                </ScrollView>
            </View> }
        </View>
    )
};

export default OtherAccountScreen;