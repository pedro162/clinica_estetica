import React from 'react'
import estilos from './ConstrutorFichas.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row } from 'react-bootstrap';
import FormControlInput from '../FormControl/index.js'
import Table from '../Relatorio/Table/index.js'
import CardMobile from '../Relatorio/CardMobile/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'
import FormConstrutorFicha from './FormConstrutorFicha/index.js'
import ConstrutorFichaGrupo from '../ConstrutorFichaGrupo/index.js'
import ConstrutorFichaItem from '../ConstrutorFichaItem/index.js'
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


const Include = ({dataEstado, loadingData, callBack, setMostarFiltros, nadaEncontrado, requestAllRegistros, nextPage, setNextPage, usePagination, setUsePagination, totalPageCount, setTotalPageCount, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setConstrutorFicha] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarConstrutorFicha, setShowModalCriarConstula] = React.useState(false)
    const [registroChoice, setRegistroChoice] = React.useState(null);
    const [atualizarConstrutorFicha, setAtualizarConstrutorFicha] = React.useState(false)  
    const [baixarConstrutorFicha, setBaixarConstrutorFicha] = React.useState(false)   
    const [estornarConstrutorFicha, setEstornarConstrutorFicha] = React.useState(false)   
    const [cancelarConstrutorFicha, setCancelarConstrutorFicha] = React.useState(false)   
    const [digitarConstrutorFicha, setDigitarConstrutorFicha] = React.useState(false)    
    const [cadastrarConstrutorFicha, setCadastrarConstrutorFicha] = React.useState(false)  
    const [incicarConstrutorFicha, setIniciarConstrutorFicha] = React.useState(false) 
    const [visualizarMovimentacoes, setVisualizarMovimentacoes] = React.useState(false)  
    const [defaultFiltersMovimentacoes, setDefaultFiltersMovimentacoes] = React.useState({})
    const [nrPageAtual, setNrPageAtual] = React.useState(null)
    const [qtdItemsTo, setQtdItemsTo] = React.useState(null)
    const [qtdItemsTotal, setQtdItemsTotal] = React.useState(null)
    const [listarGrupo, setListarGrupo] = React.useState(false)        
    const [listarItems, setListarItem] = React.useState(false) 
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [showModalGrupo, setShowModalGrupo] = React.useState(false)
    const [showModalItem, setShowModalItem] = React.useState(false)

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

    
    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(registroChoice > 0){
                    setAtualizarCadastro(true);
                }else{
                    setAtualizarCadastro(false);
                }
                break;
            
            case 'listar_grupo':
                if(registroChoice > 0){
                    setListarGrupo(true);
                }else{
                    setListarGrupo(false);
                }
                break;             
            
            case 'listar_item':
                if(registroChoice > 0){
                    setListarItem(true);
                }else{
                    setListarItem(false);
                }
                break;   
            default:
                setAtualizarCadastro(false);
                break;

        }
        
    }, [registroChoice, acao])

    React.useEffect(()=>{

        if(cadastrarConstrutorFicha == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarConstrutorFicha])

    
    const atualizarRegistro = (idRegistro)=>{
        setRegistroChoice(idRegistro)
        setAcao('editar')
        setAtualizarCadastro(true);
    }

    const novoAtendimento = (idRegistro)=>{
        setRegistroChoice(idRegistro)
        setAcao('consultar')
        setAtualizarCadastro(true);
    }

    const exbirListaGrupo = (idRegistro)=>{
        setRegistroChoice(idRegistro)
        setAcao('listar_grupo')
        setListarGrupo(true);
    }


    const exbirListaItem = (idRegistro)=>{
        setRegistroChoice(idRegistro)
        setAcao('listar_item')
        setListarItem(true);
    }



    const gerarTableConstrutorFicha = ()=>{
       
        let data = [];
        let dataConstrutorFicha = estado

        if(dataConstrutorFicha?.mensagem){
            dataConstrutorFicha = dataConstrutorFicha?.mensagem;
        }

        if(dataConstrutorFicha?.data){
            dataConstrutorFicha = dataConstrutorFicha?.data;
        }
        if(dataConstrutorFicha && Array.isArray(dataConstrutorFicha) && dataConstrutorFicha.length > 0){
            for(let i=0; !(i == dataConstrutorFicha.length); i++){
                let atual = dataConstrutorFicha[i];
                if(atual){
                    let acoesArr = [
                        {acao:()=>atualizarRegistro(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
                        {acao:()=>novoAtendimento(atual.id), label:'Excluir', propsOption:{}, propsLabel:{}},
                        {acao:()=>exbirListaGrupo(atual.id), label:'Grupos', propsOption:{}, propsLabel:{}},
                        {acao:()=>exbirListaItem(atual.id), label:'Itens', propsOption:{}, propsLabel:{}},
                    ];

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

                                    label:atual.name,
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
        ]

        return tableTitle;
    }


    const gerarCardConstrutorFicha = ()=>{
       
        let data = [];
        let dataConstrutorFicha = estado

        if(dataConstrutorFicha?.mensagem){
            dataConstrutorFicha = dataConstrutorFicha?.mensagem;
        }

        if(dataConstrutorFicha?.data){
            dataConstrutorFicha = dataConstrutorFicha?.data;
        }
        if(dataConstrutorFicha && Array.isArray(dataConstrutorFicha) && dataConstrutorFicha.length > 0){
            for(let i=0; !(i == dataConstrutorFicha.length); i++){
                let atual = dataConstrutorFicha[i];
                if(atual){
                    let acoesArr = [
                    	{acao:()=>atualizarRegistro(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
                        {acao:()=>novoAtendimento(atual.id), label:'Excluir', propsOption:{}, propsLabel:{}},
                        {acao:()=>exbirListaGrupo(atual.id), label:'Grupos', propsOption:{}, propsLabel:{}},
                        {acao:()=>exbirListaItem(atual.id), label:'Itens', propsOption:{}, propsLabel:{}},
                    ];

                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                ...acoesArr
                            ],
                            title:<><div style={{display:'flex', justifyContent:'space-between',fontSize:'18pt', fontWeight:'bolder'}} ><span><FontAwesomeIcon size={'lg'} icon={faUserCircle}/> {atual?.name} </span></div></>,
                            propsContainerTitulo:{md:'11', sm:'9', xs:'9'},
                            propsContainerButtons:{md:'1', sm:'3', xs:'3'},
                            acoesBottomCard:[
                            ],
                            celBodyTableArr:[
                                [
                                    {
                                        title:<span style={{fontWeight:'bolder'}}>Aberto R$: </span>,
                                        label:atual?.name,
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

    const gerarListMobileConstrutorFicha = ()=>{
       
        let data = [];
        let dataConstrutorFicha = estado

        if(dataConstrutorFicha?.mensagem){
            dataConstrutorFicha = dataConstrutorFicha?.mensagem;
        }

        if(dataConstrutorFicha?.data){
            dataConstrutorFicha = dataConstrutorFicha?.data;
        }

        if(dataConstrutorFicha && Array.isArray(dataConstrutorFicha) && dataConstrutorFicha.length > 0){
            for(let i=0; !(i == dataConstrutorFicha.length); i++){
                let atual = dataConstrutorFicha[i];
                if(atual && atual.id > 0){
                    let acoesArr = [
                    	{acao:()=>atualizarRegistro(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
                        {acao:()=>novoAtendimento(atual.id), label:'Excluir', propsOption:{}, propsLabel:{}},
                        {acao:()=>exbirListaGrupo(atual.id), label:'Grupos', propsOption:{}, propsLabel:{}},
                        {acao:()=>exbirListaItem(atual.id), label:'Itens', propsOption:{}, propsLabel:{}},
                    ];

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
                            ],
                            celBodyTableArr:[
                                [
                                    {
                                        title:<span style={{fontWeight:'480'}}>Código: </span>,
                                        label:atual?.pessoa_id,
                                        props:{style:{textAlign:'left', md:'1', sm:'1', xs:'1'}},
                                        toSum:1,
                                        isCoin:1,
                                    },{
                                        title:<span style={{fontWeight:'480'}}>Descrição: </span>,
                                        label:atual?.name,
                                        props:{style:{textAlign:'left', md:'4', sm:'4', xs:'4'}},
                                        toSum:1,
                                        isCoin:1,
                                    }

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

    const requestAllConstrutorFichas = async() =>{
       
        const {url, options} = ORDEM_SERVICO_ALL_POST({'name_servico':pessoa}, getToken());
        const {response, json} = await request(url, options);
        if(json){
            setConstrutorFicha(json)
        }

            
    }


    React.useEffect(()=>{
        setConstrutorFicha(dataEstado)
        setNrPageAtual(dataEstado?.mensagem?.current_page)
        handleTotalPages();
        handleTotalItems();
    }, [dataEstado])
    

    const rowsTableArr = gerarTableConstrutorFicha();    
    const titulosTableArr = gerarTitleTable();
    //
    return(
        <>
            <Row >
                <Col  xs="12" sm="12" md="12" className={'mobile_card_report py-4'}  style={{backgroundColor:'#FFF'}}>

                   
                    
                    <ListMobile
                        titulosTableArr={null}
                        rowsTableArr={gerarListMobileConstrutorFicha()}
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
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idRegistro={registroChoice} setIdRegistro={setRegistroChoice} callback={requestAllRegistros} />
            }

            {
                listarGrupo &&
                <Modal  noBtnConcluir={true} handleConcluir={()=>null}  title={'Grupos'} size="xl" propsConcluir={{'disabled':loading}} labelConcluir={null} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={listarGrupo} showHide={()=>{setShowModalGrupo();setListarGrupo(false);setRegistroChoice(null);}}>
                                
                    <ConstrutorFichaGrupo listarGrupo={listarGrupo} setListarGrupo={setListarGrupo}  idRegistro={registroChoice} idFormulario={registroChoice} setIdRegistro={setRegistroChoice} callback={requestAllRegistros} />
                
                </Modal>
            }

            {
                listarItems &&
                <Modal  noBtnConcluir={true} handleConcluir={()=>null}  title={'Items'} size="xl" propsConcluir={{'disabled':loading}} labelConcluir={null}  dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={listarItems} showHide={()=>{setShowModalItem();setListarItem(false);setRegistroChoice(null);}}>
                                
                    <ConstrutorFichaItem listarItems={listarItems} setListarItem={setListarItem}  idRegistro={registroChoice} setIdRegistro={setRegistroChoice} callback={requestAllRegistros} />
                
                </Modal>
            }

        </>
    )
}

export default Include;