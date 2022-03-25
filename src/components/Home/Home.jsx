import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className=''>
        <Link to={"posts"} className="text-2xl text-blue-500">Posts is here</Link>
    </div>
  )
}

export default Home;