import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider';
import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from '../api';
import { actionType } from '../context/reducer';
import {GiLoveSong, GiMusicalNotes} from "react-icons/gi"
import {RiUserStarFill} from "react-icons/ri"
import { FaUsers } from 'react-icons/fa';

export const DashboardCard = ({ icon, name, count, bgColor }) => {
  return (
    <div className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md ${bgColor}`}>
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-xl text-textColor">{ count }</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allArtists, allAlbums, allSongs }, dispatch] = useStateValue();

  useEffect(() => {
    if(!allUsers){
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data
        })
      })
    }

    if(!allArtists){
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist
        })
      })
    }

    if(!allAlbums){
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album
        })
      })
    }

    if(!allSongs){
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song
        })
      })
    }

  })

  return (
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap'>
      <DashboardCard icon={<FaUsers className='text-3xl text-textColor' />} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0} bgColor="bg-green-200" />
      <DashboardCard icon={<GiLoveSong className='text-3xl text-textColor' />} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0} bgColor="bg-pink-200" />
      <DashboardCard icon={<RiUserStarFill className='text-3xl text-textColor' />} name={"Artists"} count={allArtists?.length > 0 ? allArtists?.length : 0} bgColor="bg-cyan-200" />
      <DashboardCard icon={<GiMusicalNotes className='text-3xl text-textColor' />} name={"Albums"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} bgColor="bg-orange-200" />
    </div>
  )
}

export default DashboardHome;