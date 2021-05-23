import React, { useContext } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Context as UserContext } from '../../context/UserContext';
import { tmpWidth } from '../FontNormalize';

const UserNoticeForm = ({ notice }) => {
    const { state } = useContext(UserContext);
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {notice.noticinguser.profileImage == undefined ?
                <View style={styles.img}>
                   <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                </View> : <Image style={styles.img} source={{uri: notice.noticinguser.profileImage}} /> }
                <View style={styles.content}>
                    <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name}
                        <Text style={styles.innerText}> 님이 {state.myInfo.name}님을 팔로우 했습니다.</Text>
                        <Text style={styles.time}> {notice.time}</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
};

const styles=StyleSheet.create({
    container: {
        marginLeft: 20 * tmpWidth, 
        marginRight: 20 * tmpWidth, 
        flex: 1
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
    outerText: {
        fontSize: 14 * tmpWidth, 
        fontWeight: '500'
    },
    innerText: {
        fontWeight:'400'
    },
    time: {
        fontSize: 12 * tmpWidth,
        color: 'rgba(0,0,0,0.61)'
    },
});

export default UserNoticeForm;