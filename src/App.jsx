import { useState } from 'react'
import logo from './logo.svg'
import './App.css';
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
import Post from './components/Post/Post';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='posts' element={<Posts />} />
          <Route path='posts/:id' element={<Post />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
