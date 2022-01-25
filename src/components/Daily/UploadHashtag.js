import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDailyCreate } from 'providers/dailyCreate';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR, COLOR_3, SUB_COLOR } from 'constants/colors';
import style from 'constants/styles';
import HashtagModal from 'components/Modal/HashtagModal';

export default function UploadHashtag() {
  const [hashtagModal, setHashtagModal] = useState(false);
  const {
    information: { hashtags },
    onClickAddHashtag,
    onClickDeleteHashtag,
  } = useDailyCreate();
  const info = {
    data: hashtags,
    deleteAction: onClickDeleteHashtag,
    addAction: onClickAddHashtag,
  };
  const hashtagCheck = hashtags.length;

  const onPressAdd = () => {
    setHashtagModal(true);
  };
  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View style={[styles.touchContainer, style.flexRow]}>
          {hashtags.map((item) => {
            return (
              <View key={item} style={styles.hashtagBox}>
                <Text style={styles.hashtagsStyle}>{`# ${item}`}</Text>
              </View>
            );
          })}
          <TouchableOpacity
            onPress={onPressAdd}
            style={[styles.hashtagEditBox, hashtagCheck && styles.hashtagEdit]}
          >
            <Text style={[styles.hashtagEditStyle, hashtagCheck && styles.hashtagEdit]}>
              {hashtagCheck ? '+ 태그 편집' : '+ 태그 추가'}
            </Text>
          </TouchableOpacity>
          <HashtagModal info={info} modal={hashtagModal} setModal={setHashtagModal} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: 17 * SCALE_HEIGHT,
    height: 86 * SCALE_HEIGHT,
    shadowColor: '#000',
    shadowOffset: {
      height: -1 * SCALE_WIDTH,
      width: 0,
    },
    backgroundColor: '#fff',
    shadowRadius: 2 * SCALE_WIDTH,
    shadowOpacity: 0.1,
  },
  touchContainer: {
    marginLeft: 18 * SCALE_WIDTH,
  },
  iconStyle: {
    width: 24 * SCALE_WIDTH,
    height: 24 * SCALE_WIDTH,
  },
  addText: {
    color: MAIN_COLOR,
    fontSize: FS(14),
    marginLeft: 7 * SCALE_WIDTH,
  },
  hashtagEditStyle: {
    paddingLeft: 9 * SCALE_WIDTH,
    paddingRight: 10 * SCALE_WIDTH,
    paddingVertical: 7 * SCALE_HEIGHT,
    fontSize: FS(11),
    color: SUB_COLOR,
  },
  hashtagEditBox: {
    borderRadius: 43 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: SUB_COLOR,
    marginRight: 10 * SCALE_WIDTH,
    alignSelf: 'flex-start',
  },
  hashtagBox: {
    borderRadius: 43 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: MAIN_COLOR,
    marginRight: 10 * SCALE_WIDTH,
    alignSelf: 'flex-start',
  },
  hashtagsStyle: {
    paddingLeft: 9 * SCALE_WIDTH,
    paddingRight: 10 * SCALE_WIDTH,
    paddingVertical: 7 * SCALE_HEIGHT,
    fontSize: FS(11),
    color: MAIN_COLOR,
  },
  hashtagEdit: {
    color: COLOR_3,
    borderColor: COLOR_3,
  },
});
