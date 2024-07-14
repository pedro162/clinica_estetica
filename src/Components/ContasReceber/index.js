import React from 'react';
import estilos from './ContasReceber.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONTAS_RECEBER_ALL_POST, FILIAIS_ALL_POST, RECORD_NUMBER_PER_REQUEST} from '../../api/endpoints/geral.js'
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
import FormContasReceber from './FormContasReceber/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min.js';


const ContasReceber = ({defaultFilters ,...props})=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setContasReceber] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarContasReceber, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setContasReceberChoice] = React.useState(null);
    const [atualizarContasReceber, setAtualizarContasReceber] = React.useState(false)   
    const [cancelarContasReceber, setCancelarContasReceber] = React.useState(false)   
    const [digitarContasReceber, setDigitarContasReceber] = React.useState(false)    
    const [cadastrarContasReceber, setCadastrarContasReceber] = React.useState(false)
    const [mostarFiltros, setMostarFiltros] = React.useState(true) 
    const [acao, setAcao] = React.useState(null)
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [filtroAbertas, setFiltroAbertas] = React.useState(false)
    const [filtroPagas, setFiltroPagas] = React.useState(false)
    const [filtroVencidas, setFiltroVencidas] = React.useState(false)
    const [filtroAvencer, setFiltroAvencer] = React.useState(false)
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(RECORD_NUMBER_PER_REQUEST)
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [ordenacao, setOrdenacao] = React.useState('')
    const [codCobReceber, setCodCobReceber] = React.useState('')
    const [dataFiliais, setDataFiliais] = React.useState([])
    const [codFilial, setCodFilial] = React.useState('')
    const [codPessoa, setCodPessoa] = React.useState('')
    const [historico, setHistorico] = React.useState('')
    const [status, setStatus] = React.useState('')
    const [dtInicio, setDtInico] = React.useState('')
    const [dtFim, setDtFim] = React.useState('')
    const [tpExercicio, setTpExercicio] = React.useState('')
    const [appliedFilters, setAppliedFilters] = React.useState([])

    const [referenciaContasReceber, setReferenciaContasReceber] = React.useState(()=>{
        return defaultFilters?.referencia
    })
    const [idReferenciaContasReceber, setIdReferenciaContasReceber] = React.useState(()=>{
        return defaultFilters?.referencia_id
    })  
    const [pessoa, setPessoa] = React.useState(()=>{
        return defaultFilters?.name_pessoa
    })

    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllContasRecebers();
        }
    }

    const handleFiltroTpExercicio = ({target})=>{
        setTpExercicio(target.value)
    }
    const handleFiltroInicio = ({target})=>{
        setDtInico(target.value)
    }

    const handleFiltroFim = ({target})=>{
        setDtFim(target.value)
    }


    const handleFiltroStatus = ({target})=>{
        setStatus(target.value)
    }

    const handleFiltroHistorico = ({target})=>{
        setHistorico(target.value)
    }

    const handleFiltroCodPessoa = ({target})=>{
        setCodPessoa(target.value)
    }
    
    const handleFiltroCodFilial = ({target})=>{
        setCodFilial(target.value)
    }
    
    const handleFiltroCodCobReceber = ({target})=>{
        setCodCobReceber(target.value)
    }

    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const setNamePessoa = ({target})=>{        
        setPessoa(target.value)
    }

    const setDsReferencia = ({target})=>{
        
        setReferenciaContasReceber(target.value)
    }

    const setIdReferencia = ({target})=>{
        setIdReferenciaContasReceber(target.value)
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
            atributsFormControl:{'type':'text', size:"sm",'name':'id', value:codCobReceber, onChange:handleFiltroCodCobReceber, onBlur:handleFiltroCodCobReceber, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[...preparaFilialToForm()], 
            hasLabel: true,
            contentLabel:'Filial',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'select', size:"sm",'name':'filial_id', value:codFilial, onChange:handleFiltroCodFilial, onBlur:handleFiltroCodFilial, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':codPessoa, value:codPessoa, onChange:handleFiltroCodPessoa, onBlur:handleFiltroCodPessoa, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':pessoa, value:pessoa, onChange:setNamePessoa, onBlur:setNamePessoa, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Histórico',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':"descricao", value:historico, onChange:handleFiltroHistorico, onBlur:handleFiltroHistorico, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Aberto', 'value':'aberto'},{'label':'Pago', 'value':'pago'}], 
            hasLabel: true,
            contentLabel:'Status',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'select', size:"sm",'name':'status', value:status, onChange:handleFiltroStatus, onBlur:handleFiltroStatus, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Cód. ref',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'referencia_id':idReferenciaContasReceber,value:idReferenciaContasReceber ,onChange:setIdReferencia, onBlur:setIdReferencia , onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Ordems de serviços', 'value':'ordem_servicos'},{'label':'Sem referência', 'value':'sem_referencia'}], 
            hasLabel: true,
            contentLabel:'Referência',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'referencia':referenciaContasReceber, value:referenciaContasReceber, onChange:setDsReferencia,    onBlur:setDsReferencia , onKeyUp:handleSearch},

        },    
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Criação', 'value':'criacao'},{'label':'Vencimento', 'value':'vencimento'}], 
            hasLabel: true,
            contentLabel:'Tipo exercício',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'select', size:"sm",'name':'tp_exercicio', value:tpExercicio, onChange:handleFiltroTpExercicio, onBlur:handleFiltroTpExercicio, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. inicio',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",'name':dtInicio,onChange:handleFiltroInicio, onBlur:handleFiltroInicio , onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. fim',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",'name':dtFim,onChange:handleFiltroFim, onBlur:handleFiltroFim, onKeyUp:handleSearch},

        },     
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
            {'label':'Status A-Z', 'value':'status-asc'},{'label':'Status Z-A', 'value':'status-desc'},], 
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
            props:{onClick:()=>requestAllContasRecebers(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Limpar',
            icon:<FontAwesomeIcon icon={faBroom} />,
            props:{onClick:()=>limparFiltros(), className:'btn btn-sm btn-secondary mx-2'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarContasReceber(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];

    const acoesHeaderCard=[{
            label:'',
            icon:<FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props:{onClick:()=>{setMostarFiltros(!mostarFiltros);}, className:'btn btn-sm btn-secondary'},
        },
    ];    

    React.useEffect(()=>{

        if(cadastrarContasReceber == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }        
    }, [cadastrarContasReceber])

    const atualizarContasReceberAction = (idContasReceber)=>{
        setContasReceberChoice(idContasReceber)
        setAcao('editar')
        setAtualizarContasReceber(true);
    }

    const digitarContasReceberAction = (idContasReceber)=>{
        setContasReceberChoice(idContasReceber)
        setAcao('digitar')
        setAtualizarContasReceber(true);
    }

    const cancelarContasReceberAction = (idContasReceber)=>{
        setContasReceberChoice(idContasReceber)
        setAcao('cancelar')
        setCancelarContasReceber(true);
    }
    //cancelarContasReceber, setCancelarContasReceber
    const novaContasReceber = (idContasReceber)=>{
        setContasReceberChoice(idContasReceber)
        setAcao('consultar')
        setAtualizarContasReceber(true);
    }

    const iniciarContasReceber = (idContasReceber)=>{
        setCadastrarContasReceber(idContasReceber)
        setAcao('iniciar')
        setCadastrarContasReceber(true);
    }

    const limparFiltros = ()=>{
        setReferenciaContasReceber('');
        setPessoa('');
        setFiltroMobile('');
        setFiltroAbertas(false);
        setFiltroPagas(false)
        setFiltroVencidas(false)
        setFiltroAvencer(false)
        setOrdenacao('');
        setCodCobReceber('');
        setCodFilial('');
        setHistorico('');
        setCodPessoa('');
        setStatus('');
        setDtInico('');
        setDtFim('');
        setTpExercicio('');
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
        
        if(codCobReceber){
            filtros['id'] = codCobReceber;
            detalhesFiltros['id'] = {
                label:'Código',
                value:codCobReceber,
                resetFilter:()=>{setCodCobReceber('');removeFilter('id')},
            };
        }

        if(codFilial){
            filtros['filial_id'] = codFilial;
            detalhesFiltros['filial_id'] = {
                label:'Código filial',
                value:codFilial,
                resetFilter:()=>{setCodFilial('');removeFilter('filial_id')},
            };
        }
        
        if(codPessoa){
            filtros['pessoa_id'] = codPessoa;
            detalhesFiltros['pessoa_id'] = {
                label:'Código pessoa',
                value:codPessoa,
                resetFilter:()=>{setCodPessoa('');removeFilter('pessoa_id')},
            };
        }

        if(pessoa){
            filtros['name_pessoa'] = pessoa;
            detalhesFiltros['name_pessoa'] = {
                label:'Pessoa',
                value:pessoa,
                resetFilter:()=>{setPessoa('');removeFilter('name_pessoa');},
            };
        }

        if(historico){
            filtros['historico'] = historico;
            detalhesFiltros['historico'] = {
                label:'Histórico',
                value:historico,
                resetFilter:()=>{setHistorico('');removeFilter('historico')},
            };
        }
        
        if(status){
            filtros['status'] = status;
            detalhesFiltros['status'] = {
                label:'Status',
                value:status,
                resetFilter:()=>{setStatus('');removeFilter('status')},
            };
        }
        
        
        if(idReferenciaContasReceber){
            filtros['referencia_id'] = idReferenciaContasReceber;   
            detalhesFiltros['referencia_id'] = {
                label:'Cód. referência',
                value:idReferenciaContasReceber,
                resetFilter:()=>{setIdReferenciaContasReceber('');removeFilter('referencia_id');},
            };
        }

        if(referenciaContasReceber){
            filtros['referencia'] = referenciaContasReceber;
            detalhesFiltros['referencia'] = {
                label:'Referência',
                value:referenciaContasReceber,
                resetFilter:()=>{setReferenciaContasReceber('');removeFilter('referencia')},
            };
        }

        if(filtroMobile){
            filtros['pessoa_name'] = filtroMobile;
            detalhesFiltros['pessoa_name'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>{setFiltroMobile('');removeFilter('pessoa_name')},
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
                value:pessoa,
                resetFilter:()=>{setFiltroAbertas(false);},
            };
        }

        if(filtroPagas){
            if(filtros.hasOwnProperty('status')){
                filtros['status'] += 'pago,';
            }else{
                filtros['status'] = 'pago,';
            }

            detalhesFiltros['status'] = {
                label:'Status',
                value:pessoa,
                resetFilter:()=>setFiltroPagas(false),
            };
        }

        if(! (filtroAvencer && filtroAvencer)){

        
            if(filtroVencidas){
                filtros['vencido'] = 'yes';
                detalhesFiltros['vencido'] = {
                    label:'Vencidos',
                    value:pessoa,
                    resetFilter:()=>setFiltroVencidas(false),
                };
            }

            if(filtroAvencer){
                filtros['vencido'] = 'no';
                detalhesFiltros['vencido'] = {
                    label:'Vencidos',
                    value:pessoa,
                    resetFilter:()=>setFiltroAvencer(false),
                };
            }
        }
        
        if(tpExercicio){
            filtros['tp_exercicio'] = tpExercicio;
            detalhesFiltros['tp_exercicio'] = {
                label:'Tipo exercício',
                value:tpExercicio,
                resetFilter:()=>{setTpExercicio('');removeFilter('tp_exercicio')},
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
                label:'Ordem',
                value:ordenacao,
                resetFilter:()=>{setOrdenacao('');removeFilter('ordem');},
            };
        }

        
        return {filtros, detalhesFiltros};
    }
    const requestAllContasRecebers = async() =>{
        setContasReceber([])
        setNadaEncontrado(false)

        let {filtros, detalhesFiltros} = montarFiltro();
        setAppliedFilters(detalhesFiltros)
        let {url, options} = CONTAS_RECEBER_ALL_POST({...filtros}, getToken());
        if(nextPage){
            url = nextPage;
        }

        const {response, json} = await request(url, options);
        if(json){
            setContasReceber(json)
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
        setContasReceber([])

        let {filtros, detalhesFiltros} = montarFiltro();
        filtros.status = 'aberto';
        setAppliedFilters(detalhesFiltros)
        let {url, options} = CONTAS_RECEBER_ALL_POST({...filtros}, getToken());
        if(nextPage){
            url = nextPage;
        }
        const {response, json} = await request(url, options);
        if(json){
            setContasReceber(json)
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

    React.useEffect(()=>{

        const requestDataConfigEffect = async() =>{
            await requestAllFilials()
        }
        const requestAllContasRecebersEffect = async() =>{
            await requestAllContasRecebers();            
        }

        requestDataConfigEffect();
        requestAllContasRecebersEffect();

        
    }, [filtroAvencer, filtroVencidas, filtroPagas, filtroAbertas,nextPage, setNextPage])

    React.useEffect(()=>{
        let {filtros, detalhesFiltros} = montarFiltro();
        setAppliedFilters(detalhesFiltros)
    }, [])

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
                            label:'Contas a receber'
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
                                    activeFilters={appliedFilters}
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
                                                                        requestAllContasRecebers();
                                                                    }
                                                                }, 
                                                                value:filtroMobile,

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllContasRecebers();}} size={'lg'} icon={faSearch}/>
                                            </Col>
                                        
                                            
                                         </Row>
                                        <Row className={'mt-2'}>
                                            <div  style={{display:'flex', flexDirection:'collumn', flexWrap:'wrap'}}>
                                                {(filtroAbertas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAbertas(false);}} ><FontAwesomeIcon icon={faTimes} /> Abertas</Button> : '')}
                                                {(filtroPagas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroPagas(false);}} ><FontAwesomeIcon icon={faTimes} /> Pagas</Button> : '')}
                                                {(filtroVencidas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroVencidas(false);}} ><FontAwesomeIcon icon={faTimes} /> Vencidas</Button> : '')}
                                                {(filtroAvencer ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAvencer(false);}} ><FontAwesomeIcon icon={faTimes} /> A vencer</Button> : '')}
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarContasReceber(true);}} ><FontAwesomeIcon icon={faPlus} /> Receita</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAbertas(true); }} ><FontAwesomeIcon icon={faSearch} /> Abertas</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroPagas(true); }} ><FontAwesomeIcon icon={faSearch} /> Pagas</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroVencidas(true); }} ><FontAwesomeIcon icon={faSearch} /> Vencidas</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAvencer(true);}} ><FontAwesomeIcon icon={faSearch} /> A vencer</Button>
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
                        callBack={requestAllContasRecebers}
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
                cadastrarContasReceber &&
                <Cadastrar cadastrarContasReceber={cadastrarContasReceber} setCadastrarContasReceber={setCadastrarContasReceber} atualizarContasReceber={atualizarContasReceber} setAtualizarContasReceber={setAtualizarContasReceber}  idContasReceber={consultaChoice} setIdContasReceber={setContasReceberChoice} callback={requestAllContasRecebers} />
            }
           
         </>

    )
}

export default ContasReceber;