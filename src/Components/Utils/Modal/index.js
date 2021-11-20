import React from 'react';
import { Col, Row, Modal as ModalBootstrap, Button } from 'react-bootstrap';

const Modal = ({children, title, labelConcluir, labelCanelar, dialogClassName, show, showHide, handleConcluir,propsConcluir, noBtnCancelar, noBtnConcluir, ...props})=>{
	
  	const handleClose = () =>showHide(false);
  	const handleAcaoConcluir = ()=>{
  		handleConcluir();
  	}

	return(
		 <>
	       <ModalBootstrap show={show} onHide={handleClose} 
        	backdrop="static"
       		keyboard={false}
        	dialogClassName={dialogClassName ? dialogClassName: "modal-90w"}
        	{...props}
         >
	        <ModalBootstrap.Header className="header_modal" closeButton>
	          <ModalBootstrap.Title className="label_title_modal" >{title}</ModalBootstrap.Title>
	        </ModalBootstrap.Header>
	        <ModalBootstrap.Body>
	        	{children}
	        </ModalBootstrap.Body>
	        <ModalBootstrap.Footer>
	        	{
	        		noBtnCancelar == true 
	        		? 
	        			''
	        		: 

	        	
			          <Button variant="danger" className="btn btn-sm" onClick={handleClose}>
			            {labelCanelar ? labelCanelar : 'Cancelar'}
			          </Button>
	          }

	          {
	          	(noBtnConcluir == true )
	          	? 
	          		('')
	          	: 
		          (<Button variant="primary" {...propsConcluir} className="botao_success btn btn-sm" onClick={handleAcaoConcluir}>
		          		            {labelConcluir ? labelConcluir : 'Concluir'}
		          		          </Button>)
	          }
	        </ModalBootstrap.Footer>
	      </ModalBootstrap>
	    </>
	)
}

export default Modal;