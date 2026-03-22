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
import estilos from './Visualizar.module.css'

import { FORMAT_CALC_COD, FORMAT_MONEY, FORMAT_DATA_PT_BR } from '../../../functions/index.js'

const Detalhes = ({ dataContasReceberChoice, ...props }) => {

	const dataRegistro = dataContasReceberChoice?.data
		? dataContasReceberChoice?.data
		: dataContasReceberChoice?.mensagem

	const dataReferencia = dataRegistro?.data_referencia

	return (
		<React.Fragment >
			<Row className={'mobile_card_report mb-4'}>
				<Col xs="12" sm="12" md="12" >
					<Row className="my-3">
						<Col xs="12">
							<div className={`${estilos['card-detalhes']} p-4 rounded-4 shadow-sm border bg-white`} >
								<h5 className="fw-bold mb-3 text-primary">{dataRegistro?.name}</h5>

								<div className="mb-3">
									<strong className="text-muted">Código:</strong>
									<div>{dataRegistro?.id}</div>
								</div>

								<div className="mb-3">
									<strong className="text-muted">Filial:</strong>
									<div>{dataRegistro?.filial?.name}</div>
								</div>

								<div className="mb-3">
									<strong className="text-muted">Cliente:</strong>
									<div>{dataRegistro?.pessoa?.name}</div>
								</div>

								<div className="mb-3">
									<strong className="text-muted">Total:</strong>
									<div>{FORMAT_MONEY(dataRegistro?.vrLiquido)}</div>
								</div>

								<div className="mb-3">
									<strong className="text-muted">Em aberto:</strong>
									<div>{FORMAT_MONEY(dataRegistro?.vrAberto)}</div>
								</div>

								<div className="mb-3">
									<strong className="text-muted">Pago:</strong>
									<div>{FORMAT_MONEY(dataRegistro?.vrPago)}</div>
								</div>

								<div className="mb-3">
									<strong className="text-muted">Criado em:</strong>
									<div>{FORMAT_DATA_PT_BR(dataRegistro?.created_at)}</div>
								</div>

								<div>
									<strong className="text-muted">Está ativo?</strong>
									<div>{dataRegistro?.active === 'yes' ? 'Sim' : 'Não'}</div>
								</div>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>

			<Row>
				<Col xs="12" sm="12" md="12" className={'default_card_report'} >
					<Row className={'mb-4'}>
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

					<Row >
						<Col>
							<Table striped bordered hover size="sm" responsive={true}>
								<thead>
									<tr>
										<th>Cód refeéncia</th>
										<th>Referência</th>
										<th>Ação</th>
									</tr>
								</thead>
								<tbody>
									<tr >
										<td>{dataRegistro?.referencia_id}</td>
										<td>{dataRegistro?.referencia}</td>
										<td><Button className="btn btn-sm btn-primary">Ver</Button></td>
									</tr>
								</tbody>
								<tfoot>
									<tr>
										<td colSpan="2" className="text-right"><strong>Total</strong></td>
										<td>{FORMAT_MONEY(dataRegistro?.vrLiquido)}</td>
									</tr>
								</tfoot>
							</Table>
						</Col>
					</Row>
					<Row className={'mt-4'}>
						<Col className="text-center">
							<p><strong>Obrigado pelo seu negócio!</strong></p>
						</Col>
					</Row>
				</Col>
			</Row>
		</React.Fragment>
	)
}

export default Detalhes;