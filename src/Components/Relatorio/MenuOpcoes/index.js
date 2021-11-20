import React from 'react';
import {Col, Row } from 'react-bootstrap';
import Card from '../../Utils/Card/index.js'
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index'
import Checkbox from '../../FormControl/Checkbox.js'
import Radio from '../../FormControl/Radio.js'
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../../Utils/Modal/index.js'
import estilos from './MenuOpcoes.module.css'

const MenuOpcoes = ({opcoes, showModal, setShowModal, props})=>{

	const dataOpcoes = opcoes ? opcoes : [
		{'acao':()=>alert('aqui'), label:'Cadastrar', propsOption:{}, propsLabel:{}}
	]
	
	console.log('------------')
	console.log(opcoes)
	console.log('------------')

	return(
		<>
			<Modal noBtnConcluir={true}  title={'Menu de opções'} size="xs" propsConcluir={{}} labelConcluir={'TEste'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModal} showHide={setShowModal} >
				{Array.isArray(dataOpcoes) && dataOpcoes.length > 0 
				?
					dataOpcoes.map(({acao, label, propsOption, propsLabel}, index, arr)=>(
							<Row className={[estilos.estiloItemMenu]} key={('option'+index+label)}>
								<Col  onClick={()=>{acao();setShowModal(false);}} >{label}</Col>
							</Row>
						))
					
				:
					''
				 }
			</Modal>
		</>
	)
}

export default MenuOpcoes;