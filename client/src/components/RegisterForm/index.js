import React, { useState, useEffect } from 'react'
import {
  RegisterFormContainer,
  RegisterFormGroup,
  RegisterFormHeader,
  RegisterFormInput,
  RegisterFormLabel,
} from './styled'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <RegisterFormContainer>
      <RegisterFormHeader>Register With your Email</RegisterFormHeader>
      <RegisterFormGroup>
        <RegisterFormLabel>Name</RegisterFormLabel>
        <RegisterFormInput
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></RegisterFormInput>
      </RegisterFormGroup>
      <RegisterFormGroup>
        <RegisterFormLabel>Email</RegisterFormLabel>
        <RegisterFormInput
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></RegisterFormInput>
      </RegisterFormGroup>
      <RegisterFormGroup>
        <RegisterFormLabel>Name</RegisterFormLabel>
        <RegisterFormInput
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></RegisterFormInput>
      </RegisterFormGroup>
      <RegisterFormGroup>
        <RegisterFormLabel>Password</RegisterFormLabel>
        <RegisterFormInput
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></RegisterFormInput>
      </RegisterFormGroup>
      <RegisterFormGroup>
        <RegisterFormLabel>ConfirmPassword</RegisterFormLabel>
        <RegisterFormInput
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></RegisterFormInput>
      </RegisterFormGroup>
    </RegisterFormContainer>
  )
}

export default RegisterForm
