import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { FORMULARIO_ONE_GET } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';

const Visualizar = ({ idRegistro, setIdRegistro, setVisualizarRegistro }) => {
    const [showModalVisualizarRegistro, setShowModalVisualizarRegistro] = React.useState(false)
    const [dataRegistro, setDataRegistro] = React.useState(null)
    const { getToken } = React.useContext(UserContex);

    const { request } = useFetch();

    React.useEffect(() => {
        const getRegistro = async () => {
            if (idRegistro > 0) {
                const { url, options } = FORMULARIO_ONE_GET(idRegistro, getToken());
                const { json } = await request(url, options);
                if (json) {
                    let data = json;
                    if (data?.mensagem) {
                        data = data.mensagem;
                    } else if (data?.data) {
                        data = data.data;
                    }

                    setDataRegistro(data);
                    setShowModalVisualizarRegistro(true);
                } else {
                    setDataRegistro(null);
                    setVisualizarRegistro(false);
                    setIdRegistro(null);
                }
            }
        };

        getRegistro();
    }, [idRegistro]);

    const buildDetails = (data) => {
        if (!data) {
            return [];
        }

        const fields = [
            { key: 'id', label: 'Codigo' },
            { key: 'name', label: 'Nome' },
            { key: 'status', label: 'Status' },
            { key: 'observacao', label: 'Observacao' },
            { key: 'created_at', label: 'Criado em' },
            { key: 'updated_at', label: 'Atualizado em' },
        ];

        return fields
            .filter(({ key }) => data[key] !== undefined && data[key] !== null && String(data[key]).length > 0)
            .map(({ key, label }) => ({ label, value: data[key] }));
    };

    const detalhes = buildDetails(dataRegistro);

    const FormModal = () => {
        return (
            <Row>
                <Col>
                    {detalhes.map((item) => (
                        <Row key={item.label} className={'py-1'}>
                            <Col xs="4" sm="4" md="3" style={{ fontWeight: 'bolder' }}>{item.label}</Col>
                            <Col xs="8" sm="8" md="9">{String(item.value)}</Col>
                        </Row>
                    ))}
                </Col>
            </Row>
        )
    };

    return (
        <>
            {!dataRegistro &&
                <Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Visualizar Template'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={true} showHide={() => { setShowModalVisualizarRegistro(); }}>
                    <Load />
                </Modal>
            }

            {dataRegistro &&
                <Modal
                    handleConcluir={() => null}
                    children={<FormModal />}
                    title={'Visualizar Template'}
                    size="lg"
                    dialogClassName={''}
                    aria-labelledby={'aria-labelledby'}
                    labelCanelar="Fechar"
                    show={showModalVisualizarRegistro}
                    showHide={() => { setShowModalVisualizarRegistro(false); setVisualizarRegistro(false); setIdRegistro(null) }}
                    propsConcluir={{}}
                    noBtnConcluir={true}
                    labelConcluir={null}
                />
            }

        </>
    )
}

export default Visualizar;
