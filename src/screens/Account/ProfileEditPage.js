import React, { useState, useContext, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { Context as AuthContext } from 'context/AuthContext';
import { tmpWidth } from 'components/FontNormalize';
import Header from 'components/Header';
import { goBack } from 'navigationRef';
import ProfilePreview from 'components/Account/ProfilePreview';
import ProfileEdit from 'components/Account/ProfileEdit';

const ProfileEditPage = () => {
    const { state: authState, checkName } = useContext(AuthContext);
    const { state, editProfileImage, editProfile } = useContext(UserContext);
    const [nameValidity, setNameValidity] = useState(true);
    const [doubleCheck, setDoubleCheck] = useState(false);
    const informationRef = useRef({ userName: state.myInfo.name, introduction: state.myInfo.introduction })
    const imageRef = useRef({name: '', type: '', uri: ''})
    const currentName = state.myInfo.name
    const onClickUpload = async () => {
        if(informationRef.current.userName.length == 0){
            setNameValidity(false);
            return;
        }else{
            setNameValidity(true);
        }
        if(currentName != informationRef.current.userName){
            await checkName({name: informationRef.current.userName});
            setDoubleCheck(true);
            if(!authState.doubleCheck)  return;
        }
        const fd = new FormData();
        fd.append('img', {
            name: imageRef.current.name,
            type: imageRef.current.type,
            uri: 'file://' + imageRef.current.uri
        })
        await editProfile({name: informationRef.current.userName, introduction: informationRef.current.introduction});
        if(imageRef.current.name != '')  await editProfileImage({ fd })
        goBack();
    }

    return (
        <View style={styles.container}>
            <Header title="프로필 편집"/>
            <ProfilePreview img={imageRef.current}/>
            <View style={styles.editContainer}>
                <ProfileEdit nameValidity={nameValidity} doubleCheck={doubleCheck} information={informationRef.current} />
            </View>
            <View style={styles.uploadContainer}>
                <TouchableOpacity style={styles.uploadBox} onPress={onClickUpload}>
                    <Text style={styles.edit}>수정하기</Text>
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
    editContainer: {
        alignItems: 'center'
    },
    uploadContainer: {
        flex: 1, 
        alignItems: 'center'
    },
    uploadBox: {
        width: 327 * tmpWidth,
        height: 48 * tmpWidth,
        borderRadius: 100 * tmpWidth,
        backgroundColor: 'rgb(168,193,255)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 22 * tmpWidth
    },
    edit: {
        fontSize: 18 * tmpWidth, 
        color: '#fff'
    }
});

export default ProfileEditPage;