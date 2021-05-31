import React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../FontNormalize';

const Imagetake = ({url}) => {
    url = url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return (
        <Image style ={{borderRadius: 10 * tmpWidth, height: 48 * tmpWidth, width: 48 * tmpWidth}} source ={{url:url}}/>
    );
};

const CurationNoticeForm = ({ notice }) => {
    return (
        notice.curationpost !=undefined ?
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {notice.noticinguser.profileImage == undefined ?
                <View style={styles.img}>
                   <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                </View> : <Image style={styles.img} source={{uri: notice.noticinguser.profileImage}} /> }
                <View style={styles.content}>
                    <Text style={styles.name}>{notice.curationpost.object.attributes.artistName} - {notice.curationpost.object.attributes.name}</Text>
                    <View style={{flexDirection: 'row', width: 200 * tmpWidth}}>
                        <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                            <Text style={styles.innerText}> 님이 큐레이팅을 좋아합니다. <Text style={styles.name}>{notice.time}</Text></Text>
                        </Text>
                    </View>
                </View>
                <Imagetake url={notice.curationpost.object.attributes.artwork.url} />
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
        lineHeight: 16 * tmpWidth,
    },
    outerText: {
        fontSize: 14 * tmpWidth, 
        fontWeight: '500',
        lineHeight: 16 * tmpWidth,
    },
    innerText: {
        fontWeight:'400',
        lineHeight: 16 * tmpWidth,
    }
});

export default CurationNoticeForm;