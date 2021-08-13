import React, { useState, useContext } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Context as UserContext } from '../../context/UserContext';
import SvgUri from 'react-native-svg-uri';
import RepresentSong from '../RepresentSong';
import { tmpWidth } from '../FontNormalize';
import { SongImage } from '../SongImage';
import NewStory from './NewStory';
import Story from './Story';
import ProfileImage from '../ProfileImage';

export default SongProfile = ({ user, url, story, isMyAccount }) => {
    const { storyCalendar, storyView } = useContext(UserContext);
    const representImg = user.songs[0].attributes.artwork.url
    const [representModal, setRepresentModal] = useState(false);
    const [newStory, setNewStory] = useState(false);
    const [storyModal, setStoryModal] = useState(false);

    const onClickStory = () => {
        storyCalendar({id: user._id})
        setStoryModal(true);
        storyView({id: story.id})
    }

    const onClickRepresent = () => {
        setRepresentModal(true)
    }
    
    const onClickNewStory = () => {
        if(isMyAccount) setNewStory(true)
    }

    return (
        <View style={styles.container}>
            <View style={styles.songContainer}>
                <TouchableOpacity onPress={onClickRepresent}>
                    <SongImage url={representImg} size={68} border={68}/>
                </TouchableOpacity>
                <Text style={styles.songText}>대표곡</Text>
            </View>
            <ProfileImage img={user.profileImage} imgStyle={styles.profileImage}/>
            <View style={styles.songContainer}>
                { url == '' ?
                <TouchableOpacity onPress={onClickNewStory} style={styles.story}>
                    {isMyAccount ?
                    <SvgUri width={68} height={68} source={require('../../assets/icons/story.svg')} /> :
                    <SvgUri width={14*tmpWidth} height={14*tmpWidth} source={require('../../assets/icons/musicnote.svg')} /> }
                </TouchableOpacity> :
                <TouchableOpacity onPress={onClickStory}>
                    <SongImage url={url} size={68} border={68}/>
                </TouchableOpacity> }
                <Text style={styles.songText}>오늘의 곡</Text>
            </View>
            <RepresentSong representModal={representModal} setRepresentModal={setRepresentModal} song={user.songs} myAccount={isMyAccount}/>
            <NewStory newStory={newStory} setNewStory={setNewStory} />
            <Story story={story} storyModal={storyModal} setStoryModal={setStoryModal} isMyAccount={isMyAccount} />
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        width:375 * tmpWidth, 
        height:128 * tmpWidth, 
        marginTop:10 * tmpWidth
    },
    profileImage: {
        width: 114 * tmpWidth ,
        height: 114 * tmpWidth ,
        borderRadius: 128 * tmpWidth,
        marginLeft: 32 * tmpWidth,
        marginRight: 32 * tmpWidth
    },
    songContainer: {
        alignItems: 'center', 
        marginTop: 37 * tmpWidth
    },
    songText: {
        marginTop: 10 * tmpWidth, 
        fontSize: 12 * tmpWidth, 
        color: 'rgb(80,80,80)'
    },
    story: {
        width: 68 * tmpWidth ,
        height: 68 * tmpWidth,
        borderRadius: 68 * tmpWidth,
        backgroundColor: 'rgba(169,193,255,0.3)',
        justifyContent:'center',
        alignItems:'center',
    }
})