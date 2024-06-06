import React from 'react'
import estilos from './OrdemServico.module.css'
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
import FormOrdemServico from './FormOrdemServico/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Iniciar from './Iniciar/index.js'
import Cancelar from './Cancelar/index.js'
import AtualizarCabecalho from './AtualizarCabecalho/index.js'
import ContasReceber from '../ContasReceber/index.js'
import Finalizar from './Finalizar/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'
import { Button } from 'bootstrap';
import reactDom from 'react-dom';
//

const Include = ({dataEstado, loadingData, callBack, setMostarFiltros, nadaEncontrado, idOrdemCriada, nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setOrdemServico] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarOrdemServico, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setOrdemServicoChoice] = React.useState(null);
    const [atualizarOrdemServico, setAtualizarOrdemServico] = React.useState(false)   
    const [cancelarOrdemServico, setCancelarOrdemServico] = React.useState(false)   
    const [digitarOrdemServico, setDigitarOrdemServico] = React.useState(false)    
    const [cadastrarOrdemServico, setCadastrarOrdemServico] = React.useState(false)
    const [visualizarContasReceber, setVisualizarContasReceber] = React.useState(false)  
    const [atualizarCabecalhoOrdemServico, setAtualizarCabecalhoOrdemServico] = React.useState(false)  
    const [finalizarOrdemServico, setFinalizarOrdemServico] = React.useState(false)  
    const [incicarOrdemServico, setIniciarOrdemServico] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [defaultFiltersCobReceber, setDefaultFiltersCobReceber] = React.useState({})
    const [isScrollAtBottom, setIsScrollAtBottom] = React.useState(false)
    const [nrPageAtual, setNrPageAtual] = React.useState(null)


    const {getToken} = React.useContext(UserContex);

    const divRef = React.useRef(null)


    const handleTotalPages=()=>{
        if(Number(dataEstado?.mensagem?.last_page > 0)){
            setTotalPageCount(dataEstado?.mensagem?.last_page)
        }
    }

    const nextPageRout = ()=>{
       
        if(dataEstado?.mensagem?.next_page_url){
            setNextPage(dataEstado?.mensagem?.next_page_url)
        }
    }

    const previousPageRout = ()=>{       
        if(dataEstado?.mensagem?.prev_page_url){
            setNextPage(dataEstado?.mensagem?.prev_page_url)
        }
    }

    const firstPageRout = ()=>{       
        if(dataEstado?.mensagem?.first_page_url){
            setNextPage(dataEstado?.mensagem?.first_page_url)
        }
    }

    const lastPageRout = ()=>{
        if(dataEstado?.mensagem?.last_page_url){
            setNextPage(dataEstado?.mensagem?.last_page_url)
        }
    }

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
        props:{onClick:()=>requestAllOrdemServicos(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setIniciarOrdemServico(true), className:'btn btn-sm mx-2 btn-secondary'}
    }
    ];


    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarOrdemServico(true);
                }else{
                    setAtualizarOrdemServico(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarOrdemServico(true);
                }else{
                    setCancelarOrdemServico(false);
                }
                break;
            case 'digitar':
                if(consultaChoice > 0){
                    setDigitarOrdemServico(true);
                }else{
                    setDigitarOrdemServico(false);
                }
                break;
            case 'visualizar':
                if(consultaChoice > 0){
                    setDigitarOrdemServico(true);
                }else{
                    setDigitarOrdemServico(false);
                }
                break;
            case 'iniciar_procedimento':
                if(consultaChoice > 0){
                    setDigitarOrdemServico(true);
                }else{
                    setDigitarOrdemServico(false);
                }
                break;
            
            case 'finalizar_procedimento':
                if(consultaChoice > 0){
                    setDigitarOrdemServico(true);
                }else{
                    setDigitarOrdemServico(false);
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
                    setAtualizarCabecalhoOrdemServico(true);
                }else{
                    setAtualizarCabecalhoOrdemServico(false);
                }

                break;                 
            case 'finalizar':

                if(consultaChoice > 0){
                    setFinalizarOrdemServico(true);
                }else{
                    setFinalizarOrdemServico(false);
                }

                break;
            default:
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarOrdemServico == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarOrdemServico])

    const atualizarOrdemServicoAction = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('editar')
        setAtualizarOrdemServico(true);
    }

    const atualizarCabecalhoOrdemServicoAction = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('editar_cabecalho')
        setAtualizarCabecalhoOrdemServico(true);
        //AtualizarCabecalhoForm
    }

    

    const visualizarContasReceberAction = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('contas_receber')
        setVisualizarContasReceber(true);
    }

    const digitarOrdemServicoAction = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('digitar')
        setAtualizarOrdemServico(true);
    }

    const cancelarOrdemServicoAction = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('cancelar')
        setCancelarOrdemServico(true);
    }
    //cancelarOrdemServico, setCancelarOrdemServico
    const novaOrdemServico = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('consultar')
        setAtualizarOrdemServico(true);
    }

    const iniciarOrdemServico = (idOrdemServico)=>{
        setIniciarOrdemServico(idOrdemServico)
        setAcao('iniciar')
        setIniciarOrdemServico(true);
    }

    const finalizarOrdemServicoAction = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('finalizar')
        setFinalizarOrdemServico(true);
    }


    //finalizarOrdemServico, setFinalizarOrdemServico
    

    React.useEffect(()=>{
        /**
         * consultaChoice, setOrdemServicoChoice] = React.useState(()=>{
        return idOrdemCriada;
    }
         */
        console.log('Ordem criada..............')
        console.log(idOrdemCriada)
        console.log('Ordem criada..............')
        idOrdemCriada && idOrdemCriada > 0 && atualizarOrdemServicoAction(idOrdemCriada)

    }, [idOrdemCriada])

    const gerarTableOrdemServico = ()=>{
       
        let data = [];
        let dataOrdemServico = estado

        if(dataOrdemServico?.mensagem){
            dataOrdemServico = dataOrdemServico?.mensagem;
        }

        if(dataOrdemServico?.data){
            dataOrdemServico = dataOrdemServico?.data;
        }
        if(dataOrdemServico && Array.isArray(dataOrdemServico) && dataOrdemServico.length > 0){
            for(let i=0; !(i == dataOrdemServico.length); i++){
                let atual = dataOrdemServico[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar                   = true;
                    let btnIniciarProcedimento      = true;
                    let btnFinalizar                = true;
                    let btnVisualizarFinanceiro     = true;
                    let btnVisualizar               = true;
                    let btnCotinuarDigitacao        = true;
                    let btnCancelar                 = true;

                    if(atual?.status != 'cancelado'){
                        
                        if(atual?.is_faturado == 'yes'){
                            btnCotinuarDigitacao        = false;
                            btnVisualizarFinanceiro     = true;
                            btnIniciarProcedimento      = false;
                        }else{
                            btnFinalizar                = false;
                            btnIniciarProcedimento      = false;
                            btnVisualizarFinanceiro     = false;
                        }

                        if(atual?.status == 'concluido'){
                            btnCotinuarDigitacao    = false;
                            btnFinalizar            = false;
                            btnEditar               = false;
                            btnIniciarProcedimento  = false;
                        }

                    }else{

                        btnCotinuarDigitacao    = false;
                        btnFinalizar            = false;
                        btnIniciarProcedimento  = false;
                        acoesArr                = [];
                        btnEditar               = false;
                    }

                    if(btnCotinuarDigitacao){
                        acoesArr.push({acao:()=>atualizarOrdemServicoAction(atual.id), label:'Continuar digitação', propsOption:{}, propsLabel:{}})
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarCabecalhoOrdemServicoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnIniciarProcedimento){
                        //acoesArr.push({acao:()=>atualizarOrdemServicoAction(atual.id), label:'Iniciar procedimento', propsOption:{}, propsLabel:{}})
                    }

                    if(btnFinalizar){
                        acoesArr.push({acao:()=>finalizarOrdemServicoAction(atual.id), label:'Finalizar procedimento', propsOption:{}, propsLabel:{}})
                    }

                    if(btnVisualizarFinanceiro){
                        acoesArr.push({acao:()=>{visualizarContasReceberAction(atual.id); setDefaultFiltersCobReceber({...atual, pessoa_name:atual?.name, referencia_id:atual?.id, referencia:'ordem_servicos'})}, label:'Conta a receber', propsOption:{}, propsLabel:{}})
                    }

                    if(btnVisualizar){
                        acoesArr.push({acao:()=>atualizarOrdemServicoAction(atual.id), label:'Visualizar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnCancelar){
                        acoesArr.push({acao:()=>cancelarOrdemServicoAction(atual.id), label:'Cancelar', propsOption:{}, propsLabel:{}})
                    }

                    let line_style = {}
                    if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
                    } 
                    
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

                                    label:atual.name_filial,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name,
                                    propsRow:{}
                                },
                                {

                                    label:atual.status,
                                    propsRow:{}
                                },
                                {

                                    label:atual.type,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name_profissional,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name_rca,
                                    propsRow:{}
                                },
                                {

                                    label:atual.observacao,
                                    propsRow:{}
                                },
                                {

                                    label:FORMAT_MONEY(atual?.vr_final),
                                    propsRow:{},
									toSum:1,
									isCoin:1,
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

        let dataOrdemServico = estado

        if(dataOrdemServico?.mensagem){
            dataOrdemServico = dataOrdemServico?.mensagem;
        }

        if(dataOrdemServico?.data){
            dataOrdemServico = dataOrdemServico?.data;
        }

        if(dataOrdemServico && Array.isArray(dataOrdemServico) && dataOrdemServico.length > 0){
            for(let i=0; !(i == dataOrdemServico.length); i++){
                let atual = dataOrdemServico[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar                   = true;
                    let btnIniciarProcedimento      = true;
                    let btnFinalizar                = true;
                    let btnVisualizarFinanceiro     = true;
                    let btnVisualizar               = true;
                    let btnCotinuarDigitacao        = true;
                    let btnCancelar                 = true;

                    if(atual?.status != 'cancelado'){
                        
                        if(atual?.is_faturado == 'yes'){
                            btnCotinuarDigitacao        = false;
                            btnVisualizarFinanceiro     = true;
                            btnIniciarProcedimento      = false;
                        }else{
                            btnFinalizar                = false;
                            btnIniciarProcedimento      = false;
                            btnVisualizarFinanceiro     = false;
                        }

                        if(atual?.status == 'concluido'){
                            btnCotinuarDigitacao    = false;
                            btnFinalizar            = false;
                            btnEditar               = false;
                            btnIniciarProcedimento  = false;
                        }

                    }else{

                        btnCotinuarDigitacao    = false;
                        btnFinalizar            = false;
                        btnIniciarProcedimento  = false;
                        acoesArr                = [];
                        btnEditar               = false;
                    }

                    if(btnCotinuarDigitacao){
                        acoesArr.push({acao:()=>atualizarOrdemServicoAction(atual.id), label:'Continuar digitação', propsOption:{}, propsLabel:{}})
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarCabecalhoOrdemServicoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnIniciarProcedimento){
                        //acoesArr.push({acao:()=>atualizarOrdemServicoAction(atual.id), label:'Iniciar procedimento', propsOption:{}, propsLabel:{}})
                    }

                    if(btnFinalizar){
                        acoesArr.push({acao:()=>finalizarOrdemServicoAction(atual.id), label:'Finalizar procedimento', propsOption:{}, propsLabel:{}})
                    }

                    if(btnVisualizarFinanceiro){
                        acoesArr.push({acao:()=>{visualizarContasReceberAction(atual.id); setDefaultFiltersCobReceber({...atual, pessoa_name:atual?.name, referencia_id:atual?.id, referencia:'ordem_servicos'})}, label:'Conta a receber', propsOption:{}, propsLabel:{}})
                    }

                    if(btnVisualizar){
                        acoesArr.push({acao:()=>atualizarOrdemServicoAction(atual.id), label:'Visualizar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnCancelar){
                        acoesArr.push({acao:()=>cancelarOrdemServicoAction(atual.id), label:'Cancelar', propsOption:{}, propsLabel:{}})
                    }

                    let line_style = {}
                    if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
                    } 

                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow: atual.id +' - '+ atual?.name, style:{...line_style}, mainIcon:faFileAlt},
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
                                        title:<span style={{fontWeight:'480'}}>Cód pessoa: </span>,
                                        label:atual?.pessoa_id,
                                        props:{style:{textAlign:'left', md:'2', sm:'2', xs:'2'}},
                                        toSum:1,
                                        isCoin:1,
                                    }, {
                                        title:<span style={{fontWeight:'480'}}>Total R$: </span>,
                                        label:FORMAT_MONEY(atual?.vr_final),
                                        props:{style:{textAlign:'left', md:'3', sm:'3', xs:'3'}},
                                        toSum:1,
                                        isCoin:1,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Status: </span>,
                                        label:atual?.status,
                                        props:{style:{textAlign:'left', fontWeight:'bolder', md:'3', sm:'3', xs:'3'}},
                                        toSum:1,
                                        isCoin:1,
                                    },
                                    /*{
                                        title:<span style={{fontWeight:'480'}}>Faturado: </span>,
                                        label:(atual.is_faturado == 'yes' ? 'Sim' : 'Não'),
                                        props:{style:{textAlign:'left', md:'2', sm:'2', xs:'2'}},
                                        toSum:0,
                                        isCoin:0,
                                    },*/
                                    {
                                        title:<span style={{fontWeight:'480'}}>Criado em: </span>,
                                        label:FORMAT_DATA_PT_BR(atual.created_at),
                                        props:{style:{textAlign:'left', md:'4', sm:'4', xs:'4'}},
                                        toSum:0,
                                        isCoin:0,
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
                label:'Filial',
                props:{}
            },
            {
                label:'Cliente',
                props:{}
            },
            {
                label:'Status',
                props:{}
            },
            {
                label:'Tipo',
                props:{}
            },
            {
                label:'Profissional',
                props:{}
            },
            {
                label:'Vendedor',
                props:{}
            },
            {
                label:'Observação',
                props:{}
            },
            {
                label:'Valor',
                props:{}
            },
            {
                label:'Faturado',
                props:{}
            },
            {
                label:'Faturado em',
                props:{}
            },
            {
                label:'Cancelado em',
                props:{}
            },
            {
                label:'Concluído em',
                props:{}
            },
            {
                label:'Iniciado em',
                props:{}
            }
        ]

        return tableTitle;
    }
   //name_profissional

    //------------

    const requestAllOrdemServicos = async() =>{
       
        const {url, options} = ORDEM_SERVICO_ALL_POST({'name_servico':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All serviços here')
        console.log({'name_servico':pessoa})
        console.log(json)
        if(json){
            setOrdemServico(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllOrdemServicosEffect = async() =>{
       
           await requestAllOrdemServicos();

            
        }

       /// requestAllOrdemServicosEffect();

        
    }, [])

    React.useEffect(()=>{
        setOrdemServico(dataEstado)
        setNrPageAtual(dataEstado?.mensagem?.current_page)
        handleTotalPages();
        /*if(dataEstado?.mensagem?.data){
            setOrdemServico([...estado, ...dataEstado?.mensagem?.data])
        }else{
            setOrdemServico([...estado])
        }*/
        
    
    }, [dataEstado])

    

    const rowsTableArr = gerarTableOrdemServico();    
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
                        withoutFirstCol={true}
                        botoesHeader={[{acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> }]}
                        
                        nextPage={nextPage}
                        setNextPage={setNextPage}
                        usePagination={usePagination}
                        setUsePagination={setUsePagination}
                        nextPageRout={nextPageRout}
                        previousPageRout={previousPageRout}
                        firstPageRout = {firstPageRout}
                        nrPageAtual = {nrPageAtual}
                        lastPageRout = {lastPageRout}
                        totalPageCount={totalPageCount}
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

                <Col  xs="12" sm="12" md="12"  className={'default_card_report'}  >
                    <Table
                        titulosTableArr={titulosTableArr}
                        rowsTableArr={rowsTableArr}
                        loading={loadingData}
                        nadaEncontrado={nadaEncontrado}
                        botoesHeader={[{acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> }]}
                        refScrollTable={divRef}
                        nextPage={nextPage}
                        setNextPage={setNextPage}
                        usePagination={usePagination}
                        setUsePagination={setUsePagination}
                        nextPageRout={nextPageRout}
                        previousPageRout={previousPageRout}
                        firstPageRout = {firstPageRout}
                        nrPageAtual = {nrPageAtual}
                        lastPageRout = {lastPageRout}
                        totalPageCount={totalPageCount}
                        

                    />
                </Col>
            </Row>

            {
                cadastrarOrdemServico && <Cadastrar cadastrarOrdemServico={cadastrarOrdemServico} setCadastrarOrdemServico={setCadastrarOrdemServico} atualizarOrdemServico={atualizarOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico}  idOrdemServico={consultaChoice} setIdOrdemServico={setOrdemServicoChoice} callback={callBack} />
            }
            
            {
                atualizarOrdemServico &&
                <Atualizar atualizarOrdemServico={atualizarOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico}  idOrdemServico={consultaChoice} setIdOrdemServico={setOrdemServicoChoice} callback={callBack} />
            }

            {
                incicarOrdemServico &&
                <Iniciar incicarOrdemServico={incicarOrdemServico} setIniciarOrdemServico={setIniciarOrdemServico} atualizarOrdemServico={atualizarOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico}  idOrdemServico={consultaChoice} setIdOrdemServico={setOrdemServicoChoice} callback={callBack} />
            }

            {
                digitarOrdemServico &&
                <Atualizar digitarOrdemServico={digitarOrdemServico} setIniciarOrdemServico={setIniciarOrdemServico} atualizarOrdemServico={atualizarOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico}  idOrdemServico={consultaChoice} setIdOrdemServico={setOrdemServicoChoice} callback={callBack} />
            }

            {
                cancelarOrdemServico &&
                <Cancelar cancelarOrdemServico={cancelarOrdemServico} setCancelarOrdemServico={setCancelarOrdemServico} atualizarOrdemServico={atualizarOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico}  idOrdemServico={consultaChoice} setIdOrdemServico={setOrdemServicoChoice} callback={callBack} />
            }

            {
                finalizarOrdemServico &&
                <Finalizar finalizarOrdemServico={finalizarOrdemServico} setFinalizarOrdemServico={setFinalizarOrdemServico} atualizarOrdemServico={atualizarOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico}  idOrdemServico={consultaChoice} setIdOrdemServico={setOrdemServicoChoice} callback={callBack} />
            }

            {
                atualizarCabecalhoOrdemServico &&
                <AtualizarCabecalho atualizarCabecalhoOrdemServico={atualizarCabecalhoOrdemServico} setAtualizarCabecalhoOrdemServico={setAtualizarCabecalhoOrdemServico} atualizarOrdemServico={atualizarOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico}  idOrdemServico={consultaChoice} setIdOrdemServico={setOrdemServicoChoice} callback={callBack} />
            }

            {
                visualizarContasReceber &&
                <Modal noBtnCancelar={false} noBtnConcluir={true} handleConcluir={()=>null}  title={'Contas a receber'} size="lg" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={consultaChoice} showHide={()=>{setVisualizarContasReceber(false);}}>
					
                    <ContasReceber defaultFilters={defaultFiltersCobReceber} visualizarContasReceber={visualizarContasReceber} setVisualizarContasReceber={setVisualizarContasReceber} atualizarOrdemServico={atualizarOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico} idReferencia={consultaChoice} referencia={'ordem_servico'}  idOrdemServico={consultaChoice} setIdOrdemServico={setOrdemServicoChoice} callback={callBack} />
                
				</Modal>
            }
        
        </>
    )
}

export default Include;