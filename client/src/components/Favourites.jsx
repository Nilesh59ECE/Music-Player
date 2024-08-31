import React from 'react';
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { actionType } from '../context/reducer';
import Header from './Header';

const Favourites = () => {
  const [{ allSongs, favourites }, dispatch] = useStateValue();

  const favoriteSongs = allSongs?.filter(song => favourites.includes(song._id));

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
      <h2 className="text-2xl font-bold mb-4">Favourite Songs</h2>
      <div className="w-full h-auto overflow-x-auto flex items-center justify-evenly gap-4 p-4 scrollbar-hide">
        {favoriteSongs.length > 0 ? (
          favoriteSongs.map((data, index) => (
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
                        : "relative top-48 text-white-500 text-3xl"
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
          ))
        ) : (
          <p className="text-base text-textColor">No favorite songs yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favourites;
