import React, { useState }from 'react';
import PlaylistProvider from 'providers/playlist'
import CreateMain from 'components/Playlist/CreateMain'
import SearchSong from 'components/Playlist/SearchSong'
import HarmfulModal from 'components/HarmfulModal'

const PlaylistCreatePage = ({ route }) => {
    const { data: playList, isEdit } = route.params
    const [isSearch, setIsSearch] = useState(false)
    
    return (
        <>
            <PlaylistProvider>
                {!isSearch ? 
                <CreateMain isEdit={isEdit} setIsSearch={setIsSearch} playList={playList} /> : 
                <SearchSong isEdit={isEdit} setIsSearch={setIsSearch} playList={playList} /> }
            </PlaylistProvider>
            <HarmfulModal />
        </>
    );
};

export default PlaylistCreatePage; 
