import React , { useState, useContext, useEffect, useRef, useCallback }from 'react';
import { Text, View, StyleSheet, Image, FlatList, TextInput, TouchableOpacity, Keyboard, ScrollView  } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SvgUri from 'react-native-svg-uri';
import { Context as PlaylistContext } from '../../context/PlaylistContext'
import { Context as UserContext } from '../../context/UserContext'
import { navigate, goBack } from '../../navigationRef';
import { tmpWidth } from '../../components/FontNormalize';
import { SongImage } from '../../components/SongImage'
import CreateTitle from '../../components/Playlist/CreateTitle';
import CreateHashtag from '../../components/Playlist/CreateHashtag';
import CreateSongsLists from '../../components/Playlist/CreateSongsLists';
import CreateFooter from '../../components/Playlist/CreateFooter';
import { useFocusEffect } from '@react-navigation/native';

const PlaylistCreatePage = ({ route }) => {
    const { data: playList, isEdit } = route.params
    const { state, addPlaylist, editPlaylist, getPlaylists } = useContext(PlaylistContext);
    const { getMyInfo } = useContext(UserContext);
    const [image, setImage] = useState(isEdit ? state.current_playlist.image : '');
    const [thumbnailValidity, setThumbnailValidity] = useState(true);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [validity, setValidity] = useState({
        title: true, 
        song: true,
        hashtag: true,
        thumbnail: true,
    })
    const informationRef = useRef({
        hashtagLists: isEdit ? state.current_playlist.hashtag : [], 
        title: isEdit ? state.current_playlist.title : '',
        imgUrl: isEdit ? state.current_playlist.image : '',
        imgName: '',
        imgType: '',
        songs: playList,
        isEdit: isEdit,
    })

    const onClickUpload = async () => {
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
        if(image == ''){
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
        if(playList.length < 3){
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

        if(isEdit){
            // comment 처리하기
            //await editPlaylist({ title: informationRef.current.title, textcontent: comment, songs: playList, hashtag, playlistId: state.current_playlist._id });
        }else{
            const fd = new FormData();
            fd.append('img', {
                name: informationRef.current.imgName,
                type: informationRef.current.imgType,
                uri: 'file://' + informationRef.current.imgUrl
            })
            // comment 처리하기
            //await addPlaylist({ title: informationRef.current.title, textcontent: comment, songs: playList, hashtag, fd });            
        }
        //getMyInfo();
        //getPlaylists();
    }

    const handleUpload = () => {
        launchImageLibrary({maxWidth: 500, maxHeight: 500}, (response) => {
            if(response.didCancel) {
                return;
            }
            informationRef.current.imgUrl = response.uri
            informationRef.current.imgName = response.fileName
            informationRef.current.imgType = response.type
            setImage(response.uri)
        });
    };

    const onKeyboardDidShow =(e) =>{
        setKeyboardHeight(e.endCoordinates.height);
    }

    const onKeyboardDidHide=()=>{
        setKeyboardHeight(0);
    }

    useEffect(() => {
        if(playList.length >= 3) {
            setValidity((prev) => ({
            ...prev,
            song: true
            })) 
        }
    }, [playList])

    useFocusEffect(
        useCallback(() => {
            Keyboard.addListener('keyboardWillShow', onKeyboardDidShow);
            Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
            return () => {
                Keyboard.removeListener('keyboardWillShow', onKeyboardDidShow);
                Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
            }
        }, [])
    )

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onClickUpload}>
                <Text style={styles.uploadText}>{isEdit ? '수정하기' : '업로드하기'}</Text>
            </TouchableOpacity>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                style={{borderWidth: 1}}
                contentContainerStyle={{flex:1, justifyContent: 'space-between'}}
            >
                <View>
                    <CreateTitle informationRef={informationRef} validity={validity} />
                    <CreateHashtag informationRef={informationRef} validity={validity} />
                    {playList.length !== 0 && <CreateSongsLists songs={playList} validity={validity} /> }
                    <View>
                        { isEdit ? 
                        <Image style={{width: 320, height: 200, borderRadius: 8 * tmpWidth}}source={{uri:image}}/>
                         :
                        <TouchableOpacity style={thumbnailValidity ? styles.thumbnailBox : styles.validityThumbnail} onPress={() => handleUpload()}>
                            {image == '' ?
                            <SvgUri width='40' height='40' source={require('../../assets/icons/thumbnailPlus.svg')}/>
                            : <Image style={{width: '100%', height: '100%', borderRadius: 8 * tmpWidth}}source={{uri:image}}/>}
                        </TouchableOpacity> }
                    </View>
                </View>
                <View style={{marginBottom: keyboardHeight}}>
                    <CreateFooter informationRef={informationRef} setImage={setImage} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(254,254,254)',
        alignItems: 'center',
        height: '100%',
        paddingTop: 44
    },
    header:{
        width: '100%',
        height: 48 * tmpWidth,
        marginTop: 44 * tmpWidth,
        flexDirection: 'row',
    },
    headerIcon:{
        marginLeft: 5 * tmpWidth,
        marginTop: 5 * tmpWidth,
        width: 40 * tmpWidth,
        height: 40 * tmpWidth,
    },
    headerTitle: {
        fontSize: 18 * tmpWidth, 
        marginTop: 18 * tmpWidth,
        width: '100%', 
        textAlign: 'center', 
        position: 'absolute',
        zIndex: -1
    },
    title: {
        width: 327 * tmpWidth,
        height: 44 * tmpWidth,
        marginTop: 30 * tmpWidth,
    },
    input: {
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(196,196,196)',
        marginLeft: 14 * tmpWidth,
        paddingBottom: 7 * tmpWidth,
    },
    titleSize: {
        fontSize: 16 * tmpWidth
    },
    comment: {
        width: 327 * tmpWidth,
        height: 135 * tmpWidth,
        marginTop: 14 * tmpWidth
    },
    commentBox: {
        width: 327 * tmpWidth,
        height: 88 * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(196,196,196)',
        borderRadius: 8 * tmpWidth,
        marginTop: 10 * tmpWidth,
    },
    commentBoxText: {
        fontSize: 14 * tmpWidth, 
        paddingTop: 12 * tmpWidth,  
        paddingLeft: 12 * tmpWidth, 
        paddingRight: 12 * tmpWidth, 
        flex: 1
    },
    hashtag: {
        width: 327 * tmpWidth,
        height: 32 * tmpWidth,
        marginTop: 7 * tmpWidth,
    },
    hashtagInput: {
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(196,196,196)',
        marginLeft: 14 * tmpWidth,
    },
    hashtagplus: {
        width: 20.4 * tmpWidth,
        height: 20.4 * tmpWidth,
        backgroundColor: 'rgb(239,244,255)',
        borderRadius: 20.4 * tmpWidth,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    hashtagView: {
        borderWidth: 1 * tmpWidth,
        borderRadius: 100 * tmpWidth,
        borderColor: 'rgb(169,193,255)',
        marginRight: 3 * tmpWidth,
    },
    hashtagBox: {
        paddingLeft: 11 * tmpWidth, 
        paddingRight: 11 * tmpWidth,
        paddingTop: 3 * tmpWidth,
        paddingBottom: 3 * tmpWidth,
        fontSize: 14 * tmpWidth,
        color: 'rgb(169,193,255)',
    },
    tmpHashContainer: {
        height: 26 * tmpWidth,
        marginTop: 10 * tmpWidth,
        marginLeft: 65 * tmpWidth,
    },
    tmpHash: {
        flexDirection: 'row', 
        marginRight: 8 * tmpWidth, 
        alignItems: 'center'
    },
    thumbnail: {
        marginTop: 62 * tmpWidth,
        width: 327 * tmpWidth,
        height: 26 * tmpWidth,
        flexDirection: 'row',
    },
    thumbnailBox: {
        width: 101 * tmpWidth,
        height: 62 * tmpWidth,
        borderRadius: 8 * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(232,232,232)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12 * tmpWidth 
    },
    song: {
        marginTop: 48 * tmpWidth,
        width: 327 * tmpWidth,
        height: 262 * tmpWidth,
    },
    songText: {
        fontSize: 14 * tmpWidth, 
        color:'rgb(196,196,196)', 
        marginRight: 5 * tmpWidth
    },
    songBox: {
        width: 327 * tmpWidth,
        height: 187 * tmpWidth,
        borderColor: 'rgb(232,232,232)',
        borderRadius: 8 * tmpWidth,
        borderWidth: 1 * tmpWidth,
    },
    eachSong: {
        width: 327 * tmpWidth,
        height: 71 * tmpWidth,
        backgroundColor: 'rgb(249,249,249)',
        borderBottomColor: 'rgb(255,255,255)',
        borderBottomWidth: 1 * tmpWidth,
        flexDirection: 'row',
        paddingTop: 12 * tmpWidth,
        paddingLeft: 20 * tmpWidth,
        borderRadius: 8 * tmpWidth
    },
    songTextContainer: {
        paddingTop: 6 * tmpWidth,  
        marginLeft: 14 * tmpWidth
    },
    songTextWidth: {
        width: 240 * tmpWidth
    },
    artistText: {
        fontSize: 11 * tmpWidth, 
        color: 'rgb(133,133,133)', 
        marginTop: 8 * tmpWidth
    },
    uploadBox: {
        width: 327 * tmpWidth,
        height: 52 * tmpWidth,
        borderRadius: 100 * tmpWidth,
        backgroundColor: 'rgb(169,193,255)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12 * tmpWidth
    },
    uploadText: {
        fontSize: 18 * tmpWidth, 
    },
    warningTitleContainer: {
        flexDirection: 'row', 
        marginTop: 4 * tmpWidth,  
        marginLeft: 14 * tmpWidth
    },
    warningText: {
        color:'rgb(238, 98, 92)', 
        marginLeft: 4 * tmpWidth, 
        fontSize: 12 * tmpWidth
    },
    warningContainer: {
        flexDirection: 'row', 
        marginTop: 4 * tmpWidth, 
    },
    warningIcon: {
        width: 14 * tmpWidth,
        height: 14 * tmpWidth,
        backgroundColor: 'rgb(238,98,92)'
    },
    validityInput: {
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(238,98,92)',
        marginLeft: 14 * tmpWidth,
        paddingBottom: 7 * tmpWidth,
    },
    validityComment: {
        width: 327 * tmpWidth,
        height: 88 * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(238,98,92)',
        borderRadius: 8 * tmpWidth,
        marginTop: 10 * tmpWidth
    },
    validityThumbnail: {
        width: 101 * tmpWidth,
        height: 62 * tmpWidth,
        borderRadius: 8 * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(238,98,92)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12 * tmpWidth
    },
    validitySongBox: {
        width: 327 * tmpWidth,
        height: 187 * tmpWidth,
        borderColor: 'rgb(238,98,92)',
        borderRadius: 8 * tmpWidth,
        borderWidth: 1 * tmpWidth,
    },
});

export default PlaylistCreatePage; 
