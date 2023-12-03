import { NavLink } from 'react-router-dom'

import classes from './Navbar.module.css'

const Navbar = () => {
  return (
    <>
      <div className={classes.container}>
        <NavLink to="/">
          <p className={classes.logo}>Thai National ID Card</p>
        </NavLink>
        <div className={classes.menuContainer}>
          <NavLink to="/" className={({ isActive }) => (isActive ? classes.active : classes.inActive)}>
            <div className={classes.navMenu}>
              Home<div className={classes.rectangle}></div>
            </div>
          </NavLink>

          <NavLink to="/search" className={({ isActive }) => (isActive ? classes.active : classes.inActive)}>
            <span className={`font-mon font-medium ${classes.navMenu}`}>
              Search<div className={classes.rectangle}></div>
            </span>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Navbar
