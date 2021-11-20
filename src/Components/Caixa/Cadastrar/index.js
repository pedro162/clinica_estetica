import React from 'react';
import FormCaixa from '../FormCaixa/index.js'
import { faHome, faSearch,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Col, Row, Button } from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';

const Cadastrar = ({showModalCriarCaixa, setShowModalCriarCaixa})=>{

    //const [showModalCriarCaixa, setShowModalCriarCaixa] = React.useState(false);
    const [nome, setNome] = React.useState('Balcão')
    const [tipo, setTipo] = React.useState('Banco')
    const [vr_minimo, setVrMinimo] = React.useState('12,10')
    const [vr_maximo, setVrMaximo] = React.useState('600,30')
    const [bloquear, setBloquear] = React.useState('Não')
    const [aceita_transferencia, setAceitaTransferencia] = React.useState('Sim')
    const [vr_saldo_inicial, setVrSaldoInicial] = React.useState('560,65')
    const inputEl = React.useRef(null);

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
		inputEl
	}
	
	const handleSubmit = ()=>{

		/*let formData = {
	    	nome,
			tipo,
			vr_minimo,
			vr_maximo,
			bloquear,
			aceita_transferencia,
			vr_saldo_inicial,
			inputEl
		}

		formData = JSON.stringify(formData);
		alert(formData)*/
		//inputEl.current.submit();
		//alert('AQUI')
	}

	const FormModal = ()=>{
		return(
			<Row>
				<Col>
					<FormCaixa  {...data}/>
				</Col>
			</Row>
		)
	}
	return(
		<>
			<Modal  handleConcluir={()=>{handleSubmit();setShowModalCriarCaixa(); }} children={<FormModal/>} title={'Cadastrar caixa'} size="lg" labelConcluir="Concluir" dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarCaixa} showHide={setShowModalCriarCaixa}/>
			
		</>
	)
}

export default Cadastrar;