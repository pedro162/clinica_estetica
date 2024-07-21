import React from 'react'
import estilos from './Servico.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ALL_POST, SERVICO_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faUserCircle, faHandHoldingUsd,faHandHolding, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormServico from './FormServico/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import ContasReceber from '../ContasReceber/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'
import { Button } from 'bootstrap';
import reactDom from 'react-dom';
//

const Include = ({dataEstado, loadingData, nadaEncontrado, callBack, setMostarFiltros, idOrdemCriada,nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setServico] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarServico, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setServicoChoice] = React.useState(null);
    const [atualizarServico, setAtualizarServico] = React.useState(false)   
    const [cancelarServico, setCancelarServico] = React.useState(false)   
    const [digitarServico, setDigitarServico] = React.useState(false)    
    const [cadastrarServico, setCadastrarServico] = React.useState(false)
    const [visualizarContasReceber, setVisualizarContasReceber] = React.useState(false)  
    const [atualizarCabecalhoServico, setAtualizarCabecalhoServico] = React.useState(false)  
    const [finalizarServico, setFinalizarServico] = React.useState(false)  
    const [incicarServico, setIniciarServico] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [defaultFiltersCobReceber, setDefaultFiltersCobReceber] = React.useState({})
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)

    const {getToken} = React.useContext(UserContex);

    
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
                    setAtualizarServico(true);
                }else{
                    setAtualizarServico(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarServico(true);
                }else{
                    setCancelarServico(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarServico == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarServico])

    const atualizarServicoAction = (idServico)=>{
        setServicoChoice(idServico)
        setAcao('editar')
        setAtualizarServico(true);
    }
    const cancelarServicoAction = (idServico)=>{
        setServicoChoice(idServico)
        setAcao('cancelar')
        setCancelarServico(true);
    }
    //cancelarServico, setCancelarServico
    const novaServico = (idServico)=>{
        setServicoChoice(idServico)
        setAcao('consultar')
        setAtualizarServico(true);
    }

    const gerarTableServico = ()=>{
       
        let data = [];
        let dataServico = estado

        if(dataServico?.mensagem){
            dataServico = dataServico?.mensagem;
        }

        if(dataServico?.data){
            dataServico = dataServico?.data;
        }

        if(dataServico && Array.isArray(dataServico) && dataServico.length > 0){
            for(let i=0; !(i == dataServico.length); i++){
                let atual = dataServico[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar           = true;

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarServicoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    
                    //'remarcado','finalizado','cancelado','pendente'
                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                ...acoesArr
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

                                    label:atual.vrServico,
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
                label:'Descrição',
                props:{}
            },
            {
                label:'Valor',
                props:{}
            }
        ]

        return tableTitle;
    }
   //name_profissional


   const gerarListMobileRelatorio = ()=>{
       
        let data = [];
        let dataServico = estado

        if(dataServico?.mensagem){
            dataServico = dataServico?.mensagem;
        }

        if(dataServico?.data){
            dataServico = dataServico?.data;
        }

        if(dataServico && Array.isArray(dataServico) && dataServico.length > 0){
            for(let i=0; !(i == dataServico.length); i++){
                let atual = dataServico[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar           = true;

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarServicoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                   
                    let line_style = {}
                    if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
                    } 

                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {//
                            propsRow:{id:(atual.id), titleRow:atual?.name, style:{...line_style}, mainIcon:faTasks},
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
                                        title:<span style={{fontWeight:'480'}}>código: </span>,
                                        label:atual?.id,
                                        props:{style:{textAlign:'left'}},
                                        toSum:1,
                                        isCoin:1,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Valor R$: </span>,
                                        label:FORMAT_MONEY(atual?.vrServico),
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

    React.useEffect(()=>{
        setServico(dataEstado)
        setNrPageAtual(dataEstado?.mensagem?.current_page)
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado])
    

    const rowsTableArr = gerarTableServico();    
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
                        nadaEncontrado={nadaEncontrado}
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
                atualizarServico &&
                <Atualizar atualizarServico={atualizarServico} setAtualizarServico={setAtualizarServico}  idServico={consultaChoice} setIdServico={setServicoChoice} callback={callBack} />
            }
        
        </>
    )
}

export default Include;