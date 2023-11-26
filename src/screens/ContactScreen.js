import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { createContact } from '../actions/contactActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
const ContactScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createContact({ name, email, subject, message }))
    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
  }
  const contact = useSelector((state) => state.contactUs)
  const { loading, error, success } = contact
  return (
    <div className='my-4'>
      <h1 className='text-center text-uppercase'>Get in Touch</h1>
      {success && (
        <Message variant='success'>Message sent successfully</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='subject'>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter subject'
                value={subject}
                required
                onChange={(e) => setSubject(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='message'>
              <Form.Label>Message</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter message'
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Send
            </Button>
          </Form>
        </FormContainer>
      )}
    </div>
  )
}

export default ContactScreen
