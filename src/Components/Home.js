import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import Button from '@mui/material/Button';

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        Peace, {auth.username}!
        <Button onClick={() => dispatch(logout())}>Logout</Button>
      </div>
    </div>
  );
};

export default Home;
