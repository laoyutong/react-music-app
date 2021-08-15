import { observable } from "@formily/reactive";

export interface StoreState {
  musicPlaylist: { id: number; name: string; picUrl: string }[];
  musicPlayIndex: number;
}

const store = observable<StoreState>({
  musicPlaylist: [],
  musicPlayIndex: 0,
});

export default store;
