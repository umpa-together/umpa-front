import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import AnnouncementForm from 'components/Setting/AnnouncementForm';
import Header from 'components/Header';
import style from 'constants/styles';
import { COLOR_1, COLOR_2 } from 'constants/colors';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';

export default function SelectedAnnouncement({ title, content, time }) {
  return (
    <View style={style.background}>
      <Header title="공지사항" back titleStyle={styles.title} />
      <ScrollView contentContainerStyle={styles.container}>
        <AnnouncementForm title={title} time={time} content={content} />
        <Text style={styles.content}>{content}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: COLOR_1,
    fontSize: FS(18),
  },
  container: {
    paddingTop: 27 * SCALE_HEIGHT,
    marginHorizontal: 16 * SCALE_WIDTH,
  },
  content: {
    fontSize: FS(14),
    lineHeight: 26 * SCALE_HEIGHT,
    color: COLOR_2,
  },
});
