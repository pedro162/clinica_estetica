import React from 'react';
import estilos from './Clientes.module.css'
import useFetch from '../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CLIENTES_ALL_POST, RECORD_NUMBER_PER_REQUEST } from '../../api/endpoints/geral.js'
import { Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'
import Load from '../Utils/Load/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Consulta from '../Consulta/index.js'
import CadastrarConsulta from '../Consulta/Cadastrar/index.js'
import Ficha from './Ficha/index.js'
import CadastrarFicha from '../ClientesFichas/Cadastrar/index.js'
import { UserContex } from '../../Context/UserContex.js'
import FormCliente from './FormCliente/index.js'
import Home from '../Home/index.js'
import SendWhatsApp from '../CanaisNotificacao/WhatsApp/index.js';
import SendEmail from '../CanaisNotificacao/Email/index.js';

const Include = ({ dataEstado, callBakSelectedItem, ignoreTableActions, loadingData, nadaEncontrado, callBack, setMostarFiltros, idClienteCriado, nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount, ...props }) => {

    const { data, error, request, loading } = useFetch();
    const [clientes, setClientes] = React.useState([])
    const [clientChoice, setClienteChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)
    const [cadastrarCliente, setCadastrarCliente] = React.useState(false)
    const [marcarConsulta, setMarcarConsulta] = React.useState(false)
    const [visualizarConsultas, setVisualizarConsultas] = React.useState(false)
    const [ficha, setFicha] = React.useState(false)
    const [cadastrarFicha, setCadastrarFicha] = React.useState(false)
    const [dataGrupo, setDataGrupo] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [defaultFiltersConsulta, setDefaultFiltersConsulta] = React.useState({})
    const [defaultFiltersAgendaCalendario, setDefaultFiltersAgendaCalendario] = React.useState({})
    const [visualizarCalendarioAgenda, setVisualizarCalendarioAgenda] = React.useState(false)
    const [defaultFiltersClientes, setDefaultFiltersClientes] = React.useState({})
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)
    const [novaMensagemWhatsApp, setNovaMensagemWhatsApp] = React.useState(false)
    const [novaMensagemEmail, setNovaMensagemEmail] = React.useState(false)
    const { getToken } = React.useContext(UserContex);

    const handleTotalPages = () => {
        if (Number(dataEstado?.data?.data?.last_page > 0)) {
            setTotalPageCount(dataEstado?.data?.data?.last_page)
        }
    }

    const handleTotalItems = () => {
        if (Number(clientes?.data?.to > 0)) {
            setQtdItemsTo(clientes?.data?.to)
        }

        if (Number(clientes?.data?.total > 0)) {
            setQtdItemsTotal(clientes?.data?.total)
        }
    }

    const nextPageRout = () => {
        if (clientes?.data?.next_page_url) {
            setNextPage(clientes?.data?.next_page_url)
        }
    }

    const previousPageRout = () => {
        if (clientes?.data?.prev_page_url) {
            setNextPage(clientes?.data?.prev_page_url)
        }
    }

    const firstPageRout = () => {
        if (clientes?.data?.first_page_url) {
            setNextPage(clientes?.data?.first_page_url)
        }
    }

    const lastPageRout = () => {
        if (clientes?.data?.last_page_url) {
            setNextPage(clientes?.data?.last_page_url)
        }
    }

    const gerarTableClientes = () => {

        let data = [];
        let dataClientes = clientes

        if (dataClientes?.mensagem) {
            dataClientes = dataClientes?.mensagem;
        }

        if (dataClientes?.registro) {
            dataClientes = dataClientes?.registro;
        }

        if (dataClientes?.data) {
            dataClientes = dataClientes?.data;
        }

        if (dataClientes?.data) {
            dataClientes = dataClientes?.data;
        }

        if (dataClientes && Array.isArray(dataClientes) && dataClientes.length > 0) {
            for (let i = 0; !(i == dataClientes.length); i++) {
                let atual = dataClientes[i];
                if (atual) {

                    data.push(

                        {
                            propsRow: { id: (atual.id), onClick: () => callBakSelectedItem && callBakSelectedItem(atual.id) },
                            acoes: [
                                { acao: () => atualizarCliente(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} },
                                { acao: () => novoAtendimento(atual.id), label: 'Novo atendimento', propsOption: {}, propsLabel: {} },
                                { acao: () => mensagemWhatsapp(atual.id), label: 'Enviar msg WhtasApp', propsOption: {}, propsLabel: {} },
                                { acao: () => mensagemEmail(atual.id), label: 'Enviar e-mail', propsOption: {}, propsLabel: {} },
                                { acao: () => consultaTodosAtendimentos(atual.id), label: 'Histórico de atendimentos', propsOption: {}, propsLabel: {} },
                                { acao: () => cadastrarFichaAtendimento(atual.id), label: 'Nova ficha', propsOption: {}, propsLabel: {} },
                                { acao: () => fichaAtendimento(atual.id), label: 'Visualizar ficha', propsOption: {}, propsLabel: {} },
                                { acao: () => consultaAgendaCalendario(atual.id), label: 'Calendário da agenda', propsOption: {}, propsLabel: {} },
                                //{acao:()=>alert('Histórico de atentimentos: '+(atual.id)), label:'Histórico de atendimentos', propsOption:{}, propsLabel:{}},
                                //{acao:()=>alert('Central do cliente: '+(atual.id)), label:'Central do cliente', propsOption:{}, propsLabel:{}},mensagemWhatsapp
                            ],
                            celBodyTableArr: [
                                {

                                    label: atual.id,
                                    propsRow: {}
                                },
                                {

                                    label: atual.documento,
                                    propsRow: {}
                                },
                                {

                                    label: atual.name,
                                    propsRow: {}
                                },
                                {

                                    label: atual.name_opcional,
                                    propsRow: {}
                                },
                                {

                                    label: atual.email,
                                    propsRow: {}
                                },
                                {

                                    label: atual.sexo,
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

    const gerarTitleTable = () => {
        let tableTitle = [
            {
                label: 'Código',
                props: {}
            },
            {
                label: 'Documento',
                props: {}
            },
            {
                label: 'Nome',
                props: {}
            },
            {
                label: 'Sobremone',
                props: {}
            },
            {
                label: 'Email',
                props: {}
            },
            {
                label: 'Sexo',
                props: {}
            },
        ]

        return tableTitle;
    }


    const gerarListMobileRelatorio = () => {

        let data = [];
        let dataClientes = clientes

        if (dataClientes?.mensagem) {
            dataClientes = dataClientes?.mensagem;
        }

        if (dataClientes?.registro) {
            dataClientes = dataClientes?.registro;
        }

        if (dataClientes?.data) {
            dataClientes = dataClientes?.data;
        }

        if (dataClientes?.data) {
            dataClientes = dataClientes?.data;
        }

        if (dataClientes && Array.isArray(dataClientes) && dataClientes.length > 0) {
            for (let i = 0; !(i == dataClientes.length); i++) {
                let atual = dataClientes[i];
                if (atual) {
                    let acoesArr = [
                        { acao: () => atualizarCliente(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} },//
                        { acao: () => novoAtendimento(atual.id), label: 'Novo atendimento', propsOption: {}, propsLabel: {} },
                        { acao: () => mensagemWhatsapp(atual.id), label: 'Enviar msg WhtasApp', propsOption: {}, propsLabel: {} },
                        { acao: () => mensagemEmail(atual.id), label: 'Enviar e-mail', propsOption: {}, propsLabel: {} },
                        { acao: () => consultaTodosAtendimentos(atual.id), label: 'Histórico de atendimentos', propsOption: {}, propsLabel: {} },
                        { acao: () => cadastrarFichaAtendimento(atual.id), label: 'Nova ficha', propsOption: {}, propsLabel: {} },
                        { acao: () => fichaAtendimento(atual.id), label: 'Visualizar ficha', propsOption: {}, propsLabel: {} },
                        { acao: () => consultaAgendaCalendario(atual.id), label: 'Calendário da agenda', propsOption: {}, propsLabel: {} },
                    ];
                    let btnEditar = true;
                    let btnIniciarProcedimento = true;
                    let btnFinalizar = true;
                    let btnVisualizarFinanceiro = true;
                    let btnVisualizar = true;
                    let btnCotinuarDigitacao = true;
                    let btnCancelar = true;

                    let line_style = {}
                    data.push(

                        {
                            propsRow: { id: (atual.id), titleRow: atual?.name, onClick: () => callBakSelectedItem && callBakSelectedItem(atual.id) },
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
                                        title: <span style={{ fontWeight: '480' }}>Cpf: </span>,
                                        label: atual?.documento,
                                        props: { style: { textAlign: 'left' } },
                                        toSum: 1,
                                        isCoin: 1,
                                    },
                                    {
                                        title: <span style={{ fontWeight: '480' }}>Contato: </span>,
                                        label: '(99)99999-9999',
                                        props: { style: { textAlign: 'left' } },
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
        switch (acao) {
            case 'editar':
                if (clientChoice > 0) {
                    setAtualizarCadastro(true);
                } else {
                    setAtualizarCadastro(false);
                }
                break;
            case 'consultar':
                if (clientChoice > 0) {
                    setMarcarConsulta(true);
                } else {
                    setMarcarConsulta(false);
                }
                break;
            case 'consultas':
                if (clientChoice > 0) {
                    setVisualizarConsultas(true);
                } else {
                    setVisualizarConsultas(false);
                }
                break;
            case 'ficha':
                if (clientChoice > 0) {
                    setFicha(true);
                } else {
                    setFicha(false);
                }
                break;
            case 'cadastrar_ficha':
                if (clientChoice > 0) {
                    setCadastrarFicha(true);
                } else {
                    setCadastrarFicha(false);
                }
                break;
            case 'agenda_calendario':
                if (clientChoice > 0) {
                    setVisualizarCalendarioAgenda(true);
                } else {
                    setVisualizarCalendarioAgenda(false);
                }
                break;
            case 'mensagem_whatsapp':
                if (clientChoice > 0) {
                    setNovaMensagemWhatsApp(true);
                } else {
                    setNovaMensagemWhatsApp(false);
                }
                break;
            case 'mensagem_email':
                if (clientChoice > 0) {
                    setNovaMensagemEmail(true);
                } else {
                    setNovaMensagemEmail(false);
                }
                break;
            default:
                setAtualizarCadastro(false);
                setMarcarConsulta(false);
                setFicha(false);
                break;

        }

    }, [clientChoice, acao])


    const atualizarCliente = (idCliente) => {
        setClienteChoice(idCliente)
        setAcao('editar')
        setAtualizarCadastro(true);
    }

    const novoAtendimento = (idCliente) => {
        setClienteChoice(idCliente)
        setAcao('consultar')
        setMarcarConsulta(true);
    }

    const consultaTodosAtendimentos = (idCliente) => {
        setClienteChoice(idCliente)
        setAcao('consultas')
        setVisualizarConsultas(true);
    }

    const fichaAtendimento = (idCliente) => {
        setClienteChoice(idCliente)
        setAcao('ficha')
        setFicha(true);
    }

    const cadastrarFichaAtendimento = (idCliente) => {
        setClienteChoice(idCliente)
        setAcao('cadastrar_ficha')
        setCadastrarFicha(true);
    }

    const consultaAgendaCalendario = (idCliente) => {
        setClienteChoice(idCliente)
        setAcao('agenda_calendario')
        setVisualizarCalendarioAgenda(true);
    }
    const mensagemWhatsapp = (idCliente) => {
        setClienteChoice(idCliente)
        setAcao('mensagem_whatsapp')
        setNovaMensagemWhatsApp(true);
    }

    const mensagemEmail = (idCliente) => {
        setClienteChoice(idCliente)
        setAcao('mensagem_email')
        setNovaMensagemEmail(true);
    }

    React.useEffect(() => {
        setClientes(dataEstado?.data)
        setNrPageAtual(dataEstado?.data?.data?.current_page)
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado])

    const rowsTableArr = gerarTableClientes();
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
                        nadaEncontrado={nadaEncontrado}
                        botoesHeader={[]} nextPage={nextPage}
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
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro} idCliente={clientChoice} setIdcliente={setClienteChoice} callback={callBack} />
            }

            {
                marcarConsulta &&
                <CadastrarConsulta cadastrarConsulta={marcarConsulta} setCadastrarConsulta={setMarcarConsulta} atualizarConsulta={null} setAtualizarConsulta={() => null} idConsulta={clientChoice} setIdConsulta={setClienteChoice} callback={() => { setAcao(null); callBack(); setMarcarConsulta(false) }} />
            }

            {
                visualizarConsultas &&
                <Modal noBtnCancelar={false} noBtnConcluir={true} handleConcluir={() => null} title={'Atendimentos'} size="lg" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={visualizarConsultas} showHide={() => { setVisualizarConsultas(false); setAcao(null) }}>

                    <Consulta defaultFilters={defaultFiltersConsulta} visualizarConsultas={visualizarConsultas} setVisualizarConsultas={setVisualizarConsultas} idReferencia={null} referencia={''} idCliente={null} setIdcliente={null} callback={() => { setAcao(null); callBack(); setVisualizarConsultas(false) }} />

                </Modal>
            }


            {
                visualizarCalendarioAgenda &&
                <Modal noBtnCancelar={false} noBtnConcluir={true} handleConcluir={() => null} title={'Calendário da agenda'} size="lg" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={visualizarCalendarioAgenda} showHide={() => { setVisualizarCalendarioAgenda(false); setAcao(null); setClienteChoice(null) }}>

                    <Home defaultFilters={defaultFiltersAgendaCalendario} visualizarCalendarioAgenda={visualizarCalendarioAgenda} setVisualizarCalendarioAgenda={setVisualizarCalendarioAgenda} setAtualizarCadastro={setAtualizarCadastro} idReferencia={null} referencia={null} clientChoice={clientChoice} setClienteChoice={setClienteChoice} callback={callBack} />

                </Modal>
            }

            {
                ficha &&
                <Ficha ficha={ficha} setFicha={setFicha} idCliente={clientChoice} setIdcliente={setClienteChoice} callback={callBack} />
            }

            {
                cadastrarFicha &&
                <CadastrarFicha cadastrarClientesFichas={cadastrarFicha} setCadastrarFicha={atualizarCadastro} setCadastrarClientesFichas={setCadastrarFicha} atualizarClientesFichas={setCadastrarFicha} setAtualizarClientesFichas={setAtualizarCadastro} setIdClientesFichas={setClienteChoice} callback={callBack} />
            }


            {
                novaMensagemWhatsApp &&
                <SendWhatsApp noUseModal={false} idPessoa={clientChoice} setIdPessoa={setClienteChoice} callback={callBack} />
            }

            {
                novaMensagemEmail &&
                <SendEmail noUseModal={false} idPessoa={clientChoice} setIdPessoa={setClienteChoice} callback={callBack} />
            }

        </>

    )
}

export default Include;