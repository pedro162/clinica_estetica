import React from 'react'
import estilos from './Home.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ALL_POST, HOME_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faUserCircle, faHandHoldingUsd,faHandHolding, faTasks, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import Cadastrar from './Cadastrar/index.js'
import ContasReceber from '../ContasReceber/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'
import { Button } from 'bootstrap';
import reactDom from 'react-dom';
import Calendario  from '../Utils/Calendario/index.js'
import Horario  from '../Utils/Calendario/Horario.js'
import CalendarioSimples  from '../Utils/Calendario/CalendarioSimples.js'
import HorarioSimples  from '../Utils/Calendario/HorarioSimples.js'
import Atualizar from './Atualizar/index.js'
//

const Include = ({dataEstado, loadingData, callBack, setMostarFiltros, tpViewChoice, nadaEncontrado, idAgendaCriada, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setAgenda] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [home, setHome] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarAgenda, setShowModalCriarConstula] = React.useState(false)
    const [agendaChoice, setAgendaChoice] = React.useState(null);
    const [atualizarAgenda, setAtualizarAgenda] = React.useState(false)   
    const [cancelarAgenda, setCancelarAgenda] = React.useState(false)   
    const [digitarAgenda, setDigitarAgenda] = React.useState(false)    
    const [cadastrarAgenda, setCadastrarAgenda] = React.useState(false)
    const [visualizarContasReceber, setVisualizarContasReceber] = React.useState(false)  
    const [atualizarCabecalhoAgenda, setAtualizarCabecalhoAgenda] = React.useState(false)  
    const [finalizarAgenda, setFinalizarAgenda] = React.useState(false)  
    const [incicarAgenda, setIniciarAgenda] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [defaultFiltersCobReceber, setDefaultFiltersCobReceber] = React.useState({})
    const [tpView, setTpView] = React.useState(tpViewChoice)//mes//semana 
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)
    const [cadastrarCliente, setCadastrarCliente] = React.useState(false)    


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const setNamePessoa = ({target})=>{
        
        setPessoa(target.value)
    }

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Contato',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name_atendido':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Status',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'status':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Tipo',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'tipo':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. inicio',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",'dt_inico':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. fim',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",'dt_fim':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
    ]

    const acoesBottomCard=[{
        label:'Pesquisar',
        icon:<FontAwesomeIcon icon={faSearch} />,
        props:{onClick:()=>requestAllAgendas(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setIniciarAgenda(true), className:'btn btn-sm mx-2 btn-secondary'}
    }
    ];


    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(agendaChoice > 0){
                    setAtualizarAgenda(true);
                }else{
                    setAtualizarAgenda(false);
                }
                break;
            case 'cancelar':
                if(agendaChoice > 0){
                    setCancelarAgenda(true);
                }else{
                    setCancelarAgenda(false);
                }
                break;
            case 'digitar':
                if(agendaChoice > 0){
                    setDigitarAgenda(true);
                }else{
                    setDigitarAgenda(false);
                }
                break;
            case 'visualizar':
                if(agendaChoice > 0){
                    setDigitarAgenda(true);
                }else{
                    setDigitarAgenda(false);
                }
                break;
            case 'iniciar_procedimento':
                if(agendaChoice > 0){
                    setDigitarAgenda(true);
                }else{
                    setDigitarAgenda(false);
                }
                break;
            
            case 'finalizar_procedimento':
                if(agendaChoice > 0){
                    setDigitarAgenda(true);
                }else{
                    setDigitarAgenda(false);
                }
                break;        
            case 'contas_receber':
                if(agendaChoice > 0){
                    setVisualizarContasReceber(true);
                }else{
                    setVisualizarContasReceber(false);
                }
                break;     
            case 'editar_cabecalho':

                if(agendaChoice > 0){
                    setAtualizarCabecalhoAgenda(true);
                }else{
                    setAtualizarCabecalhoAgenda(false);
                }

                break;                 
            case 'finalizar':

                if(agendaChoice > 0){
                    setFinalizarAgenda(true);
                }else{
                    setFinalizarAgenda(false);
                }

                break;
            default:
                
                break;

        }
        
    }, [agendaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarAgenda == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarAgenda])

    const atualizarAgendaAction = (idAgenda)=>{
        setAgendaChoice(idAgenda)
        setAcao('editar')
        setAtualizarAgenda(true);
    }

    const atualizarCabecalhoAgendaAction = (idAgenda)=>{
        setAgendaChoice(idAgenda)
        setAcao('editar_cabecalho')
        setAtualizarCabecalhoAgenda(true);
        //AtualizarCabecalhoForm
    }

    

    const visualizarContasReceberAction = (idAgenda)=>{
        setAgendaChoice(idAgenda)
        setAcao('contas_receber')
        setVisualizarContasReceber(true);
    }

    const digitarAgendaAction = (idAgenda)=>{
        setAgendaChoice(idAgenda)
        setAcao('digitar')
        setAtualizarAgenda(true);
    }

    const cancelarAgendaAction = (idAgenda)=>{
        setAgendaChoice(idAgenda)
        setAcao('cancelar')
        setCancelarAgenda(true);
    }
    //cancelarAgenda, setCancelarAgenda
    const novaAgenda = (idAgenda)=>{
        setAgendaChoice(idAgenda)
        setAcao('consultar')
        setAtualizarAgenda(true);
    }

    const iniciarAgenda = (idAgenda)=>{
        setIniciarAgenda(idAgenda)
        setAcao('iniciar')
        setIniciarAgenda(true);
    }

    const finalizarAgendaAction = (idAgenda)=>{
        setAgendaChoice(idAgenda)
        setAcao('finalizar')
        setFinalizarAgenda(true);
    }


    //finalizarAgenda, setFinalizarAgenda
    

    React.useEffect(()=>{
        /**
         * agendaChoice, setAgendaChoice] = React.useState(()=>{
        return idAgendaCriada;
    }
         */
        console.log('Ordem criada..............')
        console.log(idAgendaCriada)
        console.log('Ordem criada..............')
        idAgendaCriada && idAgendaCriada > 0 && atualizarAgendaAction(idAgendaCriada)

    }, [idAgendaCriada])

    const gerarTableAgenda = ()=>{
       
        let data = [];
        let dataAgenda = estado.mensagem
        if(dataAgenda && Array.isArray(dataAgenda) && dataAgenda.length > 0){
            for(let i=0; !(i == dataAgenda.length); i++){
                let atual = dataAgenda[i];
                if(atual){


                    data.push(

                        {
                            id:atual?.id,
                            propsRow:{id:(atual.id)},
                            data_format:atual?.data_format,
                            hora:atual?.hora,
                            mainLabel:atual?.descricao,
                            acoes:[
                                {acao:()=>setAgendaChoice(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
                                //{acao:()=>alert('Agenda qui: '+(atual.id)), label:'Agenda', propsOption:{}, propsLabel:{}},
                                //{acao:()=>alert('Histórico de atentimentos: '+(atual.id)), label:'Histórico de atendimentos', propsOption:{}, propsLabel:{}},
                                //{acao:()=>alert('Central do cliente: '+(atual.id)), label:'Central do cliente', propsOption:{}, propsLabel:{}},
                            ],
                            dados:atual,
                            celBodyTableArr:[
                                {

                                    label:atual?.id,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.name_pessoa,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.status,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.descricao,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.data_format,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.hora,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.name_pessoa_cancelamento,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.dt_cancelamento,
                                    propsRow:{}
                                }
                            ]
                        }

                    )

                }

            }
        }

        return data;
    }

    const gerarListMobileRelatorio = ()=>{
       
        let data = [];
        let dataOrdemServico = estado.mensagem
        if(dataOrdemServico && Array.isArray(dataOrdemServico) && dataOrdemServico.length > 0){
            for(let i=0; !(i == dataOrdemServico.length); i++){
                let atual = dataOrdemServico[i];
                if(atual){
                    let acoesArr = [
                        {acao:()=>setAgendaChoice(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
                        //{acao:()=>alert('Agenda qui: '+(atual.id)), label:'Agenda', propsOption:{}, propsLabel:{}},
                        //{acao:()=>alert('Histórico de atentimentos: '+(atual.id)), label:'Histórico de atendimentos', propsOption:{}, propsLabel:{}},
                        //{acao:()=>alert('Central do cliente: '+(atual.id)), label:'Central do cliente', propsOption:{}, propsLabel:{}},
                    ];
                    let btnEditar                   = true;
                    let btnIniciarProcedimento      = true;
                    let btnFinalizar                = true;
                    let btnVisualizarFinanceiro     = true;
                    let btnVisualizar               = true;
                    let btnCotinuarDigitacao        = true;
                    let btnCancelar                 = true;



                    let line_style = {}
                    if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
                    } 

                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {
                            id:atual?.id,
                            propsRow:{id:(atual.id)},
                            data_format:atual?.data_format,
                            hora:atual?.hora,
                            mainLabel:atual?.descricao,
                            dados:atual,
                            propsRow:{id:(atual.id), titleRow:atual?.name_pessoa, style:{...line_style}, mainIcon:faFileAlt},
                            acoes:[
                                ...acoesArr
                            ],
                            title:<> <div style={{display:'flex', justifyContent:'space-between',fontSize:'18pt', fontWeight:'bolder'}} ><span><FontAwesomeIcon size={'lg'} icon={faUserCircle}/> {atual?.name} </span> </div> </>,
                            propsContainerTitulo:{md:'11', sm:'9', xs:'9'},
                            propsContainerButtons:{md:'1', sm:'3', xs:'3'},
                            acoesBottomCard:[
                              
                            ],
                            celBodyTableArr:[
                                [
                                    {
                                        title:<span style={{fontWeight:'480'}}>Status: </span>,
                                        label:atual?.status,
                                        props:{style:{textAlign:'left', fontWeight:'bolder'}},
                                        toSum:1,
                                        isCoin:1,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Data / hora: </span>,
                                        label:atual?.data_format +" "+atual?.hora,
                                        props:{style:{textAlign:'left'}},
                                        toSum:1,
                                        isCoin:1,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Observação: </span>,
                                        label:atual?.descricao,
                                        props:{style:{textAlign:'left'}},
                                        toSum:1,
                                        isCoin:1,
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

    const gerarTitleTable = ()=>{
        let tableTitle = [
            {
                label:'Código',
                props:{}
            },
            {
                label:'Pessoa',
                props:{}
            },
            {
                label:'Status',
                props:{}
            },
            {
                label:'Histórico',
                props:{}
            },
            {
                label:'Data',
                props:{}
            },
            {
                label:'Hora',
                props:{}
            },
            {
                label:'Cancelado por',
                props:{}
            },
            {
                label:'Cancelado em',
                props:{}
            },
        ]

        return tableTitle;
    }

    //------------

    const requestAllAgendas = async() =>{
       
        const {url, options} = ORDEM_SERVICO_ALL_POST({'name_servico':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All serviços here')
        console.log({'name_servico':pessoa})
        console.log(json)
        if(json){
            setAgenda(json)
        }

            
    }


    React.useEffect(()=>{

        const requestAllAgendasEffect = async() =>{
       
           await requestAllAgendas();

            
        }

       /// requestAllAgendasEffect();

        
    }, [])

    React.useEffect(()=>{
        setAgenda(dataEstado)
    }, [dataEstado])

    React.useEffect(()=>{
        setTpView(tpViewChoice)
    }, [tpViewChoice])
    

    const rowsTableArr = gerarTableAgenda();    
    const titulosTableArr = gerarTitleTable();


    if( loadingData){
        return  (
            <Row>
                <Col  xs="12" sm="12" md="12" className={'py-4'}  style={{backgroundColor:'#FFF',}}>
                     <Load/>
                </Col>
            </Row>

                        
        )
    }

    return(
        <>
            <Row>
                <Col  xs="12" sm="12" md="12" className={'mobile_card_report py-4'}  style={{backgroundColor:'#FFF',}}>

                   
                    
                    {
                        tpView == 'mes'
                        ?
                            (
                                <CalendarioSimples

                                    titulosTableArr={titulosTableArr}
                                    rowsTableArr={rowsTableArr}
                                    loading={loading}
                                    nadaEncontrado={nadaEncontrado}
                                />
                            )
                        :
                            (
                                <HorarioSimples
                                    titulosTableArr={titulosTableArr}
                                    rowsTableArr={rowsTableArr}
                                    loading={loading}
                                    nadaEncontrado={nadaEncontrado}

                                />
                            )

                    }

                   
                </Col>

                <Col  xs="12" sm="12" md="12"  className={'default_card_report'}>
                    {
                        tpView == 'mes'
                        ?
                            (
                                <Calendario
                                    titulosTableArr={titulosTableArr}
                                    rowsTableArr={rowsTableArr}
                                    loading={loading}
                                    nadaEncontrado={nadaEncontrado}
                                    botoesHeader={[{acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> }]}

                                />
                            )
                        :
                            (
                                <Horario
                                    titulosTableArr={titulosTableArr}
                                    rowsTableArr={rowsTableArr}
                                    loading={loading}
                                    nadaEncontrado={nadaEncontrado}
                                    botoesHeader={[{acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> }]}

                                />
                            )

                    }
                </Col>
            </Row>

            {
                cadastrarCliente && <Cadastrar cadastrarCliente={cadastrarCliente} setCadastrarCliente={setCadastrarCliente} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idCliente={agendaChoice} setIdcliente={setAgendaChoice} callback={requestAllAgendas} />
            }
            
            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idCliente={agendaChoice} setIdcliente={setAgendaChoice} callback={requestAllAgendas} />
            }
        
        </>
    )
}

export default Include;