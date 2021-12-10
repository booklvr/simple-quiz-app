import React from 'react'
import { useForm } from 'react-hook-form'
import {
  AddClassroomFormContainer,
  AddClassroomFormGroup,
  AddClassroomFormHeader,
  AddClassroomFormHeading,
  AddClassroomFormInput,
  AddClassroomFormLabel,
  AddClassroomFormSubmitButton,
  ExitModalButton,
} from './style'

const AddClassroomForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    getValues,
    formState,
    formState: {
      errors: formErrors,
      isDirty,
      dirtyFields,
      isSubmitting,
      touchedFields,
      isValid,
      isSubmitSuccessful,
    },
  } = useForm({
    defaultValues: {
      familyName: '',
      givenName: '',
      email: '',
      password: '',
    },
    criteriaMode: 'all',
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  console.log('watch', watch())

  const onError = (err) => {
    console.log('onError -> err:', err)
  }

  return (
    <AddClassroomFormContainer>
      <AddClassroomFormHeader>
        <ExitModalButton>exit</ExitModalButton>
        <AddClassroomFormHeading>Add new class</AddClassroomFormHeading>
      </AddClassroomFormHeader>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <AddClassroomFormGroup>
          <AddClassroomFormLabel>Enter your class name: </AddClassroomFormLabel>
          <AddClassroomFormInput
            {...register('className', {
              required: 'this is required',
            })}
          ></AddClassroomFormInput>
        </AddClassroomFormGroup>
        <AddClassroomFormSubmitButton>
          Add Classroom
        </AddClassroomFormSubmitButton>
      </form>
    </AddClassroomFormContainer>
  )
}

export default AddClassroomForm
