import React from 'react';
import estilos from './Clientes.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ALL_POST, RECORD_NUMBER_PER_REQUEST} from '../../api/endpoints/geral.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus,faChevronUp, faChevronDown, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Ficha from './Ficha/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormCliente from './FormCliente/index.js'
import Include from './include.js'
import FormControlInput from '../FormControl/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min.js';


const Clientes = ({defaultFilters, callBakSelectedItem, ignoreTableActions ,...props})=>{

	const {data, error, request, loading} = useFetch();
    const [clientes, setClientes] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarCliente, setShowModalCriarCliente] = React.useState(false)
    const [showModalAtualizarCliente, setShowModalAtualizarCliente] = React.useState(false)
    const [clientChoice, setClienteChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [cadastrarCliente, setCadastrarCliente] = React.useState(false)     
    const [marcarConsulta, setMarcarConsulta] = React.useState(false)     
    const [ficha, setFicha] = React.useState(false)    
    const [dataGrupo, setDataGrupo] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [mostarFiltros, setMostarFiltros] = React.useState(false) 
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [ordenacao, setOrdenacao] = React.useState('')
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(RECORD_NUMBER_PER_REQUEST)
    const [pessoa, setPessoa] = React.useState(null)
    const [codigoPessoa, setCodigoPessoa] = React.useState(null)
    const [appliedFilters, setAppliedFilters] = React.useState([])

     const [referenciaContasReceber, setReferenciaContasReceber] = React.useState(()=>{
        return defaultFilters?.referencia
    })
    const [idReferenciaContasReceber, setIdReferenciaContasReceber] = React.useState(()=>{
        return defaultFilters?.referencia_id
    })  


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const handleCodPessoaFilter = ({target})=>{
        setCodigoPessoa(target.value)
    }

    const handleNamePessoaFilter = ({target})=>{
        setPessoa(target.value)
    }

    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }
    const setOrdenacaoFiltro = ({target})=>{
        
        setOrdenacao(target.value)
    }

    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllClients();
        }
    }

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Cód pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"4", sm:"4", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'id', value:codigoPessoa,onChange:handleCodPessoaFilter, onBlur:handleCodPessoaFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Nome pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"8", sm:"8", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'nome', value:pessoa,onChange:handleNamePessoaFilter, onBlur:handleNamePessoaFilter, onKeyUp:handleSearch},

        }, 
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
            {'label':'Nome A-Z', 'value':'name-asc'},{'label':'Nome Z-A', 'value':'name-desc'},], 
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
            props:{onClick:()=>requestAllClients(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Limpar',
            icon:<FontAwesomeIcon icon={faBroom} />,
            props:{onClick:()=>limparFiltros(), className:'btn btn-sm btn-secondary mx-2'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarCliente(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];
    

    const acoesHeaderCard=[
        {
            label:'',
            icon:<FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props:{onClick:()=>{setMostarFiltros(!mostarFiltros);}, className:'btn btn-sm btn-secondary'},
        },
    ];  
    

    const limparFiltros = ()=>{
        setFiltroMobile('');
        setCodigoPessoa('')
        setPessoa('')
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
        
        if(codigoPessoa){
            filtros['id'] = codigoPessoa;
            detalhesFiltros['id'] = {
                label:'id',
                value:codigoPessoa,
                resetFilter:()=>{setCodigoPessoa('');removeFilter('id')},
            };
        }

        if(pessoa){
            filtros['name'] = pessoa;
            detalhesFiltros['name'] = {
                label:'name',
                value:pessoa,
                resetFilter:()=>{setPessoa('');removeFilter('name')},
            };
        }

        if(filtroMobile){
            filtros['name'] = filtroMobile;
            detalhesFiltros['name'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>{setFiltroMobile('');removeFilter('')},
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

        return {filtros, detalhesFiltros, nextPage, setNextPage};
    }

    const requestAllClients = async() =>{
       
        setClientes([])

        let {filtros, detalhesFiltros} = montarFiltro();
        setAppliedFilters(detalhesFiltros)

        let {url, options} = CLIENTES_ALL_POST({...filtros}, getToken());
        if(nextPage){
            url = nextPage;
        }
        const {response, json} = await request(url, options);
        if(json){
            
              setClientes(json)
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

        const requestAllClientsEffect = async() =>{
           await requestAllClients();            
        }

        requestAllClientsEffect();
        
    }, [nextPage, setNextPage, defaultFilters])

    
    React.useEffect(()=>{

        if(cadastrarCliente == true){
            setShowModalCriarCliente(true);
        }else{
            setShowModalCriarCliente(false);
        }

        
    }, [cadastrarCliente])
    
    
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
                            label:'Clientes'
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
                                                                        requestAllClients();
                                                                    }
                                                                },
                                                                value:filtroMobile

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllClients();}} size={'lg'} icon={faSearch}/>
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarCliente(true);}} ><FontAwesomeIcon icon={faPlus} /> Cadastrar pessoa física</Button>
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
                        dataEstado={clientes}
                        loadingData={loading}
                        nadaEncontrado={nadaEncontrado}
                        callBack={requestAllClients}
                        setMostarFiltros={setMostarFiltros}
                        idClienteCriado={clientChoice}
                        nextPage={nextPage}
                        setNextPage={setNextPage}
                        usePagination={usePagination}
                        setUsePagination={setUsePagination}
                        totalPageCount={totalPageCount}
                        setTotalPageCount={setTotalPageCount}
                        callBakSelectedItem={callBakSelectedItem}
                        ignoreTableActions={ignoreTableActions}
                    />
                </Col>
            </Row>

            
            {
                cadastrarCliente && <Cadastrar cadastrarCliente={cadastrarCliente} setCadastrarCliente={setCadastrarCliente} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idCliente={clientChoice} setIdcliente={setClienteChoice} callback={requestAllClients} />
            }
            
         </>

	)
}

export default Clientes;