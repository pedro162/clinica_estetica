import React from 'react';
import estilos from './Caixa.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CAIXA_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faTimes, faChevronUp, faChevronDown, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormCaixa from './FormCaixa/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min.js';


const Caixa = ({defaultFilters ,...props})=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setCaixa] = React.useState([])
    const [consultaChoice, setCaixaChoice] = React.useState(null);
    const [atualizarCaixa, setAtualizarCaixa] = React.useState(false)
    const [cadastrarCaixa, setCadastrarCaixa] = React.useState(false)
    const [mostarFiltros, setMostarFiltros] = React.useState(true) 
    const [acao, setAcao] = React.useState(null)
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(10)
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [ordenacao, setOrdenacao] = React.useState('')
    const [idCaixa, setIdCaixa] = React.useState(()=>{
        return defaultFilters?.caixa_id
    })  
    const [caixaName, setCaixaName] = React.useState(()=>{
        return defaultFilters?.name_caixa
    })

    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllCaixas();
        }
    }
    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const setNameCaixa = ({target})=>{        
        setCaixaName(target.value)
    }

    const handleCaixaId = ({target})=>{
        setIdCaixa(target.value)
    }

    const setOrdenacaoFiltro = ({target})=>{
        
        setOrdenacao(target.value)
    }

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código caixa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':idCaixa, value:idCaixa, onChange:handleCaixaId, onBlur:handleCaixaId, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Caixa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name_caixa':caixaName, value:caixaName, onChange:setNameCaixa, onBlur:setNameCaixa, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
            {'label':'Caixa A-Z', 'value':'name-asc'},{'label':'Caixa Z-A', 'value':'name-desc'},], 
            hasLabel: true,
            contentLabel:'Classificar',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'select', size:"sm",'ordem':ordenacao, value:ordenacao, onChange:setOrdenacaoFiltro, onBlur:setOrdenacaoFiltro, onKeyUp:handleSearch},

        },
    ]

    const acoesBottomCard=[{
            label:'Pesquisar',
            icon:<FontAwesomeIcon icon={faSearch} />,
            props:{onClick:()=>requestAllCaixas(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Limpar',
            icon:<FontAwesomeIcon icon={faBroom} />,
            props:{onClick:()=>limparFiltros(), className:'btn btn-sm btn-secondary mx-2'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarCaixa(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];

    const acoesHeaderCard=[{
            label:'',
            icon:<FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props:{onClick:()=>{setMostarFiltros(!mostarFiltros);}, className:'btn btn-sm btn-secondary'},
        },
    ];    

    const atualizarCaixaAction = (idCaixa)=>{
        setCaixaChoice(idCaixa)
        setAcao('editar')
        setAtualizarCaixa(true);
    }

    const limparFiltros = ()=>{
        setCaixaName('');
        setIdCaixa('');
        setFiltroMobile('');
        setOrdenacao('');
    }
    

    //------------
    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}

        if(usePagination){
            filtros['usePaginate'] = 1;
            filtros['nr_itens_per_page'] = qtdItemsPerPage;
        }
                
        if(idCaixa){
            filtros['caixa_id'] = idCaixa;   
            detalhesFiltros['caixa_id'] = {
                label:'Cód. referência',
                value:idCaixa,
                resetFilter:()=>setIdCaixa(''),
            };
        }

        if(caixaName){
            filtros['name_caixa'] = caixaName;
            detalhesFiltros['name_caixa'] = {
                label:'Caixa',
                value:caixaName,
                resetFilter:()=>setCaixaName(''),
            };
        }

        if(filtroMobile){
            filtros['caixa_name'] = filtroMobile;
            detalhesFiltros['caixa_name'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>setFiltroMobile(''),
            };
        }

        if(ordenacao){
            filtros['ordem'] = ordenacao;
            detalhesFiltros['ordem'] = {
                label:'Ordem',
                value:ordenacao,
                resetFilter:()=>setOrdenacao(''),
            };
        }

        return {filtros, detalhesFiltros};
    }
    const requestAllCaixas = async() =>{
        setCaixa([])
        setNadaEncontrado(false)

        let {filtros, detalhesFiltros} = montarFiltro();
        let {url, options} = CAIXA_ALL_POST({...filtros}, getToken());

        if(nextPage){
            url = nextPage;
        }

        const {response, json} = await request(url, options);
        if(json){
            setCaixa(json)
            if( json?.mensagem && json?.mensagem.length > 0){
                setNadaEncontrado(false)
            }else{
                setNadaEncontrado(true)
            }

        }else{
            setNadaEncontrado(true)
        }            
    }

    const requestAbertas = async ()=>{
        setCaixa([])

        let {filtros, detalhesFiltros} = montarFiltro();
        filtros.status = 'aberto';
        let {url, options} = CAIXA_ALL_POST({...filtros}, getToken());
        if(nextPage){
            url = nextPage;
        }
        const {response, json} = await request(url, options);
        if(json){
            setCaixa(json)
        }
    }

    React.useEffect(()=>{

        const requestAllCaixasEffect = async() =>{
           await requestAllCaixas();            
        }

        requestAllCaixasEffect();

        
    }, [nextPage, setNextPage])

    return(
        <>
            <Breadcrumbs
                items={[
                        {
                            props:{},
                            label:<> <Link className={null}  to={'/'}>Início</Link></>
                        },
                        {
                            props:{},
                            label:'Caixas'
                        }
                    ]}

                buttonFiltroMobile={true}
                setMostarFiltros={setMostarFiltros}
                mostarFiltros={mostarFiltros}

            />
            <Row>
                {
                    (
                        <>
                            <Col  xs="12" sm="12" md="13" className={'default_card_report'}>
                                <Filter
                                    filtersArr={filtersArr}
                                    actionsArr={acoesBottomCard}
                                    mostarFiltros={mostarFiltros}
                                    setMostarFiltros={setMostarFiltros}
                                    botoesHeader={acoesHeaderCard}
                                />
                            </Col>

                            <Col  xs="12" sm="12" md="12" className={'mobile_card_report pt-4'}  style={{backgroundColor:'#FFF'}}>
                                <Row className={'mb-3'} >
                                    <Col className={'mx-2'}  >
                                       <Row style={{borderRadius:'24px 24px 24px 24px', border:'1px solid #000'}}>
                                            <Col xs="11" sm="11" md="11" >
                                                <FormControlInput
                                                    data={
                                                        {
                                                            atributsFormControl:{
                                                                type:'input',
                                                                placeholder:'Search...',
                                                                style:{
                                                                    border:'none',
                                                                    outline:'0',
                                                                    'box-shadow':'0 0 0 0',
                                                                    height:'50px',
                                                                    borderRadius:'24px 24px 24px 24px'
                                                                    
                                                                },
                                                                onChange:(ev)=>{handleFiltroMobile(ev);},
                                                                onBlur:(ev)=>{handleFiltroMobile(ev);},
                                                                onKeyUp:(ev)=>{

                                                                    if (ev.key === "Enter") {
                                                                        requestAllCaixas();
                                                                    }
                                                                }, 
                                                                value:filtroMobile,

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllCaixas();}} size={'lg'} icon={faSearch}/>
                                            </Col>
                                        
                                            
                                         </Row>
                                        <Row className={'mt-2'}>
                                            <div  style={{display:'flex', flexDirection:'collumn', flexWrap:'wrap'}}>
                                            </div>
                                        </Row>
                                    </Col>
                                    
                                    
                                </Row>
                                <Row className={'my-2'}>
                                    <Col>
                                        <Row>
                                            <Col><span style={{fontWeight:'bolder', fontSize:'14pt'}} >Ações</span></Col>
                                        </Row>

                                        <div>
                                             <hr style={{margin:'0',padding:'0'}}/>  
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <div style={{display:'flex', flexDirection:'collumn', flexWrap:'wrap'}}>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarCaixa(true);}} ><FontAwesomeIcon icon={faPlus} /> Novo caixa</Button>
                                    </div>
                                </Row>
                            </Col>
                        </>
                    )
                }
                
                <Col style={{backgroundColor:'#FFF'}} className={'pt-3 mobile_card_report'} >
                    <Row>
                        <Col><span style={{fontWeight:'bolder', fontSize:'14pt'}} >Resultado</span></Col>
                    </Row>
                    <div>
                         <hr style={{margin:'0',padding:'0'}}/>  
                    </div>
                </Col>

                <Col  xs="12" sm="12" md={'12'} >
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllCaixas}
                        setMostarFiltros={setMostarFiltros}
                        nadaEncontrado={nadaEncontrado}
                        nextPage={nextPage}
                        setNextPage={setNextPage}
                        usePagination={usePagination}
                        setUsePagination={setUsePagination}
                        totalPageCount={totalPageCount}
                        setTotalPageCount={setTotalPageCount}
                    />
                </Col>
            </Row>
            {
                cadastrarCaixa &&
                <Cadastrar cadastrarCaixa={cadastrarCaixa} setCadastrarCaixa={setCadastrarCaixa} atualizarCaixa={atualizarCaixa} setAtualizarCaixa={setAtualizarCaixa}  idCaixa={consultaChoice} setIdCaixa={setCaixaChoice} callback={requestAllCaixas} />
            }
           
         </>

    )
}

export default Caixa;