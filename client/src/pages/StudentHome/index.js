import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newGoogleUser } from '../../actions/newUserActions'

import { StudentHomeContainer } from './styled'

const StudentHome = () => {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(newGoogleUser())
    }, [dispatch])

    return (
        <StudentHomeContainer>
            welcome to the student home page
        </StudentHomeContainer>
    )
}

export default StudentHome
