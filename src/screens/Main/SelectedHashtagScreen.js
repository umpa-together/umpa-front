import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from 'components/Header'
import HashtagResult from 'components/Main/HashtagResult';

const SelectedHashtagScreen = ({ route }) => {
    const { data } = route.params
    const { daily, playlist, hashtag } = data

    return (
        <View style={styles.container}>
            <Header title={'#'+hashtag}/>
            <HashtagResult playlist={playlist} daily={daily} />
        </View>
    )
};

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});

export default SelectedHashtagScreen;