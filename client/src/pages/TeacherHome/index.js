import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newGoogleUser } from '../../actions/newUserActions'

import { TeacherHomeContainer } from './styled'

const TeacherHome = () => {
    const dispatch = useDispatch()

    
    useEffect(() => {
        dispatch(newGoogleUser())
    }, [dispatch])

    return (
        <TeacherHomeContainer>
            welcome to the teacher home page
        </TeacherHomeContainer>
    )
}

export default TeacherHome
