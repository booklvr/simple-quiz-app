import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { verifyLoggedInUser } from '../actions/userActions'

const useVerifyLoggedInUser = (accountType) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector((state) => state.user)
  const {
    verified,
    loading: loadingVerifiedUser,
    error,
    message,
  } = useSelector((state) => state.verifyLoggedInUser)
  const { loading: loadingRegisterWithEmail } = useSelector(
    (state) => state.registerWithEmail
  )

  // if not waiting for a response from registering with email
  // * verify that the user is authenticated because of google Oauth2 redirection limitation
  // * once verified save user to user state
  useEffect(() => {
    console.log('for now i am in the teacher homepage')

    if (!loadingRegisterWithEmail) {
      // verify current logged in user
      dispatch(verifyLoggedInUser())
    }

    // setFirstLoad(false)
  }, [dispatch, history, loadingRegisterWithEmail])

  /*
    if verification has completed, and user is not found the re-route to login or to appropriate account type dashboard 
  */
  useEffect(() => {
    console.log('in this useEffect')
    if (verified) {
      if (!user) {
        history.push('/login')
      }
      if (user && user.accountType !== accountType) {
        history.push(`/${user.accountType}`)
      }
    }
  }, [user, history, verified, accountType])

  return {
    user,
    loading: loadingRegisterWithEmail || loadingVerifiedUser,
    verified,
    error,
    message,
  }
}

export default useVerifyLoggedInUser
