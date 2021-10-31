import React from 'react';
import FormCaixa from '../FormCaixa/index.js'
import { faHome, faSearch,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Col, Row, Button } from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';

const Cadastrar = ()=>{

    const [showModalCriarCaixa, setShowModalCriarCaixa] = React.useState(false);
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
	console.log('Nome: '+nome)
	return(
		<>
			<Row>
				<Col>
					<FormCaixa  {...data}/>
				</Col>
			</Row>
			
		</>
	)
}

export default Cadastrar;