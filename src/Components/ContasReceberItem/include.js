import React from 'react'
import estilos from './ContasReceberItem.module.css'
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
import FormContasReceberItem from './FormContasReceberItem/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Baixar from './Baixar/index.js'
import Estornar from './Estornar/index.js'
import Card from '../Utils/Card/index.js'
import MovimentacoesFinanceiras from '../MovimentacoesFinanceiras/index.js'
import Visualizar from './Visualizar/index.js'
import { FORMAT_CALC_COD, FORMAT_MONEY } from '../../functions/index.js'


const Include = ({ dataEstado, loadingData, callBack, setMostarFiltros, nadaEncontrado, nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount, ...props }) => {
    const [estado, setContasReceberItem] = React.useState([])
    const [showModalCriarContasReceberItem, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setContasReceberItemChoice] = React.useState(null);
    const [atualizarContasReceberItem, setAtualizarContasReceberItem] = React.useState(false)
    const [baixarContasReceberItem, setBaixarContasReceberItem] = React.useState(false)
    const [estornarContasReceberItem, setEstornarContasReceberItem] = React.useState(false)
    const [cancelarContasReceberItem, setCancelarContasReceberItem] = React.useState(false)
    const [digitarContasReceberItem, setDigitarContasReceberItem] = React.useState(false)
    const [cadastrarContasReceberItem, setCadastrarContasReceberItem] = React.useState(false)
    const [incicarContasReceberItem, setIniciarContasReceberItem] = React.useState(false)
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
        if (Number(estado?.data?.last_page) >= 0) {
            setTotalPageCount(estado?.data?.last_page)
        }
    }

    const handleTotalItems = () => {
        if (Number(estado?.data?.to) >= 0) {
            setQtdItemsTo(estado?.data?.to)
        }

        if (Number(estado?.data?.total ) >= 0) {
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
                    setAtualizarContasReceberItem(true);
                } else {
                    setAtualizarContasReceberItem(false);
                }
                break;
            case 'baixar':
                if (consultaChoice > 0) {
                    setBaixarContasReceberItem(true);
                } else {
                    setBaixarContasReceberItem(false);
                }
                break;
            case 'estornar':
                if (consultaChoice > 0) {
                    setEstornarContasReceberItem(true);
                } else {
                    setEstornarContasReceberItem(false);
                }
                break;
            case 'devolver':
                if (consultaChoice > 0) {
                    setDigitarContasReceberItem(true);
                } else {
                    setDigitarContasReceberItem(false);
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

        if (cadastrarContasReceberItem == true) {
            setShowModalCriarConstula(true);
        } else {
            setShowModalCriarConstula(false);
        }
    }, [cadastrarContasReceberItem])

    const atualizarContasReceberItemAction = (idContasReceberItem) => {
        setContasReceberItemChoice(idContasReceberItem)
        setAcao('editar')
        setAtualizarContasReceberItem(true);
    }

    const visualizarContasReceberItemAction = (idContasReceberItem) => {
        setContasReceberItemChoice(idContasReceberItem)
        setAcao('visualizar')
        setVisualizarCobrancaReceber(true);
    }

    const baixarContasReceberItemAction = (idContasReceberItem) => {
        setContasReceberItemChoice(idContasReceberItem)
        setAcao('baixar')
        setBaixarContasReceberItem(true);
    }

    const estornarContasReceberItemAction = (idContasReceberItem) => {
        setContasReceberItemChoice(idContasReceberItem)
        setAcao('estornar')
        setEstornarContasReceberItem(true);
    }

    const visualizarMovimentacoesActions = (idContasReceberItem) => {
        setContasReceberItemChoice(idContasReceberItem)
        setAcao('movimentacao_financeira')
        setVisualizarMovimentacoes(true);
    }

    const gerarTableContasReceberItem = () => {

        let data = [];
        let dataContasReceberItem = estado

        if (dataContasReceberItem?.mensagem) {
            dataContasReceberItem = dataContasReceberItem?.mensagem;
        }

        if (dataContasReceberItem?.registro) {
            dataContasReceberItem = dataContasReceberItem?.registro;
        }

        if (dataContasReceberItem?.data) {
            dataContasReceberItem = dataContasReceberItem?.data;
        }

        if (dataContasReceberItem?.data) {
            dataContasReceberItem = dataContasReceberItem?.data;
        }

        if (dataContasReceberItem && Array.isArray(dataContasReceberItem) && dataContasReceberItem.length > 0) {
            for (let i = 0; !(i == dataContasReceberItem.length); i++) {
                let atual = dataContasReceberItem[i];
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
                        acoesArr.push({ acao: () => atualizarContasReceberItemAction(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} })
                    }

                    if (baixar) {
                        acoesArr.push({ acao: () => baixarContasReceberItemAction(atual.id), label: 'Baixar', propsOption: {}, propsLabel: {} })
                    }

                    if (estornar) {
                        acoesArr.push({ acao: () => estornarContasReceberItemAction(atual.id), label: 'Estornar', propsOption: {}, propsLabel: {} })
                    }

                    if (btnVisualizarMovimentacoes) {
                        acoesArr.push({ acao: () => visualizarMovimentacoesActions(atual.id), label: 'Movimentações', propsOption: {}, propsLabel: {} })
                    }

                    if (btnVisualizar) {
                        acoesArr.push({ acao: () => visualizarContasReceberItemAction(atual.id), label: 'Visualizar', propsOption: {}, propsLabel: {} })
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

                                    label: atual?.conta_receber?.filial?.pessoa?.name,
                                    propsRow: {}
                                },
                                {

                                    label: atual?.conta_receber?.pessoa?.name,
                                    propsRow: {}
                                },
                                {

                                    label: atual.status,
                                    propsRow: {}
                                },
                                {

                                    label: atual?.forma_pagamento?.cdCobrancaTipo,
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

                                    label: FORMAT_DATA_PT_BR(atual?.dtBaixa),
                                    propsRow: {}
                                },
                                {

                                    label: atual?.conta_receber_id,
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
                label: 'Baixa',
                props: {
                    style: { minWidth: '150px' }
                }
            },
            {
                label: 'Conta receber',
                props: {
                    style: { minWidth: '150px' }
                }
            },
        ]

        return tableTitle;
    }

    const gerarListMobileContasReceberItem = () => {

        let data = [];
        let dataContasReceberItem = estado

        if (dataContasReceberItem?.mensagem) {
            dataContasReceberItem = dataContasReceberItem?.mensagem;
        }

        if (dataContasReceberItem?.registro) {
            dataContasReceberItem = dataContasReceberItem?.registro;
        }

        if (dataContasReceberItem?.data) {
            dataContasReceberItem = dataContasReceberItem?.data;
        }

        if (dataContasReceberItem?.data) {
            dataContasReceberItem = dataContasReceberItem?.data;
        }

        if (dataContasReceberItem && Array.isArray(dataContasReceberItem) && dataContasReceberItem.length > 0) {
            for (let i = 0; !(i == dataContasReceberItem.length); i++) {
                let atual = dataContasReceberItem[i];
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
                        acoesArr.push({ acao: () => atualizarContasReceberItemAction(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} })
                    }

                    if (baixar) {
                        acoesArr.push({ acao: () => baixarContasReceberItemAction(atual.id), label: 'Baixar', propsOption: {}, propsLabel: {} })
                    }

                    if (estornar) {
                        acoesArr.push({ acao: () => estornarContasReceberItemAction(atual.id), label: 'Estornar', propsOption: {}, propsLabel: {} })
                    }

                    if (btnVisualizarMovimentacoes) {
                        acoesArr.push({ acao: () => { visualizarMovimentacoesActions(atual.id); setDefaultFiltersMovimentacoes({ ...atual, sub_referencia_id: atual?.id, sub_referencia: 'conta_receber_items' }) }, label: 'Movimentações', propsOption: {}, propsLabel: {} })
                    }

                    if (btnVisualizar) {
                        acoesArr.push({ acao: () => visualizarContasReceberItemAction(atual.id), label: 'Visualizar', propsOption: {}, propsLabel: {} })
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
                            propsRow: { id: (atual.id), titleRow: atual.id + ' - ' + atual?.conta_receber?.pessoa?.name, style: { ...line_style }, mainIcon: faChartLine },
                            acoes: [
                                ...acoesArr
                            ],
                            title: <> <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18pt', fontWeight: 'bolder' }} ><span><FontAwesomeIcon size={'lg'} icon={faUserCircle} /> {atual?.name} </span> </div> </>,
                            propsContainerTitulo: { md: '11', sm: '9', xs: '9' },
                            propsContainerButtons: { md: '1', sm: '3', xs: '3' },
                            acoesBottomCard: [
                                { label: '', props: { onClick: () => atualizarContasReceberItemAction(atual?.id), className: 'btn  btn-sm mx-2 btn-primary', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faPen} /> },
                                { label: '', props: { onClick: () => baixarContasReceberItemAction(atual?.id), className: 'btn  btn-sm mx-2 botao_success btn-success', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faHandHoldingUsd} /> },
                                { label: '', props: { onClick: () => estornarContasReceberItemAction(atual?.id), className: 'btn  btn-sm mx-2 btn-dark', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faHandHolding} /> },
                                { label: '', props: { onClick: () => atualizarContasReceberItemAction(atual?.id), className: 'btn  btn-sm mx-2 btn-secondary', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faList} /> },
                                { label: '', props: { onClick: () => atualizarContasReceberItemAction(atual?.id), className: 'btn  btn-sm mx-2 btn-info', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faFile} /> },
                                { props: { onClick: () => atualizarContasReceberItemAction(atual?.id), className: 'btn  btn-sm mx-2 btn-danger', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faTrash} /> },
                            ],
                            celBodyTableArr: [
                                [
                                    {
                                        title: <span style={{ fontWeight: '480' }}>Cód. pessoa: </span>,
                                        label: atual?.conta_receber?.pessoa?.id,
                                        props: { style: { textAlign: 'left', md: '1', sm: '1', xs: '1' } },
                                        toSum: 1,
                                        isCoin: 1,
                                    }, {
                                        title: <span style={{ fontWeight: '480' }}>Valor R$: </span>,
                                        label: FORMAT_MONEY(atual?.vrLiquido),
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
                                        title: <span style={{ fontWeight: '480' }}>Pagamento </span>,
                                        label: FORMAT_DATA_PT_BR(atual.dtPagamento),
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
        
        setContasReceberItem(dataEstado?.data)
        setNrPageAtual(dataEstado?.data?.data?.current_page)
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado])

    const rowsTableArr = gerarTableContasReceberItem();
    const titulosTableArr = gerarTitleTable();

    return (
        <>
            <Row >
                <Col xs="12" sm="12" md="12" className={'mobile_card_report py-4'} style={{ backgroundColor: '#FFF' }}>
                    <ListMobile
                        titulosTableArr={null}
                        rowsTableArr={gerarListMobileContasReceberItem()}
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
                cadastrarContasReceberItem && <Cadastrar cadastrarContasReceberItem={cadastrarContasReceberItem} setCadastrarContasReceberItem={setCadastrarContasReceberItem} atualizarContasReceberItem={atualizarContasReceberItem} setAtualizarContasReceberItem={setAtualizarContasReceberItem} idContasReceberItem={consultaChoice} setIdContasReceberItem={setContasReceberItemChoice} callback={callBack} />
            }

            {
                atualizarContasReceberItem &&
                <Atualizar atualizarContasReceberItem={atualizarContasReceberItem} setAtualizarContasReceberItem={setAtualizarContasReceberItem} idContasReceberItem={consultaChoice} setIdContasReceberItem={setContasReceberItemChoice} callback={callBack} />
            }

            {
                baixarContasReceberItem &&
                <Baixar baixarContasReceberItem={baixarContasReceberItem} setBaixarContasReceberItem={setBaixarContasReceberItem} idContasReceberItem={consultaChoice} setIdContasReceberItem={setContasReceberItemChoice} callback={callBack} />
            }

            {
                estornarContasReceberItem &&
                <Estornar estornarContasReceberItem={estornarContasReceberItem} setEstornarContasReceberItem={setEstornarContasReceberItem} idContasReceberItem={consultaChoice} setIdContasReceberItem={setContasReceberItemChoice} callback={callBack} />
            }

            {
                visualizarCobrancaReceber &&
                <Visualizar visualizarCobrancaReceber={visualizarCobrancaReceber} setVisualizarCobrancaReceber={setVisualizarCobrancaReceber} idContasReceberItem={consultaChoice} setIdContasReceberItem={setContasReceberItemChoice} callback={callBack} />
            }



            {
                visualizarMovimentacoes && defaultFiltersMovimentacoes &&
                <Modal noBtnCancelar={false} noBtnConcluir={true} handleConcluir={() => null} title={'Contas a receber'} size="lg" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={consultaChoice} showHide={() => { setVisualizarMovimentacoes(false); }}>

                    <MovimentacoesFinanceiras defaultFilters={defaultFiltersMovimentacoes} visualizarMovimentacoes={visualizarMovimentacoes} setVisualizarMovimentacoes={setVisualizarMovimentacoes} setAtualizarContasReceberItem={setAtualizarContasReceberItem} idSubReferencia={consultaChoice} subReferencia={'conta_receber_items'} idCobrancaReceber={consultaChoice} setIdContasReceberItem={setContasReceberItemChoice} callback={callBack} />

                </Modal>
            }

        </>
    )
}

export default Include;