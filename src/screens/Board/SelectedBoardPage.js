import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Context as BoardContext } from '../../context/BoardContext';
import ContentsForm from '../../components/Board/ContentsForm';
import BoardHeader from '../../components/Board/BoardHeader';
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../../components/FontNormalize';
import Modal from 'react-native-modal';

const SelectedBoard = ({ navigation }) => {
    const { state, initCurrentContent } = useContext(BoardContext);
    const [introductionModal, setIntroductionModal] = useState(false);
    const title = navigation.getParam('boardName');
    const introduction = navigation.getParam('introduction');
    const onClose = () => {
        setIntroductionModal(false)
    }
    
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
            
            { state.currentBoard == null ? <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}><ActivityIndicator /></View> :
            <View style={{height: '100%'}}>
                <TouchableOpacity style={styles.introductionBox} onPress={() => setIntroductionModal(true)}>
                    <SvgUri width='32' height='32' source={require('../../assets/icons/boardIntroduction.svg')}/>
                    <Text style={styles.introductionText} numberOfLines={1}>{introduction}</Text>
                </TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.searchBox} onPress={() => navigate('SearchContent')}>
                        <SvgUri width='40' height='40' source={require('../../assets/icons/boardSearch.svg')} style={{marginLeft: 8}}/>
                        <Text style={styles.searchText}>게시글을 검색해주세요.</Text>
                    </TouchableOpacity>
                </View>
                <ContentsForm navigation={navigation} Contents={state.currentBoard}/> 
            </View> }
            <Modal 
                animationIn="fadeIn"
                animationOut="fadeOut"
                isVisible={introductionModal}
                backdropOpacity={0.4}
                onBackdropPress={onClose}
                style={{margin: 0, alignItems: 'center'}}
            >
                <View style={styles.deleteContainer}>
                    <View style={{width: 240 * tmpWidth}}>
                        <Text style={{fontWeight: '300', textAlign: 'center'}}>{introduction}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

SelectedBoard.navigationOptions = ({ navigation }) => {
    return {
        headerShown: false
    }
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
        marginTop: 8 * tmpWidth
    },
    searchText: {
        marginLeft: 12 * tmpWidth, 
        fontSize: 14 * tmpWidth, 
        color: 'rgb(174,174,174)'
    },
    introductionBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginLeft: 24 * tmpWidth, 
        marginTop: 8 * tmpWidth, 
        marginRight: 24 * tmpWidth
    },
    introductionText: {
        fontSize: 13 * tmpWidth, 
        color: 'rgb(128,128,128)', 
        marginLeft: 4 * tmpWidth
    },
    deleteContainer: {
        paddingLeft: 12 * tmpWidth,
        paddingRight: 12 * tmpWidth,
        paddingTop: 8 * tmpWidth,
        paddingBottom: 8 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        borderRadius: 4 * tmpWidth, 
        alignItems: 'center',
    },
});

export default SelectedBoard;
