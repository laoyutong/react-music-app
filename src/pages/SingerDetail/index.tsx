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

  const handledSingerSongs = singerSongs.map(
    ({ id, name, al: { picUrl } }) => ({
      id,
      name,
      picUrl,
    })
  );

  return (
    <div className="singer-detail-container">
      <BackHeader onBack={onRouterBack} title={singerMsg.name} />
      <div className="singer-pic">
        <img src={singerMsg.picUrl} alt="" />
      </div>
      <PlayAll onClick={() => setMusicPlaylist(handledSingerSongs)} />
      {handledSingerSongs.map(({ id, name, picUrl }) => (
        <div
          className="singer-songs-item"
          key={id}
          onClick={() => addMusicPlaylist({ id, name, picUrl })}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default SingerDetail;
