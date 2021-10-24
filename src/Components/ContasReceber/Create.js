import React from 'react';
import { faHome, faSearch,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Col, Row, Button } from 'react-bootstrap';
import Modal from '../Utils/Modal/index.js'
import useFetch from '../../Hooks/useFetch.js';

const Create = ()=>{

    const [showModalCriarReceber, setShowModalCriarReceber] = React.useState(false)
	return(
		<>
			<Row>
				<Col>
					<h2>Criar contas a receber</h2>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button onClick={()=>setShowModalCriarReceber(true)}>Avançar</Button>
				</Col>
			</Row>
			<Modal children={<p>Novo</p>} title={'Lançar conta a receber'} labelConcluir="Finalizar" dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarReceber} showHide={setShowModalCriarReceber}/>
		</>
	)
}

export default Create;