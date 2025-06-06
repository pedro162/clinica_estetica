import React from 'react';
import estilos from './Agenda.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, AGENDA_ALL_POST, RECORD_NUMBER_PER_REQUEST} from '../../api/endpoints/geral.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faTimes, faChevronUp, faChevronDown, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormAgenda from './FormAgenda/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const Agenda = ({defaultFilters, ...props})=>{

	const {data, error, request, loading} = useFetch();
    const [cidade, setAgenda] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarAgenda, setShowModalCriarAgenda] = React.useState(false)
    const [showModalAtualizarAgenda, setShowModalAtualizarAgenda] = React.useState(false)
    const [cidadeChoice, setAgendaChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [cadastrarAgenda, setCadastrarAgenda] = React.useState(false)    
    const [dataEstado, setDataEstado] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [codigoPessoa, setCodigoPessoa] = React.useState(null)
    const [status, setStatus] = React.useState(null)
    const [historico, setHistorico] = React.useState(null)
    const [agenda_id, setAgendaId] = React.useState('')
    const [mostarFiltros, setMostarFiltros] = React.useState(true) 
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [ordenacao, setOrdenacao] = React.useState('')
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(RECORD_NUMBER_PER_REQUEST)
    const [filtroPendentes, setFiltroPendentes] = React.useState(false)
    const [filtroConcluidas, setFiltroConcluidas] = React.useState(false)
    const [filtroCanceladas, setFiltroCanceladas] = React.useState(false)
    const [dtInicio, setDtInicio] = React.useState(null)
    const [dtFim, setDtFim] = React.useState(null)
    const [appliedFilters, setAppliedFilters] = React.useState([])
    
    const {getToken, dataUser, isMobile} = React.useContext(UserContex);

    const {type, is_system, tenant_id} = dataUser ? dataUser : {};

    const setNamePessoa = ({target})=>{
        
        setPessoa(target.value)
    }

    const handleCodPessoaFilter = ({target})=>{
        setCodigoPessoa(target.value)
    }

    const handleNamePessoaFilter = ({target})=>{
        setPessoa(target.value)
    }

    const handleStatusFilter = ({target})=>{    
        setStatus(target.value)
    }
    const handleHistoricoFilter = ({target})=>{    
        setHistorico(target.value)
    }

    const handleIdFilter = ({target})=>{    
        setAgendaId(target.value)
    }
    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllAgenda();
        }
    }
    
    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }
    const setOrdenacaoFiltro = ({target})=>{        
        setOrdenacao(target.value)
    }

    const limparFiltros = ()=>{
        setCodigoPessoa('')
        setPessoa('');
        setAgendaId('')
        setStatus('')
        setHistorico('')
        setFiltroMobile('');
        setOrdenacao('');
        setDtInicio('');
        setDtFim('');
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

        if(agenda_id){
            filtros['id'] = agenda_id;
            detalhesFiltros['id'] = {
                label:'id',
                value:agenda_id,
                resetFilter:()=>{setAgendaId('');removeFilter('id')},
            };
        }

        if(codigoPessoa){
            filtros['pessoa_id'] = codigoPessoa;
            detalhesFiltros['pessoa_id'] = {
                label:'pessoa_id',
                value:codigoPessoa,
                resetFilter:()=>{setCodigoPessoa('');removeFilter('pessoa_id')},
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
        }
        if(status){
            filtros['status'] = status;
            detalhesFiltros['status'] = {
                label:'status',
                value:status,
                resetFilter:()=>{setStatus('');removeFilter('status')},
            };
        }


        if(historico){
            filtros['descricao'] = historico;
            detalhesFiltros['descricao'] = {
                label:'Historico',
                value:historico,
                resetFilter:()=>{setHistorico('');removeFilter('descricao')},
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
                label:'Período',
                value:dtInicio+','+dtInicio,
                resetFilter:()=>{setDtInicio('');setDtFim('');removeFilter('dt_periodo')},
            };
        }
        

        if(filtroMobile){
            filtros['name'] = filtroMobile;
            detalhesFiltros['name'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>{setFiltroMobile('');removeFilter('name')},
            };
        }

        if(filtroPendentes){
            if(filtros.hasOwnProperty('status')){
                filtros['status'] += 'pendente,';
            }else{
                filtros['status'] = 'pendente,';
            }

            detalhesFiltros['status'] = {
                label:'Status',
                value:filtroMobile,
                resetFilter:()=>setFiltroPendentes(''),
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



    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'agenda_id', value:agenda_id,onChange:handleIdFilter,    onBlur:handleIdFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'pessoa_id', value:codigoPessoa,onChange:handleCodPessoaFilter,    onBlur:handleCodPessoaFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'name', value:pessoa,onChange:handleNamePessoaFilter,    onBlur:handleNamePessoaFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[
                {label:'Selecione...',valor:'',props:{selected:'selected'}},
                {label:'Pendente',valor:'pendente',props:{}},
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
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Histórico',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'descricao', value:historico,onChange:handleHistoricoFilter,    onBlur:handleHistoricoFilter, onKeyUp:handleSearch},

        },    
        {
            type:'select',
            options:[
                {'label':'Selecione...', 'value':''},
                {'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
                {'label':'Pessoa A-Z', 'value':'name-asc'},{'label':'Pessoa Z-A', 'value':'name-desc'},
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
            props:{onClick:()=>requestAllAgenda(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Limpar',
            icon:<FontAwesomeIcon icon={faBroom} />,
            props:{onClick:()=>limparFiltros(), className:'btn btn-sm btn-secondary mx-2'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>alert('Em desenvolvimento'), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];

    const acoesHeaderCard=[
        {
            label:'',
            icon:<FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props:{onClick:()=>{setMostarFiltros(!mostarFiltros);}, className:'btn btn-sm btn-secondary'},
        },
    ];
    
    const requestAllAgenda = async() =>{
        setAgenda([])
        setNadaEncontrado(false)

        let {filtros, detalhesFiltros} = montarFiltro();
        setAppliedFilters(detalhesFiltros)
        let {url, options} = AGENDA_ALL_POST({...filtros}, getToken());
        if(nextPage){
            url = nextPage;
        }
        const {response, json} = await request(url, options);
        if(json){
            setAgenda(json)
            
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

        const requestAllAgendaEffect = async() =>{       
           await requestAllAgenda();            
        }

        requestAllAgendaEffect();

        
    }, [filtroPendentes, filtroConcluidas, filtroCanceladas, nextPage, setNextPage, defaultFilters])

    React.useEffect(()=>{

        if(cidadeChoice > 0){
            setAtualizarCadastro(true);
        }else{
            setAtualizarCadastro(false);
        }
        
    }, [cidadeChoice])

    React.useEffect(()=>{

        if(cadastrarAgenda == true){
            setShowModalCriarAgenda(true);
        }else{
            setShowModalCriarAgenda(false);
        }
        
    }, [cadastrarAgenda])

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
                            label:<> <Link className={null}  to={'/home/painel'}>Início</Link></>
                        },
                        {
                            props:{},
                            label:'Agenda'
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
                                                                        requestAllAgenda();
                                                                    }
                                                                },
                                                                value:filtroMobile

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllAgenda();}} size={'lg'} icon={faSearch}/>
                                            </Col>
                                        
                                            
                                         </Row>

                                         <Row className={'mt-2'}>
                                            <div  style={{display:'flex', flexDirection:'collumn', flexWrap:'wrap'}}>
                                                {(filtroPendentes ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroPendentes(false);}} ><FontAwesomeIcon icon={faTimes} /> Pendentes</Button> : '')}
                                                {(filtroConcluidas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroConcluidas(false);}} ><FontAwesomeIcon icon={faTimes} /> Concluídas</Button> : '')}
                                                {(filtroCanceladas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroCanceladas(false);}} ><FontAwesomeIcon icon={faTimes} /> Canceladas</Button> : '')}
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
                                        
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroPendentes(true);}} ><FontAwesomeIcon icon={faSearch} /> Abertas</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroConcluidas(true);}} ><FontAwesomeIcon icon={faSearch} /> Concluídas</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroCanceladas(true);}} ><FontAwesomeIcon icon={faSearch} /> Canceladas</Button>
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{alert('Em desenvolvimento')}} ><FontAwesomeIcon icon={faPlus} /> Agenda</Button>
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
                        dataEstado={cidade}
                        loadingData={loading}
                        callBack={requestAllAgenda}
                        setMostarFiltros={setMostarFiltros}
                        idAgendaCriada={cidadeChoice}
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
                cadastrarAgenda && <Cadastrar cadastrarAgenda={cadastrarAgenda} setCadastrarAgenda={setCadastrarAgenda} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idAgenda={cidadeChoice} setIdAgenda={setAgendaChoice} callback={requestAllAgenda} />
            }
            
            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idAgenda={cidadeChoice} setIdAgenda={setAgendaChoice} callback={requestAllAgenda} />
            }
         </>

	)
}

export default Agenda;

//<FormAgenda dataEstado={dataEstado} dataClienteChoice={[]}  atualizarCadastro={false} setAtualizarCadastro={setAtualizarCadastro}  idAgenda={null} setIdAgenda={setAgendaChoice}  showModalCriarAgenda={showModalCriarAgenda} setShowModalCriarAgenda={setShowModalCriarAgenda} callback={requestAllAgenda} />
