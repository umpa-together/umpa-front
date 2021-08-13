import React from 'react';
import { View } from 'react-native';
import ContentDetail from '../../components/Board/ContentDetail';

const SelectedContentPage = ({ route }) => {
    const { boardName: title } = route.params
    return (
        <View style={{flex:1}}>
            <ContentDetail title={title}/>
        </View>
    );
};

export default SelectedContentPage;