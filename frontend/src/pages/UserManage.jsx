import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UsersCard from '../components/UsersCard';
import Pagination from '../components/Pagination';
import axios from '../harpers/axios';

export default function UserManage() {
  const [users, setUsers] = useState([]);
  const [links, setLinks] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);
  let page = searchQuery.get('page');
  
  page = parseInt(page, 10) || 1;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios(`/api/users/usermanage?page=${page}`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = response.data;
        setUsers(data.data);
        setLinks(data.links);
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      } catch (error) {
        setError(error.message);
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [page]);
 
  const onDeleted = (_id) => {
    if (users.length === 1 && page > 1) {
      navigate(`/?page=${page - 1}`);
    } else {
      setUsers(prev => prev.filter(user => user._id !== _id));
    }
  };

  return (
    <div className='space-y-3 w-full'>
      {error && <div>Error: {error}</div>}
      {users.length > 0 ? (
        users.map(users => (
          <UsersCard key={users._id} users={users} onDeleted={onDeleted} />
        ))
      ) : (
        <div>No users found.</div>
      )}
      {links && <Pagination links={links} page={page} />}
    </div>
  );
}
