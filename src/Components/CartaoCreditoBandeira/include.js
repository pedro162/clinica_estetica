import React from 'react';
import estilos from './CartaoCreditoBandeira.module.css'
import useFetch from '../../Hooks/useFetch.js';
import { FORMAT_DATA_PT_BR, FORMAT_MONEY } from '../../functions/index.js'
import { Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import { UserContex } from '../../Context/UserContex.js'
import FormCartaoCreditoBandeira from './FormCartaoCreditoBandeira/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Excluir from './Excluir/index.js'
import Visualizar from './Visualizar/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'


const Include = ({ dataEstado, loadingData, nadaEncontrado, callBack, setMostarFiltros, idCartaoCreditoBandeiraCriada, nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount, requestAllCartaoCreditoBandeiras, ...props }) => {

    const { data, error, request, loading } = useFetch();
    const [estado, setCartaoCreditoBandeira] = React.useState([])
    const [showModalCriarCartaoCreditoBandeira, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setCartaoCreditoBandeiraChoice] = React.useState(null);
    const [atualizarCartaoCreditoBandeira, setAtualizarCartaoCreditoBandeira] = React.useState(false)
    const [cancelarCartaoCreditoBandeira, setExcluirCartaoCreditoBandeira] = React.useState(false)
    const [visualizarCartaoCreditoBandeira, setVisualizarCartaoCreditoBandeira] = React.useState(false)
    const [cadastrarCartaoCreditoBandeira, setCadastrarCartaoCreditoBandeira] = React.useState(false)
    const [acao, setAcao] = React.useState(null)
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)

    const { getToken, dataUser } = React.useContext(UserContex);
    const { type, is_system, tenant_id } = dataUser ? dataUser : {};

    const handleTotalPages = () => {
        if (Number(dataEstado?.data?.data?.last_page > 0)) {
            setTotalPageCount(dataEstado?.data?.data?.last_page)
        }
    }

    const handleTotalItems = () => {
        if (Number(estado?.data?.to > 0)) {
            setQtdItemsTo(estado?.data?.to)
        }

        if (Number(estado?.data?.total > 0)) {
            setQtdItemsTotal(estado?.data?.total)
        }
    }

    const nextPageRout = () => {
        if (estado?.data?.next_page_url) {
            setNextPage(estado?.data?.next_page_url)
        }
    }

    const previousPageRout = () => {
        if (estado?.data?.prev_page_url) {
            setNextPage(estado?.data?.prev_page_url)
        }
    }

    const firstPageRout = () => {
        if (estado?.data?.first_page_url) {
            setNextPage(estado?.data?.first_page_url)
        }
    }

    const lastPageRout = () => {
        if (estado?.data?.last_page_url) {
            setNextPage(estado?.data?.last_page_url)
        }
    }

    React.useEffect(() => {
        switch (acao) {
            case 'editar':
                if (consultaChoice > 0) {
                    setAtualizarCartaoCreditoBandeira(true);
                } else {
                    setAtualizarCartaoCreditoBandeira(false);
                }
                break;
            case 'excluir':
                if (consultaChoice > 0) {
                    setExcluirCartaoCreditoBandeira(true);
                } else {
                    setExcluirCartaoCreditoBandeira(false);
                }
                break;
            case 'visualizar':
                if (consultaChoice > 0) {
                    setVisualizarCartaoCreditoBandeira(true);
                } else {
                    setVisualizarCartaoCreditoBandeira(false);
                }
                break;
            default://

                break;

        }

    }, [consultaChoice, acao])

    React.useEffect(() => {

        if (cadastrarCartaoCreditoBandeira == true) {
            setShowModalCriarConstula(true);
        } else {
            setShowModalCriarConstula(false);
        }

    }, [cadastrarCartaoCreditoBandeira])

    const atualizarCartaoCreditoBandeiraAction = (idCartaoCreditoBandeira) => {
        setCartaoCreditoBandeiraChoice(idCartaoCreditoBandeira)
        setAcao('editar')
        setAtualizarCartaoCreditoBandeira(true);
    }

    const cancelarCartaoCreditoBandeiraAction = (idCartaoCreditoBandeira) => {
        setCartaoCreditoBandeiraChoice(idCartaoCreditoBandeira)
        setAcao('excluir')
        setExcluirCartaoCreditoBandeira(true);
    }

    const visualizarCartaoCreditoBandeiraAction = (idCartaoCreditoBandeira) => {
        setCartaoCreditoBandeiraChoice(idCartaoCreditoBandeira)
        setAcao('visualizar')
        setVisualizarCartaoCreditoBandeira(true);
    }

    const gerarTableCartaoCreditoBandeira = () => {

        let data = [];
        let dataCartaoCreditoBandeira = estado

        if (dataCartaoCreditoBandeira?.mensagem) {
            dataCartaoCreditoBandeira = dataCartaoCreditoBandeira?.mensagem;
        }

        if (dataCartaoCreditoBandeira?.registro) {
            dataCartaoCreditoBandeira = dataCartaoCreditoBandeira?.registro;
        }

        if (dataCartaoCreditoBandeira?.data) {
            dataCartaoCreditoBandeira = dataCartaoCreditoBandeira?.data;
        }

        if (dataCartaoCreditoBandeira?.data) {
            dataCartaoCreditoBandeira = dataCartaoCreditoBandeira?.data;
        }

        if (dataCartaoCreditoBandeira && Array.isArray(dataCartaoCreditoBandeira) && dataCartaoCreditoBandeira.length > 0) {
            for (let i = 0; !(i == dataCartaoCreditoBandeira.length); i++) {
                let atual = dataCartaoCreditoBandeira[i];
                if (atual) {
                    let line_style = {}
                    let acoesArr = [];
                    let btnExcluir = true;
                    let btnEditar = true;
                    let btnDetalhes = true;

                    if (type == 'external') {
                        btnExcluir = false;
                        btnEditar = false;
                    }

                    if (btnEditar) {
                        acoesArr.push({ acao: () => atualizarCartaoCreditoBandeiraAction(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} })
                    }

                    if (btnExcluir) {
                        acoesArr.push({ acao: () => cancelarCartaoCreditoBandeiraAction(atual.id), label: 'Excluir', propsOption: {}, propsLabel: {} })
                    }

                    if (btnDetalhes) {
                        acoesArr.push({ acao: () => visualizarCartaoCreditoBandeiraAction(atual.id), label: 'Visualizar', propsOption: {}, propsLabel: {} })
                    }

                    data.push(

                        {
                            propsRow: { id: (atual.id), style: { ...line_style } },
                            acoes: [
                                ...acoesArr
                            ],
                            celBodyTableArr: [
                                {

                                    label: atual.id,
                                    propsRow: {}
                                },
                                {

                                    label: atual?.name,
                                    propsRow: {}
                                },
                                {

                                    label: atual?.standard === 'yes' ? 'Sim' : 'Não',
                                    propsRow: {}
                                },
                                {

                                    label: String(FORMAT_DATA_PT_BR(atual.created_at)).length > 0 && FORMAT_DATA_PT_BR(atual.created_at),
                                    propsRow: {}
                                },
                            ]
                        }
                    )
                }
            }
        }

        return data;
    }

    const gerarTitleTable = () => {
        let tableTitle = [
            {
                label: 'Código',
                props: { style: { minWidth: '50px' } }
            },
            {
                label: 'Nome',
                props: { style: { minWidth: '225px' } }
            },
            {
                label: 'Bandeira padrão',
                props: { style: { minWidth: '325px' } }
            },
            {
                label: 'Data criação',
                props: { style: { minWidth: '225px' } }
            }
        ]

        return tableTitle;
    }

    const gerarListMobileRelatorio = () => {

        let data = [];
        let dataCartaoCreditoBandeira = estado

        if (dataCartaoCreditoBandeira?.mensagem) {
            dataCartaoCreditoBandeira = dataCartaoCreditoBandeira?.mensagem;
        }

        if (dataCartaoCreditoBandeira?.registro) {
            dataCartaoCreditoBandeira = dataCartaoCreditoBandeira?.registro;
        }

        if (dataCartaoCreditoBandeira?.data) {
            dataCartaoCreditoBandeira = dataCartaoCreditoBandeira?.data;
        }

        if (dataCartaoCreditoBandeira?.data) {
            dataCartaoCreditoBandeira = dataCartaoCreditoBandeira?.data;
        }

        if (dataCartaoCreditoBandeira && Array.isArray(dataCartaoCreditoBandeira) && dataCartaoCreditoBandeira.length > 0) {
            for (let i = 0; !(i == dataCartaoCreditoBandeira.length); i++) {
                let atual = dataCartaoCreditoBandeira[i];
                if (atual) {

                    let line_style = {}
                    let acoesArr = [];
                    let btnEditar = true;
                    let btnExcluir = true;
                    let btnDetalhes = true;

                    if (type == 'external') {
                        btnExcluir = false;
                        btnEditar = false;
                    }

                    if (btnEditar) {
                        acoesArr.push({ acao: () => atualizarCartaoCreditoBandeiraAction(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} })
                    }

                    if (btnExcluir) {
                        acoesArr.push({ acao: () => cancelarCartaoCreditoBandeiraAction(atual.id), label: 'Excluir', propsOption: {}, propsLabel: {} })
                    }

                    if (btnDetalhes) {
                        acoesArr.push({ acao: () => visualizarCartaoCreditoBandeiraAction(atual.id), label: 'Visualizar', propsOption: {}, propsLabel: {} })
                    }

                    data.push(
                        {
                            propsRow: { id: (atual.id), titleRow: atual?.id + ' - ' + atual?.name, style: { ...line_style } },
                            acoes: [
                                ...acoesArr
                            ],
                            title: <> <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18pt', fontWeight: 'bolder' }} ><span><FontAwesomeIcon size={'lg'} icon={faUserCircle} /> {atual?.name} </span> </div> </>,
                            propsContainerTitulo: { md: '11', sm: '9', xs: '9' },
                            propsContainerButtons: { md: '1', sm: '4', xs: '2' },
                            acoesBottomCard: [

                            ],
                            celBodyTableArr: [
                                [
                                    {
                                        title: <span style={{ fontWeight: '480' }}>Filial: </span>,
                                        label: atual?.filial_id,
                                        props: { style: { textAlign: 'left', fontWeight: 'bolder' }, md: '6', sm: '6', xs: '6' },
                                        toSum: 0,
                                        isCoin: 0,
                                    },
                                    {
                                        title: <span style={{ fontWeight: '480' }}>Padrão: </span>,
                                        label: atual?.standard === 'yes' ? 'Sim' : 'Não',
                                        props: { style: { textAlign: 'left', fontWeight: 'bolder' }, md: '6', sm: '6', xs: '6' },
                                        toSum: 0,
                                        isCoin: 0,
                                    },

                                ],
                            ]
                        }
                    )
                }
            }
        }

        return data;
    }

    React.useEffect(() => {
        setCartaoCreditoBandeira(dataEstado?.data)
        setNrPageAtual(dataEstado?.data?.data?.current_page)
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado])

    const rowsTableArr = gerarTableCartaoCreditoBandeira();
    const titulosTableArr = gerarTitleTable();

    return (
        <>
            <Row>
                <Col xs="12" sm="12" md="12" className={'mobile_card_report py-4'} style={{ backgroundColor: '#FFF', }}>
                    <ListMobile
                        titulosTableArr={null}
                        rowsTableArr={gerarListMobileRelatorio()}
                        loading={loadingData}
                        nadaEncontrado={nadaEncontrado}
                        withoutFirstCol={true}
                        botoesHeader={[{ acao: () => setMostarFiltros(mostar => !mostar), label: '', propsAcoes: { className: 'btn btn-sm btn-secondary', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faSearch} /> }]}
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
                cadastrarCartaoCreditoBandeira && <Cadastrar cadastrarCartaoCreditoBandeira={cadastrarCartaoCreditoBandeira} setCadastrarCartaoCreditoBandeira={setCadastrarCartaoCreditoBandeira} atualizarCartaoCreditoBandeira={atualizarCartaoCreditoBandeira} setAtualizarCartaoCreditoBandeira={setAtualizarCartaoCreditoBandeira} idCartaoCreditoBandeira={consultaChoice} setIdCartaoCreditoBandeira={setCartaoCreditoBandeiraChoice} callback={requestAllCartaoCreditoBandeiras} />
            }

            {
                atualizarCartaoCreditoBandeira &&
                <Atualizar atualizarCartaoCreditoBandeira={atualizarCartaoCreditoBandeira} setAtualizarCartaoCreditoBandeira={setAtualizarCartaoCreditoBandeira} idCartaoCreditoBandeira={consultaChoice} setIdCartaoCreditoBandeira={setCartaoCreditoBandeiraChoice} callback={requestAllCartaoCreditoBandeiras} />
            }

            {
                cancelarCartaoCreditoBandeira &&
                <Excluir cancelarCartaoCreditoBandeira={cancelarCartaoCreditoBandeira} setExcluirCartaoCreditoBandeira={setExcluirCartaoCreditoBandeira} idCartaoCreditoBandeira={consultaChoice} setIdCartaoCreditoBandeira={setCartaoCreditoBandeiraChoice} callback={requestAllCartaoCreditoBandeiras} />
            }

            {
                visualizarCartaoCreditoBandeira &&
                <Visualizar visualizarCartaoCreditoBandeira={visualizarCartaoCreditoBandeira} setVisualizarCartaoCreditoBandeira={setVisualizarCartaoCreditoBandeira} idCartaoCreditoBandeira={consultaChoice} setIdCartaoCreditoBandeira={setCartaoCreditoBandeiraChoice} callback={requestAllCartaoCreditoBandeiras} />
            }

        </>
    )
}

export default Include;