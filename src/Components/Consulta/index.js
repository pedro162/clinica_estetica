import React from 'react';
import estilos from './Consulta.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ALL_POST, FILIAIS_ALL_POST, RECORD_NUMBER_PER_REQUEST} from '../../api/endpoints/geral.js'
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
import FormConsulta from './FormConsulta/index.js'
import Cadastrar from './Cadastrar/index.js'
import CadastroExterno from './Cadastrar/CadastroExterno.js'
import Atualizar from './Atualizar/index.js'
import Cancelar from './Cancelar/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const Consulta = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setConsulta] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarConsulta, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setConsultaChoice] = React.useState(null);
    const [atualizarConsulta, setAtualizarConsulta] = React.useState(false)   
    const [cancelarConsulta, setCancelarConsulta] = React.useState(false)    
    const [cadastrarConsulta, setCadastrarConsulta] = React.useState(false) 
    const [mostarFiltros, setMostarFiltros] = React.useState(true) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [codigoPessoa, setCodigoPessoa] = React.useState(null)
    const [profissional, setProfissional] = React.useState('')
    const [codigoProfissional, setCodigoProfissional] = React.useState(null)
    const [codigoConsulta, setCodigoConsulta] = React.useState(null)
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


    const alerta = (target)=>{
        console.log(target)
    }
    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllConsultas();
        }
    }

    const setNamePessoa = ({target})=>{
        
        setPessoa(target.value)
    }

    const handleCodPessoaFilter = ({target})=>{
        setCodigoPessoa(target.value)
    }

    const handleNamePessoaFilter = ({target})=>{
        setPessoa(target.value)
    }

    const handleCodProfissionalFilter = ({target})=>{
        setCodigoProfissional(target.value)
    }

    const handleNameProfissionalFilter = ({target})=>{
        setProfissional(target.value)
    }

    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const handleStatusFilter = ({target})=>{
        setStatus(target.value)
    }

    const handleTipoFilter = ({target})=>{
        setTipo(target.value)
    }

    const handlePrioridadeFilter = ({target})=>{
        setPrioridade(target.value)
    }
    const handleHistoricoFilter = ({target})=>{
        setHistorico(target.value)
    }

    const handleCodigoConsultaFilter = ({target})=>{
        setCodigoConsulta(target.value)
    }

    const handleCodigoFilialFilter = ({target})=>{
        setCodigoFilial(target.value)
    }

    const handleDtInicioFilter = ({target})=>{
        setDtInicio(target.value)
    }


    const handleDtFimFilter = ({target})=>{
        setDtFim(target.value)
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
            atributsFormControl:{'type':'text', size:"sm",'name':'id',value:codigoConsulta,onChange:handleCodigoConsultaFilter,    onBlur:handleCodigoConsultaFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[...preparaFilialToForm()],  
            hasLabel: true,
            contentLabel:'Filial',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'filial_id',value:codigoFilial,onChange:handleCodigoFilialFilter,    onBlur:handleCodigoFilialFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Cod pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'pessoa_id',value:codigoPessoa,onChange:handleCodPessoaFilter,    onBlur:handleCodPessoaFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'name_atendido',value:pessoa,onChange:handleNamePessoaFilter,    onBlur:handleNamePessoaFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Cod profissional',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'profissional_id', value:codigoProfissional,onChange:handleCodProfissionalFilter,    onBlur:handleCodProfissionalFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Profissional',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'name_profissional', value:profissional,onChange:handleNameProfissionalFilter,    onBlur:handleNameProfissionalFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[
                {label:'Selecione...',valor:'',props:{selected:'selected'}},
                {label:'Pendente',valor:'pendente',props:{}},
                {label:'Remarcado',valor:'remarcado',props:{}},
                {label:'Finalizado',valor:'finalizado',props:{}},
                {label:'Cancelado',valor:'cancelado',props:{}},
            ], 
            hasLabel: true,
            contentLabel:'Status',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'status', value:status,onChange:handleStatusFilter,    onBlur:handleStatusFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[
                {label:'Selecione...',valor:'',props:{selected:'selected'}},
                {label:'Serviço',valor:'servico',props:{}},
                {label:'Avaliação',valor:'avaliacao',props:{}},
                {label:'Consulta',valor:'consulta',props:{}},
                {label:'Retorno',valor:'retorno',props:{}},
            ], 
            hasLabel: true,
            contentLabel:'Tipo',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'tipo':tipo,onChange:handleTipoFilter,    onBlur:handleTipoFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[
                {label:'Selecione...',valor:'',props:{selected:'selected'}},
                {label:'Baixa',valor:'baixa',props:{}},
                {label:'Normal',valor:'normal',props:{}},
                {label:'Média',valor:'media',props:{}},
                {label:'Alta',valor:'altar',props:{}},
                {label:'Urgente',valor:'urgente',props:{}},
            ], 
            hasLabel: true,
            contentLabel:'Prioridade',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'prioridade', value:prioridade,onChange:handlePrioridadeFilter,    onBlur:handlePrioridadeFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Histórico',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'historico':historico,onChange:handleHistoricoFilter,    onBlur:handleHistoricoFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. inicio',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",'name':'dt_inico', value:dtInicio,onChange:handleDtInicioFilter,    onBlur:handleDtInicioFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. fim',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",'name':'dt_fim',onChange:handleDtFimFilter,    onBlur:handleDtFimFilter, onKeyUp:handleSearch},

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
            props:{onClick:()=>requestAllConsultas(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Limpar',
            icon:<FontAwesomeIcon icon={faBroom} />,
            props:{onClick:()=>limparFiltros(), className:'btn btn-sm btn-secondary mx-2'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarConsulta(true), className:'btn btn-sm mx-2 btn-secondary'}
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
                    setAtualizarConsulta(true);
                }else{
                    setAtualizarConsulta(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarConsulta(true);
                }else{
                    setCancelarConsulta(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarConsulta == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarConsulta])

    const atualizarConsultaAction = (idConsulta)=>{
        setConsultaChoice(idConsulta)
        setAcao('editar')
        setAtualizarConsulta(true);
    }
    const cancelarConsultaAction = (idConsulta)=>{
        setConsultaChoice(idConsulta)
        setAcao('cancelar')
        setCancelarConsulta(true);
    }
    //cancelarConsulta, setCancelarConsulta
    const novaConsulta = (idConsulta)=>{
        setConsultaChoice(idConsulta)
        setAcao('consultar')
        setAtualizarConsulta(true);
    }

    const limparFiltros = ()=>{
                
        setCodigoPessoa('');
        setPessoa('');
        setCodigoProfissional('');
        setProfissional('');
        setFiltroMobile('');
        setStatus('');
        setTipo('');
        setPrioridade('');
        setHistorico('');
        setCodigoConsulta('');
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
    //------------
    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}

        if(usePagination){
            filtros['usePaginate'] = 1;
            filtros['nr_itens_per_page'] = qtdItemsPerPage;
        }


        if(codigoConsulta){
            filtros['id'] = codigoConsulta;
            detalhesFiltros['id'] = {
                label:'Código',
                value:codigoConsulta,
                resetFilter:()=>{setCodigoConsulta('');removeFilter('id')},
            };
        }
        
        if(codigoPessoa){
            filtros['pessoa_id'] = codigoPessoa;
            detalhesFiltros['pessoa_id'] = {
                label:'pessoa_id',
                value:codigoPessoa,
                resetFilter:()=>{setPessoa('');removeFilter('pessoa_id')},
            };
        }

        if(pessoa){
            filtros['name'] = pessoa;
            detalhesFiltros['name'] = {
                label:'name',
                value:pessoa,
                resetFilter:()=>{setPessoa('');removeFilter('name')},
            };

            filtros['name_pessoa'] = pessoa;
            detalhesFiltros['name_pessoa'] = {
                label:'name_pessoa',
                value:pessoa,
                resetFilter:()=>{setPessoa('');removeFilter('name_pessoa')},
            };
        }


        if(codigoProfissional){
            filtros['profissional_id'] = codigoProfissional;
            detalhesFiltros['profissional_id'] = {
                label:'profissional_id',
                value:codigoProfissional,
                resetFilter:()=>{setCodigoProfissional('');removeFilter('profissional_id')},
            };
        }


        if(profissional){
            filtros['name_profissional'] = profissional;
            detalhesFiltros['name_profissional'] = {
                label:'name_profissional',
                value:profissional,
                resetFilter:()=>{setProfissional('');removeFilter('name_profissional')},
            };
        }


        if(codigoFilial){
            filtros['filial_id'] = codigoFilial;
            detalhesFiltros['filial_id'] = {
                label:'filial_id',
                value:codigoFilial,
                resetFilter:()=>{setCodigoFilial('');removeFilter('filial_id')},
            };
        }


        if(status){
            filtros['status'] = status;
            detalhesFiltros['status'] = {
                label:'status',
                value:status,
                resetFilter:()=>{setStatus('');removeFilter('status')},
            };
        }


        if(prioridade){
            filtros['prioridade'] = prioridade;
            detalhesFiltros['prioridade'] = {
                label:'prioridade',
                value:prioridade,
                resetFilter:()=>{setPrioridade('');removeFilter('prioridade')},
            };
        }


        if(historico){
            filtros['historico'] = historico;
            detalhesFiltros['historico'] = {
                label:'historico',
                value:historico,
                resetFilter:()=>{setHistorico('');removeFilter('historico')},
            };
        }


        if(tipo){
            filtros['tipo'] = tipo;
            detalhesFiltros['tipo'] = {
                label:'tipo',
                value:tipo,
                resetFilter:()=>{setTipo('');removeFilter('tipo')},
            };
        }


        if(dtInicio){
            filtros['dt_inicio'] = dtInicio;
            detalhesFiltros['dt_inicio'] = {
                label:'dt_inicio',
                value:dtInicio,
                resetFilter:()=>{setDtInicio('');removeFilter('dt_inicio')},
            };
        }


        if(dtFim){
            filtros['dt_fim'] = dtFim;
            detalhesFiltros['dt_fim'] = {
                label:'dt_fim',
                value:dtFim,
                resetFilter:()=>{setDtFim('');removeFilter('dt_fim')},
            };
        }

        if(dtInicio && dtFim){

            filtros['dt_periodo'] = dtInicio+','+dtInicio;
            detalhesFiltros['dt_periodo'] = {
                label:'dt_periodo',
                value:dtInicio+','+dtInicio,
                resetFilter:()=>{setDtInicio('');removeFilter('dt_periodo');},
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

        if(filtroAbertas){
            if(filtros.hasOwnProperty('status')){
                filtros['status'] += 'pendente,';
            }else{
                filtros['status'] = 'pendente,';
            }

            detalhesFiltros['status'] = {
                label:'Status',
                value:filtroMobile,
                resetFilter:()=>{setFiltroAbertas('');},
            };
        }

        if(filtroConcluidas){
            if(filtros.hasOwnProperty('status')){
                filtros['status'] += 'concluido,';
            }else{
                filtros['status'] = 'concluido,';
            }
            //filtros['status'] += 'concluido,';
            detalhesFiltros['status'] = {
                label:'Status',
                value:filtroMobile,
                resetFilter:()=>{setFiltroConcluidas('');},
            };
        }

        if(filtroCanceladas){
            if(filtros.hasOwnProperty('status')){
                filtros['status'] += 'cancelado,';
            }else{
                filtros['status'] = 'cancelado,';
            }
            //filtros['status'] += 'cancelado,';
            detalhesFiltros['status'] = {
                label:'Status',
                value:filtroMobile,
                resetFilter:()=>setFiltroCanceladas(''),
            };
        }

        if(filtroRemarcadas){
            if(filtros.hasOwnProperty('status')){
                filtros['status'] += 'remarcado,';
            }else{
                filtros['status'] = 'remarcado,';
            }
            //filtros['status'] += 'cancelado,';
            detalhesFiltros['status'] = {
                label:'Status',
                value:filtroMobile,
                resetFilter:()=>setFiltroRemarcadas(''),
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
    const requestAllConsultas = async() =>{
        setConsulta([])

        let {filtros, detalhesFiltros} = montarFiltro();
        setAppliedFilters(detalhesFiltros)
        let {url, options} = CONSULTA_ALL_POST({...filtros}, getToken());
        if(nextPage){
            url = nextPage;
        }
        const {response, json} = await request(url, options);
        if(json){
            setConsulta(json)

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
        const requestAllConsultasEffect = async() =>{       
           await requestAllConsultas();            
        }

        requestDataConfigEffect();
        requestAllConsultasEffect();

        
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
                            label:'Consulta'
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
                                                                        requestAllConsultas();
                                                                    }
                                                                },
                                                                value:filtroMobile

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllConsultas();}} size={'lg'} icon={faSearch}/>
                                            </Col>
                                        
                                            
                                         </Row>

                                         <Row className={'mt-2'}>
                                            <div  style={{display:'flex', flexDirection:'collumn', flexWrap:'wrap'}}>
                                               {(filtroAbertas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAbertas(false);}} ><FontAwesomeIcon icon={faTimes} /> Pendentes</Button> : '')}
                                                {(filtroConcluidas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroConcluidas(false);}} ><FontAwesomeIcon icon={faTimes} /> Concluídas</Button> : '')}
                                                {(filtroCanceladas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroCanceladas(false);}} ><FontAwesomeIcon icon={faTimes} /> Canceladas</Button> : '')}
                                                {(filtroRemarcadas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroRemarcadas(false);}} ><FontAwesomeIcon icon={faTimes} /> Canceladas</Button> : '')}
                                                
                                            </div>
                                        </Row>
                                    </Col>
                                    
                                    
                                </Row>
                               
                                <Row className={'my-2'}>
                                    <Col>
                                        <Row>
                                            <Col><span style={{fontWeight:'bolder', fontSize:'14pt'}} >Filtros</span></Col>
                                        </Row>

                                        <div>
                                             <hr style={{margin:'0',padding:'0'}}/>  
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <div style={{display:'flex', flexDirection:'collumn', flexWrap:'wrap'}}>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAbertas(true);}} ><FontAwesomeIcon icon={faSearch} /> Pendentes</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroConcluidas(true);}} ><FontAwesomeIcon icon={faSearch} /> Concluídas</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroCanceladas(true);}} ><FontAwesomeIcon icon={faSearch} /> Canceladas</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroRemarcadas(true);}} ><FontAwesomeIcon icon={faSearch} /> Remarcadas</Button>
                                    </div>
                                    
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarConsulta(true);}} ><FontAwesomeIcon icon={faPlus} /> Consulta</Button>
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
                        callBack={requestAllConsultas}
                        requestAllConsultas={requestAllConsultas}
                        setMostarFiltros={setMostarFiltros}
                        idConsultaCriada={consultaChoice}
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
                type =='external' && cadastrarConsulta && <CadastroExterno cadastrarConsulta={cadastrarConsulta} setCadastrarConsulta={setCadastrarConsulta} atualizarConsulta={atualizarConsulta} setAtualizarConsulta={setAtualizarConsulta}  idConsulta={consultaChoice} setIdConsulta={setConsultaChoice} callback={requestAllConsultas} />
            }

            {
                type !='external' && cadastrarConsulta && <Cadastrar cadastrarConsulta={cadastrarConsulta} setCadastrarConsulta={setCadastrarConsulta} atualizarConsulta={atualizarConsulta} setAtualizarConsulta={setAtualizarConsulta}  idConsulta={consultaChoice} setIdConsulta={setConsultaChoice} callback={requestAllConsultas} />
            }
            
           
         </>

    )
}

export default Consulta;