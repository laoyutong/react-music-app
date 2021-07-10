import React, { useEffect, useState, useRef } from "react";
import { PlayOnce, ShuffleOne, LoopOnce } from "@icon-park/react";

import songUrlApi from "@/api/songUrl";
import type { StoreState } from "@/store/types";
import { useSetMusicPlayIndex } from "@/store/musicPlayIndexReducer";
import { getRandomNum } from "@/utils";

import MiniPlayer from "./components/MiniPlayer";
import FullPlayer from "./components/FullPlayer";

interface MusicPlayerProps {
  musicPlaylist: StoreState["musicPlaylist"];
  musicPlayIndex: StoreState["musicPlayIndex"];
}

enum PlayMode {
  "ORDER",
  "RANDOM",
  "CYCLE",
}

const playModeList: PlayMode[] = [
  PlayMode.ORDER,
  PlayMode.RANDOM,
  PlayMode.CYCLE,
  PlayMode.ORDER,
];

const PLAY_MODE_MAP: Record<PlayMode, JSX.Element> = {
  [PlayMode.ORDER]: <LoopOnce theme="outline" size="32" fill="#333" />,
  [PlayMode.RANDOM]: <ShuffleOne theme="outline" size="32" fill="#333" />,
  [PlayMode.CYCLE]: <PlayOnce theme="outline" size="32" fill="#333" />,
};

const MusicPlayer = ({
  musicPlaylist,
  musicPlayIndex,
}: MusicPlayerProps): JSX.Element => {
  const [isFull, setIsFull] = useState<boolean>(false);

  const [isPlay, setIsPlay] = useState<boolean>(false);

  const [playMode, setPlayMode] = useState<PlayMode>(PlayMode.ORDER);

  const changePlayMode = () => {
    const index = playModeList.indexOf(playMode);
    setPlayMode(playModeList[index + 1]);
  };

  const setMusicPlayIndex = useSetMusicPlayIndex();

  const musicPlaylistLength = musicPlaylist.length;

  const changePrevSong = (isAuto: boolean = true) => {
    if (musicPlaylistLength === 1) {
      audioRef.current?.play();
      return;
    }

    const prevFn = () => {
      if (musicPlayIndex > 0) {
        setMusicPlayIndex(musicPlayIndex - 1);
      } else {
        setMusicPlayIndex(musicPlaylistLength - 1);
      }
    };
    if (playMode === PlayMode.ORDER) {
      prevFn();
    } else if (playMode === PlayMode.CYCLE) {
      if (isAuto) {
        audioRef.current?.play();
      } else {
        prevFn();
      }
    } else {
      const randomNum = getRandomNum(musicPlayIndex, musicPlaylistLength);
      setMusicPlayIndex(randomNum);
    }
  };

  const changeNextSong = (isAuto: boolean = true) => {
    if (musicPlaylistLength === 1) {
      audioRef.current?.play();
      return;
    }

    const nextFn = () => {
      if (musicPlayIndex < musicPlaylistLength - 1) {
        setMusicPlayIndex(musicPlayIndex + 1);
      } else {
        setMusicPlayIndex(0);
      }
    };
    if (playMode === PlayMode.ORDER) {
      nextFn();
    } else if (playMode === PlayMode.CYCLE) {
      if (isAuto) {
        audioRef.current?.play();
      } else {
        nextFn();
      }
    } else {
      const randomNum = getRandomNum(musicPlayIndex, musicPlaylistLength);
      setMusicPlayIndex(randomNum);
    }
  };

  useEffect(() => {
    const fn = () => changeNextSong();
    audioRef.current?.addEventListener("ended", fn);
    return () => audioRef.current?.removeEventListener("ended", fn);
  }, []);

  const toggleIsPlay = () => setIsPlay((s) => !s);

  const audioRef = useRef<HTMLAudioElement>(null);

  const activeMusic = musicPlaylist[musicPlayIndex];

  useEffect(() => {
    (async () => {
      const {
        data: [{ url }],
      } = await songUrlApi(activeMusic.id);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play().then(() => {
          //TODO
        });
        setIsPlay(true);
      }
    })();
  }, [activeMusic.id]);

  useEffect(() => {
    if (audioRef.current) {
      isPlay ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlay]);

  return (
    <div className="music-player-container">
      <audio ref={audioRef} />
      {isFull ? (
        <FullPlayer />
      ) : (
        <MiniPlayer
          name={activeMusic.name}
          status={isPlay}
          toggle={toggleIsPlay}
          modeLogo={PLAY_MODE_MAP[playMode]}
          changeMode={changePlayMode}
          next={changeNextSong}
          prev={changePrevSong}
        />
      )}
    </div>
  );
};

export default MusicPlayer;
