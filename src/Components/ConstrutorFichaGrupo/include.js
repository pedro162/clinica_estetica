import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js';
import ListMobile from '../Relatorio/ListMobile/index.js';
import { faSearch, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js';
import Atualizar from './Atualizar/index.js';
import ConstrutorFichaItem from '../ConstrutorFichaItem/index.js';
import Visualizar from './Visualizar/index.js';

const Include = ({
    dataEstado,
    loadingData,
    requestAllRegistros,
    setMostarFiltros,
    nadaEncontrado,
    nextPage,
    setNextPage,
    usePagination,
    setUsePagination,
    totalPageCount,
    setTotalPageCount,
    ...props
}) => {
    const [registroChoice, setRegistroChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false);
    const [listarItems, setListarItem] = React.useState(false);
    const [visualizarRegistro, setVisualizarRegistro] = React.useState(false);
    const [acao, setAcao] = React.useState(null);
    const [nrPageAtual, setNrPageAtual] = React.useState(null);
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null);
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null);

    const normalizeMeta = (source) => {
        let meta = source;

        if (meta?.mensagem) {
            meta = meta.mensagem;
        }

        if (meta?.data) {
            meta = meta.data;
        }

        return meta;
    };

    const normalizeData = (source) => {
        let data = source;

        if (data?.mensagem) {
            data = data.mensagem;
        }

        if (data?.registro) {
            data = data.registro;
        }

        if (data?.data) {
            data = data.data;
        }

        return Array.isArray(data) ? data : [];
    };

    const handleTotalPages = () => {
        const meta = normalizeMeta(dataEstado);

        if (Number(meta?.last_page > 0)) {
            setTotalPageCount(meta?.last_page);
        }
    };

    const handleTotalItems = () => {
        const meta = normalizeMeta(dataEstado);

        if (Number(meta?.to > 0)) {
            setQtdItemsTo(meta?.to);
        }

        if (Number(meta?.total > 0)) {
            setQtdItemsTotal(meta?.total);
        }
    };

    const nextPageRout = () => {
        const meta = normalizeMeta(dataEstado);

        if (meta?.next_page_url) {
            setNextPage(meta?.next_page_url);
        }
    };

    const previousPageRout = () => {
        const meta = normalizeMeta(dataEstado);

        if (meta?.prev_page_url) {
            setNextPage(meta?.prev_page_url);
        }
    };

    const firstPageRout = () => {
        const meta = normalizeMeta(dataEstado);

        if (meta?.first_page_url) {
            setNextPage(meta?.first_page_url);
        }
    };

    const lastPageRout = () => {
        const meta = normalizeMeta(dataEstado);

        if (meta?.last_page_url) {
            setNextPage(meta?.last_page_url);
        }
    };

    React.useEffect(() => {
        const meta = normalizeMeta(dataEstado);
        setNrPageAtual(meta?.current_page);
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado]);

    React.useEffect(() => {
        switch (acao) {
            case 'editar':
                if (registroChoice > 0) {
                    setAtualizarCadastro(true);
                } else {
                    setAtualizarCadastro(false);
                }
                break;
            case 'listar_item':
                if (registroChoice > 0) {
                    setListarItem(true);
                } else {
                    setListarItem(false);
                }
                break;
            case 'visualizar':
                if (registroChoice > 0) {
                    setVisualizarRegistro(true);
                } else {
                    setVisualizarRegistro(false);
                }
                break;
            default:
                setAtualizarCadastro(false);
                break;
        }
    }, [registroChoice, acao]);

    const atualizarRegistro = (idRegistro) => {
        setRegistroChoice(idRegistro);
        setAcao('editar');
        setAtualizarCadastro(true);
    };

    const novoAtendimento = (idRegistro) => {
        setRegistroChoice(idRegistro);
        setAcao('consultar');
        setAtualizarCadastro(true);
    };

    const exbirListaItem = (idRegistro) => {
        setRegistroChoice(idRegistro);
        setAcao('listar_item');
        setListarItem(true);
    };

    const visualizarRegistroAction = (idRegistro) => {
        setRegistroChoice(idRegistro);
        setAcao('visualizar');
        setVisualizarRegistro(true);
    };

    const gerarTableRegistro = () => {
        const dataRegistro = normalizeData(dataEstado);
        const data = [];

        if (dataRegistro && dataRegistro.length > 0) {
            for (let i = 0; !(i == dataRegistro.length); i++) {
                let atual = dataRegistro[i];
                if (atual) {
                    data.push(
                        {
                            propsRow: { id: (atual.id) },
                            acoes: [
                                { acao: () => atualizarRegistro(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} },
                                { acao: () => novoAtendimento(atual.id), label: 'Excluir', propsOption: {}, propsLabel: {} },
                                { acao: () => novoAtendimento(atual.id), label: 'Atualizar itens', propsOption: {}, propsLabel: {} },
                                { acao: () => exbirListaItem(atual.id), label: 'Itens', propsOption: {}, propsLabel: {} },
                                { acao: () => visualizarRegistroAction(atual.id), label: 'Visualizar', propsOption: {}, propsLabel: {} },
                            ],
                            celBodyTableArr: [
                                {
                                    label: atual.id,
                                    propsRow: {}
                                },
                                {
                                    label: atual.name,
                                    propsRow: {}
                                },
                            ]
                        }
                    );
                }
            }
        }

        return data;
    };

    const gerarListMobileRegistro = () => {
        const dataRegistro = normalizeData(dataEstado);
        const data = [];

        if (dataRegistro && dataRegistro.length > 0) {
            for (let i = 0; !(i == dataRegistro.length); i++) {
                let atual = dataRegistro[i];
                if (atual && atual.id > 0) {
                    data.push(
                        {
                            propsRow: { id: (atual.id), titleRow: atual.id + ' - ' + atual?.name, mainIcon: faList },
                            acoes: [
                                { acao: () => atualizarRegistro(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} },
                                { acao: () => novoAtendimento(atual.id), label: 'Excluir', propsOption: {}, propsLabel: {} },
                                { acao: () => novoAtendimento(atual.id), label: 'Atualizar itens', propsOption: {}, propsLabel: {} },
                                { acao: () => exbirListaItem(atual.id), label: 'Itens', propsOption: {}, propsLabel: {} },
                                { acao: () => visualizarRegistroAction(atual.id), label: 'Visualizar', propsOption: {}, propsLabel: {} },
                            ],
                            title: <><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18pt', fontWeight: 'bolder' }} ><span>{atual?.name}</span></div></>,
                            propsContainerTitulo: { md: '11', sm: '9', xs: '9' },
                            propsContainerButtons: { md: '1', sm: '3', xs: '3' },
                            acoesBottomCard: [],
                            celBodyTableArr: [
                                [
                                    {
                                        title: <span style={{ fontWeight: '480' }}>Codigo: </span>,
                                        label: atual?.id,
                                        props: { style: { textAlign: 'left', md: '2', sm: '2', xs: '2' } },
                                        toSum: 0,
                                        isCoin: 0,
                                    },
                                    {
                                        title: <span style={{ fontWeight: '480' }}>Nome: </span>,
                                        label: atual?.name,
                                        props: { style: { textAlign: 'left', md: '6', sm: '6', xs: '6' } },
                                        toSum: 0,
                                        isCoin: 0,
                                    }
                                ],
                            ]
                        }
                    );
                }
            }
        }

        return data;
    };

    const gerarTitleTable = () => {
        return [
            {
                label: 'Codigo',
                props: {}
            },
            {
                label: 'Nome',
                props: {}
            },
        ];
    };

    const rowsTableArr = gerarTableRegistro();
    const titulosTableArr = gerarTitleTable();

    return (
        <>
            <Row>
                <Col xs="12" sm="12" md="12" className={'mobile_card_report py-4'} style={{ backgroundColor: '#FFF' }}>
                    <ListMobile
                        titulosTableArr={null}
                        rowsTableArr={gerarListMobileRegistro()}
                        loading={loadingData}
                        nadaEncontrado={nadaEncontrado}
                        withoutFirstCol={true}
                        botoesHeader={[{ acao: () => setMostarFiltros?.(mostar => !mostar), label: '', propsAcoes: { className: 'btn btn-sm btn-secondary', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faSearch} /> }]}
                        nextPage={nextPage}
                        setNextPage={setNextPage}
                        usePagination={usePagination}
                        setUsePagination={setUsePagination}
                        nextPageRout={nextPageRout}
                        previousPageRout={previousPageRout}
                        firstPageRout={firstPageRout}
                        nrPageAtual={nrPageAtual}
                        lastPageRout={lastPageRout}
                        totalPageCount={totalPageCount}
                        qtdItemsTo={qtdItemsTo}
                        qtdItemsTotal={qtdItemsTotal}
                    />
                </Col>

                <Col xs="12" sm="12" md="12" className={'default_card_report'}>
                    <Table
                        titulosTableArr={titulosTableArr}
                        rowsTableArr={rowsTableArr}
                        loading={loadingData}
                        nadaEncontrado={nadaEncontrado}
                        botoesHeader={[]}
                        nextPage={nextPage}
                        setNextPage={setNextPage}
                        usePagination={usePagination}
                        setUsePagination={setUsePagination}
                        nextPageRout={nextPageRout}
                        previousPageRout={previousPageRout}
                        firstPageRout={firstPageRout}
                        nrPageAtual={nrPageAtual}
                        lastPageRout={lastPageRout}
                        totalPageCount={totalPageCount}
                        qtdItemsTo={qtdItemsTo}
                        qtdItemsTotal={qtdItemsTotal}
                    />
                </Col>
            </Row>

            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro} idRegistro={registroChoice} setIdRegistro={setRegistroChoice} callback={requestAllRegistros} />
            }

            {
                listarItems &&
                <Modal noBtnConcluir={true} handleConcluir={() => null} title={'Items'} size="xl" propsConcluir={{ 'disabled': loadingData }} labelConcluir={null} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={listarItems} showHide={() => { setListarItem(false); setRegistroChoice(null); }}>
                    <ConstrutorFichaItem listarItems={listarItems} setListarItem={setListarItem} idGrupo={registroChoice} idRegistro={registroChoice} setIdRegistro={setRegistroChoice} callback={requestAllRegistros} />
                </Modal>
            }

            {
                visualizarRegistro &&
                <Visualizar idRegistro={registroChoice} setIdRegistro={setRegistroChoice} setVisualizarRegistro={setVisualizarRegistro} />
            }
        </>
    );
};

export default Include;
