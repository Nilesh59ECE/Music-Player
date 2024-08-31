import React from 'react'
import Header from './Header'
import { NavLink, Route, Routes } from 'react-router-dom'
import { IoHome, IoPerson, IoMusicalNotes, IoPersonCircle, IoDisc} from 'react-icons/io5';
import DashboardArtist from './DashboardArtist';
import DashboardAlbums from './DashboardAlbums';
import DashboardSongs from './DashboardSongs';
import DashboardUsers from './DashboardUsers';
import DashboardHome from './DashboardHome';
import DashboardNewSongs from './DashboardNewSongs';

const Dashboard = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-amber-50" >
        <Header />

        <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
            <NavLink to ={"/dashboard/home"} className="flex items-center text-lime-800 font-semibold hover:text-fuchsia-800 duration-100 transition-all group ease-in-out" ><IoHome className="w-6 h-6 mr-2 text-lime-800 group-hover:text-fuchsia-800" />Home</NavLink>
            <NavLink to ={"/dashboard/users"} className="flex items-center text-lime-800 font-semibold hover:text-fuchsia-800 duration-100 transition-all group ease-in-out" ><IoPerson className="w-6 h-6 mr-2 text-lime-800 group-hover:text-fuchsia-800" />Users</NavLink>
            <NavLink to ={"/dashboard/songs"} className="flex items-center text-lime-800 font-semibold hover:text-fuchsia-800 duration-100 transition-all group ease-in-out" ><IoMusicalNotes className="w-6 h-6 mr-2 text-lime-800 group-hover:text-fuchsia-800" />Songs</NavLink>
            <NavLink to ={"/dashboard/artist"} className="flex items-center text-lime-800 font-semibold hover:text-fuchsia-800 duration-100 transition-all group ease-in-out" ><IoPersonCircle className="w-6 h-6 mr-2 text-lime-800 group-hover:text-fuchsia-800" />Artist</NavLink>
            <NavLink to ={"/dashboard/albums"} className="flex items-center text-lime-800 font-semibold hover:text-fuchsia-800 duration-100 transition-all group ease-in-out" ><IoDisc className="w-6 h-6 mr-2 text-lime-800 group-hover:text-fuchsia-800" />Albums</NavLink>  
        </div>

        <div className="my-4 w-full p-4">
          <Routes>
            <Route path = "/home" element = {<DashboardHome />} />
            <Route path = "/users" element = {<DashboardUsers />} />
            <Route path = "/songs" element = {<DashboardSongs/>} />
            <Route path = "/artist" element = {<DashboardArtist />} />
            <Route path = "/albums" element = {<DashboardAlbums />} />
            <Route path = "/newSong" element = {<DashboardNewSongs />} />

          </Routes>
        </div>

    </div>
  )
}

export default Dashboard;