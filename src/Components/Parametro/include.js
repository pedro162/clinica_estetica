import React from 'react'
import estilos from './Parametro.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'
import { faHome, faSearch, faPlus, faPen, faHandHoldingUsd, faList, faFile, faTrash, faHandHolding, faUser, faUserCircle, faEllipsisH, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import Atualizar from './Atualizar/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'

const Include = ({dataEstado, loadingData, requestAllParametros, callBack, setMostarFiltros, nadaEncontrado, idParametroCriado, nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setParametro] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarParametro, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setParametroChoice] = React.useState(null);
    const [atualizarParametro, setAtualizarParametro] = React.useState(false)  
    const [baixarParametro, setBaixarParametro] = React.useState(false)   
    const [estornarParametro, setEstornarParametro] = React.useState(false)   
    const [cancelarParametro, setCancelarParametro] = React.useState(false)   
    const [digitarParametro, setDigitarParametro] = React.useState(false)    
    const [cadastrarParametro, setCadastrarParametro] = React.useState(false)  
    const [incicarParametro, setIniciarParametro] = React.useState(false) 
    const [visualizarMovimentacoes, setVisualizarMovimentacoes] = React.useState(false)  
    const [defaultFiltersMovimentacoes, setDefaultFiltersMovimentacoes] = React.useState({})
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)

    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')

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

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Parãmetro',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name_atendido':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
    ]

    const acoesBottomCard=[{
        label:'Pesquisar',
        icon:<FontAwesomeIcon icon={faSearch} />,
        props:{onClick:()=>requestAllParametros(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setIniciarParametro(true), className:'btn btn-sm mx-2 btn-secondary'}
    }
    ];


    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarParametro(true);
                }else{
                    setAtualizarParametro(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarParametro == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarParametro])

    const atualizarParametroAction = (idParametro)=>{
        setParametroChoice(idParametro)
        setAcao('editar')
        setAtualizarParametro(true);
    }

    const gerarTableParametro = ()=>{
       
        let data = [];
        let dataParametro = estado
        
        if(dataParametro?.mensagem){
            dataParametro = dataParametro?.mensagem;
        }

        if(dataParametro?.data){
            dataParametro = dataParametro?.data;
        }

        if(dataParametro && Array.isArray(dataParametro) && dataParametro.length > 0){
            for(let i=0; !(i == dataParametro.length); i++){
                let atual = dataParametro[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar                   = true;
                    let baixar                      = true;
                    let btnFinalizar                = true;
                    let estornar                    = true;
                    let btnVisualizarMovimentacoes  = true;
                    let btnVisualizar               = true;
                    let btnCotinuarDigitacao        = true;
                    let btnCancelar                 = true;

                    if(atual?.status != 'pago'){
                        estornar= false;
                    }else if(atual?.status != 'aberto'){
                        estornar    = false;
                        btnEditar   = false;
                    }else{

                        btnCotinuarDigitacao    = false;
                        btnFinalizar            = false;
                        baixar  = false;
                        acoesArr                = [];
                        btnEditar               = false;
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarParametroAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    let line_style = {}
                    if(atual.status == 'devolvido'){
                        line_style.color = 'red';
                    }else if(atual.status == 'pago'){
                        line_style.color = 'green';
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

                                    label:atual.name,
                                    propsRow:{}
                                },
                                {

                                    label:atual.value,
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
                label:'Parametro',
                props:{
                    style:{minWidth:'50px'}
                }
            },
            {
                label:'Valor',
                props:{
                    style:{minWidth:'255px'}
                }
            }
        ]

        return tableTitle;
    }

    const gerarListMobileParametro = ()=>{
       
        let data = [];
        let dataParametro = estado

        if(dataParametro?.mensagem){
            dataParametro = dataParametro?.mensagem;
        }

        if(dataParametro?.data){
            dataParametro = dataParametro?.data;
        }

        if(dataParametro && Array.isArray(dataParametro) && dataParametro.length > 0){
            for(let i=0; !(i == dataParametro.length); i++){
                let atual = dataParametro[i];
                if(atual && atual.id > 0){
                    let acoesArr = [];
                    let btnEditar                   = true;
                    let baixar                      = true;
                    let btnFinalizar                = true;
                    let estornar                    = true;
                    let btnVisualizarMovimentacoes  = true;
                    let btnVisualizar               = true;
                    let btnCotinuarDigitacao        = true;
                    let btnCancelar                 = true;

                    if(atual?.status != 'pago'){
                        estornar= false;
                    }else if(atual?.status != 'aberto'){
                        estornar    = false;
                        btnEditar   = false;
                    }else{

                        btnCotinuarDigitacao    = false;
                        btnFinalizar            = false;
                        baixar  = false;
                        acoesArr                = [];
                        btnEditar               = false;
                    }


                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarParametroAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnCancelar){
                        
                    }

                    let line_style = {}

                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow: atual.id+' - '+atual?.name, style:{...line_style}, mainIcon:faChartLine},
                            acoes:[
                                ...acoesArr
                            ],
                            title:<> <div style={{display:'flex', justifyContent:'space-between',fontSize:'18pt', fontWeight:'bolder'}} ><span><FontAwesomeIcon size={'lg'} icon={faUserCircle}/> {atual?.name} </span> </div> </>,
                            propsContainerTitulo:{md:'11', sm:'9', xs:'9'},
                            propsContainerButtons:{md:'1', sm:'3', xs:'3'},
                            acoesBottomCard:[
                               {label:'', props:{onClick:()=>atualizarParametroAction(atual?.id), className:'btn  btn-sm mx-2 btn-primary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faPen} />},
                               {props:{onClick:()=>atualizarParametroAction(atual?.id), className:'btn  btn-sm mx-2 btn-danger', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faTrash} /> },
                            ],
                            celBodyTableArr:[
                                [
                                    {
                                        title:<span style={{fontWeight:'480'}}>Cód. pessoa: </span>,
                                        label:atual?.pessoa_id,
                                        props:{style:{textAlign:'left', md:'1', sm:'1', xs:'1'}},
                                        toSum:1,
                                        isCoin:1,
                                    },{
                                        title:<span style={{fontWeight:'480'}}>Aberto R$: </span>,
                                        label:atual?.name,
                                        props:{style:{textAlign:'left', md:'4', sm:'4', xs:'4'}},
                                        toSum:1,
                                        isCoin:1,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Status </span>,
                                        label:atual?.status,
                                        props:{style:{textAlign:'left', fontWeight:'bolder', md:'3', sm:'3', xs:'3'}},
                                        toSum:1,
                                        isCoin:1,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Vencimento </span>,
                                        label:atual.dtVencimento,
                                        props:{style:{textAlign:'left', md:'4', sm:'4', xs:'4'}},
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
        setParametro(dataEstado)
        setNrPageAtual(dataEstado?.mensagem?.current_page)
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado])
    

    const rowsTableArr = gerarTableParametro();    
    const titulosTableArr = gerarTitleTable();
    const dataParametroRelatorio = estado.mensagem;

    return(
        <>
            <Row >
                <Col  xs="12" sm="12" md="12" className={'mobile_card_report py-4'}  style={{backgroundColor:'#FFF'}}> 
                    <ListMobile
                        titulosTableArr={null}
                        rowsTableArr={gerarListMobileParametro()}
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

        </>
    )
}

export default Include;