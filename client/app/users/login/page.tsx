'use client';
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRequest } from '../../../hooks/useRequest';
import { METHOD } from '../../../utils';
import { useAppDispatch } from '@/lib/hook';
import { fetchCurrentUser, loginUser } from '@/lib/features/users/usersSlice';

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    let [email, setEmail]=useState('');
    let [password, setPassword]=useState('');
    let doRequest=useRequest({
        url: 'http://localhost:8080/auth/signin',
        body: {email,password},
        method: METHOD.POST
    })

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') ? `${formData.get('email')}` : '';
        const password = formData.get('password') ? `formData.get('password')` : '';
        console.log('USERNAME:', email, password);
        setEmail(email as string);
        setPassword(password as string);

        // let response=await doRequest();

        let response = await dispatch(loginUser({email, password}));

        console.log('FETCH CURRENT USER');
        await dispatch(fetchCurrentUser());

        if(response){
            router.push('/problems');
        } else {
            // Handle errors
        }
    }

    return (
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

    )
}