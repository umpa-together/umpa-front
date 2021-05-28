import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Context as UserContext } from '../../context/UserContext';
import { Context as AuthContext } from '../../context/AuthContext';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../../components/FontNormalize';

const ProfileEditPage = ({navigation}) => {
    const { state: authState, checkName } = useContext(AuthContext);
    const { state, editProfileImage, editProfile } = useContext(UserContext);
    const [image, setImage] = useState(state.myInfo.profileImage);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [username, setUsername] = useState(state.myInfo.name);
    const [introduction, setIntroduction] = useState(state.myInfo.introduction);
    const [nameValidity, setNameValidity] = useState(true);
    const [doubleCheck, setDoubleCheck] = useState(false);
    const [currentName, setCurrentName] = useState(state.myInfo.name);
    
    const upload = async () => {
        if(username.length == 0){
            setNameValidity(false);
            return;
        }else{
            setNameValidity(true);
        }
        if(currentName != username){
            await checkName({name: username});
            setDoubleCheck(true);
            if(!authState.doubleCheck)  return;
        }
        const fd = new FormData();
        fd.append('img', {
            name: name,
            type: type,
            uri: 'file://' + image
        })
        await editProfile({name: username, introduction: introduction});
        if(name != '')  await editProfileImage({fd})
        navigation.goBack();
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
        setImage(state.myInfo.profileImage);
    }, []);

    return (
        <ScrollView style={{backgroundColor:'rgb(254,254,254)'}}>
        <View style={{backgroundColor: 'rgb(254,254,254)', flex: 1}}>
            <View style={styles.header}>
                <Text style={{fontSize: 16 * tmpWidth}}>프로필 사진</Text>
                <TouchableOpacity onPress={() => handleUpload()}>
                    <Text style={{fontSize: 14 * tmpWidth, color: 'rgb(137,148,242)'}}>사진 변경</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profileBox}>
                {image == undefined ? 
                <View style={styles.profileImage}>
                   <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                </View> : <Image source={{uri:image}} style={styles.profileImage}/> }
            </View>
            <View style={{alignItems: 'center'}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                <View style={styles.nameBox}>
                    <Text style={{fontSize: 16 * tmpWidth}}>이름</Text>
                    <View style={{flex: 1}}>
                        <View style={nameValidity ? styles.input : styles.validityInput}>
                            <TextInput
                                value={username}
                                onChangeText={(text) => {
                                    if(text.length <=15)   setUsername(text)}}
                                placeholder="사용자 이름을 적어주세요. (15자 이내)"
                                placeholderTextColor='rgb(196,196,196)'
                                autoCapitalize='none'
                                autoCorrect={false}
                                style={{fontSize: 14 * tmpWidth, paddingBottom: 9 * tmpWidth }}
                            />
                        </View>
                        {doubleCheck && !authState.doubleCheck ? 
                        <View style={{flexDirection: 'row', marginTop: 4 * tmpWidth, marginLeft: 14 * tmpWidth}}>
                            <SvgUri width='14' height='14' source={require('../../assets/icons/warning.svg')}/>
                            <Text style={{color:'rgb(238, 98, 92)', marginLeft: 4 * tmpWidth , fontSize: 12 * tmpWidth}}>현재 사용중인 아이디입니다.</Text>
                        </View> : null }
                        {nameValidity ? null :
                        <View style={{flexDirection: 'row', marginTop: 4 * tmpWidth, marginLeft: 14 * tmpWidth}}>
                            <SvgUri width='14' height='14' source={require('../../assets/icons/warning.svg')}/>
                            <Text style={{color:'rgb(238, 98, 92)', marginLeft: 4 * tmpWidth , fontSize: 12 * tmpWidth}}>사용자 이름을 입력해주세요.</Text>
                        </View>}
                    </View>
                </View>
                <View style={{marginTop: 20 * tmpWidth }}>
                    <Text style={{fontSize: 16 * tmpWidth}}>소개</Text>
                    <View style={styles.introduceBox}>
                        <TextInput
                            value={introduction}
                            onChangeText={(text) =>  setIntroduction(text)}
                            placeholder="소개글을 적어주세요."
                            placeholderTextColor='rgb(196,196,196)'
                            autoCapitalize='none'
                            autoCorrect={false}
                            multiline={true}
                            style={styles.introducetextinput}
                        />
                    </View>
                </View>
                </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity style={styles.uploadBox} onPress={async() => {await upload(); }}>
                    <Text style={{fontSize: 18 * tmpWidth, color: '#fff'}}>수정하기</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );
}

ProfileEditPage.navigationOptions = ({navigation})=>{
    return {
        title: '프로필 편집',
        headerTitleStyle: {
            fontSize: 18 * tmpWidth,
        }, 
        headerStyle: {
            backgroundColor: 'rgb(254,254,254)',
            height: 92  * tmpWidth,
            shadowColor: "rgb(0, 0, 0)",
            shadowOffset: {
                height: 0,
                width: 0,
            },
            shadowRadius: 0,
            shadowOpacity: 0,
        },
        headerLeft: () => {
            return (
                <TouchableOpacity style={{marginLeft: 5 * tmpWidth }} onPress={() => navigation.goBack()}>
                    <SvgUri width='40' height='40' source={require('../../assets/icons/back.svg')}/>
                </TouchableOpacity>
            )
        },
    };
};


const styles=StyleSheet.create({
    profileImage: {
        width: 114 * tmpWidth,
        height: 114  * tmpWidth,
        borderRadius: 114 * tmpWidth,
    },
    profileBox: {
        paddingTop: 36  * tmpWidth,
        alignItems: 'center', 
        height: 181.5 * tmpWidth,
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgba(196,196,196,0.3)'
    },
    nameBox: {
        width: 327  * tmpWidth,
        height: 44  * tmpWidth,
        marginTop: 27.5  * tmpWidth,
        flexDirection: 'row',
    },
    input: {
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(196,196,196)',
        marginLeft: 14  * tmpWidth,
        width: 283 * tmpWidth
    },
    introduceBox: {
        width: 327  * tmpWidth,
        height: 167.5  * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(196,196,196)',
        borderRadius: 8 * tmpWidth,
        marginTop: 10 * tmpWidth,
    },
    uploadBox: {
        width: 327  * tmpWidth,
        height: 48  * tmpWidth,
        borderRadius: 100 * tmpWidth,
        backgroundColor: 'rgb(168,193,255)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 113.5 * tmpWidth,
        marginBottom: 41.5 * tmpWidth
    },
    validityInput: {
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(238,98,92)',
        marginLeft: 14  * tmpWidth,
        width: 283 * tmpWidth
    },
    warningIcon: {
        width: 14  * tmpWidth,
        height: 14 * tmpWidth,
        backgroundColor: 'rgb(238,98,92)'
    },
    modeSelect: {
        width: 21  * tmpWidth,
        height: 21 * tmpWidth,
        borderRadius: 21 * tmpWidth,
        backgroundColor: 'rgba(169,193,255,0.5)'
    },
    modeNotSelect: {
        width: 21  * tmpWidth,
        height: 21  * tmpWidth,
        borderRadius: 21 * tmpWidth,
        borderWidth:1 * tmpWidth,
        borderColor: 'rgba(169,193,255,0.5)'
    },
    textSelect: {
        fontSize: 14 * tmpWidth,
    },
    textNotSelect: {
        fontSize: 14 * tmpWidth,
        color: 'rgb(153,153,153)'
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30 * tmpWidth,
        marginLeft: 24  * tmpWidth,
        marginRight: 24 * tmpWidth
    },
    introducetextinput:{
        fontSize: 14 * tmpWidth,
        marginLeft: 12  * tmpWidth,
        marginTop: 12  * tmpWidth,
        marginRight: 12  * tmpWidth,
    },
    backgroundopt:{
        marginTop: 19  * tmpWidth,
        marginBottom: 12  * tmpWidth,
        width: 141  * tmpWidth,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default ProfileEditPage;