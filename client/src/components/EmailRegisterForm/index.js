import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { registerWithEmail } from '../../actions/newUserActions'

// Styled components
import {
  BackButton,
  EmailRegisterFormContainer,
  EmailRegisterFormGroup,
  EmailRegisterFormInput,
  EmailRegisterFormInputError,
  EmailRegisterFormLabel,
  EmailRegisterFormSubmitButton,
  TestPage,
  UseFormHookContainer,
} from './styled'

// components
import Loader from '../Loader'

const EmailRegisterForm = ({ setRegisterWithEmail, accountType }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { loading, error } = useSelector((state) => state.registerWithEmail)
  let render = 0
  render++

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

    const {
      givenName,
      familyName,
      email,
      password,
      classroomCode,
      dateOfBirth,
    } = data

    console.log('on submit data:', data)

    if (accountType === 'student') {
      dispatch(
        registerWithEmail({
          givenName,
          familyName,
          email,
          password,
          accountType,
          classroomCode,
          dateOfBirth,
        })
      )
    } else {
      dispatch(
        registerWithEmail({
          givenName,
          familyName,
          email,
          password,
          accountType,
        })
      )
    }
    history.push(`/${accountType}`)
  }

  console.log(watch())

  const onError = (err) => {
    console.log('onError -> err:', err)
  }
  // console.log('formErrors', formErrors)
  // console.log('isValid', isValid)

  // // after successful form submission, reset the form
  // useEffect(() => {
  //   if (formState.isSubmitSuccessful) {
  //     reset()
  //   }
  // }, [formState, reset])
  const checkForExistingEmail = async () => {
    const email = getValues('email')
    // console.log('email', email)

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const URL = '/api/v1/users/checkForExistingUser'
    const dataPacket = {
      email,
    }

    try {
      const { data } = await axios.post(URL, dataPacket, config)

      console.log('api return data', data)

      if (data.exists) {
        setError('apiErrors', { type: 'API', message: 'email already taken' })
      } else {
        clearErrors('apiErrors')
      }
    } catch (error) {
      // remove later
      // this is a server error, you should redirect to a new page
      setError('apiErrors', {
        type: 'SERVER',
        message: error.response.data.message,
      })
      console.log('error', error.response.data)
    }

    // if (email) {
    // }

    // setTimeout(() => {
    //   clearErrors('apiErrors')
    // }, 3000)
  }

    

  return (
    <EmailRegisterFormContainer>
      {(loading && <Loader />) || (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <EmailRegisterFormGroup>
            <EmailRegisterFormLabel htmlFor='givenName'>
              First Name
            </EmailRegisterFormLabel>
            <EmailRegisterFormInput
              {...register('givenName', {
                required: 'this is required',
              })}
            ></EmailRegisterFormInput>
            <ErrorMessage
              errors={formErrors}
              name='givenName'
              render={({ message }) => (
                <EmailRegisterFormInputError>
                  {message}
                </EmailRegisterFormInputError>
              )}
            />
          </EmailRegisterFormGroup>
          <EmailRegisterFormGroup>
            <EmailRegisterFormLabel htmlFor='familyName'>
              Last Name
            </EmailRegisterFormLabel>

            <EmailRegisterFormInput
              {...register('familyName', {
                required: 'this is required',
                maxLength: 80,
              })}
            ></EmailRegisterFormInput>
            <ErrorMessage
              errors={formErrors}
              name='familyName'
              render={({ message }) => (
                <EmailRegisterFormInputError>
                  {message}
                </EmailRegisterFormInputError>
              )}
            />
          </EmailRegisterFormGroup>
          <EmailRegisterFormGroup>
            <EmailRegisterFormLabel htmlFor='email'>
              Email
            </EmailRegisterFormLabel>
            <EmailRegisterFormInput
              {...register('email', {
                required: {
                  value: true,
                  message: 'email is required',
                },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'you must provide a valid email',
                },
                validate: checkForExistingEmail,
              })}
            ></EmailRegisterFormInput>
            <ErrorMessage
              errors={formErrors}
              name='apiErrors'
              render={({ message }) => (
                <EmailRegisterFormInputError>
                  {message}
                </EmailRegisterFormInputError>
              )}
            />
            <ErrorMessage
              errors={formErrors}
              name='email'
              render={({ message }) => (
                <EmailRegisterFormInputError>
                  {message}
                </EmailRegisterFormInputError>
              )}
            />
          </EmailRegisterFormGroup>
          <EmailRegisterFormGroup>
            <EmailRegisterFormLabel htmlForm='password'>
              Password
            </EmailRegisterFormLabel>
            <EmailRegisterFormInput
              {...register('password', { required: 'password is required' })}
            ></EmailRegisterFormInput>
            <ErrorMessage
              errors={formErrors}
              name='password'
              render={({ message }) => (
                <EmailRegisterFormInputError>
                  {message}
                </EmailRegisterFormInputError>
              )}
            />
          </EmailRegisterFormGroup>
          <EmailRegisterFormSubmitButton type='submit'>
            Submit
          </EmailRegisterFormSubmitButton>
        </form>
      )}
      <BackButton onClick={() => setRegisterWithEmail(false)}>Back</BackButton>
    </EmailRegisterFormContainer>
  )
}

export default EmailRegisterForm

// const checkForExistingEmail = async (email) => {
//   console.log('check for existing email')
//   console.log('email', email)
//   console.log('formErrors', formErrors)
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }

//   const dataPacket = {
//     email,
//   }

//   const URL = `/api/v1/users/checkForExistingUser`

//   const { data } = await axios.post(URL, dataPacket, config)

//   console.log('data', data)
//   return false
// }

// TO DO !!!!
// use the error and the loading in the page somehow
// const {
//   userExists,
//   loading: loadingCheckForEmail,
//   errorCheckForEmail,
// } = useSelector((state) => state.checkForExistingEmail)

// console.log('userInfo', userInfo)
// console.log('loading', loading)
// console.log('error', error)

// const [givenName, setGivenName] = useState('')
// const [familyName, setFamilyName] = useState('')
// const [email, setEmail] = useState('')
// const [password, setPassword] = useState('')
// const [classroomCode, setClassroomCode] = useState('')
// const [dateOfBirth, setDateOfBirth] = useState('')

// const onSubmit = (data) => {
// e.preventDefault()
// console.log(data)
// if (accountType === 'student') {
//   dispatch(
//     registerWithEmail({
//       givenName,
//       familyName,
//       email,
//       password,
//       accountType,
//       classroomCode,
//       dateOfBirth,
//     })
//   )
// } else {
//   dispatch(
//     registerWithEmail({
//       givenName,
//       familyName,
//       email,
//       password,
//       accountType,
//     })
//   )
// }
// history.push(`/${accountType}`)
// }
