import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getParentCredentials } from '../../actions/parentActions'
import Loader from '../../components/Loader'

// import { newGoogleUser } from '../../actions/newUserActions'
// import { userInfo } from '../../actions/userActions'

import { ParentHomeContainer } from './styled'

const ParentHome = () => {
  const dispatch = useDispatch()

  const { userInfo, loading, error } = useSelector((state) => state.user)
  console.log('userInfo', userInfo)
  console.log('loading', loading)
  console.log('error', error)

  // console.log(userInfo, loading, error)
  useEffect(() => {
    dispatch(getParentCredentials())
  }, [dispatch])

  return (
    <ParentHomeContainer>
      {' '}
      {(loading && <Loader />) || (
        <div>
          <h1>Welcome to the parent homepage</h1>
          {(userInfo && (
            <div>it is great to see you again {userInfo.displayName}</div>
          )) || <div>Who on earth are you</div>}
        </div>
      )}
    </ParentHomeContainer>
  )
}

export default ParentHome
