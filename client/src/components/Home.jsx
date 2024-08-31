import React, { useEffect, useState, useRef } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import Filter from "./Filter";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faHeart } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [
    {
      searchTerm,
      allSongs,
      artistFilter,
      filterTerm,
      albumFilter,
      languageFilter,
      favourites,
    },
    dispatch,
  ] = useStateValue();

  const [filteredSongs, setFilteredSongs] = useState(null);
  const [Songs, setSongs] = useState(null);
  const songContainerRef = useRef(null);
  const [songLeftArrowVisible, setSongLeftArrowVisible] = useState(false);
  const [songRightArrowVisible, setSongRightArrowVisible] = useState(true); // Initially show right arrow

  useEffect(() => {
      getAllSongs().then((data) => {
        setFilteredSongs(data.song);
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filter = searchTerm.toLowerCase();
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(filter) ||
          data.language.toLowerCase().includes(filter) ||
          data.name.toLowerCase().includes(filter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.artist === artistFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [artistFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.category.toLowerCase() === filterTerm
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [filterTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.album === albumFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [albumFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.language === languageFilter
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [languageFilter]);

  useEffect(() => {
    const handleScroll = (containerRef, setLeftArrowVisible, setRightArrowVisible) => {
      const scrollPosition = containerRef.current.scrollLeft;
      const containerWidth = containerRef.current.clientWidth;
      const contentWidth = containerRef.current.scrollWidth;
      const songCardWidth = 200;

      setLeftArrowVisible(scrollPosition > 0);
      const isLastSongVisible = scrollPosition + containerWidth >= contentWidth - songCardWidth;
      setRightArrowVisible(!isLastSongVisible);
    };

    const handleSongScroll = () => handleScroll(songContainerRef, setSongLeftArrowVisible, setSongRightArrowVisible);

    const songRef = songContainerRef.current;
    
    if (songRef) {
      songRef.addEventListener('scroll', handleSongScroll);
    }
    
    return () => {
      if (songRef) {
        songRef.removeEventListener('scroll', handleSongScroll);
      }
    };
  }, []);

  const scrollLeft = (containerRef) => {
    containerRef.current.scrollBy({
      top: 0,
      left: -200,
      behavior: 'smooth'
    });
  };

  const scrollRight = (containerRef) => {
    containerRef.current.scrollBy({
      top: 0,
      left: 200,
      behavior: 'smooth'
    });
  };

  const addSongToContext = (index) => {
    dispatch({
      type: actionType.SET_SONG,
      song: index,
    });
    
    dispatch({
      type: actionType.SET_SONG_PLAYING,
      isSongPlaying: true,
    });
  };
  
  const toggleFavorite = (index) => {
    let updatedFavorites = [...favourites];
    
    if (updatedFavorites.includes(index)) {
      updatedFavorites = updatedFavorites.filter(fav => fav !== index);
    } else {
      updatedFavorites.push(index);
    }

    localStorage.setItem('favourites', JSON.stringify(updatedFavorites));

    dispatch({
      type: actionType.SET_FAVORITES,
      favourites: updatedFavorites,
    });
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-amber-50">
      <Header />
      <SearchBar />

      {searchTerm.length > 0 && (
        <p className="my-4 text-base text-textColor">
          Searched for :
          <span className="text-xl text-cartBg font-semibold">
            {searchTerm}
          </span>
        </p>
      )}

      <Filter setFilteredSongs={setFilteredSongs} />
      <div className="w-full flex items-center justify-between px-4">
        {songLeftArrowVisible && (
          <button onClick={() => scrollLeft(songContainerRef)} className="p-2 rounded-full">
            <FontAwesomeIcon icon={faChevronLeft} className="text-fuchsia-700 font-bold text-5xl" />
          </button>
        )}
        <div ref={songContainerRef} className="w-full h-auto overflow-x-auto flex items-center justify-evenly gap-4 p-4 scrollbar-hide">
          <HomeSongContainer
            music={Songs}
            musics={filteredSongs ? filteredSongs : allSongs}
            toggleFavorite={toggleFavorite}
            favourites={favourites}
            addSongToContext={addSongToContext}
          />
        </div>
        {songRightArrowVisible && (
          <button onClick={() => scrollRight(songContainerRef)} className="p-2 rounded-full">
            <FontAwesomeIcon icon={faChevronRight} className="text-fuchsia-700 font-bold text-5xl" />
          </button>
        )}
      </div>
    </div>
  );
};

const HomeSongContainer = ({ music, musics, toggleFavorite, favourites, addSongToContext }) => {
  return (
    <>
      {musics?.map((data, index) => (
        <motion.div
          key={data._id}
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-white bg-green-100 shadow-md rounded-lg flex flex-col items-center"
          onClick={() => addSongToContext(data._id)}
        >
          <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={data.imageURL}
              alt=""
              className="w-full h-full rounded-lg object-cover"
            />
          </div>

          <button
            className="absolute top-2 right-2"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(data._id);
            }}
          >
            <div className="relative">
              <FontAwesomeIcon
                icon={faHeart}
                className={
                  favourites.includes(data._id)
                    ? "relative top-48 text-red-600 text-3xl"
                    : "relative top-48 text-gray-500 text-3xl"
                }
              />
            </div>
          </button>

          <p className="text-base text-headingColor font-semibold my-2">
            {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
            <span className="block text-sm text-black my-1">
              {data.artist}
            </span>
          </p>
        </motion.div>
      ))}
      
    </>
  );
};

export default Home;
