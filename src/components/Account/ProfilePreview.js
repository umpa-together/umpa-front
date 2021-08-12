import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from '../../context/UserContext';
import { launchImageLibrary } from 'react-native-image-picker';
import ProfileImage from '../ProfileImage';
import { tmpWidth } from '../FontNormalize';

export default ProfilePreview = ({ img }) => {
    const { state } = useContext(UserContext);
    const [image, setImage] = useState(state.myInfo.profileImage);
    
    const onClickChange = () => {
        handleUpload()
    }

    const handleUpload = () => {
        launchImageLibrary({maxWidth: 500, maxHeight: 500}, (response) => {
            if(response.didCancel) {
                return;
            }
            img.name = response.fileName
            img.type = response.type
            img.uri = response.uri
            setImage(response.uri)
        });
    };

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>프로필 사진</Text>
                <TouchableOpacity onPress={onClickChange}>
                    <Text style={styles.change}>사진 변경</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profileBox}>
                <ProfileImage img={image} imgStyle={styles.profileImage}/>
            </View>
        </>
    )
}

const styles=StyleSheet.create({
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 24  * tmpWidth,
        marginRight: 24 * tmpWidth,
        marginTop: 12 * tmpWidth
    },
    title: {
        fontSize: 16 * tmpWidth
    },
    change: {
        fontSize: 14 * tmpWidth, 
        color: 'rgb(137,148,242)'
    },
    profileImage: {
        width: 114 * tmpWidth,
        height: 114 * tmpWidth,
        borderRadius: 114 * tmpWidth,
    },
    profileBox: {
        paddingTop: 36 * tmpWidth,
        alignItems: 'center', 
        height: 181.5 * tmpWidth,
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgba(196,196,196,0.3)'
    },
})