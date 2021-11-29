import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { newGoogleUser } from '../../actions/newUserActions'
import { getStudentCredentials } from '../../actions/studentActions'
import Loader from '../../components/Loader'

import { StudentHomeContainer } from './styled'

const StudentHome = () => {
  const dispatch = useDispatch()

  const { userInfo, loading, error } = useSelector((state) => state.user)
  console.log('userInfo', userInfo)
  console.log('loading', loading)
  console.log('error', error)

  // console.log(userInfo, loading, error)
  useEffect(() => {
    dispatch(getStudentCredentials())
  }, [dispatch])

  return (
    <StudentHomeContainer>
      {' '}
      {(loading && <Loader />) || (
        <div>
          <h1>Welcome to the student homepage</h1>
          {(userInfo && (
            <div>it is great to see you again {userInfo.displayName}</div>
          )) || <div>Who on earth are you</div>}
        </div>
      )}
    </StudentHomeContainer>
  )
}

export default StudentHome
