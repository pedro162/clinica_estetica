import React from 'react';
import FormFilial from '../FormFilial/index.js'
import { faHome, faSearch,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Col, Row, Button } from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';

const Cadastrar = ({showModalCriarFilial, setShowModalCriarFilial})=>{

    //const [showModalCriarFilial, setShowModalCriarFilial] = React.useState(false);
    const [nome, setNome] = React.useState('Balcão')
    const [tipo, setTipo] = React.useState('Banco')
    const [vr_minimo, setVrMinimo] = React.useState('12,10')
    const [vr_maximo, setVrMaximo] = React.useState('600,30')
    const [bloquear, setBloquear] = React.useState('Não')
    const [aceita_transferencia, setAceitaTransferencia] = React.useState('Sim')
    const [vr_saldo_inicial, setVrSaldoInicial] = React.useState('560,65')

    const data = {
    	nome,
    	setNome,
		tipo,
		setTipo,
		vr_minimo,
		setVrMinimo,
		vr_maximo,
		setVrMaximo,
		bloquear,
		setBloquear,
		aceita_transferencia,
		setAceitaTransferencia,
		vr_saldo_inicial,
		setVrSaldoInicial,
	}
	
	const handleSubmit = ()=>{

		let formData = {
	    	nome,
			tipo,
			vr_minimo,
			vr_maximo,
			bloquear,
			aceita_transferencia,
			vr_saldo_inicial,
		}

		formData = JSON.stringify(formData);
		alert(formData)
	}

	const FormModal = ()=>{
		return(
			<Row>
				<Col>
					<FormFilial  {...data}/>
				</Col>
			</Row>
		)
	}
	return(
		<>
			<Modal  handleConcluir={()=>{handleSubmit();setShowModalCriarFilial(); }} children={<FormModal/>} title={'Cadastrar Filial'} size="lg" labelConcluir="Concluir" dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarFilial} showHide={setShowModalCriarFilial}/>
			
		</>
	)
}

export default Cadastrar;