import React, { use, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = use(AuthContext);
    const [dropdownOpen, setDropDownOpen] = useState(false);
    // console.log(user)
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/login'>Login</NavLink></li>
        <li><NavLink to='/addTransaction'>Add Transaction</NavLink></li>
        <li><NavLink to='/myTransactions'>My Transactions</NavLink></li>
        <li><NavLink to='/reports'>Reports</NavLink></li>
        <li><NavLink to='/profile'>Profile</NavLink></li>
    </>
    const handleSignOut = () => {
        signOutUser();
        setDropDownOpen(false)
    }
    const toggleDropdown = () => {
        setDropDownOpen(!dropdownOpen)
    }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Wealth<span className=''>Wave</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-3">
                {
                    user ?
                        (
                    <>
                        <img
                            src={user?.photoURL}
                            alt="Profile"
                            className="w-10 h-10 rounded-full cursor-pointer"
                            onClick={toggleDropdown}
                        />

                        {/* Dropdown */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-52 bg-white shadow-md rounded-lg p-4 z-50">
                                <p className="font-semibold">{user.displayName}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <button
                                    onClick={handleSignOut}
                                    className="btn btn-sm btn-primary mt-2 w-full"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </>
                ) :
                    (<Link className='btn btn-primary' to='/login'>Login</Link>)
                },
            </div>
        </div>
    );
};

export default Navbar;