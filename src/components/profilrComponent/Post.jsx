// PostComponent.jsx

import React, { useState, useEffect } from "react";
import "./styles/posts.css";
import Popup from "./Popup";

const PostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="post-container">
      {posts.map((post) => (
        <div key={post.id}>
          <div key={post.id} className="post" onClick={togglePopup}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
          {isOpen && (
            <Popup
              content={
                <>
                  <b>{post.title}</b>
                  <p>{post.body}</p>
                </>
              }
              handleClose={togglePopup}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostComponent;
