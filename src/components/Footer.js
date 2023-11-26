import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Facebook, Linkedin, MailSearch } from 'lucide-react'
const Footer = () => {
  return (
    <footer>
      <Container fluid className='bg-light mt-2'>
        <Row className='d-flex flex-column bd-highlight'>
          <Col className='text-center py-3 d-flex justify-content-center align-items-center'>
            <img
              src='/images/ecommerce.png'
              width='40'
              height='40'
              className='d-inline-block mx-2 align-top rounded'
              alt='ShopIT logo'
            />
            <span className='text-uppercase my-2'>ShopIT</span>
          </Col>
          <Col className='d-flex justify-content-center align-items-center my-2'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.facebook.com/noormohammad011'
            >
              <Facebook />
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.linkedin.com/in/noor-mohammad-a39415218/'
              className='mx-4'
            >
              <Linkedin />
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='mailto:noormohammad.net1503011@email.com'
            >
              <MailSearch />
            </a>
          </Col>
          <Col className='text-center py-3'>
            Copyright &copy; Shop IT {new Date().getFullYear().toLocaleString()}
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
