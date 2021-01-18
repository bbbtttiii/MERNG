import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../context/auth'

export default function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext)
  
  return (
    //if logged in, redirect from login/register page to home
    //otherwise, pass down props to the route as usual
    <Route
      {...rest}
      render={props =>
        user ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  )
}