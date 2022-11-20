import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <span className="logo-span">Quiet Time</span>
      <span className="link-span">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/meditation">Meditate</NavLink>
        <NavLink to="/park">Meander</NavLink>
        <NavLink to="/journal">Gratitude</NavLink>
      </span>
    </nav>
  );
}

export default Nav;
