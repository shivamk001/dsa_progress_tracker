'use client';   
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    let router = useRouter();
    let [isLogin, setisLogin] = useState(false);
    

    useEffect(()=>{
        let fetchCurrent = async () =>{
            let resp = await axios.get('http://localhost:8080/auth/currentuser');
            let currentUser = resp.data;
            console.log('CURRENT USER:', currentUser);
            if(currentUser.id){
                setisLogin(true);
            }
        }
        fetchCurrent();
    }, []);

    const logout = async () =>{
        let resp = await axios.get('http://localhost:8080/auth/signout');
        setisLogin(false);
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
                        :
                        <ul className="menu menu-horizontal px-1">
                            <li><Link href='/users/login'>Login</Link></li>
                        </ul>
                }
            </div>
        </div>)
}

export default Navbar;