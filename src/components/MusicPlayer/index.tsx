import React, { useEffect, useState, useRef } from "react";
import { PlayOnce, ShuffleOne, LoopOnce } from "@icon-park/react";
import { observer } from "@formily/reactive-react";

import type { StoreState } from "@/store";
import songUrlApi from "@/api/songUrl";
import LyricApi from "@/api/lyric";

import MiniPlayer from "./components/MiniPlayer";
import FullPlayer from "./components/FullPlayer";

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

type LyricList = {
  content: string;
  time: number;
}[];

const formateTime = (time: number): string => {
  const help = (t: number): string => {
    if (t < 10) {
      return "0" + t;
    }
    return "" + t;
  };
  const second = help(Math.floor(time % 60));
  const minute = help(Math.floor(time / 60));
  return minute + ":" + second;
};

const getRandomNum = (now: number, total: number): number => {
  const result = Math.floor(Math.random() * total);
  return result === now ? getRandomNum(now, total) : result;
};

const MusicPlayer = ({
  musicPlaylist,
  musicPlayIndex,
}: StoreState): JSX.Element => {
  const [isFull, setIsFull] = useState<boolean>(false);

  const [isPlay, setIsPlay] = useState<boolean>(false);

  const [playMode, setPlayMode] = useState<PlayMode>(PlayMode.ORDER);

  const changePlayMode = () => {
    const index = playModeList.indexOf(playMode);
    setPlayMode(playModeList[index + 1]);
  };

  const musicPlaylistLength = musicPlaylist.length;

  const changePrevSong = (isAuto: boolean = true) => {
    if (musicPlaylistLength === 1) {
      audioRef.current?.play();
      return;
    }

    const prevFn = () => {
      if (musicPlayIndex > 0) {
        musicPlayIndex--;
      } else {
        musicPlayIndex = musicPlaylistLength - 1;
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
      musicPlayIndex = randomNum;
    }
  };

  const changeNextSong = (isAuto: boolean = true) => {
    if (musicPlaylistLength === 1) {
      audioRef.current?.play();
      return;
    }

    const nextFn = () => {
      if (musicPlayIndex < musicPlaylistLength - 1) {
        musicPlayIndex++;
      } else {
        musicPlayIndex = 0;
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
      musicPlayIndex = randomNum;
    }
  };

  useEffect(() => {
    const fn = () => changeNextSong();
    audioRef.current?.addEventListener("ended", fn);
    return () => audioRef.current?.removeEventListener("ended", fn);
  }, []);

  const toggleIsPlay = () => setIsPlay((s) => !s);

  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    id: activeMusicId,
    name: activeMusicName,
    picUrl,
  } = musicPlaylist[musicPlayIndex];

  const [currentTime, setCurrentTime] = useState<string>("00:00");

  const [songDuration, setSongDuration] = useState<string>("00:00");

  const [progressScale, setProgressScale] = useState<number>(0);

  const changeProgressRate = (e: any) => {
    if (audioRef.current) {
      const rate = (e.pageX - e.target.offsetLeft) / e.target.offsetWidth;
      setProgressScale(rate);
      const { duration } = audioRef.current;
      const cur = duration * rate;
      audioRef.current.currentTime = cur;
    }
  };

  useEffect(() => {
    (async () => {
      const {
        data: [{ url }],
      } = await songUrlApi(activeMusicId);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play().then(() => {
          const durationTime = audioRef.current?.duration || 0;
          setSongDuration(formateTime(durationTime));
        });
        setIsPlay(true);
      }
    })();
  }, [activeMusicId]);

  const [activeLyric, setActiveLyric] = useState<string>("");

  const lyricList = useRef<LyricList>([]);

  const handleLyricString = (lyric: string): LyricList => {
    return lyric
      .split("\n")
      .map((line) => {
        const [min, sec] = line
          .substring(line.indexOf("[") + 1, line.indexOf("]"))
          .split(":");
        const content = line.substr(line.indexOf("]") + 1);
        return {
          content,
          time: +min * 60 + +sec,
        };
      })
      .filter((item) => !!item.content.trim());
  };

  const handleActiveLyric = () => {
    if (audioRef.current) {
      if (lyricList.current.length === 0) {
        setActiveLyric("暂无歌词");
        return;
      }
      const { currentTime } = audioRef.current;
      for (let i = 0; i < lyricList.current.length; i++) {
        const lastLyric = lyricList.current[i];
        const prevLyric = lyricList.current[i + 1];
        if (prevLyric) {
          if (currentTime > lastLyric.time && currentTime < prevLyric.time) {
            setActiveLyric(lastLyric.content);
            return;
          }
        } else {
          setActiveLyric(lastLyric.content);
        }
      }
    }
  };

  useEffect(() => {
    (async () => {
      const { nolyric, lrc } = await LyricApi(activeMusicId);
      if (nolyric) {
        lyricList.current = [];
      } else {
        const { lyric } = lrc;
        lyricList.current = handleLyricString(lyric);
      }
    })();
  }, [activeMusicId]);

  const handleScaleAndCurrentTime = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      setProgressScale(currentTime / duration);
      setCurrentTime(formateTime(currentTime));
    }
  };

  useEffect(() => {
    const fn = () => {
      handleScaleAndCurrentTime();
      handleActiveLyric();
    };
    audioRef.current?.addEventListener("timeupdate", fn);
    return () => audioRef.current?.removeEventListener("ended", fn);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      isPlay ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlay]);

  return (
    <div className="music-player-container">
      <audio ref={audioRef} />
      {isFull ? (
        <FullPlayer
          name={activeMusicName}
          toggle={toggleIsPlay}
          status={isPlay}
          onClose={() => setIsFull(false)}
          picUrl={picUrl}
          next={changeNextSong}
          prev={changePrevSong}
          duration={songDuration}
          current={currentTime}
          scale={progressScale}
          lyric={activeLyric}
          changeRate={changeProgressRate}
        />
      ) : (
        <MiniPlayer
          name={activeMusicName}
          status={isPlay}
          toggle={toggleIsPlay}
          modeLogo={PLAY_MODE_MAP[playMode]}
          changeMode={changePlayMode}
          next={changeNextSong}
          prev={changePrevSong}
          onOpen={() => setIsFull(true)}
        />
      )}
    </div>
  );
};

export default observer(MusicPlayer);
