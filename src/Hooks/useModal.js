import React from 'react';
import { Col, Row, Modal as ModalBootstrap, Button } from 'react-bootstrap';

const useModal = ()=>{
	const [show, setShow] = React.useState(false);

  	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

	const bildModal = (children, title, labelConcluir, labelCanelar)=>{
		alert('Executou')
		return(
			 <>

		      <ModalBootstrap show={show} onHide={handleClose}>
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

	return{
		handleClose,
		handleShow,
		bildModal
	}
}

export default useModal;