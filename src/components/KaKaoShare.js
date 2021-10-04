import KakaoShareLink from 'react-native-kakao-share-link';

export default SendList = async ({ playlist }) => {
    const { title, songs } = playlist

    songs.forEach(({ attributes }) => {
        attributes.artwork.url = attributes.artwork.url.replace('{w}', '300')
        attributes.artwork.url = attributes.artwork.url.replace('{h}', '300')
    })

    try {
        await KakaoShareLink.sendList({
            headerTitle: title,
            headerLink: {
                webUrl: 'https://developers.kakao.com/',
                mobileWebUrl: 'https://developers.kakao.com/',
            },
            contents: [
              {
                title: songs[0].attributes.name,
                imageUrl: songs[0].attributes.artwork.url,
                link: {
                    webUrl: 'https://developers.kakao.com/',
                    mobileWebUrl: 'https://developers.kakao.com/',
                },
                description: songs[0].attributes.artistName,
              },
              {
                title: songs[1].attributes.name,
                imageUrl: songs[1].attributes.artwork.url,
                link: {
                    webUrl: 'https://developers.kakao.com/',
                    mobileWebUrl: 'https://developers.kakao.com/',
                },
                description: songs[1].attributes.artistName,
              },
              {
                title: songs[2].attributes.name,
                imageUrl: songs[2].attributes.artwork.url,
                link: {
                    webUrl: 'https://developers.kakao.com/',
                    mobileWebUrl: 'https://developers.kakao.com/',
                },
                description: songs[2].attributes.artistName,
              },
            ],
            buttons: [{
                title: '음파 이용하러 가기',
                link: {
                    webUrl: 'https://developers.kakao.com/',
                    mobileWebUrl: 'https://developers.kakao.com/',
                }
            }]
        })
    } catch (e) {
        console.error(e);
        console.error(e.message);
    }
}

export const SendFeed = async ({ daily }) => {
    const { song, likes, comments, textcontent, views } = daily

    song.attributes.artwork.url = song.attributes.artwork.url.replace('{w}', '300')
    song.attributes.artwork.url = song.attributes.artwork.url.replace('{h}', '300')
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
                viewCount: views
            },
            buttons: [{
                title: '음파 이용하러 가기'
            }]
        });
    } catch (e) {
      console.error(e);
      console.error(e.message);
    }
}