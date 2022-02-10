import KakaoShareLink from 'react-native-kakao-share-link';

// 플리 공유하기
const SendList = async ({ playlist }) => {
  const { title, songs } = playlist;

  songs.forEach(({ attributes }) => {
    attributes.artwork.url = attributes.artwork.url.replace('{w}', '300');
    attributes.artwork.url = attributes.artwork.url.replace('{h}', '300');
  });
  const contents = songs.map((song) => {
    return {
      title: song.attributes.name,
      imageUrl: song.attributes.artwork.url,
      link: {
        webUrl: 'https://developers.kakao.com/',
        mobileWebUrl: 'https://developers.kakao.com/',
      },
      description: song.attributes.artistName,
    };
  });

  try {
    await KakaoShareLink.sendList({
      headerTitle: title,
      headerLink: {
        webUrl: 'https://developers.kakao.com/',
        mobileWebUrl: 'https://developers.kakao.com/',
      },
      contents,
      buttons: [
        {
          title: '음파 이용하러 가기',
          link: {
            webUrl: 'https://developers.kakao.com/',
            mobileWebUrl: 'https://developers.kakao.com/',
          },
        },
      ],
    });
  } catch (e) {
    console.error(e);
    console.error(e.message);
  }
};

// 데일리 공유하기
export const SendFeed = async ({ daily }) => {
  const { song, likes, comments, textcontent } = daily;

  song.attributes.artwork.url = song.attributes.artwork.url.replace('{w}', '300');
  song.attributes.artwork.url = song.attributes.artwork.url.replace('{h}', '300');
  try {
    await KakaoShareLink.sendFeed({
      content: {
        title: `${song.attributes.name} - ${song.attributes.artistName}`,
        imageUrl: song.attributes.artwork.url,
        link: {
          webUrl: 'https://developers.kakao.com/',
          mobileWebUrl: 'https://developers.kakao.com/',
        },
        description: textcontent,
      },
      social: {
        commentCount: comments.length,
        likeCount: likes.length,
      },
      buttons: [
        {
          title: '음파 이용하러 가기',
          link: {
            webUrl: 'https://developers.kakao.com/',
            mobileWebUrl: 'https://developers.kakao.com/',
          },
        },
      ],
    });
  } catch (e) {
    console.error(e);
    console.error(e.message);
  }
};

export default SendList;
