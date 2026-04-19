import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import { FORMAT_DATA_PT_BR, FORMAT_MONEY } from '../../../functions/index.js'
import estilos from './Visualizar.module.css'
import Swal from 'sweetalert2'

const Details = ({ dataOrdemServicoChoice, carregando, error }) => {

    const dataToDetails = () => {
        let obj = {
            id: '',
            name_filial: '',
            name: '',
            status: '',
            type: '',
            name_profissional: '',
            name_rca: '',
            observacao: '',
            vr_final: '',
            is_faturado: '',
            td_faturamento: '',
            td_cancelamento: '',
            td_conclusao: '',
            created_at: '',
        }

        if (dataOrdemServicoChoice) {
            let data = dataOrdemServicoChoice

            if (data?.mensagem) {
                data = data?.mensagem
            } else if (data?.data) {
                data = data?.data
            }

            if (data?.data) {
                data = data?.data
            }

            if (data.hasOwnProperty('id')) {
                obj.id = data.id;
            }

            if (data.hasOwnProperty('name_filial')) {
                obj.name_filial = data.name_filial;
            }

            if (data.hasOwnProperty('name')) {
                obj.name = data.name;
            }

            if (data.hasOwnProperty('status')) {
                obj.status = data.status;
            }

            if (data.hasOwnProperty('type')) {
                obj.type = data.type;
            }

            if (data.hasOwnProperty('name_profissional')) {
                obj.name_profissional = data.name_profissional;
            }

            if (data.hasOwnProperty('name_rca')) {
                obj.name_rca = data.name_rca;
            }

            if (data.hasOwnProperty('observacao')) {
                obj.observacao = data.observacao;
            }

            if (data.hasOwnProperty('vr_final')) {
                obj.vr_final = data.vr_final;
            }

            if (data.hasOwnProperty('is_faturado')) {
                obj.is_faturado = data.is_faturado;
            }

            if (data.hasOwnProperty('td_faturamento')) {
                obj.td_faturamento = FORMAT_DATA_PT_BR(data.td_faturamento);
            }

            if (data.hasOwnProperty('td_cancelamento')) {
                obj.td_cancelamento = FORMAT_DATA_PT_BR(data.td_cancelamento);
            }

            if (data.hasOwnProperty('td_conclusao')) {
                obj.td_conclusao = FORMAT_DATA_PT_BR(data.td_conclusao);
            }

            if (data.hasOwnProperty('created_at')) {
                obj.created_at = FORMAT_DATA_PT_BR(data.created_at);
            }
        }

        return obj;
    }

    const dataFormatDetails = dataToDetails();

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
                    <span className="label_title_grup_forms">Dados basicos</span>
                </Col>
            </Row>

            {
                error && <Row className="my-3">
                    <Col xs="12" sm="12" md="12">
                        <AlertaDismissible title="Atencao:" message={error} variant={"danger"} />
                    </Col>
                </Row>
            }

            <Row className="my-3">
                <Col xs="12" sm="12" md="12" className={'mobile_card_report'} >
                    <Row className="my-3">
                        <Col xs="12">
                            <div className={`${estilos['card-detalhes']} p-4 rounded-4 shadow-sm border bg-white`} >
                                <h5 className="fw-bold mb-3 text-primary">Ordem #{dataFormatDetails?.id}</h5>

                                <div className="mb-3">
                                    <strong className="text-muted">Cliente:</strong>
                                    <div>{dataFormatDetails?.name}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Filial:</strong>
                                    <div>{dataFormatDetails?.name_filial}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Status:</strong>
                                    <div>{dataFormatDetails?.status}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Tipo:</strong>
                                    <div>{dataFormatDetails?.type}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Profissional:</strong>
                                    <div>{dataFormatDetails?.name_profissional}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Vendedor:</strong>
                                    <div>{dataFormatDetails?.name_rca}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Valor:</strong>
                                    <div>{FORMAT_MONEY(dataFormatDetails?.vr_final)}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Faturado:</strong>
                                    <div>{dataFormatDetails?.is_faturado === 'yes' ? 'Sim' : 'Nao'}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Criado em:</strong>
                                    <div>{dataFormatDetails?.created_at}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Faturado em:</strong>
                                    <div>{dataFormatDetails?.td_faturamento || 'Nao informado'}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Cancelado em:</strong>
                                    <div>{dataFormatDetails?.td_cancelamento || 'Nao informado'}</div>
                                </div>

                                <div className="mb-3">
                                    <strong className="text-muted">Concluido em:</strong>
                                    <div>{dataFormatDetails?.td_conclusao || 'Nao informado'}</div>
                                </div>

                                {dataFormatDetails?.observacao && (
                                    <div>
                                        <strong className="text-muted">Observacao:</strong>
                                        <div>{dataFormatDetails?.observacao}</div>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>

                </Col>

                <Col xs="12" sm="12" md="12" className={'default_card_report'}>
                    <div className="table-responsive">
                        <Table striped bordered hover size="sm" responsive={true}>
                            <tbody>
                                <tr>
                                    <th>Codigo</th>
                                    <td>{dataFormatDetails?.id}</td>
                                    <th>Cliente</th>
                                    <td>{dataFormatDetails?.name}</td>
                                </tr>
                                <tr>
                                    <th>Filial</th>
                                    <td>{dataFormatDetails?.name_filial}</td>
                                    <th>Status</th>
                                    <td>{dataFormatDetails?.status}</td>
                                </tr>
                                <tr>
                                    <th>Tipo</th>
                                    <td>{dataFormatDetails?.type}</td>
                                    <th>Valor</th>
                                    <td>{FORMAT_MONEY(dataFormatDetails?.vr_final)}</td>
                                </tr>
                                <tr>
                                    <th>Profissional</th>
                                    <td>{dataFormatDetails?.name_profissional}</td>
                                    <th>Vendedor</th>
                                    <td>{dataFormatDetails?.name_rca}</td>
                                </tr>
                                <tr>
                                    <th>Faturado</th>
                                    <td>{dataFormatDetails?.is_faturado === 'yes' ? 'Sim' : 'Nao'}</td>
                                    <th>Faturado em</th>
                                    <td>{dataFormatDetails?.td_faturamento || 'Nao informado'}</td>
                                </tr>
                                <tr>
                                    <th>Cancelado em</th>
                                    <td>{dataFormatDetails?.td_cancelamento || 'Nao informado'}</td>
                                    <th>Concluido em</th>
                                    <td>{dataFormatDetails?.td_conclusao || 'Nao informado'}</td>
                                </tr>
                                <tr>
                                    <th>Criado em</th>
                                    <td>{dataFormatDetails?.created_at}</td>
                                    <th>Observacao</th>
                                    <td>{dataFormatDetails?.observacao || 'Nao informado'}</td>
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
