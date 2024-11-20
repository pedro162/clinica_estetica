import React from 'react'
import estilos from './Cidade.module.css'
import useFetch from '../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CIDADE_ALL_POST } from '../../api/endpoints/geral.js'
import { FORMAT_DATA_PT_BR } from '../../functions/index.js'
import { Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faUserCircle, faHandHoldingUsd, faHandHolding, faTasks, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import { UserContex } from '../../Context/UserContex.js'
import FormCidade from './FormCidade/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import { FORMAT_CALC_COD, FORMAT_MONEY } from '../../functions/index.js'
import { Button } from 'bootstrap';
import reactDom from 'react-dom';

const Include = ({ dataEstado, loadingData, callBack, setMostarFiltros, nadaEncontrado, idCidadeCriada, nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount, ...props }) => {
    const { data, error, request, loading } = useFetch();
    const [estado, setCidade] = React.useState([])
    const [showModalCriarCidade, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setCidadeChoice] = React.useState(null);
    const [atualizarCidade, setAtualizarCidade] = React.useState(false)
    const [cadastrarCidade, setCadastrarCidade] = React.useState(false)
    const [acao, setAcao] = React.useState(null)
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)

    const { getToken } = React.useContext(UserContex);

    const handleTotalPages = () => {
        if (Number(estado?.data?.last_page > 0)) {
            setTotalPageCount(estado?.data?.last_page)
        }
    }

    const handleTotalItems = () => {
        if (Number(estado?.data?.to > 0)) {
            setQtdItemsTo(estado?.data?.to)
        }

        if (Number(estado?.data?.to > 0)) {
            setQtdItemsTo(estado?.data?.to)
        }

        if (Number(estado?.data?.total > 0)) {
            setQtdItemsTotal(estado?.data?.total)
        }

        if (Number(estado?.data?.total > 0)) {
            setQtdItemsTotal(estado?.data?.total)
        }
    }

    const nextPageRout = () => {
        if (estado?.data?.next_page_url) {
            setNextPage(estado?.data?.next_page_url)
        }

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
                    setAtualizarCidade(true);
                } else {
                    setAtualizarCidade(false);
                }
                break;
            default:

                break;

        }

    }, [consultaChoice, acao])

    React.useEffect(() => {

        if (cadastrarCidade == true) {
            setShowModalCriarConstula(true);
        } else {
            setShowModalCriarConstula(false);
        }


    }, [cadastrarCidade])

    const atualizarCidadeAction = (idCidade) => {
        setCidadeChoice(idCidade)
        setAcao('editar')
        setAtualizarCidade(true);
    }

    React.useEffect(() => {

        idCidadeCriada && idCidadeCriada > 0 && atualizarCidadeAction(idCidadeCriada)

    }, [idCidadeCriada])

    const gerarTableCidade = () => {

        let data = [];
        let dataCidade = estado;

        if (dataCidade?.mensagem) {
            dataCidade = dataCidade?.mensagem;
        }

        if (dataCidade?.registro) {
            dataCidade = dataCidade?.registro;
        }

        if (dataCidade?.data) {
            dataCidade = dataCidade?.data;
        }

        if (dataCidade?.data) {
            dataCidade = dataCidade?.data;
        }

        if (dataCidade && Array.isArray(dataCidade) && dataCidade.length > 0) {
            for (let i = 0; !(i == dataCidade.length); i++) {
                let atual = dataCidade[i];
                if (atual) {
                    let acoesArr = [];
                    let btnEditar = true;

                    acoesArr.push({ acao: () => atualizarCidadeAction(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} })

                    let line_style = {}

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

                                    label: atual.nmCidade,
                                    propsRow: {}
                                },
                                {

                                    label: atual.sigla,
                                    propsRow: {}
                                },
                                {

                                    label: atual.cdCiade,
                                    propsRow: {}
                                },
                                {

                                    label: atual.nmEStado,
                                    propsRow: {}
                                }

                            ]
                        }

                    )

                }

            }
        }

        return data;
    }

    const gerarListMobileRelatorio = () => {

        let data = [];
        let dataCidade = estado;

        if (dataCidade?.mensagem) {
            dataCidade = dataCidade?.mensagem;
        }

        if (dataCidade?.registro) {
            dataCidade = dataCidade?.registro;
        }

        if (dataCidade?.data) {
            dataCidade = dataCidade?.data;
        }

        if (dataCidade?.data) {
            dataCidade = dataCidade?.data;
        }

        if (dataCidade && Array.isArray(dataCidade) && dataCidade.length > 0) {
            for (let i = 0; !(i == dataCidade.length); i++) {
                let atual = dataCidade[i];

                if (atual) {
                    let acoesArr = [];
                    let btnEditar = true;

                    acoesArr.push({ acao: () => atualizarCidadeAction(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} })

                    let line_style = {}

                    data.push(

                        {
                            propsRow: { id: (atual.id), titleRow: atual.id + ' - ' + atual?.nmCidade, style: { ...line_style }, mainIcon: faFileAlt },
                            acoes: [
                                ...acoesArr
                            ],
                            title: <> <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18pt', fontWeight: 'bolder' }} ><span><FontAwesomeIcon size={'lg'} icon={faUserCircle} /> {atual?.name} </span> </div> </>,
                            propsContainerTitulo: { md: '11', sm: '9', xs: '9' },
                            propsContainerButtons: { md: '1', sm: '3', xs: '3' },
                            acoesBottomCard: [

                            ],
                            celBodyTableArr: [
                                [

                                    {
                                        title: <span style={{ fontWeight: '480' }}>Cód Cidade: </span>,
                                        label: atual?.id,
                                        props: { style: { textAlign: 'left', fontWeight: 'bolder', md: '5', sm: '5', xs: '5' } },
                                        toSum: 1,
                                        isCoin: 1,
                                    },
                                    {
                                        title: <span style={{ fontWeight: '480' }}>IBGE: </span>,
                                        label: atual?.cdCiade,
                                        props: { style: { textAlign: 'left', md: '2', sm: '2', xs: '2' } },
                                        toSum: 1,
                                        isCoin: 1,
                                    }, {
                                        title: <span style={{ fontWeight: '480' }}>UF: </span>,
                                        label: atual?.nmEStado,
                                        props: { style: { textAlign: 'left', md: '5', sm: '5', xs: '5' } },
                                        toSum: 1,
                                        isCoin: 1,
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

    const gerarTitleTable = () => {
        let tableTitle = [
            {
                label: 'Código',
                props: {}
            },
            {
                label: 'Nome',
                props: {}
            },
            {
                label: 'Sigla',
                props: {}
            },
            {
                label: 'CD IBGE',
                props: {}
            },
            {
                label: 'Estado',
                props: {}
            },
        ]

        return tableTitle;
    }

    React.useEffect(() => {
        setCidade(dataEstado?.data)
        setNrPageAtual(dataEstado?.data?.data?.current_page)
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado])


    const rowsTableArr = gerarTableCidade();
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
                cadastrarCidade && <Cadastrar cadastrarCidade={cadastrarCidade} setCadastrarCidade={setCadastrarCidade} atualizarCidade={atualizarCidade} setAtualizarCadastro={setAtualizarCidade} setAtualizarCidade={setAtualizarCidade} idCidade={consultaChoice} setIdCidade={setCidadeChoice} callback={callBack} />
            }

            {
                atualizarCidade &&
                <Atualizar atualizarCidade={atualizarCidade} atualizarCadastro={atualizarCidade} setAtualizarCidade={setAtualizarCidade} setAtualizarCadastro={setAtualizarCidade} idCidade={consultaChoice} setIdCidade={setCidadeChoice} callback={callBack} />
            }
        </>
    )
}

export default Include;