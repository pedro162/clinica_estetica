import React from 'react'
import estilos from './Grupos.module.css'
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
import FormGrupo from './FormGrupo/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import ContasReceber from '../ContasReceber/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'
import { Button } from 'bootstrap';
import reactDom from 'react-dom';
//

const Include = ({dataEstado, loadingData, nadaEncontrado, callBack, setMostarFiltros, idGrupoCriado, nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setGrupo] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarGrupo, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setGrupoChoice] = React.useState(null);
    const [atualizarGrupo, setAtualizarGrupo] = React.useState(false)   
    const [cancelarGrupo, setCancelarGrupo] = React.useState(false)   
    const [digitarGrupo, setDigitarGrupo] = React.useState(false)    
    const [cadastrarGrupo, setCadastrarGrupo] = React.useState(false)
    const [visualizarContasReceber, setVisualizarContasReceber] = React.useState(false)  
    const [atualizarCabecalhoGrupo, setAtualizarCabecalhoGrupo] = React.useState(false)  
    const [finalizarGrupo, setFinalizarGrupo] = React.useState(false)  
    const [incicarGrupo, setIniciarGrupo] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [defaultFiltersGrupo, setDefaultFiltersGrupo] = React.useState({})
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)


    const {getToken} = React.useContext(UserContex);

    

    const handleTotalPages=()=>{
        if(Number(dataEstado?.mensagem?.last_page > 0)){
            setTotalPageCount(dataEstado?.mensagem?.last_page)
        }
        if(Number(dataEstado?.registro?.last_page > 0)){
            setTotalPageCount(dataEstado?.registro?.last_page)
        }
    }

    const handleTotalItems=()=>{
        if(Number(dataEstado?.mensagem?.to > 0)){
            setQtdItemsTo(dataEstado?.mensagem?.to)
        }
        if(Number(dataEstado?.registro?.to > 0)){
            setQtdItemsTo(dataEstado?.registro?.to)
        }

        if(Number(dataEstado?.mensagem?.total > 0)){
            setQtdItemsTotal(dataEstado?.mensagem?.total)
        }

        if(Number(dataEstado?.registro?.total > 0)){
            setQtdItemsTotal(dataEstado?.registro?.total)
        }
    }

    const nextPageRout = ()=>{       
        if(dataEstado?.mensagem?.next_page_url){
            setNextPage(dataEstado?.mensagem?.next_page_url)
        }
        if(dataEstado?.registro?.next_page_url){
            setNextPage(dataEstado?.registro?.next_page_url)
        }
    }

    const previousPageRout = ()=>{       
        if(dataEstado?.mensagem?.prev_page_url){
            setNextPage(dataEstado?.mensagem?.prev_page_url)
        }

        if(dataEstado?.registro?.prev_page_url){
            setNextPage(dataEstado?.registro?.prev_page_url)
        }
    }

    const firstPageRout = ()=>{       
        if(dataEstado?.mensagem?.first_page_url){
            setNextPage(dataEstado?.mensagem?.first_page_url)
        }
        if(dataEstado?.registro?.first_page_url){
            setNextPage(dataEstado?.registro?.first_page_url)
        }
    }

    const lastPageRout = ()=>{       
        if(dataEstado?.mensagem?.last_page_url){
            setNextPage(dataEstado?.mensagem?.last_page_url)
        }

        if(dataEstado?.registro?.last_page_url){
            setNextPage(dataEstado?.registro?.last_page_url)
        }
    }

    const setNamePessoa = ({target})=>{
        
        setPessoa(target.value)
    }

    const filtersArr = [

    ]

    const acoesBottomCard=[
    ];


    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarGrupo(true);
                }else{
                    setAtualizarGrupo(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarGrupo(true);
                }else{
                    setCancelarGrupo(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarGrupo == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarGrupo])

    const atualizarGrupoAction = (idGrupo)=>{
        setGrupoChoice(idGrupo)
        setAcao('editar')
        setAtualizarGrupo(true);
    }
    const cancelarGrupoAction = (idGrupo)=>{
        setGrupoChoice(idGrupo)
        setAcao('cancelar')
        setCancelarGrupo(true);
    }
    //cancelarGrupo, setCancelarGrupo
    const novaGrupo = (idGrupo)=>{
        setGrupoChoice(idGrupo)
        setAcao('consultar')
        setAtualizarGrupo(true);
    }


    const gerarTableGrupo = ()=>{
       
        let data = [];
        
        let dataGrupos = estado
        if(dataGrupos?.mensagem){
            dataGrupos = dataGrupos?.mensagem;
        }
        if(dataGrupos?.registro){
            dataGrupos = dataGrupos?.registro;
        }

        if(dataGrupos?.data){
            dataGrupos = dataGrupos?.data;
        }

        if(dataGrupos && Array.isArray(dataGrupos) && dataGrupos.length > 0){
            for(let i=0; !(i == dataGrupos.length); i++){
                let atual = dataGrupos[i];
                if(atual){


                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                {acao:()=>atualizarGrupoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
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

                                    label:atual.descricao,
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
                label:'Nome',
                props:{}
            },
            {
                label:'Descrição',
                props:{}
            },
        ]

        return tableTitle;
    }
   //name_profissional


   const gerarListMobileRelatorio = ()=>{
       
        let data = [];

        let dataGrupo = estado

        if(dataGrupo?.mensagem){
            dataGrupo = dataGrupo?.mensagem;
        }
        if(dataGrupo?.registro){
            dataGrupo = dataGrupo?.registro;
        }

        if(dataGrupo?.data){
            dataGrupo = dataGrupo?.data;
        }

        if(dataGrupo && Array.isArray(dataGrupo) && dataGrupo.length > 0){
            for(let i=0; !(i == dataGrupo.length); i++){
                let atual = dataGrupo[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar    = true;
                    let line_style = {}
                    acoesArr.push({acao:()=>atualizarGrupoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})

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
                                        title:<span style={{fontWeight:'480'}}>Código: </span>,
                                        label:atual?.id,
                                        props:{style:{textAlign:'left', xs:"2", sm:"2", md:"2"}},
                                        toSum:1,
                                        isCoin:1,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Descrição: </span>,
                                        label:atual?.atual?.id,
                                        props:{style:{textAlign:'left', xs:"10", sm:"10", md:"10"}},
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
        setGrupo(dataEstado)
        setNrPageAtual(dataEstado?.registro?.current_page)
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado])
    

    const rowsTableArr = gerarTableGrupo();    
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
                atualizarGrupo &&
                <Atualizar atualizarGrupo={atualizarGrupo} atualizarCadastro={atualizarGrupo} setAtualizarGrupo={setAtualizarGrupo} setAtualizarCadastro={setAtualizarGrupo}  idGrupo={consultaChoice} setIdGrupo={setGrupoChoice} callback={callBack} />
            }
        
        </>
    )
}

export default Include;