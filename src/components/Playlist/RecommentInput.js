import React, { useContext, useRef } from 'react'
import { View, StyleSheet, TextInput, Keyboard } from 'react-native';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import ProfileImage from 'components/ProfileImage'
import { usePlaylist } from 'providers/playlist';

export default RecommentInput = () => {
    const { addreComment } = useContext(PlaylistContext);
    const { state: userState } = useContext(UserContext);
    const { currentComment } = usePlaylist()
    const { _id: id, playlistId } = currentComment
    const recommentRef = useRef();

    const onClickAdd = () => {
        Keyboard.dismiss()
        addreComment({ id:playlistId, commentid: id, text:recommentRef.current.value });
        recommentRef.current.value ='';
        recommentRef.current.clear();
    }

    return (
        <View style={styles.container}>
            <ProfileImage img={userState.myInfo.profileImage} imgStyle={styles.profileImg} />
            <TextInput
                style={styles.textInput}
                onChangeText={text=> recommentRef.current.value = text}
                placeholder="추가할 답글을 적어주세요."
                placeholderTextColor="rgb(164,164,164)"
                autoCapitalize='none'
                autoCorrect={false}
                ref={recommentRef}
                onSubmitEditing={onClickAdd}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        marginTop: 20 * tmpWidth,
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(207,207,207)',
        marginLeft: 20 * tmpWidth,
        marginRight: 20 * tmpWidth,
        paddingBottom: 6 * tmpWidth,
        flexDirection: 'row',
        marginBottom: 12 * tmpWidth
    },
    profileImg:{
        height: 32 * tmpWidth,
        width: 32 * tmpWidth,
        borderRadius: 32 * tmpWidth,
        marginRight: 14 * tmpWidth,
    },
    textInput: {
        width: '80%',
        marginTop: 4 * tmpWidth
    },
})