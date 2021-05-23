import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SvgUri from 'react-native-svg-uri';
import { Context as BoardContext } from '../../context/BoardContext';
import ContentsForm from '../../components/Board/ContentsForm';
import { tmpWidth } from '../../components/FontNormalize';

const SearchContentPage = ({ navigation }) => {
    const { state, getSearchContent, initSearchContent } = useContext(BoardContext);
    const [text, setText] = useState('');
    const [search, setSearch] = useState(false);

    useEffect(() => {
        initSearchContent();
    }, []);

    useEffect(() => {
        setSearch(false);
    }, [text]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchBox}>
                    <SvgUri width='40' height='40' source={require('../../assets/icons/boardSearch.svg')} style={{marginLeft: 8 * tmpWidth}}/>    
                    <TextInput
                        placeholder="게시글을 검색해주세요."
                        value={text}
                        onChangeText={setText}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onSubmitEditing={()=>{
                            initSearchContent();
                            getSearchContent({id: state.boards._id, text})
                            setSearch(true)}}
                        style={styles.textInput}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelText}>취소</Text>
                </TouchableOpacity>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{height: '100%', backgroundColor: 'rgb(250,250,250)'}}>
                    {search && state.searchContent == null ? <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator /></View> : 
                    <ContentsForm navigation={navigation} Contents={state.searchContent} />}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

SearchContentPage.navigationOptions = ()=>{
    return {
        headerShown: false,
    };
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)', 
        flex: 1,
    },
    header: {
        height: 98 * tmpWidth,
        paddingTop: 34 * tmpWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(255,255,255)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBox: {
        width: 285 * tmpWidth,
        height: 40 * tmpWidth,
        borderRadius: 100 * tmpWidth,
        backgroundColor: 'rgb(245,245,245)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        fontSize: 14 * tmpWidth, 
        marginLeft: 12 * tmpWidth
    },
    cancelText: {
        marginLeft: 16 * tmpWidth, 
        fontSize: 16 * tmpWidth
    }
});

export default SearchContentPage;