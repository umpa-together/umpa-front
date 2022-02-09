import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Header from 'components/Header';
import style from 'constants/styles';
import { navigate } from 'lib/utils/navigation';
import { useDailyCreate } from 'providers/dailyCreate';
import SongActionsProvider from 'providers/songActions';
import CreateSong from 'components/Daily/CreateSong';
import CreateInput from 'components/Daily/CreateInput';
import CreatePhoto from 'components/Daily/CreatePhoto';
import CreateImageLists from 'components/Daily/CreateImageLists';
import { COLOR_5, MAIN_COLOR } from 'constants/colors';
import FS, { SCALE_WIDTH } from 'lib/utils/normalize';
import { useScroll } from 'providers/scroll';
import { useModal } from 'providers/modal';
import ValidityModal from 'components/Modal/ValidityModal';
import Text from 'components/Text';
import KeyboardProvider from 'providers/keyboard';

const NextActions = ({ edit, setValidityMsg }) => {
  const [validity, setValidity] = useState(false);
  const { information, song, images, setImages } = useDailyCreate();
  const { arraySortImage } = useScroll();
  const { onValidityModal } = useModal();

  const onPressNext = async () => {
    if (validity) {
      const imageChange = arraySortImage(images, setImages);
      navigate('DailyUpload', {
        data: { information, song, images: imageChange },
        edit,
      });
    } else if (!song) {
      setValidityMsg('※ 데일리 곡을 선택해주세요');
      onValidityModal();
    }
  };
  useEffect(() => {
    if (information.content.length > 0 && song) {
      setValidity(true);
    }
  }, [information, song]);

  return (
    <TouchableOpacity onPress={onPressNext}>
      <Text style={validity ? styles.activeText : styles.inactiveText}>다음</Text>
    </TouchableOpacity>
  );
};

export default function DailyCreate({ data, edit }) {
  const { setParams } = useDailyCreate();
  const { validityModal } = useModal();
  const [validityMsg, setValidityMsg] = useState('');

  useEffect(() => {
    if (data) {
      setParams(data);
    }
  }, [data]);

  return (
    <View style={style.background}>
      <Header
        title={edit ? '데일리 편집' : '데일리 작성'}
        titleStyle={style.headertitle}
        back
        actions={[<NextActions setValidityMsg={setValidityMsg} edit={edit} />]}
      />
      <SongActionsProvider>
        <CreateSong />
      </SongActionsProvider>
      <CreateInput />
      <CreateImageLists edit={edit} />
      <KeyboardProvider>
        <CreatePhoto setValidityMsg={setValidityMsg} edit={edit} />
      </KeyboardProvider>
      {validityModal && <ValidityModal title={validityMsg} />}
    </View>
  );
}

const styles = StyleSheet.create({
  activeText: {
    fontSize: FS(14),
    color: MAIN_COLOR,
    paddingVertical: 10 * SCALE_WIDTH,
    paddingHorizontal: 10 * SCALE_WIDTH,
  },
  inactiveText: {
    fontSize: FS(14),
    color: COLOR_5,
  },
});
