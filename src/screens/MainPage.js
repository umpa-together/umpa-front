import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import {Context as UserContext} from 'context/UserContext';
import Recommend from 'components/Feed/Recommend';
import Feed from 'components/Feed/Feed';

const MainPage = () => {
    const { state: userState } = useContext(UserContext);
    
    return (
        <View style={styles.safeArea}>
            { userState.myInfo != null && userState.myInfo.following.length == 0 ? <Recommend /> : <Feed /> }
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea : {
        flex : 1,
        backgroundColor:"#rgb(251,251,251)"
    }
});

export default MainPage;