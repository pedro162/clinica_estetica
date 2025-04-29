import React from 'react';
import estilos from './PlanoPagamento.module.css'
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
import FormPlanoPagamento from './FormPlanoPagamento/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Excluir from './Excluir/index.js'
import Visualizar from './Visualizar/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'


const Include = ({dataEstado, loadingData, nadaEncontrado, callBack, setMostarFiltros, idPlanoPagamentoCriada,nextPage, setNextPage, usePagination, setUsePagination, totalPageCount,setTotalPageCount, requestAllPlanoPagamentos, ...props})=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setPlanoPagamento] = React.useState([])
    const [showModalCriarPlanoPagamento, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setPlanoPagamentoChoice] = React.useState(null);
    const [atualizarPlanoPagamento, setAtualizarPlanoPagamento] = React.useState(false)   
    const [cancelarPlanoPagamento, setExcluirPlanoPagamento] = React.useState(false)      
    const [visualizarPlanoPagamento, setVisualizarPlanoPagamento] = React.useState(false)    
    const [cadastrarPlanoPagamento, setCadastrarPlanoPagamento] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)

    const {getToken, dataUser} = React.useContext(UserContex);
    const {type, is_system, tenant_id} = dataUser ? dataUser : {};
    
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

    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarPlanoPagamento(true);
                }else{
                    setAtualizarPlanoPagamento(false);
                }
                break;
            case 'excluir':
                if(consultaChoice > 0){
                    setExcluirPlanoPagamento(true);
                }else{
                    setExcluirPlanoPagamento(false);
                }
                break;
                case 'visualizar':
                    if(consultaChoice > 0){
                        setVisualizarPlanoPagamento(true);
                    }else{
                        setVisualizarPlanoPagamento(false);
                    }
                    break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarPlanoPagamento == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }
        
    }, [cadastrarPlanoPagamento])

    const atualizarPlanoPagamentoAction = (idPlanoPagamento)=>{
        setPlanoPagamentoChoice(idPlanoPagamento)
        setAcao('editar')
        setAtualizarPlanoPagamento(true);

    }

    const cancelarPlanoPagamentoAction = (idPlanoPagamento)=>{
        setPlanoPagamentoChoice(idPlanoPagamento)
        setAcao('excluir')
        setExcluirPlanoPagamento(true);
    }

    const visualizarPlanoPagamentoAction = (idPlanoPagamento)=>{
        setPlanoPagamentoChoice(idPlanoPagamento)
        setAcao('visualizar')
        setVisualizarPlanoPagamento(true);
    }

    const gerarTablePlanoPagamento = ()=>{
       
        let data = [];
        let dataPlanoPagamento = estado

        if (dataPlanoPagamento?.mensagem) {
            dataPlanoPagamento = dataPlanoPagamento?.mensagem;
        }

        if (dataPlanoPagamento?.registro) {
            dataPlanoPagamento = dataPlanoPagamento?.registro;
        }

        if (dataPlanoPagamento?.data) {
            dataPlanoPagamento = dataPlanoPagamento?.data;
        }

        if (dataPlanoPagamento?.data) {
            dataPlanoPagamento = dataPlanoPagamento?.data;
        }

        if(dataPlanoPagamento && Array.isArray(dataPlanoPagamento) && dataPlanoPagamento.length > 0){
            for(let i=0; !(i == dataPlanoPagamento.length); i++){
                let atual = dataPlanoPagamento[i];
                if(atual){
                    let line_style = {}
                    let acoesArr = [];
                    let btnExcluir         = true;
                    let btnEditar           = true;
                    let btnExames           = true;
                    let btnDiagnostico      = true;
                    let btnFicha            = true;
                    let btnDetalhes         = true;
                    

                    if(type=='external'){
                        btnExcluir  = false;
                        btnEditar           = false;
                        
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarPlanoPagamentoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnExcluir){
                        acoesArr.push({acao:()=>cancelarPlanoPagamentoAction(atual.id), label:'Excluir', propsOption:{}, propsLabel:{}})
                    }

                    if(btnDetalhes){
                        acoesArr.push({acao:()=>visualizarPlanoPagamentoAction(atual.id), label:'Visualizar', propsOption:{}, propsLabel:{}})
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
        let dataPlanoPagamento = estado

        if (dataPlanoPagamento?.mensagem) {
            dataPlanoPagamento = dataPlanoPagamento?.mensagem;
        }

        if (dataPlanoPagamento?.registro) {
            dataPlanoPagamento = dataPlanoPagamento?.registro;
        }

        if (dataPlanoPagamento?.data) {
            dataPlanoPagamento = dataPlanoPagamento?.data;
        }

        if (dataPlanoPagamento?.data) {
            dataPlanoPagamento = dataPlanoPagamento?.data;
        }

        if(dataPlanoPagamento && Array.isArray(dataPlanoPagamento) && dataPlanoPagamento.length > 0){
            for(let i=0; !(i == dataPlanoPagamento.length); i++){
                let atual = dataPlanoPagamento[i];
                if(atual){

                    let line_style = {}
                    let acoesArr = [];
                    let btnEditar  = true;
                    let btnExcluir  = true;
                    let btnDetalhes  = true;

                    if(type=='external'){
                        btnExcluir  = false;
                        btnEditar   = false;                        
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarPlanoPagamentoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnExcluir){
                        acoesArr.push({acao:()=>cancelarPlanoPagamentoAction(atual.id), label:'Excluir', propsOption:{}, propsLabel:{}})
                    }

                    if(btnDetalhes){
                        acoesArr.push({acao:()=>visualizarPlanoPagamentoAction(atual.id), label:'Visualizar', propsOption:{}, propsLabel:{}})
                    }

                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow: atual?.id+' - '+atual?.name, style:{...line_style}},
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
                                        title:<span style={{fontWeight:'480'}}>Código: </span>,
                                        label:atual?.cdCobrancaTipo,
                                        props:{style:{textAlign:'left', fontWeight:'bolder'}, md:'6', sm:'6', xs:'6'},
                                        toSum:0,
                                        isCoin:0,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Tipo: </span>,
                                        label:atual?.tpPagamento,
                                        props:{style:{textAlign:'left', fontWeight:'bolder'}, md:'6', sm:'6', xs:'6'},
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
        setPlanoPagamento(dataEstado?.data)
        setNrPageAtual(dataEstado?.data?.data?.current_page)
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado])
    
    const rowsTableArr = gerarTablePlanoPagamento();    
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
                cadastrarPlanoPagamento && <Cadastrar cadastrarPlanoPagamento={cadastrarPlanoPagamento} setCadastrarPlanoPagamento={setCadastrarPlanoPagamento} atualizarPlanoPagamento={atualizarPlanoPagamento} setAtualizarPlanoPagamento={setAtualizarPlanoPagamento}  idPlanoPagamento={consultaChoice} setIdPlanoPagamento={setPlanoPagamentoChoice} callback={requestAllPlanoPagamentos} />
            }
            
            {
                atualizarPlanoPagamento &&
                <Atualizar atualizarPlanoPagamento={atualizarPlanoPagamento} setAtualizarPlanoPagamento={setAtualizarPlanoPagamento}  idPlanoPagamento={consultaChoice} setIdPlanoPagamento={setPlanoPagamentoChoice} callback={requestAllPlanoPagamentos} />
            }

            {
                cancelarPlanoPagamento &&
                <Excluir cancelarPlanoPagamento={cancelarPlanoPagamento} setExcluirPlanoPagamento={setExcluirPlanoPagamento}  idPlanoPagamento={consultaChoice} setIdPlanoPagamento={setPlanoPagamentoChoice} callback={requestAllPlanoPagamentos} />
            }

            {
                visualizarPlanoPagamento &&
                <Visualizar visualizarPlanoPagamento={visualizarPlanoPagamento} setVisualizarPlanoPagamento={setVisualizarPlanoPagamento}  idPlanoPagamento={consultaChoice} setIdPlanoPagamento={setPlanoPagamentoChoice} callback={requestAllPlanoPagamentos} />
            }
           
         </>
    )
}

export default Include;