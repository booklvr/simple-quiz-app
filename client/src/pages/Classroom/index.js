import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getClassroomDetails } from '../../actions/classroomActions'
import ClassroomNavigation from '../../components/ClassroomNavigation'
import ClassroomStudentsTab from '../../components/ClassroomStudentsTab'
import Loader from '../../components/Loader'
import {
  ClassroomContainer,
  ClassroomContainerSections,
  ClassroomContent,
} from './style'

const Classroom = () => {
  const dispatch = useDispatch()
  const { loading, error, classroom } = useSelector(
    (state) => state.getClassroom
  )

  const [classroomTab, setClassroomTab] = useState('students')


  const { slug } = useParams()

  useEffect(() => {
    dispatch(getClassroomDetails(slug))
  }, [dispatch, slug])
  return (
    <ClassroomContainer>
      {loading ? (
        <Loader />
      ) : error || !classroom ? (
        <p>There is an error</p>
      ) : (
        <ClassroomContainerSections>
          <ClassroomNavigation setClassroomTab={setClassroomTab} />
          <ClassroomContent>
            {(classroomTab === 'students' && <ClassroomStudentsTab />) ||
              (classroomTab === 'tools' && <p>tools</p>) ||
              (classroomTab === 'settings' && <p>settings</p>)}
          </ClassroomContent>
        </ClassroomContainerSections>
      )}
    </ClassroomContainer>
  )
}

export default Classroom
