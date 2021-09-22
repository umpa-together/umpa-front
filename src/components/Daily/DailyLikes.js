import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as DailyContext } from 'context/DailyContext';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import ProfileImage from 'components/ProfileImage'
import SvgUri from 'react-native-svg-uri';
import { useDaily } from 'providers/daily';
import DeleteModal from 'components/DeleteModal';
import Modal from 'react-native-modal';
import ReportModal from 'components/ReportModal';
import { navigate } from 'navigationRef';

export default DailysLikes = ({ daily }) => {
    const { likesDaily, unlikesDaily } = useContext(DailyContext);
    const { state: userState } = useContext(UserContext);
    const { postUserId: postUser, likes, song } = daily
    const { onClickProfile } = useDaily()
    const [deleteModal, setDeleteModal] = useState(false);
    const [weeklyModal, setWeeklyModal] = useState(false);
    const [reportModal, setReportModal] = useState(false);

    const onClickLikes = () => {
        if(likes.includes(userState.myInfo._id)) {
            unlikesDaily({ id: daily._id })
        } else {
            likesDaily({ id: daily._id })
        }
    }

    const onClickEdit = () => {
        navigate('CreateDaily', {'data': song, 'isEdit': true})
    }
    const onClickDelete = () => {
        if(!daily.isWeekly){
            setDeleteModal(true)
        }else {
            setWeeklyModal(true)
            setTimeout(() => setWeeklyModal(false), 1200);
        }
    }

    const onClickReport = () => {
        setReportModal(true)
    }

    return (
        <View style={styles.container}>
            <View style={styles.flexRow}>
                <TouchableOpacity 
                    onPress={() => onClickProfile(postUser._id)}
                >
                    <ProfileImage img={postUser.profileImage} imgStyle={styles.img} />
                </TouchableOpacity>
                <Text style={styles.name}>{postUser.name}</Text>
            </View>
            <View style={styles.flexRow}>
                { userState.myInfo._id === postUser._id ?
                <View style={styles.flexRow}>
                    <TouchableOpacity
                        onPress={onClickEdit}
                    >
                        <Text style={styles.text}>수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onClickDelete}
                    >
                        <Text style={styles.text}>삭제</Text>
                    </TouchableOpacity>
                </View> : 
                <TouchableOpacity
                    onPress={onClickReport}
                >
                    <Text style={styles.text}>신고</Text>
                </TouchableOpacity> }
                <TouchableOpacity onPress={onClickLikes}>
                    <SvgUri 
                        width={40} height={40} 
                        source={likes.includes(userState.myInfo._id) ? require('assets/icons/playlisthearto.svg') : require('assets/icons/playlistheart.svg')}
                    /> 
                </TouchableOpacity>
            </View>
            { deleteModal && <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} type={'daily'} /> }
            { reportModal && <ReportModal reportModal={reportModal} setReportModal={setReportModal} type={'daily'} subjectId={daily._id} /> }
            <Modal
                animationIn="fadeIn"
                animationOut="fadeOut"
                isVisible={weeklyModal}
                backdropOpacity={0.5}
                style={{alignItems: 'center'}}
            >
                <View style={styles.modalBox}>
                    <Text style={styles.modalText}>위클리 플레이리스트는 삭제 불가능합니다.</Text>
                </View>
            </Modal>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop:19*tmpWidth,
        paddingLeft: 18 * tmpWidth,
        paddingRight: 10 * tmpWidth
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        width: 40 * tmpWidth,
        height: 40 * tmpWidth,
        borderRadius: 40 * tmpWidth
    },
    name: {
        fontSize: 14 * tmpWidth,
        marginLeft: 11 * tmpWidth
    },
    text: {
        fontSize: 13 * tmpWidth,
        fontWeight: '400',
        marginRight: 8 * tmpWidth
    },
    modalBox: {
        backgroundColor: '#ffffff', 
        paddingTop: 20 * tmpWidth, 
        paddingBottom: 20 *tmpWidth, 
        paddingLeft: 10 * tmpWidth, 
        paddingRight: 10 * tmpWidth, 
        borderRadius: 8 * tmpWidth
    },
    modalText: {
        fontSize: 14 * tmpWidth, 
        color: 'rgb(86,86,86)', 
    }
})