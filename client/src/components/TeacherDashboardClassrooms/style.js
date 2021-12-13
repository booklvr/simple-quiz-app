import { Link } from 'react-router-dom'

import styled from 'styled-components/macro'

export const ClassroomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

export const ClassroomsHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 4rem;
  padding: 0 2rem;
  background-color: lightgrey;
`

export const ClassroomsHeading = styled.h3`
  font-size: 2rem;
  color: 'darkgrey';
`

export const AddClassroomButton = styled.button`
  color: black;
`

export const ClassroomContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const ClassroomsList = styled.ul`
  list-style: none;
  width: 65%;
`

export const ClassroomListItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-bottom: 1px solid grey;
  padding: 1rem 0;
`

export const ClassroomListItemLink = styled(Link)`
  font-size: 1.5rem;
`

export const ClassroomNeedHelpContainer = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid darkgrey;
`

export const ClassroomNeedHelpHeader = styled.div`
  font-size: 2rem;
`
