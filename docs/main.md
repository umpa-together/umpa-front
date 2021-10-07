# __Documentation__

## __Index__
## src
+ [components](#components)
+ [providers](#providers)
+ [context](#context)

<br />

## __Components__
## `__DeleteModal__`
삭제 버튼을 눌렀을 때, 나타나는 되는 모달 입니다.
삭제 상황 : 플레이리스트, 데일리, 게시판, 댓글, 대댓글, 스토리
|Property|Default (Nullable)|Remark|
|---|---|---|
|deleteModal|`null`|-|
|setDeleteModal|`null`|-|
|type|`null`|삭제 시키기 위한 함수와 출력되는 title을 구분합니다.|
|subjectId|`null`|삭제 함수의 sub parameter로 이용됩니다.|
|playlistId|`null`|playlist 관련 삭제 함수의 parameter로 이용됩니다.|
|dailyId|`null`|daily 관련 삭제 함수의 parameter로 이용됩니다.|
### __Usage__
```
<DeleteModal 
    deleteModal={deleteModal} 
    setDeleteModal={setDeleteModal} 
    type={'todaySong'} 
/> 
```
<br/>

## `__ReportModal__`
신고 버튼을 눌렀을 때, 나타나는 모달 입니다.
신고 상황 : 게시글, 댓글, 플레이리스트, 계정, 채팅
|Property|Default (Nullable)|Remark|
|---|---|---|
|reportModal|`null`|-|
|setReportModal|`null`|-|
|type|`null`|신고하기 위한 함수와 출력되는 title을 구분합니다.|
|subjectId|`null`|신고 대상을 구분하기 위한 parameter입니다.|
### __Usage__
```
<ReportModal 
    reportModal={reportModal} 
    setReportModal={setReportModal} 
    type={'chat'} 
    subjectId={user._id}
/>
```
<br/>

## `__RepresentSong__`
유저의 대표곡 리스트를 보기 위한 모달 입니다.
|Property|Default (Nullable)|Remark|
|---|---|---|
|representModal|`null`|-|
|setRepresentModal|`null`|-|
|song|`null`|대표곡 리스트를 나타냅니다.|
|myAccount|`null`|나의 대표곡의 경우 수정버튼을 넣기 위해 존재합니다.|
### __Usage__
```
<RepresentSong 
    representModal={representModal} 
    setRepresentModal={setRepresentModal} 
    song={song} 
    myAccount
/>
```
<br/>

## `__FontNormalize__`
핸드폰 기기에 맞추어 반응형으로 사이즈를 조절하게끔 비율을 계산하는 컴포넌트 입니다.
### __Usage__
```
container: {
    width : 305 * tmpWidth,
    height : 94 * tmpWidth,
    backgroundColor: 'rgb(254,254,254)',
    borderRadius: 8 * tmpWidth, 
    alignItems: 'center',
},
```
<br/>

## `__Header__`
스크린의 상단 헤더 부분을 담당하는 컴포넌트 입니다.
### Header, PlaylistHeader
|Property|Default (Nullable)|Remark|
|---|---|---|
|title|-|헤더의 title을 담당합니다.|
### NavHeader 
|Property|Default (Nullable)|Remark|
|---|---|---|
|title|-|헤더의 title을 담당합니다.|
|isBack|`false`|true일 시 왼쪽의 back 버튼이 활성화됩니다.|
### ChatHeader
|Property|Default (Nullable)|Remark|
|---|---|---|
|title|-|헤더의 title을 담당합니다.|
|callback|`null`|Chat components의 뒤로가기 callback을 호출합니다.|
|isCreate|`false`|Chat components의 화면을 구분합니다.|
### __Usage__
```
<Header 
    title="대표곡"
/>
<NavHeader 
    title="공유한 음악" 
    isBack 
/>
<ChatHeader 
    title={"새 메시지"} 
    isCreate
    callback={getChatList} 
/>
```
<br/>

## `__Header__`
카카오톡 공유하기를 담당하는 컴포넌트 입니다.
SendList는 플레이리스트, SendFeed는 데일리에 이용됩니다.
## SendList
|Property|Default (Nullable)|Remark|
|---|---|---|
|playlist|-|playlist의 데이터 추출을 위해 이용됩니다.|
## SendFeed
|Property|Default (Nullable)|Remark|
|---|---|---|
|daily|-|daily의 데이터 추출을 위해 이용됩니다.|
### __Usage__
```
onPress={() => SendList({ playlist })}
```
<br/>

## `__LoadingIndicator__`
서버로부터 data fecth가 되기전 nullable할 때, 로딩시 필요한 컴포넌트 입니다.
### __Usage__
```
{ state.dj === null && state.playList === null<LoadingIndicator /> : <View>...</View> }
```
<br/>

## `__MoveText__`
노래 제목과 아티스트 이름이 View 넓이 영역보다 길 때, 노래를 활성화 시키면 text를 움직입니다.
|Property|Default (Nullable)|Remark|
|---|---|---|
|container|`null`|View의 넓이 영역을 설정합니다.|
|text|-|노래 제목, 아티스트 이름|
|isMove|`false`|노래를 활성화 했을 때 true.|
|isExplicit|`false`|19세 음악의 경우 true.|
|textStyles|`null`|text의 style을 설정합니다.|
### __Usage__
```
<MoveText 
    container={contentRating === 'explicit' ? styles.explicitName : styles.nameBox} 
    text={name} 
    isMove={id === isPlayingId} 
    isExplicit={contentRating === 'explicit'} 
    textStyles={styles.name} 
/>
```
<br/>

## `__ProfileImage__`
프로필 이미지를 렌더하기 위한 컴포넌트로 프로필 이미지가 등록되지 않았을 때는 기본 이미지를 나타냅니다.
|Property|Default (Nullable)|Remark|
|---|---|---|
|img|''|프로필 이미지의 url을 받습니다.|
|imgStyle|`null`|프로필 이미지의 style을 설정합니다.|
### __Usage__
```
<ProfileImage img={user.profileImage} imgStyle={styles.profileImg}/>
```
<br/>
 
## `__SongImage__`
앨범 이미지의 url 사이즈를 바꾸어준 후, 렌더링을 담당합니다.
## SongImage
|Property|Default (Nullable)|Remark|
|---|---|---|
|size|-|앨범의 크기를 설정합니다. (가로, 세로 동일)|
|border|-|borderRadius 크기를 설정합니다.|
|url|-|앨범의 url을 설정합니다.|
|opac|`1.0`|opacity를 설정합니다.|
## SongImageBack
|Property|Default (Nullable)|Remark|
|---|---|---|
|width|-|앨범의 가로를 설정합니다.|
|height|-|앨범의 세로를 설정합니다.|
|border|-|borderRadius 크기를 설정합니다.|
|url|-|앨범의 url을 설정합니다.|
|opac|`1.0`|opacity를 설정합니다.|
|imgStyle|`null`|추가적인 이미지 style을 설정합니다.|
### __Usage__
```
<SongImage 
    url={item.attributes.artwork.url} 
    size={57} 
    border={57}
/>
<SongImageBack 
    url={currentSong.song.attributes.artwork.url} 
    width={375} 
    height={812} 
    opac={0.8} 
    border={0} 
    imgStyle={styles.backgroundImg} 
/>
```
<br/>

## __Providers__
## __`TrackPlayerProvider`__
음악 재생, 정지와 같은 흐름을 제어합니다.
|Context Prop|Remark|
|---|---|
|isPlayingId|-|
|currentSong|현재 재생중인 곡을 설정합니다.|
|position|현재 재생 위치를 설정합니다.|
|duration|총 재생 길이를 설정합니다. (약 30초)|
|isMute|정지 여부를 설정합니다.|
|addtracksong|곡을 재생합니다.|
|stoptracksong|곡을 멈춥니다.|
|onClickVolume|음소거 toggle을 담당합니다.|
### __Usage__
```
const onClickCover = (song) => {
    if(isPlayingId === song.id) {
        stoptracksong()
    } else { 
        addtracksong({ data: song })
    }
}

useEffect(() => {
    if(duration != 0) {
        reactive.setValue(-width + width * ( position / duration))
    }
}, [position, width, duration])
```
<br/>

## `__SearchProvider__`
곡을 검색하는 부분을 담당합니다.
|Context Prop|Remark|
|---|---|
|text|-|
|textRef|-|
|searchOption|메인 검색부분을 제어합니다.(플레이리스트, 데일리, 서퍼)|
|isHint|현재 검색 전 힌트를 제공하는지 확인합니다.|
|loading|-|
|isresultClick|-|
|onEndReached|-|
|setIsResultClick|-|
|setIsHint|-|
|setText|-|
|setSearchOption|-|
