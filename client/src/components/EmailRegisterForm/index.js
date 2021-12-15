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
  InviteCodeButtonsContainer,
  InviteCodeContainer,
  InviteCodeNextButton,
  InviteCodeSkipButton,
  TestPage,
  UseFormHookContainer,
} from './styled'

// components
import Loader from '../Loader'
import { verifyCheckInviteCode } from '../../actions/classroomActions'
let renderCount = 0

const EmailRegisterForm = ({ setRegisterWithEmail, accountType }) => {
  renderCount++
  const dispatch = useDispatch()
  const history = useHistory()

  const { loading, error } = useSelector((state) => state.registerWithEmail)
  const {
    loading: loadingVerifiedInviteCode,
    error: errorVerifiedInviteCode,
    verified,
  } = useSelector((state) => state.verifyInviteCode)

  const [checkInviteCode, setCheckInviteCode] = useState(true)
  const [inviteCode, setInviteCode] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    getValues,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      familyName: '',
      givenName: '',
      email: '',
      password: '',
    },
    // criteriaMode: 'all',
  })

  const onSubmit = (data) => {

    const { givenName, familyName, email, password, dateOfBirth } = data


    if (accountType === 'student') {
      dispatch(
        registerWithEmail({
          givenName,
          familyName,
          email,
          password,
          accountType,
          inviteCode: inviteCode,
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

  
  const checkForExistingEmail = async () => {
    const email = getValues('email')

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
    }
  }

  const checkInviteCodeIsValid = () => {
    if (inviteCode.length === 6) {
      dispatch(verifyCheckInviteCode(inviteCode))
    }
  }

  const handleInviteCodeChange = (e) => {
    setInviteCode(e.target.value)

    checkInviteCodeIsValid()
  }

  const handleNext = () => {
    setCheckInviteCode(false)
  }

  useEffect(checkInviteCodeIsValid, [inviteCode, dispatch])

  return (
    <EmailRegisterFormContainer>
      <p>renderCount: {renderCount}</p>
      {(loading && <Loader />) || (
        <form onSubmit={handleSubmit(onSubmit)}>
          {(accountType === 'student' && checkInviteCode && (
            <InviteCodeContainer>
              <EmailRegisterFormGroup>
                <EmailRegisterFormLabel htmlFor='inviteCode'>
                  Invite Code:
                </EmailRegisterFormLabel>
                <EmailRegisterFormInput
                  name='inviteCode'
                  value={inviteCode}
                  onChange={handleInviteCodeChange}
                ></EmailRegisterFormInput>
                <ErrorMessage
                  errors={formErrors}
                  name='inviteCode'
                  render={({ message }) => (
                    <EmailRegisterFormInputError>
                      {message}
                    </EmailRegisterFormInputError>
                  )}
                />
              </EmailRegisterFormGroup>
              <InviteCodeButtonsContainer>
                <InviteCodeSkipButton onClick={() => setCheckInviteCode(false)}>
                  Skip
                </InviteCodeSkipButton>
                <InviteCodeNextButton onClick={handleNext}>
                  Next
                </InviteCodeNextButton>
              </InviteCodeButtonsContainer>
            </InviteCodeContainer>
          )) || (
            <div>
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
                  {...register('password', {
                    required: 'password is required',
                  })}
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
            </div>
          )}
        </form>
      )}
      <BackButton onClick={() => setRegisterWithEmail(false)}>Back</BackButton>
    </EmailRegisterFormContainer>
  )
}

export default EmailRegisterForm

