import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <span className="logo-span">
        {/* <img src={brain} alt="brain logo"></img> */}
        Wellness
      </span>
      <span className="link-span">
        <NavLink to="/meditation">Meditate</NavLink>
        <NavLink to="/park">Fresh Air</NavLink>
        <NavLink to="/journal">Gratitude</NavLink>
      </span>
    </nav>
  );
}

export default Nav;
