export const initialState = {
  user: null,
  searchTerm: "",
  allUsers: null,
  allArtists: null,
  allAlbums: null,
  allSongs: null,
  filterTerm: "all",
  artistFilter: null,
  albumFilter: null,
  languageFilter: null,
  song: null,
  isSongPlaying: false,
  miniPlayer: false,
  favourites: JSON.parse(localStorage.getItem('favourites')) || [], // Initialize with localStorage
};
