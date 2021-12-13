import React from 'react'
import {
  ClassroomNavigationContainer,
  ClassroomNavigationHeading,
  ClassroomNavigationList,
  ClassroomNavigationListItem,
} from './style'

const ClassroomNavigation = ({ setClassroomTab }) => {
  return (
    <ClassroomNavigationContainer>
      <ClassroomNavigationHeading>tools</ClassroomNavigationHeading>
      <ClassroomNavigationList>
        <ClassroomNavigationListItem
          onClick={() => setClassroomTab('students')}
        >
          Students
        </ClassroomNavigationListItem>
        <ClassroomNavigationListItem onClick={() => setClassroomTab('tools')}>
          Tools
        </ClassroomNavigationListItem>
        <ClassroomNavigationListItem
          onClick={() => setClassroomTab('settings')}
        >
          Settings
        </ClassroomNavigationListItem>
      </ClassroomNavigationList>
    </ClassroomNavigationContainer>
  )
}

export default ClassroomNavigation
