'use client';
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRequest } from '../../../hooks/useRequest';
import { METHOD } from '../../../utils';

export default function LoginPage() {
    const router = useRouter();
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
        const email = formData.get('email');
        const password = formData.get('password');
        console.log('USERNAME:', email, password);
        setEmail(email as string);
        setPassword(password as string);

        // const response = await axios.post('http://localhost:8080/auth/user/signin', {
        //     username, 
        //     password
        // },{
        //     withCredentials: true
        // });

        let response=await doRequest();

        if(response){
            router.push('/problems');
        } else {
            // Handle errors
        }
    }

    return (
    <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input type="text" name='email' 
                onChange={e=>setEmail(e.target.value)}
                className="input" 
                placeholder="Type here" 
                required/>
            <p className="label">Required</p>
        </fieldset>
        <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="password" name='password' 
                onChange={e=>setPassword(e.target.value)}
                className="input" 
                placeholder="Type here" 
                required/>
            <p className="label">Required</p>
        </fieldset>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Login</button>
    </form>
    )
}