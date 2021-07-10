import { useCallback } from "react";
import produce from "immer";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";

import { StoreState } from "./types";

type MusicPlaylist = StoreState["musicPlaylist"];

const SET_MUSIC_PLAYLIST = "SET_MUSIC_PLAYLIST" as const;

const ADD_MUSIC_PLAYLIST = "ADD_MUSIC_PLAYLIST" as const;

const setMusicPlaylistAction = (payload: MusicPlaylist) => ({
  type: SET_MUSIC_PLAYLIST,
  payload,
});

const addMusicPlaylistAction = (payload: MusicPlaylist[number]) => ({
  type: ADD_MUSIC_PLAYLIST,
  payload,
});

export const useAddMusicPlaylist = () => {
  const dispatch = useDispatch();
  return useCallback((payload) => {
    dispatch(addMusicPlaylistAction(payload));
  }, []);
};

export const useSetMusicPlaylist = () => {
  const dispatch = useDispatch();
  return useCallback((payload) => {
    dispatch(setMusicPlaylistAction(payload));
  }, []);
};

export default (state = [] as MusicPlaylist, { type, payload }: AnyAction) => {
  switch (type) {
    case SET_MUSIC_PLAYLIST:
      return payload;
    case ADD_MUSIC_PLAYLIST:
      return produce(state, (draft) => {
        draft.unshift(payload);
      });
    default:
      return state;
  }
};
