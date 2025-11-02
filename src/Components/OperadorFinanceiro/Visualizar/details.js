import React from 'react';
import {Col, Row, Table} from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import {FORMAT_DATA_PT_BR, FORMAT_MONEY} from '../../../functions/index.js'
import estilos from './Visualizar.module.css'
import Swal from 'sweetalert2'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_SAVE_POST, CONSULTA_ALL_POST, FORMA_PAGAMENTO_DELETE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, PROFISSIONAL_DIAS_EXPEDIENTE_ALL_POST} from '../../../api/endpoints/geral.js'

const Details = ({dataOperadorFinanceiroChoice, setIdOperadorFinanceiro, idOperadorFinanceiro, showModalVisualizarOperadorFinanceiro, setShowModalVisualizarOperadorFinanceiro, callback, cancelarOperadorFinanceiro, setVisualizarOperadorFinanceiro, carregando, error})=>{

	const dataRequest = useFetch();
	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataOperadorFinanceiro, setDataOperadorFinanceiro] = React.useState([])

	const dataToDetails = ()=>{
    	let obj = { filial_id: '', vrTarifa: '', vrDesconto: '', isLiberado: '', nrRemessaAtual:'', vrPorcentagemDesconto: '', name: '', nrNossoNumero: '', qtdDiasProtesto: '', id: '', tpLocalAtualizacaoBoleto: '', desdobrarDuplicataManual: '', isAssumeDuplicata: '', isPadrao: '', active: '', deleted_at: '', created_at: '', updated_at: '' }

		if (dataOperadorFinanceiroChoice) {

			let data = dataOperadorFinanceiroChoice

			if (data?.mensagem) {
				data = data?.mensagem
			} else if (data?.data) {
				data = data?.data
			}

			if (data.hasOwnProperty('filial_id')) {
				obj.filial_id = data.filial_id;
			}

			if (data.hasOwnProperty('vrTarifa')) {
				obj.vrTarifa = data.vrTarifa;
			}

			if (data.hasOwnProperty('vrDesconto')) {
				obj.vrDesconto = data.vrDesconto;
			}

			if (data.hasOwnProperty('vrPorcentagemDesconto')) {
				obj.vrPorcentagemDesconto = data.vrPorcentagemDesconto;
			}

			if (data.hasOwnProperty('pessoa')) {
				obj.name = data?.pessoa?.name;
			}

			if (data.hasOwnProperty('nrRemessaAtual')) {
				obj.nrRemessaAtual = data.nrRemessaAtual;
			}

			if (data.hasOwnProperty('nrNossoNumero')) {
				obj.nrNossoNumero = data.nrNossoNumero;
			}

			if (data.hasOwnProperty('qtdDiasProtesto')) {
				obj.qtdDiasProtesto = data.qtdDiasProtesto;
			}

			if (data.hasOwnProperty('id')) {
				obj.id = data.id;
			}

			if (data.hasOwnProperty('tpLocalAtualizacaoBoleto')) {
				obj.tpLocalAtualizacaoBoleto = data.tpLocalAtualizacaoBoleto;
			}

			if (data.hasOwnProperty('desdobrarDuplicataManual')) {
				obj.desdobrarDuplicataManual = data.desdobrarDuplicataManual;
			}

			if (data.hasOwnProperty('created_at')) {
				obj.created_at = FORMAT_DATA_PT_BR(data.created_at);
			}

			if (data.hasOwnProperty('active')) {
				obj.active = data.active;
			}

			if (data.hasOwnProperty('isAssumeDuplicata')) {
				obj.isAssumeDuplicata = data.isAssumeDuplicata;
			}

			if (data.hasOwnProperty('isPadrao')) {
				obj.isPadrao = data.isPadrao;
			}

			if (data.hasOwnProperty('isLiberado')) {
				obj.isLiberado = data.isLiberado;
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
                                    <strong className="text-muted">Nome:</strong>
                                    <div>{dataPlanotCancel?.name}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Filial:</strong>
                                    <div>{dataPlanotCancel?.filial_id}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Atualização de boleto:</strong>
                                    <div>{dataPlanotCancel?.tpLocalAtualizacaoBoleto}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Dias para protesto:</strong>
                                    <div>{dataPlanotCancel?.qtdDiasProtesto}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Nosso número:</strong>
                                    <div>{dataPlanotCancel?.nrNossoNumero}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Remessa atual:</strong>
                                    <div>{dataPlanotCancel?.nrRemessaAtual}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Percentual desconto:</strong>
                                    <div>{dataPlanotCancel?.vrPorcentagemDesconto}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Valor tarifa:</strong>
                                    <div>{dataPlanotCancel?.vrTarifa}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Assume duplicata:</strong>
                                    <div>{dataPlanotCancel?.isAssumeDuplicata === 'yes' ? 'Sim' : 'Não'}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Padrão:</strong>
                                    <div>{dataPlanotCancel?.isPadrao === 'yes' ? 'Sim' : 'Não'}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Liberado para uso:</strong>
                                    <div>{dataPlanotCancel?.isLiberado === 'yes' ? 'Sim' : 'Não'}</div>
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
                                        <th>Filial</th>
                                        <td>{dataPlanotCancel?.filial_id}</td>
                                        <th>Nosso número atual</th>
                                        <td>{dataPlanotCancel?.nrNossoNumero}</td>
                                    </tr>
                                    <tr>
                                        <th>Atualização de boleto</th>
                                        <td>{dataPlanotCancel?.tpLocalAtualizacaoBoleto}</td>
                                        <th>Dias para protesto</th>
                                        <td>{dataPlanotCancel?.qtdDiasProtesto}</td>
                                    </tr>
                                    <tr>
                                        <th>Percentual desconto</th>
                                        <td>{dataPlanotCancel?.vrPorcentagemDesconto}</td>
                                        <th>Valor desconto</th>
                                        <td>{dataPlanotCancel?.vrDesconto}</td>
                                    </tr>
                                    <tr>
                                        <th>Valor tarifa</th>
                                        <td>{FORMAT_MONEY(dataPlanotCancel?.vrTarifa)}</td>
                                        <th>Assume duplicata</th>
                                        <td>{dataPlanotCancel?.isAssumeDuplicata == 'yes' ? 'Sim' : 'Não'}</td>
                                    </tr>
                                    <tr>                                        
                                        <th>Remessa atual</th>
                                        <td>{dataPlanotCancel?.nrRemessaAtual}</td>
                                        <th>Liberado</th>
                                        <td>{dataPlanotCancel?.isLiberado == 'yes' ? 'Sim' : 'Não'}</td>
                                    </tr>
                                    <tr>
                                        <th>Criação</th>
                                        <td>{dataPlanotCancel?.created_at}</td>
                                        <th>Padrão</th>
                                        <td>{dataPlanotCancel?.isPadrao == 'yes' ? 'Sim' : 'Não'}</td>
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
