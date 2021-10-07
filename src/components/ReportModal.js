import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { tmpWidth } from 'components/FontNormalize';
import { Context as ReportContext } from 'context/ReportContext';

const ReportModal = ({ reportModal, setReportModal, type, subjectId }) => {
    const { postReport } = useContext(ReportContext);
    const [title, setTitle] = useState('');
    const reportRef = useRef();

    const onClose = () =>{
        setReportModal(false);
    };
    useEffect(() => {
        if (type == 'boardContent') {
            setTitle('게시글을')
        } else if (type == 'boardComment' || type == 'boardReComment' || type == 'playlistComment' || type == 'playlistReComment') {
            setTitle('댓글을')
        } else if (type == 'playlist'){
            setTitle('플레이리스트를')
        } else if (type == 'account') {
            setTitle('계정을')
        } else if (type =='chat') {
            setTitle('유저를')
        }
    }, []);
    const report = () => {
        setReportModal(false)
        if(reportRef.current.value != undefined && reportRef.current.value != ''){
            postReport({type, reason: reportRef.current.value, subjectId})
        }
    }
    return (
        <Modal
            animationIn='pulse'
            animationOut='fadeOut'
            isVisible={reportModal}
            backdropOpacity={0.4}
            onBackdropPress={onClose}
            style={{margin: 0, alignItems: 'center'}}
        >
            <View style={styles.deleteContainer}>
                <Text style={{fontSize: 14 * tmpWidth, marginTop: 32 * tmpWidth}}>{title} 신고하시겠습니까?</Text>
                <TextInput 
                    ref={reportRef}
                    onChangeText={text=> reportRef.current.value = text}
                    placeholder="신고 사유를 적어주세요."
                    autoCapitalize='none'
                    autoCorrect={false}
                    multiline={true}
                    style={styles.textInputBox}
                    placeholderTextColor='rgb(196,196,196)'
                />
                <View style={{flexDirection: 'row', marginTop: 13 * tmpWidth}}>
                    <TouchableOpacity style={styles.cancelBox} onPress={() => setReportModal(false)}>
                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(133,133,133)'}}>취소하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reportBox} onPress={async () => report()}>
                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(86,86,86)'}}>신고하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

const styles=StyleSheet.create({
    deleteContainer: {
        width : 285 * tmpWidth,
        height : 270 * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        borderRadius: 4 * tmpWidth, 
        alignItems: 'center'
    },
    cancelBox: {
        width: 105 * tmpWidth,
        height: 34 * tmpWidth,
        borderRadius: 8 * tmpWidth,
        backgroundColor: 'rgb(245,245,245)',
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(245,245,245)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5.5 * tmpWidth
    },
    reportBox: {
        width: 105 * tmpWidth,
        height: 34 * tmpWidth,
        borderRadius: 8 * tmpWidth,
        backgroundColor: 'rgb(245,245,245)',
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(169,193,255)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5.5 * tmpWidth
    },
    textInputBox: {
        width : 260 * tmpWidth,
        height : 130 * tmpWidth,
        borderRadius: 8 * tmpWidth,
        borderWidth: 1,
        borderColor: 'rgb(245,245,245)',
        marginTop: 13 * tmpWidth,
        paddingLeft: 10 * tmpWidth,
        paddingRight: 10 * tmpWidth,
        paddingTop: 10 * tmpWidth,
    }
});

export default ReportModal;