import React from "react";
import "./index.less";

import type { PlayMode } from "../../";

import {
  PauseOne,
  Play,
  PlayOnce,
  ShuffleOne,
  LoopOnce,
  GoStart,
  GoEnd,
} from "@icon-park/react";

interface MiniPlayerProps {
  name: string;
  status: boolean;
  toggle: () => void;
  mode: PlayMode;
  changeMode: () => void;
  next: (isAuto: boolean) => void;
  prev: (isAuto: boolean) => void;
}

const PLAY_MODE = {
  order: <LoopOnce theme="outline" size="32" fill="#333" />,
  random: <ShuffleOne theme="outline" size="32" fill="#333" />,
  cycle: <PlayOnce theme="outline" size="32" fill="#333" />,
};

const MiniPlayer = ({
  name,
  status,
  toggle,
  mode,
  changeMode,
  next,
  prev,
}: MiniPlayerProps): JSX.Element => {
  return (
    <div className="mini-player-container">
      <div className="name">{name}</div>
      <div className="opt-area">
        <div className="opt-left">
          <GoStart
            theme="outline"
            size="32"
            fill="#333"
            onClick={() => prev(false)}
          />
          <div className="status" onClick={toggle}>
            {!status ? (
              <Play theme="outline" size="32" fill="#333" />
            ) : (
              <PauseOne theme="outline" size="32" fill="#333" />
            )}
          </div>
          <GoEnd
            theme="outline"
            size="32"
            fill="#333"
            onClick={() => next(false)}
          />
        </div>
        <div className="mode" onClick={changeMode}>
          {PLAY_MODE[mode]}
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
