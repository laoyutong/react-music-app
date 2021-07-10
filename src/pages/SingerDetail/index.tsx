import React, { useEffect, useState } from "react";
import "./index.less";
import { useLocation } from "react-router-dom";
import qs from "query-string";

import artistsApi, { SingerDetailData } from "@/api/artists";
import type { IRouterComponentProps } from "@/router";
import {
  useAddMusicPlaylist,
  useSetMusicPlaylist,
} from "@/store/musicPlaylistReducer";

import BackHeader from "@/components/BackHeader";
import PlayAll from "@/components/PlayAll";

type ISingerMsg = SingerDetailData["artist"];

const SingerDetail = ({ onRouterBack }: IRouterComponentProps): JSX.Element => {
  const [singerMsg, setSingerMsg] = useState<ISingerMsg>({} as ISingerMsg);

  const [singerSongs, setSingerSongs] = useState<SingerDetailData["hotSongs"]>(
    []
  );

  const location = useLocation();

  useEffect(() => {
    (async () => {
      const { id } = qs.parse(location.search);

      const { artist, hotSongs } = await artistsApi(id as string);
      setSingerMsg(artist);
      setSingerSongs(hotSongs);
    })();
  }, []);

  const addMusicPlaylist = useAddMusicPlaylist();

  const setMusicPlaylist = useSetMusicPlaylist();

  return (
    <div className="singer-detail-container">
      <BackHeader onBack={onRouterBack} title={singerMsg.name} />
      <div className="singer-pic">
        <img src={singerMsg.picUrl} alt="" />
      </div>
      <PlayAll onClick={() => setMusicPlaylist(singerSongs)} />
      {singerSongs.map(({ id, name }) => (
        <div
          className="singer-songs-item"
          key={id}
          onClick={() => addMusicPlaylist({ id, name })}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default SingerDetail;
