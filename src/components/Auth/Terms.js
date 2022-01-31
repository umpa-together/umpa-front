import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { MAIN_COLOR, COLOR_2, COLOR_3, COLOR_4 } from 'constants/colors';
import style from 'constants/styles';
import { useSignUp } from 'providers/signUp';
import Icon from 'widgets/Icon';
import TermModalView from 'components/Modal/TermModal';

export default function Terms() {
  const [termModal, setTermModal] = useState(false);
  const [type, setType] = useState(null);
  const { onClickTerm, information } = useSignUp();
  const termLists = [
    { title: '전체 동의', key: 'allTerm' },
    { title: '이용약관 동의 (필수)', key: 'useTerm' },
    { title: '개인정보 수집 및 이용동의 (필수)', key: 'privateTerm' },
  ];

  const onClickMore = (item) => {
    setType(item);
    setTermModal(true);
  };

  return (
    <View style={styles.container}>
      {termLists.map((term) => {
        const { title, key } = term;
        return (
          <View
            key={key}
            style={[
              style.flexRow,
              style.space_between,
              styles.section,
              key === 'allTerm' && styles.all,
            ]}
          >
            <View style={style.flexRow}>
              <TouchableOpacity onPress={() => onClickTerm(key)}>
                {information[key] && key ? (
                  <Icon source={require('public/icons/term-check.png')} style={styles.check} />
                ) : (
                  <Icon source={require('public/icons/term-uncheck.png')} style={styles.check} />
                )}
              </TouchableOpacity>
              <Text style={key === 'allTerm' ? styles.title : styles.sub}>
                {title}
                <Text style={styles.active}>{key === 'allTerm' && ' *'}</Text>
              </Text>
            </View>
            {key !== 'allTerm' && (
              <TouchableOpacity style={styles.moreBottom} onPress={() => onClickMore(key)}>
                <Text style={styles.more}>자세히보기</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
      <TermModalView modal={termModal} setModal={setTermModal} type={type} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1 * SCALE_HEIGHT,
    borderColor: '#f1f1f1',
    width: 343 * SCALE_WIDTH,
  },
  section: {
    paddingVertical: 10 * SCALE_HEIGHT,
    borderRadius: 2 * SCALE_HEIGHT,
    paddingLeft: 15 * SCALE_WIDTH,
    paddingRight: 13 * SCALE_WIDTH,
  },
  active: {
    color: MAIN_COLOR,
  },
  title: {
    fontSize: FS(14),
    color: COLOR_2,
  },
  all: {
    backgroundColor: '#f1f1f1',
    borderTopLeftRadius: 2 * SCALE_HEIGHT,
    borderTopRightRadius: 2 * SCALE_HEIGHT,
  },
  sub: {
    fontSize: FS(14),
    color: COLOR_4,
  },
  more: {
    fontSize: FS(11),
    color: COLOR_3,
  },
  moreBottom: {
    borderBottomWidth: 1 * SCALE_HEIGHT,
    borderBottomColor: COLOR_3,
  },
  check: {
    width: 30 * SCALE_WIDTH,
    height: 30 * SCALE_WIDTH,
  },
});
