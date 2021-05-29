import React , { useState, useContext, useRef, useEffect }from 'react';
import { Text, View, StyleSheet, Image, FlatList, TextInput, TouchableOpacity, Keyboard, ScrollView  } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SvgUri from 'react-native-svg-uri';
import TrackPlayer from 'react-native-track-player';
import { Context as PlaylistContext } from '../../context/PlaylistContext'
import { Context as UserContext } from '../../context/UserContext'
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../../components/FontNormalize';

const SongImage = ({url}) => {
    url =url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return <Image style ={{height:'100%', width:'100%', borderRadius: 100 * tmpWidth}} source ={{url:url}}/>
};

const PlaylistCreatePage = ({ initialValues, navigation }) => {
    const [hashtag, setHashtag] = useState([]);
    const [temphash, setTemphash] = useState('')
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const playList = navigation.getParam('data');
    const { addPlaylist } = useContext(PlaylistContext);
    const { getMyInfo } = useContext(UserContext);
    const [titleValidity, setTitleValidity] = useState(true);
    const [contentValidity, setContentValidity] = useState(true);
    const [thumbnailValidity, setThumbnailValidity] = useState(true);
    const [songValidity, setSongValidity] = useState(true);
    const titleRef = useRef();
    const commentRef = useRef();
    const addhashtag = ({data}) => {
        if (hashtag.length < 3 && data != '') {
            setHashtag([...hashtag, data]);
        }
    };
    const deletehashtag= ({data}) => {
        setHashtag(hashtag.filter(item=> item != data));
    };
    const upload = async () => {
        if(titleRef.current.value == undefined || titleRef.current.value.length == 0){
            setTitleValidity(false);
            return;
        }else{
            setTitleValidity(true);
        }
        if(commentRef.current.value == undefined || commentRef.current.value.length == 0){
            setContentValidity(false);
            return;
        }else{
            setContentValidity(true);
        }
        if(image == ''){
            setThumbnailValidity(false);
            return;
        }else{
            setThumbnailValidity(true);
        }
        if(playList.length < 3){
            setSongValidity(false);
            return;
        }else{
            setSongValidity(true);
        }
        const fd = new FormData();
        fd.append('img', {
            name: name,
            type: type,
            uri: 'file://' + image
        })
        await addPlaylist({ title: titleRef.current.value, textcontent: commentRef.current.value, songs:playList, hashtag, fd });
        getMyInfo();
    }
    const handleUpload = () => {
        launchImageLibrary({maxWidth: 500, maxHeight: 500}, (response) => {
            if(response.didCancel) {
                return;
            }
            setImage(response.uri);
            setName(response.fileName);
            setType(response.type);
        });
    };

    useEffect(() => {
        const listener = navigation.addListener('didFocus', async () => {
            await TrackPlayer.reset()
        });
        return () => listener.remove()
    }, []);
    return (
        <View style={styles.container}>
            <View style={{width: '100%'}}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                        <SvgUri width='100%' height='100%' source={require('../../assets/icons/back.svg')}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>플레이리스트 만들기</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.title}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.titleSize}>제목</Text>
                            <View style={{flex: 1}}>
                                <View style={titleValidity ? styles.input : styles.validityInput}>
                                    <TextInput
                                        ref={titleRef}
                                        placeholder="플레이리스트 제목을 적어주세요."
                                        placeholderTextColor='rgb(196,196,196)'
                                        onChangeText={text => titleRef.current.value = text}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        style={{fontSize: 14 * tmpWidth}}
                                    />
                                </View>
                                {titleValidity ? null :
                                <View style={styles.warningTitleContainer}>
                                    <SvgUri width='14' height='14' source={require('../../assets/icons/warning.svg')}/>
                                    <Text style={styles.warningText}>제목을 입력해주세요.</Text>
                                </View>}
                            </View>
                        </View>
                    </View>
                    <View style={styles.comment}>
                        <Text style={styles.titleSize}>코멘트</Text>
                        <View style={contentValidity ? styles.commentBox : styles.validityComment}>
                            <TextInput
                                ref={commentRef}
                                onChangeText={text=> commentRef.current.value = text}
                                placeholder="코멘트를 적어주세요."
                                autoCapitalize='none'
                                autoCorrect={false}
                                multiline={true}
                                style={styles.commentBoxText}
                                placeholderTextColor='rgb(196,196,196)'
                            />
                        </View>
                        {contentValidity ? null :
                        <View style={styles.warningContainer}>
                            <SvgUri width='14' height='14' source={require('../../assets/icons/warning.svg')}/>
                            <Text style={styles.warningText}>코멘트를 작성해주세요.</Text>
                        </View>}
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.hashtag}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.titleSize}>해시태그</Text>
                        <View style={styles.hashtagInput}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text>#</Text>
                                <TextInput
                                    value={temphash}
                                    onChangeText={(text)=>{
                                        if(text.length <= 9 && hashtag.length < 3) setTemphash(text)}}
                                    placeholder="해시태그를 적어주세요.(최대 3개, 9글자)"
                                    placeholderTextColor='rgb(196,196,196)'
                                    autoCapitalize='none'
                                    onSubmitEditing={() => {
                                        addhashtag({data:temphash})
                                        setTemphash('')
                                    }}
                                    autoCorrect={false}
                                    style={{fontSize: 13 * tmpWidth}}
                                />
                                </View>
                            <TouchableOpacity onPress={() => {
                                addhashtag({data:temphash})
                                setTemphash('')}}
                            >
                                <SvgUri width='32' height='32' source={require('../../assets/icons/songPlus.svg')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.tmpHashContainer}>
                        <FlatList
                            data={hashtag}
                            keyExtractor={posts => posts}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) =>{
                                return (
                                    <View style={styles.tmpHash}>
                                        <View style={styles.hashtagView}>
                                            <Text style={styles.hashtagBox}>{'#'+item}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.hashtagplus} onPress={() => deletehashtag({data:item})}>
                                            <Text style={{fontSize: 15 * tmpWidth, color: 'rgb(182,201,250)'}}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>
                <View style={styles.thumbnail}>
                    <View>
                        <Text style={styles.titleSize}>썸네일 이미지 선택하기</Text>
                        {thumbnailValidity ? null :
                        <View style={styles.warningContainer}>
                            <SvgUri width='14' height='14' source={require('../../assets/icons/warning.svg')}/>
                            <Text style={styles.warningText}>이미지를 선택해주세요.</Text>
                        </View>}
                    </View>
                    <TouchableOpacity style={thumbnailValidity ? styles.thumbnailBox : styles.validityThumbnail} onPress={() => handleUpload()}>
                        {image == '' ?
                        <SvgUri width='40' height='40' source={require('../../assets/icons/thumbnailPlus.svg')}/>
                        : <Image style={{width: '100%', height: '100%', borderRadius: 8 * tmpWidth}}source={{uri:image}}/>}
                    </TouchableOpacity>
                </View>
                <View style={styles.song}>
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <Text style={styles.titleSize}>곡 담기</Text>
                        <Text style={styles.songText}> (최소 3개, 최대 5개)</Text>
                        <TouchableOpacity onPress={() => navigate('SearchSong', { data:playList })}>
                            <SvgUri width='40' height='40' source={require('../../assets/icons/songPlus.svg')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={songValidity ? styles.songBox : styles.validitySongBox}>
                        <FlatList
                            data={playList}
                            keyExtractor={posts => posts.id}
                            renderItem={({item}) => {
                                return (
                                    <View style={styles.eachSong}>
                                        <View style={styles.songCover}>
                                            <SongImage url={item.attributes.artwork.url}/>
                                        </View>
                                        <View style={styles.songTextContainer}>
                                            <View style={styles.songTextWidth}>
                                                <Text style ={{fontSize: 14 * tmpWidth}} numberOfLines={1}>{item.attributes.name}</Text>
                                                <Text style={styles.artistText} numberOfLines={1}>{item.attributes.artistName}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>
                    {songValidity ? null :
                    <View style={styles.warningContainer}>
                        <SvgUri width='14' height='14' source={require('../../assets/icons/warning.svg')}/>
                        <Text style={styles.warningText}>곡을 담아주세요.</Text>
                    </View>}
                </View>
                <TouchableOpacity style={styles.uploadBox} onPress={() => upload()}>
                    <Text style={styles.uploadText}>업로드하기</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

PlaylistCreatePage.defaultProps = {
    initialValues:{
        song : [],
    },
};
PlaylistCreatePage.navigationOptions = ()=>{
    return {
        headerShown: false    
    };
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(254,254,254)',
        alignItems: 'center',
        height: '100%',
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    songCover: {
        width: 48 * tmpWidth,
        height: 48 * tmpWidth,
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
        color: '#fff'
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
