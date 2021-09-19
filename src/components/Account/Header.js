import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { tmpWidth } from 'components/FontNormalize'
import SvgUri from 'react-native-svg-uri';
import { navigate, goBack } from 'navigationRef';
import ReportModal from 'components/ReportModal';
import MusicBoxModal from 'components/MusicBoxModal';
import { StatusBarHeight } from 'components/StatusBarHeight'

export default Header = ({ user, isMyAccount }) => {
    const [reportModal, setReportModal] = useState(false);
    const [musicBoxModal, setMusicBoxModal] = useState(false);

    const onClickMusicBox = () => {
        setMusicBoxModal(true)
    }

    const onClickSetting = () => {
        navigate('Setting')
    }

    const onClickBack = () => {
        goBack()
    }

    const onClickReport = () => {
        setReportModal(true)
    }

    return (
        <View style={styles.container}>
            {isMyAccount ? 
            <>
                <TouchableOpacity 
                    style={[styles.musicBox, styles.size]} 
                    onPress={onClickMusicBox}
                >
                    <SvgUri source={require('assets/icons/musicBox.svg')} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.setting, styles.size]} 
                    onPress={onClickSetting}
                >
                    <SvgUri source={require('assets/icons/setting.svg')} />
                </TouchableOpacity>
                { musicBoxModal && <MusicBoxModal musicBoxModal={musicBoxModal} setMusicBoxModal={setMusicBoxModal} /> }
            </> : 
            <>
                <TouchableOpacity 
                    style={[styles.back, styles.size]} 
                    onPress={onClickBack}
                >
                    <SvgUri source={require('assets/icons/back.svg')} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.report} 
                    onPress={onClickReport}
                >
                    <Text style={styles.reportText}>신고</Text>
                </TouchableOpacity>
                {reportModal && <ReportModal reportModal={reportModal} setReportModal={setReportModal} type={'account'} subjectId={user._id}/> }
            </> }
        </View>
    )
}

export const EditHeader = () => {
    return (
        <View style={styles.editContainer}>
            <Text style={styles.title}>프로필 편집</Text>
            <TouchableOpacity style={styles.editBack} onPress={goBack}>
                <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('assets/icons/back.svg')}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: (40 + StatusBarHeight) * tmpWidth, 
        paddingTop: StatusBarHeight * tmpWidth,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    size: {
        width: 40 * tmpWidth, 
        height: 40 * tmpWidth,
        top: (2 + StatusBarHeight) * tmpWidth
    },
    back: {
        position: "absolute", 
        left: 12 * tmpWidth,
    },
    name: {
        fontSize: 16 * tmpWidth, 
        fontWeight: '500'
    },
    setting: {
        position: "absolute",
        right: 12 * tmpWidth,
    },
    report: {
        position: "absolute",
        right: 20 * tmpWidth,
        top: (2 + StatusBarHeight) * tmpWidth,
    },
    musicBox: {
        position: "absolute",
        right: 52 * tmpWidth,
    },
    reportText:{ 
        color: 'rgb(80,80,80)'
    },
    title: {
        fontSize: 16 * tmpWidth,
        fontWeight: '700',
        textAlign: 'center', 
    },
    editContainer: {
        width: '100%', 
        height: (48 + StatusBarHeight) * tmpWidth, 
        paddingTop: StatusBarHeight * tmpWidth,
        backgroundColor: 'rgb(254,254,254)',
        justifyContent: 'center',
    },
    editBack: { 
        position: 'absolute',
        left: 5 * tmpWidth, 
        top: (2 + StatusBarHeight) * tmpWidth
    }
})