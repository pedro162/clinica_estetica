import React from 'react'
import estilos from './CategoriaEvento.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ALL_POST} from '../../api/endpoints/geral.js'
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
import FormCategoriaEvento from './FormCategoriaEvento/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'
import { Button } from 'bootstrap';
import reactDom from 'react-dom';
//

const Include = ({dataEstado, loadingData, callBack, setMostarFiltros, nadaEncontrado, idOrdemCriada, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setCategoriaEvento] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarCategoriaEvento, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setCategoriaEventoChoice] = React.useState(null);
    const [atualizarCategoriaEvento, setAtualizarCategoriaEvento] = React.useState(false)   
    const [cancelarCategoriaEvento, setCancelarCategoriaEvento] = React.useState(false)   
    const [digitarCategoriaEvento, setDigitarCategoriaEvento] = React.useState(false)    
    const [cadastrarCategoriaEvento, setCadastrarCategoriaEvento] = React.useState(false)
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [visualizarContasReceber, setVisualizarContasReceber] = React.useState(false)  
    const [atualizarCabecalhoCategoriaEvento, setAtualizarCabecalhoCategoriaEvento] = React.useState(false)  
    const [finalizarCategoriaEvento, setFinalizarCategoriaEvento] = React.useState(false)  
    const [incicarCategoriaEvento, setIniciarCategoriaEvento] = React.useState(false)  
    const [excluirCadastro, setExcluirCadastro] = React.useState(false)    
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [defaultFiltersCobReceber, setDefaultFiltersCobReceber] = React.useState({})


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
        props:{onClick:()=>requestAllCategoriaEventos(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setIniciarCategoriaEvento(true), className:'btn btn-sm mx-2 btn-secondary'}
    }
    ];


    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarCategoriaEvento(true);
                }else{
                    setAtualizarCategoriaEvento(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarCategoriaEvento(true);
                }else{
                    setCancelarCategoriaEvento(false);
                }
                break;
            case 'digitar':
                if(consultaChoice > 0){
                    setDigitarCategoriaEvento(true);
                }else{
                    setDigitarCategoriaEvento(false);
                }
                break;
            case 'visualizar':
                if(consultaChoice > 0){
                    setDigitarCategoriaEvento(true);
                }else{
                    setDigitarCategoriaEvento(false);
                }
                break;
            case 'iniciar_procedimento':
                if(consultaChoice > 0){
                    setDigitarCategoriaEvento(true);
                }else{
                    setDigitarCategoriaEvento(false);
                }
                break;
            
            case 'finalizar_procedimento':
                if(consultaChoice > 0){
                    setDigitarCategoriaEvento(true);
                }else{
                    setDigitarCategoriaEvento(false);
                }
                break;        
            case 'contas_receber':
                if(consultaChoice > 0){
                    setVisualizarContasReceber(true);
                }else{
                    setVisualizarContasReceber(false);
                }
                break;     
            case 'editar_cabecalho':

                if(consultaChoice > 0){
                    setAtualizarCabecalhoCategoriaEvento(true);
                }else{
                    setAtualizarCabecalhoCategoriaEvento(false);
                }

                break;                 
            case 'finalizar':

                if(consultaChoice > 0){
                    setFinalizarCategoriaEvento(true);
                }else{
                    setFinalizarCategoriaEvento(false);
                }

                break;
            default:
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarCategoriaEvento == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarCategoriaEvento])

    const atualizarCategoriaEventoAction = (idCategoriaEvento)=>{
        setCategoriaEventoChoice(idCategoriaEvento)
        setAcao('editar')
        setAtualizarCategoriaEvento(true);
    }

    const atualizarCabecalhoCategoriaEventoAction = (idCategoriaEvento)=>{
        setCategoriaEventoChoice(idCategoriaEvento)
        setAcao('editar_cabecalho')
        setAtualizarCabecalhoCategoriaEvento(true);
        //AtualizarCabecalhoForm
    }

    

    const visualizarContasReceberAction = (idCategoriaEvento)=>{
        setCategoriaEventoChoice(idCategoriaEvento)
        setAcao('contas_receber')
        setVisualizarContasReceber(true);
    }

    const digitarCategoriaEventoAction = (idCategoriaEvento)=>{
        setCategoriaEventoChoice(idCategoriaEvento)
        setAcao('digitar')
        setAtualizarCategoriaEvento(true);
    }

    const cancelarCategoriaEventoAction = (idCategoriaEvento)=>{
        setCategoriaEventoChoice(idCategoriaEvento)
        setAcao('cancelar')
        setCancelarCategoriaEvento(true);
    }
    //cancelarCategoriaEvento, setCancelarCategoriaEvento
    const novaCategoriaEvento = (idCategoriaEvento)=>{
        setCategoriaEventoChoice(idCategoriaEvento)
        setAcao('consultar')
        setAtualizarCategoriaEvento(true);
    }

    const iniciarCategoriaEvento = (idCategoriaEvento)=>{
        setIniciarCategoriaEvento(idCategoriaEvento)
        setAcao('iniciar')
        setIniciarCategoriaEvento(true);
    }

    const finalizarCategoriaEventoAction = (idCategoriaEvento)=>{
        setCategoriaEventoChoice(idCategoriaEvento)
        setAcao('finalizar')
        setFinalizarCategoriaEvento(true);
    }


    //finalizarCategoriaEvento, setFinalizarCategoriaEvento
    

    React.useEffect(()=>{
        /**
         * consultaChoice, setCategoriaEventoChoice] = React.useState(()=>{
        return idOrdemCriada;
    }
         */
        console.log('Ordem criada..............')
        console.log(idOrdemCriada)
        console.log('Ordem criada..............')
        idOrdemCriada && idOrdemCriada > 0 && atualizarCategoriaEventoAction(idOrdemCriada)

    }, [idOrdemCriada])

    const gerarTableCategoriaEvento = ()=>{
       
        let data = [];
        let dataCategoriaEvento = estado.mensagem
        if(dataCategoriaEvento && Array.isArray(dataCategoriaEvento) && dataCategoriaEvento.length > 0){
            for(let i=0; !(i == dataCategoriaEvento.length); i++){
                let atual = dataCategoriaEvento[i];
                if(atual){
                    let acoesArr = [];
                    
                    let line_style = {}
                    if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
                    } 
                    
                    //'remarcado','finalizado','cancelado','pendente'
                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                {acao:()=>{setCategoriaEventoChoice(atual.id);setAtualizarCadastro(true);}, label:'Editar', propsOption:{}, propsLabel:{}},
                                {acao:()=>{setCategoriaEventoChoice(atual.id);setExcluirCadastro(true);}, label:'Excluir', propsOption:{}, propsLabel:{}},
                                {acao:()=>alert('Histórico de atentimentos: '+(atual.id)), label:'Histórico de atendimentos', propsOption:{}, propsLabel:{}},
                                {acao:()=>alert('Central do cliente: '+(atual.id)), label:'Central do cliente', propsOption:{}, propsLabel:{}},
                            ],
                            celBodyTableArr:[
                                {

                                    label:atual.id,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name,
                                    propsRow:{}
                                },
                                {

                                    label:atual.sigla,
                                    propsRow:{}
                                },
                                {

                                    label:atual.cdCiade,
                                    propsRow:{}
                                },
                                {

                                    label:atual.nmEStado,
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
        let dataCategoriaEvento = estado.mensagem
        if(dataCategoriaEvento && Array.isArray(dataCategoriaEvento) && dataCategoriaEvento.length > 0){
            for(let i=0; !(i == dataCategoriaEvento.length); i++){
                let atual = dataCategoriaEvento[i];
                if(atual){
                    let acoesArr = [];
                    
                    let line_style = {}
                    if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
                    } 
                    
                    //'remarcado','finalizado','cancelado','pendente'
                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                {acao:()=>{setCategoriaEventoChoice(atual.id);setAtualizarCadastro(true);}, label:'Editar', propsOption:{}, propsLabel:{}},
                                {acao:()=>{setCategoriaEventoChoice(atual.id);setExcluirCadastro(true);}, label:'Excluir', propsOption:{}, propsLabel:{}},
                                {acao:()=>alert('Histórico de atentimentos: '+(atual.id)), label:'Histórico de atendimentos', propsOption:{}, propsLabel:{}},
                                {acao:()=>alert('Central do cliente: '+(atual.id)), label:'Central do cliente', propsOption:{}, propsLabel:{}},
                            ],
                            celBodyTableArr:[
                                {

                                    label:atual.id,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name,
                                    propsRow:{}
                                },
                                {

                                    label:atual.sigla,
                                    propsRow:{}
                                },
                                {

                                    label:atual.cdCiade,
                                    propsRow:{}
                                },
                                {

                                    label:atual.nmEStado,
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

    const gerarTitleTable = ()=>{
        let tableTitle = [
            {
                label:'Código',
                props:{}
            },
            {
                label:'Descrição',
                props:{}
            }
        ]

        return tableTitle;
    }
   //name_profissional

    //------------

    const requestAllCategoriaEventos = async() =>{
       
        const {url, options} = ORDEM_SERVICO_ALL_POST({'name_servico':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All serviços here')
        console.log({'name_servico':pessoa})
        console.log(json)
        if(json){
            setCategoriaEvento(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllCategoriaEventosEffect = async() =>{
       
           await requestAllCategoriaEventos();

            
        }

       /// requestAllCategoriaEventosEffect();

        
    }, [])

    React.useEffect(()=>{
        setCategoriaEvento(dataEstado)
    }, [dataEstado])
    

    const rowsTableArr = gerarTableCategoriaEvento();    
    const titulosTableArr = gerarTitleTable();

    return(
        <>
            <Row>
                <Col  xs="12" sm="12" md="12" className={'mobile_card_report py-4'}  style={{backgroundColor:'#FFF',}}>

                   
                    
                    <ListMobile
                        titulosTableArr={null}
                        rowsTableArr={gerarListMobileRelatorio()}
                        loading={loadingData}
                        nadaEncontrado={nadaEncontrado}
                        botoesHeader={[{acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> }]}
                    />

                    {
                    /*
                    <CardMobile
                        titulosTableArr={null}
                        rowsTableArr={gerarCardContasReceber()}
                        loading={loadingData}
                        botoesHeader={[{acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> }]}
                    />
                    */
                    }
                </Col>

                <Col  xs="12" sm="12" md="12"  className={'default_card_report'}>
                    <Table
                        titulosTableArr={titulosTableArr}
                        rowsTableArr={rowsTableArr}
                        loading={loadingData}
                        nadaEncontrado={nadaEncontrado}
                        botoesHeader={[{acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> }]}

                    />
                </Col>
            </Row>

            
            {
                atualizarCategoriaEvento &&
                <Atualizar atualizarCategoriaEvento={atualizarCategoriaEvento} setAtualizarCategoriaEvento={setAtualizarCategoriaEvento}  idCategoriaEvento={consultaChoice} setIdCategoriaEvento={setCategoriaEventoChoice} callback={callBack} />
            }


        
        </>
    )
}

export default Include;