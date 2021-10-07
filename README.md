<img src="logo.png" width="300" height="300">

# __UMPA__

#### Umpa is an application that can share music tatses each other, find a song with a similar feeling that they want, record their lifes in daily, and communicate with each other in community.
#### Languages: Node.js, React-Native.

<br>

## __Documentation__
You can find how to use components, providers in here.
### [main docs](/docs/main.md)

## __Directory Structure__
All of source files in __/src__ directory 
## /api
For server, AsyncStorage setting. Only exist one files, serverApi.js.
## /assets
Locate static files in here. we only use icons directory.
+ ### /icons
## /components
1. Write part of views in each section.
2. Make reusable components.
+ ### Example: <MainFeed />
## /context
Write Context, Reducer in here.
It is related to global data that is fetched from server used in each section (e.g. Account, Chat, Playlist ...) and it's function(reducer).
+ Auth, Board, Chat, Daily, DJ, Feed, Notice, Playlist, Search, SearchPlaylist, User, Weekly exists.
## /screens
Main Screen of App composed of complex components.
+ ### Account
    + for the related with Account Screen
+ ### Board
    + for the related with Board Screen
+ ### Chat
    + for the related with Chat Screen
+ ### Daily
    + for the related with Daily Screen
+ ### Feed
    + for the related with Feed Screen
+ ### Main
    + for the related with Main Screen
+ ### Playlist
    + for the related with Playlist Screen
## /providers
Write reusable varibles(state), function in many components, screens.
It is not data fetched from server just to use not passing props in every components.
+ ### chat
    + It is for dealing with chat data that is used when text chat.
+ ### daily
    + It is for dealing with daily data that is used when create daily, comments.
+ ### modal
+ ### playlist
    + It is for dealing with playlist data that is used when create playlist, comments.
+ ### search
    + It is for dealing with search song in every section.
+ ### story
    + It is for dealing with story components.
+ ### trackPlayer
    + It is for dealing with trackplayer.
    + main function: addtracksong(), stoptracksong().