import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDailyCreate } from 'providers/dailyCreate';
import Header from 'components/Header';
import style from 'constants/styles';
import { navigate } from 'lib/utils/navigation';
import Icon from 'widgets/Icon';
import FS from 'lib/utils/normalize';
import { MAIN_COLOR } from 'constants/colors';
import UploadInfo from 'components/Daily/UploadInfo';
import UploadHashtag from 'components/Daily/UploadHashtag';

const NextActions = () => {
  const { onClickUpload } = useDailyCreate();
  return (
    <TouchableOpacity style={[style.icons, styles.textContainer]} onPress={onClickUpload}>
      <Text style={styles.uploatText}>저장</Text>
    </TouchableOpacity>
  );
};

const BackLandings = () => {
  const { information, song, images } = useDailyCreate();

  const onPressBack = () => {
    navigate('DailyCreate', {
      data: { information, song, images },
    });
  };

  return (
    <TouchableOpacity style={styles.backContainer} title="back" onPress={onPressBack}>
      <Icon source={require('public/icons/back-40.png')} style={style.icons} />
    </TouchableOpacity>
  );
};
export default function DailyUpload({ data }) {
  const { setParams } = useDailyCreate();

  useEffect(() => {
    if (data) {
      setParams(data);
    }
  }, [data]);

  return (
    <View style={style.background}>
      <Header
        titleStyle={style.headertitle}
        title="데일리 작성"
        landings={[<BackLandings />]}
        actions={[<NextActions />]}
      />
      <UploadInfo />
      <UploadHashtag />
    </View>
  );
}

const styles = StyleSheet.create({
  uploatText: {
    fontSize: FS(14),
    color: MAIN_COLOR,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
