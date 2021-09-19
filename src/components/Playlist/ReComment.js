import React, { useContext } from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator ,TextInput, TouchableOpacity, FlatList, ScrollView, Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { tmpWidth } from 'components/FontNormalize';
import { usePlaylist } from 'providers/playlist';
import ReCommentTarget from './ReCommentTarget';
import RecommentInput from './RecommentInput';
import LoadingIndicator from 'components/LoadingIndicator'
import RecommentBox from './RecommentBox';

export default ReComment = () => {
    const { state } = useContext(PlaylistContext);

    return (
        <View style={styles.recommentBox}>
            <ReCommentTarget />
            <RecommentInput />
            {state.current_recomments === null ? <LoadingIndicator /> :
            <FlatList
                data={state.current_recomments}
                keyExtractor={comment => comment._id}
                renderItem={({item}) => {
                    return (
                        <RecommentBox recomments={item} />
                    )
                }}
            >
                
            </FlatList>}
        </View>
    )
}

const styles=StyleSheet.create({
    recommentBox: {
        width: '100%',
        height: 509 * tmpWidth,
        backgroundColor: 'rgb(255,255,255)',
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            height: -1 * tmpWidth,
            width: 0,
        },
        shadowRadius: 8 * tmpWidth,
        shadowOpacity: 0.1,
    }, 
})