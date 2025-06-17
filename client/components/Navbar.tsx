'use client';   
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { logoutUser } from '@/lib/features/users/usersSlice';

const Navbar = () => {
    let router = useRouter();
    let dispatch = useAppDispatch();
    
    let isLogin = useAppSelector(state=>state.users.loginStatus);
    console.log('ISLOGIN NAVBAR:', isLogin);

    const logout = async () =>{
        let resp = await dispatch(logoutUser());
        console.log('NAVBAR LOGOUT RESP:', resp);
        router.push('/users/login');
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">DSA Progress Tracker</a>
            </div>
            <div className="flex-none">
                {
                    isLogin ?
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <button className='btn btn-sm' onClick={async ()=> await logout()}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                        : <ul className="menu menu-horizontal px-1">
                            <li><Link href='/users/login'>Login</Link></li>
                        </ul>
                }
            </div>
        </div>)
}

export default Navbar;