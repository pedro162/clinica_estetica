import React from 'react';
import estilos from './Load.module.css'
import { Col, Row, Modal as ModalBootstrap, Button } from 'react-bootstrap';
const Load = (props)=>{
	return(
		<>
			<Row  style={{height: '100%', width: '100%'}}>
				<Col xs="12" sm="12" md="12"  style={{height: '100%', width: '100%'}}>
					<div className={estilos.c_load}></div>
				</Col>
			</Row>
		</>
	)
}

export default Load;