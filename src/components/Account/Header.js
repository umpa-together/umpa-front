import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { tmpWidth } from 'components/FontNormalize'
import SvgUri from 'react-native-svg-uri';
import { navigate, goBack } from 'navigationRef';
import ReportModal from 'components/ReportModal';
import MusicBoxModal from 'components/MusicBoxModal';

export default Header = ({ user, isMyAccount }) => {
    const [reportModal, setReportModal] = useState(false);
    const [musicBoxModal, setMusicBoxModal] = useState(false);

    return (
        <View style={styles.header}>
            {isMyAccount ? 
            <>
                <TouchableOpacity style={styles.leftOption} onPress={() => setMusicBoxModal(true)}>
                    <SvgUri width='100%' height='100%' source={require('assets/icons/musicBox.svg')}/>
                </TouchableOpacity>
                <Text style={styles.name}>{user.name}</Text>
                <TouchableOpacity style={styles.rightOption} onPress={() => navigate('Setting')}>
                    <SvgUri width='100%' height='100%' source={require('assets/icons/setting.svg')}/>
                </TouchableOpacity>
                { musicBoxModal && <MusicBoxModal musicBoxModal={musicBoxModal} setMusicBoxModal={setMusicBoxModal} /> }
            </> : 
            <>
                <TouchableOpacity style={styles.leftOption} onPress={goBack}>
                    <SvgUri width='100%' height='100%' source={require('assets/icons/back.svg')}/>
                </TouchableOpacity>
                <Text style={styles.name}>{user.name}</Text>
                <TouchableOpacity style={styles.reportOption} onPress={() => setReportModal(true)}>
                    <Text style={{color: 'rgb(80,80,80)'}}>신고</Text>
                </TouchableOpacity>
                {reportModal && <ReportModal reportModal={reportModal} setReportModal={setReportModal} type={'account'} subjectId={user._id}/> }
            </> }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 40  * tmpWidth,
        marginTop: 40 * tmpWidth,
        width: 375 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    leftOption: {
        position: "absolute", 
        left: 12 * tmpWidth,
        width: 40 * tmpWidth, 
        height: 40 * tmpWidth
    },
    name: {
        fontSize: 16 * tmpWidth, 
        fontWeight: '500'
    },
    rightOption: {
        position: "absolute",
        right: 12 * tmpWidth,
        width: 40 * tmpWidth,
        height: 40 * tmpWidth
    },
    reportOption: {
        position: "absolute",
        right: 20 * tmpWidth
    }
})