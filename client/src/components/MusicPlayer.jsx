import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { IoMdClose } from "react-icons/io";
import { IoArrowRedo, IoMusicalNote } from "react-icons/io5";
import { motion } from "framer-motion";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { actionType } from "../context/reducer";
import { getAllSongs } from "../api";
import { RiPlayListFill } from "react-icons/ri";

const MusicPlayer = () => {
  const [isPlayList, setIsPlayList] = useState(false);
  const [{ allSongs, song, isSongPlaying, miniPlayer }, dispatch] = useStateValue();
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);

  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: false,
      });
    }
  };

  const togglePlayer = () => {
    dispatch({
      type: actionType.SET_MINI_PLAYER,
      miniPlayer: !miniPlayer,
    });
  };

  const nextTrack = () => {
    if (selectedSongIndex !== null) {
      let nextIndex = selectedSongIndex + 1;
  
      if (nextIndex >= allSongs.length) {
        nextIndex = 0; // Loop back to the first song
      }
  
      setSelectedSongIndex(nextIndex);
      dispatch({
        type: actionType.SET_SONG,
        song: allSongs[nextIndex]._id,
      });
    }
  };

  const previousTrack = () => {
    if (selectedSongIndex !== null && selectedSongIndex > 0) {
      const previousIndex = selectedSongIndex - 1;
      setSelectedSongIndex(previousIndex);
      dispatch({
        type: actionType.SET_SONG,
        song: allSongs[previousIndex]._id,
      });
    }
  };

  const togglePlayPause = () => {
    const audioPlayer = document.querySelector(".rhap_main-container audio");
    if (audioPlayer) {
      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    }
  };

  useEffect(() => {
    if (song) {
      const ind = allSongs.findIndex(son => son._id === song);
      setSelectedSongIndex(ind);
      dispatch({
        type: actionType.SET_SONG,
        song: song,
      });
    }
  }, [song, allSongs, dispatch]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full full flex items-center bg-teal-200 gap-3 overflow-hidden">
      <div
        className={`w-full full items-center gap-3 p-4 ${
          miniPlayer ? "absolute top-40" : "flex relative"
        }`}
      >
        <img
          src={allSongs[selectedSongIndex]?.imageURL}
          className="w-40 h-20 object-cover rounded-md"
          alt=""
        />
        <div className="flex items-start flex-col">
          <p className="text-xl text-black font-semibold">
            {`${
              allSongs[selectedSongIndex]?.name.length > 20
                ? allSongs[selectedSongIndex]?.name.slice(0, 20)
                : allSongs[selectedSongIndex]?.name
            }`}{" "}
            <span className="text-base text-black">({allSongs[selectedSongIndex]?.album})</span>
          </p>
          <p className="text-black">
            {allSongs[selectedSongIndex]?.artist}{" "}
            <span className="text-sm text-black font-semibold">
              ({allSongs[selectedSongIndex]?.category})
            </span>
          </p>
          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsPlayList(!isPlayList)}
          >
            <RiPlayListFill className="text-black hover:text-red-600 text-3xl cursor-pointer" />
          </motion.i>
        </div>
        <div className="flex-1">
          <AudioPlayer className="text-black font-bold"
            src={allSongs[selectedSongIndex]?.songURL}
            onPlay={() => console.log("is playing")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
            onEnded={nextTrack}  // Add this line to autoplay the next song
          />
        </div>
        <div className="h-full flex items-center justify-center flex-col gap-3">
          <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
            <IoMdClose className="text-black hover:text-red-700 text-2xl cursor-pointer" />
          </motion.i>
          <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
            <IoArrowRedo className="text-black hover:text-red-600 text-2xl cursor-pointer" />
          </motion.i>
        </div>
      </div>

      {isPlayList && (
        <>
          <PlayListCard />
        </>
      )}

      {miniPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed right-2 bottom-2 "
        >
          <div className="w-40 h-40 rounded-full flex items-center justify-center relative ">
            <div className="absolute inset-0 rounded-full bg-red-600 blur-xl animate-pulse"></div>
            <img
              onClick={togglePlayer}
              src={allSongs[selectedSongIndex]?.imageURL}
              className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
              alt=""
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const PlayListCard = () => {
  const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    }
  }, [allSongs, dispatch]);

  const setCurrentPlaySong = (selectedSongId) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (selectedSongId !== song) {
      dispatch({
        type: actionType.SET_SONG,
        song: selectedSongId,
      });
    }
  };

  return (
    <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary">
      {allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            key={music._id}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer ${
              music._id === song ? "bg-black" : "bg-transparent"
            }`}
            onClick={() => setCurrentPlaySong(music._id)}
          >
            <IoMusicalNote className="text-black group-hover:text-headingColor text-2xl cursor-pointer" />
            <div className="flex items-start flex-col">
              <p className="text-lg text-headingColor font-semibold">
                {`${
                  music?.name.length > 20
                    ? music?.name.slice(0, 20)
                    : music?.name
                }`}{" "}
                <span className="text-base">({music?.album})</span>
              </p>
              <p className="text-black">
                {music?.artist}{" "}
                <span className="text-sm text-black font-semibold">
                  ({music?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default MusicPlayer;
