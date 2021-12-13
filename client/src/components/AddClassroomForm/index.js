import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

import { useDispatch, useSelector } from 'react-redux'
import { addClassroom } from '../../actions/classroomActions'
import Loader from '../Loader'
import {
  AddClassroomFormContainer,
  AddClassroomFormGroup,
  AddClassroomFormHeader,
  AddClassroomFormHeading,
  AddClassroomFormInput,
  AddClassroomFormInputError,
  AddClassroomFormLabel,
  AddClassroomFormSubmitButton,
  ExitModalButton,
} from './style'

let renderCount = 0

const AddClassroomForm = ({ closeModal }) => {
  renderCount++
  // add Form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    getValues,
    formState,
    formState: { errors: formErrors, isDirty },
  } = useForm({
    defaultValues: {
      className: '',
    },
    criteriaMode: 'all',
  })
  const dispatch = useDispatch()

  const { _id } = useSelector((state) => state.user)
  const { loading, error, classroom } = useSelector(
    (state) => state.addClassroom
  )

  const [tempSubmitValue, setTempSubmitValue] = useState(``)

  const onSubmit = (data) => {
    setTempSubmitValue(getValues('className'))
    console.log(data)
    dispatch(addClassroom({ className: data.className, owner: _id }))

    console.log('isDirtySubmit', isDirty)

    if (classroom) {
      closeModal()
    }
  }

  // console.log('watch', watch())

  // useEffect(() => {
  //   if (loading && error) {
  //     resetField('className')
  //   }
  // }, [loading, error])

  return (
    <AddClassroomFormContainer>
      <AddClassroomFormHeader>
        <ExitModalButton onClick={closeModal}>exit</ExitModalButton>
        <AddClassroomFormHeading>Add new class</AddClassroomFormHeading>
        <p>renderCount: {renderCount}</p>
      </AddClassroomFormHeader>
      {(loading && <Loader />) || (
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddClassroomFormGroup>
            <AddClassroomFormLabel>
              Enter your class name:{' '}
            </AddClassroomFormLabel>
            <AddClassroomFormInput
              {...register('className', {
                required: 'this is required',
              })}
            ></AddClassroomFormInput>
            <ErrorMessage
              errors={formErrors}
              name='className'
              render={({ message }) => (
                <AddClassroomFormInputError>
                  {message}
                </AddClassroomFormInputError>
              )}
            />
          </AddClassroomFormGroup>
          <AddClassroomFormSubmitButton>
            Add Classroom
          </AddClassroomFormSubmitButton>
          {error && (
            <AddClassroomFormInputError>{error}</AddClassroomFormInputError>
          )}
        </form>
      )}
    </AddClassroomFormContainer>
  )
}

export default AddClassroomForm
