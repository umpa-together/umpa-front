import React, { useContext } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Context as UserContext } from '../../context/UserContext';
import MyContentForm from '../../components/Board/MyContentForm'
import { NavHeader } from '../../components/Header';

const MyContentsPage = ({ route }) => {
    const { state } = useContext(UserContext);
    const { title } = route.params
    return (
        <View style={styles.container}>
            <NavHeader title={title} isBack={true} />
            {state.myContents != null ? <MyContentForm Contents={state.myContents} /> : <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator/></View>}
        </View>
    );
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(254,254,254)', 
        flex: 1,
    },
});

export default MyContentsPage;