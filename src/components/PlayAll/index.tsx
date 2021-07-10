import React from "react";
import "./index.less";

import { Play } from "@icon-park/react";

interface PlayAllProps {
  onClick: () => void;
}

const PlayAll = ({ onClick }: PlayAllProps): JSX.Element => {
  return (
    <div className="play-all-container" onClick={onClick}>
      <Play theme="outline" size="24" fill="#333" />
      <div className="play-all-word">播放全部</div>
    </div>
  );
};

export default PlayAll;
