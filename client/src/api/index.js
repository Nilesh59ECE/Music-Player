import axios from "axios";

const baseURL = "https://music-player-backend-lyart.vercel.app/";

export const validateUser = async (token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/login`,{
            headers: {
                Authorization : "Bearer " + token,
            },
        });
        return res.data;
    } catch (error) {
        
    }
};

export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}api/users/getUsers`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllArtists = async () => {
    try {
        const res = await axios.get(`${baseURL}api/artist/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllAlbums = async () => {
  try {
      const res = await axios.get(`${baseURL}api/albums/getAll`);
      return res.data;
  } catch (error) {
      return null;
  }
};


export const getAllSongs = async () => {
    try {
        const res = await axios.get(`${baseURL}api/songs/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const changingUserRole = async (userId, role) => {
    try {
        const res = axios.put(`${baseURL}api/users/updateRole/${userId}`, {
            data: { role: role},
        });
        return res;
    } catch (error) {
        return null;
    }
};

export const removeUser = async (userId) => {
    try {
        const res = axios.delete(`${baseURL}api/users/deleteUser/${userId}`);
        return res;
    } catch (error) {
        return null;
    }
};

export const saveNewSong = async (data) => {
    try {
       const res = axios.post(`${baseURL}api/songs/save`, {...data} );
       return (await res).data.savedSong; 
    } catch (error) {
        return null;
    }
};


export const saveNewArtist = async (data) => {
    try {
      const res = axios.post(`${baseURL}api/artist/save`, { ...data });
      return (await res).data.savedArtist;
    } catch (error) {
      return null;
    }
  };

  export const saveNewAlbum = async (data) => {
    try {
      const res = axios.post(`${baseURL}api/albums/save`, { ...data });
      return (await res).data.savedAlbum;
    } catch (error) {
      return null;
    }
  };
  
  export const deleteSongById = async (_id) => {
    try {
      const res = await axios.delete(`${baseURL}api/songs/delete/${_id}`);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  export const deleteAlbumById = async (_id) => {
    try {
      const res = await axios.delete(`${baseURL}api/albums/delete/${_id}`);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  export const deleteArtistById = async (_id) => {
    try {
      const res = await axios.delete(`${baseURL}api/artist/delete/${_id}`);
      return res.data;
    } catch (error) {
      return null;
    }
  };