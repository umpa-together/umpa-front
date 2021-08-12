import React , { useState, useContext, useRef, useEffect }from 'react';
import { Text, View, StyleSheet, Image, FlatList, Animated , TextInput, TouchableOpacity, Keyboard, ScrollView, Platform, StatusBar } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SvgUri from 'react-native-svg-uri';
import TrackPlayer from 'react-native-track-player';
import { Context as DailyContext } from '../../context/DailyContext'
import { Context as UserContext } from '../../context/UserContext'
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../../components/FontNormalize';
import { SongImage } from '../../components/SongImage'
import LinearGradient from 'react-native-linear-gradient';

const DailyPage = ({ navigation }) => {
    const [hashtag, setHashtag] = useState([]);
    const [temphash, setTemphash] = useState('')
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const Daily = navigation.getParam('data');
    const { state, addDaily, editDaily, getDaily,getAllDailys } = useContext(DailyContext);
    const { getMyInfo } = useContext(UserContext);
    const [contentValidity, setContentValidity] = useState(true);
    const [thumbnailValidity, setThumbnailValidity] = useState(true);
    const [songValidity, setSongValidity] = useState(true);
    const [hashtagValidity, setHashtagValidty] = useState(true);
    const [comment, setComment] = useState('');
    const isEdit = navigation.getParam('isEdit');
    const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;
    const pattern_num = /[0-9]/;
    const pattern_eng = /[a-zA-Z]/;
    const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const scrollX = useRef(new Animated.Value(0)).current;

    const addhashtag = ({data}) => {
        if (hashtag.length < 3 && data != '') {
            setHashtag([...hashtag, data]);
        }
    };
    const deletehashtag= ({data}) => {
        setHashtag(hashtag.filter(item=> item != data));
    };
    const upload = async () => {
        
        if(comment.length == 0){
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
        if(Daily.length !=1){
            setSongValidity(false);
            return;
        }else{
            setSongValidity(true);
        }

        if(isEdit){
            await editDaily({  textcontent: comment, songs: Daily, hashtag, DailyId: state.current_Daily._id });
        }else{
            const fd = new FormData();
            fd.append('img', {
                name: name,
                type: type,
                uri: 'file://' + image
            })
            await addDaily({  textcontent: comment, songs: Daily, hashtag, fd });            
        }
        getMyInfo();
        getDailys();
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
        if(isEdit){
            setComment(state.current_Daily.textcontent)
            setHashtag(state.current_Daily.hashtag)
            setImage(state.current_Daily.image)
        }
    }, [isEdit]);
    useEffect(() => {
        if(Daily != null && Daily !=undefined){
        if(Daily.length == 1)    setSongValidity(true)
        }
    }, [Daily])
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
                    <Text style={styles.headerTitle}>플레이리스트 {isEdit ? '수정' : '만들기'}</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               
                    <View style={styles.comment}>
                        <Text style={styles.titleSize}>코멘트</Text>
                        <View style={contentValidity ? styles.commentBox : styles.validityComment}>
                            <TextInput
                                value={comment}
                                onChangeText={text => setComment(text)}
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
                                <Text style={{color: 'rgb(169,193,255)', marginRight: 4 * tmpWidth}}>#</Text>
                                <TextInput
                                    value={temphash}
                                    onChangeText={(text)=>{
                                        if(text.length <= 9 && hashtag.length < 3) setTemphash(text)}}
                                    placeholder="해시태그를 적어주세요.(최대 3개, 9글자)"
                                    placeholderTextColor='rgb(196,196,196)'
                                    autoCapitalize='none'
                                    onSubmitEditing={() => {
                                        if(!pattern_spc.test(temphash) && (pattern_eng.test(temphash) || pattern_kor.test(temphash) || pattern_num.test(temphash))){
                                            addhashtag({data:temphash})
                                            setTemphash('')
                                            setHashtagValidty(true)
                                        }else{
                                            setHashtagValidty(false)
                                        }
                                    }}
                                    autoCorrect={false}
                                    style={{fontSize: 12 * tmpWidth, width : tmpWidth*215, padding: 0}}
                                />
                                </View>
                            <TouchableOpacity onPress={() => {
                                if(!pattern_spc.test(temphash) && (pattern_eng.test(temphash) || pattern_kor.test(temphash) || pattern_num.test(temphash))){
                                    addhashtag({data:temphash})
                                    setTemphash('')
                                    setHashtagValidty(true)
                                }else{
                                    setHashtagValidty(false)
                                }}}
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
                    {hashtagValidity ? null :
                    <View style={{flexDirection:'row', marginTop: 4 * tmpWidth, marginLeft: 65 * tmpWidth,}}>
                        <SvgUri width='14' height='14' source={require('../../assets/icons/warning.svg')}/>
                        <Text style={styles.warningText}>특수문자는 불가능합니다.</Text>
                    </View>}
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
                    { isEdit ? 
                    <View style={thumbnailValidity ? styles.thumbnailBox : styles.validityThumbnail}>
                        {image == '' ?
                        <SvgUri width='40' height='40' source={require('../../assets/icons/thumbnailPlus.svg')}/>
                        : <Image style={{width: '100%', height: '100%', borderRadius: 8 * tmpWidth}}source={{uri:image}}/>}
                    </View> :
                    <TouchableOpacity style={thumbnailValidity ? styles.thumbnailBox : styles.validityThumbnail} onPress={() => handleUpload()}>
                        {image == '' ?
                        <SvgUri width='40' height='40' source={require('../../assets/icons/thumbnailPlus.svg')}/>
                        : <Image style={{width: '100%', height: '100%', borderRadius: 8 * tmpWidth}}source={{uri:image}}/>}
                    </TouchableOpacity> }
                </View>
                <View style={styles.song}>
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <Text style={styles.titleSize}>곡 담기</Text>
                        <Text style={styles.songText}> (최소 3개, 최대 5개)</Text>
                        <TouchableOpacity onPress={() => navigate('DailySearch', { data:Daily, isEdit })}>
                            <SvgUri width='40' height='40' source={require('../../assets/icons/songPlus.svg')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={songValidity ? styles.songBox : styles.validitySongBox}>
                        <FlatList
                            data={Daily}
                            keyExtractor={posts => posts.id}
                            renderItem={({item}) => {
                                return (
                                    <View style={styles.eachSong}>
                                        <SongImage url={item.attributes.artwork.url} size={48} border={48} />
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
                    <Text style={styles.uploadText}>{isEdit ? '수정하기' : '업로드하기'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ getAllDailys(); }}>
                    <Text>데일리불러오기</Text>
                </TouchableOpacity>
                <View style={{width: '100%', height:240 * tmpWidth}}>
                    <Animated.FlatList
                        data={state.allDailys}
                        keyExtractor = {playlists => playlists._id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={344*tmpWidth }
                        decelerationRate={0}
                        bounces={false}
                        scrollEventThrottle={16}
                        contentContainerStyle={{paddingLeft: 18 * tmpWidth, paddingRight: 6 * tmpWidth}}
                        onScroll = {Animated.event(
                            [{ nativeEvent: {contentOffset: {x: scrollX } } }]
                        )}
                        renderItem={({item})=> {
                            return (
                                <TouchableOpacity style={styles.playlistitem} onPress={async () => {
                                    await getDaily({id:item._id, postUserId:item.postUserId._id})
                                    navigation.push('SelectedDaily', {id: item._id, navigation: navigation, postUser: item.postUserId._id})
                                }}>
                                    <View style={{position:'absolute', width:'100%', height:'100%'}} >
                                        <Image style ={{height:'100%', width:'100%', borderRadius: 8 * tmpWidth}} source ={{uri:item.image}}/>
                                    </View>
                                    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0)','rgba(0,0,0,0.1)' ]} style={styles.playlistitem2}>
                                    <View style={{flexDirection:'row' ,width:331 * tmpWidth, height:40 * tmpWidth}}>
                                        <View style={styles.playlistprofile}>
                                            {item.postUserId.profileImage == null ?
                                            <View style={{width:20 * tmpWidth, height:20 * tmpWidth, borderRadius:12 * tmpWidth, backgroundColor:'#fff'}}>
                                                <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />

                                            </View>
                                             :
                                            <Image style={{width:20 * tmpWidth, height:20 * tmpWidth, borderRadius:12 * tmpWidth}} source={{uri: item.postUserId.profileImage}} />}
                                        </View>
                                        <Text style={styles.playlistusertext}>{item.postUserId.name}</Text>
                                    </View>
                                    <View style={styles.playlistinfo}>
                                        <Text style={{fontSize:14 * tmpWidth,color:"#fff", marginRight:12 * tmpWidth,fontWeight:'bold', marginBottom:tmpWidth*4}}>{item.title}</Text>
                                        <Text style={{fontSize:12 *tmpWidth, color:'rgba(255,255,255,0.8)',marginRight:12 * tmpWidth, marginBottom:tmpWidth*8}}>{item.hashtag.map(hashtag => ' #'+hashtag+'')}</Text>
                                    </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
};
DailyPage.navigationOptions = ()=>{
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
        marginTop: Platform.OS === 'ios' ? 44 * tmpWidth : StatusBar.currentHeight * tmpWidth,
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
        paddingBottom: Platform.OS === 'ios' ? 7 * tmpWidth : 3 * tmpWidth,
    },
    titleSize: {
        fontSize: 16 * tmpWidth
    },
    comment: {
        width: 327 * tmpWidth,
        height: 140 * tmpWidth,
        marginTop: 14 * tmpWidth,
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
        flex: 1,
        textAlignVertical: 'top',
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
        paddingBottom: Platform.OS === 'ios' ? 7 * tmpWidth : 3 * tmpWidth,
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
    playlistitem:{
        width:331 * tmpWidth,
        height:224 * tmpWidth,
        borderRadius:8 * tmpWidth,
        backgroundColor:'#aaa',
        marginLeft:6 * tmpWidth,
        marginRight: 6 * tmpWidth,
        shadowColor: "rgb(99, 99, 99)",
        shadowOffset: {
            height: 2 * tmpWidth,
            width: 2 * tmpWidth,
        },
        shadowRadius: 2 * tmpWidth,
        shadowOpacity: 0.3,
        elevation: 5
    },
    playlistitem2:{
        width:331* tmpWidth,
        height:224 * tmpWidth,
        borderRadius:8 * tmpWidth,
    },
    playlistprofile:{
        marginLeft:12 * tmpWidth,
        marginTop:12 * tmpWidth,
        width:20 * tmpWidth,
        height:20 * tmpWidth,
        borderRadius:12 * tmpWidth
    },
    playlistusertext:{
        fontSize:14 * tmpWidth,
        marginTop:15 * tmpWidth,
        marginLeft:8 * tmpWidth,
        color:'rgba(255,255,255,0.72)',
        opacity:0.72
    },
    playlistinfo:{
        width:331 * tmpWidth,
        height:184 * tmpWidth,
        marginBottom:6 * tmpWidth,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
});

export default DailyPage; 
