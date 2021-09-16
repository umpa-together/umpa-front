import React, { useState, useContext, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import { goBack } from 'navigationRef';
import ProfilePreview from 'components/Account/ProfilePreview';
import ProfileEdit from 'components/Account/ProfileEdit';
import { EditHeader } from 'components/Account/Header'

const ProfileEditPage = () => {
    const { state, editProfileImage, editProfile } = useContext(UserContext);
    const [nameValidity, setNameValidity] = useState(true);
    const informationRef = useRef({ nickName: state.myInfo.name, name: state.myInfo.realName, introduction: state.myInfo.introduction })
    const imageRef = useRef({name: '', type: '', uri: ''})

    const onClickUpload = async () => {
        if(informationRef.current.nickName.length === 0){
            setNameValidity(false);
            return;
        }else{
            setNameValidity(true);
        }

        
        const fd = new FormData();
        fd.append('img', {
            name: imageRef.current.name,
            type: imageRef.current.type,
            uri: imageRef.current.uri
        })
        await editProfile({
            nickName: informationRef.current.nickName, 
            name: informationRef.current.name,
            introduction: informationRef.current.introduction
        });
        if(imageRef.current.name !== '')  await editProfileImage({ fd })
        goBack();
    }

    return (
        <View style={styles.container}>
            <EditHeader />
            <ProfilePreview img={imageRef.current}/>
            <ProfileEdit nameValidity={nameValidity} information={informationRef.current} />
            <View style={styles.uploadContainer}>
                <TouchableOpacity 
                    style={styles.uploadBox} 
                    onPress={onClickUpload}
                >
                    <Text style={styles.edit}>편집하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(254,254,254)', 
        flex: 1
    },
    uploadContainer: {
        flex: 1, 
        alignItems: 'center'
    },
    uploadBox: {
        width: 339 * tmpWidth,
        height: 47 * tmpWidth,
        borderRadius: 8 * tmpWidth,
        backgroundColor: '#8bc0ff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 48 * tmpWidth
    },
    edit: {
        fontSize: 18 * tmpWidth, 
        color: '#fff',
        fontWeight: '500'
    }
});

export default ProfileEditPage;