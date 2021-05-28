import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Context as BoardContext } from '../../context/BoardContext';
import ContentsForm from '../../components/Board/ContentsForm';
import BoardHeader from '../../components/Board/BoardHeader';
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../../components/FontNormalize';

const SelectedBoard = ({ navigation }) => {
    const { state, initCurrentContent } = useContext(BoardContext);
    const title = navigation.getParam('boardName');
    const introduction = navigation.getParam('introduction');

    useEffect(() => {
        const listener =navigation.addListener('didFocus', ()=>{
            initCurrentContent();
        });
        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View style={styles.container}> 
        <View style={styles.headerContainer}>
            <TouchableOpacity style={{marginLeft: 5 * tmpWidth}} onPress={() => navigation.goBack()}>
                <SvgUri width='40' height='40' source={require('../../assets/icons/back.svg')}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', flex: 1, paddingTop: 10 * tmpWidth}}>
                <Text style={{fontSize: 16 * tmpWidth, fontWeight: '400'}} numberOfLines={1}>{title}</Text>
            </View>
            <BoardHeader name={title} introduction={introduction}/>
        </View>
        {state.currentBoard == null ? <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}><ActivityIndicator /></View> :
            <View style={{height: '100%'}}>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.searchBox} onPress={() => navigate('SearchContent')}>
                        <SvgUri width='40' height='40' source={require('../../assets/icons/boardSearch.svg')} style={{marginLeft: 8}}/>
                        <Text style={styles.searchText}>게시글을 검색해주세요.</Text>
                    </TouchableOpacity>
                </View>
                <ContentsForm navigation={navigation} Contents={state.currentBoard}/> 
            </View>}
        </View>
    );
};

SelectedBoard.navigationOptions = ({ navigation }) => {
    return {
        headerShown: false
    }
    /*
    return ({
        title: title,
        headerTitleStyle: {
            fontSize: 16 * tmpWidth,
            fontWeight: "400",
        }, 
        headerStyle: {
            backgroundColor: 'rgb(255,255,255)',
            height: 92 * tmpWidth,
            shadowColor: "rgb(0, 0, 0)",
            shadowOffset: {
                height: 3 * tmpWidth,
                width: 0,
            },
            shadowRadius: 8 * tmpWidth,
            shadowOpacity: 0.07,
        },
        headerLeft: () => {
            return (
                <TouchableOpacity style={{marginLeft: 5 * tmpWidth}} onPress={() => navigation.goBack()}>
                    <SvgUri width='40' height='40' source={require('../../assets/icons/back.svg')}/>
                </TouchableOpacity>
            )
        },
        headerRight: () => {
            return (
                <BoardHeader name={title} introduction={introduction}/>
            )
        }
    });
    */
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(255,255,255)', 
    },
    headerContainer: {
        backgroundColor: 'rgb(255,255,255)',
        height: 92 * tmpWidth,
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            height: 3 * tmpWidth,
            width: 0,
        },
        shadowRadius: 8 * tmpWidth,
        shadowOpacity: 0.07,
        flexDirection: 'row',
        paddingTop: 44 * tmpWidth,
        justifyContent: 'space-between'
    },
    searchBox: {
        width: 327 * tmpWidth,
        height: 40 * tmpWidth,
        borderRadius: 100 * tmpWidth,
        backgroundColor: 'rgb(245,245,245)',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20 * tmpWidth
    },
    searchText: {
        marginLeft: 12 * tmpWidth, 
        fontSize: 14 * tmpWidth, 
        color: 'rgb(174,174,174)'
    }
});

export default SelectedBoard;