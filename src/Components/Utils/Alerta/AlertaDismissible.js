import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


const AlertaDismissible = ({title, message, variant, togle, ...props})=>{
  const [show, setShow] = useState(true);

  if(show){

    return (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
            {title && <Alert.Heading>{title}</Alert.Heading>}
            {message && <p>{message}</p>
            }
        </Alert>

    )

  }else{
    return null;
  }
}


export default AlertaDismissible;