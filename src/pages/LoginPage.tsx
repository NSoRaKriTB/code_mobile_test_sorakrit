import React from 'react'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { Login } from '../types/loginType'
import { TextField, Button, Container, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { login } from '../redux/authSlice'

const validationSchema = yup.object({
  email: yup.string().email("Invalid email format").required('Email is required'),
  password: yup.string().min(4).required()
})


const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)

  const [form, setForm] = React.useState<Login>({
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    validationSchema.validate(form).then(() => {
      if (form.email === auth.email && form.password === auth.password) {
        dispatch(login())
        navigate('/home', { replace: true })
      } else {
        alert('Email or password incorrect')
      }
    }).catch(err => {
      alert(err.message)
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Container
      component='form'
      onSubmit={handleSubmit}
      sx={{
        width: 'auto',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          label='Email'
          name='email'
          type='email'
          onChange={handleChange}
          value={form.email}
          sx={{ width: '100%', maxWidth: '300px' }}
          margin='normal' />
        <TextField
          label='Password'
          name='password'
          type='password'
          autoComplete='off'
          onChange={handleChange}
          value={form.password}
          sx={{ width: '100%', maxWidth: '300px' }}
          margin='normal' />

        <Button
          variant='contained'
          type='submit'
          sx={{ width: '100%', maxWidth: '300px' }}
        >
          Login
        </Button>
      </Box>
    </Container>

  )
}

export default LoginPage