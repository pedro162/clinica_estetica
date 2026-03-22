import React from 'react';
import estilos from './Vendedor.module.css'
import useFetch from '../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CONSULTA_ALL_POST } from '../../api/endpoints/geral.js'
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
import FormVendedor from './FormVendedor/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Excluir from './Excluir/index.js'
import Visualizar from './Visualizar/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'


const Include = ({ dataEstado, loadingData, nadaEncontrado, callBakSelectedItem, ignoreTableActions, callBack, setMostarFiltros, idVendedorCriada, nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount, requestAllVendedors, ...props }) => {

    const { data, error, request, loading } = useFetch();
    const [estado, setVendedor] = React.useState([])
    const [showModalCriarVendedor, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setVendedorChoice] = React.useState(null);
    const [atualizarVendedor, setAtualizarVendedor] = React.useState(false)
    const [cancelarVendedor, setExcluirVendedor] = React.useState(false)
    const [visualizarVendedor, setVisualizarVendedor] = React.useState(false)
    const [cadastrarVendedor, setCadastrarVendedor] = React.useState(false)
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
                    setAtualizarVendedor(true);
                } else {
                    setAtualizarVendedor(false);
                }
                break;
            case 'excluir':
                if (consultaChoice > 0) {
                    setExcluirVendedor(true);
                } else {
                    setExcluirVendedor(false);
                }
                break;
            case 'visualizar':
                if (consultaChoice > 0) {
                    setVisualizarVendedor(true);
                } else {
                    setVisualizarVendedor(false);
                }
                break;
            default://

                break;

        }

    }, [consultaChoice, acao])

    React.useEffect(() => {

        if (cadastrarVendedor == true) {
            setShowModalCriarConstula(true);
        } else {
            setShowModalCriarConstula(false);
        }

    }, [cadastrarVendedor])

    const atualizarVendedorAction = (idVendedor) => {
        setVendedorChoice(idVendedor)
        setAcao('editar')
        setAtualizarVendedor(true);
    }

    const cancelarVendedorAction = (idVendedor) => {
        setVendedorChoice(idVendedor)
        setAcao('excluir')
        setExcluirVendedor(true);
    }

    const visualizarVendedorAction = (idVendedor) => {
        setVendedorChoice(idVendedor)
        setAcao('visualizar')
        setVisualizarVendedor(true);
    }

    const gerarTableVendedor = () => {

        let data = [];
        let dataVendedor = estado

        if (dataVendedor?.mensagem) {
            dataVendedor = dataVendedor?.mensagem;
        }

        if (dataVendedor?.registro) {
            dataVendedor = dataVendedor?.registro;
        }

        if (dataVendedor?.data) {
            dataVendedor = dataVendedor?.data;
        }

        if (dataVendedor?.data) {
            dataVendedor = dataVendedor?.data;
        }

        if (dataVendedor && Array.isArray(dataVendedor) && dataVendedor.length > 0) {
            for (let i = 0; !(i == dataVendedor.length); i++) {
                let atual = dataVendedor[i];
                if (atual) {
                    let line_style = {}
                    let acoesArr = [];
                    let btnExcluir = true;
                    let btnEditar = true;
                    let btnExames = true;
                    let btnDiagnostico = true;
                    let btnFicha = true;
                    let btnDetalhes = true;


                    if (type == 'external') {
                        btnExcluir = false;
                        btnEditar = false;

                    }

                    if (btnEditar) {
                        acoesArr.push({ acao: () => atualizarVendedorAction(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} })
                    }

                    if (btnExcluir) {
                        acoesArr.push({ acao: () => cancelarVendedorAction(atual.id), label: 'Excluir', propsOption: {}, propsLabel: {} })
                    }

                    if (btnDetalhes) {
                        acoesArr.push({ acao: () => visualizarVendedorAction(atual.id), label: 'Visualizar', propsOption: {}, propsLabel: {} })
                    }

                    data.push(

                        {
                            propsRow: { id: (atual.id), style: { ...line_style }, onClick: () => callBakSelectedItem && callBakSelectedItem(atual.id) },
                            acoes: [
                                ...acoesArr
                            ],
                            celBodyTableArr: [
                                {

                                    label: atual.id,
                                    propsRow: {}
                                },
                                {

                                    label: atual?.pessoa?.name,
                                    propsRow: {}
                                },
                                {

                                    label: atual?.filial_id,
                                    propsRow: {}
                                },
                                {

                                    label: FORMAT_MONEY(atual?.vrTarifa, 2, ',', '.'),
                                    propsRow: {}
                                },
                                {

                                    label: FORMAT_MONEY(atual?.vrDesconto, 2, ',', '.'),
                                    propsRow: {}
                                },
                                {

                                    label: atual?.vrPorcentagemDesconto,
                                    propsRow: {}
                                },
                                {

                                    label: atual?.nrRemessaAtual,
                                    propsRow: {}
                                },
                                {

                                    label: atual?.nrNossoNumero,
                                    propsRow: {}
                                },
                                {

                                    label: atual?.qtdDiasProtesto,
                                    propsRow: {}
                                },
                                {

                                    label: atual?.tpLocalAtualizacaoBoleto,
                                    propsRow: {}
                                },
                                {

                                    label: atual?.isAssumeDuplicata === 'yes' ? 'Sim' : 'Não',
                                    propsRow: {}
                                },
                                {

                                    label: atual?.isPadrao === 'yes' ? 'Sim' : 'Não',
                                    propsRow: {}
                                },
                                {

                                    label: atual?.isLiberado === 'yes' ? 'Sim' : 'Não',
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
                label: 'Filial',
                props: { style: { minWidth: '225px' } }
            },
            {
                label: 'Valor tarifa',
                props: { style: { minWidth: '225px' } }
            },
            {
                label: 'Valor desconto',
                props: { style: { minWidth: '225px' } }
            },
            {
                label: 'Percentual desconto',
                props: { style: { minWidth: '225px' } }
            },
            {
                label: 'Nº remessa atual',
                props: { style: { minWidth: '325px' } }
            },
            {
                label: 'Nosso número atual',
                props: { style: { minWidth: '325px' } }
            },
            {
                label: 'Dias para protesto',
                props: { style: { minWidth: '325px' } }
            },
            {
                label: 'Atualização de boleto',
                props: { style: { minWidth: '325px' } }
            },
            {
                label: 'Assume duplicata',
                props: { style: { minWidth: '325px' } }
            },
            {
                label: 'Operador padrão',
                props: { style: { minWidth: '325px' } }
            },
            {
                label: 'Liberado para uso',
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
        let dataVendedor = estado

        if (dataVendedor?.mensagem) {
            dataVendedor = dataVendedor?.mensagem;
        }

        if (dataVendedor?.registro) {
            dataVendedor = dataVendedor?.registro;
        }

        if (dataVendedor?.data) {
            dataVendedor = dataVendedor?.data;
        }

        if (dataVendedor?.data) {
            dataVendedor = dataVendedor?.data;
        }

        if (dataVendedor && Array.isArray(dataVendedor) && dataVendedor.length > 0) {
            for (let i = 0; !(i == dataVendedor.length); i++) {
                let atual = dataVendedor[i];
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
                        acoesArr.push({ acao: () => atualizarVendedorAction(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} })
                    }

                    if (btnExcluir) {
                        acoesArr.push({ acao: () => cancelarVendedorAction(atual.id), label: 'Excluir', propsOption: {}, propsLabel: {} })
                    }

                    if (btnDetalhes) {
                        acoesArr.push({ acao: () => visualizarVendedorAction(atual.id), label: 'Visualizar', propsOption: {}, propsLabel: {} })
                    }

                    data.push(

                        {
                            propsRow: { id: (atual.id), titleRow: atual?.id + ' - ' + atual?.pessoa?.name, style: { ...line_style }, onClick: () => callBakSelectedItem && callBakSelectedItem(atual.id) },
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
                                        label: atual?.isPadrao === 'yes' ? 'Sim' : 'Não',
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
        setVendedor(dataEstado?.data)
        setNrPageAtual(dataEstado?.data?.data?.current_page)
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado])

    const rowsTableArr = gerarTableVendedor();
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
                        ignoreTableActions={ignoreTableActions}
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
                        ignoreTableActions={ignoreTableActions}
                    />
                </Col>
            </Row>
            {
                cadastrarVendedor && <Cadastrar cadastrarVendedor={cadastrarVendedor} setCadastrarVendedor={setCadastrarVendedor} atualizarVendedor={atualizarVendedor} setAtualizarVendedor={setAtualizarVendedor} idVendedor={consultaChoice} setIdVendedor={setVendedorChoice} callback={requestAllVendedors} />
            }

            {
                atualizarVendedor &&
                <Atualizar atualizarVendedor={atualizarVendedor} setAtualizarVendedor={setAtualizarVendedor} idVendedor={consultaChoice} setIdVendedor={setVendedorChoice} callback={requestAllVendedors} />
            }

            {
                cancelarVendedor &&
                <Excluir cancelarVendedor={cancelarVendedor} setExcluirVendedor={setExcluirVendedor} idVendedor={consultaChoice} setIdVendedor={setVendedorChoice} callback={requestAllVendedors} />
            }

            {
                visualizarVendedor &&
                <Visualizar visualizarVendedor={visualizarVendedor} setVisualizarVendedor={setVisualizarVendedor} idVendedor={consultaChoice} setIdVendedor={setVendedorChoice} callback={requestAllVendedors} />
            }

        </>
    )
}

export default Include;