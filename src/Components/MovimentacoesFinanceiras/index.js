import React from 'react';
import estilos from './MovimentacoesFinanceira.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONTAS_MOVIMENTACOES_FINANCEIRAS_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {IS_MOBILE, MOBILE_WITH, isMobileYet, WINDOW_WIDTH} from '../../var/index.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faTimes, faChevronDown, faChevronUp, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormMovimentacoesFinanceira from './FormMovimentacoesFinanceira/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Cancelar from './Cancelar/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min.js';


const MovimentacoesFinanceira = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setMovimentacoesFinanceira] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarMovimentacoesFinanceira, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setMovimentacoesFinanceiraChoice] = React.useState(null);
    const [atualizarMovimentacoesFinanceira, setAtualizarMovimentacoesFinanceira] = React.useState(false)   
    const [cancelarMovimentacoesFinanceira, setCancelarMovimentacoesFinanceira] = React.useState(false)    
    const [cadastrarMovimentacoesFinanceira, setCadastrarMovimentacoesFinanceira] = React.useState(false) 
    const [mostarFiltros, setMostarFiltros] = React.useState(true) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [codigoPessoa, setCodigoPessoa] = React.useState(null)
    const [profissional, setProfissional] = React.useState('')
    const [codigoProfissional, setCodigoProfissional] = React.useState(null)
    const [codigoMovimentacoesFinanceira, setCodigoMovimentacoesFinanceira] = React.useState(null)
    const [codigoFilial, setCodigoFilial] = React.useState(null)
    const [estornado, setEstornado] = React.useState(null)
    const [conciliado, setConciliado] = React.useState(null)
    const [historico, setHistorico] = React.useState(null)
    const [codigoOrigem, setCodigoOrigem] = React.useState(null)
    const [origem, setOrigem] = React.useState(null)
    const [dtInicio, setDtInicio] = React.useState(null)
    const [dtFim, setDtFim] = React.useState(null)
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(10)
    const [filtroEstornadas, setFiltroEstornadas] = React.useState(false)
    const [filtroDebitos, setFiltroDebitos] = React.useState(false)
    const [filtroCreditos, setFiltroCreditos] = React.useState(false)
    const [filtroConciliadas, setFiltroConciliadas] = React.useState(false)
    const [ordenacao, setOrdenacao] = React.useState('')

    const {getToken, dataUser, isMobile} = React.useContext(UserContex);

    const {type, is_system, tenant_id} = dataUser ? dataUser : {};

    if(type=='external'){
        
    }


    const alerta = (target)=>{
        console.log(target)
    }
    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllMovimentacoesFinanceiras();
        }
    }

    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const handleCodigoMovimentacoesFinanceiraFilter = ({target})=>{
        setCodigoMovimentacoesFinanceira(target.value)
    }

    const handleCodigoFilialFilter = ({target})=>{
        setCodigoFilial(target.value)
    }

    const handleDtInicioFilter = ({target})=>{
        setDtInicio(target.value)
    }

    const handleCodigoOrigemFilter = ({target})=>{
        setCodigoOrigem(target.value)
    }

    const handleOrigemFilter = ({target})=>{
        setOrigem(target.value)
    }

    const handleEstornadoFilter = ({target})=>{
        setEstornado(target.value)
    }


    const handleHistoricoFilter = ({target})=>{
        setHistorico(target.value)
    }

    

    const handleConciliadoFilter = ({target})=>{
        setConciliado(target.value)
    }


    const handleDtFimFilter = ({target})=>{
        setDtFim(target.value)
    }


    const setOrdenacaoFiltro = ({target})=>{
        
        setOrdenacao(target.value)
    }

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'id':codigoMovimentacoesFinanceira, value:codigoMovimentacoesFinanceira,onChange:handleCodigoMovimentacoesFinanceiraFilter,    onBlur:handleCodigoMovimentacoesFinanceiraFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[], 
            hasLabel: true,
            contentLabel:'Filial',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'id':codigoFilial, value:codigoFilial,onChange:handleCodigoFilialFilter,    onBlur:handleCodigoFilialFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[], 
            hasLabel: true,
            contentLabel:'Caixa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'caixa_id':codigoFilial, value:codigoFilial,onChange:handleCodigoFilialFilter,    onBlur:handleCodigoFilialFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[
                {label:'Selecione...',valor:'',props:{selected:'selected'}},
                {label:'Sim',valor:'yes',props:{}},
                {label:'Não',valor:'no',props:{}},
            ], 
            hasLabel: true,
            contentLabel:'Estornadas',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'estornado':estornado, value:estornado,onChange:handleEstornadoFilter,    onBlur:handleEstornadoFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[
                {label:'Selecione...',valor:'',props:{selected:'selected'}},
                {label:'Sim',valor:'yes',props:{}},
                {label:'Não',valor:'no',props:{}},
            ], 
            hasLabel: true,
            contentLabel:'Concilidadas',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'conciliado':conciliado, value:conciliado, onChange:handleConciliadoFilter,    onBlur:handleConciliadoFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Histórico',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'historico':historico, value:historico ,onChange:handleHistoricoFilter,    onBlur:handleHistoricoFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Cod. origem',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'codigo_origem':codigoOrigem, value:codigoOrigem,onChange:handleCodigoOrigemFilter,    onBlur:handleCodigoOrigemFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[
                {label:'Selecione...',valor:'',props:{selected:'selected'}},
                {label:'Contas a receber',valor:'contas_receber',props:{}},
                {label:'Contas a pagar',valor:'contas_pagar',props:{}},
            ], 
            hasLabel: true,
            contentLabel:'Origem',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'conciliado':conciliado, value:conciliado, onChange:handleConciliadoFilter,    onBlur:handleConciliadoFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. inicio',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",'dt_inico':dtInicio, value:dtInicio, onChange:handleDtInicioFilter,    onBlur:handleDtInicioFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. fim',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",'dt_fim':dtFim, value:dtFim,onChange:handleDtFimFilter,    onBlur:handleDtFimFilter, onKeyUp:handleSearch},

        },    
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
            {'label':'Histórico A-Z', 'value':'historico-asc'},{'label':'Histórico Z-A', 'value':'historico-desc'},], 
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
        props:{onClick:()=>requestAllMovimentacoesFinanceiras(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Limpar',
        icon:<FontAwesomeIcon icon={faBroom} />,
        props:{onClick:()=>limparFiltros(), className:'btn btn-sm btn-secondary mx-2'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setCadastrarMovimentacoesFinanceira(true), className:'btn btn-sm btn-secondary'}
    }
    ];

    const acoesHeaderCard=[{
            label:'',
            icon:<FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props:{onClick:()=>{setMostarFiltros(!mostarFiltros);}, className:'btn btn-sm btn-secondary'},
        },
    ];    

    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarMovimentacoesFinanceira(true);
                }else{
                    setAtualizarMovimentacoesFinanceira(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarMovimentacoesFinanceira(true);
                }else{
                    setCancelarMovimentacoesFinanceira(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarMovimentacoesFinanceira == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarMovimentacoesFinanceira])

    const atualizarMovimentacoesFinanceiraAction = (idMovimentacoesFinanceira)=>{
        setMovimentacoesFinanceiraChoice(idMovimentacoesFinanceira)
        setAcao('editar')
        setAtualizarMovimentacoesFinanceira(true);
    }
    const cancelarMovimentacoesFinanceiraAction = (idMovimentacoesFinanceira)=>{
        setMovimentacoesFinanceiraChoice(idMovimentacoesFinanceira)
        setAcao('cancelar')
        setCancelarMovimentacoesFinanceira(true);
    }
    //cancelarMovimentacoesFinanceira, setCancelarMovimentacoesFinanceira
    const novaMovimentacoesFinanceira = (idMovimentacoesFinanceira)=>{
        setMovimentacoesFinanceiraChoice(idMovimentacoesFinanceira)
        setAcao('consultar')
        setAtualizarMovimentacoesFinanceira(true);
    }

    const limparFiltros = ()=>{
        setCodigoMovimentacoesFinanceira('');
        setCodigoFilial('');
        setEstornado('');
        setCodigoOrigem('')
        setOrigem('');
        setDtInicio('');
        setDtFim('');
        setFiltroMobile('');
        setFiltroEstornadas('');
        setFiltroConciliadas('');
        setHistorico('')
        setOrdenacao('')

    }
    //------------
    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}

        if(codigoMovimentacoesFinanceira){
            filtros['id'] = codigoMovimentacoesFinanceira;
            detalhesFiltros['id'] = {
                label:'id',
                value:codigoMovimentacoesFinanceira,
                resetFilter:()=>setCodigoMovimentacoesFinanceira(''),
            };
        }


        if(codigoFilial){
            filtros['filial_id'] = codigoFilial;
            detalhesFiltros['filial_id'] = {
                label:'filial_id',
                value:codigoFilial,
                resetFilter:()=>setCodigoFilial(''),
            };
        }

        if(estornado){
            filtros['estornado'] = estornado;
            detalhesFiltros['estornado'] = {
                label:'estornado',
                value:estornado,
                resetFilter:()=>setEstornado(''),
            };
        }

        if(conciliado){
            filtros['conciliado'] = conciliado;
            detalhesFiltros['conciliado'] = {
                label:'conciliado',
                value:conciliado,
                resetFilter:()=>setEstornado(''),
            };
        }

        if(codigoOrigem){
            filtros['origem_id'] = codigoOrigem;
            detalhesFiltros['origem_id'] = {
                label:'origem_id',
                value:codigoOrigem,
                resetFilter:()=>setCodigoOrigem(''),
            };
        }

        if(origem){
            filtros['origem'] = origem;
            detalhesFiltros['origem'] = {
                label:'origem',
                value:origem,
                resetFilter:()=>setOrigem(''),
            };
        }


        if(historico){
            filtros['historico'] = historico;
            detalhesFiltros['historico'] = {
                label:'historico',
                value:historico,
                resetFilter:()=>setHistorico(''),
            };
        }


        if(dtInicio){
            filtros['dt_inicio'] = dtInicio;
            detalhesFiltros['dt_inicio'] = {
                label:'dt_inicio',
                value:dtInicio,
                resetFilter:()=>setDtInicio(''),
            };
        }


        if(dtFim){
            filtros['dt_fim'] = dtFim;
            detalhesFiltros['dt_fim'] = {
                label:'dt_fim',
                value:dtFim,
                resetFilter:()=>setDtFim(''),
            };
        }

        if(dtInicio && dtFim){

            filtros['dt_periodo'] = dtInicio+','+dtInicio;
            detalhesFiltros['dt_periodo'] = {
                label:'dt_periodo',
                value:dtInicio+','+dtInicio,
                resetFilter:()=>{setDtInicio('');setDtFim('');},
            };
        }
        

        if(filtroMobile){
            filtros['historico'] = filtroMobile;
            detalhesFiltros['historico'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>setFiltroMobile(''),
            };
        }

        if(filtroEstornadas){
            if(filtros.hasOwnProperty('estornado')){
                filtros['estornado'] += 'yes';
            }else{
                filtros['estornado'] = 'yes';
            }

            detalhesFiltros['estornado'] = {
                label:'estornados',
                value:filtroEstornadas,
                resetFilter:()=>setFiltroEstornadas(''),
            };
        }

         if(filtroConciliadas){
            if(filtros.hasOwnProperty('conciliado')){
                filtros['conciliado'] += 'yes';
            }else{
                filtros['conciliado'] = 'yes';
            }

            detalhesFiltros['conciliado'] = {
                label:'conciliado',
                value:filtroConciliadas,
                resetFilter:()=>setFiltroConciliadas(''),
            };
        }

        if(filtroDebitos){
            if(filtros.hasOwnProperty('tp_movimentacao')){
                filtros['tp_movimentacao'] += 'negativa,';
            }else{
                filtros['tp_movimentacao'] = 'negativa,';
            }

            detalhesFiltros['tp_movimentacao'] = {
                label:'tp_movimentacao',
                value:filtroDebitos,
                resetFilter:()=>setFiltroDebitos(''),
            };
        }

        if(filtroCreditos){
            if(filtros.hasOwnProperty('tp_movimentacao')){
                filtros['tp_movimentacao'] += 'positiva,';
            }else{
                filtros['tp_movimentacao'] = 'positiva,';
            }

            detalhesFiltros['tp_movimentacao'] = {
                label:'tp_movimentacao',
                value:filtroCreditos,
                resetFilter:()=>setFiltroCreditos(''),
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

    const requestAllMovimentacoesFinanceiras = async() =>{
        setMovimentacoesFinanceira([])

        let {filtros, detalhesFiltros} = montarFiltro();
        let {url, options} = CONTAS_MOVIMENTACOES_FINANCEIRAS_ALL_POST({...filtros}, getToken());
        if(nextPage){
            url = nextPage;
        }
        const {response, json} = await request(url, options);
        if(json){
            setMovimentacoesFinanceira(json)

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

        const requestAllMovimentacoesFinanceirasEffect = async() =>{
       
           await requestAllMovimentacoesFinanceiras();

            
        }

        requestAllMovimentacoesFinanceirasEffect();

        
    }, [filtroDebitos, filtroCreditos, filtroEstornadas, filtroConciliadas, nextPage, setNextPage])
   
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
                            label:'Movimentacoes Financeiras'
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

                            <Col  xs="12" sm="12" md="12" className={'default_card_report'} >
                                <Filter
                                    filtersArr={filtersArr}
                                    actionsArr={acoesBottomCard}
                                    mostarFiltros={mostarFiltros}
                                    setMostarFiltros={setMostarFiltros}
                                    botoesHeader={acoesHeaderCard}
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
                                                                        requestAllMovimentacoesFinanceiras();
                                                                    }
                                                                },
                                                                value:filtroMobile

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllMovimentacoesFinanceiras();}} size={'lg'} icon={faSearch}/>
                                            </Col>
                                        
                                            
                                         </Row>

                                         <Row className={'mt-2'}>
                                            <div  style={{display:'flex', flexDirection:'collumn', flexWrap:'wrap'}}>
                                               {(filtroEstornadas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroEstornadas(false);}} ><FontAwesomeIcon icon={faTimes} /> Estornadas</Button> : '')}
                                                {(filtroConciliadas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroConciliadas(false);}} ><FontAwesomeIcon icon={faTimes} /> Concilidadas</Button> : '')}
                                                {(filtroDebitos ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroDebitos(false);}} ><FontAwesomeIcon icon={faTimes} /> Debitos</Button> : '')}
                                                {(filtroCreditos ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroCreditos(false);}} ><FontAwesomeIcon icon={faTimes} /> Créditos</Button> : '')}
                                                
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroEstornadas(true);}} ><FontAwesomeIcon icon={faSearch} /> Estornadas</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroConciliadas(true);}} ><FontAwesomeIcon icon={faSearch} /> Concilidadas</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroDebitos(true);}} ><FontAwesomeIcon icon={faSearch} /> Debitos</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroCreditos(true);}} ><FontAwesomeIcon icon={faSearch} /> Créditos</Button>
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

                 <Col  xs="12" sm="12" md={"12"}>
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllMovimentacoesFinanceiras}
                        setMostarFiltros={setMostarFiltros}
                        idMovimentacoesFinanceiraCriada={consultaChoice}
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
                type !='external' && cadastrarMovimentacoesFinanceira && <Cadastrar cadastrarMovimentacoesFinanceira={cadastrarMovimentacoesFinanceira} setCadastrarMovimentacoesFinanceira={setCadastrarMovimentacoesFinanceira} atualizarMovimentacoesFinanceira={atualizarMovimentacoesFinanceira} setAtualizarMovimentacoesFinanceira={setAtualizarMovimentacoesFinanceira}  idMovimentacoesFinanceira={consultaChoice} setIdMovimentacoesFinanceira={setMovimentacoesFinanceiraChoice} callback={requestAllMovimentacoesFinanceiras} />
            }
            
           
         </>

    )
}

export default MovimentacoesFinanceira;