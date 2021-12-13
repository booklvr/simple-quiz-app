import { ErrorMessage } from '@hookform/error-message'
import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { loginWithEmail } from '../../actions/userActions'
import {
  BackButton,
  EmailRegisterFormInputError,
} from '../EmailRegisterForm/styled'
import Loader from '../Loader'
import {
  EmailLoginFormContainer,
  EmailLoginFormGroup,
  EmailLoginFormInput,
  EmailLoginFormInputError,
  EmailLoginFormLabel,
  EmailLoginFormSubmitButton,
} from './styled'

let renderCount = 0

const LoginEmailForm = ({ setLoginWithEmail }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  renderCount++

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors: formErrors, submitCount },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    // criteriaMode: 'all',
  })

  const { loading, error } = useSelector((state) => state.loginWithEmail)
  const user = useSelector((state) => state.user)

  const onSubmit = (data) => {
    clearErrors('apiError')
    console.log('submitting data:', data)
    const { email, password } = data
    console.log('email', email)
    console.log('password:', password)
    dispatch(loginWithEmail(email, password))

    // if (error) {
    //   if (error === 'Request failed with status code 401') {
    //     setError('apiError', {
    //       type: 'SERVER',
    //       message: 'email and password do not match',
    //     })
    //   } else {
    //     setError('apiError', {
    //       type: 'SERVER',
    //       message: error,
    //     })
    //   }
    // }
  }

  // useEffect(() => {
  //   if (!error) {
  //     clearErrors('apiError')
  //   }
  //   if (error) {
  //     if (error === 'Request failed with status code 401') {
  //       setError('apiError', {
  //         type: 'SERVER',
  //         message: 'email and password do not match',
  //       })
  //     } else {
  //       setError('apiError', {
  //         type: 'SERVER',
  //         message: error,
  //       })
  //     }
  //   }
  // }, [error, loading, setError, clearErrors])

  const onError = (err) => {
    console.log('onError -> err:', err)
  }

  useEffect(() => {
    // console.log('login form useEffect - user', user)
    if (user && user.accountType) {
      console.log('redirecting to homepage after login')
      history.push(`/${user.accountType}`)
    }
  }, [user, history])

  return (
    <EmailLoginFormContainer>
      {(loading && <Loader />) || (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <p>submit count: {submitCount}</p>
          <p>render count: {renderCount}</p>
          <EmailLoginFormGroup>
            <EmailLoginFormLabel>Email</EmailLoginFormLabel>
            <EmailLoginFormInput
              {...register('email', {
                required: 'email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'you must provide a valid email',
                },
              })}
              // onChange={(e) => {
              //   console.log('onChange event - email')
              //   clearErrors('apiError')
              // }}
            ></EmailLoginFormInput>
            <ErrorMessage
              errors={formErrors}
              name='email'
              render={({ message }) => (
                <EmailLoginFormInputError>{message}</EmailLoginFormInputError>
              )}
            />
          </EmailLoginFormGroup>
          <EmailLoginFormGroup>
            <EmailLoginFormLabel>Password</EmailLoginFormLabel>
            <EmailLoginFormInput
              {...register('password', {
                required: 'password is required',
              })}
              // onChange={(e) => {
              //   console.log('onChange event - password')
              //   clearErrors('apiError')
              // }}
            ></EmailLoginFormInput>
            <ErrorMessage
              errors={formErrors}
              name='password'
              render={({ message }) => (
                <EmailLoginFormInputError>{message}</EmailLoginFormInputError>
              )}
            />
          </EmailLoginFormGroup>
          <EmailLoginFormSubmitButton
            type='submit'
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </EmailLoginFormSubmitButton>
          {error && (
            <EmailLoginFormInputError>{error}</EmailLoginFormInputError>
          )}
        </form>
      )}
      <BackButton onClick={() => setLoginWithEmail(false)}>Back</BackButton>
    </EmailLoginFormContainer>
  )
}
export default LoginEmailForm
