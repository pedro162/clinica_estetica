import React from 'react'
import estilos from './ContasReceber.module.css'
import useFetch from '../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, ORDEM_SERVICO_ALL_POST } from '../../api/endpoints/geral.js'
import { FORMAT_DATA_PT_BR } from '../../functions/index.js'
import { Col, Row } from 'react-bootstrap';
import FormControlInput from '../FormControl/index.js'
import Table from '../Relatorio/Table/index.js'
import CardMobile from '../Relatorio/CardMobile/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'

import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faPen, faHandHoldingUsd, faList, faFile, faTrash, faHandHolding, faUser, faUserCircle, faEllipsisH, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import { UserContex } from '../../Context/UserContex.js'
import FormContasReceber from './FormContasReceber/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Baixar from './Baixar/index.js'
import Estornar from './Estornar/index.js'
import Card from '../Utils/Card/index.js'
import MovimentacoesFinanceiras from '../MovimentacoesFinanceiras/index.js'
import Visualizar from './Visualizar/index.js'
import { FORMAT_CALC_COD, FORMAT_MONEY } from '../../functions/index.js'


const Include = ({ dataEstado, loadingData, callBack, setMostarFiltros, nadaEncontrado, nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount, ...props }) => {
    const { data, error, request, loading } = useFetch();
    const [estado, setContasReceber] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarContasReceber, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setContasReceberChoice] = React.useState(null);
    const [atualizarContasReceber, setAtualizarContasReceber] = React.useState(false)
    const [baixarContasReceber, setBaixarContasReceber] = React.useState(false)
    const [estornarContasReceber, setEstornarContasReceber] = React.useState(false)
    const [cancelarContasReceber, setCancelarContasReceber] = React.useState(false)
    const [digitarContasReceber, setDigitarContasReceber] = React.useState(false)
    const [cadastrarContasReceber, setCadastrarContasReceber] = React.useState(false)
    const [incicarContasReceber, setIniciarContasReceber] = React.useState(false)
    const [visualizarMovimentacoes, setVisualizarMovimentacoes] = React.useState(false)
    const [visualizarCobrancaReceber, setVisualizarCobrancaReceber] = React.useState(false)
    const [defaultFiltersMovimentacoes, setDefaultFiltersMovimentacoes] = React.useState({})
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const { getToken } = React.useContext(UserContex);

    const handleTotalPages = () => {
        if (Number(dataEstado?.mensagem?.last_page > 0)) {
            setTotalPageCount(dataEstado?.mensagem?.last_page)
        }
    }

    const handleTotalItems = () => {
        if (Number(dataEstado?.mensagem?.to > 0)) {
            setQtdItemsTo(dataEstado?.mensagem?.to)
        }

        if (Number(dataEstado?.mensagem?.total > 0)) {
            setQtdItemsTotal(dataEstado?.mensagem?.total)
        }
    }

    const nextPageRout = () => {
        if (dataEstado?.mensagem?.next_page_url) {
            setNextPage(dataEstado?.mensagem?.next_page_url)
        }
    }

    const previousPageRout = () => {
        if (dataEstado?.mensagem?.prev_page_url) {
            setNextPage(dataEstado?.mensagem?.prev_page_url)
        }
    }

    const firstPageRout = () => {
        if (dataEstado?.mensagem?.first_page_url) {
            setNextPage(dataEstado?.mensagem?.first_page_url)
        }
    }

    const lastPageRout = () => {
        if (dataEstado?.mensagem?.last_page_url) {
            setNextPage(dataEstado?.mensagem?.last_page_url)
        }
    }

    React.useEffect(() => {
        switch (acao) {
            case 'editar':
                if (consultaChoice > 0) {
                    setAtualizarContasReceber(true);
                } else {
                    setAtualizarContasReceber(false);
                }
                break;
            case 'baixar':
                if (consultaChoice > 0) {
                    setBaixarContasReceber(true);
                } else {
                    setBaixarContasReceber(false);
                }
                break;
            case 'estornar':
                if (consultaChoice > 0) {
                    setEstornarContasReceber(true);
                } else {
                    setEstornarContasReceber(false);
                }
                break;
            case 'devolver':
                if (consultaChoice > 0) {
                    setDigitarContasReceber(true);
                } else {
                    setDigitarContasReceber(false);
                }
                break;

            case 'movimentacao_financeira':
                if (consultaChoice > 0) {
                    setVisualizarMovimentacoes(true);
                } else {
                    setVisualizarMovimentacoes(false);
                }
                break;
            case 'visualizar':
                if (consultaChoice > 0) {
                    setVisualizarCobrancaReceber(true);
                } else {
                    setVisualizarCobrancaReceber(false);
                }
                break;
            default://

                break;

        }

    }, [consultaChoice, acao])

    React.useEffect(() => {

        if (cadastrarContasReceber == true) {
            setShowModalCriarConstula(true);
        } else {
            setShowModalCriarConstula(false);
        }


    }, [cadastrarContasReceber])

    const atualizarContasReceberAction = (idContasReceber) => {
        setContasReceberChoice(idContasReceber)
        setAcao('editar')
        setAtualizarContasReceber(true);
    }

    const visualizarContasReceberAction = (idContasReceber) => {
        setContasReceberChoice(idContasReceber)
        setAcao('visualizar')
        setVisualizarCobrancaReceber(true);
    }

    const baixarContasReceberAction = (idContasReceber) => {
        setContasReceberChoice(idContasReceber)
        setAcao('baixar')
        setBaixarContasReceber(true);
    }

    const estornarContasReceberAction = (idContasReceber) => {
        setContasReceberChoice(idContasReceber)
        setAcao('estornar')
        setEstornarContasReceber(true);
    }

    const visualizarMovimentacoesActions = (idContasReceber) => {
        setContasReceberChoice(idContasReceber)
        setAcao('movimentacao_financeira')
        setVisualizarMovimentacoes(true);
    }

    const gerarTableContasReceber = () => {

        let data = [];
        let dataContasReceber = estado

        if (dataContasReceber?.mensagem) {
            dataContasReceber = dataContasReceber?.mensagem;
        }

        if (dataContasReceber?.data) {
            dataContasReceber = dataContasReceber?.data;
        }

        if (dataContasReceber && Array.isArray(dataContasReceber) && dataContasReceber.length > 0) {
            for (let i = 0; !(i == dataContasReceber.length); i++) {
                let atual = dataContasReceber[i];
                if (atual) {
                    let acoesArr = [];
                    let btnEditar = true;
                    let baixar = true;
                    let btnFinalizar = true;
                    let estornar = true;
                    let btnVisualizarMovimentacoes = true;
                    let btnVisualizar = true;
                    let btnCotinuarDigitacao = true;
                    let btnCancelar = true;

                    if (atual?.status != 'pago') {
                        estornar = false;
                    } else if (atual?.status != 'aberto') {
                        estornar = false;
                        btnEditar = false;
                    } else {

                        btnCotinuarDigitacao = false;
                        btnFinalizar = false;
                        baixar = false;
                        acoesArr = [];
                        btnEditar = false;
                    }

                    if (btnEditar) {
                        acoesArr.push({ acao: () => atualizarContasReceberAction(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} })
                    }

                    if (baixar) {
                        acoesArr.push({ acao: () => baixarContasReceberAction(atual.id), label: 'Baixar', propsOption: {}, propsLabel: {} })
                    }

                    if (estornar) {
                        acoesArr.push({ acao: () => estornarContasReceberAction(atual.id), label: 'Estornar', propsOption: {}, propsLabel: {} })
                    }

                    if (btnVisualizarMovimentacoes) {
                        acoesArr.push({ acao: () => visualizarMovimentacoesActions(atual.id), label: 'Movimentações', propsOption: {}, propsLabel: {} })
                    }

                    if (btnVisualizar) {
                        acoesArr.push({ acao: () => visualizarContasReceberAction(atual.id), label: 'Visualizar', propsOption: {}, propsLabel: {} })
                    }

                    if (btnCancelar) {

                    }

                    let line_style = {}
                    if (atual.status == 'devolvido') {
                        line_style.color = 'red';
                    } else if (atual.status == 'pago') {
                        line_style.color = 'green';
                    } else if (atual.status == 'aberto') {
                        //line_style.color = 'green';
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

                                    label: atual.name_filial,
                                    propsRow: {}
                                },
                                {

                                    label: atual.name,
                                    propsRow: {}
                                },
                                {

                                    label: atual.status,
                                    propsRow: {}
                                },
                                {

                                    label: atual.cdCobrancaTipo,
                                    propsRow: {}
                                },
                                {

                                    label: FORMAT_MONEY(atual?.vrBruto),
                                    propsRow: {},
                                    toSum: 1,
                                    isCoin: 1,
                                },
                                {

                                    label: FORMAT_MONEY(atual?.vrLiquido),
                                    propsRow: {},
                                    toSum: 1,
                                    isCoin: 1,
                                },
                                {

                                    label: FORMAT_MONEY(atual?.vrDevolvido),
                                    propsRow: {},
                                    toSum: 1,
                                    isCoin: 1,
                                },
                                {

                                    label: FORMAT_MONEY(atual?.vrPago),
                                    propsRow: {},
                                    toSum: 1,
                                    isCoin: 1,
                                },
                                {

                                    label: FORMAT_MONEY(atual?.vrAberto),
                                    propsRow: {},
                                    toSum: 1,
                                    isCoin: 1,
                                },
                                {

                                    label: FORMAT_DATA_PT_BR(atual?.created_at),
                                    propsRow: {}
                                },
                                {

                                    label: FORMAT_DATA_PT_BR(atual?.dtVencimento),
                                    propsRow: {}
                                },
                                {

                                    label: atual?.descricao,
                                    propsRow: {}
                                },
                                {

                                    label: atual?.dsReferencia,
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
                props: {}
            },
            {
                label: 'Filial',
                props: {
                    style: { minWidth: '255px' }
                }
            },
            {
                label: 'Cliente',
                props: {
                    style: { minWidth: '255px' }
                }
            },
            {
                label: 'Status',
                props: {
                    style: { minWidth: '255px' }
                }
            },
            {
                label: 'Cobrança',
                props: {
                    style: { minWidth: '100px' }
                }
            },
            {
                label: 'Valor bruto',
                props: {
                    style: { minWidth: '150px' }
                }
            },
            {
                label: 'Valor líquido',
                props: {
                    style: { minWidth: '150px' }
                }
            },
            {
                label: 'Valor devolvido',
                props: {
                    style: { minWidth: '150px' }
                }
            },
            {
                label: 'Valor pago',
                props: {
                    style: { minWidth: '150px' }
                }
            },
            {
                label: 'Valor aberto',
                props: {
                    style: { minWidth: '150px' }
                }
            },
            {
                label: 'Criação',
                props: {
                    style: { minWidth: '150px' }
                }
            },
            {
                label: 'Vencimento',
                props: {
                    style: { minWidth: '150px' }
                }
            },
            {
                label: 'Histórico',
                props: {
                    style: { minWidth: '525px' }
                }
            },
            {
                label: 'Referência',
                props: {
                    style: { minWidth: '350px' }
                }
            }
        ]

        return tableTitle;
    }

    const gerarCardContasReceber = () => {

        let data = [];
        let dataContasReceber = estado

        if (dataContasReceber?.mensagem) {
            dataContasReceber = dataContasReceber?.mensagem;
        }

        if (dataContasReceber?.data) {
            dataContasReceber = dataContasReceber?.data;
        }

        if (dataContasReceber && Array.isArray(dataContasReceber) && dataContasReceber.length > 0) {
            for (let i = 0; !(i == dataContasReceber.length); i++) {
                let atual = dataContasReceber[i];

                if (atual) {
                    let acoesArr = [];
                    let btnEditar = true;
                    let baixar = true;
                    let btnFinalizar = true;
                    let estornar = true;
                    let btnVisualizarMovimentacoes = true;
                    let btnVisualizar = true;
                    let btnCotinuarDigitacao = true;
                    let btnCancelar = true;

                    if (atual?.status != 'pago') {
                        estornar = false;
                    } else if (atual?.status != 'aberto') {
                        estornar = false;
                        btnEditar = false;
                    } else {

                        btnCotinuarDigitacao = false;
                        btnFinalizar = false;
                        baixar = false;
                        acoesArr = [];
                        btnEditar = false;
                    }


                    if (btnEditar) {
                        acoesArr.push({ acao: () => atualizarContasReceberAction(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} })
                    }

                    if (baixar) {
                        acoesArr.push({ acao: () => baixarContasReceberAction(atual.id), label: 'Baixar', propsOption: {}, propsLabel: {} })
                    }

                    if (estornar) {
                        acoesArr.push({ acao: () => estornarContasReceberAction(atual.id), label: 'Estornar', propsOption: {}, propsLabel: {} })
                    }

                    if (baixar) {

                    }

                    if (btnVisualizarMovimentacoes) {
                        acoesArr.push({ acao: () => visualizarMovimentacoesActions(atual.id), label: 'Movimentações', propsOption: {}, propsLabel: {} })
                    }

                    if (btnVisualizar) {
                        acoesArr.push({ acao: () => visualizarContasReceberAction(atual.id), label: 'Visualizar', propsOption: {}, propsLabel: {} })
                    }

                    if (btnCancelar) {

                    }

                    data.push(

                        {
                            propsRow: { id: (atual.id) },
                            acoes: [
                                ...acoesArr
                            ],
                            title: <> <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18pt', fontWeight: 'bolder' }} ><span><FontAwesomeIcon size={'lg'} icon={faUserCircle} /> {atual?.name} </span> </div> </>,
                            propsContainerTitulo: { md: '11', sm: '9', xs: '9' },
                            propsContainerButtons: { md: '1', sm: '3', xs: '3' },
                            acoesBottomCard: [
                                { label: '', props: { onClick: () => atualizarContasReceberAction(atual?.id), className: 'btn  btn-sm mx-2 btn-primary', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faPen} /> },
                                { label: '', props: { onClick: () => baixarContasReceberAction(atual?.id), className: 'btn  btn-sm mx-2 botao_success btn-success', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faHandHoldingUsd} /> },
                                { label: '', props: { onClick: () => estornarContasReceberAction(atual?.id), className: 'btn  btn-sm mx-2 btn-dark', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faHandHolding} /> },
                                { label: '', props: { onClick: () => atualizarContasReceberAction(atual?.id), className: 'btn  btn-sm mx-2 btn-secondary', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faList} /> },
                                { label: '', props: { onClick: () => atualizarContasReceberAction(atual?.id), className: 'btn  btn-sm mx-2 btn-info', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faFile} /> },
                                { props: { onClick: () => atualizarContasReceberAction(atual?.id), className: 'btn  btn-sm mx-2 btn-danger', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faTrash} /> },
                            ],
                            celBodyTableArr: [
                                [
                                    {
                                        title: <span style={{ fontWeight: 'bolder' }}>Aberto R$: </span>,
                                        label: FORMAT_MONEY(atual?.vrAberto),
                                        props: { style: { textAlign: 'left' } },
                                        toSum: 1,
                                        isCoin: 1,
                                    },
                                    {
                                        title: <span style={{ fontWeight: 'bolder' }}>Pago R$: </span>,
                                        label: FORMAT_MONEY(atual?.vrPago),
                                        props: { style: { textAlign: 'left' } },
                                        toSum: 1,
                                        isCoin: 1,
                                    },

                                ],
                                [
                                    {
                                        title: <span style={{ fontWeight: 'bolder' }}>Cobrança: </span>,
                                        label: atual.cdCobrancaTipo,
                                        props: { style: { textAlign: 'left' } },
                                    },
                                    {
                                        title: <span style={{ fontWeight: 'bolder' }}>Vencimento: </span>,
                                        label: FORMAT_DATA_PT_BR(atual.dtVencimento),
                                        props: { style: { textAlign: 'left' } },
                                    },
                                ],
                                [
                                    {
                                        title: <span style={{ fontWeight: 'bolder' }}>Status: </span>,
                                        label: atual.status,
                                        props: { style: { textAlign: 'center' } },
                                    },
                                ]


                            ]
                        }

                    )

                }

            }
        }

        return data;
    }

    const gerarListMobileContasReceber = () => {

        let data = [];
        let dataContasReceber = estado

        if (dataContasReceber?.mensagem) {
            dataContasReceber = dataContasReceber?.mensagem;
        }

        if (dataContasReceber?.data) {
            dataContasReceber = dataContasReceber?.data;
        }

        if (dataContasReceber && Array.isArray(dataContasReceber) && dataContasReceber.length > 0) {
            for (let i = 0; !(i == dataContasReceber.length); i++) {
                let atual = dataContasReceber[i];
                if (atual && atual.id > 0) {
                    let acoesArr = [];
                    let btnEditar = true;
                    let baixar = true;
                    let btnFinalizar = true;
                    let estornar = true;
                    let btnVisualizarMovimentacoes = true;
                    let btnVisualizar = true;
                    let btnCotinuarDigitacao = true;
                    let btnCancelar = true;

                    if (atual?.status != 'pago') {
                        estornar = false;
                    } else if (atual?.status != 'aberto') {
                        estornar = false;
                        btnEditar = false;
                    } else {

                        btnCotinuarDigitacao = false;
                        btnFinalizar = false;
                        baixar = false;
                        acoesArr = [];
                        btnEditar = false;
                    }


                    if (btnEditar) {
                        acoesArr.push({ acao: () => atualizarContasReceberAction(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} })
                    }

                    if (baixar) {
                        acoesArr.push({ acao: () => baixarContasReceberAction(atual.id), label: 'Baixar', propsOption: {}, propsLabel: {} })
                    }

                    if (estornar) {
                        acoesArr.push({ acao: () => estornarContasReceberAction(atual.id), label: 'Estornar', propsOption: {}, propsLabel: {} })
                    }

                    if (baixar) {

                    }

                    if (btnVisualizarMovimentacoes) {
                        acoesArr.push({ acao: () => { visualizarMovimentacoesActions(atual.id); setDefaultFiltersMovimentacoes({ ...atual, referencia_id: atual?.id, referencia: 'contas_receber' }) }, label: 'Movimentações', propsOption: {}, propsLabel: {} })
                    }

                    if (btnVisualizar) {
                        acoesArr.push({ acao: () => visualizarContasReceberAction(atual.id), label: 'Visualizar', propsOption: {}, propsLabel: {} })
                    }

                    if (btnCancelar) {

                    }

                    let line_style = {}

                    if (atual.status == 'devolvido') {
                        line_style.color = 'red';
                    } else if (atual.status == 'pago') {
                        line_style.color = 'green';
                    } else if (atual.status == 'aberto') {

                    }

                    data.push(

                        {
                            propsRow: { id: (atual.id), titleRow: atual.id + ' - ' + atual?.name, style: { ...line_style }, mainIcon: faChartLine },
                            acoes: [
                                ...acoesArr
                            ],
                            title: <> <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18pt', fontWeight: 'bolder' }} ><span><FontAwesomeIcon size={'lg'} icon={faUserCircle} /> {atual?.name} </span> </div> </>,
                            propsContainerTitulo: { md: '11', sm: '9', xs: '9' },
                            propsContainerButtons: { md: '1', sm: '3', xs: '3' },
                            acoesBottomCard: [
                                { label: '', props: { onClick: () => atualizarContasReceberAction(atual?.id), className: 'btn  btn-sm mx-2 btn-primary', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faPen} /> },
                                { label: '', props: { onClick: () => baixarContasReceberAction(atual?.id), className: 'btn  btn-sm mx-2 botao_success btn-success', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faHandHoldingUsd} /> },
                                { label: '', props: { onClick: () => estornarContasReceberAction(atual?.id), className: 'btn  btn-sm mx-2 btn-dark', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faHandHolding} /> },
                                { label: '', props: { onClick: () => atualizarContasReceberAction(atual?.id), className: 'btn  btn-sm mx-2 btn-secondary', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faList} /> },
                                { label: '', props: { onClick: () => atualizarContasReceberAction(atual?.id), className: 'btn  btn-sm mx-2 btn-info', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faFile} /> },
                                { props: { onClick: () => atualizarContasReceberAction(atual?.id), className: 'btn  btn-sm mx-2 btn-danger', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faTrash} /> },
                            ],
                            celBodyTableArr: [
                                [
                                    {
                                        title: <span style={{ fontWeight: '480' }}>Cód. pessoa: </span>,
                                        label: atual?.pessoa_id,
                                        props: { style: { textAlign: 'left', md: '1', sm: '1', xs: '1' } },
                                        toSum: 1,
                                        isCoin: 1,
                                    }, {
                                        title: <span style={{ fontWeight: '480' }}>Aberto R$: </span>,
                                        label: FORMAT_MONEY(atual?.vrAberto),
                                        props: { style: { textAlign: 'left', md: '4', sm: '4', xs: '4' } },
                                        toSum: 1,
                                        isCoin: 1,
                                    },
                                    {
                                        title: <span style={{ fontWeight: '480' }}>Status </span>,
                                        label: atual?.status,
                                        props: { style: { textAlign: 'left', fontWeight: 'bolder', md: '3', sm: '3', xs: '3' } },
                                        toSum: 1,
                                        isCoin: 1,
                                    },
                                    {
                                        title: <span style={{ fontWeight: '480' }}>Vencimento </span>,
                                        label: FORMAT_DATA_PT_BR(atual.dtVencimento),
                                        props: { style: { textAlign: 'left', md: '4', sm: '4', xs: '4' } },
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

    React.useEffect(() => {
        setContasReceber(dataEstado)
        setNrPageAtual(dataEstado?.mensagem?.current_page)
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado])

    const rowsTableArr = gerarTableContasReceber();
    const titulosTableArr = gerarTitleTable();

    return (
        <>
            <Row >
                <Col xs="12" sm="12" md="12" className={'mobile_card_report py-4'} style={{ backgroundColor: '#FFF' }}>



                    <ListMobile
                        titulosTableArr={null}
                        rowsTableArr={gerarListMobileContasReceber()}
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
                        botoesHeader={[/* {acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> } */]}
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
                cadastrarContasReceber && <Cadastrar cadastrarContasReceber={cadastrarContasReceber} setCadastrarContasReceber={setCadastrarContasReceber} atualizarContasReceber={atualizarContasReceber} setAtualizarContasReceber={setAtualizarContasReceber} idContasReceber={consultaChoice} setIdContasReceber={setContasReceberChoice} callback={callBack} />
            }

            {
                atualizarContasReceber &&
                <Atualizar atualizarContasReceber={atualizarContasReceber} setAtualizarContasReceber={setAtualizarContasReceber} idContasReceber={consultaChoice} setIdContasReceber={setContasReceberChoice} callback={callBack} />
            }

            {
                baixarContasReceber &&
                <Baixar baixarContasReceber={baixarContasReceber} setBaixarContasReceber={setBaixarContasReceber} idContasReceber={consultaChoice} setIdContasReceber={setContasReceberChoice} callback={callBack} />
            }

            {
                estornarContasReceber &&
                <Estornar estornarContasReceber={estornarContasReceber} setEstornarContasReceber={setEstornarContasReceber} idContasReceber={consultaChoice} setIdContasReceber={setContasReceberChoice} callback={callBack} />
            }

            {
                visualizarCobrancaReceber &&
                <Visualizar estornarContasReceber={estornarContasReceber} setEstornarContasReceber={setEstornarContasReceber} idContasReceber={consultaChoice} setIdContasReceber={setContasReceberChoice} callback={callBack} />
            }



            {
                visualizarMovimentacoes && defaultFiltersMovimentacoes &&
                <Modal noBtnCancelar={false} noBtnConcluir={true} handleConcluir={() => null} title={'Contas a receber'} size="lg" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={consultaChoice} showHide={() => { setVisualizarMovimentacoes(false); }}>

                    <MovimentacoesFinanceiras defaultFilters={defaultFiltersMovimentacoes} visualizarMovimentacoes={visualizarMovimentacoes} setVisualizarMovimentacoes={setVisualizarMovimentacoes} setAtualizarContasReceber={setAtualizarContasReceber} setAtualizarContasReceber={setAtualizarContasReceber} idReferencia={consultaChoice} referencia={'contas_receber'} idCobrancaReceber={consultaChoice} setIdContasReceber={setContasReceberChoice} callback={callBack} />

                </Modal>
            }

        </>
    )
}

export default Include;