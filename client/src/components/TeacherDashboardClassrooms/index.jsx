import React, { useState } from 'react'
import Modal from 'react-modal'
import AddClassroomForm from '../AddClassroomForm'
import {
  AddClassroomButton,
  ClassroomContentContainer,
  ClassroomsContainer,
  ClassroomsHeaderContainer,
  ClassroomsHeading,
} from './style'

const TeacherDashboardClassrooms = () => {
  Modal.setAppElement('#root')

  const customModalStyles = {
    content: {
      //   display: 'flex',
      //   flexDirection: 'column',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <ClassroomsContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Add Classroom'
        // style={customModalStyles}
      >
        <AddClassroomForm />
      </Modal>
      <ClassroomsHeaderContainer>
        <ClassroomsHeading>Your classrooms</ClassroomsHeading>
        <AddClassroomButton onClick={openModal}>
          Add a classroom
        </AddClassroomButton>
      </ClassroomsHeaderContainer>
      <ClassroomContentContainer></ClassroomContentContainer>
    </ClassroomsContainer>
  )
}

export default TeacherDashboardClassrooms
