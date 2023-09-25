import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function PrivateRoute() {

    const isAuthenticated = true
    let {user, authTokens} = useContext(AuthContext)
    let authTokens2=localStorage.getItem('authTokens')
    // console.log('user.is_superuser',user.is_superuser)
  return (
    <>
    {authTokens &&  user.is_superuser ? <Outlet/> : <Navigate to='/' />}
    </>
  )
}

export default PrivateRoute


// import React , { useContext } from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { Outlet } from 'react-router-dom';
// import AuthContext ,{ AuthProvider } from '../context/AuthContext';

// const PrivateRoute = () => {
  
//     const isAuthenticated = true
//     let {user} = useContext(AuthContext)
//     let {role} = useContext(AuthContext)
    
//   return(<>
//     {/* {isAuthenticated ? <Outlet /> : <Navigate to='/admin-login' />} */}
//     {user.hasOwnProperty('email') && role!=="financial" ?  <Outlet /> :   <Navigate to='/admin-login' />}
//   </>)
// }

// export default PrivateRoute;

// /////////////////////////////////////

// const PrivateRouteFinancial = () => {
  
//   const isAuthenticated = true
//   let {role} = useContext(AuthContext)
  
// return(<>
//   {/* {isAuthenticated ? <Outlet /> : <Navigate to='/admin-login' />} */}
//   {role === 'financial' ?  <Outlet /> :   <Navigate to='/admin-login' />}
// </>)
// }

// export {PrivateRouteFinancial};