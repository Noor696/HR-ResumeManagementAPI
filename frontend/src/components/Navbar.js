import React, { useState, useEffect, useContext } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthContext from '../context/AuthContext';


function Navbar() {

    let {user, authTokens, logoutUser} = useContext(AuthContext)
    let authTokens2=localStorage.getItem('authTokens')
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true);

    const handleClick = () => {
      setClick(!click)  
    }

    const closeMobileMenu = () => {
        setClick(false);
    }

    const showButton = () => {
        if (window.innerWidth <= 960) {
          setButton(false);
        } else {
          setButton(true);
        }
      };
    
      useEffect(() => {
        showButton();
      }, []);
    
      window.addEventListener('resize', showButton);

      const handleLogout = () => {
        logoutUser()
        closeMobileMenu()
      }
    
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' 
          onClick={closeMobileMenu}
          >
            HR-system
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
             {/* <p style={{color:'white'}}>Hello {name}</p> */}
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {/* {console.log('user.is_superuser',user.is_superuser)} */}
            {user && 
            <li  className='nav-item'>
                <Link style={{color:'white'}} to='#' className='nav-links' onClick={closeMobileMenu}>
                Hello {user.username}
                </Link>
            </li>
            }
            <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    Home
                </Link>
            </li>

            <li className='nav-item'>
                <Link to='/candidates' className='nav-links' onClick={closeMobileMenu}>
                    Candidates
                </Link>
            </li>
            {!authTokens?
            <>
            <li className='nav-item'>
                <Link to='/sign-in' className='nav-links-mobile' onClick={closeMobileMenu}>
                    Sign In
                </Link>
            </li>
            {button && 
            <Link to='/sign-in' className='btn-mobile'>
              <button className='signinButton'>Sign In</button>
            </Link>
            }
            </>
            :
            <>
            <li className='nav-item'>
                <Link to='#' className='nav-links-mobile' onClick={handleLogout}>
                    Sign Out
                </Link>
            </li>
            {button && 
            <Link to='#' className='btn-mobile'>
              <button onClick={logoutUser} className='signinButton'>Sign Out</button>
            </Link>
            }
            </>
            }
            
                
          </ul>
        </div>

      </nav>
    </>
  )
}

export default Navbar