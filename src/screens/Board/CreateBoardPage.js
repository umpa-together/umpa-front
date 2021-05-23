import React, { useState, useContext, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SvgUri from 'react-native-svg-uri';
import { navigate } from '../../navigationRef';
import {Context as BoardContext} from '../../context/BoardContext'
import { tmpWidth } from '../../components/FontNormalize';

const CreateBoardPage = () => {
    const { createBoard, getGenreBoard } = useContext(BoardContext);
    const [genre, setGenre] = useState([]);
    const [titleValidity, setTitleValidity] = useState(true);
    const [contentValidity, setContentValidity] = useState(true);
    const titleRef = useRef();
    const introductionRef = useRef();
    const genreList = ['발라드', '댄스', '인디', '록/메탈', '클래식', '랩/힙합', '일렉트로니카', '포크/블루스', '재즈'];

    const create = async () => {
        if (titleRef.current.value == undefined || titleRef.current.value.length == 0){
            setTitleValidity(false);
            return;
        }else{
            setTitleValidity(true);
        }
        if (introductionRef.current.value == undefined || introductionRef.current.value.length == 0){
            setContentValidity(false);
            return;
        }else{
            setContentValidity(true);
        }
        await createBoard({ name: titleRef.current.value, introduction: introductionRef.current.value, genre });
        getGenreBoard();
        navigate('FreeBoard');
    };

    const genreClick = (genreNum) => {
        if(genre.length < 3 && !genre.includes(genreNum))    setGenre([...genre, genreNum]);
        if(genre.includes(genreNum))    setGenre(genre.filter(item=>item!=genreNum));
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.title}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.titleText}>제목</Text>
                            <View style={{flex: 1}}>
                                <View style={titleValidity ? styles.titleInput : styles.validityInput}>
                                    <TextInput
                                        ref={titleRef}
                                        placeholder="게시판 제목을 적어주세요."
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
                        <Text style={styles.titleText}>소개</Text>
                        <View style={contentValidity ? styles.commentBox : styles.validityComment}>
                            <TextInput
                                ref={introductionRef}
                                onChangeText={(text) => introductionRef.current.value = text}
                                placeholder="게시판 소개글을 적어주세요."
                                autoCapitalize='none'
                                autoCorrect={false}
                                multiline={true}
                                style={styles.textInput}
                            />
                        </View>
                        {contentValidity ? null :
                        <View style={styles.warningContainer}>
                            <SvgUri width='14' height='14' source={require('../../assets/icons/warning.svg')}/>
                            <Text style={styles.warningText}>코멘트를 작성해주세요.</Text>
                        </View>}
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.genre}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.titleText}>게시판 장르</Text>
                        <Text style={{fontSize: 14 * tmpWidth, color: 'rgb(79,79,79)', marginLeft: 12 * tmpWidth}}>(최대 3개)</Text>
                    </View>
                    <View style={styles.genreContainer}>
                        {genreList.map((item) => {
                            return (
                                <TouchableOpacity style={genre.includes(item) ? styles.selectedGenreView : styles.genreView} key={item} onPress={() => genreClick(item)}>
                                    <Text style={genre.includes(item) ? styles.selectedGenreBox : styles.genreBox}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
                <TouchableOpacity style={styles.uploadBox} onPress={() => create()}>
                    <Text style={{fontSize: 18 * tmpWidth, color: '#fff'}}>만들기</Text>
                </TouchableOpacity> 
            </ScrollView>
        </View>
    )
};

CreateBoardPage.navigationOptions = ({navigation})=>{
    return {
        title: '게시판 만들기',
        headerTitleStyle: {
            fontSize: 18 * tmpWidth,
            fontWeight: "400"
        }, 
        headerStyle: {
            backgroundColor: 'rgb(255,255,255)',
            height: 92 * tmpWidth,
            shadowColor: "rgb(0, 0, 0)",
            shadowOffset: {
                height: 0 ,
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
        }
    };
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)', 
        flex: 1,
        alignItems: 'center'
    },
    title: {
        width: 327 * tmpWidth,
        height: 44 * tmpWidth,
        marginTop: 32 * tmpWidth,
    },
    titleInput: {
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(196,196,196)',
        marginLeft: 14 * tmpWidth,
        paddingBottom: 7 * tmpWidth
    },
    comment: {
        marginTop: 10 * tmpWidth,
        width: 327 * tmpWidth,
        height: 200 * tmpWidth,
    },
    commentBox: {
        width: 327 * tmpWidth,
        height: 151 * tmpWidth,
        marginTop: 12 * tmpWidth,
        borderColor: 'rgb(196,196,196)',
        borderRadius: 8,
        borderWidth: 1 * tmpWidth
    },
    genre: {
        marginTop: 10 * tmpWidth,
        width: 327 * tmpWidth,
        height: 297 * tmpWidth,
    },
    genreView: {
        borderRadius: 100, 
        marginRight: 12 * tmpWidth,  
        paddingLeft: 20 * tmpWidth,
        paddingRight: 20 * tmpWidth,
        paddingTop: 8 * tmpWidth,
        paddingBottom: 8 * tmpWidth,
        backgroundColor: 'rgb(238,244,255)',
        marginTop: 12 * tmpWidth
    },
    genreBox: {
        fontSize: 14 * tmpWidth,
        color: 'rgb(79,79,79)',
    },
    selectedGenreView: {
        borderRadius: 100, 
        marginRight: 12 * tmpWidth,  
        paddingLeft: 20 * tmpWidth,
        paddingRight: 20 * tmpWidth,
        paddingTop: 8 * tmpWidth,
        paddingBottom: 8 * tmpWidth,
        backgroundColor: 'rgb(169,193,255)',
        marginTop: 12 * tmpWidth
    },
    selectedGenreBox: {
        fontSize: 14 * tmpWidth,
        color: 'rgb(255,255,255)',
    },
    uploadBox: {
        marginTop: 43*tmpWidth,
        width: 327 * tmpWidth,
        height: 52 * tmpWidth,
        borderRadius: 100, 
        backgroundColor: 'rgb(169,193,255)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12 * tmpWidth
    },
    validityInput: {
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(238,98,92)',
        marginLeft: 14 * tmpWidth,
        paddingBottom: 7 * tmpWidth
    },
    validityComment: {
        width: 327 * tmpWidth,
        height: 151 * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(238,98,92)',
        borderRadius: 8,
        marginTop: 12 * tmpWidth
    },
    titleText: {
        fontSize: 16 * tmpWidth
    },
    warningTitleContainer: {
        flexDirection: 'row', 
        marginTop: 4 * tmpWidth, 
        marginLeft: 14 * tmpWidth
    },
    warningContainer: {
        flexDirection: 'row', 
        marginTop: 4 * tmpWidth,  
    },
    warningText: {
        color:'rgb(238, 98, 92)', 
        marginLeft: 4 * tmpWidth, 
        fontSize: 12 * tmpWidth
    },
    textInput: {
        fontSize: 14 * tmpWidth, 
        marginLeft: 12 * tmpWidth, 
        marginRight: 12 * tmpWidth, 
        marginTop: 12 * tmpWidth, 
        flex: 1
    },
    genreContainer: {
        flexDirection: 'row', 
        flexWrap:'wrap'
    }
});

export default CreateBoardPage;