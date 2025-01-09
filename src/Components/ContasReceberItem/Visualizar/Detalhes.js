import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlRadio from '../../FormControl/Radio.js'
import FormControlSelect from '../../FormControl/Select.js'
import { Col, Row, Tabs, Tab, Button, Table } from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import { faHome, faSearch, faPlus, faTimes, faChevronCircleRight, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2'

import { FORMAT_CALC_COD, FORMAT_MONEY, FORMAT_DATA_PT_BR } from '../../../functions/index.js'

const Detalhes = ({ dataContasReceberItemChoice, ...props }) => {

	const dataRegistro = dataContasReceberItemChoice?.data
		? dataContasReceberItemChoice?.data
		: dataContasReceberItemChoice?.mensagem

	const dataReferencia = dataRegistro?.data_referencia

	return (
		<React.Fragment className="mt-5 p-4 border">
			<Row className="mb-4">
				<Col>
					<h2 className="text-center">Fatura</h2>
					<div className="d-flex justify-content-between">
						<div>
							<strong>Cliente:</strong> {dataRegistro?.pessoa?.name}<br />
							<strong>Endereço:</strong> {dataRegistro?.pessoa?.logradouro.filter((item) => item?.importancia == 'principal')[0]?.logradouro}<br />
							<strong>Telefone:</strong> {dataRegistro?.telefone}
						</div>
						<div>
							<strong>Data de Emissão:</strong> {FORMAT_DATA_PT_BR(dataRegistro?.created_at)}<br />
							<strong>Data de Vencimento:</strong> {FORMAT_DATA_PT_BR(dataRegistro?.dtVencimento)}<br />
							<strong>Fatura Nº:</strong> {dataRegistro?.id}
						</div>
					</div>
				</Col>
			</Row>



			<Row>
				<Col>
					<Table striped bordered>
						<thead>
							<tr>
								<th>Cód refeéncia</th>
								<th>Referência</th>
								<th>Data</th>
								<th>Ação</th>
							</tr>
						</thead>
						<tbody>
							<tr >
								<td>{dataRegistro?.referencia}</td>
								<td>{dataRegistro?.referencia_id}</td>
								<td>{FORMAT_DATA_PT_BR(dataReferencia?.created_at)}</td>
								<td><Button className="btn btn-sm btn-primary">Ver</Button></td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<td colSpan="3" className="text-right"><strong>Total</strong></td>
								<td>{FORMAT_MONEY(dataRegistro?.vrLiquido)}</td>
							</tr>
						</tfoot>
					</Table>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col className="text-center">
					<p><strong>Obrigado pelo seu negócio!</strong></p>
				</Col>
			</Row>
		</React.Fragment>
	)
}


export default Detalhes;