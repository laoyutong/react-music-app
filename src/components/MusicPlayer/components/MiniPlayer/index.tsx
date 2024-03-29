import React from "react";
import "./index.less";

import { PauseOne, Play, GoStart, GoEnd } from "@icon-park/react";

interface MiniPlayerProps {
  name: string;
  status: boolean;
  toggle: () => void;
  modeLogo: JSX.Element;
  changeMode: () => void;
  next: (isAuto: boolean) => void;
  prev: (isAuto: boolean) => void;
  onOpen: () => void;
}

const MiniPlayer = ({
  name,
  status,
  toggle,
  modeLogo,
  changeMode,
  next,
  prev,
  onOpen,
}: MiniPlayerProps): JSX.Element => {
  return (
    <div className="mini-player-container">
      <div className="name" onClick={onOpen}>
        {name}
      </div>
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
          {modeLogo}
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
