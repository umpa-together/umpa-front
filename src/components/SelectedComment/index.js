import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CommentView from 'components/CommentView';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import Icon from 'widgets/Icon';
import SortModal from 'components/Modal/SortModal';
import { Provider as ReportProvider } from 'context/Report';
import { useComment } from 'providers/comment';

export default function SelectedComment({ opt, comments }) {
  const [sortModal, setSortModal] = useState(false);
  const [sortType, setSortType] = useState('시간순');
  const { setCommentInfo } = useComment();
  const sortList = [
    { title: '좋아요순', key: 'like' },
    { title: '시간순', key: 'time' },
  ];

  const onPressSort = () => {
    setSortModal(true);
  };

  const sortFunction = (key) => {
    if (key === 'like') {
      comments.sort(function (a, b) {
        if (a.likes.length > b.likes.length) return -1;
        if (a.likes.length > b.likes.length) return 0;
        return 1;
      });
      setSortType('좋아요순');
    } else {
      comments.sort(function (a, b) {
        if (a.time > b.time) return 1;
        if (a.time > b.time) return 0;
        return -1;
      });
      setSortType('시간순');
    }
    setSortModal(false);
  };

  useEffect(() => {
    if (opt === 'playlist') {
      setCommentInfo('playlistComment');
    } else if (opt === 'daily') {
      setCommentInfo('dailyComment');
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={[style.flexRow, style.space_between]}>
        <Text style={styles.textTitle}>댓글</Text>
        <TouchableOpacity onPress={onPressSort} style={style.flexRow}>
          <Text style={styles.textSort}>{sortType}</Text>
          <Icon style={styles.smallIcon} source={require('public/icons/sort-down.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.commentContainer}>
        <ReportProvider>
          {comments.map((item) => {
            const { recomment } = item;
            return (
              <View key={item._id}>
                <CommentView
                  opt={opt === 'playlist' ? 'playlistComment' : 'dailyComment'}
                  comment={item}
                />
                {recomment.length > 0 &&
                  recomment.map((comment) => {
                    return (
                      <CommentView
                        opt={opt === 'playlist' ? 'playlistRecomment' : 'dailyRecomment'}
                        key={comment._id}
                        comment={comment}
                      />
                    );
                  })}
              </View>
            );
          })}
        </ReportProvider>
      </View>
      <SortModal
        modal={sortModal}
        setModal={setSortModal}
        sortInfo={{
          list: sortList,
          func: sortFunction,
          current: sortType,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16 * SCALE_WIDTH,
  },
  commentContainer: {
    paddingTop: 22 * SCALE_HEIGHT,
    paddingBottom: 8 * SCALE_HEIGHT,
  },
  textTitle: {
    fontSize: FS(16),
  },
  textSort: {
    fontSize: FS(14),
    color: '#5F5F5F',
  },
  smallIcon: {
    width: 10 * SCALE_WIDTH,
    height: 5 * SCALE_HEIGHT,
    marginLeft: 5 * SCALE_WIDTH,
  },
});
