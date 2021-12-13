import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

export const ClassroomNavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 20rem;
  height: 100vh;
  background: lightslategrey;
`

export const ClassroomNavigationHeading = styled.h4`
  font-size: 2rem;
`

export const ClassroomNavigationList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

export const ClassroomNavigationListItem = styled.li`
  color: darkgrey;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
`
