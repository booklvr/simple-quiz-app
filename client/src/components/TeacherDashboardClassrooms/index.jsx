import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentTeachersClassrooms } from '../../actions/classroomActions'
import AddClassroomForm from '../AddClassroomForm'
import Loader from '../Loader'
import {
  AddClassroomButton,
  ClassroomContentContainer,
  ClassroomListItem,
  ClassroomListItemLink,
  ClassroomListItemName,
  ClassroomNeedHelpContainer,
  ClassroomNeedHelpHeader,
  ClassroomsContainer,
  ClassroomsHeaderContainer,
  ClassroomsHeading,
  ClassroomsList,
} from './style'

const TeacherDashboardClassrooms = () => {
  const dispatch = useDispatch()
  const { loading, classrooms, results, error } = useSelector(
    (state) => state.getAllCurrentTeacherClassrooms
  )

  const {
    loading: loadingAddClassroom,
    error: errorAddClassroom,
    classroom,
  } = useSelector((state) => state.addClassroom)

  Modal.setAppElement('#root')

  // const customModalStyles = {
  //   content: {
  //     //   display: 'flex',
  //     //   flexDirection: 'column',
  //     left: '50%',
  //     right: 'auto',
  //     bottom: 'auto',
  //     marginRight: '-50%',
  //     transform: 'translate(-50%, -50%)',
  //   },
  // }

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    dispatch(getCurrentTeachersClassrooms())
  }, [dispatch, results, classroom])

  return (
    <ClassroomsContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Add Classroom'
        // style={customModalStyles}
      >
        <AddClassroomForm closeModal={closeModal} />
      </Modal>
      <ClassroomsHeaderContainer>
        <ClassroomsHeading>Your classrooms</ClassroomsHeading>
        <AddClassroomButton onClick={openModal}>
          Add a classroom
        </AddClassroomButton>
      </ClassroomsHeaderContainer>
      {(loading && <Loader />) || (
        <ClassroomContentContainer>
          <ClassroomsList>
            {classrooms.length > 0 &&
              classrooms.map((classroom, index) => (
                <ClassroomListItem key={index}>
                  <ClassroomListItemLink
                    to={`/teacher/classroom/${classroom.slug}`}
                  >
                    name: {classroom.className}
                  </ClassroomListItemLink>
                  <ClassroomListItemLink
                    to={`/teacher/classroom/${classroom.slug}`}
                  >
                    students: {classroom.students.length}
                  </ClassroomListItemLink>
                </ClassroomListItem>
              ))}
          </ClassroomsList>
          <ClassroomNeedHelpContainer>
            <ClassroomNeedHelpHeader>Need Help?</ClassroomNeedHelpHeader>
          </ClassroomNeedHelpContainer>
        </ClassroomContentContainer>
      )}
    </ClassroomsContainer>
  )
}

export default TeacherDashboardClassrooms
