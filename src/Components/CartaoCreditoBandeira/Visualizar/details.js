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

const Details = ({ dataCartaoCreditoBandeiraChoice, setIdCartaoCreditoBandeira, idCartaoCreditoBandeira, showModalVisualizarCartaoCreditoBandeira, setShowModalVisualizarCartaoCreditoBandeira, callback, cancelarCartaoCreditoBandeira, setVisualizarCartaoCreditoBandeira, carregando, error }) => {

    const dataRequest = useFetch();
    const { getToken, dataUser } = React.useContext(UserContex);
    const [dataCartaoCreditoBandeira, setDataCartaoCreditoBandeira] = React.useState([])

    const dataToDetails = () => {
        let obj = { name: '', id: '', standard: '', active: '', deleted_at: '', created_at: '', updated_at: '' }

        if (dataCartaoCreditoBandeiraChoice) {

            let data = dataCartaoCreditoBandeiraChoice

            if (data?.mensagem) {
                data = data?.mensagem
            } else if (data?.data) {
                data = data?.data
            }

            if (data.hasOwnProperty('name')) {
                obj.name = data.name;
            }

            if (data.hasOwnProperty('id')) {
                obj.id = data.id;
            }

            if (data.hasOwnProperty('created_at')) {
                obj.created_at = FORMAT_DATA_PT_BR(data.created_at);
            }

            if (data.hasOwnProperty('active')) {
                obj.active = data.active;
            }

            if (data.hasOwnProperty('standard')) {
                obj.standard = data.standard;
            }
        }

        return obj;
    }

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
                                    <strong className="text-muted">Padrão:</strong>
                                    <div>{dataPlanotCancel?.standard === 'yes' ? 'Sim' : 'Não'}</div>
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
                                    <th>Criação</th>
                                    <td>{dataPlanotCancel?.created_at}</td>
                                    <th>Padrão</th>
                                    <td>{dataPlanotCancel?.standard == 'yes' ? 'Sim' : 'Não'}</td>
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
