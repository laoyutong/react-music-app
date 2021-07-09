import React, { useEffect, useState } from "react";
import "./index.less";
import qs from "query-string";
import { useLocation } from "react-router-dom";

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

  return (
    <div className="album-detail-container">
      <BackHeader title={albumData.name} onBack={onRouterBack} />
      <div className="album-detail-pic">
        <img src={albumData.coverImgUrl} alt="" />
      </div>
      <PlayAll />
      {albumTracks.map(({ id, name }) => (
        <div className="album-track-item" key={id}>
          {name}
        </div>
      ))}
    </div>
  );
};

export default AlbumDetail;
