import React, { useContext } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Context as UserContext } from '../../context/UserContext'
import { Context as DJContext } from '../../context/DJContext'
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../FontNormalize';
import { SongImage } from '../SongImage'

const CurationNoticeForm = ({ navigation, notice }) => {
    const { getOtheruser } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    return (
        notice.curationpost !=undefined ?
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={styles.img} onPress={async () =>{
                    await Promise.all([getOtheruser({id:notice.noticinguser._id}),
                    getSongs({id:notice.noticinguser._id})]);
                    navigation.push('OtherAccount', {otherUserId:notice.noticinguser._id})
                }}>
                    { notice.noticinguser.profileImage == undefined ?
                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                    : <Image style={styles.img} source={{uri: notice.noticinguser.profileImage}} /> }
                </TouchableOpacity>
                {notice.curationpost.isSong ?
                <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={styles.content}>
                        <View style={{width: 200 * tmpWidth}}>
                            <Text style={styles.name} numberOfLines={1}>{notice.curationpost.object.attributes.artistName} - {notice.curationpost.object.attributes.name}</Text>
                        </View>
                        <View style={{flexDirection: 'row', width: 200 * tmpWidth}}>
                            <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                               {notice.noticetype =='culike'?
                                <Text style={styles.innerText}> 님이 큐레이션을 좋아합니다. <Text style={styles.name}>{notice.time}</Text></Text>
                                :
                                <Text style={styles.innerText}> 님이 큐레이션에 댓글을 달았습니다. <Text style={styles.name}>{notice.time}</Text></Text>
                                }
                            </Text>
                        </View>
                    </View>
                    <SongImage url={notice.curationpost.object.attributes.artwork.url} size={48} border={10}/>
                </View> : 
                <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={styles.content}>
                        <View style={{width: 200 * tmpWidth}}>
                            <Text style={styles.name} numberOfLines={1}>{notice.curationpost.object.artistName} - {notice.curationpost.object.albumName}</Text>
                        </View>
                        <View style={{flexDirection: 'row', width: 200 * tmpWidth}}>
                            <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                            {notice.noticetype =='culike'?
                                <Text style={styles.innerText}> 님이 큐레이션을 좋아합니다. <Text style={styles.name}>{notice.time}</Text></Text>
                                :
                                <Text style={styles.innerText}> 님이 큐레이션에 댓글을 달았습니다. <Text style={styles.name}>{notice.time}</Text></Text>
                                }                            
                            </Text>
                        </View>
                    </View>
                    <SongImage url={notice.curationpost.object.artwork.url} size={48} border={10} />
                </View> }
            </View>
        </View>
        :
        <Text>삭제된 알람입니다.</Text>
        
    )
};

const styles=StyleSheet.create({
    container: {
        marginLeft: 20 * tmpWidth, 
        marginRight: 20 * tmpWidth, 
        flex: 1,
    },
    img: {
        height: 48 * tmpWidth, 
        width: 48 * tmpWidth, 
        borderRadius: 48 * tmpWidth,
    },
    content: {
        marginLeft: 14 * tmpWidth, 
        flex: 1,
    },
    name: {
        fontSize: 12 * tmpWidth,
        color: 'rgba(0,0,0,0.61)',
        lineHeight: 18 * tmpWidth,
    },
    outerText: {
        fontSize: 14 * tmpWidth, 
        fontWeight: '500',
        lineHeight: 18 * tmpWidth,
    },
    innerText: {
        fontWeight:'400',
        lineHeight: 18 * tmpWidth,
    }
});

export default CurationNoticeForm;