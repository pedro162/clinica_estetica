import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import { FORMAT_DATA_PT_BR, FORMAT_MONEY } from '../../../functions/index.js'
import estilos from './Visualizar.module.css'
import Swal from 'sweetalert2'

import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CONSULTA_SAVE_POST, CONSULTA_ALL_POST, FORMA_PAGAMENTO_DELETE_POST, CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, PROFISSIONAL_DIAS_EXPEDIENTE_ALL_POST } from '../../../api/endpoints/geral.js'

const Details = ({ dataVendedorChoice, setIdVendedor, idVendedor, showModalVisualizarVendedor, setShowModalVisualizarVendedor, callback, cancelarVendedor, setVisualizarVendedor, carregando, error }) => {

    // Canonical properties for Vendedor
    // Exibir apenas propriedades do include.js
    const dataToDetails = () => {
        let obj = {
            id: '',
            name: '',
            filial_id: '',
            metaPositivacao: '',
            metaFaturamento: '',
            metaMargem: '',
            situacao: '',
            acessaTodosRcas: '',
            created_at: '',
            'active': '',
        };

        if (dataVendedorChoice) {
            let data = dataVendedorChoice;
            if (data?.mensagem) {
                data = data?.mensagem;
            } else if (data?.data) {
                data = data?.data;
            }

            if (data.hasOwnProperty('id')) obj.id = data.id;
            if (data.hasOwnProperty('pessoa')) obj.name = data?.pessoa?.name;
            if (data.hasOwnProperty('filial_id')) obj.filial_id = data.filial_id;
            if (data.hasOwnProperty('metaPositivacao')) obj.metaPositivacao = data.metaPositivacao;
            if (data.hasOwnProperty('metaFaturamento')) obj.metaFaturamento = data.metaFaturamento;
            if (data.hasOwnProperty('metaMargem')) obj.metaMargem = data.metaMargem;
            if (data.hasOwnProperty('situacao')) obj.situacao = data.situacao;
            if (data.hasOwnProperty('active')) obj.active = data.active;
            if (data.hasOwnProperty('acessaTodosRcas')) obj.acessaTodosRcas = data.acessaTodosRcas;
            if (data.hasOwnProperty('created_at')) obj.created_at = FORMAT_DATA_PT_BR(data.created_at);
        }
        return obj;
    };

    const dataPlanotCancel = dataToDetails();

    if (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
            footer: '',
            confirmButtonColor: "#07B201",
        });
    }

    return (

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
                <Col xs="12" sm="12" md="12" className={'mobile_card_report'} >
                    <Row className="my-3">
                        <Col xs="12">
                            <div className={`${estilos['card-detalhes']} p-4 rounded-4 shadow-sm border bg-white`} >
                                <h5 className="fw-bold mb-3 text-primary">{dataPlanotCancel?.name || ''}</h5>

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
                                    <strong className="text-muted">Meta positivação:</strong>
                                    <div>{dataPlanotCancel?.metaPositivacao}</div>
                                </div>
                                <div className="mb-3">
                                    <strong className="text-muted">Meta faturamento:</strong>
                                    <div>{dataPlanotCancel?.metaFaturamento}</div>
                                </div>
                                <div className="mb-3">
                                    <strong className="text-muted">Meta margem:</strong>
                                    <div>{dataPlanotCancel?.metaMargem}</div>
                                </div>
                                <div className="mb-3">
                                    <strong className="text-muted">Situação:</strong>
                                    <div>{dataPlanotCancel?.situacao}</div>
                                </div>
                                <div className="mb-3">
                                    <strong className="text-muted">Ativo:</strong>
                                    <div>{dataPlanotCancel?.active == 'yes' ? 'Sim' : 'Não'}</div>
                                </div>
                                <div className="mb-3">
                                    <strong className="text-muted">Visualiza outros vendedores:</strong>
                                    <div>{dataPlanotCancel?.acessaTodosRcas === 'yes' ? 'Sim' : 'Não'}</div>
                                </div>
                                <div className="mb-3">
                                    <strong className="text-muted">Data criação:</strong>
                                    <div>{dataPlanotCancel?.created_at}</div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Col>

                <Col xs="12" sm="12" md="12" className={'default_card_report'}>
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
                                    <th>Meta positivação</th>
                                    <td>{dataPlanotCancel?.metaPositivacao}</td>
                                </tr>
                                <tr>
                                    <th>Meta faturamento</th>
                                    <td>{dataPlanotCancel?.metaFaturamento}</td>
                                    <th>Meta margem</th>
                                    <td>{dataPlanotCancel?.metaMargem}</td>
                                </tr>
                                <tr>
                                    <th>Situação</th>
                                    <td>{dataPlanotCancel?.situacao}</td>
                                    <th>Ativo</th>
                                    <td>{dataPlanotCancel?.active == 'yes' ? 'Sim' : 'Não'}</td>
                                </tr>
                                <tr>
                                    <th>Visualiza outros vendedores</th>
                                    <td>{dataPlanotCancel?.acessaTodosRcas === 'yes' ? 'Sim' : 'Não'}</td>
                                    <th>Data criação</th>
                                    <td>{dataPlanotCancel?.created_at}</td>
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
