import React, { useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import Landing from './Landing';
import Nav from './Nav';
import Meditation from './Meditation/Meditation';
import Park from './Park';
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
            {/* <Route exact path="/journal" element={<Journal />} />  */}
            <Route path="/park" element={<Park />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
