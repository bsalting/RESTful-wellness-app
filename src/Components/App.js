import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Nav from './Nav';
import Meditation from './Meditation/Meditation';
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
      <h1>Wellness</h1>
      {auth.id ? <Home /> : <Login />}
      {!!auth.id && (
        <div>
          <Nav />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/meditation" element={<Meditation />} />
            {/* <Route exact path="/park" element={<Park />} />
            <Route exact path="/journal" element={<Journal />} /> */}
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
