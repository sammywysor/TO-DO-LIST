"use client";

import React, { useState } from 'react';

interface Task {
    title: string;
    desc: string;
    priority: string;
    dueDate: string;
    completed: boolean;
}

const Page: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [priority, setPriority] = useState<string>("Medium");
    const [dueDate, setDueDate] = useState<string>("");
    const [mainTask, setMainTask] = useState<Task[]>([]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTask: Task = { title, desc, priority, dueDate, completed: false };
        setMainTask(prevTasks => [...prevTasks, newTask]);
        setTitle("");
        setDesc("");
        setPriority("Medium");
        setDueDate("");
    };

    const deleteHandler = (index: number) => {
        const updatedTasks = [...mainTask];
        updatedTasks.splice(index, 1);
        setMainTask(updatedTasks);
    };

    const toggleCompletion = (index: number) => {
        const tasksCopy = [...mainTask];
        tasksCopy[index].completed = !tasksCopy[index].completed;
        setMainTask(tasksCopy);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center justify-center py-5 px-3">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl flex">
                
                <div className="w-1/2 p-4">
                    <h1 className="text-center text-4xl font-bold mb-8 text-purple-700">Add New Task</h1>
                    
                    <form onSubmit={submitHandler} className="space-y-5">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Task</label>
                            <input 
                                type="text" 
                                placeholder="Enter Task Here" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                className="w-full border rounded-md py-2 px-3 focus:ring focus:ring-purple-300 focus:border-purple-300"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Description</label>
                            <input 
                                type="text" 
                                placeholder="Enter Description Here" 
                                value={desc} 
                                onChange={(e) => setDesc(e.target.value)} 
                                className="w-full border rounded-md py-2 px-3 focus:ring focus:ring-purple-300 focus:border-purple-300"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Priority</label>
                            <select 
                                value={priority} 
                                onChange={(e) => setPriority(e.target.value)} 
                                className="w-full border rounded-md py-2 px-3 focus:ring focus:ring-purple-300 focus:border-purple-300"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Due Date</label>
                            <input 
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full border rounded-md py-2 px-3 focus:ring focus:ring-purple-300 focus:border-purple-300"
                            />
                        </div>
                        <div className="text-center">
                            <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 active:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>

                <div className="w-1/2 p-4 border-l">
                    <h2 className="text-center text-4xl font-bold mb-8 text-purple-700">Your Tasks</h2>
                    
                    {mainTask.length === 0 ? (
                        <h2 className="text-center text-gray-500">No Task Available</h2>
                    ) : (
                        <ul className="space-y-4">
                            {mainTask.map((task, i) => (
                                <li key={i} className="flex items-center justify-between border p-3 rounded-md hover:bg-gray-100">
                                    <div>
                                        <input type="checkbox" checked={task.completed} onChange={() => toggleCompletion(i)} />
                                    </div>
                                    <div className="flex flex-col ml-4">
                                        <h5 className={`text-xl font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</h5>
                                        <h6 className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-500'}`}>{task.desc}</h6>
                                    </div>
                                    <button 
                                        onClick={() => deleteHandler(i)} 
                                        className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <footer className="mt-5 text-center text-gray-600 w-full">
                Created by ABDUL SAMAD.
            </footer>
        </div>
    );
}

export default Page;
