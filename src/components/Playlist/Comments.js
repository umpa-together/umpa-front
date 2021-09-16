import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import CommentBox from './CommentBox';
import Modal from 'react-native-modal';
import Recomment from './ReComment'
import { usePlaylist } from 'providers/playlist';
export default Comments = ({ comments }) => {
    const { reCommentModal, onClose } = usePlaylist()

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.comments}>댓글  {comments.length}</Text>
                {comments.map((item) => {
                    return (
                        <CommentBox comment={item} key={item._id} />
                    )
                })}
            </View>
            <Modal
                isVisible={reCommentModal}
                onBackdropPress={onClose}
                backdropOpacity={0}
                style={{justifyContent:'flex-end', margin:0}}
            >
                <Recomment />
            </Modal>
        </>
    )
}

const styles=StyleSheet.create({
    container: {
        marginTop: 24 * tmpWidth,
        borderTopWidth: 1 * tmpWidth,
        borderTopColor: '#e9e9e9',
    },
    comments: {
        fontSize: 16 * tmpWidth,
        marginTop: 16 * tmpWidth,
        marginLeft: 18 * tmpWidth
    },
    
})