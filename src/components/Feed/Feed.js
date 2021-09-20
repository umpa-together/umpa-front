import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as UserContext } from 'context/UserContext';
import { StatusBarHeight } from 'components/StatusBarHeight'
import { tmpWidth } from 'components/FontNormalize'
import Playlist from  './Playlist';
import Story from './Story';
import StoryProvider from 'providers/story';
import SelectedStory from './SelectedStory';

const Feed = () => {
    const { state } = useContext(PlaylistContext);
    const { state: userState } = useContext(UserContext);

    return (
        <StoryProvider>
            <View style={styles.container}>
                <Text style={styles.title}>피드</Text>
            </View>
            <View style={{flex:1}}>
                <Story story={userState.otherStory} />
                <Playlist playList={state.playlists} />
            </View>       
            <SelectedStory />
        </StoryProvider>

    );
};

const styles=StyleSheet.create({
    container: {
        width: '100%', 
        height: (40 + StatusBarHeight) * tmpWidth, 
        paddingTop: StatusBarHeight * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
    },
    title: {
        fontSize: 24 * tmpWidth,
        fontWeight: '500',
        marginLeft: 18 * tmpWidth
    }
})

export default Feed;