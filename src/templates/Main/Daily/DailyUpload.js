import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useDailyCreate } from 'providers/dailyCreate';
import Header from 'components/Header';
import style from 'constants/styles';
import { navigate } from 'lib/utils/navigation';
import Icon from 'widgets/Icon';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR } from 'constants/colors';
import UploadInfo from 'components/Daily/UploadInfo';
import UploadHashtag from 'components/UploadHashtag';
import Text from 'components/Text';

const NextActions = ({ edit }) => {
  const { onClickUpload } = useDailyCreate();
  return (
    <TouchableOpacity
      style={[style.icons, styles.textContainer]}
      onPress={() => onClickUpload(edit)}
    >
      <Text style={styles.uploatText}>저장</Text>
    </TouchableOpacity>
  );
};

const BackLandings = ({ edit }) => {
  const { information, song, images } = useDailyCreate();

  const onPressBack = () => {
    navigate('DailyCreate', {
      data: { information, song, images },
      edit,
    });
  };

  return (
    <TouchableOpacity style={styles.backContainer} title="back" onPress={onPressBack}>
      <Icon source={require('public/icons/back-40.png')} style={style.icons} />
    </TouchableOpacity>
  );
};
export default function DailyUpload({ data, edit }) {
  const {
    setParams,
    information: { hashtags },
    onClickAddHashtag,
    onClickDeleteHashtag,
  } = useDailyCreate();

  const info = {
    data: hashtags,
    deleteAction: onClickDeleteHashtag,
    addAction: onClickAddHashtag,
  };

  useEffect(() => {
    if (data) {
      setParams(data);
    }
  }, [data]);

  return (
    <View style={style.background}>
      <Header
        titleStyle={style.headertitle}
        title={edit ? '데일리 편집' : '데일리 작성'}
        landings={[<BackLandings edit={edit} />]}
        actions={[<NextActions edit={edit} />]}
      />
      <UploadInfo />
      <View style={styles.hashtagContainer}>
        <UploadHashtag info={info} containerStyle={styles.containerStyle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hashtagContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 86 * SCALE_HEIGHT,
    shadowColor: '#000',
    shadowOffset: {
      height: -1 * SCALE_WIDTH,
      width: 0,
    },
    elevation: 10,
    backgroundColor: '#fff',
    shadowRadius: 2 * SCALE_WIDTH,
    shadowOpacity: 0.1,
  },
  uploatText: {
    fontSize: FS(14),
    color: MAIN_COLOR,
    paddingVertical: 10 * SCALE_WIDTH,
    paddingHorizontal: 10 * SCALE_WIDTH,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    marginLeft: 21 * SCALE_WIDTH,
    marginTop: 10 * SCALE_HEIGHT,
  },
});
