import { useEffect, useState } from 'react';
import axios from 'axios';

import './Landing.css';

export const Landing = () => {

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get('https://localhost:8000/users');
      console.log(response.data);
      setUsers(response.data);


    } catch (error) {
      console.log("Something went wrong");
    }
  }

  useEffect (() => {
    getUsers();
  }, []);
  

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(user => {
    return (
      user.username.toLowerCase().includes(filter) ||
      user.email.toLowerCase().includes(filter) ||
      user.phone.toLowerCase().includes(filter)
    );
  });

  return (
    <>
      <h2>Landing (Protected)</h2>

      <div className='filter-container'>
        <input
          type="text"
          placeholder="Filter by username, email, or phone"
          onChange={handleFilterChange}
        />
      </div>


      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.username || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>{user.phone || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* REMOVED FOR TOKEN SECURITY PURPOSES? */}
    </>
  );
};