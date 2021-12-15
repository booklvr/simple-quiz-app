import styled from 'styled-components/macro'

export const TeacherHomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const TeacherDashboardBannerContainer = styled.div`
  height: 5rem;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: lightgrey;
  color: black;
  padding-left: 2rem;
`

export const TeacherDashboardWelcomeMessage = styled.p`
  font-size: 2rem;
`

export const TeacherDashboardNavigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  background-color: grey;
  padding-left: 2rem;
`

export const TeacherDashboardNavigationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  height: 3rem;
  font-size: 2rem;
  padding: 0 2rem;
`

export const TeacherDashboardContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
