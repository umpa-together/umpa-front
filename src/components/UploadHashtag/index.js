import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR } from 'constants/colors';
import style from 'constants/styles';
import HashtagModal from 'components/Modal/HashtagModal';
import Text from 'components/Text';

export default function UploadHashtag({ info, containerStyle }) {
  const [hashtagModal, setHashtagModal] = useState(false);

  const hashtags = info.data;
  const hashtagCheck = hashtags.length;

  const onPressAdd = () => {
    setHashtagModal(true);
  };
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <View style={[style.flexRow, containerStyle]}>
        {hashtags.map((item) => {
          return (
            <View key={item} style={styles.hashtagBox}>
              <Text style={styles.hashtagsStyle}>{`# ${item}`}</Text>
            </View>
          );
        })}
        <TouchableOpacity onPress={onPressAdd} style={[styles.hashtagBox, styles.hashtagEdit]}>
          <Text style={[styles.hashtagsStyle, styles.hashtagEdit]}>
            {hashtagCheck ? '+ 태그 편집' : '+ 태그 추가'}
          </Text>
        </TouchableOpacity>
        <HashtagModal info={info} modal={hashtagModal} setModal={setHashtagModal} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hashtagBox: {
    borderRadius: 43 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: MAIN_COLOR,
    marginRight: 10 * SCALE_WIDTH,
    alignSelf: 'flex-start',
  },
  hashtagsStyle: {
    paddingLeft: 8 * SCALE_WIDTH,
    paddingRight: 9 * SCALE_WIDTH,
    paddingVertical: 6 * SCALE_HEIGHT,
    fontSize: FS(12),
    color: MAIN_COLOR,
  },
  hashtagEdit: {
    color: MAIN_COLOR,
    borderColor: MAIN_COLOR,
  },
});
