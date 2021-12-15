import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { verifyLoggedInUser } from '../../actions/userActions'
import Loader from '../Loader'

const TeacherProtectedRoute = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { loading, error } = useSelector((state) => state.verifyLoggedInUser)
  useEffect(() => {
    dispatch(verifyLoggedInUser())
  }, [dispatch])



  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (loading) {
          return <Loader />
        }
        if (user && user.accountType === 'teacher') {
          return Component ? <Component {...props} /> : render(props)
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              // state: { from: props.location },
            }}
          />
        )
      }}
    ></Route>
  )
}

export default TeacherProtectedRoute
