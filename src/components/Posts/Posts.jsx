import axios from 'axios';
import React, { useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const fetchPosts = async () => await axios.get("https://jsonplaceholder.typicode.com/posts");
const newPost = async (title, body) => {
    return await axios.post("https://jsonplaceholder.typicode.com/posts", {
        body,
        title,
        userId: 77
    })
}

const Posts = () => {
    const titleRef = useRef("");
    const bodyRef = useRef("");
    const { isLoading, isError, data, refetch } = useQuery("posts", fetchPosts);
    const mutation = useMutation(newPost);
    const navigate = useNavigate();
    if (isLoading) return <h1>Loading...</h1>

    if (isError) return <h1>Oops, error :-)</h1>
    return (
        <div className='container mx-auto py-2'>
            <div className='flex gap-x-2'>
                <button className='p-2 px-3 rounded-md bg-blue-500 text-white font-semibold text-lg' onClick={() => navigate("/")}>Go to Home</button>
                <button className='p-2 px-3 rounded-md bg-pink-500 text-white font-semibold text-lg' onClick={() => refetch()}>Refetch Data</button>
            </div>
            <div className='flex flex-col w-full h-auto p-3 items-center justify-center'>
                <h1 className='font-bold font-mono text-3xl'>Add New Post</h1>
                <input type="text" ref={titleRef} className='border-2 border-gray-700 text-gray-900 w-[400px] p-1 outline-none' placeholder='Post Title' />
                <input type="text" ref={bodyRef} className='border-2 border-gray-700 text-gray-900 w-[400px] p-1 mt-1 outline-none' placeholder='Post body' />
                <button onClick={() => {
                    mutation.mutateAsync({ title: titleRef.current.value, body: bodyRef.current.value })
                }} className={`w-[400px] bg-green-600 mt-2 p-2 font-semibold text-xl text-white ${mutation.isLoading ? "bg-opacity-50 cursor-not-allowed" : ""}`}>Add post</button>
                {mutation.isLoading && <p>Post is adding...</p>}
                {mutation.isSuccess &&
                    <p>Post Succesfully added :)</p>
                }
            </div>
            <div className='w-full min-h-screen pt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
                {data.data.map(post => (
                    <motion.div animate={{
                        opacity: 1,
                        rotate: 360,
                    }} initial={{
                        opacity: 0,
                    }}
                        transition={{
                            type: "spring",
                            duration: 1.5,
                            delay: 0.3
                        }}
                        key={post.id} className="w-full bg-emerald-600 p-2 rounded-[4px]">
                        <Link to={`${post.id}`} className='text-xl font-semibold text-white font-mono no-underline'>Post {post.id}</Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Posts;