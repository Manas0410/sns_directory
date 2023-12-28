import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Component for the user directory
const UserDirectory = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users', error));
  }, []);
console.log(users)
  return (
    <div>
      <h1>User Directory</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {/* Link to the user's profile page */}
            <Link to={`/profile/${user.id}`}>
              {user.name} - {user.postsCount || 0} posts
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserDirectory