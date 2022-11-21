import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Landing from './Landing';
import Nav from './Nav';
import Meditation from './Meditation/Meditation';
import Park from './Park';
import Journal from './Journal/Journal';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken } from '../store';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      {auth.id ? <Home /> : <Login />}
      {!!auth.id && (
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/meditation" element={<Meditation />} />
            <Route path="/park" element={<Park />} />
            <Route path="/journal" element={<Journal />} />
            {/* <Route path="/give" element={<Give />} /> */}
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
