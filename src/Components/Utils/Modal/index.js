import React from 'react';
import { Col, Row, Modal as ModalBootstrap, Button } from 'react-bootstrap';

const Modal = ({children, title, labelConcluir, labelCanelar, dialogClassName, show, showHide, ...props})=>{
	
  	const handleClose = () =>showHide(false);

	return(
		 <>
	       <ModalBootstrap show={show} onHide={handleClose} 
        	backdrop="static"
       		keyboard={false}
        	dialogClassName={dialogClassName ? dialogClassName: "modal-90w"}
        	{...props}
         >
	        <ModalBootstrap.Header closeButton>
	          <ModalBootstrap.Title>{title}</ModalBootstrap.Title>
	        </ModalBootstrap.Header>
	        <ModalBootstrap.Body>
	        	{children}
	        </ModalBootstrap.Body>
	        <ModalBootstrap.Footer>
	          <Button variant="secondary" onClick={handleClose}>
	            {labelCanelar ? labelCanelar : 'Cancelar'}
	          </Button>
	          <Button variant="primary" onClick={handleClose}>
	            {labelConcluir ? labelConcluir : 'Concluir'}
	          </Button>
	        </ModalBootstrap.Footer>
	      </ModalBootstrap>
	    </>
	)
}

export default Modal;