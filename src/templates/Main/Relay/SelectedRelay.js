import React, { useContext, useCallback } from 'react';
import { View } from 'react-native';
import { Context as RelayContext } from 'context/Relay';
import style from 'constants/styles';
import Information from 'components/Relay/Information';
import Divider from 'widgets/Divider';
import MusicSection from 'components/Relay/MusicSection';
import NavButton from 'components/Relay/NavButton';
import { useFocusEffect } from '@react-navigation/native';
import TrackPlayerProvider from 'providers/trackPlayer';

export default function ({ id }) {
  const { getSelectedRelay, getRelaySong, state } = useContext(RelayContext);

  useFocusEffect(
    useCallback(() => {
      getSelectedRelay({ id });
      getRelaySong({ id });
    }, []),
  );

  return (
    <View style={style.background}>
      {state.selectedRelay && state.swipeSongs && (
        <TrackPlayerProvider>
          <Information information={state.selectedRelay.playlist} />
          <Divider />
          <MusicSection
            title="음파에서 선정한 곡"
            songs={[state.selectedRelay.playlist.representSong]}
          />
          <Divider />
          <MusicSection title="실시간 상위 곡" songs={state.selectedRelay.songs} />
          <NavButton isSwipe={state.swipeSongs.length > 0} />
        </TrackPlayerProvider>
      )}
    </View>
  );
}
