import React, { useContext } from 'react';
import { View, SafeAreaView } from 'react-native';
import {Context as PlaylistContext} from '../../context/PlaylistContext';
import {Context as UserContext} from '../../context/UserContext';
import Playlist from  './Playlist';
import Story from './Story';
import StoryProvider from '../../providers/story';
import StoryModal from './StoryModal';

const Feed = () => {
    const { state } = useContext(PlaylistContext);
    const { state: userState } = useContext(UserContext);

    return (
        <StoryProvider>
            <SafeAreaView style={{backgroundColor:"rgb(254,254,254)", flex: 1}}>
                <View style={{flex:1}}>
                    <Story story={userState.otherStory} />
                    <Playlist playList={state.playlists} />
                </View>          
            </SafeAreaView>
            <StoryModal />
        </StoryProvider>

    );
};

export default Feed;
