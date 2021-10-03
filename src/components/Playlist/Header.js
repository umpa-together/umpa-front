import React, { useEffect, useState, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as PlaylistContext } from 'context/PlaylistContext'
import { Context as UserContext } from 'context/UserContext'
import { Context as FeedContext } from 'context/FeedContext';
import SvgUri from 'react-native-svg-uri'
import { tmpWidth } from 'components/FontNormalize'
import { StatusBarHeight } from 'components/StatusBarHeight'
import { goBack, navigate } from 'navigationRef'
import { usePlaylist } from 'providers/playlist';

export default Header = ({ title, click, setIsSearch, isEdit }) => {
    const { state, addPlaylist, editPlaylist } = useContext(PlaylistContext);
    const { getMyInfo } = useContext(UserContext)
    const { getFeeds } = useContext(FeedContext)
    const { songs, informationRef, setValidity, image, title: playlistTitle } = usePlaylist()
    const [isClick, setIsClick] = useState(false)

    const onClickRightOption = async () => {
        if(click === '완료') {
            if(isClick) {
                informationRef.current.songs = songs
                setIsSearch(false)
                navigate('Create', { data: songs, isEdit: informationRef.current.isEdit })    
                if(informationRef.current.title.length === 0 || !image){
                    setIsClick(false)
                }
            } else {
                setValidity((prev) => ({
                    ...prev,
                    song: false
                })) 
            }
        } else {
            if(isClick) {
                if(informationRef.current.isEdit){
                    await editPlaylist({ 
                        title: informationRef.current.title, 
                        songs: informationRef.current.songs, 
                        hashtag: informationRef.current.hashtagLists, 
                        playlistId: state.current_playlist._id 
                    });
                }else{
                    const fd = new FormData();
                    fd.append('img', {
                        name: informationRef.current.imgName,
                        type: informationRef.current.imgType,
                        uri: informationRef.current.imgUrl
                    })
                    await addPlaylist({ 
                        title: informationRef.current.title, 
                        songs: informationRef.current.songs, 
                        hashtag: informationRef.current.hashtagLists, 
                        fd
                    });            
                }
                getMyInfo();
                getFeeds()
            } else {
                if(informationRef.current.title.length == 0){
                    setValidity((prev) => ({
                        ...prev,
                        title: false
                    }))
                    return;
                } else {
                    setValidity((prev) => ({
                        ...prev,
                        title: true
                    }))        
                }
                if(!image){
                    setValidity((prev) => ({
                        ...prev,
                        thumbnail: false
                    }))            
                    return;
                } else {
                    setValidity((prev) => ({
                        ...prev,
                        thumbnail: true
                    }))        
                }
                if(informationRef.current.songs.length < 3){
                    setValidity((prev) => ({
                        ...prev,
                        song: false
                    })) 
                    return;
                } else {
                    setValidity((prev) => ({
                        ...prev,
                        song: true
                    })) 
                }
            }
        }
    }

    const onClickBack = () => {
        if(click === '완료') { 
            setIsSearch(false)
        } else {
            goBack()
        }
    }

    useEffect(() => {
        if(click === '완료') {
            if(songs.length >= 3) {
                setIsClick(true)
            } else {
                setIsClick(false)
            }
        } else {
            if(songs.length >= 3 && informationRef.current.title.length !== 0 && image) {
                setIsClick(true)
            } else {
                setIsClick(false)
            }
            if(isEdit) setIsClick(true)
        }
    }, [songs, image, playlistTitle, isEdit])

    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.back} onPress={onClickBack}>
                <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('assets/icons/back.svg')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.right} onPress={onClickRightOption}>
                <Text style={[styles.text, isClick && styles.active]}>{click}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    header: {
        width: '100%', 
        height: (48 + StatusBarHeight) * tmpWidth, 
        paddingTop: StatusBarHeight * tmpWidth,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    back: {
        position: 'absolute',
        left: 5 * tmpWidth, 
        top: (2 + StatusBarHeight) * tmpWidth
    },
    title: {
        textAlign: 'center', 
        fontSize: 16 * tmpWidth,
        fontWeight: '500' 
    },
    text: {
        fontWeight: '500',
        fontSize: 16 * tmpWidth,
        color: '#94979e', 
    },
    active: {
        color: '#8bc0ff'
    },
    right: {
        position: 'absolute',
        right: 18 * tmpWidth, 
        top: (14 + StatusBarHeight) * tmpWidth   
    }
})