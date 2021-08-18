import React, { useRef, useEffect, useState, useCallback, useContext } from 'react'
import { FlatList, Image, View, Animated, TouchableOpacity } from 'react-native'
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { push } from 'navigationRef';

const SPACING = 10;
const VISIBLE_ITEMS = 3;

export default RecentPlaylists = ({ playlists }) => {
    const { getPlaylist } = useContext(PlaylistContext);
    const scrollXIndex = useRef(new Animated.Value(0)).current
    const scrollXAnimated = useRef(new Animated.Value(0)).current
    const [index, setIndex] = useState(0)
    const setActiveIndex = useCallback((activeIndex) => {
        setIndex(activeIndex)
        scrollXIndex.setValue(activeIndex)
    })

    const onClickPlaylist = async (id, postUserId) => {
        await getPlaylist({id:id, postUserId:postUserId})
        push('SelectedPlaylist', {id: id, postUser: postUserId})
    }

    useEffect(() => {
        Animated.spring(scrollXAnimated, {
            toValue: scrollXIndex,
            useNativeDriver:true
        }).start()
    })
    
    return (
        <View style={{flex: 2}}>
            <FlingGestureHandler
                key="left"
                direction={Directions.LEFT}
                onHandlerStateChange={ev => {
                    if(ev.nativeEvent.state === State.END) {
                        if(index === playlists.length - 1)  return
                        setActiveIndex(index + 1)
                    }
                }}
            >
                <FlingGestureHandler
                    key="right"
                    direction={Directions.RIGHT}
                    onHandlerStateChange={ev => {
                        if(ev.nativeEvent.state === State.END) {
                            if(index === 0)  return
                            setActiveIndex(index - 1)
                        }
                    }}
                >
                    <FlatList 
                        data={playlists}
                        keyExtractor={(_, index) => String(index)}
                        horizontal
                        bounces={false}
                        contentContainerStyle={{
                            flex: 1, 
                            justifyContent: 'center',
                            padding: SPACING * 2
                        }}
                        CellRendererComponent={({item, index, children, style, ...props}) => {
                            const newStyle = [
                                style,
                                {zIndex: playlists.length - index}
                            ]
                            return (
                                <View style={newStyle} index={index} {...props}>
                                    {children}
                                </View>
                            )
                        }}
                        
                        scrollEnabled={false}
                        removeClippedSubviews={false}
                        renderItem={({ item, index }) => {
                            const inputRange = [index-1, index, index+1]
                            const translateX = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [40, 0, -500]
                            })
                            const translateY = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [-4, 0, 0]
                            })
                            const scale = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [.8, 1, 1.3]
                            })
                            const opacity = scrollXAnimated.interpolate({
                                inputRange,
                                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0]
                            })
                            const { _id, postUserId } = item
                            return (
                                <Animated.View style={{
                                    position: 'absolute', 
                                    left: -300 / 2, 
                                    transform: [{
                                        translateX
                                    },{
                                        translateY
                                    },{
                                        scale
                                    }],
                                        opacity: opacity
                                    }}
                                >
                                    <TouchableOpacity 
                                        activeOpacity={1}
                                        onPress={() => onClickPlaylist(_id, postUserId)}
                                    >
                                        <Image source={{uri: item.image}} style={{width:300,height:200, borderRadius: 8}}/>
                                    </TouchableOpacity>
                                </Animated.View>
                            )
                        }}
                    />
                </FlingGestureHandler>
            </FlingGestureHandler>
        </View>
    )
}