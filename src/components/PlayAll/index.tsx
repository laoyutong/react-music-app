import React from "react";
import "./index.less";

import { Play } from "@icon-park/react";

const PlayAll = (): JSX.Element => {
  return (
    <div className="play-all-container">
      <Play theme="outline" size="24" fill="#333" />
      <div className="play-all-word">播放全部</div>
    </div>
  );
};

export default PlayAll;
