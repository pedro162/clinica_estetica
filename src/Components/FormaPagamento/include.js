import React from 'react';
import estilos from './FormaPagamento.module.css'
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
import FormFormaPagamento from './FormFormaPagamento/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Cancelar from './Cancelar/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'


const Include = ({dataEstado, loadingData, nadaEncontrado, callBack, setMostarFiltros, idFormaPagamentoCriada,nextPage, setNextPage, usePagination, setUsePagination, totalPageCount,setTotalPageCount, requestAllFormaPagamentos, ...props})=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setFormaPagamento] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarFormaPagamento, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setFormaPagamentoChoice] = React.useState(null);
    const [atualizarFormaPagamento, setAtualizarFormaPagamento] = React.useState(false)   
    const [cancelarFormaPagamento, setCancelarFormaPagamento] = React.useState(false)    
    const [cadastrarFormaPagamento, setCadastrarFormaPagamento] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)

    const {getToken, dataUser} = React.useContext(UserContex);
    const {type, is_system, tenant_id} = dataUser ? dataUser : {};
    
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

    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarFormaPagamento(true);
                }else{
                    setAtualizarFormaPagamento(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarFormaPagamento(true);
                }else{
                    setCancelarFormaPagamento(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarFormaPagamento == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }
        
    }, [cadastrarFormaPagamento])

    const atualizarFormaPagamentoAction = (idFormaPagamento)=>{
        setFormaPagamentoChoice(idFormaPagamento)
        setAcao('editar')
        setAtualizarFormaPagamento(true);
    }
    const cancelarFormaPagamentoAction = (idFormaPagamento)=>{
        setFormaPagamentoChoice(idFormaPagamento)
        setAcao('cancelar')
        setCancelarFormaPagamento(true);
    }

    const novaFormaPagamento = (idFormaPagamento)=>{
        setFormaPagamentoChoice(idFormaPagamento)
        setAcao('consultar')
        setAtualizarFormaPagamento(true);
    }

    const gerarTableFormaPagamento = ()=>{
       
        let data = [];
        let dataFormaPagamento = estado

        if(dataFormaPagamento?.mensagem){
            dataFormaPagamento = dataFormaPagamento?.mensagem;
        }

        if(dataFormaPagamento?.data){
            dataFormaPagamento = dataFormaPagamento?.data;
        }

        if(dataFormaPagamento && Array.isArray(dataFormaPagamento) && dataFormaPagamento.length > 0){
            for(let i=0; !(i == dataFormaPagamento.length); i++){
                let atual = dataFormaPagamento[i];
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

                    if(btnGerarFinanceiro){
                        acoesArr.push({acao:()=>atualizarFormaPagamentoAction(atual.id), label:'Gerar financeiro', propsOption:{}, propsLabel:{}})
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarFormaPagamentoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnCancelar){
                        acoesArr.push({acao:()=>cancelarFormaPagamentoAction(atual.id), label:'Cancelar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnExames){
                        
                    }

                    if(btnDiagnostico){
                        
                    }
                    if(btnFicha){
                        
                    }

                    if(btnDetalhes){
                    }

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

                                    label:atual?.name,
                                    propsRow:{}
                                },
                                {

                                    label:String(FORMAT_DATA_PT_BR(atual.created_at)).length > 0 && FORMAT_DATA_PT_BR(atual.created_at),
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
                label:'Nome',
                props:{ style:{minWidth:'50px'}}
            },
            {
                label:'Data criação',
                props:{ style:{minWidth:'50px'}}
            }
        ]

        return tableTitle;
    }
   

    const gerarListMobileRelatorio = ()=>{
       
        let data = [];

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
                    let btnEditar           = true;
                    let btnGerarFinanceiro  = true;

                    if(type=='external'){
                        btnGerarFinanceiro  = false;
                        btnEditar           = false;
                        
                    }

                    if(btnGerarFinanceiro){
                        acoesArr.push({acao:()=>atualizarFormaPagamentoAction(atual.id), label:'Gerar financeiro', propsOption:{}, propsLabel:{}})
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarFormaPagamentoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

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

    React.useEffect(()=>{
        setFormaPagamento(dataEstado)
        setNrPageAtual(dataEstado?.mensagem?.current_page)
        handleTotalPages()
        handleTotalItems()
    }, [dataEstado])
    
    const rowsTableArr = gerarTableFormaPagamento();    
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
                cadastrarFormaPagamento && <Cadastrar cadastrarFormaPagamento={cadastrarFormaPagamento} setCadastrarFormaPagamento={setCadastrarFormaPagamento} atualizarFormaPagamento={atualizarFormaPagamento} setAtualizarFormaPagamento={setAtualizarFormaPagamento}  idFormaPagamento={consultaChoice} setIdFormaPagamento={setFormaPagamentoChoice} callback={requestAllFormaPagamentos} />
            }
            
            {
                atualizarFormaPagamento &&
                <Atualizar atualizarFormaPagamento={atualizarFormaPagamento} setAtualizarFormaPagamento={setAtualizarFormaPagamento}  idFormaPagamento={consultaChoice} setIdFormaPagamento={setFormaPagamentoChoice} callback={requestAllFormaPagamentos} />
            }

            {
                cancelarFormaPagamento &&
                <Cancelar cancelarFormaPagamento={cancelarFormaPagamento} setCancelarFormaPagamento={setCancelarFormaPagamento}  idFormaPagamento={consultaChoice} setIdFormaPagamento={setFormaPagamentoChoice} callback={requestAllFormaPagamentos} />
            }
           
         </>
    )
}

export default Include;