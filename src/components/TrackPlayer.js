import TrackPlayer from 'react-native-track-player';

const addtracksong= async ({ data, setIsPlayingid, setHarmfulModal }) => {
    const track = new Object();
    track.id = data.id;
    track.url = data.attributes.previews[0].url;
    track.title = data.attributes.name;
    track.artist = data.attributes.artistName;
    if (data.attributes.contentRating != "explicit") {
        setIsPlayingid(data.id);
        await TrackPlayer.reset()
        await TrackPlayer.add(track);
        TrackPlayer.play();
    } else {
        setHarmfulModal(true);
    }
};

const stoptracksong= async ({ setIsPlayingid }) => {    
    setIsPlayingid('0');
    await TrackPlayer.reset()
};

export { addtracksong, stoptracksong }