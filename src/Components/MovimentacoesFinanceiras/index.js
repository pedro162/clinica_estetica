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
import { faHome, faSearch, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
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
    const [status, setStatus] = React.useState(null)
    const [prioridade, setPrioridade] = React.useState(null)
    const [historico, setHistorico] = React.useState(null)
    const [tipo, setTipo] = React.useState(null)
    const [dtInicio, setDtInicio] = React.useState(null)
    const [dtFim, setDtFim] = React.useState(null)
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)

    const [filtroAbertas, setFiltroAbertas] = React.useState(false)
    const [filtroConcluidas, setFiltroConcluidas] = React.useState(false)
    const [filtroCanceladas, setFiltroCanceladas] = React.useState(false)
    const [filtroRemarcadas, setFiltroRemarcadas] = React.useState(false)

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

    const handleCodigoMovimentacoesFinanceiraFilter = ({target})=>{
        setCodigoMovimentacoesFinanceira(target.value)
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


    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'id':codigoMovimentacoesFinanceira,onChange:handleCodigoMovimentacoesFinanceiraFilter,    onBlur:handleCodigoMovimentacoesFinanceiraFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[], 
            hasLabel: true,
            contentLabel:'Filial',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'id':codigoFilial,onChange:handleCodigoFilialFilter,    onBlur:handleCodigoFilialFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Cod pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':pessoa,onChange:handleCodPessoaFilter,    onBlur:handleCodPessoaFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name_atendido':pessoa,onChange:handleNamePessoaFilter,    onBlur:handleNamePessoaFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Cod profissional',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'profissional_id':codigoProfissional,onChange:handleCodProfissionalFilter,    onBlur:handleCodProfissionalFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Profissional',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name_profissional':profissional,onChange:handleNameProfissionalFilter,    onBlur:handleNameProfissionalFilter, onKeyUp:handleSearch},

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
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'status':status,onChange:handleStatusFilter,    onBlur:handleStatusFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[
                {label:'Selecione...',valor:'',props:{selected:'selected'}},
                {label:'Serviço',valor:'servico',props:{}},
                {label:'Avaliação',valor:'avaliacao',props:{}},
                {label:'MovimentacoesFinanceira',valor:'consulta',props:{}},
                {label:'Retorno',valor:'retorno',props:{}},
            ], 
            hasLabel: true,
            contentLabel:'Tipo',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
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
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'prioridade':prioridade,onChange:handlePrioridadeFilter,    onBlur:handlePrioridadeFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Histórico',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'historico':historico,onChange:handleHistoricoFilter,    onBlur:handleHistoricoFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. inicio',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",'dt_inico':dtInicio,onChange:handleDtInicioFilter,    onBlur:handleDtInicioFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. fim',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",'dt_fim':dtFim,onChange:handleDtFimFilter,    onBlur:handleDtFimFilter, onKeyUp:handleSearch},

        },
    ]

    const acoesBottomCard=[{
        label:'Pesquisar',
        icon:<FontAwesomeIcon icon={faSearch} />,
        props:{onClick:()=>requestAllMovimentacoesFinanceiras(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setCadastrarMovimentacoesFinanceira(true), className:'btn btn-sm mx-2 btn-secondary'}
    }
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

   //name_profissional

    //------------
/*
    React.useEffect(()=>{
        setIsMobile(isMobileYet())
    }, [IS_MOBILE, isMobileYet, WINDOW_WIDTH])
*/

    //------------
    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}


        
        if(codigoPessoa){
            filtros['pessoa_id'] = codigoPessoa;
            detalhesFiltros['pessoa_id'] = {
                label:'pessoa_id',
                value:codigoPessoa,
                resetFilter:()=>setPessoa(''),
            };
        }

        if(pessoa){
            filtros['name'] = pessoa;
            detalhesFiltros['name'] = {
                label:'name',
                value:pessoa,
                resetFilter:()=>setPessoa(''),
            };

            filtros['name_pessoa'] = pessoa;
            detalhesFiltros['name_pessoa'] = {
                label:'name_pessoa',
                value:pessoa,
                resetFilter:()=>setPessoa(''),
            };
        }


        if(codigoProfissional){
            filtros['profissional_id'] = codigoProfissional;
            detalhesFiltros['profissional_id'] = {
                label:'profissional_id',
                value:codigoProfissional,
                resetFilter:()=>setCodigoProfissional(''),
            };
        }


        if(profissional){
            filtros['name_profissional'] = profissional;
            detalhesFiltros['name_profissional'] = {
                label:'name_profissional',
                value:profissional,
                resetFilter:()=>setProfissional(''),
            };
        }


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


        if(status){
            filtros['status'] = status;
            detalhesFiltros['status'] = {
                label:'status',
                value:status,
                resetFilter:()=>setStatus(''),
            };
        }


        if(prioridade){
            filtros['prioridade'] = prioridade;
            detalhesFiltros['prioridade'] = {
                label:'prioridade',
                value:prioridade,
                resetFilter:()=>setPrioridade(''),
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


        if(tipo){
            filtros['tipo'] = tipo;
            detalhesFiltros['tipo'] = {
                label:'tipo',
                value:tipo,
                resetFilter:()=>setTipo(''),
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
            filtros['name'] = filtroMobile;
            detalhesFiltros['name'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>setFiltroMobile(''),
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
                resetFilter:()=>setFiltroAbertas(''),
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
                resetFilter:()=>setFiltroConcluidas(''),
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


        return {filtros, detalhesFiltros};
    }

    const requestAllMovimentacoesFinanceiras = async() =>{
        setMovimentacoesFinanceira([])

        let {filtros, detalhesFiltros} = montarFiltro();
        const {url, options} = CONTAS_MOVIMENTACOES_FINANCEIRAS_ALL_POST({...filtros}, getToken());


        const {response, json} = await request(url, options);
        console.log('All clients here')
        console.log({'name_pessoa':pessoa})
        console.log(json)
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

        
    }, [filtroConcluidas, filtroCanceladas, filtroAbertas, filtroRemarcadas])


   
    return(
        <>
            <Breadcrumbs
                items={[
                        {
                            props:{},
                            label:'Início'
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
                {mostarFiltros && 
                    (
                        <>

                            <Col  xs="12" sm="12" md="3" className={'default_card_report'} >
                                <Filter
                                    filtersArr={filtersArr}
                                    actionsArr={acoesBottomCard}
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarMovimentacoesFinanceira(true);}} ><FontAwesomeIcon icon={faPlus} /> MovimentacoesFinanceira</Button>
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

                 <Col  xs="12" sm="12" md={isMobile ==true ? '12' : mostarFiltros ? "9":"12"}>
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllMovimentacoesFinanceiras}
                        setMostarFiltros={setMostarFiltros}
                        idMovimentacoesFinanceiraCriada={consultaChoice}
                        nadaEncontrado={nadaEncontrado}
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