import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeacherCredentials } from '../../actions/teacherActions'
import Loader from '../../components/Loader'
// import { authenticateUser } from '../../actions/userActions'

// import { newGoogleUser } from '../../actions/newUserActions'
// import { userInfo } from '../../actions/userActions'

import { TeacherHomeContainer } from './styled'

const TeacherHome = () => {
  const dispatch = useDispatch()

  const { userInfo, loading, error } = useSelector((state) => state.user)
  console.log('userInfo', userInfo)
  console.log('loading', loading)
  console.log('error', error)

  // console.log(userInfo, loading, error)
  useEffect(() => {
    if (!userInfo) {
      dispatch(getTeacherCredentials())
    }
  }, [dispatch, userInfo])

  return (
    <TeacherHomeContainer>
      {(loading && <Loader />) || (
        <div>
          <h1>Welcome to the teacher homepage</h1>
          {(userInfo && (
            <div>it is great to see you again {userInfo.displayName}</div>
          )) || <div>Who on earth are you</div>}
        </div>
      )}
    </TeacherHomeContainer>
  )
}

export default TeacherHome
