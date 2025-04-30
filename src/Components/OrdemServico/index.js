import React from 'react';
import estilos from './OrdemServico.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ALL_POST, FILIAIS_ALL_POST, RECORD_NUMBER_PER_REQUEST, PROFISSIONAIS_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { faHome, faSearch, faPlus, faTimes, faChevronDown, faChevronUp, faBroom} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormOrdemServico from './FormOrdemServico/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Iniciar from './Iniciar/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'


const OrdemServico = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setOrdemServico] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarOrdemServico, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setOrdemServicoChoice] = React.useState(null);
    const [atualizarOrdemServico, setAtualizarOrdemServico] = React.useState(false)   
    const [cancelarOrdemServico, setCancelarOrdemServico] = React.useState(false)   
    const [digitarOrdemServico, setDigitarOrdemServico] = React.useState(false)    
    const [cadastrarOrdemServico, setCadastrarOrdemServico] = React.useState(false)  
    const [incicarOrdemServico, setIniciarOrdemServico] = React.useState(false) 
    const [mostarFiltros, setMostarFiltros] = React.useState(true) 
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [codOrdem, setCodOrdem] = React.useState('')
    const [pessoa, setPessoa] = React.useState('')
    const [codPessoa, setCodPessoa] = React.useState('')
    const [pessoaContato, setPessoaContato] = React.useState('')
    const [statusOrdem, setStatusOrdem] = React.useState('')
    const [tipoOrdem, setTipoOrdem] = React.useState('')
    const [dtInicio, setDtInico] = React.useState('')
    const [dtFim, setDtFim] = React.useState('')
    const [ordenacao, setOrdenacao] = React.useState('')
    const [dataFiliais, setDataFiliais] = React.useState([])
    const [codFilial, setCodFilial] = React.useState('')
    const [dataProfissionais, setDataProfissionais] = React.useState([])
    const [codProfissional, setCodProfissional] = React.useState('')
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [appliedFilters, setAppliedFilters] = React.useState([])
    const [filtroAbertas, setFiltroAbertas] = React.useState(false)
    const [filtroConcluidas, setFiltroConcluidas] = React.useState(false)
    const [filtroCanceladas, setFiltroCanceladas] = React.useState(false)
    const [nextPage, setNextPage] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(RECORD_NUMBER_PER_REQUEST)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllOrdemServicos();
        }
    }

    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const setCodeOrdemFilter = ({target})=>{
        setCodOrdem(target.value)
    }
    
    const setCodeProfissionalOrdemFilter = ({target})=>{
        setCodProfissional(target.value)
    }

    const setCodeFilialOrdemFilter = ({target})=>{
        setCodFilial(target.value)
    }

    const setDtInicioOrdemFilter = ({target})=>{
        setDtInico(target.value)
    }

    const setDtFimOrdemFilter = ({target})=>{
        setDtFim(target.value)
    }

    const setTipoOrdemFilter = ({target})=>{
        
        setTipoOrdem(target.value)
    }

    const setStatusOrdemFilter = ({target})=>{
        
        setStatusOrdem(target.value)
    }


    const setNamePessoaFilter = ({target})=>{
        
        setPessoa(target.value)
    }

    const setCodPessoaFilter = ({target})=>{
        
        setCodPessoa(target.value)
    }
    const setPessoaContatoFilter = ({target})=>{
        
        setPessoaContato(target.value)
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

    const preparaProfissionalToForm = ()=>{
        if(dataProfissionais.hasOwnProperty('mensagem') && Array.isArray(dataProfissionais.mensagem) && dataProfissionais.mensagem.length > 0){
            let filiais = dataProfissionais.mensagem.map(({id, name_pessoa}, index, arr)=>({label:name_pessoa,value:id,props:{}}))
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
            atributsFormControl:{'type':'text', size:"sm",'name':'id', value:codOrdem, onChange:setCodeOrdemFilter, onBlur:setCodeOrdemFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[...preparaFilialToForm()], 
            hasLabel: true,
            contentLabel:'Filial',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'select', size:"sm",'name':'filial_id', value:codFilial, onChange:setCodeFilialOrdemFilter, onBlur:setCodeFilialOrdemFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Cód pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm", name:'pessoa_id', value:codPessoa,onChange:setCodPessoaFilter, onBlur:setCodPessoaFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm", name:'pessoa_name', value:pessoa,onChange:setNamePessoaFilter, onBlur:setNamePessoaFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Pessoa do contato',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'name_atendido', value:pessoaContato, onChange:setPessoaContatoFilter, onBlur:setPessoaContatoFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[...preparaProfissionalToForm()], 
            hasLabel: true,
            contentLabel:'Profissional',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'select', size:"sm",'name':'profissional_id', value:codProfissional, onChange:setCodeProfissionalOrdemFilter, onBlur:setCodeProfissionalOrdemFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Aberto', 'value':'aberto'},
            {'label':'Concluído', 'value':'concluido'},{'label':'Cancelado', 'value':'cancelado'},],  
            hasLabel: true,
            contentLabel:'Status',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'status',value:statusOrdem,onChange:setStatusOrdemFilter, onBlur:setStatusOrdemFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Orçamento', 'value':'orcamento'},
            {'label':'Pedido', 'value':'pedido'}],  
            hasLabel: true,
            contentLabel:'Tipo',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'tipo', value:tipoOrdem,onChange:setTipoOrdemFilter, onBlur:setTipoOrdemFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. inicio',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",name:'dt_inico', value:dtInicio,onChange:setDtInicioOrdemFilter, onBlur:setDtInicioOrdemFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. fim',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",name:'dt_fim', vlaue:dtFim,onChange:setDtFimOrdemFilter, onBlur:setDtFimOrdemFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
            {'label':'Pessoa A-Z', 'value':'id-asc'},{'label':'Pessoa Z-A', 'value':'id-desc'},], 
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
            props:{onClick:()=>requestAllOrdemServicos(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Limpar',
            icon:<FontAwesomeIcon icon={faBroom} />,
            props:{onClick:()=>limparFiltros(), className:'btn btn-sm btn-secondary mx-2'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setIniciarOrdemServico(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];


    const acoesHeaderCard=[{
            label:'',
            icon:<FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props:{onClick:()=>{setMostarFiltros(!mostarFiltros);}, className:'btn btn-sm btn-secondary'},
        },
    ];    

    React.useEffect(()=>{

        if(cadastrarOrdemServico == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarOrdemServico])

    const atualizarOrdemServicoAction = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('editar')
        setAtualizarOrdemServico(true);
    }

    const digitarOrdemServicoAction = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('digitar')
        setAtualizarOrdemServico(true);
    }

    const cancelarOrdemServicoAction = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('cancelar')
        setCancelarOrdemServico(true);
    }

    const novaOrdemServico = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('consultar')
        setAtualizarOrdemServico(true);
    }

    const iniciarOrdemServico = (idOrdemServico)=>{
        setIniciarOrdemServico(idOrdemServico)
        setAcao('iniciar')
        setIniciarOrdemServico(true);
    }
    const limparFiltros = ()=>{
        setPessoa('')
        setCodOrdem('');
        setCodFilial('');
        setCodPessoa('');
        setPessoaContato('');
        setFiltroAbertas('');
        setFiltroConcluidas('');
        setFiltroCanceladas('');
        setStatusOrdem('');
        setTipoOrdem('');
        setFiltroMobile('');
        setDtInico('');
        setDtFim('');
        setOrdenacao('');
        setCodProfissional('')
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
        let filtros = {nr_itens_per_page:qtdItemsPerPage, usePaginate:1}
        let detalhesFiltros = {}
        
        if(codOrdem){
            filtros['id'] = codOrdem;
            detalhesFiltros['id'] = {
                label:'Código',
                value:codOrdem,
                resetFilter:()=>{setCodOrdem('');removeFilter('id')},
            };
        }
        if(codFilial){
            filtros['filial_id'] = codFilial;
            detalhesFiltros['filial_id'] = {
                label:'Filial',
                value:codFilial,
                resetFilter:()=>{setCodFilial('');removeFilter('filial_id')},
            };
        }

        if(pessoa){
            filtros['name_pessoa'] = pessoa;
            detalhesFiltros['name_pessoa'] = {
                label:'Pessoa',
                value:pessoa,
                resetFilter:()=>{setPessoa('');removeFilter('name_pessoa')},
            };
        }

        if(codPessoa){
            filtros['pessoa_id'] = codPessoa;
            detalhesFiltros['pessoa_id'] = {
                label:'Pessoa',
                value:codPessoa,
                resetFilter:()=>{setCodPessoa('');removeFilter('pessoa_id')},
            };
        }

        if(pessoaContato){
            filtros['pessoa_contato_name'] = pessoaContato;
            detalhesFiltros['pessoa_contato_name'] = {
                label:'Pessoa do contato',
                value:pessoaContato,
                resetFilter:()=>{setPessoaContato('');removeFilter('pessoa_contato_name')},
            };
        }

        if(filtroAbertas){
            if(filtros.hasOwnProperty('status')){
                filtros['status'] += 'aberto,';
            }else{
                filtros['status'] = 'aberto,';
            }

            detalhesFiltros['status'] = {
                label:'Status',
                value:filtroMobile,
                resetFilter:()=>{setFiltroAbertas('');removeFilter('status')},
            };
        }

        if(filtroConcluidas){
            if(filtros.hasOwnProperty('status')){
                filtros['status'] += 'concluido,';
            }else{
                filtros['status'] = 'concluido,';
            }
            
            detalhesFiltros['status'] = {
                label:'Status',
                value:filtroMobile,
                resetFilter:()=>{setFiltroConcluidas('');removeFilter('status')},
            };
        }

        if(filtroCanceladas){
            if(filtros.hasOwnProperty('status')){
                filtros['status'] += 'cancelado,';
            }else{
                filtros['status'] = 'cancelado,';
            }
            
            detalhesFiltros['status'] = {
                label:'Status',
                value:filtroMobile,
                resetFilter:()=>{setFiltroCanceladas('');removeFilter('status')},
            };
        }

        if(statusOrdem){
            filtros['status'] = statusOrdem;
            detalhesFiltros['status'] = {
                label:'Status',
                value:statusOrdem,
                resetFilter:()=>{setStatusOrdem('');removeFilter('status')},
            };
        }

        if(codProfissional){
            filtros['profissional_id'] = codProfissional;
            detalhesFiltros['profissional_id'] = {
                label:'Profissional',
                value:codProfissional,
                resetFilter:()=>{setCodProfissional('');removeFilter('profissional_id')},
            };
        }

        if(tipoOrdem){
            filtros['type'] = tipoOrdem;
            detalhesFiltros['type'] = {
                label:'Tipo',
                value:tipoOrdem,
                resetFilter:()=>{setTipoOrdem('');removeFilter('type')},
            };
        }

        if(filtroMobile){
            filtros['name_pessoa'] = filtroMobile;
            detalhesFiltros['name_pessoa'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>{setFiltroMobile('');removeFilter('name_pessoa')},
            };
        }
        
        if(dtInicio || dtFim){
            filtros['dt_exercicio'] = dtInicio+','+dtFim;
            detalhesFiltros['dt_exercicio'] = {
                label:'Exercíco',
                value:dtInicio+','+dtFim,
                resetFilter:()=>{setDtInico('');setDtFim('');removeFilter('dt_exercicio')},
            };
        }

        if(ordenacao){
            filtros['ordem'] = ordenacao;
            detalhesFiltros['ordem'] = {
                label:'Ordenação',
                value:ordenacao,
                resetFilter:()=>{setOrdenacao('');removeFilter('ordem')},
            };
        }
        
        return {filtros, detalhesFiltros};
    }

    const requestAllOrdemServicos = async() =>{
        setOrdemServico([])

        let {filtros, detalhesFiltros} = montarFiltro();
        setAppliedFilters(detalhesFiltros)
        let {url, options} = ORDEM_SERVICO_ALL_POST({...filtros}, getToken());
        
        if(nextPage){
            url = nextPage;
        }

        const {response, json} = await request(url, options);

        if(json){
            setOrdemServico(json)
            if( json?.mensagem && json?.mensagem.length > 0){
                setNadaEncontrado(false)
            }else{
                setNadaEncontrado(true)
            }

        }else{
            setNadaEncontrado(true)
        }
    }

    const requestAllFilials = async() =>{
        setDataFiliais([])

        let {url, options} = FILIAIS_ALL_POST({}, getToken());
        const {response, json} = await request(url, options);

        if(json){            
            setDataFiliais(json)
        }            
    }

    const requestAllProfissionais = async() =>{
        setDataProfissionais([])

        let {url, options} = PROFISSIONAIS_ALL_POST({}, getToken());
        const {response, json} = await request(url, options);
        if(json){            
            setDataProfissionais(json)
        }            
    }

    React.useEffect(()=>{

        const requestDataConfigEffect = async() =>{
            await requestAllFilials()
            await requestAllProfissionais()
        }

        const requestAllOrdemServicosEffect = async() =>{
           await requestAllOrdemServicos();            
        }

        requestDataConfigEffect();
        requestAllOrdemServicosEffect();
    }, [filtroConcluidas, filtroCanceladas, filtroAbertas, nextPage, setNextPage])

    React.useEffect(()=>{
        let {filtros, detalhesFiltros} = montarFiltro();
        setAppliedFilters(detalhesFiltros)
    }, [])

    /**
     * Deve ter a opção de cadastrar salas de consulta
     * Definir parâmetros do sistema
     * Ter a opção de criar perfies de usuáiros para acessos
     * Ter a opão de cadastrar os caixa e bancos para controle financeiro
     * Ter a opção de gerenciar os planos de contas que serão utilizados no sistema
     * Ter a opção de definir os tipos de agenda[Consulta, Retorno, Encaixe, Pessoal]
     * Ter a opção de criar documentos padrões como [Prontuários, Atestados, Etc]
     * 
     * No controle de estoque, deve ter opção de cadastrar unidades de medida
     * Vincular o produto ao fornecedor, Vincular o produto ao fabricante 
     */
    
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
                            label:'Ordem de servico'
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
                            <Col  xs="12" sm="12" md="12" className={'default_card_report mb-4'}>
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
                                                                        requestAllOrdemServicos();
                                                                    }
                                                                },
                                                                value:filtroMobile

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllOrdemServicos();}} size={'lg'} icon={faSearch}/>
                                            </Col>
                                        
                                            
                                         </Row>

                                         <Row className={'mt-2'}>
                                            <div  style={{display:'flex', flexDirection:'collumn', flexWrap:'wrap'}}>
                                                {(filtroAbertas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAbertas(false);}} ><FontAwesomeIcon icon={faTimes} /> Abertas</Button> : '')}
                                                {(filtroConcluidas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroConcluidas(false);}} ><FontAwesomeIcon icon={faTimes} /> Concluídas</Button> : '')}
                                                {(filtroCanceladas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroCanceladas(false);}} ><FontAwesomeIcon icon={faTimes} /> Canceladas</Button> : '')}
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setIniciarOrdemServico(true);}} ><FontAwesomeIcon icon={faPlus} /> O. serviço</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAbertas(true);}} ><FontAwesomeIcon icon={faSearch} /> Abertas</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroConcluidas(true);}} ><FontAwesomeIcon icon={faSearch} /> Concluídas</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroCanceladas(true);}} ><FontAwesomeIcon icon={faSearch} /> Canceladas</Button>
                                    </div>
                                </Row>
                            </Col>
                        </>
                    )
                }

                <Col style={{backgroundColor:'#FFF'}} className={'pt-3 mobile_card_report'}>
                    <Row>
                        <Col><span style={{fontWeight:'bolder'}} >Resultado</span></Col>
                    </Row>
                    <div>
                         <hr style={{margin:'0',padding:'0'}}/>  
                    </div>
                </Col>
                
                <Col  xs="12" sm="12" md={12}>
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllOrdemServicos}
                        setMostarFiltros={setMostarFiltros}
                        idOrdemCriada={consultaChoice}
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
                incicarOrdemServico &&
                <Iniciar incicarOrdemServico={incicarOrdemServico} setIniciarOrdemServico={setIniciarOrdemServico} atualizarOrdemServico={atualizarOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico}  idOrdemServico={consultaChoice} setIdOrdemServico={setOrdemServicoChoice} callback={requestAllOrdemServicos} />
            }
           
         </>

    )
}

export default OrdemServico;