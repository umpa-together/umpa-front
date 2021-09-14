import React, { useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';
import LoadingIndicator from '../LoadingIndicator'
import { tmpWidth } from 'components/FontNormalize'
import SvgUri from 'react-native-svg-uri';
import Playlists from './Playlists';
import { navigate } from 'navigationRef';

export default HashtagResult = () => {
    const { state } = useContext(SearchPlaylistContext);
    
    const optionLists = [{
        title: '플레이리스트',
        components: <Playlists playlists={state.playList} />
    }, ]

    const onClickMore = (option) => {
        navigate('ContentsMore', { option })
    }

    return (
        <>
        {state.daily === null && state.playList === null ? <LoadingIndicator /> :
        <>
            {optionLists.map(({ title, components }) => {
                return (
                    <>
                        <View style={styles.header}>
                            <Text style={styles.title}>{title}</Text>
                            <TouchableOpacity onPress={() => onClickMore(title)}>
                                <SvgUri source={require('assets/icons/more.svg')} style={styles.more}/>
                            </TouchableOpacity>
                        </View>
                        {components}
                    </>
                )
            })}
        </>}
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
    }
})