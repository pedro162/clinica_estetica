import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import {Col, Row, Tabs, Tab } from 'react-bootstrap';
import Modal from '../Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../Load/index.js'
import AlertaDismissible from '../Alerta/AlertaDismissible.js'
import Swal from 'sweetalert2'



import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_SAVE_POST, SERVICO_ALL_POST, CONTAS_RECEBER_BAIXAR_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST} from '../../../api/endpoints/geral.js'


const ModalAlert = ({show, showHide, title, message, variant})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);


	const userLogar =  ()=>{
        console.log('Aqui............')
    }

   
    //https://medium.com/code-prestige/alertas-bonitos-responsivos-e-customizados-com-o-sweetalert2-8db930038137
	return(

		<>
			 <Modal noBtnConcluir={true}  handleConcluir={null}  title={ 'Atenção'} size="lg" propsConcluir={null} labelConcluir={null} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={show} showHide={()=>{showHide();}}>
							
											
				<Row className="mb-3">

					<Col xs="12" sm="12" md="12">
						<AlertaDismissible
							title={title}
							message={message}
							variant={variant}
						/>
					</Col>		
				</Row>


            </Modal>
		</>
	)
}

export default ModalAlert;
