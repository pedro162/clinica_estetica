import React from 'react'
import estilos from './Profissionais.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faUserCircle, faHandHoldingUsd,faHandHolding, faTasks, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormProfissionais from './FormProfissionais/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'
import { Button } from 'bootstrap';
import reactDom from 'react-dom';
import Home from '../Home/index.js';
//

const Include = ({dataEstado, loadingData, callBack, setMostarFiltros, nadaEncontrado, idProfissionalCriado, nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setProfissional] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarProfissional, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setProfissionalChoice] = React.useState(null);
    const [atualizarProfissional, setAtualizarProfissional] = React.useState(false)   
    const [cancelarProfissional, setCancelarProfissional] = React.useState(false)   
    const [digitarProfissional, setDigitarProfissional] = React.useState(false)    
    const [cadastrarProfissional, setCadastrarProfissional] = React.useState(false)
    const [visualizarContasReceber, setVisualizarContasReceber] = React.useState(false)  
    const [atualizarCabecalhoProfissional, setAtualizarCabecalhoProfissional] = React.useState(false)  
    const [finalizarProfissional, setFinalizarProfissional] = React.useState(false)  
    const [incicarProfissional, setIniciarProfissional] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [defaultFiltersAgenda, setDefaultFiltersAgenda] = React.useState({})
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)
    const [visualizarAgenda, setVisualizarAgenda] = React.useState(false) 


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




    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarProfissional(true);
                }else{
                    setAtualizarProfissional(false);
                }
                break;
            case 'agenda_profissional':
                if(consultaChoice > 0){
                    setVisualizarAgenda(true);
                }else{
                    setVisualizarAgenda(false);
                }
                break;
            default:
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarProfissional == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarProfissional])

    const atualizarProfissionalAction = (idProfissional)=>{
        setProfissionalChoice(idProfissional)
        setAcao('editar')
        setAtualizarProfissional(true);
    }


    const visualizarAgendaActions = (idContasReceber)=>{
        setProfissionalChoice(idContasReceber)
        setAcao('agenda_profissional')
        setVisualizarAgenda(true);
    }
    

    React.useEffect(()=>{
        idProfissionalCriado && idProfissionalCriado > 0 && atualizarProfissionalAction(idProfissionalCriado)

    }, [idProfissionalCriado])

    const gerarTableProfissional = ()=>{
       
        let data = [];
        let dataProfissional = estado

        if(dataProfissional?.mensagem){
            dataProfissional = dataProfissional?.mensagem;
        }

        if(dataProfissional?.data){
            dataProfissional = dataProfissional?.data;
        }
        if(dataProfissional && Array.isArray(dataProfissional) && dataProfissional.length > 0){
            for(let i=0; !(i == dataProfissional.length); i++){
                let atual = dataProfissional[i];
                if(atual){
                    let acoesArr = [];
                    
                    let line_style = {}
                    if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
                    } 
                    
                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                {acao:()=>atualizarProfissionalAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
                                {acao:()=>{visualizarAgendaActions(atual.id); setDefaultFiltersAgenda({...atual, referencia_id:atual?.id, referencia:'profissionals'})}, label:'Agenda', propsOption:{}, propsLabel:{}},
                            ],
                            celBodyTableArr:[
                                {

                                    label:atual.id,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name_pessoa,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name_opcional,
                                    propsRow:{}
                                },
                                {

                                    label:atual.documento,
                                    propsRow:{}
                                },
                                {

                                    label:atual.nr_doc,
                                    propsRow:{}
                                },
                                {

                                    label:atual.org_expedidor,
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

    const gerarListMobileRelatorio = ()=>{
       
        let data = [];
        let dataProfissional = estado

        if(dataProfissional?.mensagem){
            dataProfissional = dataProfissional?.mensagem;
        }

        if(dataProfissional?.data){
            dataProfissional = dataProfissional?.data;
        }
        if(dataProfissional && Array.isArray(dataProfissional) && dataProfissional.length > 0){
            for(let i=0; !(i == dataProfissional.length); i++){
                let atual = dataProfissional[i];
                if(atual){
                    let acoesArr = [
                    	{acao:()=>atualizarProfissionalAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
                        {acao:()=>{visualizarAgendaActions(atual.id); setDefaultFiltersAgenda({...atual, referencia_id:atual?.id, referencia:'profissionals'})}, label:'Agenda', propsOption:{}, propsLabel:{}},
                    ];
                    

                    let line_style = {}
                    if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
                    } 

                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow: atual?.id +' - '+ atual?.name_pessoa, style:{...line_style}, mainIcon:faFileAlt},
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
                                        title:<span style={{fontWeight:'480'}}>Filial: </span>,
                                        label:atual?.filial_id,
                                        props:{style:{textAlign:'left', xs:"1", sm:"1", md:"1"}},
                                        toSum:0,
                                        isCoin:0,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Bate ponto: </span>,
                                        label:atual?.ponto_obrigatorio == 'yes'? 'Sim' : 'Não',
                                        props:{style:{textAlign:'left', xs:"2", sm:"2", md:"2"}},
                                        toSum:0,
                                        isCoin:0,
                                    },{
                                        title:<span style={{fontWeight:'480'}}>Status: </span>,
                                        label:atual?.status,
                                        props:{style:{textAlign:'left', fontWeight:'bolder', xs:"3", sm:"3", md:"3"}},
                                        toSum:0,
                                        isCoin:0,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Documento: </span>,
                                        label:atual?.nr_doc,
                                        props:{style:{textAlign:'left', xs:"4", sm:"4", md:"4"}},
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
                label:'Nome complementar',
                props:{}
            },
            {
                label:'CPF / CNPJ',
                props:{}
            },
            {
                label:'Documento',
                props:{}
            },
            {
                label:'Orgão expedidor',
                props:{}
            }
        ]

        return tableTitle;
    }



    React.useEffect(()=>{
        setProfissional(dataEstado)
        setNrPageAtual(dataEstado?.mensagem?.current_page)
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado])
    

    const rowsTableArr = gerarTableProfissional();    
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
                atualizarProfissional &&
                <Atualizar atualizarCadastro={atualizarProfissional} setAtualizarCadastro={setAtualizarProfissional}  idProfissionais={consultaChoice} setIdProfissionais={setProfissionalChoice} callback={callBack} />
            }

            {
                visualizarAgenda && defaultFiltersAgenda &&
                <Modal noBtnCancelar={false} noBtnConcluir={true} handleConcluir={()=>null}  title={'Agenda'} size="lg" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={consultaChoice} showHide={()=>{setVisualizarAgenda(false);}}>
                    
                    <Home defaultFilters={defaultFiltersAgenda} visualizarCalendarioAgenda={visualizarAgenda} setVisualizarCalendarioAgenda={setVisualizarAgenda}  setAtualizarCadastro={setAtualizarProfissional} idReferencia={null} referencia={null}  clientChoice={consultaChoice} setClienteChoice={setProfissionalChoice} callback={callBack} />
                
                </Modal>
            }
        
        </>
    )
}

export default Include;