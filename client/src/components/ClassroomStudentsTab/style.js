import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

export const ClassroomStudentsTabContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1rem;
`

export const TeacherDashboardReturnLink = styled(Link)`
  color: blue;
  cursor: pointer;
  text-decoration: none;
`

export const ClassroomStudentTabHeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
  width: 100%;
`

export const ClassroomStudentTabHeader = styled.h3`
  font-size: 2rem;
  color: black;
`

export const ShareClassCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
`

export const ShareClassCodeModalButton = styled.div`
  color: blue;
  font-size: 1rem;
  cursor: pointer;
`

export const ShareClassCodeRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

export const ShareClassCodeInviteCode = styled.div`
  font-size: 2.5rem;
`

export const CopyMessage = styled.p`
  font-size: 1rem;
  color: green;
`

export const ClassroomStudentTabContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`
