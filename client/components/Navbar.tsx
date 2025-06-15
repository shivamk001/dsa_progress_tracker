import Link from 'next/link';
import React from 'react'

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">DSA Progress Tracker</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                <li><Link href='/users/login'>Login</Link></li>
                <li></li>
                </ul>
            </div>
        </div>)
}

export default Navbar;