import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Modal from 'react-modal'

import Loader from '../Loader'
import {
  ClassroomStudentsTabContainer,
  ClassroomStudentTabContent,
  ClassroomStudentTabHeader,
  ClassroomStudentTabHeadingContainer,
  CopyMessage,
  ShareClassCodeContainer,
  ShareClassCodeInviteCode,
  ShareClassCodeModalButton,
  ShareClassCodeRow,
  TeacherDashboardReturnLink,
} from './style'

const ClassroomStudentsTab = () => {
  const {
    loading,
    error,
    classroom: { className, owner, slug, inviteCode, students },
  } = useSelector((state) => state.getClassroom)

  const [isCopyMessage, setIsCopyMessage] = useState(false)

  Modal.setAppElement('#root')

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsCopyMessage(false)
    }, 2000)
  }, [isCopyMessage])

  return (
    <ClassroomStudentsTabContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Share Link'
        // style={customModalStyles}
      >
        <h1>add email to do</h1>
        <button onClick={closeModal}>exit</button>
      </Modal>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>error: {error}</p>
      ) : (
        <>
          <TeacherDashboardReturnLink to='/teacher'>
            teacher dashboard
          </TeacherDashboardReturnLink>
          <ClassroomStudentTabHeadingContainer>
            <ClassroomStudentTabHeader>
              Student Roster for {className}
            </ClassroomStudentTabHeader>
            <ShareClassCodeContainer>
              <ShareClassCodeModalButton onClick={openModal}>
                Share class code
              </ShareClassCodeModalButton>
              <ShareClassCodeRow>
                <ShareClassCodeInviteCode>
                  {inviteCode}
                </ShareClassCodeInviteCode>
                <CopyToClipboard
                  text={inviteCode}
                  onCopy={() => {
                    setIsCopyMessage(true)
                  }}
                >
                  <button>copy</button>
                </CopyToClipboard>
              </ShareClassCodeRow>
              {isCopyMessage && (
                <CopyMessage>Invite Code copied to clipboard</CopyMessage>
              )}
            </ShareClassCodeContainer>
          </ClassroomStudentTabHeadingContainer>
          <ClassroomStudentTabContent>
            {students?.map((student, index) => (
              <p>{student.displayName}</p>
            ))}
          </ClassroomStudentTabContent>
        </>
      )}
    </ClassroomStudentsTabContainer>
  )
}

export default ClassroomStudentsTab
