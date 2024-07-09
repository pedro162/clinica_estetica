import React from 'react'
import estilos from './Caixa.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row } from 'react-bootstrap';
import FormControlInput from '../FormControl/index.js'
import Table from '../Relatorio/Table/index.js'
import CardMobile from '../Relatorio/CardMobile/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'

import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faPen, faHandHoldingUsd, faList, faFile, faTrash, faHandHolding, faUser, faUserCircle, faEllipsisH, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Card from '../Utils/Card/index.js'
import MovimentacoesFinanceiras from '../MovimentacoesFinanceiras/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'


const Include = ({dataEstado, loadingData, callBack, setMostarFiltros, nadaEncontrado, nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setCaixa] = React.useState([])
    const [showModalCriarCaixa, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setCaixaChoice] = React.useState(null);
    const [atualizarCaixa, setAtualizarCaixa] = React.useState(false)
    const [cadastrarCaixa, setCadastrarCaixa] = React.useState(false)  
    const [incicarCaixa, setIniciarCaixa] = React.useState(false) 
    const [visualizarMovimentacoes, setVisualizarMovimentacoes] = React.useState(false)  
    const [defaultFiltersMovimentacoes, setDefaultFiltersMovimentacoes] = React.useState({})
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)

    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')


    const {getToken} = React.useContext(UserContex);

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

    const filtersArr = [
        
    ]
    
    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarCaixa(true);
                }else{
                    setAtualizarCaixa(false);
                }
                break;
            case 'movimentacao_financeira':
                if(consultaChoice > 0){
                    setVisualizarMovimentacoes(true);
                }else{
                    setVisualizarMovimentacoes(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarCaixa == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarCaixa])

    const atualizarCaixaAction = (idCaixa)=>{
        setCaixaChoice(idCaixa)
        setAcao('editar')
        setAtualizarCaixa(true);
    }

    const visualizarMovimentacoesActions = (idCaixa)=>{
        setCaixaChoice(idCaixa)
        setAcao('movimentacao_financeira')
        setVisualizarMovimentacoes(true);
    }



    const gerarTableCaixa = ()=>{
       
        let data = [];
        let dataCaixa = estado

        if(dataCaixa?.mensagem){
            dataCaixa = dataCaixa?.mensagem;
        }

        if(dataCaixa?.data){
            dataCaixa = dataCaixa?.data;
        }
        if(dataCaixa && Array.isArray(dataCaixa) && dataCaixa.length > 0){
            for(let i=0; !(i == dataCaixa.length); i++){
                let atual = dataCaixa[i];
                if(atual){
                    let acoesArr = [];

                    let line_style = {}

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

                                    label:atual.name,
                                    propsRow:{}
                                },
                                {

                                    label:atual.type,
                                    propsRow:{}
                                },
                                {

                                    label:atual.status_abertura,
                                    propsRow:{}
                                },
                                {

                                    label:atual.status_bloqueio,
                                    propsRow:{}
                                },
                                {

                                    label:(atual.aceita_transferencia=='yes' ? 'Sim' : 'Não'),
                                    propsRow:{}
                                },
                                {

                                    label:FORMAT_MONEY(atual?.vrSaldo),
                                    propsRow:{},
									toSum:1,
									isCoin:1,
                                },
                                {

                                    label:FORMAT_MONEY(atual?.vrMin),
                                    propsRow:{},
									toSum:1,
									isCoin:1,
                                },
                                {

                                    label:FORMAT_MONEY(atual?.vrMax),
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
                label:'Filial',
                props:{
                    style:{minWidth:'255px'}
                }
            },
            {
                label:'Nome',
                props:{
                    style:{minWidth:'255px'}
                }
            },
            {
                label:'Tipo',
                props:{
                    style:{minWidth:'255px'}
                }
            },
            {
                label:'Status bertura',
                props:{
                    style:{minWidth:'100px'}
                }
            },
            {
                label:'Status bloqueio',
                props:{
                    style:{minWidth:'150px'}
                }
            },
            {
                label:'Aceita transferência',
                props:{
                    style:{minWidth:'150px'}
                }
            },
            {
                label:'Valor de saldo',
                props:{
                    style:{minWidth:'150px'}
                }
            },
            {
                label:'Valor mínímo',
                props:{
                    style:{minWidth:'150px'}
                }
            },
            {
                label:'Valor máximo',
                props:{
                    style:{minWidth:'150px'}
                }
            },
        ]

        return tableTitle;
    }


    const gerarCardCaixa = ()=>{
       
        let data = [];
        let dataCaixa = estado

        if(dataCaixa?.mensagem){
            dataCaixa = dataCaixa?.mensagem;
        }

        if(dataCaixa?.data){
            dataCaixa = dataCaixa?.data;
        }
        if(dataCaixa && Array.isArray(dataCaixa) && dataCaixa.length > 0){
            for(let i=0; !(i == dataCaixa.length); i++){
                let atual = dataCaixa[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar                   = true;

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarCaixaAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                ...acoesArr
                            ],
                            title:<> <div style={{display:'flex', justifyContent:'space-between',fontSize:'18pt', fontWeight:'bolder'}} ><span><FontAwesomeIcon size={'lg'} icon={faUserCircle}/> {atual?.name} </span> </div> </>,
                            propsContainerTitulo:{md:'11', sm:'9', xs:'9'},
                            propsContainerButtons:{md:'1', sm:'3', xs:'3'},
                            acoesBottomCard:[
                               {label:'', props:{onClick:()=>atualizarCaixaAction(atual?.id), className:'btn  btn-sm mx-2 btn-primary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faPen} />},
                               {props:{onClick:()=>atualizarCaixaAction(atual?.id), className:'btn  btn-sm mx-2 btn-danger', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faTrash} /> },
                            ],
                            celBodyTableArr:[
                                [
                                    {
                                        title:<span style={{fontWeight:'bolder'}}>Nome: </span>,
                                        label:atual?.name,
                                        props:{style:{textAlign:'left'}},
                                        toSum:1,
                                        isCoin:1,
                                    },
                                    {
                                        title:<span style={{fontWeight:'bolder'}}>Saldo R$: </span>,
                                        label:FORMAT_MONEY(atual?.vrSaldo),
                                        props:{style:{textAlign:'left'}},
                                        toSum:1,
                                        isCoin:1,
                                    },

                                ]
                               
                               
                            ]
                        }

                    )

                }

            }
        }

        return data;
    }

    const gerarListMobileCaixa = ()=>{
       
        let data = [];
        let dataCaixa = estado

        if(dataCaixa?.mensagem){
            dataCaixa = dataCaixa?.mensagem;
        }

        if(dataCaixa?.data){
            dataCaixa = dataCaixa?.data;
        }

        if(dataCaixa && Array.isArray(dataCaixa) && dataCaixa.length > 0){
            for(let i=0; !(i == dataCaixa.length); i++){
                let atual = dataCaixa[i];
                if(atual && atual.id > 0){
                    let acoesArr = [];
                    let btnEditar                   = true;
                    let btnVisualizarMovimentacoes  = true;

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarCaixaAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnVisualizarMovimentacoes){
                        acoesArr.push({acao:()=>{visualizarMovimentacoesActions(atual.id); setDefaultFiltersMovimentacoes({...atual, referencia_id:atual?.id, referencia:'contas_receber'})}, label:'Movimentações', propsOption:{}, propsLabel:{}})
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
                               {label:'', props:{onClick:()=>atualizarCaixaAction(atual?.id), className:'btn  btn-sm mx-2 btn-primary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faPen} />},
                               {props:{onClick:()=>atualizarCaixaAction(atual?.id), className:'btn  btn-sm mx-2 btn-danger', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faTrash} /> },
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
                                        label:FORMAT_MONEY(atual?.vrAberto),
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
                                        label:FORMAT_DATA_PT_BR(atual.dtVencimento),
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
   

    //------------

    const requestAllCaixas = async() =>{
       
        const {url, options} = ORDEM_SERVICO_ALL_POST({'name_servico':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All serviços here')
        console.log({'name_servico':pessoa})
        console.log(json)
        if(json){
            setCaixa(json)
        }

            
    }


    React.useEffect(()=>{
        setCaixa(dataEstado)
        setNrPageAtual(dataEstado?.mensagem?.current_page)
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado])
    

    const rowsTableArr = gerarTableCaixa();    
    const titulosTableArr = gerarTitleTable();
    //
    return(
        <>
            <Row >
                <Col  xs="12" sm="12" md="12" className={'mobile_card_report py-4'}  style={{backgroundColor:'#FFF'}}>

                   
                    
                    <ListMobile
                        titulosTableArr={null}
                        rowsTableArr={gerarListMobileCaixa()}
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
                        botoesHeader={[/* {acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> } */]}
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
                cadastrarCaixa && <Cadastrar cadastrarCaixa={cadastrarCaixa} setCadastrarCaixa={setCadastrarCaixa} atualizarCaixa={atualizarCaixa} setAtualizarCaixa={setAtualizarCaixa}  idCaixa={consultaChoice} setIdCaixa={setCaixaChoice} callback={callBack} />
            }
            
            {
                atualizarCaixa &&
                <Atualizar atualizarCaixa={atualizarCaixa} setAtualizarCaixa={setAtualizarCaixa}  idCaixa={consultaChoice} setIdCaixa={setCaixaChoice} callback={callBack} />
            }
            

            {
                visualizarMovimentacoes &&
                <Modal noBtnCancelar={false} noBtnConcluir={true} handleConcluir={()=>null}  title={'Contas a receber'} size="lg" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={consultaChoice} showHide={()=>{setVisualizarMovimentacoes(false);}}>
                    
                    <MovimentacoesFinanceiras defaultFilters={defaultFiltersMovimentacoes} visualizarMovimentacoes={visualizarMovimentacoes} setVisualizarMovimentacoes={setVisualizarMovimentacoes} setAtualizarCaixa={setAtualizarCaixa} setAtualizarCaixa={setAtualizarCaixa} idReferencia={consultaChoice} referencia={'contas_receber'}  idCobrancaReceber={consultaChoice} setIdCaixa={setCaixaChoice} callback={callBack} />
                
                </Modal>
            }

        </>
    )
}

export default Include;