import React from 'react';
import {Col, Row, Table} from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import {FORMAT_DATA_PT_BR} from '../../../functions/index.js'
import estilos from './Visualizar.module.css'
import Swal from 'sweetalert2'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_SAVE_POST, CONSULTA_ALL_POST, FORMA_PAGAMENTO_DELETE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, PROFISSIONAL_DIAS_EXPEDIENTE_ALL_POST} from '../../../api/endpoints/geral.js'


const Details = ({dataFormaPagamentoChoice, setIdFormaPagamento, idFormaPagamento, showModalVisualizarFormaPagamento, setShowModalVisualizarFormaPagamento, callback, cancelarFormaPagamento, setVisualizarFormaPagamento, carregando, error})=>{

	const dataRequest = useFetch();
	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataFormaPagamento, setDataFormaPagamento] = React.useState([])


	const dataToDetails = ()=>{
    	let obj = { hasEntrada: '', hasAcertoCaixa: '', hasAcertoBalcao: 'no', hasLimiteDeCredito: '', name: '', tipo: '', hasOperadorFinanceiro: '', id: '', cdCobrancaTipo: '', tpPagamento: '', hasEntrada: '', active: '', deleted_at: '', created_at: '', updated_at: '' }

		if (dataFormaPagamentoChoice) {

			let data = dataFormaPagamentoChoice

			if (data?.mensagem) {
				data = data?.mensagem
			} else if (data?.data) {
				data = data?.data
			}

			if (data.hasOwnProperty('hasEntrada')) {
				obj.hasEntrada = data.hasEntrada;
			}

			if (data.hasOwnProperty('hasAcertoCaixa')) {
				obj.hasAcertoCaixa = data.hasAcertoCaixa;
			}

			if (data.hasOwnProperty('hasAcertoBalcao')) {
				obj.hasAcertoBalcao = data.hasAcertoBalcao;
			}

			if (data.hasOwnProperty('hasLimiteDeCredito')) {
				obj.hasLimiteDeCredito = data.hasLimiteDeCredito;
			}

			if (data.hasOwnProperty('name')) {
				obj.name = data.name;
			}

			if (data.hasOwnProperty('hasComissao')) {
				obj.hasComissao = data.hasComissao;
			}

			if (data.hasOwnProperty('tipo')) {
				obj.tipo = data.tipo;
			}

			if (data.hasOwnProperty('hasOperadorFinanceiro')) {
				obj.hasOperadorFinanceiro = data.hasOperadorFinanceiro;
			}

			if (data.hasOwnProperty('id')) {
				obj.id = data.id;
			}

			if (data.hasOwnProperty('cdCobrancaTipo')) {
				obj.cdCobrancaTipo = data.cdCobrancaTipo;
			}

			if (data.hasOwnProperty('tpPagamento')) {
				obj.tpPagamento = data.tpPagamento;
			}

			if (data.hasOwnProperty('hasEntrada')) {
				obj.hasEntrada = data.hasEntrada;
			}

			if (data.hasOwnProperty('created_at')) {
				obj.created_at = FORMAT_DATA_PT_BR(data.created_at);
			}

			if (data.hasOwnProperty('active')) {
				obj.active = data.active;
			}
			
		}

		return obj;
    }

	const dataFormatCancel = dataToDetails();

	if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
            footer: '',
            confirmButtonColor: "#07B201",
        });
    }
    
	return(

		<>
			 <Row className="my-3">
                <Col xs="12" sm="12" md="12">
                    <span className="label_title_grup_forms">Dados básicos</span>
                </Col>
            </Row>

            {
                error && <Row className="my-3">
                    <Col xs="12" sm="12" md="12">
                        <AlertaDismissible title="Atenção:" message={error} variant={"danger"} />
                    </Col>
                </Row>
            }
            
            <Row className="my-3">
                <Col  xs="12" sm="12" md="12" className={'mobile_card_report'} > 
                    <Row className="my-3">
                        <Col xs="12">
                            <div  className={`${estilos['card-detalhes']} p-4 rounded-4 shadow-sm border bg-white`} >
                                <h5 className="fw-bold mb-3 text-primary">{dataFormatCancel?.name}</h5>

                                <div className="mb-3">
                                    <strong className="text-muted">Código:</strong>
                                    <div>{dataFormatCancel?.id}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Forma de pagamento:</strong>
                                    <div>{dataFormatCancel?.tpPagamento}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Tipo:</strong>
                                    <div>{dataFormatCancel?.tipo}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Tem entrada?</strong>
                                    <div>{dataFormatCancel?.hasEntrada === 'yes' ? 'Sim' : 'Não'}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Operador financeiro:</strong>
                                    <div>{dataFormatCancel?.hasOperadorFinanceiro === 'yes' ? 'Sim' : 'Não'}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Limite de crédito:</strong>
                                    <div>{dataFormatCancel?.hasLimiteDeCredito === 'yes' ? 'Sim' : 'Não'}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Criado em:</strong>
                                    <div>{dataFormatCancel?.created_at}</div>
                                </div>

                                <div>
                                    <strong className="text-muted">Está ativo?</strong>
                                    <div>{dataFormatCancel?.active === 'yes' ? 'Sim' : 'Não'}</div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Col>

                <Col  xs="12" sm="12" md="12"  className={'default_card_report'}>
                    <div className="table-responsive">
                            <Table striped bordered hover size="sm" responsive={true}>
                                <tbody>
                                    <tr>
                                        <th>Código</th>
                                        <td>{dataFormatCancel?.id}</td>
                                        <th>Nome</th>
                                        <td>{dataFormatCancel?.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Codigo da cobrança</th>
                                        <td>{dataFormatCancel?.cdCobrancaTipo}</td>
                                        <th>Forma</th>
                                        <td>{dataFormatCancel?.tpPagamento}</td>
                                    </tr>
                                    <tr>
                                        <th>Tipo</th>
                                        <td>{dataFormatCancel?.tipo}</td>
                                        <th>Tem entrada</th>
                                        <td>{dataFormatCancel?.hasEntrada == 'yes' ? 'Sim' : 'Não'}</td>
                                    </tr>
                                    <tr>
                                        <th>Tem operador financeiro</th>
                                        <td>{dataFormatCancel?.hasOperadorFinanceiro == 'yes' ? 'Sim' : 'Não'}</td>
                                        <th>Tem limite de crédto</th>
                                        <td>{dataFormatCancel?.hasLimiteDeCredito == 'yes' ? 'Sim' : 'Não'}</td>
                                    </tr>
                                    <tr>
                                        <th>Criação</th>
                                        <td>{dataFormatCancel?.created_at}</td>
                                        <th>Ativo</th>
                                        <td>{dataFormatCancel?.active == 'yes' ? 'Sim' : 'Não'}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                </Col>
            </Row>
		</>
	)
}

export default Details;
