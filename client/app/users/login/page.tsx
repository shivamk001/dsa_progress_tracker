'use client';
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { fetchCurrentUser, loginUser } from '@/lib/features/users/usersSlice';

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    let [email, setEmail]=useState('');
    let [password, setPassword]=useState('');
    // let [loginSuccessful, setloginSuccessful]=useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        let resp: any = await dispatch(loginUser({email, password}));

        // setloginSuccessful(!resp.error && resp.payload.id);

        if(!resp.error && resp.payload.id){
            await dispatch(fetchCurrentUser());
            router.push('/problems');
        } else {
            // Handle errors
        }
    }

    return (
    <>
    <div className='h-screen w-screen flex items-center justify-center overflow-hidden'>
        <form onSubmit={handleSubmit} className='w-96 flex flex-col items-center border-1 p-2 border-gray-500'>
            <fieldset className="fieldset w-full flex flex-col items-center">
                <legend className="fieldset-legend">Email</legend>
                <input type="text" name='email' 
                    onChange={e=>setEmail(e.target.value)}
                    className="input" 
                    placeholder="Type here" 
                    required/>
                <p className="label">Required</p>
            </fieldset>
            <fieldset className="fieldset w-full flex flex-col items-center">
                <legend className="fieldset-legend">Password</legend>
                <input type="password" name='password' 
                    onChange={e=>setPassword(e.target.value)}
                    className="input" 
                    placeholder="Type here" 
                    required/>
                <p className="label">Required</p>
            </fieldset>
            <button className="btn">Login</button>
        </form>
    </div>
    </>
    )
}