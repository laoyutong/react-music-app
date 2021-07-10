import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { StoreState } from "./types";

const SET_MUSIC_PLAY_INDEX = "SET_MUSIC_PLAY_INDEX" as const;

type MusicPlaylist = StoreState["musicPlayIndex"];

interface MusicPlayIndexAction {
  type: typeof SET_MUSIC_PLAY_INDEX;
  payload: MusicPlaylist;
}

const setMusicPlayIndexAction = (payload: number) => ({
  type: SET_MUSIC_PLAY_INDEX,
  payload,
});

export const useSetMusicPlayIndex = () => {
  const dispatch = useDispatch();
  return useCallback((payload) => {
    dispatch(setMusicPlayIndexAction(payload));
  }, []);
};

export default (state = 0, { type, payload }: MusicPlayIndexAction) => {
  switch (type) {
    case SET_MUSIC_PLAY_INDEX:
      return payload;
    default:
      return state;
  }
};
