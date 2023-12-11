import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Image } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google'
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gloading, setGLoading] = useState(false)
  const [gerror, setGError] = useState('')
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHanler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setGLoading(true) // Set loading state to true
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/google-login`,
          {
            idToken: tokenResponse.access_token,
          }
        )
        if (response && response.data) {
          localStorage.setItem('userInfo', JSON.stringify(response.data))
          window.location.reload()
        } else {
          setGError('Invalid response from server')
        }
      } catch (error) {
        setGError('Error during Google login')
      } finally {
        setGLoading(false)
      }
    },
    onError: (error) => {
      setGError('Error during Google login')
    },
  })

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {gloading && <Loader />}
      {gerror && <Message variant='danger'>{gerror}</Message>}
      <Form onSubmit={submitHanler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Sign In
        </Button>
      </Form>
      <div className='content'>
        <p className='or'>or</p>
      </div>
      <Button
        onClick={() => loginWithGoogle()}
        variant='danger'
        type='submit'
        style={{ width: '100%' }}
      >
        <Image
          style={{ width: '20px', height: '20px' }}
          src='/images/google.png'
          rounded
        />
      </Button>
      <Row className='py-3'>
        <Col>
          New Customer ?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
