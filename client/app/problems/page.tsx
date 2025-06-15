'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Problems{
    topicWiseProblems: {
        [key: string]: any[]
    };
    totalProblems: number
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
        totalProblems: 0
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
        <div>
            <h4>All Problems</h4>
            <span>{problems.totalProblems}</span><br/>
            <span>Done: {progress.totalDone}</span><br/>
            <span>Easy: {progress.totalEasyDone}</span><br/>
            <span>Medium: {progress.totalMediumDone}</span><br/>
            <span>Hard: {progress.totalHardDone}</span><br/>
            <div>
                {Object.entries(problems.topicWiseProblems).map(([topic, problemList])=>(
                    <div>
                        <h2>{topic}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Marked</th>
                                    <th>Name</th>
                                    <th>Level</th>
                                    <th>Youtube</th>
                                    <th>Leetcode</th>
                                </tr>
                            </thead>
                            <tbody>
                                {problemList.map(problem=>(
                                    <tr key={problem.id}>
                                        <td><input type='checkbox' 
                                            id={problem.id} 
                                            name={problem.id} 
                                            value={problem.id} 
                                            checked={problem.isMarked} 
                                            onChange={async ()=> await clicked(problem.id, !problem.isMarked)}/>
                                        </td>
                                        <td>{problem.name}</td>
                                        <td>{problem.level}</td>
                                        <td>{problem.youtube}</td>
                                        <td>{problem.leetcode}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Problems