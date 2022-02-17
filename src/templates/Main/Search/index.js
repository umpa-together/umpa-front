import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import style from 'constants/styles';
import TabTitle from 'components/TabTitle';
import { Context as MainContentsContext } from 'context/MainContents';
import { Context as UserContext } from 'context/User';
import RecommendPlaylist from 'components/Search/RecommendPlaylist';
import RecommendAccount from 'components/Search/RecommendAccount';
import SearchBarView from 'components/Search/SearchBarView';
import RecommendDailies from 'components/Search/RecommendDailies';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';
import PlayBar from 'components/PlayBar';
import AddedModal from 'components/Modal/AddedModal';
import { useModal } from 'providers/modal';
import LoadingIndicator from 'components/LoadingIndicator';
import GuideModal from 'components/Modal/GuideModal';

export default function Search() {
  const {
    state: { mainPlaylist, mainDJ, mainDailies },
    getMainRecommendPlaylist,
    getMainRecommendDJ,
    getMainRecommendDailies,
  } = useContext(MainContentsContext);
  const {
    state: { user },
  } = useContext(UserContext);
  const { addedModal, guideModal, setGuideModal } = useModal();

  const dataFetch = async () => {
    await Promise.all([
      getMainRecommendPlaylist(),
      getMainRecommendDJ(),
      getMainRecommendDailies(),
    ]);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  useEffect(() => {
    if (user && !user.guide.search) {
      setGuideModal('search');
    }
  }, [user]);

  return (
    <View style={style.background}>
      <TabTitle title="검색" titleStyle={styles.title} />
      {mainPlaylist && mainDJ && mainDailies ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBarView />
          <RecommendPlaylist />
          <RecommendAccount />
          <RecommendDailies />
        </ScrollView>
      ) : (
        <LoadingIndicator />
      )}
      <PlayBar />
      <GuideModal modal={guideModal === 'search'} setModal={setGuideModal} />
      {addedModal && <AddedModal title="1곡을 저장한 곡 목록에 담았습니다." />}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FS(24),
    color: COLOR_1,
    lineHeight: 35 * SCALE_HEIGHT,
    marginTop: 6 * SCALE_HEIGHT,
    marginLeft: 16 * SCALE_WIDTH,
  },
});
