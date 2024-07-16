import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlRadio from '../../FormControl/Radio.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row, Tabs, Tab, Button, Table} from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import { faHome, faSearch, faPlus, faTimes, faChevronCircleRight, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2'

import {FORMAT_CALC_COD, FORMAT_MONEY, FORMAT_DATA_PT_BR} from '../../../functions/index.js'

const Detalhes = ({dataMovimentacoesFinanceiraChoice, ...props})=>{

	const dataRegistro = dataMovimentacoesFinanceiraChoice?.mensagem
	const dataReferencia = dataRegistro?.data_referencia

	/*
		 {

                                    label:atual.conciliado == 'yes' ? 'Sim' : 'Não',
                                    propsRow:{}
                                },
                                {

                                    label:atual.estornado == 'yes' ? 'Sim' : 'Não',
                                    propsRow:{}
                                },
                                {

                                    label:FORMAT_DATA_PT_BR(atual.created_at),
                                    propsRow:{}
                                },
                                {

                                    label: atual?.tp_movimentacao == 'negativa' ? ( atual.vr_movimentacao > 0 ? FORMAT_MONEY(atual.vr_movimentacao) : 0) : 0,
                                    propsRow:{}
                                },
                                {

                                    label: atual?.tp_movimentacao == 'positiva' ? ( atual.vr_movimentacao > 0 ? FORMAT_MONEY(atual.vr_movimentacao) : 0) : 0,
                                    propsRow:{}
                                },
                                {

                                    label:FORMAT_MONEY(atual.vr_saldo),
                                    propsRow:{}
                                },
	*/

	return(
		<React.Fragment className="mt-5 p-4 border">
			<Row className="mb-4">
				<Col>
		          <h2 className="text-center mb-4">Detalhes da Movimentação</h2>
		          <div className="d-flex justify-content-between">
		            <div>
		              	<strong>Histórico:</strong> {dataRegistro?.historico}<br />
		              	<strong>Filial:</strong> {dataRegistro?.caixa?.filial_id}<br />
		              	<strong>Caixa:</strong> {dataRegistro?.caixa_id} - {dataRegistro?.caixa?.name}<br />
		              	<strong>Usuário:</strong> {dataRegistro?.user_id} - {dataRegistro?.user?.pessoa.name}
		            </div>
		            <div>
		              	<strong>Status de Conciliação</strong> {dataRegistro.conciliado == 'yes' ? 'Sim' : 'Não'}<br />
		              	<strong>Status Estorno:</strong> {dataRegistro.estornado == 'yes' ? 'Sim' : 'Não'}<br />
		              	<strong>Valor:</strong> {dataRegistro?.tp_movimentacao == 'positiva' ? '+' : '-'} {FORMAT_MONEY(dataRegistro?.vr_movimentacao)}<br/>
		              	<strong>Data da Movimentação:</strong> {FORMAT_DATA_PT_BR(dataRegistro?.created_at)}
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
		                <th>Valor</th>
		                <th>Data</th>
		                <th>Ação</th>
		              </tr>
		            </thead>
		            <tbody>
		              	<tr >
		                  	<td>{dataRegistro?.referencia}</td>
		                  	<td>{dataRegistro?.referencia_id}</td>
		                  	<td>{FORMAT_MONEY(dataReferencia?.vrLiquido)}</td>
		                  	<td>{FORMAT_DATA_PT_BR(dataReferencia?.created_at)}</td>
		                	<td><Button className="btn btn-sm btn-primary">Ver</Button></td>
		                </tr>
		            </tbody>
		          </Table>
		        </Col>
		      </Row>
		      <Row className="mt-4">
		        <Col className="text-center">
		          <p><strong>Obrigado pela sua atenção!</strong></p>
		        </Col>
		      </Row>
		</React.Fragment>
	)
}


export default Detalhes;