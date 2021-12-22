import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'initSearch':
      return {
        songData: null,
        nextSongUrl: null,
        notNextSong: false,
        artistData: null,
        nextArtistUrl: null,
        notNextArtist: false,
        albumData: null,
        nextAlbumUrl: null,
        notNextAlbum: false,
        hint: null,
      };
    case 'searchSong':
      return { ...state, songData: action.payload[0], nextSongUrl: action.payload[1] };
    case 'searchArtist':
      return { ...state, artistData: action.payload[0], nextArtistUrl: action.payload[1] };
    case 'searchAlbum':
      return { ...state, albumData: action.payload[0], nextAlbumUrl: action.payload[1] };
    case 'nextSong':
      return {
        ...state,
        songData: state.songData.concat(action.payload[0]),
        nextSongUrl: action.payload[1],
      };
    case 'nextArtist':
      return {
        ...state,
        artistData: state.artistData.concat(action.payload[0]),
        nextArtistUrl: action.payload[1],
      };
    case 'nextAlbum':
      return {
        ...state,
        albumData: state.albumData.concat(action.payload[0]),
        nextAlbumUrl: action.payload[1],
      };
    case 'notNextSong':
      return { ...state, notNextSong: true };
    case 'notNextArtist':
      return { ...state, notNextArtist: true };
    case 'notNextAlbum':
      return { ...state, notNextAlbum: true };
    case 'searchHint':
      return { ...state, hint: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const initSearch = (dispatch) => () => {
  try {
    dispatch({ type: 'initSearch' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initSearch' });
  }
};

const searchSong =
  (dispatch) =>
  async ({ songname }) => {
    try {
      const response = await server.get(`/searchMusic/song/${songname}`);
      dispatch({ type: 'searchSong', payload: response.data });
      if (response.data[1] === null) {
        dispatch({ type: 'notNextSong' });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with searchSong' });
    }
  };

const searchArtist =
  (dispatch) =>
  async ({ artistname }) => {
    try {
      const response = await server.get(`/searchMusic/artist/${artistname}`);
      dispatch({ type: 'searchArtist', payload: response.data });
      if (response.data[1] === null) {
        dispatch({ type: 'notNextArtist' });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with searchArtist' });
    }
  };

const searchAlbum =
  (dispatch) =>
  async ({ albumname }) => {
    try {
      const response = await server.get(`/searchMusic/album/${albumname}`);
      dispatch({ type: 'searchAlbum', payload: response.data });
      if (response.data[1] === null) {
        dispatch({ type: 'notNextAlbum' });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with searchAlbum' });
    }
  };

const searchNext =
  (dispatch) =>
  async ({ nextUrl }) => {
    try {
      const response = await server.get(`/searchMusic/next/${nextUrl}`);
      if (nextUrl[nextUrl.length - 2] === 'g') {
        if (response.data[0].length !== 0) {
          dispatch({ type: 'nextSong', payload: response.data });
        } else {
          dispatch({ type: 'notNextSong' });
        }
      } else if (nextUrl[nextUrl.length - 2] === 't') {
        if (response.data[0].length !== 0) {
          dispatch({ type: 'nextArtist', payload: response.data });
        } else {
          dispatch({ type: 'notNextArtist' });
        }
      } else if (nextUrl[nextUrl.length - 2] === 'm') {
        if (response.data[0].length !== 0) {
          dispatch({ type: 'nextAlbum', payload: response.data });
        } else {
          dispatch({ type: 'notNextAlbum' });
        }
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with searchNext' });
    }
  };

const searchHint =
  (dispatch) =>
  async ({ term }) => {
    try {
      const response = await server.get(`/searchMusic/hint/${term}`);
      dispatch({ type: 'searchHint', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with searchHint' });
    }
  };

export const { Provider, Context } = createDataContext(
  searchReducer,
  {
    initSearch,
    searchSong,
    searchArtist,
    searchAlbum,
    searchNext,
    searchHint,
  },
  {
    songData: null,
    nextSongUrl: null,
    notNextSong: false,
    artistData: null,
    nextArtistUrl: null,
    notNextArtist: false,
    albumData: null,
    nextAlbumUrl: null,
    notNextAlbum: false,
    hint: null,
    errorMessage: '',
  },
);
