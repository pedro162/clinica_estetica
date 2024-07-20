import React from 'react';
import estilos from './MovimentacoesFinanceira.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR, FORMAT_MONEY} from '../../functions/index.js'
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
import Visualizar from './Visualizar/index.js'
import Origem from './Origem/index.js'


const Include = ({dataEstado, loadingData, nadaEncontrado, callBack, setMostarFiltros, idMovimentacoesFinanceiraCriada, nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount,  ...props})=>{

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
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)
    const [visualizarMovimentacoesFinanceira, setVisualizarMovimentacoesFinanceira] = React.useState(false)  
    const [visualizarOrigemMovimentacoesFinanceira, setVisualizarOrigemMovimentacoesFinanceira] = React.useState(false)  


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

            case 'vusializar':
                if(consultaChoice > 0){
                    setVisualizarMovimentacoesFinanceira(true);
                }else{
                    setVisualizarMovimentacoesFinanceira(false);
                }
                break;  

            case 'origem':
                if(consultaChoice > 0){
                    setAtualizarMovimentacoesFinanceira(true);
                }else{
                    setAtualizarMovimentacoesFinanceira(false);
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
    
    const visualizarMovimentacoesFinanceiraAction = (idMovimentacoesFinanceira)=>{
        setMovimentacoesFinanceiraChoice(idMovimentacoesFinanceira)
        setAcao('visualizar')
        setVisualizarMovimentacoesFinanceira(true);
    }
    
    const visualizarOrigemMovimentacoesFinanceiraAction = (idMovimentacoesFinanceira)=>{
        setMovimentacoesFinanceiraChoice(idMovimentacoesFinanceira)
        setAcao('origem')
        setVisualizarOrigemMovimentacoesFinanceira(true);
    }

    const gerarTableMovimentacoesFinanceira = ()=>{
       
        let data = [];
        let dataMovimentacoesFinanceira = estado
        if(dataMovimentacoesFinanceira?.mensagem){
            dataMovimentacoesFinanceira = dataMovimentacoesFinanceira?.mensagem;
        }

        if(dataMovimentacoesFinanceira?.data){
            dataMovimentacoesFinanceira = dataMovimentacoesFinanceira?.data;
        }
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
                    let btnOrigem           = true;


                    if(btnDetalhes){
                        acoesArr.push({acao:()=>visualizarMovimentacoesFinanceiraAction(atual.id), label:'Detalhes', propsOption:{}, propsLabel:{}})
                    }


                    if(btnOrigem){
                        acoesArr.push({acao:()=>visualizarOrigemMovimentacoesFinanceiraAction(atual.id), label:'Origem', propsOption:{}, propsLabel:{}})
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

                                    label:atual.caixa_id,
                                    propsRow:{}
                                },
                                
                                {

                                    label:atual.historico,
                                    propsRow:{}
                                },
                                {

                                    label:atual.conciliado == 'yes' ? 'Sim' : 'Não',
                                    propsRow:{}
                                },
                                {

                                    label:atual.estornado == 'yes' ? 'Sim' : 'Não',
                                    propsRow:{}
                                },
                                {

                                    label:FORMAT_DATA_PT_BR(atual.created_at),
                                    propsRow:{}
                                },
                                {

                                    label: atual?.tp_movimentacao == 'negativa' ? ( atual.vr_movimentacao > 0 ? FORMAT_MONEY(atual.vr_movimentacao) : 0) : 0,
                                    propsRow:{},
									toSum:1,
									isCoin:1,
                                },
                                {

                                    label: atual?.tp_movimentacao == 'positiva' ? ( atual.vr_movimentacao > 0 ? FORMAT_MONEY(atual.vr_movimentacao) : 0) : 0,
                                    propsRow:{},
									toSum:1,
									isCoin:1,
                                },
                                {

                                    label:FORMAT_MONEY(atual.vr_saldo),
                                    propsRow:{},
									toSum:1,
									isCoin:1,
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
                label:'Cód. caixa',
                props:{}
            },
            {
                label:'Status',
                props:{}
            },
            {
                label:'Conciliado',
                props:{}
            },
            {
                label:'Estornado',
                props:{}
            },
            {
                label:'Data movimentação',
                props:{}
            },
            {
                label:'Debito',
                props:{}
            },
            {
                label:'Crédito',
                props:{}
            },
            {
                label:'Saldo',
                props:{}
            },
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
                    let btnCancelar         = true;
                    let btnEditar           = true;
                    let btnExames           = true;
                    let btnDiagnostico      = true;
                    let btnFicha            = true;
                    let btnDetalhes         = true;
                    let btnOrigem           = true;


                    if(btnDetalhes){
                        acoesArr.push({acao:()=>visualizarMovimentacoesFinanceiraAction(atual.id), label:'Detalhes', propsOption:{}, propsLabel:{}})
                    }


                    if(btnOrigem){
                        acoesArr.push({acao:()=>visualizarOrigemMovimentacoesFinanceiraAction(atual.id), label:'Origem', propsOption:{}, propsLabel:{}})
                    }

                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow: atual?.id+' - '+atual?.historico, style:{...line_style}},
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
                                        title:<span style={{fontWeight:'bolder'}}>Caixa: </span>,
                                        label:atual?.caixa_id,
                                        props:{style:{textAlign:'left'}, md:'3', sm:'3', xs:'3'},
                                        toSum:0,
                                        isCoin:0,
                                    },
                                    {
                                        title:<span style={{fontWeight:'bolder'}}>Op: </span>,
                                        label: atual?.tp_movimentacao == 'negativa' ? 'D' : 'C',
                                        props:{style:{textAlign:'left', fontWeight:'bolder'}, md:'2', sm:'2', xs:'2'},
                                        toSum:0,
                                        isCoin:0,
                                    },
                                    {
                                        title:<span style={{fontWeight:'bolder'}}>Valor: </span>,
                                        label:FORMAT_MONEY(atual?.vr_movimentacao),
                                        props:{style:{textAlign:'left'}, md:'3', sm:'3', xs:'3'},
                                        toSum:0,
                                        isCoin:0,
                                    },
                                    {
                                        title:<span style={{fontWeight:'bolder'}}>DT movimentação: </span>,
                                        label:(FORMAT_DATA_PT_BR(atual?.created_at)),
                                        props:{style:{textAlign:'left'}, md:'4', sm:'4', xs:'4'},
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
        if(json){
            //setMovimentacoesFinanceira(json)
        }

            
    }

    React.useEffect(()=>{
        setMovimentacoesFinanceira(dataEstado)
        setNrPageAtual(dataEstado?.mensagem?.current_page)
        handleTotalPages();
        handleTotalItems();
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
                        botoesHeader={[]}nextPage={nextPage}
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
                /*atualizarMovimentacoesFinanceira && consultaChoice > 0 &&
                <Atualizar atualizarMovimentacoesFinanceira={atualizarMovimentacoesFinanceira} setAtualizarMovimentacoesFinanceira={setAtualizarMovimentacoesFinanceira}  idMovimentacoesFinanceira={consultaChoice} setIdMovimentacoesFinanceira={setMovimentacoesFinanceiraChoice} callback={requestAllMovimentacoesFinanceiras} />
            */}

            {
                visualizarMovimentacoesFinanceira && consultaChoice > 0 &&
                <Visualizar idMovimentacoesFinanceira={consultaChoice} setIdMovimentacoesFinanceira={setMovimentacoesFinanceiraChoice} setVisualizarMovimentacoesFinanceira={setVisualizarMovimentacoesFinanceira} callback={callBack} />
            }

            {
                visualizarOrigemMovimentacoesFinanceira && consultaChoice > 0 &&
                <Origem idMovimentacoesFinanceira={consultaChoice} setIdMovimentacoesFinanceira={setMovimentacoesFinanceiraChoice} setVisualizarOrigemMovimentacoesFinanceira={setVisualizarOrigemMovimentacoesFinanceira} callback={callBack} />
            }

           
         </>

    )
}

export default Include;