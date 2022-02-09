import React, { useEffect, useContext, useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { Context as RelayContext } from 'context/Relay';
import style from 'constants/styles';
import { Context as UserContext } from 'context/User';
import { useFocusEffect } from '@react-navigation/native';
import CurrentRelayList from 'components/Relay/CurrentRelayList';
import RelayList from 'components/Relay/RelayList';
import PlayBar from 'components/PlayBar';
import AddedModal from 'components/Modal/AddedModal';
import { useModal } from 'providers/modal';

export default function () {
  const {
    state: { currentRelay, relayLists },
    getCurrentRelay,
    getRelayLists,
    initRelay,
  } = useContext(RelayContext);
  const { getMyInformation } = useContext(UserContext);
  const [time, setTime] = useState(1);
  const { addedModal } = useModal();

  const dataFetch = async () => {
    await Promise.all([getCurrentRelay(), getRelayLists(), getMyInformation()]);
  };

  useEffect(() => {
    dataFetch();
    const autoTimer = setTimeout(() => setTime(8), 1000);
    return () => clearTimeout(autoTimer);
  }, []);

  useFocusEffect(
    useCallback(() => {
      initRelay();
    }, []),
  );

  return (
    <View style={style.background}>
      {currentRelay && relayLists && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <CurrentRelayList time={time} currentRelay={currentRelay} />
          <RelayList relayList={relayLists} />
        </ScrollView>
      )}
      <PlayBar />
      {addedModal && <AddedModal title="1곡을 저장한 곡 목록에 담았습니다." />}
    </View>
  );
}
