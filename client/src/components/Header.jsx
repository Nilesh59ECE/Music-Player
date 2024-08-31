import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaMusic, FaCrown, FaEnvelope, FaHeadphones } from 'react-icons/fa';
import { Logo } from '../assets/img/index';
import { useStateValue } from '../context/StateProvider';
import { app } from '../config/firebase.config';
import { getAuth } from 'firebase/auth';
import { motion } from 'framer-motion';

const Header = () => {
    const [{user}, dispatch] = useStateValue();
    const [isMenu, setisMenu] = useState(false);

    const navigate = useNavigate();

    const logout = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem("auth", "false");
        }).catch((e) => console.log(e));
        navigate("/login", {replace : true});
    }
  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
        <NavLink to={"/"} className="flex items-center">
            <img src={Logo} alt="logo" className="w-10" />
            <span className="font-semibold calibri text-2xl text-teal-900 ml-1 tracking-wide">Sangeet</span>
        </NavLink>


        <ul className="flex items-center justify-center ml-2">
            <li className="mx-3 text-lg flex items-center">
                <NavLink to={"/home"} className="flex items-center text-red-800 font-semibold hover:text-violet-800 duration-100 transition-all group ease-out">
                    <FaHome className="w-4 h-4 mr-2 text-red-800 group-hover:text-violet-800" /> Home
                </NavLink>
            </li>

            <li className="mx-3 text-lg flex items-center">
                <NavLink to={"/music"} className="flex items-center text-red-800 font-semibold hover:text-violet-800 duration-100 transition-all group ease-in-out">
                    <FaMusic className="w-4 h-4 mr-2 text-red-800 group-hover:text-violet-800" /> Music
                </NavLink>
            </li>

            <li className="mx-3 text-lg flex items-center">
                <NavLink to={"/podcast"} className=" text-lg flex items-center text-red-800 font-semibold hover:text-violet-800 duration-100 transition-all group ease-in-out">
                    <FaHeadphones className="w-4 h-4 mr-2 text-red-800 group-hover:text-violet-800" /> Podcast
                </NavLink>
            </li>
        </ul>

        <div
            onMouseEnter={() => setisMenu(true)}
            onMouseLeave={() => setisMenu(false)} 
        className="flex items-center ml-auto cursor-pointer gap-2 relative">
            <img src = {user?.user.imageURL} className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg" alt="" referrerPolicy='no-referrer' />
            <div className="flex flex-col">
                <p className='text-fuchsia-700 text-lg hover:text-sky-700 font-semibold'>{user?.user?.name}</p>
                <p className='flex items-center gap-2 text-xs text-gray-900 font-normal'>Premium Member. <FaCrown className='text-sm -ml-1 text-yellow-500' /></p>
            </div>

            {isMenu && (
                <motion.div
                initial = {{opacity : 0, y : 50}}
                animate = {{opacity : 1, y : 0}}
                exit = {{opacity : 0, y : 50}}
                className="absolute z-10 top-14 p-3 right-0 w-190 gap-2 bg-orange-100 shadow-lg rounded-lg backdrop-blur flex flex-col">
                    <NavLink to={"/userProfile"}>
                        <p className="text-base text-blue-800 hover:font-semibold duration-150 transition-all ease-in-out">Profile</p>
                    </NavLink>

                    <NavLink to={"/favourites"}>
                        <p className="text-base text-blue-800 hover:font-semibold duration-150 transition-all ease-in-out">My Favourites❤️</p>
                    </NavLink>
                    <p className="text-base text-blue-800 hover:font-semibold duration-150 transition-all ease-in-out">Contact Us</p>

                    <hr />

                    {
                        user?.user?.role === 'admin' && (
                            <>
                            <NavLink to={"/dashboard/home"}>
                                <p className="text-base text-blue-800 hover:font-semibold duration-150 transition-all ease-in-out">Dashboard</p>
                            </NavLink>

                            <hr />
                            </>
                        )
                    }

                    <p className="text-base text-blue-800 hover:font-semibold duration-150 transition-all ease-in-out" onClick={logout}>Sign Out</p>
                </motion.div>
            )}
        </div>
    </header>
  )
}

export default Header