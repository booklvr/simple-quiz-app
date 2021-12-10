import React from 'react'
import Loader from '../../components/Loader'
import useVerifyLoggedInUser from '../../hooks/useVerifyLoggedInUser'
import { ParentHomeContainer } from './styled'

const ParentHome = () => {
  // useVerifyLoggedInUser()
  // ------------------------
  // wait for the registerWithEmail flag to complete
  // make a request to the backend to verify the user
  // add user to user state
  // if error re route to login or other logged in account page
  const { user, loading, error, message } = useVerifyLoggedInUser()
  // ---------------------------------------------------------------
  return (
    <ParentHomeContainer>
      {(loading && <Loader></Loader>) || (
        <div>
          <p>Welcome to the parent homepage</p>
          <p>It's nice to see you again {user.displayName}</p>
          {error && <p>{error.message}</p>}
          {message && <p>{message}</p>}
        </div>
      )}
    </ParentHomeContainer>
  )
}

export default ParentHome
