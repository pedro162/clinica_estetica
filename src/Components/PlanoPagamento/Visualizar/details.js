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


const Details = ({dataPlanoPagamentoChoice, setIdPlanoPagamento, idPlanoPagamento, showModalVisualizarPlanoPagamento, setShowModalVisualizarPlanoPagamento, callback, cancelarPlanoPagamento, setVisualizarPlanoPagamento, carregando, error})=>{

	const dataRequest = useFetch();
	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataPlanoPagamento, setDataPlanoPagamento] = React.useState([])


	const dataToDetails = ()=>{
    	let obj = { descricao: '', qtdDiasIntervaloParcelas: '', gerarDuplicataManual: 'no', qtd_dias_pri_parcela: '', name: '', qtdParcelas: '', qtdMinParcelas: '', id: '', diasmedios: '', desdobrarDuplicataManual: '', isAberto: '', isAtiva: '', active: '', deleted_at: '', created_at: '', updated_at: '' }

		if (dataPlanoPagamentoChoice) {

			let data = dataPlanoPagamentoChoice

			if (data?.mensagem) {
				data = data?.mensagem
			} else if (data?.data) {
				data = data?.data
			}

			if (data.hasOwnProperty('descricao')) {
				obj.descricao = data.descricao;
			}

			if (data.hasOwnProperty('qtdDiasIntervaloParcelas')) {
				obj.qtdDiasIntervaloParcelas = data.qtdDiasIntervaloParcelas;
			}

			if (data.hasOwnProperty('gerarDuplicataManual')) {
				obj.gerarDuplicataManual = data.gerarDuplicataManual;
			}

			if (data.hasOwnProperty('qtd_dias_pri_parcela')) {
				obj.qtd_dias_pri_parcela = data.qtd_dias_pri_parcela;
			}

			if (data.hasOwnProperty('name')) {
				obj.name = data.name;
			}

			if (data.hasOwnProperty('exbibe_balcao')) {
				obj.exbibe_balcao = data.exbibe_balcao;
			}

			if (data.hasOwnProperty('qtdParcelas')) {
				obj.qtdParcelas = data.qtdParcelas;
			}

			if (data.hasOwnProperty('qtdMinParcelas')) {
				obj.qtdMinParcelas = data.qtdMinParcelas;
			}

			if (data.hasOwnProperty('id')) {
				obj.id = data.id;
			}

			if (data.hasOwnProperty('diasmedios')) {
				obj.diasmedios = data.diasmedios;
			}

			if (data.hasOwnProperty('desdobrarDuplicataManual')) {
				obj.desdobrarDuplicataManual = data.desdobrarDuplicataManual;
			}

			if (data.hasOwnProperty('descricao')) {
				obj.descricao = data.descricao;
			}

			if (data.hasOwnProperty('created_at')) {
				obj.created_at = FORMAT_DATA_PT_BR(data.created_at);
			}

			if (data.hasOwnProperty('active')) {
				obj.active = data.active;
			}

			if (data.hasOwnProperty('isAberto')) {
				obj.isAberto = data.isAberto;
			}

			if (data.hasOwnProperty('isAtiva')) {
				obj.isAtiva = data.isAtiva;
			}
			
		}

		return obj;
    }

	const dataPlanotCancel = dataToDetails();

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
                                <h5 className="fw-bold mb-3 text-primary">{dataPlanotCancel?.name}</h5>

                                <div className="mb-3">
                                    <strong className="text-muted">Código:</strong>
                                    <div>{dataPlanotCancel?.id}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Descrição:</strong>
                                    <div>{dataPlanotCancel?.descricao}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Dias médios:</strong>
                                    <div>{dataPlanotCancel?.diasmedios}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Parcelas mínimas?</strong>
                                    <div>{dataPlanotCancel?.qtdMinParcelas}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Dias primeira parcela:</strong>
                                    <div>{dataPlanotCancel?.qtd_dias_pri_parcela}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Intervalo dias entre parcelas:</strong>
                                    <div>{dataPlanotCancel?.qtdDiasIntervaloParcelas}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Exibe no balcão:</strong>
                                    <div>{dataPlanotCancel?.exbibe_balcao === 'yes' ? 'Sim' : 'Não'}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Criado em:</strong>
                                    <div>{dataPlanotCancel?.created_at}</div>
                                </div>

                                <div>
                                    <strong className="text-muted">Está ativo?</strong>
                                    <div>{dataPlanotCancel?.active === 'yes' ? 'Sim' : 'Não'}</div>
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
                                        <td>{dataPlanotCancel?.id}</td>
                                        <th>Nome</th>
                                        <td>{dataPlanotCancel?.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Descrição</th>
                                        <td>{dataPlanotCancel?.descricao}</td>
                                        <th>Quantidade parcelas</th>
                                        <td>{dataPlanotCancel?.qtdParcelas}</td>
                                    </tr>
                                    <tr>
                                        <th>Dias médios</th>
                                        <td>{dataPlanotCancel?.diasmedios}</td>
                                        <th>Parcelas mínimas</th>
                                        <td>{dataPlanotCancel?.qtdMinParcelas}</td>
                                    </tr>
                                    <tr>
                                        <th>Dias primeira parcela</th>
                                        <td>{dataPlanotCancel?.qtd_dias_pri_parcela}</td>
                                        <th>Intervalo dias entre parcelas</th>
                                        <td>{dataPlanotCancel?.qtdDiasIntervaloParcelas}</td>
                                    </tr>
                                    <tr>
                                        <th>Gera duplicata manual</th>
                                        <td>{dataPlanotCancel?.gerarDuplicataManual == 'yes' ? 'Sim' : 'Não'}</td>
                                        <th>Exibe no balcão</th>
                                        <td>{dataPlanotCancel?.exbibe_balcao == 'yes' ? 'Sim' : 'Não'}</td>
                                    </tr>
                                    <tr>
                                        <th>Criação</th>
                                        <td>{dataPlanotCancel?.created_at}</td>
                                        <th>Ativo</th>
                                        <td>{dataPlanotCancel?.active == 'yes' ? 'Sim' : 'Não'}</td>
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
