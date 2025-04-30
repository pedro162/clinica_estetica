import React from 'react';
import estilos from './ClientesFichas.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, FORMULARIO_PESSOA_ALL_POST, FILIAIS_ALL_POST, RECORD_NUMBER_PER_REQUEST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faTimes, faChevronUp, faChevronDown, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormClientesFichas from './FormClientesFichas/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'


const ClientesFichas = ({defaultFilters, ...props})=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setClientesFichas] = React.useState([])
    const [showModalCriarClientesFichas, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setClientesFichasChoice] = React.useState(null);
    const [atualizarClientesFichas, setAtualizarClientesFichas] = React.useState(false)   
    const [cancelarClientesFichas, setCancelarClientesFichas] = React.useState(false)   
    const [digitarClientesFichas, setDigitarClientesFichas] = React.useState(false)    
    const [cadastrarClientesFichas, setCadastrarClientesFichas] = React.useState(false)  
    const [mostarFiltros, setMostarFiltros] = React.useState(true) 
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [ordenacao, setOrdenacao] = React.useState('')
    const [tipo, setTipo] = React.useState('')
    const [sigiloso, setSigiloso] = React.useState('')
    const [status, setStatus] = React.useState('')
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(RECORD_NUMBER_PER_REQUEST)
    const [appliedFilters, setAppliedFilters] = React.useState([])
    const [dataFiliais, setDataFiliais] = React.useState([])
    const [codFilial, setCodFilial] = React.useState('')
    const [codFicha, setCodFicha] = React.useState(()=>{return defaultFilters?.id;})
    const [dtInicio, setDtInico] = React.useState('')
    const [dtFim, setDtFim] = React.useState('')

    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const handleFiltroCodFicha = ({target})=>{
        setCodFicha(target.value)
    }


    const handleFiltroInicio = ({target})=>{
        setDtInico(target.value)
    }

    const handleFiltroFim = ({target})=>{
        setDtFim(target.value)
    }

    const setNamePessoa = ({target})=>{        
        setPessoa(target.value)
    }

    const setOrdenacaoFiltro = ({target})=>{        
        setOrdenacao(target.value)
    }

    const setTipoFiltro = ({target})=>{        
        setTipo(target.value)
    }

    const setSigilosoFiltro = ({target})=>{        
        setSigiloso(target.value)
    }


    const setStatusFiltro = ({target})=>{        
        setStatus(target.value)
    }


    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }
    const handleFiltroCodFilial = ({target})=>{
        setCodFilial(target.value)
    }

    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllClientesFichass();
        }
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
            atributsFormControl:{'type':'text', size:"sm",'name':'id', value:codFicha, onChange:handleFiltroCodFicha, onBlur:handleFiltroCodFicha, onKeyUp:handleSearch},

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
            contentLabel:'Pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'pessoa_id', value:pessoa,onChange:setNamePessoa, onBlur:setNamePessoa, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Sim', 'value':'yes'},{'label':'Não', 'value':'no'}], 
            hasLabel: true,
            contentLabel:'Sigiloso',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'sigiloso', value:sigiloso,onChange:setSigilosoFiltro, onBlur:setSigilosoFiltro, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Aberta', 'value':'aberto'},{'label':'Cancelada', 'value':'cancelado'},{'label':'Finalizado', 'value':'finalizado'}],
            hasLabel: true,
            contentLabel:'Status',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'status', value:status,onChange:setStatusFiltro, onBlur:setStatusFiltro, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Tipo',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'tipo', value:tipo,onChange:setTipoFiltro, onBlur:setTipoFiltro, onKeyUp:handleSearch},

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
            {'label':'Pessoa A-Z', 'value':'id-asc'},{'label':'Pessoa Z-A', 'value':'id-desc'},], 
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
            props:{onClick:()=>requestAllClientesFichass(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Limpar',
            icon:<FontAwesomeIcon icon={faBroom} />,
            props:{onClick:()=>limparFiltros(), className:'btn btn-sm btn-secondary mx-2'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarClientesFichas(true), className:'btn btn-sm mx-2 btn-secondary'}
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

        if(cadastrarClientesFichas == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarClientesFichas])

    const atualizarClientesFichasAction = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('editar')
        setAtualizarClientesFichas(true);
    }

    const digitarClientesFichasAction = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('digitar')
        setAtualizarClientesFichas(true);
    }

    const cancelarClientesFichasAction = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('cancelar')
        setCancelarClientesFichas(true);
    }
    //cancelarClientesFichas, setCancelarClientesFichas
    const novaClientesFichas = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('consultar')
        setAtualizarClientesFichas(true);
    }

    const CadastrarClientesFichas = (idClientesFichas)=>{
        setCadastrarClientesFichas(idClientesFichas)
        setAcao('Cadastrar')
        setCadastrarClientesFichas(true);
    }

    const limparFiltros = ()=>{
        setFiltroMobile('');
        setOrdenacao('');
        setCodFilial('');;
        setDtInico('');
        setDtFim('');
        setPessoa('')
        setTipo('')
        setSigiloso('')        
        setCodFicha('')
        setStatus('')
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
        
        if(codFicha){
            filtros['id'] = codFicha;
            detalhesFiltros['id'] = {
                label:'Código',
                value:codFicha,
                resetFilter:()=>{setCodFicha('');removeFilter('id')},
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

        if(pessoa){
            filtros['name_pessoa'] = pessoa;
            detalhesFiltros['name_pessoa'] = {
                label:'Pessoa',
                value:pessoa,
                resetFilter:()=>{setPessoa('');removeFilter('name_pessoa')},
            };
        }

        if(tipo){
            filtros['name_form'] = tipo;
            detalhesFiltros['name_form'] = {
                label:'Tipo',
                value:tipo,
                resetFilter:()=>{setTipo('');removeFilter('name_form')},
            };
        }

        if(sigiloso){
            filtros['sigiloso'] = sigiloso;
            detalhesFiltros['sigiloso'] = {
                label:'Sigiloso',
                value:sigiloso,
                resetFilter:()=>{setSigiloso('');removeFilter('sigiloso')},
            };
        }

        if(status){
            filtros['status'] = status;
            detalhesFiltros['status'] = {
                label:'Status',
                value:status,
                resetFilter:()=>{setSigiloso('');removeFilter('status')},
            };
        }

        if(filtroMobile){
            filtros['name'] = filtroMobile;
            detalhesFiltros['name'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>{setFiltroMobile('');removeFilter('name')},
            };

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

    const requestAllClientesFichass = async() =>{
        setClientesFichas([])
        let {filtros, detalhesFiltros} = montarFiltro();
        setAppliedFilters(detalhesFiltros)
        let {url, options} = FORMULARIO_PESSOA_ALL_POST({...filtros}, getToken());
        if(nextPage){
            url = nextPage;
        }
        const {response, json} = await request(url, options);
        
        if(json){
            setClientesFichas(json)
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

    React.useEffect(()=>{
        
        const requestDataConfigEffect = async() =>{
            await requestAllFilials()
        }

        const requestAllClientesFichassEffect = async() =>{       
           await requestAllClientesFichass();            
        }

        requestDataConfigEffect();
        requestAllClientesFichassEffect();

        
    }, [nextPage, setNextPage])


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
                            label:'Fichas'
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
                                                                        requestAllClientesFichass();
                                                                    }
                                                                },
                                                                value:filtroMobile

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllClientesFichass();}} size={'lg'} icon={faSearch}/>
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarClientesFichas(true);}} ><FontAwesomeIcon icon={faPlus} /> Ficha</Button>
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
                        callBack={requestAllClientesFichass}
                        setMostarFiltros={setMostarFiltros}
                        idClienteFichaCriada={consultaChoice}
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
                cadastrarClientesFichas &&
                <Cadastrar cadastrarClientesFichas={cadastrarClientesFichas} setCadastrarClientesFichas={setCadastrarClientesFichas} atualizarClientesFichas={atualizarClientesFichas} setAtualizarClientesFichas={setAtualizarClientesFichas}  idClientesFichas={consultaChoice} setIdClientesFichas={setClientesFichasChoice} callback={requestAllClientesFichass} />
            }
           
         </>

    )
}

export default ClientesFichas;