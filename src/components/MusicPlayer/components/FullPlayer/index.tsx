import React, { useEffect, useRef } from "react";
import "./index.less";
import { PauseOne, Play, GoStart, GoEnd } from "@icon-park/react";
import classnames from "classnames";

import BackHeader from "@/components/BackHeader";

interface FullPlayerProps {
  status: boolean;
  name: string;
  picUrl: string;
  changeRate: (e: any) => void;
  onClose: () => void;
  toggle: () => void;
  prev: (isAuto: boolean) => void;
  next: (isAuto: boolean) => void;
  duration: string;
  current: string;
  scale: number;
  lyric: string;
}

const FullPlayer = ({
  name,
  onClose,
  picUrl,
  toggle,
  prev,
  next,
  status,
  duration,
  current,
  scale,
  lyric,
  changeRate,
}: FullPlayerProps): JSX.Element => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.transform = `scaleX(${scale * 100}%)`;
    }
  }, [scale]);

  return (
    <div className="full-player-container">
      <BackHeader onBack={onClose} title={name} />
      <div className="content">
        <img src={picUrl} alt="" className={classnames({ pause: !status })} />
        <div className="lyric-area">{lyric}</div>
        <div className="progress-area">
          <div className="progress-time">{current}</div>
          <div className="progress-content" onClick={changeRate}>
            <div className="active-progress-content" ref={progressRef}></div>
          </div>
          <div className="progress-time">{duration}</div>
        </div>
        <div className="opt-area">
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
      </div>
    </div>
  );
};

export default FullPlayer;
