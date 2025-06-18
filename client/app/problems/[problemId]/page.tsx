'use client'
import React, { useState, useEffect, useRef } from 'react'
// import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import axios from 'axios';
import { useParams } from 'next/navigation'

interface Problem{
    name: string;
    topic: string;
    level: string;
    statement: string;
    youtube: string;
    article: string;
    leetcode: string;
}

const Problem = () => {
    const params = useParams();
    let problemIdRef = useRef(params.problemId);

    let [isLoading, setLoading] = useState(true);
    let [problem, setProblem] = useState<Problem>({
        name: '',
        topic: '',
        level: '',
        statement: '',
        youtube: '',
        leetcode:'',
        article: ''
    });

    // let 
    useEffect(()=>{
        // fetch all problems
        console.log('PROBLEMIDREF:', problemIdRef.current);
        
        let fetchProblem = async () => {
            let response1 = await axios.get(`${process.env.DSA_API_URL}/dsaapi/problems/${problemIdRef.current}`, { withCredentials: true});

            setProblem(prev=>response1.data);

            setLoading(false);
        }
        // set it to useState
        fetchProblem();
    }, []);
    return (
        isLoading ? (
            <div>Loading...</div>)
            :
            <div className='h-screen w-[100%] flex flex-col items-center'>
                <h2 className='text-left m-2 bold'>{problem.name}</h2>
                <div className='w-full flex flex-row justify-between'>
                    <label>
                        <input type='checkbox'/>
                        Mark as Completed
                    </label>
                </div>
                <button className='btn btn-sm'>
                    <a href={problem.leetcode}>
                        <img src="/dsa/leetcode.png" alt="Leetcode"  className="w-6 h-6 bg-transparent" />
                    </a>
                </button>
                <div className='m-2 w-full flex flex-col items-center'>
                    <h3>Problem Statement:</h3>
                    <p>{problem.statement}</p>
                </div>

                <div className='w-full h-1/2 flex flex-col items-center'>
                    Video Explanation:
                    <iframe
                        className="w-[90%] h-full"
                        src={problem.youtube}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

            </div>
    )
}

export default Problem