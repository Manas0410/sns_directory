// PostComponent.jsx

import React, { useState, useEffect } from 'react';

const PostComponent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="post-container" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostComponent;
