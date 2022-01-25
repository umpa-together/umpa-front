import React, { createContext, useContext, useState, useRef } from 'react';
import { Context as PlaylistContext } from 'context/Playlist';

const CommentContext = createContext(null);

export const useComment = () => useContext(CommentContext);

export default function CommentProvider({ children }) {
  const [commentType, setCommentType] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const commentRef = useRef();
  const {
    state: { currentPlaylist },
    addComment: addPlaylistComment,
    addRecomment: addPlaylistRecomment,
  } = useContext(PlaylistContext);

  const commentAction = (text) => {
    if (commentType === 'playlistComment') {
      addPlaylistComment({ id: currentPlaylist._id, text });
    } else if (commentType === 'playlistRecomment') {
      addPlaylistRecomment({ id: currentPlaylist._id, commentId, text });
      setCommentId(null);
      setCommentType('playlistComment');
    } else if (commentType === 'dailyComment') {
      console.log('dailyComment');
    } else if (commentType === 'dailyRecomment') {
      console.log('dailyRecomment');

      setCommentId(null);
      setCommentType('dailyComment');
    }
  };

  const setCommentInfo = (type, id) => {
    setCommentType(type);
    if (id) setCommentId(id);
  };

  const value = {
    commentRef,
    commentType,
    commentAction,
    setCommentId,
    setCommentInfo,
  };

  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
}
