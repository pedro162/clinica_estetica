import React from 'react';
import estilos from './Grupos.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, GRUPOS_ALL_POST, RECORD_NUMBER_PER_REQUEST} from '../../api/endpoints/geral.js'
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
import FormGrupo from './FormGrupo/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min.js';


const Grupos = ({defaultFilters, ...props})=>{

	const {data, error, request, loading} = useFetch();
    const [estado, setGrupos] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarGrupo, setShowModalCriarGrupo] = React.useState(false)
    const [showModalAtualizarGrupo, setShowModalAtualizarGrupo] = React.useState(false)
    const [clientChoice, setGrupoChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)
    const [mostarFiltros, setMostarFiltros] = React.useState(false) 
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [ordenacao, setOrdenacao] = React.useState('')
    const [grupo, setGrupo] = React.useState('')
    const [codigoGrupo, setCodigoGrupo] = React.useState('')
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(RECORD_NUMBER_PER_REQUEST)
    const [appliedFilters, setAppliedFilters] = React.useState([])


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllGrupos();
        }
    }
    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const setNameGroupFilter = ({target})=>{
        
        setGrupo(target.value)
    }

    const setCodeGroupFilter = ({target})=>{
        
        setCodigoGrupo(target.value)
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
            atributsFormControl:{'type':'text', size:"sm",name:'id', value:codigoGrupo ,onChange:setCodeGroupFilter,    onBlur:setCodeGroupFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Descrição',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'nome', value:grupo,onChange:setNameGroupFilter,    onBlur:setNameGroupFilter, onKeyUp:handleSearch},

        },    
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
            {'label':'Nome A-Z', 'value':'status-asc'},{'label':'Nome Z-A', 'value':'status-desc'},], 
            hasLabel: true,
            contentLabel:'Classificar',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'select', size:"sm",'name':'ordenacao', value:ordenacao, onChange:setOrdenacaoFiltro, onBlur:setOrdenacaoFiltro, onKeyUp:handleSearch},

        },
    ]

    const acoesBottomCard=[{
            label:'Pesquisar',
            icon:<FontAwesomeIcon icon={faSearch} />,
            props:{onClick:()=>requestAllGrupos(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Limpar',
            icon:<FontAwesomeIcon icon={faBroom} />,
            props:{onClick:()=>limparFiltros(), className:'btn btn-sm btn-secondary mx-2'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setShowModalCriarGrupo(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];
    const acoesHeaderCard=[{
            label:'',
            icon:<FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props:{onClick:()=>{setMostarFiltros(!mostarFiltros);}, className:'btn btn-sm btn-secondary'},
        },
    ];   


    const limparFiltros = ()=>{
        setGrupo('')
        setCodigoGrupo('')
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

        if(grupo){
            filtros['name'] = grupo;
            detalhesFiltros['name'] = {
                label:'Grupo',
                value:grupo,
                resetFilter:()=>{setGrupo('');removeFilter('name')},
            };
        }

        if(codigoGrupo){
            filtros['id'] = codigoGrupo;
            detalhesFiltros['id'] = {
                label:'Cód grupo',
                value:codigoGrupo,
                resetFilter:()=>{setCodigoGrupo(null);removeFilter('id')},
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
  

    const requestAllGrupos = async() =>{
        setGrupos([])
        setNadaEncontrado(false)
        let {filtros, detalhesFiltros} = montarFiltro();
        let {url, options} = GRUPOS_ALL_POST({...filtros}, getToken());
        if(nextPage){
            url = nextPage;
        }
        setAppliedFilters(detalhesFiltros)
        const {response, json} = await request(url, options);
        if(json){
            setGrupos(json)
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

        const requestAllGruposEffect = async() =>{
           await requestAllGrupos();            
        }

        requestAllGruposEffect();

        
    }, [nextPage, setNextPage, defaultFilters])

    React.useEffect(()=>{

        if(clientChoice > 0){
            setAtualizarCadastro(true);
        }else{
            setAtualizarCadastro(false);
        }

        
    }, [clientChoice])


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
                            label:'Grupos'
                        }
                    ]}
                buttonFiltroMobile={true}
                setMostarFiltros={setMostarFiltros}
                mostarFiltros={mostarFiltros}
            />
            <Row>
                 {
                    (<>
                        <Col  xs="12" sm="12" md="12" className={'default_card_report'}>
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
                                                                    requestAllGrupos();
                                                                }
                                                            },
                                                            value:filtroMobile

                                                        }
                                                    }
                                                }
                                             />
                                        </Col>

                                        <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                            <FontAwesomeIcon onClick={()=>{requestAllGrupos();}} size={'lg'} icon={faSearch}/>
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
                                    <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setShowModalCriarGrupo(true);}} ><FontAwesomeIcon icon={faPlus} /> Grupo</Button>
                                </div>
                            </Row>
                        </Col>
                    </>

                )}

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
                        callBack={requestAllGrupos}
                        setMostarFiltros={setMostarFiltros}
                        idGrupoCriado={clientChoice}
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

            <FormGrupo dataGrupoChoice={[]}  atualizarCadastro={false} setAtualizarCadastro={setAtualizarCadastro}  idGrupo={null} setIdGrupo={setGrupoChoice}  showModalCriarGrupo={showModalCriarGrupo} setShowModalCriarGrupo={setShowModalCriarGrupo} callback={requestAllGrupos} />
            
            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idGrupo={clientChoice} setIdGrupo={setGrupoChoice} callback={requestAllGrupos} />
            }
         </>

	)
}

export default Grupos;