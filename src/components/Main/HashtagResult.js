import React, { useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';
import LoadingIndicator from '../LoadingIndicator'
import { tmpWidth } from 'components/FontNormalize'
import SvgUri from 'react-native-svg-uri';
import Playlists from './Playlists';
import Daily from './Daily';
import { navigate } from 'navigationRef';

export default HashtagResult = () => {
    const { state } = useContext(SearchPlaylistContext);
    
    const optionLists = [{
        title: '플레이리스트',
        components: <Playlists playlists={state.playList} />
    }, {
        title: '데일리',
        components: <Daily daily={state.daily} />
    }]

    const onClickMore = (option) => {
        navigate('ContentsMore', { option })
    }

    return (
        <>
        {state.daily === null && state.playList === null ? <LoadingIndicator /> :
        <ScrollView
            contentContainerStyle={styles.container}
        >
            {optionLists.map(({ title, components }) => {
                return (
                    <View key={title}>
                        <View style={styles.header}>
                            <Text style={styles.title}>{title}</Text>
                            <TouchableOpacity onPress={() => onClickMore(title)}>
                                <SvgUri source={require('assets/icons/more.svg')} style={styles.more}/>
                            </TouchableOpacity>
                        </View>
                        {components}
                    </View>
                )
            })}
        </ScrollView> }
        </>
    )
}

const styles=StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 18 * tmpWidth,
        marginBottom: 9 * tmpWidth,
        marginLeft: 18 * tmpWidth,
        marginRight: 6 * tmpWidth
    },
    title: {
        fontSize: 16 * tmpWidth,
        fontWeight: '700',
    },
    more: {
        width: 30 * tmpWidth,
        height: 30 * tmpWidth,
    },
    container: {
        paddingBottom: 30 * tmpWidth
    }
})