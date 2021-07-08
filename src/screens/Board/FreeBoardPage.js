import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Platform, StatusBar } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Context as UserContext } from '../../context/UserContext';
import { Context as BoardContext } from '../../context/BoardContext';
import { navigate } from '../../navigationRef';
import BoardForm from '../../components/Board/BoardForm';
import { tmpWidth } from '../../components/FontNormalize';

const FreeBoardPage = ({ navigation }) => {
    const { state:userState, getMyContent, getMyComment, getMyScrab, getMyBoardSongs, initUser } = useContext(UserContext);
    const { state, initCurrentBoard } = useContext(BoardContext);
    const [pinBoard, setPinBoard] = useState(false);
    const [genreBoard, setGenreBoard] = useState(true);
    const [genre, setGenre] = useState(['전체']);
    const [selectedBoard, setSelectedBoard] = useState(state.genreBoard);
    const genreList = ['전체', '일렉트로니카', '발라드', '댄스', '록/메탈', '클래식', '재즈', '랩/힙합', '인디', '포크/블루스'];
    useEffect(() =>{
        const listener =navigation.addListener('didFocus', ()=>{
            initUser();
            initCurrentBoard();
        });
        return () => {
            listener.remove();
        };
    }, []);

    const genreClick = (genreNum) => {
        if(genreNum == '전체'){
            setSelectedBoard(state.genreBoard);
        }else{
            setSelectedBoard(state.genreBoard.filter(board=>board.genre.includes(genreNum)))
        }
        if(genre.length == 0 && !genre.includes(genreNum))  setGenre([genreNum]);
        if(genre.length == 1 && !genre.includes(genreNum))  setGenre([genreNum]);
    }

    useEffect(() => {
        if(genre[0] == '전체') {
            setSelectedBoard(state.genreBoard);
        }else{
            setSelectedBoard(state.genreBoard.filter(board=>board.genre.includes(genre[0])))
        }
    },[state.genreBoard]);

    return (
        <ScrollView style={styles.container}>
            <View style={{marginTop: 20 * tmpWidth}}>
                <TouchableOpacity style={styles.myBox} onPress={() => {
                    getMyContent()
                    navigate('MyContents', {'title': '내가 쓴 글'})}}
                >
                    <SvgUri width='40' height='40' source={require('../../assets/icons/myContents.svg')}/>
                    <Text style={styles.menuText}>내가 쓴 글</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.myBox} onPress={() => {
                    getMyComment()
                    navigate('MyContents', {'title': '댓글 단 글'})}}
                >
                    <SvgUri width='40' height='40' source={require('../../assets/icons/myComments.svg')}/>
                    <Text style={styles.menuText}>댓글 단 글</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.myBox} onPress={() => {
                    getMyScrab()
                    navigate('MyContents', {'title': '스크랩'})}}
                >
                    <SvgUri width='40' height='40' source={require('../../assets/icons/scrab.svg')}/>
                    <Text style={styles.menuText}>스크랩</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.myBox} onPress={() => {
                    getMyBoardSongs()
                    navigate('MySharedSongs')}}
                >
                    <SvgUri width='40' height='40' source={require('../../assets/icons/shareSong.svg')}/>
                    <Text style={styles.menuText}>공유한 음악</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <TouchableOpacity style={styles.searchBox} onPress={() => navigate('SearchBoard')}>
                    <SvgUri width='40' height='40' source={require('../../assets/icons/boardSearch.svg')} style={{marginLeft: 4 * tmpWidth}}/>
                    <Text style={{fontSize: 14 * tmpWidth, color:'rgb(164,164,164)', marginLeft: 8 * tmpWidth}}>게시판을 검색해주세요.</Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={() => navigate('CreateBoard')}>
                    <SvgUri width='40' height='40' source={require('../../assets/icons/boardCreate.svg')} style={{marginLeft: 3 * tmpWidth}}/>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 15 * tmpWidth}}>
                <View style={styles.boardBox}>
                    <TouchableOpacity onPress={() => setPinBoard(!pinBoard)} style={{marginLeft: 4 * tmpWidth}}>
                        {!pinBoard ? 
                        <SvgUri width='32' height='32' source={require('../../assets/icons/right.svg')}/> :
                        <SvgUri width='32' height='32' source={require('../../assets/icons/down.svg')}/> }
                    </TouchableOpacity>
                    <Text style={styles.boardText}>즐겨찾는 게시판</Text>
                </View>
                {pinBoard && userState.boardBookmark != null ?
                <BoardForm boards={userState.boardBookmark}/> : pinBoard && userState.boardBookmark == null ? <ActivityIndicator /> : null }
                <View style={styles.boardBox}>
                    <TouchableOpacity onPress={() => setGenreBoard(!genreBoard)} style={{marginLeft: 4 * tmpWidth}}>
                        {!genreBoard ?
                        <SvgUri width='32' height='32' source={require('../../assets/icons/right.svg')}/> :
                        <SvgUri width='32' height='32' source={require('../../assets/icons/down.svg')}/> }
                    </TouchableOpacity>
                    <Text style={styles.boardText}>장르별 게시판</Text>
                </View>
                {genreBoard ?
                <View style={{ paddingLeft: 30 * tmpWidth, marginBottom: 8 * tmpWidth}}>
                    <View style={styles.genreBoardContainer}>
                        {genreList.map((item) => {
                            return (
                                <TouchableOpacity style={genre.includes(item) ? styles.selectedGenreView : styles.genreView} key={item} onPress={() => genreClick(item)}>
                                    <Text style={genre.includes(item) ? styles.selectedGenreBox : styles.genreBox}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View> : null}
                {genreBoard ? <BoardForm boards={selectedBoard}/> : null}
            </View>
        </ScrollView>
    );
};

FreeBoardPage.navigationOptions = ()=>{
    return {
        title: '게시판',
        headerTitleStyle: {
            fontSize: 18 * tmpWidth,
            fontWeight: "400",
            alignSelf: 'center',
            paddingTop: Platform.OS === 'ios' ? 0 : (StatusBar.currentHeight + 6) * tmpWidth
        }, 
        headerStyle: {
            backgroundColor: 'rgb(255,255,255)',
            height: Platform.OS === 'ios' ? 92 * tmpWidth : (48 + StatusBar.currentHeight) * tmpWidth,
            shadowColor: "rgb(0, 0, 0)",
            shadowOffset: {
                height: 3 * tmpWidth,
                width: 0,
            },
            shadowRadius: 8 * tmpWidth,
            shadowOpacity: 0.07,
        },
    };
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(254,254,254)', 
    },
    myBox: {
        height: 42 * tmpWidth,
        marginLeft: 20 * tmpWidth,
        marginRight: 20 * tmpWidth,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'rgb(229,231,239)', 
        borderBottomWidth: 0.7 * tmpWidth, 
    },
    menuText: {
        fontSize: 14 * tmpWidth, 
        marginLeft: 4 * tmpWidth
    },
    searchContainer: {
        marginTop: 16 * tmpWidth, 
        marginLeft: 24 * tmpWidth, 
        flexDirection: 'row'
    },
    searchBox: {
        width : '85%', 
        height: 40 * tmpWidth, 
        backgroundColor: 'rgb(250,250,250)', 
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 100 * tmpWidth,
    },
    boardBox: {
        height: 40 * tmpWidth, 
        borderBottomWidth: 0.7 * tmpWidth,
        borderBottomColor: 'rgb(229,231,239)',
        marginLeft: 20 * tmpWidth, 
        marginRight: 20 * tmpWidth, 
        flexDirection: 'row',
        alignItems: 'center'
    },
    boardText: {
        marginLeft: 8 * tmpWidth, 
        fontSize: 14 * tmpWidth
    },
    genreView: {
        borderRadius: 100 * tmpWidth, 
        marginRight: 8 * tmpWidth,  
        paddingLeft: 17 * tmpWidth,
        paddingRight: 17 * tmpWidth,
        paddingTop: 7 * tmpWidth,
        paddingBottom: 7 * tmpWidth,
        backgroundColor: 'rgb(238,244,255)',
        marginTop: 8 * tmpWidth
    },
    genreBox: {
        fontSize: 12 * tmpWidth,
        color: 'rgb(79,79,79)',
    },
    selectedGenreView: {
        borderRadius: 100 * tmpWidth, 
        marginRight: 8 * tmpWidth,  
        paddingLeft: 17 * tmpWidth,
        paddingRight: 17 * tmpWidth,
        paddingTop: 7 * tmpWidth,
        paddingBottom: 7 * tmpWidth,
        backgroundColor: 'rgb(169,193,255)',
        marginTop: 8 * tmpWidth
    },
    selectedGenreBox: {
        fontSize: 12 * tmpWidth,
        color: 'rgb(255,255,255)',
    },
    genreBoardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        width: 300 * tmpWidth,
    }
});

export default FreeBoardPage;