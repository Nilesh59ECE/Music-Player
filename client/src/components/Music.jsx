import React, { useEffect, useState } from "react";
import { getAllSongs, getAllArtists, getAllAlbums } from "../api"; // Assuming you have API functions to fetch songs, artists, and albums
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Header from "./Header";

const Music = () => {
  const [{ allSongs, favourites }, dispatch] = useStateValue();
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [artistSongs, setArtistSongs] = useState([]);
  const [albumSongs, setAlbumSongs] = useState([]);

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    }
    getAllArtists().then((data) => {
      setArtists(data.artist);
    });
    getAllAlbums().then((data) => {
      setAlbums(data.album);
    });
  }, [allSongs, dispatch]);

  const handleArtistClick = (artistName) => {
    setSelectedArtist(artistName);
    const filteredSongs = allSongs.filter(song => song.artist === artistName);
    setArtistSongs(filteredSongs);
    setSelectedAlbum(null); // Reset selected album
  };

  const handleAlbumClick = (albumName) => {
    setSelectedAlbum(albumName);
    const filteredSongs = allSongs.filter(song => song.album === albumName);
    setAlbumSongs(filteredSongs);
    setSelectedArtist(null); // Reset selected artist
  };

  const addSongToContext = (index, songList) => {
    const selectedSongId = songList[index]._id;
    dispatch({
      type: actionType.SET_SONG_PLAYING,
      isSongPlaying: true,
    });
    dispatch({
      type: actionType.SET_SONG,
      song: selectedSongId,
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

  const handleAllArtistsClick = () => {
    setSelectedArtist(null); // Reset selected artist
    setSelectedAlbum(null); // Reset selected album
  };

  const handleAllAlbumsClick = () => {
    setSelectedAlbum(null); // Reset selected album
    setSelectedArtist(null); // Reset selected artist
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-amber-50">
      <Header />
      <motion.div
        className="cursor-pointer m-2 p-4 bg-green-100 rounded-lg shadow-md hover:bg-white hover:shadow-xl flex flex-col items-center"
        onClick={handleAllArtistsClick} // Handle click on "All Artists" card
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={require('../assets/img/artist.jpg')} // Use the provided image path
          alt="All Artists"
          className="w-20 h-20 rounded-full object-cover mb-2"
        />
        <p className="text-xl font-semibold">All Artists</p>
      </motion.div>
      {selectedArtist ? (
        <div className="w-full mt-8">
          <h2 className="text-2xl font-bold text-headingColor">
            Songs by {selectedArtist}
          </h2>
          <div className="w-full flex flex-wrap items-center justify-evenly p-4">
            {artistSongs.map((song, index) => (
              <motion.div
                key={song._id}
                whileTap={{ scale: 0.8 }}
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-white bg-green-100 shadow-md rounded-lg flex flex-col items-center"
                onClick={() => addSongToContext(index, artistSongs)}
              >
                <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={song.imageURL}
                    alt=""
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>

                <button
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(song._id);
                  }}
                >
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={
                        favourites.includes(song._id)
                          ? "relative top-48 text-red-600 text-3xl"
                          : "relative top-48 text-gray-500 text-3xl"
                      }
                    />
                  </div>
                </button>

                <p className="text-base text-headingColor font-semibold my-2">
                  {song.name.length > 25 ? `${song.name.slice(0, 25)}` : song.name}
                  <span className="block text-sm text-gray-400 my-1">
                    {song.artist}
                  </span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-wrap items-center justify-evenly p-4">
          {artists.map((artist, index) => (
            <motion.div
              key={index}
              className="cursor-pointer m-2 p-4 bg-green-100 rounded-lg shadow-md hover:bg-white hover:shadow-xl flex flex-col items-center"
              onClick={() => handleArtistClick(artist.name)}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={artist.imageURL}
                alt={artist.name}
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <p className="text-xl font-semibold">{artist.name}</p>
            </motion.div>
          ))}
        </div>
      )}
      <motion.div
        className="cursor-pointer m-2 p-4 bg-green-100 rounded-lg shadow-md hover:bg-white hover:shadow-xl flex flex-col items-center"
        onClick={handleAllAlbumsClick} // Handle click on "All Albums" card
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={require('../assets/img/album.jpg')} // Use the provided image path for albums
          alt="All Albums"
          className="w-20 h-20 rounded-full object-cover mb-2"
        />
        <p className="text-xl font-semibold">All Albums</p>
      </motion.div>
      {selectedAlbum && (
        <div className="w-full  mt-8">
        <h2 className="text-2xl font-bold text-headingColor">
          Songs in {selectedAlbum}
        </h2>
        <div className="w-full flex flex-wrap items-center justify-evenly p-4">
          {albumSongs.map((song, index) => (
            <motion.div
              key={song._id}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-white bg-green-100 shadow-md rounded-lg flex flex-col items-center"
              onClick={() => addSongToContext(index, albumSongs)}
            >
              <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={song.imageURL}
                  alt=""
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>

              <button
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(song._id);
                }}
              >
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={
                      favourites.includes(song._id)
                        ? "relative top-48 text-red-600 text-3xl"
                        : "relative top-48 text-gray-500 text-3xl"
                    }
                  />
                </div>
              </button>

              <p className="text-base text-headingColor font-semibold my-2">
                {song.name.length > 25 ? `${song.name.slice(0, 25)}` : song.name}
                <span className="block text-sm text-gray-400 my-1">
                  {song.artist}
                </span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    )}
    {!selectedArtist && !selectedAlbum && (
      <div className="w-full flex flex-wrap items-center justify-evenly p-4">
        {albums.map((album, index) => (
          <motion.div
            key={index}
            className="cursor-pointer m-2 p-4 bg-green-100 rounded-lg shadow-md hover:bg-white hover:shadow-xl flex flex-col items-center"
            onClick={() => handleAlbumClick(album.name)}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={album.imageURL}
              alt={album.name}
              className="w-20 h-20 rounded-full object-cover mb-2"
            />
            <p className="text-xl font-semibold">{album.name}</p>
          </motion.div>
        ))}
      </div>
    )}
  </div>
);
};

export default Music;
