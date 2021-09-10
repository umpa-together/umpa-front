import React from 'react'
import { FlatList, View, Text } from 'react-native'
import { SongImage } from 'components/SongImage'

export default CreateSongsLists = ({ songs, validity }) => {
    return (
        <View style={{flex: 1}}>
            <Text>플레이리스트 곡 담기</Text>
            <FlatList 
                data={songs}
                keyExtractor={song => song.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                    const imgUrl = item.attributes.artwork.url
                    return (
                        <View style={{marginRight: 5}}>
                            <SongImage url={imgUrl} size={80} border={10}/>
                        </View>
                    )
                }}
            />
            {!validity.song &&
            <View style={styles.warningContainer}>
                <SvgUri width='14' height='14' source={require('../../assets/icons/warning.svg')}/>
                <Text style={styles.warningText}>곡을 담아주세요.</Text>
            </View> }
        </View>
    )
}