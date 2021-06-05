import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { tmpWidth } from './FontNormalize';
import TrackPlayer from 'react-native-track-player';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';
import { Context as UserContext } from '../context/UserContext';

const ImageSelect = ({url, opac}) => {
  url =url.replace('{w}', '300');
  url = url.replace('{h}', '300');
  return (
      <Image style ={{borderRadius :100 * tmpWidth, opacity : opac , height:'100%', width:'100%'}} source ={{url:url}}/>
  );
};

const StoryCalendar = ({ calendarModal, setCalendarModal }) => {
    const { state } = useContext(UserContext);
    const monthFormatter = new Intl.DateTimeFormat('en', {month: 'long'});
    const [currentDate, setCurrentDate] = useState(new Date);
    const storyDate = [];
    const [selectedStory, setSelectedStory] = useState(undefined)
    const [isPlayingid, setIsPlayingid] = useState('0');
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [monthName, setMonthName] = useState(monthFormatter.format(currentDate))
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const firstWeekday = new Date(year, month, 1).getDay();
    const lastWeekday = new Date(year, month, lastDate).getDay();
    const [calendarDates, setCalendarDates] = useState()
    const weekdays = [];
    for (let idx = 0; idx <= 6; idx++) {
        const matchMonth = new Date(2020, 5, idx);
        const weekDay = matchMonth.toLocaleString('default', {
            weekday: 'narrow',
        });
        weekdays.push(weekDay);
    }
    for(let key in state.storyCalendar) {
        storyDate.push(state.storyCalendar[key].time)
    }
    const addtracksong= async ({data}) => {
      const track = new Object();
      track.id = data.id;
      track.url = data.attributes.previews[0].url;
      track.title = data.attributes.name;
      track.artist = data.attributes.artistName;
      if (data.attributes.contentRating != "explicit") {
          await TrackPlayer.reset()
          setIsPlayingid(data.id);
          await TrackPlayer.add(track)
          TrackPlayer.play();
      } else {
          setHarmfulModal(true);
      }
    };
    const stoptracksong= async () => {    
        setIsPlayingid('0');
        await TrackPlayer.reset()
    };
    const onClose = () => {
        setCalendarModal(false)
        setSelectedStory(null)
        setSelectedIdx(null)
    }
    useEffect(() => {
        const trackPlayer = setTimeout(() => setIsPlayingid('0'), 30000);
        return () => clearTimeout(trackPlayer);
    },[isPlayingid])

    const changeMonth = (type) => {
        let tmpDate;
        if(type == 'prev'){
            tmpDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth()-1,
                currentDate.getDate()
            )
            setCurrentDate(tmpDate)
        }else if(type == 'next'){
            tmpDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth()+1,
                currentDate.getDate()
            )
            setCurrentDate(tmpDate)
        }
        const year = tmpDate.getFullYear();
        const month = tmpDate.getMonth();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const firstWeekday = new Date(year, month, 1).getDay();
        const lastWeekday = new Date(year, month, lastDate).getDay();
        const prevDates = [];
        const dates = [];
        const nextDates = [];
        for (let idx = 0; idx < firstWeekday; idx++) {
            const date = new Date(year, month, 0);
            date.setDate(date.getDate() - idx);
            prevDates.unshift(date.toFormat('YYYY-MM-DD'));
        } 
        for (let idx = 1; idx <= lastDate; idx++)
            dates.push(new Date(year, month, idx).toFormat('YYYY-MM-DD'));
        if (6 - lastWeekday >= 1)
            for (let idx = 1; idx <= 6 - lastWeekday; idx++)
                nextDates.push(new Date(year, month + 1, idx).toFormat('YYYY-MM-DD'));
        setCalendarDates(() => [...prevDates, ...dates, ...nextDates])
        setMonthName(monthFormatter.format(tmpDate))
    }

    useEffect(() => {
        const prevDates = [];
        const dates = [];
        const nextDates = [];
        for (let idx = 0; idx < firstWeekday; idx++) {
            const date = new Date(year, month, 0);
            date.setDate(date.getDate() - idx);
            prevDates.unshift(date.toFormat('YYYY-MM-DD'));
        }
        for (let idx = 1; idx <= lastDate; idx++)
            dates.push(new Date(year, month, idx).toFormat('YYYY-MM-DD'));
        if (6 - lastWeekday >= 1)
            for (let idx = 1; idx <= 6 - lastWeekday; idx++)
                nextDates.push(new Date(year, month + 1, idx).toFormat('YYYY-MM-DD'));
        setCalendarDates([...prevDates, ...dates, ...nextDates])
    },[])

    return (
        <Modal
            isVisible={calendarModal}
            onBackdropPress={onClose}
            backdropOpacity={0.2}
            style={{justifyContent: 'flex-end', alignItems: 'center', margin: 0}}
        >
            <View style={styles.callenderContainer}>
                <View style={styles.rowContainer}>
                    <View style={styles.calendarContainer}>
                        <View style={styles.headerStyle}>
                            <TouchableOpacity 
                                onPress={() => changeMonth('prev')}
                                style={{width: 43 * tmpWidth, height: 43 * tmpWidth}}
                            >
                                <SvgUri width='43' height='43' source={require('../assets/icons/representleft.svg')}/>
                            </TouchableOpacity>
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleText}>{monthName}</Text>
                                <Text style={styles.yearText}>{year}</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => changeMonth('next')}
                                style={{width: 43 * tmpWidth, height: 43 * tmpWidth}}
                            >
                                <SvgUri width='43' height='43' source={require('../assets/icons/representright.svg')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowContainer}>
                            {weekdays.map((week) => {
                                return (
                                    <View style={styles.defaultView}>
                                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(93,93,93)'}}>{week}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            style={styles.dayContainer}
                            data={calendarDates}
                            numColumns={7}
                            renderItem={({item, index}) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                      setSelectedIdx(index)
                                      setSelectedStory(state.storyCalendar.filter(story => story.time == item)[0])}}>
                                        <View style={index == selectedIdx ? styles.selectedView : styles.defaultView}>
                                            <Text style={storyDate.includes(calendarDates[index]) ? index == selectedIdx ? styles.whiteText : styles.activeText : styles.notActiveText}>{item.substr(8)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={(item, id) => id.toString()}
                        />
                      </View>
                  </View>
                  {selectedStory != undefined ? 
                  <View style={{flexDirection: 'row', paddingLeft: 24 * tmpWidth, paddingTop: 12 * tmpWidth}}>
                    <TouchableOpacity style={styles.songsCover} onPress={() => {
                      if(isPlayingid == selectedStory.song.id){
                          stoptracksong()
                      }else{
                          addtracksong({data: selectedStory.song})
                      }
                    }}>
                      <ImageSelect opac={1.0} url={selectedStory.song.attributes.artwork.url}/>
                        { isPlayingid != selectedStory.song.id ? 
                        <SvgUri width='43' height='43' source={require('../assets/icons/modalPlay.svg')} style={{position: 'absolute', left: 38.5 * tmpWidth, top: 38.5 * tmpWidth}}/> :
                        <SvgUri width='43' height='43' source={require('../assets/icons/modalStop.svg')} style={{position: 'absolute', left: 38.5 * tmpWidth, top: 38.5 * tmpWidth}}/> }
                    </TouchableOpacity>
                    <View style={{justifyContent: 'center', width: 180 * tmpWidth, marginLeft: 24 * tmpWidth}}>
                      <Text style={{fontSize: 18 * tmpWidth, fontWeight: '500'}} numberOfLines={1}>{selectedStory.song.attributes.name}</Text>
                      <Text style={{fontSize:14 * tmpWidth, color:'rgb(133,133,133)', marginTop: 4 * tmpWidth}} numberOfLines={1}>{selectedStory.song.attributes.artistName}</Text>
                    </View>
                  </View> : null }
              </View>
        </Modal>
    )
}

const styles=StyleSheet.create({
    callenderContainer: {
        height: 600 * tmpWidth ,
        borderRadius: 16 * tmpWidth,
        backgroundColor: 'rgb(250,250,250)',
        shadowColor: "rgb(146, 158, 200)",
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowRadius: 60 * tmpWidth,
        shadowOpacity: 0.04,
        width: '100%',
    },
    calendarContainer: {
        height: 390 * tmpWidth,
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    dayContainer: {
        width: 330 * tmpWidth,
        height: 350 * tmpWidth,
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10 * tmpWidth,
        marginTop: 30 * tmpWidth,
        width: '100%',
        paddingLeft: 8 * tmpWidth,
        paddingRight: 8 * tmpWidth
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    titleText: {
        fontSize: 20 * tmpWidth,
        textAlign: 'center',
        justifyContent: 'center',
    },
    yearText: {
        fontSize: 12 * tmpWidth,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 4 * tmpWidth
    },
    rowContainer: {
        flexDirection: 'row',
    },
    defaultView: {
        width: 47 * tmpWidth,
        height: 47 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedView: {
      width: 47 * tmpWidth,
      height: 47 * tmpWidth,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 47 * tmpWidth,
      backgroundColor: 'rgb(152,187,255)'
    },
    notActiveText: {
        textAlign: 'center',
    },
    activeText: {
        color: 'rgb(152,187,255)',
        textAlign: 'center',
    },
    songsCover: {
      width: 120 * tmpWidth,
      height: 120 * tmpWidth,
    },
    whiteText: {
      color: 'white'
    }
});

export default StoryCalendar;
