import React from 'react'
import { View } from 'react-native'
import PlaylistNoticeForm from 'components/Notice/PlaylistNoticeForm';
import BoardNoticeForm from 'components/Notice/BoardNoticeForm';
import UserNoticeForm from 'components/Notice/UserNoticeForm';
import DailyNoticeForm from 'components/Notice/DailyNoticeForm';

export default UnReadNotice = ({ notice }) => {
    const { noticetype: type } = notice
    return (
        <View style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
            { (type === 'plike' || type === 'pcom' || type === 'pcomlike' 
            || type === 'precom' || type === 'precomlike') ? 
            <PlaylistNoticeForm notice={notice} /> :
            (type === 'dlike' || type === 'dcom' || type === 'dcomlike' 
            || type === 'drecom' || type === 'drecomlike') ? 
            <DailyNoticeForm notice={notice} /> :
            (type === 'blike' || type === 'bcom' || type === 'bcomlike' 
            || type === 'brecom' || type === 'brecomlike' || type === 'bsonglike') ?
            <BoardNoticeForm notice={notice} /> :
            (type === 'follow') ? 
            <UserNoticeForm notice={notice} /> : null }
        </View>
    )
}