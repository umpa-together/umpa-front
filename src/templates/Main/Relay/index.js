import React, { useEffect, useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Context as RelayContext } from 'context/Relay';
import style from 'constants/styles';
import CurrentSection from 'components/Relay/CurrentSection';
import Swiper from 'react-native-swiper';
import TabTitle from 'components/TabTitle';
import Divider from 'widgets/Divider';
import RelayCardView from 'components/Relay/RelayCardView';
import { Context as UserContext } from 'context/User';
import { useFocusEffect } from '@react-navigation/native';

export default function () {
  const { state, getCurrentRelay, getRelayLists, initRelay } = useContext(RelayContext);
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
      <TabTitle title="umpa" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {state.currentRelay && (
          <Swiper autoplay showsPagination={false} height={350} autoplayTimeout={time}>
            {state.currentRelay.map((relay) => (
              <CurrentSection relay={relay} key={relay._id} />
            ))}
          </Swiper>
        )}
        <Divider />
        <Text>umpa의 릴레이 플레이리스트</Text>
        {state.relayLists &&
          state.relayLists.map((relay) => {
            return <RelayCardView relay={relay} key={relay._id} />;
          })}
      </ScrollView>
    </View>
  );
}
