import React from 'react';
import estilos from './Agenda.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, AGENDA_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
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


const Agenda = (props)=>{

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
    const [filtroPendentes, setFiltroPendentes] = React.useState(false)
    const [filtroConcluidas, setFiltroConcluidas] = React.useState(false)
    const [filtroCanceladas, setFiltroCanceladas] = React.useState(false)
    const [dtInicio, setDtInicio] = React.useState(null)
    const [dtFim, setDtFim] = React.useState(null)

    
    const {getToken, dataUser, isMobile} = React.useContext(UserContex);

    const {type, is_system, tenant_id} = dataUser ? dataUser : {};

    const alerta = (target)=>{
        console.log(target)
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

    //------------
    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}


        
        if(codigoPessoa){
            filtros['pessoa_id'] = codigoPessoa;
            detalhesFiltros['pessoa_id'] = {
                label:'pessoa_id',
                value:codigoPessoa,
                resetFilter:()=>setCodigoPessoa(''),
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

        if(agenda_id){
            filtros['id'] = agenda_id;
            detalhesFiltros['id'] = {
                label:'id',
                value:agenda_id,
                resetFilter:()=>setAgendaId(''),
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
            filtros['name'] = filtroMobile;
            detalhesFiltros['name'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>setFiltroMobile(''),
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



        return {filtros, detalhesFiltros};
    }



    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':agenda_id,onChange:handleIdFilter,    onBlur:handleIdFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código pessoa',
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
            atributsFormControl:{'type':'text', size:"sm",'name':'nome',onChange:handleNamePessoaFilter,    onBlur:handleNamePessoaFilter, onKeyUp:handleSearch},

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
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'nome',onChange:handleStatusFilter,    onBlur:handleStatusFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Histórico',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"12",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'nome',onChange:handleHistoricoFilter,    onBlur:handleHistoricoFilter, onKeyUp:handleSearch},

        }
    ]

    const acoesBottomCard=[{
            label:'Pesquisar',
            icon:<FontAwesomeIcon icon={faSearch} />,
            props:{onClick:()=>requestAllAgenda(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarAgenda(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];


    const requestAllAgenda = async() =>{
        setAgenda([])

        let {filtros, detalhesFiltros} = montarFiltro();

        const {url, options} = AGENDA_ALL_POST({...filtros}, getToken());


        const {response, json} = await request(url, options);
        console.log('All clients here')
        console.log(json)
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

        
    }, [filtroPendentes, filtroConcluidas, filtroCanceladas])

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
                            <Col  xs="12" sm="12" md="12" className={'default_card_report'}>
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarAgenda(true);}} ><FontAwesomeIcon icon={faPlus} /> Agenda</Button>
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
