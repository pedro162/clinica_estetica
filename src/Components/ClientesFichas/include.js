import React from 'react'
import estilos from './ClientesFichas.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, FORMULARIO_PESSOA_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormClientesFichas from './FormClientesFichas/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Cancelar from './Cancelar/index.js'
import AtualizarCabecalho from './AtualizarCabecalho/index.js'
import ContasReceber from '../ContasReceber/index.js'
import Finalizar from './Finalizar/index.js'
import Visualizar from './Visualizar/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'
import { Button } from 'bootstrap';
import reactDom from 'react-dom';
//

const Include = ({dataEstado, loadingData, callBack, nadaEncontrado, setMostarFiltros, idClienteFichaCriada,nextPage, setNextPage, usePagination, setUsePagination, totalPageCount,setTotalPageCount, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setClientesFichas] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarClientesFichas, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setClientesFichasChoice] = React.useState(null);
    const [atualizarClientesFichas, setAtualizarClientesFichas] = React.useState(false)   
    const [cancelarClientesFichas, setCancelarClientesFichas] = React.useState(false)   
    const [digitarClientesFichas, setDigitarClientesFichas] = React.useState(false)    
    const [cadastrarClientesFichas, setCadastrarClientesFichas] = React.useState(false)
    const [visualizarContasReceber, setVisualizarContasReceber] = React.useState(false) 
    const [visualizarFicha, setVisualizarFicha] = React.useState(false)
    const [atualizarCabecalhoClientesFichas, setAtualizarCabecalhoClientesFichas] = React.useState(false)  
    const [finalizarClientesFichas, setFinalizarClientesFichas] = React.useState(false)  
    const [incicarClientesFichas, setIniciarClientesFichas] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [defaultFiltersCobReceber, setDefaultFiltersCobReceber] = React.useState({})
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)

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

    

    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarClientesFichas(true);
                }else{
                    setAtualizarClientesFichas(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarClientesFichas(true);
                }else{
                    setCancelarClientesFichas(false);
                }
                break;
            case 'digitar':
                if(consultaChoice > 0){
                    setDigitarClientesFichas(true);
                }else{
                    setDigitarClientesFichas(false);
                }
                break;
            case 'visualizar':
                if(consultaChoice > 0){
                    setDigitarClientesFichas(true);
                }else{
                    setDigitarClientesFichas(false);
                }
                break;                 
            case 'finalizar':

                if(consultaChoice > 0){
                    setFinalizarClientesFichas(true);
                }else{
                    setFinalizarClientesFichas(false);
                }

                break;
            default:
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarClientesFichas == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarClientesFichas])

    const visuatualizarClientesFichasAction = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('visualizar')
        setVisualizarFicha(true);
        
    }

    const atualizarClientesFichasAction = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('editar')
        setAtualizarClientesFichas(true);
    }

    const atualizarCabecalhoClientesFichasAction = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('editar_cabecalho')
        setAtualizarCabecalhoClientesFichas(true);
        //AtualizarCabecalhoForm
    }

    

    const visualizarContasReceberAction = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('contas_receber')
        setVisualizarContasReceber(true);
    }

    const digitarClientesFichasAction = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('digitar')
        setAtualizarClientesFichas(true);
    }

    const cancelarClientesFichasAction = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('cancelar')
        setCancelarClientesFichas(true);
    }
    //cancelarClientesFichas, setCancelarClientesFichas
    const novaClientesFichas = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('consultar')
        setAtualizarClientesFichas(true);
    }

    const iniciarClientesFichas = (idClientesFichas)=>{
        setIniciarClientesFichas(idClientesFichas)
        setAcao('iniciar')
        setIniciarClientesFichas(true);
    }

    const finalizarClientesFichasAction = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('finalizar')
        setFinalizarClientesFichas(true);
    }


    //finalizarClientesFichas, setFinalizarClientesFichas
    

    React.useEffect(()=>{      
        idClienteFichaCriada && idClienteFichaCriada > 0 && atualizarClientesFichasAction(idClienteFichaCriada)

    }, [idClienteFichaCriada])

    const gerarTableClientesFichas = ()=>{
       
        let data = [];
        let dataRequest = estado.mensagem
        if(dataRequest?.mensagem){
            dataRequest = dataRequest?.mensagem;
        }

        if(dataRequest?.data){
            dataRequest = dataRequest?.data;
        }

        if(dataRequest && Array.isArray(dataRequest) && dataRequest.length > 0){
            for(let i=0; !(i == dataRequest.length); i++){
                let atual = dataRequest[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar                   = true;
                    let btnIniciarProcedimento      = true;
                    let btnFinalizar                = true;
                    let btnVisualizarFinanceiro     = true;
                    let btnVisualizar               = true;
                    let btnCotinuarDigitacao        = true;
                    let btnCancelar                 = true;

                    if(atual?.status != 'cancelado'){
                        
                        if(atual?.is_faturado == 'yes'){
                            btnCotinuarDigitacao        = false;
                            btnVisualizarFinanceiro     = true;
                            btnIniciarProcedimento      = false;
                        }else{
                            btnFinalizar                = false;
                            btnIniciarProcedimento      = false;
                            btnVisualizarFinanceiro     = false;
                        }

                        if(atual?.status == 'concluido'){
                            btnCotinuarDigitacao    = false;
                            btnFinalizar            = false;
                            btnEditar               = false;
                            btnIniciarProcedimento  = false;
                        }

                    }else{

                        btnCotinuarDigitacao    = false;
                        btnFinalizar            = false;
                        btnIniciarProcedimento  = false;
                        acoesArr                = [];
                        btnEditar               = false;
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarClientesFichasAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnVisualizar){
                        acoesArr.push({acao:()=>visuatualizarClientesFichasAction(atual.id), label:'Visualizar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnCancelar){
                        //acoesArr.push({acao:()=>cancelarClientesFichasAction(atual.id), label:'Cancelar', propsOption:{}, propsLabel:{}})
                    }

                    let line_style = {}
                    if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
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

                                    label:atual.name_filial,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name,
                                    propsRow:{}
                                },
                                {

                                    label:atual.status,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name_form,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name_profissional,
                                    propsRow:{}
                                },
                                {

                                    label:atual.sigiloso == 'yes' ? 'Sim':'Não',
                                    propsRow:{}
                                },
                                {

                                    label:atual.observacao,
                                    propsRow:{}
                                },
                                {

                                    label:FORMAT_DATA_PT_BR(atual.created_at),
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
                label:'Filial',
                props:{}
            },
            {
                label:'Cliente',
                props:{}
            },
            {
                label:'Status',
                props:{}
            },
            {
                label:'Tipo',
                props:{}
            },
            {
                label:'Profissional',
                props:{}
            },
            {
                label:'Sigiloso',
                props:{}
            },
            {
                label:'Observação',
                props:{}
            },
            {
                label:'Criado em',
                props:{}
            }
        ]

        return tableTitle;
    }
   //name_profissional


   const gerarListMobileRelatorio = ()=>{
       
        let data = [];
        let dataRequest = estado

        if(dataRequest?.mensagem){
            dataRequest = dataRequest?.mensagem;
        }

        if(dataRequest?.data){
            dataRequest = dataRequest?.data;
        }

        if(dataRequest && Array.isArray(dataRequest) && dataRequest.length > 0){
            for(let i=0; !(i == dataRequest.length); i++){
                let atual = dataRequest[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar                   = true;
                    let btnIniciarProcedimento      = true;
                    let btnFinalizar                = true;
                    let btnVisualizarFinanceiro     = true;
                    let btnVisualizar               = true;
                    let btnCotinuarDigitacao        = true;
                    let btnCancelar                 = true;

                    if(atual?.status != 'cancelado'){
                        
                        if(atual?.is_faturado == 'yes'){
                            btnCotinuarDigitacao        = false;
                            btnVisualizarFinanceiro     = true;
                            btnIniciarProcedimento      = false;
                        }else{
                            btnFinalizar                = false;
                            btnIniciarProcedimento      = false;
                            btnVisualizarFinanceiro     = false;
                        }

                        if(atual?.status == 'concluido'){
                            btnCotinuarDigitacao    = false;
                            btnFinalizar            = false;
                            btnEditar               = false;
                            btnIniciarProcedimento  = false;
                        }

                    }else{

                        btnCotinuarDigitacao    = false;
                        btnFinalizar            = false;
                        btnIniciarProcedimento  = false;
                        acoesArr                = [];
                        btnEditar               = false;
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarClientesFichasAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnVisualizar){
                        acoesArr.push({acao:()=>visuatualizarClientesFichasAction(atual.id), label:'Visualizar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnCancelar){
                        //acoesArr.push({acao:()=>cancelarClientesFichasAction(atual.id), label:'Cancelar', propsOption:{}, propsLabel:{}})
                    }

                    let line_style = {}
                    if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
                    } 

                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow:atual?.name},
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
                                        title:<span style={{fontWeight:'480'}}>Status: </span>,
                                        label:atual?.status,
                                        props:{style:{textAlign:'left', fontWeight:'bolder'}, md:'4', sm:'4', xs:'4'},
                                        toSum:1,
                                        isCoin:1,
                                    },{
                                        title:<span style={{fontWeight:'480'}}>Tipo: </span>,
                                        label:atual?.name_form,
                                        props:{style:{textAlign:'left'}, md:'4', sm:'4', xs:'4'},
                                        toSum:1,
                                        isCoin:1,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Prof: </span>,
                                        label:atual?.name_profissional,
                                        props:{style:{textAlign:'left'}, md:'4', sm:'4', xs:'4'},
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

    //------------

    React.useEffect(()=>{
        setClientesFichas(dataEstado)
        setNrPageAtual(dataEstado?.mensagem?.current_page)
        handleTotalPages()
        handleTotalItems()
    }, [dataEstado])
    

    const rowsTableArr = gerarTableClientesFichas();    
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
                cadastrarClientesFichas && <Cadastrar cadastrarClientesFichas={cadastrarClientesFichas} setCadastrarClientesFichas={setCadastrarClientesFichas} atualizarClientesFichas={atualizarClientesFichas} setAtualizarClientesFichas={setAtualizarClientesFichas}  idClientesFichas={consultaChoice} setIdClientesFichas={setClientesFichasChoice} callback={callBack} />
            }
            
            {
                atualizarClientesFichas &&
                <Atualizar atualizarClientesFichas={atualizarClientesFichas} setAtualizarClientesFichas={setAtualizarClientesFichas}  idClientesFichas={consultaChoice} setIdClientesFichas={setClientesFichasChoice} callback={callBack} />
            }
            
            {
                visualizarFicha &&
                <Visualizar visualizarFicha={visualizarFicha} setVisualizarFicha={setVisualizarFicha}  idClientesFichas={consultaChoice} setIdClientesFichas={setClientesFichasChoice} callback={callBack} />
            }

            {
                visualizarContasReceber &&
                <Modal noBtnCancelar={false} noBtnConcluir={true} handleConcluir={()=>null}  title={'Contas a receber'} size="lg" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={consultaChoice} showHide={()=>{setVisualizarContasReceber(false);}}>
					
                    <ContasReceber defaultFilters={defaultFiltersCobReceber} visualizarContasReceber={visualizarContasReceber} setVisualizarContasReceber={setVisualizarContasReceber} atualizarClientesFichas={atualizarClientesFichas} setAtualizarClientesFichas={setAtualizarClientesFichas} idReferencia={consultaChoice} referencia={'ordem_servico'}  idClientesFichas={consultaChoice} setIdClientesFichas={setClientesFichasChoice} callback={callBack} />
                
				</Modal>
            }

        
        </>
    )
}

export default Include;