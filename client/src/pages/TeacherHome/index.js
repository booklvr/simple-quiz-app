import React, { useState } from 'react'
import Loader from '../../components/Loader'
import useVerifyLoggedInUser from '../../hooks/useVerifyLoggedInUser'

import {
  TeacherDashboardBannerContainer,
  TeacherDashboardContentContainer,
  TeacherDashboardNavigation,
  TeacherDashboardNavigationButton,
  TeacherDashboardWelcomeMessage,
  TeacherHomeContainer,
} from './styled'

// components
import TeacherDashboardClassrooms from '../../components/TeacherDashboardClassrooms'

const TeacherHome = () => {
  // useVerifyLoggedInUser()
  // ------------------------
  // wait for the registerWithEmail flag to complete
  // make a request to the backend to verify the user
  // add user to user state
  // if error re route to login or other logged in account page
  const { user, loading, error, message } = useVerifyLoggedInUser()
  // ---------------------------------------------------------------

  const [currentTab, setCurrentTab] = useState('classrooms')

  return (
    <TeacherHomeContainer>
      {(loading && <Loader></Loader>) || (
        <>
          <TeacherDashboardBannerContainer>
            <TeacherDashboardWelcomeMessage>
              Welcome, {user.displayName}
            </TeacherDashboardWelcomeMessage>
          </TeacherDashboardBannerContainer>
          <TeacherDashboardNavigation>
            <TeacherDashboardNavigationButton
              onClick={() => setCurrentTab('classrooms')}
            >
              Classroom
            </TeacherDashboardNavigationButton>
            <TeacherDashboardNavigationButton
              onClick={() => setCurrentTab('students')}
            >
              Student
            </TeacherDashboardNavigationButton>
          </TeacherDashboardNavigation>
          <TeacherDashboardContentContainer>
            {(currentTab === 'classrooms' && <TeacherDashboardClassrooms />) ||
              (currentTab === 'students' && <div>students</div>)}
          </TeacherDashboardContentContainer>
        </>
      )}
    </TeacherHomeContainer>
  )
}

export default TeacherHome
