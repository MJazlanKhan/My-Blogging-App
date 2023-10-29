import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';

function Home() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get('https://my-blogging-app-server.vercel.app/api/v1/posts');
        if (response.status === 200) {
          const data = response.data;
          setBlogPosts(data);
        } else {
          console.error('Error fetching blog posts:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div >
      <div className='wrapper'>
        {blogPosts.map(blogPost => (
          <div className='post' key={blogPost._id}>
            <h2>{blogPost.title}</h2>
            <img src={`https://my-blogging-app-server.vercel.app${blogPost.imageURL}`} alt="Image" />
            <p>Author: {blogPost.author}</p>
            <p>{blogPost.summary}</p>
            <Button type='primary'>
            <Link to={`/post/${blogPost._id}`}>Read More</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
