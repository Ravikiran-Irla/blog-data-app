import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostDetail from './components/postDetail';
import PostList from './components/postList';
import './App.css'

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <h1>Blog Application</h1>
      <input 
        type="text" 
        placeholder="Search by title..." 
        value={searchTerm}
        onChange={handleSearch}
      />
      <PostList posts={currentPosts} onPostClick={handlePostClick} />
      {selectedPost && <PostDetail post={selectedPost} />}
      <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={indexOfLastPost >= filteredPosts.length}>
        Next
      </button>
    </div>
  );
};

export default App;