import styled from 'styled-components/macro'

export const AddClassroomFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const AddClassroomFormHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 100%;
  position: relative;
  background: lightgrey;
  margin-bottom: 2rem;
`

export const ExitModalButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 2rem;
  width: 4rem;
  left: 0px;
  top: 0rem;
  cursor: pointer;

  background-color: darkgrey;
  &:hover {
    color: red;
  }
`

export const AddClassroomFormHeading = styled.h3`
  font-size: 2rem;
`

export const AddClassroomFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

export const AddClassroomFormInput = styled.input``

export const AddClassroomFormLabel = styled.label``

export const AddClassroomFormSubmitButton = styled.button`
  padding: 0.5rem;
`
