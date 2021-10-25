import React, { useContext, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri';
import { useTrackPlayer } from 'providers/trackPlayer';
import { SongImage } from 'components/SongImage';
import StoryCalendar from 'components/StoryCalendar';
import HarmfulModal from 'components/HarmfulModal';
import DeleteModal from 'components/DeleteModal';
import { tmpWidth } from 'components/FontNormalize';
import ProfileImage from 'components/ProfileImage';
import StoryViewer from './StoryViewer';

require('date-utils');

const Story = ({ story, storyModal, setStoryModal, isMyAccount }) => {
  const { state: userState } = useContext(UserContext);
  const { addtracksong, stoptracksong, isPlayingId } = useTrackPlayer();
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewerModal, setViewerModal] = useState(false);
  const [calendarModal, setCalendarModal] = useState(false);
  const newDate = new Date();
  const today = newDate.toFormat('YYYY.MM.DD');

  const onClose = () => {
    setStoryModal(false);
    stoptracksong();
  };

  const onClickViewer = () => {
    setViewerModal(true);
  };

  const onClickCalendar = () => {
    setCalendarModal(true);
  };

  const onClickDelete = () => {
    setDeleteModal(true);
  };

  useEffect(() => {
    if (!story) setStoryModal(false);
  }, [story]);

  useEffect(() => {
    if (storyModal && story.song.attributes.contentRating !== 'explicit') {
      addtracksong({ data: story.song });
    }
  }, [storyModal]);

  return (
    <Modal
      animationIn="fadeInRight"
      animationOut="fadeOutLeft"
      isVisible={storyModal}
      onBackdropPress={onClose}
      backdropOpacity={0.5}
      style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={isMyAccount ? styles.myContainer : styles.otherContainer}>
        {story !== null && story !== undefined && (
          <View>
            <StoryViewer
              viewerModal={viewerModal}
              setViewerModal={setViewerModal}
              setStoryModal={setStoryModal}
            />
            <StoryCalendar calendarModal={calendarModal} setCalendarModal={setCalendarModal} />
            <View style={{ alignItems: 'center' }}>
              {isMyAccount && userState.storyViewer.length !== 0 && (
                <TouchableOpacity style={styles.viewer} onPress={onClickViewer}>
                  <FlatList
                    data={userState.storyViewer}
                    keyExtractor={(user) => user._id}
                    horizontal
                    renderItem={({ item, index }) => {
                      if (index > 1) return null;
                      return (
                        <View style={index === 0 ? styles.firstPosition : styles.secondPosition}>
                          <ProfileImage img={item.profileImage} imgStyle={styles.smallViewer} />
                        </View>
                      );
                    }}
                  />
                  <Text style={styles.viewerLengthText}>{userState.storyViewer.length}명</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.title}>오늘의 곡</Text>
              <Text style={styles.today}>{today}</Text>
              <TouchableOpacity style={styles.calendar} onPress={onClickCalendar}>
                <SvgUri width="40" height="40" source={require('assets/icons/calendar.svg')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (isPlayingId === story.song.id) {
                    stoptracksong();
                  } else {
                    addtracksong({ data: story.song });
                  }
                }}
              >
                <SongImage url={story.song.attributes.artwork.url} size={155} border={155} />
                {isPlayingId !== story.song.id ? (
                  <SvgUri
                    width="56"
                    height="56"
                    source={require('../../assets/icons/modalPlay.svg')}
                    style={styles.stopAndplay}
                  />
                ) : (
                  <SvgUri
                    width="56"
                    height="56"
                    source={require('../../assets/icons/modalStop.svg')}
                    style={styles.stopAndplay}
                  />
                )}
              </TouchableOpacity>
              <HarmfulModal />
              <View style={styles.songBox}>
                {story.song.attributes.contentRating === 'explicit' && (
                  <SvgUri
                    width="17"
                    height="17"
                    source={require('assets/icons/19.svg')}
                    style={styles.explicit}
                  />
                )}
                <Text style={styles.song} numberOfLines={1}>
                  {story.song.attributes.name}
                </Text>
              </View>
              <View style={styles.artistBox}>
                <Text style={styles.artist} numberOfLines={1}>
                  {story.song.attributes.artistName}
                </Text>
              </View>
            </View>
            {isMyAccount && (
              <TouchableOpacity onPress={onClickDelete} style={styles.deleteBox} activeOpacity={1}>
                <Text style={styles.deleteText}>삭제</Text>
              </TouchableOpacity>
            )}
            {deleteModal && (
              <DeleteModal
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                type="todaySong"
              />
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  myContainer: {
    width: 271 * tmpWidth,
    height: 352 * tmpWidth,
    borderRadius: 16 * tmpWidth,
    backgroundColor: 'rgb(250,250,250)',
    shadowColor: 'rgb(146, 158, 200)',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 60 * tmpWidth,
    shadowOpacity: 0.04,
  },
  otherContainer: {
    width: 271 * tmpWidth,
    height: 322 * tmpWidth,
    borderRadius: 16 * tmpWidth,
    backgroundColor: 'rgb(250,250,250)',
    shadowColor: 'rgb(146, 158, 200)',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 60 * tmpWidth,
    shadowOpacity: 0.04,
  },
  viewer: {
    height: 40 * tmpWidth,
    position: 'absolute',
    left: 20 * tmpWidth,
    top: 20 * tmpWidth,
  },
  firstPosition: {
    position: 'absolute',
  },
  secondPosition: {
    marginLeft: 12 * tmpWidth,
  },
  smallViewer: {
    width: 20 * tmpWidth,
    height: 20 * tmpWidth,
    borderRadius: 20 * tmpWidth,
  },
  viewerLengthText: {
    fontSize: 11 * tmpWidth,
    color: 'rgb(196,196,196)',
    textAlign: 'center',
  },
  title: {
    fontSize: 16 * tmpWidth,
    color: 'rgb(80,80,80)',
    marginTop: 20 * tmpWidth,
  },
  today: {
    fontSize: 14 * tmpWidth,
    color: 'rgb(153,153,153)',
    marginTop: 5 * tmpWidth,
    marginBottom: 21 * tmpWidth,
  },
  calendar: {
    height: 40 * tmpWidth,
    position: 'absolute',
    right: 13 * tmpWidth,
    top: 13 * tmpWidth,
  },
  stopAndplay: {
    position: 'absolute',
    left: 49 * tmpWidth,
    top: 49 * tmpWidth,
  },
  songBox: {
    marginTop: 15 * tmpWidth,
    width: 160 * tmpWidth,
    marginBottom: 11 * tmpWidth,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  explicit: {
    marginRight: 5 * tmpWidth,
  },
  song: {
    fontSize: 18 * tmpWidth,
    fontWeight: '400',
  },
  artistBox: {
    marginBottom: 6 * tmpWidth,
    width: 160 * tmpWidth,
    alignItems: 'center',
  },
  artist: {
    fontSize: 14 * tmpWidth,
    color: 'rgb(133,133,133)',
  },
  deleteBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16 * tmpWidth,
    backgroundColor: 'rgb(169,193,255)',
    shadowColor: 'rgb(146, 158, 200)',
    shadowOffset: {
      height: 0 * tmpWidth,
      width: 0 * tmpWidth,
    },
    shadowRadius: 60 * tmpWidth,
    shadowOpacity: 0.04,
    paddingTop: 11 * tmpWidth,
    paddingBottom: 11 * tmpWidth,
    borderBottomLeftRadius: 16 * tmpWidth,
    borderBottomRightRadius: 16 * tmpWidth,
  },
  deleteText: {
    fontSize: 14 * tmpWidth,
    color: 'rgb(255,255,255)',
  },
});

export default Story;
