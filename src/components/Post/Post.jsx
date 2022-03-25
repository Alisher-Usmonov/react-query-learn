import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchPost = async ({ queryKey }) => {
    return await axios.get(`https://jsonplaceholder.typicode.com/posts/${queryKey[1]}`);
}

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useQuery(["post", id], fetchPost);
    if (isLoading) return <h1>Post is loading....)</h1>
    if (isError) return <h1>{error}</h1>
    return (
        <div className='container mx-auto'>
            <h1 className='text-[25px] font-semibold text-gray-700 '>{data.data.title}</h1>
            <h3 className='text-[18px] font-semibold text-gray-700'>{data.data.body}</h3>
            <button className='p-2 px-3 rounded-md bg-blue-500 text-white font-semibold text-lg' onClick={() => navigate("/posts")}>Go Posts</button>
        </div>
    )
}

export default Post