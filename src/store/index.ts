import { createStore, combineReducers } from "redux";

import musicPlaylist from "./musicPlaylistReducer";
import musicPlayIndex from "./musicPlayIndexReducer";

export default createStore(combineReducers({ musicPlaylist, musicPlayIndex }));
