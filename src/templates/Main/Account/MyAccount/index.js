/* eslint-disable no-nested-ternary */
import React, {useContext, useEffect, useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Context as UserContext } from 'context/User';

import UserInfo from 'components/Main/Account/UserInfo';
import PostingInfo from 'components/Main/Account/PostingInfo';
import ResultOpt from 'components/Main/Account/ResultOpt';
import PlaylistResult from 'components/Main/Account/PlaylistResult';
import DailyResult from 'components/Main/Account/DailyResult';
import RelayResult from 'components/Main/Account/RelayResult';

export default function MyAccount() {
  const { state, getMyInformation } = useContext(UserContext);
  const data = state.user;
  useEffect(() => {
    getMyInformation();
  }, []);
  const postingnumber = data && data.playlists.length + data.dailys.length;
  const [resultOpt, setResultOpt] = useState(0);
  return (
    <View style={{ marginTop: 100 }}>
      {state.user ? (
        <ScrollView>
          <UserInfo
            songs={data.songs}
            name={data.name}
            introduction={data.introduction}
            genre={data.genre}
            profileImage={data.profileImage}
          />
          <PostingInfo posting={postingnumber} follower={data.follower} follwing={data.following} />
          <ResultOpt resultOpt={resultOpt} setResultOpt={setResultOpt} />
          {resultOpt === 0 ? (
            <PlaylistResult data={data.playlists} />
          ) : resultOpt === 1 ? (
            <DailyResult data={data.dailys} />
          ) : (
            resultOpt === 2 && <RelayResult />
          )}
        </ScrollView>
      ) : null}
    </View>
  );
}
