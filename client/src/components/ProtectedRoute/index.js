import React, {useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom';


const ProtectedRoute = ({
  path, component: Component, render, loggedIn, ...rest
}) => {

  useEffect(() => {

  }, [])

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (loggedIn) {
          return Component ? <Component {...props} /> : render(props);
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    >
      
    </Route>
  )
}

export default ProtectedRoute
