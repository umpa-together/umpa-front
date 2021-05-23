import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, FlatList, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SvgUri from 'react-native-svg-uri';
import { Context as BoardContext } from '../../context/BoardContext';
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../../components/FontNormalize';

const SearchBoardPage = ({ navigation }) => {
    const [text, setText] = useState('');
    const { state, getBoard, initBoard, initCurrentBoard, getCurrentBoard, getSelectedBoard, } = useContext(BoardContext);
    const [search, setSearch] = useState(false);

    useEffect(() => {
        initBoard();
        const listener =navigation.addListener('didFocus', ()=>{
            initCurrentBoard();
        });
        return () => {
            listener.remove();
        };
    }, []);

    useEffect(() => {
        setSearch(false);
    },[text]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchBox}>
                <SvgUri width='40' height='40' source={require('../../assets/icons/boardSearch.svg')} style={{marginLeft: 8}}/> 
                    <TextInput
                        placeholder="게시판을 검색해주세요."
                        value={text}
                        onChangeText={setText}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onSubmitEditing={()=>{
                            initBoard();
                            setSearch(true);
                            getBoard({ name: text })}}
                        style={styles.textInput}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelText}>취소</Text>
                </TouchableOpacity>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{height: '100%', backgroundColor: 'rgb(250,250,250)'}}>
                    {search && state.boards == null ? <View style={{flex: 1, justifyContent: 1}}><ActivityIndicator /></View> : 
                    <View>
                        {state.boards != null && state.boards.length == 0 ?
                        <View style={{height: '90%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'rgb(93,93,93)'}}>검색하신 게시판이 존재하지 않습니다.</Text>
                            <Text style={{color: 'rgb(93,93,93)', marginTop: 10 * tmpWidth}}>당신의 게시판을 만들어보세요!</Text>
                        </View> :
                        <View style={styles.boardBox}>
                            <FlatList 
                                data={state.boards}
                                key={board=>board._id}
                                renderItem={({item}) => {
                                    return (
                                        <TouchableOpacity style={{marginBottom: 24}}onPress={async () => {
                                            getCurrentBoard({boardId:item._id})
                                            await getSelectedBoard({id: item._id})
                                            navigate('SelectedBoard', { boardName: item.name, introduction: item.introduction, boardId: item.boardId })
                                        }}>
                                            <Text>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            /> 
                        </View> }
                    </View> }
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

SearchBoardPage.navigationOptions = ({navigation})=>{
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
    },
    boardBox: {
        marginTop: 16 * tmpWidth, 
        marginLeft: 44 * tmpWidth
    }
});

export default SearchBoardPage;