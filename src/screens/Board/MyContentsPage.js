import React, { useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Platform, StatusBar } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Context as UserContext } from '../../context/UserContext';
import MyContentForm from '../../components/Board/MyContentForm'
import { tmpWidth } from '../../components/FontNormalize';

const MyContentsPage = ({ navigation }) => {
    const { state } = useContext(UserContext);

    return (
        <View style={styles.container}>
            {state.myContents != null ? <MyContentForm navigation={navigation} Contents={state.myContents} /> : <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator/></View>}
        </View>
    );
};

MyContentsPage.navigationOptions = ({navigation})=>{
    const title = navigation.getParam('title');
    return {
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
            backgroundColor: 'rgb(255,255,255)',
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
    };
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(254,254,254)', 
        flex: 1,
    },
});

export default MyContentsPage;