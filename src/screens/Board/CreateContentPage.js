import React, { useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, Keyboard, ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import SvgUri from 'react-native-svg-uri';
import {Context as BoardContext} from '../../context/BoardContext';
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../../components/FontNormalize';

const CreateContent = () => {
    const { state, createContent } = useContext(BoardContext);
    const [img, setImage] = useState([]);
    const [contentValidity, setContentValidity] = useState(true);
    const [titleValidity, setTitleValidity] = useState(true);
    const titleRef = useRef();
    const contentRef = useRef();
    const fd = new FormData();

    const create = async () => {
        if (titleRef.current.value == undefined || titleRef.current.value.length == 0){
            setTitleValidity(false);
            return;
        }else{
            setTitleValidity(true);
        }
        if (contentRef.current.value == undefined || contentRef.current.value.length == 0){
            setContentValidity(false);
            return;
        }else{
            setContentValidity(true);
        }
        img.forEach((item) => {
            fd.append('img', {
                name: item.filename,
                type: item.mime,
                uri: 'file://' + item.path
            });
        });
        navigate('SelectedBoard');
        createContent({ title: titleRef.current.value, content: contentRef.current.value, boardId: state.boards._id, fd });
    };

    const handleUpload = async () => {
        const images = await ImagePicker.openPicker({
            width: 300,
            height: 400,
            multiple: true
        });
        setImage(images);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Text style={styles.boardText}>{state.boards.name}</Text>
                    <View style={styles.title}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.menuText}>제목</Text>
                            <View style={{flex: 1}}>
                                <View style={titleValidity ? styles.input : styles.validityInput}>
                                    <TextInput
                                        ref={titleRef}
                                        placeholder="글의 제목을 적어주세요."
                                        onChangeText={text=>titleRef.current.value = text}
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
                        <Text style={styles.menuText}>내용</Text>
                        <View style={contentValidity ? styles.commentBox : styles.validityCommentBox}>
                            <TextInput
                                ref={contentRef}
                                onChangeText={text => contentRef.current.value = text}
                                placeholder="내용을 적어주세요"
                                autoCapitalize='none'
                                autoCorrect={false}
                                multiline={true}
                                style={styles.textInput}
                            />
                        </View>
                        {contentValidity ? null :
                        <View style={styles.warningContainer}>
                            <SvgUri width='14' height='14' source={require('../../assets/icons/warning.svg')}/>
                            <Text style={styles.warningText}>내용을 입력해주세요.</Text>
                        </View>}
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.photoContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.menuText}>사진 업로드하기</Text>
                        <TouchableOpacity onPress={() => handleUpload()}>
                            <SvgUri width='28' height='28' source={require('../../assets/icons/songPlus.svg')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 100 * tmpWidth}}>
                        <FlatList 
                            style={{marginTop: 12 * tmpWidth}}
                            data={img}
                            keyExtractor={image => image.path}
                            horizontal={true}
                            renderItem ={({item})=>{
                                return (
                                    <View style={{alignItems: 'center', marginRight: 12 * tmpWidth}}>
                                        <View style={styles.image}>
                                            <Image style={{height: '100%', width: '100%', borderRadius: 8 * tmpWidth}} source={{uri: item.path}} />
                                        </View>
                                        <View style={{marginTop: 6 * tmpWidth}}>
                                            <TouchableOpacity style={styles.plus} onPress={() => setImage(img.filter(img => img != item))}>
                                                <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(182,201,250)'}}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.uploadBox} onPress={() => create()}>
                    <Text style={{fontSize: 18 * tmpWidth, color: '#fff'}}>업로드하기</Text>
                </TouchableOpacity> 
            </ScrollView>
        </View>
        
    );
};
CreateContent.navigationOptions = ({navigation})=>{
    return {
        title: '글쓰기',
        headerTitleStyle: {
            fontSize: 18 * tmpWidth,
            fontWeight: "400"
        }, 
        headerStyle: {
            backgroundColor: 'rgb(255,255,255)',
            height: 92 * tmpWidth,
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
                <TouchableOpacity style={{marginLeft: 5 * tmpWidth}} onPress={() => navigation.goBack()}>
                    <SvgUri width='40' height='40' source={require('../../assets/icons/back.svg')}/>
                </TouchableOpacity>
            )
        }
    };
};
const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)', 
        flex: 1,
        alignItems: 'center'
    },
    boardText: {
        fontSize: 14 * tmpWidth,
        marginTop: 24 * tmpWidth
    },
    title: {
        width: 327 * tmpWidth,
        height: 44 * tmpWidth,
        marginTop: 24 * tmpWidth,
    },
    input: {
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(196,196,196)',
        marginLeft: 14 * tmpWidth,
        paddingBottom: 7 * tmpWidth
    },
    textInput: {
        fontSize: 14 * tmpWidth, 
        marginTop: 12 * tmpWidth, 
        marginLeft: 12 * tmpWidth, 
        flex: 1, 
        marginRight: 12 * tmpWidth
    },
    menuText: {
        fontSize: 16 * tmpWidth
    },
    comment: {
        width: 327 * tmpWidth,
        height: 316 * tmpWidth,
        marginTop: 14 * tmpWidth
    },
    commentBox: {
        width: 327 * tmpWidth,
        height: 267 * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(196,196,196)',
        borderRadius: 8 * tmpWidth,
        marginTop: 12 * tmpWidth
    },
    plus: {
        width: 18 * tmpWidth,
        height: 18 * tmpWidth,
        backgroundColor: 'rgb(239,244,255)',
        borderRadius: 18 * tmpWidth,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    image: {
        width: 64 * tmpWidth,
        height: 64 * tmpWidth,
    },
    photoContainer: {
        marginTop: 14 * tmpWidth,   
        width: 327 * tmpWidth
    },
    uploadBox: {
        width: 327 * tmpWidth,
        height: 52 * tmpWidth,
        borderRadius: 100 * tmpWidth,
        backgroundColor: 'rgb(169,193,255)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12 * tmpWidth,
        marginBottom: 12 * tmpWidth
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
        paddingBottom: 7 * tmpWidth
    },
    validityCommentBox: {
        width: 327 * tmpWidth,
        height: 267 * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(238,98,92)',
        borderRadius: 8 * tmpWidth,
        marginTop: 12 * tmpWidth
    },
    warningTitleContainer: {
        flexDirection: 'row', 
        marginTop: 4 * tmpWidth, 
        marginLeft: 14 * tmpWidth
    },
    warningContainer: {
        flexDirection: 'row', 
        marginTop: 4 * tmpWidth
    },
    warningText: {
        color:'rgb(238, 98, 92)', 
        marginLeft: 4 * tmpWidth, 
        fontSize: 12 * tmpWidth
    }
});

export default CreateContent;