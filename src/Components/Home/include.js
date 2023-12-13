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

const Include = ({dataEstado, loadingData, callBack, setMostarFiltros, nadaEncontrado, idAgendaCriada, ...props})=>{
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
    const [tpView, setTpView] = React.useState('semana')//mes//semana 
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
                    let acoesArr = [];
                    

                    let line_style = {}
                    
                    
                    //'remarcado','finalizado','cancelado','pendente'
                    data.push(

                        {
                            propsRow:{id:(atual.id), style:{...line_style}},
                            acoes:[
                                ...acoesArr
                            ],
                            celBodyTableArr:[
                                {

                                    label:atual.id,
                                    propsRow:{}
                                },
                                {

                                    label:atual.is_faturado == 'yes' ? 'Sim' : 'Não',
                                    propsRow:{}
                                },
                                {

                                    label:FORMAT_DATA_PT_BR(atual.td_faturamento),
                                    propsRow:{}
                                },
                                {

                                    label:FORMAT_DATA_PT_BR(atual.td_cancelamento),
                                    propsRow:{}
                                },
                                {

                                    label:FORMAT_DATA_PT_BR(atual.td_conclusao),
                                    propsRow:{}
                                },
                                {

                                    label:FORMAT_DATA_PT_BR(atual.created_at),
                                    propsRow:{}
                                },
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
        let dataAgenda = estado.mensagem
        if(dataAgenda && Array.isArray(dataAgenda) && dataAgenda.length > 0){
            for(let i=0; !(i == dataAgenda.length); i++){
                let atual = dataAgenda[i];
                if(atual){
                    let acoesArr = [];
                    
                    let line_style = {}
                    

                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow:atual?.name, style:{...line_style}, mainIcon:faFileAlt},
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
                                        title:<span style={{fontWeight:'480'}}>Criado em: </span>,
                                        label:FORMAT_DATA_PT_BR(atual.created_at),
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
                label:'Faturado em',
                props:{}
            },
        ]

        return tableTitle;
    }
   //name_profissional

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
                                <CalendarioSimples/>
                            )
                        :
                            (
                                <HorarioSimples
                                    titulosTableArr={titulosTableArr}
                                    rowsTableArr={rowsTableArr}
                                    loading={loading}

                                />
                            )

                    }

                   
                </Col>

                <Col  xs="12" sm="12" md="12"  className={'default_card_report'}>
                    {
                        tpView == 'mes'
                        ?
                            (
                                <Calendario/>
                            )
                        :
                            (
                                <Horario
                                    titulosTableArr={titulosTableArr}
                                    rowsTableArr={rowsTableArr}
                                    loading={loading}

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