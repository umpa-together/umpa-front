import React, { useEffect, useContext, useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { Context as RelayContext } from 'context/Relay';
import style from 'constants/styles';
import { Context as UserContext } from 'context/User';
import { useFocusEffect } from '@react-navigation/native';
import CurrentRelayList from 'components/Relay/CurrentRelayList';
import RelayList from 'components/Relay/RelayList';

export default function () {
  const {
    state: { currentRelay, relayLists },
    getCurrentRelay,
    getRelayLists,
    initRelay,
  } = useContext(RelayContext);
  const { getMyInformation } = useContext(UserContext);
  const [time, setTime] = useState(1);
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
    </View>
  );
}
