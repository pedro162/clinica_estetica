import React from 'react';
import estilos from './Filial.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, FILIAIS_ALL_POST} from '../../api/endpoints/geral.js'
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
import FormFilial from './FormFilial/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'


const Include = ({dataEstado, loadingData, nadaEncontrado, callBack, setMostarFiltros, idFilialCriada, nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount, ...props})=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setFilial] = React.useState([])
    const [showModalCriarFilial, setShowModalCriarConstula] = React.useState(false)
    const [filialChoice, setFilialChoice] = React.useState(null);
    const [atualizarFilial, setAtualizarFilial] = React.useState(false)   
    const [cancelarFilial, setCancelarFilial] = React.useState(false)    
    const [cadastrarFilial, setCadastrarFilial] = React.useState(false) 
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


    const alerta = (target)=>{
        console.log(target)
    }

    const setNamePessoa = ({target})=>{
        
        setPessoa(target.value)
    }


    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(filialChoice > 0){
                    setAtualizarFilial(true);
                }else{
                    setAtualizarFilial(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [filialChoice, acao])

    React.useEffect(()=>{

        if(cadastrarFilial == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarFilial])

    const atualizarFilialAction = (idFilial)=>{
        setFilialChoice(idFilial)
        setAcao('editar')
        setAtualizarFilial(true);
    }
    //cancelarFilial, setCancelarFilial
    const novaFilial = (idFilial)=>{
        setFilialChoice(idFilial)
        setAcao('consultar')
        setAtualizarFilial(true);
    }

    const gerarTableFilial = ()=>{
       
        let data = [];
        //let dataFilial = estado.mensagem
        let dataFilial = estado

        if(dataFilial?.mensagem){
            dataFilial = dataFilial?.mensagem;
        }

        if(dataFilial?.data){
            dataFilial = dataFilial?.data;
        }

        if(dataFilial && Array.isArray(dataFilial) && dataFilial.length > 0){
            for(let i=0; !(i == dataFilial.length); i++){
                let atual = dataFilial[i];
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

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarFilialAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
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

                                    label:atual?.id,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.pessoa_id,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.name_filial,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.documento,
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
                label:'Cód. pessoa',
                props:{}
            },
            {
                label:'Pessoa',
                props:{}
            },
            {
                label:'CNPJ',
                props:{}
            },
        ]

        return tableTitle;
    }
   

    const gerarListMobileRelatorio = ()=>{
       
        let data = [];
        let dataFilial = estado
        if(dataFilial?.mensagem){
            dataFilial = dataFilial?.mensagem;
        }

        if(dataFilial?.data){
            dataFilial = dataFilial?.data;
        }
        if(dataFilial && Array.isArray(dataFilial) && dataFilial.length > 0){
            for(let i=0; !(i == dataFilial.length); i++){
                let atual = dataFilial[i];
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

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarFilialAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow: atual?.id+' - '+atual?.name_filial, style:{...line_style}},
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
                                        title:<span style={{fontWeight:'480'}}>Filial: </span>,
                                        label:atual?.name_filial,
                                        props:{style:{textAlign:'left'}, md:'6', sm:'6', xs:'6'},
                                        toSum:0,
                                        isCoin:0,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>CNPJ: </span>,
                                        label:atual?.documento,
                                        props:{style:{textAlign:'left'}, md:'6', sm:'6', xs:'6'},
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

    const requestAllFilials = async() =>{
       
        const {url, options} = FILIAIS_ALL_POST({'name_filial':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All clients here')
        console.log({'name_filial':pessoa})
        console.log(json)
        if(json){
            setFilial(json)
        }

            
    }

    React.useEffect(()=>{
        setFilial(dataEstado)
        setNrPageAtual(dataEstado?.mensagem?.current_page)
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado])
  

    const rowsTableArr = gerarTableFilial();    
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
                cadastrarFilial && <Cadastrar cadastrarFilial={cadastrarFilial} setCadastrarFilial={setCadastrarFilial} atualizarFilial={atualizarFilial} setAtualizarFilial={setAtualizarFilial}  idFilial={filialChoice} setIdFilial={setFilialChoice} callback={callBack} />
            }
            
            {
                atualizarFilial &&
                <Atualizar atualizarFilial={atualizarFilial} setAtualizarFilial={setAtualizarFilial}  idFilial={filialChoice} setIdFilial={setFilialChoice} callback={callBack} />
            }
         </>

    )
}

export default Include;