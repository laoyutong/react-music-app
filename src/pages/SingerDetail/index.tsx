import React, { useEffect, useState } from "react";
import "./index.less";
import { useLocation } from "react-router-dom";
import qs from "query-string";

import { getSingerDetail } from "@/api/reuqest";
import type { ISingerDetailData } from "@/api/types";
import type { IRouterComponentProps } from "@/router";

import BackHeader from "@/components/BackHeader";
import PlayAll from "@/components/PlayAll";

type ISingerMsg = ISingerDetailData["artist"];

const SingerDetail = ({ onRouterBack }: IRouterComponentProps): JSX.Element => {
  const [singerMsg, setSingerMsg] = useState<ISingerMsg>({} as ISingerMsg);

  const [singerSongs, setSingerSongs] = useState<ISingerDetailData["hotSongs"]>(
    []
  );

  const location = useLocation();

  useEffect(() => {
    (async () => {
      const { id } = qs.parse(location.search);

      const { artist, hotSongs } = await getSingerDetail(id as string);
      setSingerMsg(artist);
      setSingerSongs(hotSongs);
    })();
  }, []);

  return (
    <div className="singer-detail-container">
      <BackHeader onBack={onRouterBack} title={singerMsg.name} />
      <div className="singer-pic">
        <img src={singerMsg.picUrl} alt="" />
      </div>
      <PlayAll />
      {singerSongs.map(({ id, name }) => (
        <div className="singer-songs-item" key={id}>
          {name}
        </div>
      ))}
    </div>
  );
};

export default SingerDetail;
