import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './Button'
import { auth } from '../config/firebase-config'
import { signOut } from 'firebase/auth'
import { useGetUserInfo } from '../hooks/useGetUserInfo'
import './Navbar.css'

function Navbar() {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false)
    } else { 
      setButton(true)
    }
  }

  const navigate = useNavigate()
  const {isAuth, profilePhoto, name} = useGetUserInfo()

  const NavBarButton = () => {
    if (!isAuth) {
      return (
        button && (
          <div className='navbar-button-container'>
            <Button
              linkTo= "/sign-in"
              buttonStyle="btn--outline"
              >
              Sign in
            </Button>
          </div>
        )
      )
    }
    if (isAuth) {
      return (
        button && (
          <div className="navbar-signin-container">
            <div className="navbar-profile">
              <p>
                {name.split(" ")[0]}
                <img src={profilePhoto} alt="" className="nav-profile-photo" />
              </p>
            </div>
            <ul className='nav-user-submenu'>
              <li className='nav-submenu-item'>
              <Link className="nav-admin-link" to="/add-match">
                Add Match
              </Link>
              </li>
              <li className='nav-submenu-button'>
              <Button onClick={signUserOut} buttonStyle="btn--outline">
                Sign out
              </Button>
              </li>
            </ul>
          </div>
        )
      );
    }
  }

  const NavBarMobileButton = () => {
    if (!isAuth) {
      return (
        <li className="nav-item">
          <Link
            to="/sign-in"
            className="nav-links-mobile"
            onClick={closeMobileMenu}
          >
            Sign in
          </Link>
        </li>
      )
    }
    if (isAuth) {
      return (
        <>
        <li className='nav-item'>
          <Link to="/add-match" className='nav-links-mobile' onClick={closeMobileMenu}>
            Add Match
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-links-mobile"
            onClick={ () => {
              signUserOut()
              closeMobileMenu()
            }}
          >
            <img src={profilePhoto} alt='' className='nav-profile-photo'/>
            Sign out
          </Link>
        </li>
        </>
      );
    }
  }

  useEffect(() => {
    showButton()
  },[])

  window.addEventListener('resize', showButton)
  
  const signUserOut = async () => {
    try {
      await signOut(auth)
      localStorage.clear()
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            DPL <i className="fa-regular fa-futbol"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fa-solid fa-times" : "fa-solid fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
              to="/"
              className="nav-links"
              onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/fixtures"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Fixtures
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/results"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Results
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/table"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Table
              </Link>
            </li>
            <li className="nav-item">
              <Link
              to="/stats"
              className="nav-links"
              onClick={closeMobileMenu}
              >
                Stats
              </Link>
            </li>
            <li className="nav-item">
              <Link
              to="/clubs"
              className="nav-links"
              onClick={closeMobileMenu}
              >
                Clubs
              </Link>
            </li>
            <li className="nav-item">
              <Link
              to="/highlights"
              className="nav-links"
              onClick={closeMobileMenu}
              >
                Highlights
              </Link>
            </li>
            {NavBarMobileButton()}
          </ul>
          {NavBarButton()}
        </div>
      </nav>
    </>
  );
}

export default Navbar