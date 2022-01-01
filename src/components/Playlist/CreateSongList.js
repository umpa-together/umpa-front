/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-new-object */
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedReaction,
  scrollTo,
} from 'react-native-reanimated';

import MovableSongView from './MovableSongView';

const songs = [
  {
    id: 1,
    attributes: {
      id: 1,
      name: '1',
      albumName: '11',
      releaseDate: '2014-06-23',
      album: '11',
      duration: 181800,
      previews: [{ url: 'https://music.apple.com/kr/album/a/892276874?i=892276877' }],
      artistname: '1',
      contentRating: 'explicit',
      artwork: {
        url: 'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/77/d6/ad/77d6ad6d-e3a3-dc80-239d-574c02962a67/Crush_wonderlust_Cover.jpg/{w}x{h}bb.jpeg',
      },
    },
  },
  {
    id: 2,
    attributes: {
      id: 2,
      name: '2',
      albumName: '11',
      releaseDate: '2014-06-23',
      album: '11',
      duration: 181800,
      previews: [{ url: 'https://music.apple.com/kr/album/a/892276874?i=892276877' }],
      artistname: '2',
      artwork: {
        url: 'https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/3d/31/51/3d315188-628e-5c53-4c85-d2efee7374f2/Crush_Crush_On_You_Cover.jpg/{w}x{h}bb.jpeg',
      },
    },
  },
  {
    id: 3,
    attributes: {
      id: 3,
      name: '3',
      albumName: '11',
      releaseDate: '2014-06-23',
      album: '11',
      duration: 181800,
      previews: [{ url: 'https://music.apple.com/kr/album/a/892276874?i=892276877' }],
      artistname: '3',
      artwork: {
        url: 'https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/6f/ce/90/6fce909e-9500-e677-026a-5c9a40d4bd8a/Crush_Don_t_Forget_Cover.jpg/{w}x{h}bb.jpeg',
      },
    },
  },
  {
    id: 4,
    attributes: {
      id: 4,
      name: '4',
      albumName: '11',
      releaseDate: '2014-06-23',
      album: '11',
      duration: 181800,
      previews: [{ url: 'https://music.apple.com/kr/album/a/892276874?i=892276877' }],
      artistname: '4',
      artwork: {
        url: 'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/77/d6/ad/77d6ad6d-e3a3-dc80-239d-574c02962a67/Crush_wonderlust_Cover.jpg/{w}x{h}bb.jpeg',
      },
    },
  },
  {
    id: 5,
    attributes: {
      id: 5,
      name: '5',
      albumName: '11',
      releaseDate: '2014-06-23',
      album: '11',
      duration: 181800,
      previews: [{ url: 'https://music.apple.com/kr/album/a/892276874?i=892276877' }],
      artistname: '5',
      artwork: {
        url: 'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/77/d6/ad/77d6ad6d-e3a3-dc80-239d-574c02962a67/Crush_wonderlust_Cover.jpg/{w}x{h}bb.jpeg',
      },
    },
  },
  {
    id: 6,
    attributes: {
      id: 6,
      name: '6',
      albumName: '11',
      releaseDate: '2014-06-23',
      album: '11',
      duration: 181800,
      previews: [{ url: 'https://music.apple.com/kr/album/a/892276874?i=892276877' }],
      artistname: '6',
      artwork: {
        url: 'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/77/d6/ad/77d6ad6d-e3a3-dc80-239d-574c02962a67/Crush_wonderlust_Cover.jpg/{w}x{h}bb.jpeg',
      },
    },
  },
  {
    id: 7,
    attributes: {
      id: 7,
      name: '7',
      albumName: '11',
      releaseDate: '2014-06-23',
      album: '11',
      duration: 181800,
      previews: [{ url: 'https://music.apple.com/kr/album/a/892276874?i=892276877' }],
      artistname: '7',
      artwork: {
        url: 'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/77/d6/ad/77d6ad6d-e3a3-dc80-239d-574c02962a67/Crush_wonderlust_Cover.jpg/{w}x{h}bb.jpeg',
      },
    },
  },
  {
    id: 8,
    attributes: {
      id: 8,
      name: '8',
      albumName: '11',
      releaseDate: '2014-06-23',
      album: '11',
      duration: 181800,
      previews: [{ url: 'https://music.apple.com/kr/album/a/892276874?i=892276877' }],
      artistname: '8',
      artwork: {
        url: 'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/77/d6/ad/77d6ad6d-e3a3-dc80-239d-574c02962a67/Crush_wonderlust_Cover.jpg/{w}x{h}bb.jpeg',
      },
    },
  },
  {
    id: 9,
    attributes: {
      id: 9,
      name: '9',
      albumName: '11',
      releaseDate: '2014-06-23',
      album: '11',
      duration: 181800,
      previews: [{ url: 'https://music.apple.com/kr/album/a/892276874?i=892276877' }],
      artistname: '9',
      artwork: {
        url: 'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/77/d6/ad/77d6ad6d-e3a3-dc80-239d-574c02962a67/Crush_wonderlust_Cover.jpg/{w}x{h}bb.jpeg',
      },
    },
  },
  {
    id: 10,
    attributes: {
      id: 10,
      name: '10',
      albumName: '11',
      releaseDate: '2014-06-23',
      album: '11',
      duration: 181800,
      previews: [{ url: 'https://music.apple.com/kr/album/a/892276874?i=892276877' }],
      artistname: '10',
      artwork: {
        url: 'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/77/d6/ad/77d6ad6d-e3a3-dc80-239d-574c02962a67/Crush_wonderlust_Cover.jpg/{w}x{h}bb.jpeg',
      },
    },
  },
  {
    id: 11,
    attributes: {
      id: 11,
      name: '11',
      albumName: '11',
      releaseDate: '2014-06-23',
      album: '11',
      duration: 181800,
      previews: [{ url: 'https://music.apple.com/kr/album/a/892276874?i=892276877' }],
      artistname: '11',
      artwork: {
        url: 'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/77/d6/ad/77d6ad6d-e3a3-dc80-239d-574c02962a67/Crush_wonderlust_Cover.jpg/{w}x{h}bb.jpeg',
      },
    },
  },
];

const SONG_HEIGHT = 60;
function listToObject(list) {
  const values = Object.values(list);
  const object = {};

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }

  return object;
}

export default function CreateSongList() {
  const positions = useSharedValue(listToObject(songs));
  const scrollY = useSharedValue(0);
  const scrollViewRef = useAnimatedRef();
  const [topOffset, setTopOffset] = useState(0);
  // update scroll view location by using shared value
  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => scrollTo(scrollViewRef, 0, scrolling, false),
  );
  // set scrolly value accrroding scroll offset
  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // change array accroding to position
  const arrayCheck = () => {
    const result = new Object([]);
    for (const i in positions.value) {
      result[positions.value[i]] = songs[songs.findIndex((item) => item.id == i)];
    }
  };
  return (
    songs && (
      <View>
        <Animated.ScrollView
          ref={scrollViewRef}
          onLayout={() => {
            scrollViewRef.current.measure((x, y, width, height, pagex, pagey) => {
              setTopOffset(pagey);
            });
          }}
          onScroll={handleScroll}
          style={{ height: 400 }}
          contentContainerStyle={{
            height: SONG_HEIGHT * songs.length,
          }}
        >
          {songs.map((item) => {
            return (
              <MovableSongView
                key={item.attributes.id}
                id={item.attributes.id}
                song={item}
                positions={positions}
                scrollY={scrollY}
                topOffset={topOffset}
                songsCount={songs.length}
              />
            );
          })}
        </Animated.ScrollView>
      </View>
    )
  );
}
