'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface Problems{
    topicWiseProblems: {
        [key: string]: any[]
    };
    totalProblems: number;
    totalEasyProblems: number;
    totalMediumProblems: number;
    totalHardProblems: number
}

const levelColors = {
    easy: 'bg-green-950',
    medium: 'bg-yellow-600',
    hard: 'bg-red-600',
}

interface Progress{
    done: any[];
    totalDone: number;
    totalEasyDone: number;
    totalHardDone: number;
    totalMediumDone: number;
}

const Problems = () => {

    const router = useRouter();

    let [problems, setProblems] = useState<Problems>({
        topicWiseProblems: {},
        totalProblems: 0,
        totalEasyProblems: 0,
        totalMediumProblems: 0,
        totalHardProblems: 0
    });
    let [progress, setProgress] = useState<Progress>({
        done: [],
        totalDone: 0,
        totalEasyDone: 0,
        totalHardDone: 0,
        totalMediumDone: 0
    });


    useEffect(()=>{
        // fetch all problems
        let fetchProblems = async () => {
            let response1 = await axios.get('http://localhost:8080/problems/all', { withCredentials: true});
            let response2 = await axios.get('http://localhost:8080/user/progress', { withCredentials: true});
            
            let problemsAll: Problems = response1.data;
            let problemsDone = response2.data;

            let doneIds = problemsDone.done.map((p: any)=>p.problemId);
            
            for(let [key, value] of Object.entries(problemsAll.topicWiseProblems)){
                // console.log(key, value);
                for(let problem of value){
                    // console.log(doneIds.includes(problem.id), problem.id);
                    problem['isMarked']=doneIds.includes(problem.id);
                }
            }
            console.log('PROBLEMS DONE:', problemsAll);

            setProgress(prev=>problemsDone);
            setProblems(prev=>problemsAll);
        }
        // set it to useState
        fetchProblems();
    }, []);

    const clicked=async (problemId: string, mark: boolean)=>{
        // e.preventDefault();
        try{
            await axios.post('http://localhost:8080/user/mark', 
                {
                    "problemId": problemId,
                    "mark": mark
                }, {
                    withCredentials: true
            }); 

            // Create a deep copy to update
            const updatedProblems = {
                ...problems,
                topicWiseProblems: { ...problems.topicWiseProblems }
            };

            let done = [...progress.done];
            let totalDone = progress.totalDone;
            let totalEasyDone = progress.totalEasyDone;
            let totalMediumDone = progress.totalMediumDone;
            let totalHardDone = progress.totalHardDone;

            // mark in problems
            for(let [key, value] of Object.entries(updatedProblems.topicWiseProblems)){
                // console.log(key, value);
                for(let problem of value){
                    if(problem.id==problemId){
                        problem['isMarked'] = mark;
                        
                        if(mark){
                            done.push({
                                problemId: problem.id,
                                level: problem.level,
                                topic: problem.topic,
                            });
                            totalDone++;
                            totalEasyDone += problem.level == 'easy' ? 1 : 0;
                            totalMediumDone += problem.level == 'medium' ? 1 : 0;
                            totalHardDone += problem.level == 'hard' ? 1 : 0;
                        }
                        else {
                            done = done.filter(el => el.problemId != problemId);
                            totalDone--;
                            totalEasyDone -= problem.level == 'easy' ? 1 : 0;
                            totalMediumDone -= problem.level == 'medium' ? 1 : 0;
                            totalHardDone -= problem.level == 'hard' ? 1 : 0;
                        }
                    }
                    

                }
            }
            setProblems(prev=>updatedProblems);
            setProgress(prev=>{return {
                done,
                totalDone,
                totalEasyDone,
                totalHardDone,
                totalMediumDone
            }})
        }
        catch(err){
            console.error(err);
        }
    }

    return (
        <div className='flex flex-col items-center px-4 w-full'>
            <h2 className='m-4 text-center w-[95%] text-2xl'>Top Coding Interview Problems</h2>

            <div className="m-4 flex flex-row bg-gray-800 w-[95%] p-4 justify-evenly rounded">
                {/* For TSX uncomment the commented types below */}
                <div className="flex flex-row gap-1 border-r border-white p-2">
                    Total Progress
                    <div
                        className="radial-progress"
                        style={{ "--value": `${(progress.totalDone / problems.totalProblems) * 100}` } as React.CSSProperties}
                        aria-valuenow={(progress.totalDone / problems.totalProblems) * 100}
                        role="progressbar"
                    >
                        {Math.round((progress.totalDone / problems.totalProblems) * 100)}%
                    </div>
                </div>



                <div className="flex flex-col gap-1 border-r border-white p-2">
                    <div>Easy</div>
                    <div>{progress.totalEasyDone}/{problems.totalEasyProblems} completed</div>
                    <progress
                    className="progress progress-primary w-56"
                    value={(progress.totalEasyDone / problems.totalProblems) * 100}
                    max="100"
                    ></progress>
                </div>

                <div className="flex flex-col gap-1 border-r border-white p-2">
                    <div>Medium</div>
                    <div>{progress.totalMediumDone}/{problems.totalMediumProblems} completed</div>
                    <progress
                    className="progress progress-primary w-56"
                    value={(progress.totalMediumDone / problems.totalProblems) * 100}
                    max="100"
                    ></progress>
                </div>

                <div className="flex flex-col gap-1 p-2">
                    <div>Hard</div>
                    <div>{progress.totalHardDone}/{problems.totalHardProblems} completed</div>
                    <progress
                    className="progress progress-primary w-56"
                    value={(progress.totalHardDone / problems.totalProblems) * 100}
                    max="100"
                    ></progress>
                </div>
            </div>

            <h2 className='m-4 text-center w-[95%]'>All Problems</h2>

            <div className="join join-vertical bg-gray-800 m-4 w-[95%] rounded">
                {Object.entries(problems.topicWiseProblems).map(([topic, problemList])=>(
                    <div className="collapse collapse-arrow join-item border-base-300 border" key={topic}>
                        <input type="radio" name="my-accordion-4" />
                        <div className="collapse-title font-semibold">{topic.toUpperCase()}</div>
                        {/* <div className="overflow-x-auto"> */}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className='w-[10%]'>Status</th>
                                        <th className='w-[40%]'>Name</th>
                                        <th className='w-[20%]'>Level</th>
                                        <th className='w-[10%]'>Youtube</th>
                                        <th className='w-[10%]'>Article</th>
                                        <th className='w-[10%]'>Practice</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {problemList.map(problem=>(
                                        <tr key={problem.id}>
                                            <th className='w-[10%]'>
                                                <label>
                                                    <input type='checkbox' 
                                                        id={problem.id} 
                                                        name={problem.id} 
                                                        value={problem.id} 
                                                        checked={problem.isMarked} 
                                                        onChange={async ()=> await clicked(problem.id, !problem.isMarked)}/>
                                                </label>
                                            </th>
                                            <td className='w-[40%]'>
                                                <div className="flex items-center gap-3">
                                                    <Link href='/problems/[problemId]' as={`/problems/${problem.id}`}>
                                                            {problem.name}
                                                    </Link>    
                                                </div>
                                            </td>
                                            <td className='w-[20%]'>
                                                {/* @ts-ignore */}
                                                <span className={`badge badge-ghost badge-sm ${levelColors[problem.level]}`}>{problem.level}</span>
                                            </td>
                                            <td className='w-[10%]'>
                                                <a href={problem.youtube} target="_blank" rel="noopener noreferrer">
                                                    <img src="/youtube.png" alt="Youtube"  className="w-6 h-6 bg-transparent" />
                                                </a>
                                            </td>
                                            <td className='w-[10%]'>
                                                <a href={problem.article} target="_blank" rel="noopener noreferrer">
                                                    <img src="/file.svg" alt="Article"  className="w-6 h-6 bg-transparent" />
                                                </a>
                                            </td>
                                            <th className='w-[10%]'>
                                                    <a href={problem.leetcode} target="_blank" rel="noopener noreferrer">
                                                        <img src="/leetcode.png" alt="Leetcode"  className="w-6 h-6 bg-transparent" />
                                                    </a>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        {/* </div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Problems