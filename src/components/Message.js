import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  const [visibleAlert, setVisibleAlert] = useState(false)
  
  const handleVisible = () => { 
    setVisibleAlert(true)
    setTimeout(() => {
        setVisibleAlert(false)
    }, 4000);
  } 
   useEffect(() => {
     handleVisible()
    }, [])
    
  return <>{visibleAlert && <Alert variant={variant}>{children}</Alert>}</>
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
