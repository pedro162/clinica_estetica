import React from 'react';
import estilos from './Consulta.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormConsulta from './FormConsulta/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Cancelar from './Cancelar/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'


const Include = ({dataEstado, loadingData, nadaEncontrado, callBack, setMostarFiltros, idConsultaCriada,nextPage, setNextPage, usePagination, setUsePagination, totalPageCount,setTotalPageCount, requestAllConsultas, ...props})=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setConsulta] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarConsulta, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setConsultaChoice] = React.useState(null);
    const [atualizarConsulta, setAtualizarConsulta] = React.useState(false)   
    const [cancelarConsulta, setCancelarConsulta] = React.useState(false)    
    const [cadastrarConsulta, setCadastrarConsulta] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)

    const {getToken, dataUser} = React.useContext(UserContex);
    const {type, is_system, tenant_id} = dataUser ? dataUser : {};
    
    const alerta = (target)=>{
        console.log(target)
    }
    
    const handleTotalPages=()=>{
        if(Number(dataEstado?.mensagem?.last_page > 0)){
            setTotalPageCount(dataEstado?.mensagem?.last_page)
        }
    }

    const handleTotalItems=()=>{
        if(Number(dataEstado?.mensagem?.to > 0)){
            setQtdItemsTo(dataEstado?.mensagem?.to)
        }

        if(Number(dataEstado?.mensagem?.total > 0)){
            setQtdItemsTotal(dataEstado?.mensagem?.total)
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

    const setNamePessoa = ({target})=>{        
        setPessoa(target.value)
    }


    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarConsulta(true);
                }else{
                    setAtualizarConsulta(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarConsulta(true);
                }else{
                    setCancelarConsulta(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarConsulta == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarConsulta])

    const atualizarConsultaAction = (idConsulta)=>{
        setConsultaChoice(idConsulta)
        setAcao('editar')
        setAtualizarConsulta(true);
    }
    const cancelarConsultaAction = (idConsulta)=>{
        setConsultaChoice(idConsulta)
        setAcao('cancelar')
        setCancelarConsulta(true);
    }
    //cancelarConsulta, setCancelarConsulta
    const novaConsulta = (idConsulta)=>{
        setConsultaChoice(idConsulta)
        setAcao('consultar')
        setAtualizarConsulta(true);
    }

    const gerarTableConsulta = ()=>{
       
        let data = [];
        let dataConsulta = estado

        if(dataConsulta?.mensagem){
            dataConsulta = dataConsulta?.mensagem;
        }

        if(dataConsulta?.data){
            dataConsulta = dataConsulta?.data;
        }

        if(dataConsulta && Array.isArray(dataConsulta) && dataConsulta.length > 0){
            for(let i=0; !(i == dataConsulta.length); i++){
                let atual = dataConsulta[i];
                if(atual){
                    let line_style = {}
                    let acoesArr = [];
                    let btnCancelar         = true;
                    let btnEditar           = true;
                    let btnExames           = true;
                    let btnDiagnostico      = true;
                    let btnFicha            = true;
                    let btnDetalhes         = true;
                    let btnGerarFinanceiro  = true;

                    if(atual.status == 'cancelado'){
                        btnCancelar         = false;
                        btnEditar           = false;
                        btnGerarFinanceiro  = false;
                        line_style.color    = 'red';
                    }

                    if(atual.status == 'finalizado'){
                        btnCancelar = false;
                        btnEditar   = false;
                        line_style.color = 'green';
                    }

                    if(type=='external'){
                        btnGerarFinanceiro  = false;
                        btnEditar           = false;
                        
                    }

                    /*if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
                    } */


                    if(btnGerarFinanceiro){
                        acoesArr.push({acao:()=>atualizarConsultaAction(atual.id), label:'Gerar financeiro', propsOption:{}, propsLabel:{}})
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarConsultaAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnCancelar){
                        acoesArr.push({acao:()=>cancelarConsultaAction(atual.id), label:'Cancelar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnExames){
                        
                    }

                    if(btnDiagnostico){
                        
                    }
                    if(btnFicha){
                        
                    }

                    if(btnDetalhes){
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

                                    label:atual.filial_id,
                                    propsRow:{}
                                },
                                {

                                    label:atual.pessoa_id,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name_pessoa,
                                    propsRow:{}
                                },
                                {

                                    label:atual.status,
                                    propsRow:{}
                                },
                                {

                                    label:atual.prioridade,
                                    propsRow:{}
                                },
                                {

                                    label:atual.profissional_id,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name_profissional,
                                    propsRow:{}
                                },
                                {

                                    label:FORMAT_DATA_PT_BR(atual.dt_inicio),
                                    propsRow:{}
                                },
                                {

                                    label:atual.hr_inicio,
                                    propsRow:{}
                                },{

                                    label:String(FORMAT_DATA_PT_BR(atual.dt_fim)).length > 0 && FORMAT_DATA_PT_BR(atual.dt_fim),
                                    propsRow:{}
                                },
                                {

                                    label:atual.hr_fim,
                                    propsRow:{}
                                },
                                {

                                    label:String(FORMAT_DATA_PT_BR(atual.dt_cancelamento)).length > 0 && FORMAT_DATA_PT_BR(atual.dt_cancelamento),
                                    propsRow:{}
                                },
                                {

                                    label:atual.ds_cancelamento,
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

    const gerarTitleTable = ()=>{
        let tableTitle = [
            {
                label:'Código',
                props:{ style:{minWidth:'50px'}}
            },
            {
                label:'Cód. filial',
                props:{ style:{minWidth:'50px'}}
            },
            {
                label:'Cód. pessoa',
                props:{ style:{minWidth:'50px'}}
            },
            {
                label:'Pessoa',
                props:{ style:{minWidth:'220px'}}
            },
            {
                label:'Status',
                props:{ style:{minWidth:'100px'}}
            },
            {
                label:'Prioridade',
                props:{ style:{minWidth:'100px'}}
            },
            {
                label:'Cód. profissional',
                props:{ style:{minWidth:'50px'}}
            },
            {
                label:'Profissional',
                props:{ style:{minWidth:'220px'}}
            },
            {
                label:'Data início',
                props:{ style:{minWidth:'100px'}}
            },
            {
                label:'Horário início',
                props:{ style:{minWidth:'100px'}}
            },
            {
                label:'Data fim',
                props:{ style:{minWidth:'100px'}}
            },
            {
                label:'Horário fim',
                props:{ style:{minWidth:'100px'}}
            },
            {
                label:'Cancelado em',
                props:{ style:{minWidth:'100px'}}
            },
            {
                label:'Motivo cancelamento',
                props:{ style:{minWidth:'100px'}}
            },
        ]

        return tableTitle;
    }
   

    const gerarListMobileRelatorio = ()=>{
       
        let data = [];
        //let dataClientes = estado.mensagem
        let dataClientes = estado

        if(dataClientes?.mensagem){
            dataClientes = dataClientes?.mensagem;
        }

        if(dataClientes?.data){
            dataClientes = dataClientes?.data;
        }

        if(dataClientes && Array.isArray(dataClientes) && dataClientes.length > 0){
            for(let i=0; !(i == dataClientes.length); i++){
                let atual = dataClientes[i];
                if(atual){

                    let line_style = {}
                    let acoesArr = [];
                    let btnCancelar         = true;
                    let btnEditar           = true;
                    let btnExames           = true;
                    let btnDiagnostico      = true;
                    let btnFicha            = true;
                    let btnDetalhes         = true;
                    let btnGerarFinanceiro  = true;

                    if(atual.status == 'cancelado'){
                        //btnCancelar         = false;
                        btnEditar           = false;
                        btnGerarFinanceiro  = false;
                        line_style.color = 'red';
                    }

                    if(atual.status == 'finalizado'){
                        btnCancelar         = false;
                        btnEditar           = false;
                        line_style.color    = 'green';
                    }

                    if(type=='external'){
                        btnGerarFinanceiro  = false;
                        btnEditar           = false;
                        
                    }

                    if(btnGerarFinanceiro){
                        acoesArr.push({acao:()=>atualizarConsultaAction(atual.id), label:'Gerar financeiro', propsOption:{}, propsLabel:{}})
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarConsultaAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnCancelar){
                        acoesArr.push({acao:()=>cancelarConsultaAction(atual.id), label:'Cancelar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnExames){
                        
                    }

                    if(btnDiagnostico){
                        
                    }
                    if(btnFicha){
                        
                    }

                    if(btnDetalhes){
                        
                    }

                    

                    
                   /* if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
                    } */

                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow: atual?.id+' - '+atual?.name_pessoa, style:{...line_style}},
                            acoes:[
                                ...acoesArr
                            ],
                            title:<> <div style={{display:'flex', justifyContent:'space-between',fontSize:'18pt', fontWeight:'bolder'}} ><span><FontAwesomeIcon size={'lg'} icon={faUserCircle}/> {atual?.name} </span> </div> </>,
                            propsContainerTitulo:{md:'11', sm:'9', xs:'9'},
                            propsContainerButtons:{md:'1', sm:'4', xs:'2'},
                            acoesBottomCard:[
                              
                            ],
                            celBodyTableArr:[
                                [
                                    
                                    {
                                        title:<span style={{fontWeight:'480'}}>Prioridade: </span>,
                                        label:atual?.prioridade,
                                        props:{style:{textAlign:'left', fontWeight:'bolder'}, md:'1', sm:'3', xs:'3'},
                                        toSum:0,
                                        isCoin:0,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Status: </span>,
                                        label:atual?.status,
                                        props:{style:{textAlign:'left', fontWeight:'bolder'}, md:'1', sm:'3', xs:'3'},
                                        toSum:0,
                                        isCoin:0,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Profissional: </span>,
                                        label:atual?.name_profissional,
                                        props:{style:{textAlign:'left'}, md:'1', sm:'3', xs:'3'},
                                        toSum:0,
                                        isCoin:0,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>DT início: </span>,
                                        label:(FORMAT_DATA_PT_BR(atual?.dt_inicio)+" "+atual.hr_inicio),
                                        props:{style:{textAlign:'left'}, md:'1', sm:'3', xs:'3'},
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

    //------------
/* 
    const requestAllConsultas = async() =>{
       
        const {url, options} = CONSULTA_ALL_POST({'name_pessoa':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All clients here')
        console.log({'name_pessoa':pessoa})
        console.log(json)
        if(json){
            setConsulta(json)
        }

            
    } */

    React.useEffect(()=>{
        setConsulta(dataEstado)
        setNrPageAtual(dataEstado?.mensagem?.current_page)
        handleTotalPages()
        handleTotalItems()
    }, [dataEstado])
    

    const rowsTableArr = gerarTableConsulta();    
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
                        qtdItemsTo={qtdItemsTo}
                        qtdItemsTotal={qtdItemsTotal}
                    />

                </Col>

                <Col  xs="12" sm="12" md="12"  className={'default_card_report'}>
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
                        firstPageRout = {firstPageRout}
                        nrPageAtual = {nrPageAtual}
                        lastPageRout = {lastPageRout}
                        totalPageCount={totalPageCount}
                        qtdItemsTo={qtdItemsTo}
                        qtdItemsTotal={qtdItemsTotal}
                    />
                </Col>
            </Row>

            {
                cadastrarConsulta && <Cadastrar cadastrarConsulta={cadastrarConsulta} setCadastrarConsulta={setCadastrarConsulta} atualizarConsulta={atualizarConsulta} setAtualizarConsulta={setAtualizarConsulta}  idConsulta={consultaChoice} setIdConsulta={setConsultaChoice} callback={requestAllConsultas} />
            }
            
            {
                atualizarConsulta &&
                <Atualizar atualizarConsulta={atualizarConsulta} setAtualizarConsulta={setAtualizarConsulta}  idConsulta={consultaChoice} setIdConsulta={setConsultaChoice} callback={requestAllConsultas} />
            }

            {
                cancelarConsulta &&
                <Cancelar cancelarConsulta={cancelarConsulta} setCancelarConsulta={setCancelarConsulta}  idConsulta={consultaChoice} setIdConsulta={setConsultaChoice} callback={requestAllConsultas} />
            }
           
         </>

    )
}

export default Include;