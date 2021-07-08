import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import ContentDetail from '../../components/Board/ContentDetail';
import { tmpWidth } from '../../components/FontNormalize';

const SelectedContentPage = ({ navigation }) => {
    return (
        <View style={{flex:1}}>
            <ContentDetail navigation={navigation}/>
        </View>
    );
};

SelectedContentPage.navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('boardName');
    return ({
        title: title,
        headerTitleStyle: {
            fontSize: 16 * tmpWidth,
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
        headerLeft: () => {
            return (
                <TouchableOpacity style={{marginLeft: 5 * tmpWidth, marginTop: (StatusBar.currentHeight + 6) * tmpWidth}} onPress={() => navigation.goBack()}>
                    <SvgUri width='40' height='40' source={require('../../assets/icons/back.svg')}/>
                </TouchableOpacity>
            )
        },
        headerRight: () => {
            return (
                <View />
            )
        }
    });
};

const styles=StyleSheet.create({});

export default SelectedContentPage;