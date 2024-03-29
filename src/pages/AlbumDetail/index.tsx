import React, { useEffect, useState } from "react";
import "./index.less";
import qs from "query-string";
import { useLocation } from "react-router-dom";
import { observer } from "@formily/reactive-react";

import store from "@/store";
import playlistDetailApi, { AlbumDetailData } from "@/api/playlistDetail";
import type { IRouterComponentProps } from "@/router";

import BackHeader from "@/components/BackHeader";
import PlayAll from "@/components/PlayAll";

type IAlbumPlaylist = AlbumDetailData["playlist"];

const AlbumDetail = ({ onRouterBack }: IRouterComponentProps): JSX.Element => {
  const { search } = useLocation();

  const [albumData, setAlbumData] = useState<IAlbumPlaylist>(
    {} as IAlbumPlaylist
  );

  const albumTracks = albumData.tracks || [];

  useEffect(() => {
    (async () => {
      const { id } = qs.parse(search);
      const { playlist } = await playlistDetailApi(id as string);
      setAlbumData(playlist);
    })();
  }, []);

  const handledAlbumTracks = albumTracks.map(
    ({ id, name, al: { picUrl } }) => ({
      id,
      name,
      picUrl,
    })
  );

  return (
    <div className="album-detail-container">
      <BackHeader title={albumData.name} onBack={onRouterBack} />
      <div className="album-detail-pic">
        <img src={albumData.coverImgUrl} alt="" />
      </div>
      <PlayAll
        onClick={() => {
          store.musicPlaylist = handledAlbumTracks;
        }}
      />
      {handledAlbumTracks.map(({ id, name, picUrl }) => (
        <div
          className="album-track-item"
          key={id}
          onClick={() => store.musicPlaylist.unshift({ id, name, picUrl })}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default observer(AlbumDetail);
