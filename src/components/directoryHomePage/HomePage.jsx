import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../common.css";
import "./homePage.css";

// Component for the user directory
const UserDirectory = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users', error));
  }, []);

  return (
    <div className='home-page'>
      <div className='page-title'>User Directory</div>
      <div className='card-list'>
        {users.map(user => (
          <div key={user.id}>
            {/* Link to the user's profile page */}
            <Link to={`/profile/${user.id}`}>
              <div className='user-card'>
                <div>{user.name}</div>
                <div>{user.postsCount || 10} posts</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserDirectory