import React from 'react';
import estilos from './PlanoPagamento.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, PLANO_PAGAMENTOALL_POST, FILIAIS_ALL_POST, RECORD_NUMBER_PER_REQUEST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {IS_MOBILE, MOBILE_WITH, isMobileYet, WINDOW_WIDTH} from '../../var/index.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faTimes, faChevronUp, faChevronDown, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormPlanoPagamento from './FormPlanoPagamento/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Cancelar from './Excluir/index.js'
import Include from './include.js';
import FormControlInput from '../FormControl/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const PlanoPagamento = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setPlanoPagamento] = React.useState([])
    const [showModalCriarPlanoPagamento, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setPlanoPagamentoChoice] = React.useState(null);
    const [atualizarPlanoPagamento, setAtualizarPlanoPagamento] = React.useState(false)   
    const [cancelarPlanoPagamento, setCancelarPlanoPagamento] = React.useState(false)    
    const [cadastrarPlanoPagamento, setCadastrarPlanoPagamento] = React.useState(false) 
    const [mostarFiltros, setMostarFiltros] = React.useState(true) 
    const [acao, setAcao] = React.useState(null)
    const [nome, setNome] = React.useState('')
    const [codigoPessoa, setCodigoPessoa] = React.useState(null)
    const [profissional, setProfissional] = React.useState('')
    const [codigoProfissional, setCodigoProfissional] = React.useState(null)
    const [codigoPlanoPagamento, setCodigoPlanoPagamento] = React.useState(null)
    const [codigoFilial, setCodigoFilial] = React.useState(null)
    const [status, setStatus] = React.useState(null)
    const [prioridade, setPrioridade] = React.useState(null)
    const [historico, setHistorico] = React.useState(null)
    const [tipo, setTipo] = React.useState(null)
    const [dtInicio, setDtInicio] = React.useState(null)
    const [dtFim, setDtFim] = React.useState(null)
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [ordenacao, setOrdenacao] = React.useState('')
    const [filtroAbertas, setFiltroAbertas] = React.useState(false)
    const [filtroConcluidas, setFiltroConcluidas] = React.useState(false)
    const [filtroCanceladas, setFiltroCanceladas] = React.useState(false)
    const [filtroRemarcadas, setFiltroRemarcadas] = React.useState(false)
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(RECORD_NUMBER_PER_REQUEST)
    const [appliedFilters, setAppliedFilters] = React.useState([])
    const [dataFiliais, setDataFiliais] = React.useState([])

    const {getToken, dataUser, isMobile} = React.useContext(UserContex);

    const {type, is_system, tenant_id} = dataUser ? dataUser : {};

    if(type=='external'){
        
    }

    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllPlanoPagamentos();
        }
    }

    const setName = ({target})=>{
        
        setNome(target.value)
    }

    const handleNameFilter = ({target})=>{
        setNome(target.value)
    }

    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const handleCodigoPlanoPagamentoFilter = ({target})=>{
        setCodigoPlanoPagamento(target.value)
    }

    const setOrdenacaoFiltro = ({target})=>{
        
        setOrdenacao(target.value)
    }
    
    const preparaFilialToForm = ()=>{
        if(dataFiliais.hasOwnProperty('mensagem') && Array.isArray(dataFiliais.mensagem) && dataFiliais.mensagem.length > 0){
            let filiais = dataFiliais.mensagem.map(({id, name_filial}, index, arr)=>({label:name_filial,value:id,props:{}}))
            filiais.unshift({label:'Selecione...',value:'',props:{selected:'selected'}})
            
            return filiais;
        }
        return []
    }

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'id',value:codigoPlanoPagamento,onChange:handleCodigoPlanoPagamentoFilter,    onBlur:handleCodigoPlanoPagamentoFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Nome',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'name',value:nome,onChange:handleNameFilter,    onBlur:handleNameFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},], 
            hasLabel: true,
            contentLabel:'Classificar',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'select', size:"sm",'ordem':ordenacao, value:ordenacao, onChange:setOrdenacaoFiltro, onBlur:setOrdenacaoFiltro, onKeyUp:handleSearch},

        },
    ]

    const acoesBottomCard=[
        {
            label:'Pesquisar',
            icon:<FontAwesomeIcon icon={faSearch} />,
            props:{onClick:()=>requestAllPlanoPagamentos(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Limpar',
            icon:<FontAwesomeIcon icon={faBroom} />,
            props:{onClick:()=>limparFiltros(), className:'btn btn-sm btn-secondary mx-2'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarPlanoPagamento(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];

    const acoesHeaderCard=[
        {
            label:'',
            icon:<FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props:{onClick:()=>{setMostarFiltros(!mostarFiltros);}, className:'btn btn-sm btn-secondary'},
        },
    ];    

    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarPlanoPagamento(true);
                }else{
                    setAtualizarPlanoPagamento(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarPlanoPagamento(true);
                }else{
                    setCancelarPlanoPagamento(false);
                }
                break;
            default:
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarPlanoPagamento == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarPlanoPagamento])

    const atualizarPlanoPagamentoAction = (idPlanoPagamento)=>{
        setPlanoPagamentoChoice(idPlanoPagamento)
        setAcao('editar')
        setAtualizarPlanoPagamento(true);
    }

    const novaPlanoPagamento = (idPlanoPagamento)=>{
        setPlanoPagamentoChoice(idPlanoPagamento)
        setAcao('consultar')
        setAtualizarPlanoPagamento(true);
    }

    const limparFiltros = ()=>{
                
        setCodigoPessoa('');
        setNome('');
        setCodigoProfissional('');
        setProfissional('');
        setFiltroMobile('');
        setStatus('');
        setTipo('');
        setPrioridade('');
        setHistorico('');
        setCodigoPlanoPagamento('');
        setCodigoFilial('');
        setDtInicio('');
        setDtFim('');
        setFiltroMobile('');
        setOrdenacao('');
        setAppliedFilters([]);
    }

    const removeFilter = (key)=>{
         setAppliedFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };
            delete updatedFilters[key];
            return updatedFilters;
        });
    }

    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}

        if(usePagination){
            filtros['usePaginate'] = 1;
            filtros['nr_itens_per_page'] = qtdItemsPerPage;
        }

        if(codigoPlanoPagamento){
            filtros['id'] = codigoPlanoPagamento;
            detalhesFiltros['id'] = {
                label:'Código',
                value:codigoPlanoPagamento,
                resetFilter:()=>{setCodigoPlanoPagamento('');removeFilter('id')},
            };
        }

        if(nome){
            filtros['name'] = nome;
            detalhesFiltros['name'] = {
                label:'name',
                value:nome,
                resetFilter:()=>{setNome('');removeFilter('name')},
            };
        }
    
        if(filtroMobile){
            filtros['name'] = filtroMobile;
            detalhesFiltros['name'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>{setFiltroMobile('');removeFilter('name');},
            };
        }
        
        if(ordenacao){
            filtros['ordem'] = ordenacao;
            detalhesFiltros['ordem'] = {
                label:'Ordem',
                value:ordenacao,
                resetFilter:()=>{setOrdenacao('');removeFilter('ordem');},
            };
        }


        return {filtros, detalhesFiltros};
    }

    const requestAllFilials = async() =>{
        setDataFiliais([])

        let {url, options} = FILIAIS_ALL_POST({}, getToken());
        const {response, json} = await request(url, options);
        if(json){            
            setDataFiliais(json)
        }            
    }

    const requestAllPlanoPagamentos = async() =>{
        setPlanoPagamento([])

        let {filtros, detalhesFiltros} = montarFiltro();
        setAppliedFilters(detalhesFiltros)
        let {url, options} = PLANO_PAGAMENTOALL_POST({...filtros}, getToken());
        
        if(nextPage){
            url = nextPage;
        }

        const {response, json} = await request(url, options);
       
        if(json){
            setPlanoPagamento(json)

            if( json?.mensagem && json?.mensagem.length > 0){
                setNadaEncontrado(false)
            }else{
                setNadaEncontrado(true)
            }

        }else{
            setNadaEncontrado(true)
        }
    }

    React.useEffect(()=>{

        const requestDataConfigEffect = async() =>{
            await requestAllFilials()
        }
        const requestAllPlanoPagamentosEffect = async() =>{       
           await requestAllPlanoPagamentos();            
        }

        requestDataConfigEffect();
        requestAllPlanoPagamentosEffect();

        
    }, [filtroConcluidas, filtroCanceladas, filtroAbertas, filtroRemarcadas,nextPage, setNextPage])

    return(
        <>
            <Breadcrumbs
                items={[
                        {
                            props:{},
                            label:<> <Link className={null}  to={'/home/painel'}>Início</Link></>
                        },
                        {
                            props:{},
                            label:'Planos de pagamento'
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

                            <Col  xs="12" sm="12" md="12" className={'default_card_report mb-4'} >
                                <Filter
                                    filtersArr={filtersArr}
                                    actionsArr={acoesBottomCard}
                                    mostarFiltros={mostarFiltros}
                                    setMostarFiltros={setMostarFiltros}
                                    botoesHeader={acoesHeaderCard}
                                    activeFilters={appliedFilters}
                                />
                            </Col>
                            <Col  xs="12" sm="12" md="12" className={'mobile_card_report pt-4'}  style={{backgroundColor:'#FFF'}}>
                                <Row className={''} >
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
                                                                        requestAllPlanoPagamentos();
                                                                    }
                                                                },
                                                                value:filtroMobile

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllPlanoPagamentos();}} size={'lg'} icon={faSearch}/>
                                            </Col>
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarPlanoPagamento(true);}} ><FontAwesomeIcon icon={faPlus} /> PlanoPagamento</Button>
                                    </div>
                                </Row>
                            </Col> 
                        </>
                    )
                }
                 <Col  xs="12" sm="12"  md="12" style={{backgroundColor:'#FFF'}} className={'pt-3 mobile_card_report'} >
                    <Row>
                        <Col><span style={{fontWeight:'bolder', fontSize:'14pt'}} >Resultado</span></Col>
                    </Row>
                    <div>
                         <hr style={{margin:'0',padding:'0'}}/>  
                    </div>
                </Col>

                 <Col  xs="12" sm="12" md={12}>
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllPlanoPagamentos}
                        requestAllPlanoPagamentos={requestAllPlanoPagamentos}
                        setMostarFiltros={setMostarFiltros}
                        idPlanoPagamentoCriada={consultaChoice}
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
                cadastrarPlanoPagamento && <Cadastrar cadastrarPlanoPagamento={cadastrarPlanoPagamento} setCadastrarPlanoPagamento={setCadastrarPlanoPagamento} atualizarPlanoPagamento={atualizarPlanoPagamento} setAtualizarPlanoPagamento={setAtualizarPlanoPagamento}  idPlanoPagamento={consultaChoice} setIdPlanoPagamento={setPlanoPagamentoChoice} callback={requestAllPlanoPagamentos} />
            }
            
           
         </>

    )
}

export default PlanoPagamento;