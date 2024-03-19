import React from 'react';
import estilos from './MovimentacoesFinanceira.module.css'
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
import FormMovimentacoesFinanceira from './FormMovimentacoesFinanceira/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Cancelar from './Cancelar/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'


const Include = ({dataEstado, loadingData, nadaEncontrado, callBack, setMostarFiltros, idMovimentacoesFinanceiraCriada, ...props})=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setMovimentacoesFinanceira] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarMovimentacoesFinanceira, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setMovimentacoesFinanceiraChoice] = React.useState(null);
    const [atualizarMovimentacoesFinanceira, setAtualizarMovimentacoesFinanceira] = React.useState(false)   
    const [cancelarMovimentacoesFinanceira, setCancelarMovimentacoesFinanceira] = React.useState(false)    
    const [cadastrarMovimentacoesFinanceira, setCadastrarMovimentacoesFinanceira] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')


    const {getToken, dataUser} = React.useContext(UserContex);
    const {type, is_system, tenant_id} = dataUser ? dataUser : {};

    const alerta = (target)=>{
        console.log(target)
    }

    const setNamePessoa = ({target})=>{
        
        setPessoa(target.value)
    }


    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarMovimentacoesFinanceira(true);
                }else{
                    setAtualizarMovimentacoesFinanceira(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarMovimentacoesFinanceira(true);
                }else{
                    setCancelarMovimentacoesFinanceira(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarMovimentacoesFinanceira == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarMovimentacoesFinanceira])

    const atualizarMovimentacoesFinanceiraAction = (idMovimentacoesFinanceira)=>{
        setMovimentacoesFinanceiraChoice(idMovimentacoesFinanceira)
        setAcao('editar')
        setAtualizarMovimentacoesFinanceira(true);
    }
    const cancelarMovimentacoesFinanceiraAction = (idMovimentacoesFinanceira)=>{
        setMovimentacoesFinanceiraChoice(idMovimentacoesFinanceira)
        setAcao('cancelar')
        setCancelarMovimentacoesFinanceira(true);
    }
    //cancelarMovimentacoesFinanceira, setCancelarMovimentacoesFinanceira
    const novaMovimentacoesFinanceira = (idMovimentacoesFinanceira)=>{
        setMovimentacoesFinanceiraChoice(idMovimentacoesFinanceira)
        setAcao('consultar')
        setAtualizarMovimentacoesFinanceira(true);
    }

    const gerarTableMovimentacoesFinanceira = ()=>{
       
        let data = [];
        let dataMovimentacoesFinanceira = estado.mensagem
        if(dataMovimentacoesFinanceira && Array.isArray(dataMovimentacoesFinanceira) && dataMovimentacoesFinanceira.length > 0){
            for(let i=0; !(i == dataMovimentacoesFinanceira.length); i++){
                let atual = dataMovimentacoesFinanceira[i];
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
                        acoesArr.push({acao:()=>atualizarMovimentacoesFinanceiraAction(atual.id), label:'Gerar financeiro', propsOption:{}, propsLabel:{}})
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarMovimentacoesFinanceiraAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnCancelar){
                        acoesArr.push({acao:()=>cancelarMovimentacoesFinanceiraAction(atual.id), label:'Cancelar', propsOption:{}, propsLabel:{}})
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
                props:{}
            },
            {
                label:'Cód. filial',
                props:{}
            },
            {
                label:'Cód. pessoa',
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
                label:'Prioridade',
                props:{}
            },
            {
                label:'Cód. profissional',
                props:{}
            },
            {
                label:'Profissional',
                props:{}
            },
            {
                label:'Data início',
                props:{}
            },
            {
                label:'Horário início',
                props:{}
            },
            {
                label:'Data fim',
                props:{}
            },
            {
                label:'Horário fim',
                props:{}
            },
            {
                label:'Cancelado em',
                props:{}
            },
            {
                label:'Motivo cancelamento',
                props:{}
            },
        ]

        return tableTitle;
    }
   

    const gerarListMobileRelatorio = ()=>{
       
        let data = [];
        let dataClientes = estado.mensagem
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
                        acoesArr.push({acao:()=>atualizarMovimentacoesFinanceiraAction(atual.id), label:'Gerar financeiro', propsOption:{}, propsLabel:{}})
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarMovimentacoesFinanceiraAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnCancelar){
                        acoesArr.push({acao:()=>cancelarMovimentacoesFinanceiraAction(atual.id), label:'Cancelar', propsOption:{}, propsLabel:{}})
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

    const requestAllMovimentacoesFinanceiras = async() =>{
       
        const {url, options} = CONSULTA_ALL_POST({'name_pessoa':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All clients here')
        console.log({'name_pessoa':pessoa})
        console.log(json)
        if(json){
            setMovimentacoesFinanceira(json)
        }

            
    }

    React.useEffect(()=>{
        setMovimentacoesFinanceira(dataEstado)
    }, [dataEstado])
    

    const rowsTableArr = gerarTableMovimentacoesFinanceira();    
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
                    />

                </Col>

                <Col  xs="12" sm="12" md="12"  className={'default_card_report'}>
                    <Table
                        titulosTableArr={titulosTableArr}
                        rowsTableArr={rowsTableArr}
                        loading={loadingData}
                        botoesHeader={[{acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> }]}

                    />
                </Col>
            </Row>

            {
                cadastrarMovimentacoesFinanceira && <Cadastrar cadastrarMovimentacoesFinanceira={cadastrarMovimentacoesFinanceira} setCadastrarMovimentacoesFinanceira={setCadastrarMovimentacoesFinanceira} atualizarMovimentacoesFinanceira={atualizarMovimentacoesFinanceira} setAtualizarMovimentacoesFinanceira={setAtualizarMovimentacoesFinanceira}  idMovimentacoesFinanceira={consultaChoice} setIdMovimentacoesFinanceira={setMovimentacoesFinanceiraChoice} callback={requestAllMovimentacoesFinanceiras} />
            }
            
            {
                atualizarMovimentacoesFinanceira &&
                <Atualizar atualizarMovimentacoesFinanceira={atualizarMovimentacoesFinanceira} setAtualizarMovimentacoesFinanceira={setAtualizarMovimentacoesFinanceira}  idMovimentacoesFinanceira={consultaChoice} setIdMovimentacoesFinanceira={setMovimentacoesFinanceiraChoice} callback={requestAllMovimentacoesFinanceiras} />
            }

            {
                cancelarMovimentacoesFinanceira &&
                <Cancelar cancelarMovimentacoesFinanceira={cancelarMovimentacoesFinanceira} setCancelarMovimentacoesFinanceira={setCancelarMovimentacoesFinanceira}  idMovimentacoesFinanceira={consultaChoice} setIdMovimentacoesFinanceira={setMovimentacoesFinanceiraChoice} callback={requestAllMovimentacoesFinanceiras} />
            }
           
         </>

    )
}

export default Include;