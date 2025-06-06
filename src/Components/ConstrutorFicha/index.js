import React from 'react';
import estilos from './ConstrutorFichas.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, FORMULARIO_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faChevronDown, faChevronUp, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormConstrutorFicha from './FormConstrutorFicha/index.js'
import ConstrutorFichaGrupo from '../ConstrutorFichaGrupo/index.js'
import ConstrutorFichaItem from '../ConstrutorFichaItem/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min.js';


const ConstrutorFicha = (props)=>{

	const {data, error, request, loading} = useFetch();
    const [registro, setRegistro] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarRegistro, setShowModalCriarRegistro] = React.useState(false)
    const [showModalGrupo, setShowModalGrupo] = React.useState(false)
    const [showModalItem, setShowModalItem] = React.useState(false)
    const [showModalAtualizarRegistro, setShowModalAtualizarRegistro] = React.useState(false)
    const [registroChoice, setRegistroChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [cadastrarRegistro, setCadastrarRegistro] = React.useState(false)    
    const [listarGrupo, setListarGrupo] = React.useState(false)        
    const [listarItems, setListarItem] = React.useState(false)    
    const [marcarConsulta, setMarcarConsulta] = React.useState(false)    
    const [dataGrupo, setDataGrupo] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [mostarFiltros, setMostarFiltros] = React.useState(true) 
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [construtor, setConstrutor] = React.useState('')
    const [nameConstrutor, setNameConstrutor] = React.useState('')
    const [filtroMobile, setFiltroMobile] = React.useState('')
    const [ordenacao, setOrdenacao] = React.useState('')
    const [appliedFilters, setAppliedFilters] = React.useState([])
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(10)


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllRegistros();
        }
    }

    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const setCodConstrutor = ({target})=>{        
        setConstrutor(target.value)
    }
    const handleNameConstrutor = ({target})=>{        
        setNameConstrutor(target.value)
    }
    const setOrdenacaoFiltro = ({target})=>{
        
        setOrdenacao(target.value)
    }


    const filtersArr = [
        
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código construtor',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'construtor_id':construtor, value:construtor, onChange:setCodConstrutor, onBlur:setCodConstrutor, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Template',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name_construtor':nameConstrutor, value:nameConstrutor, onChange:handleNameConstrutor, onBlur:handleNameConstrutor, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
            {'label':'Construtor A-Z', 'value':'name-asc'},{'label':'Construtor Z-A', 'value':'name-desc'},], 
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
            props:{onClick:()=>requestAllRegistros(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Limpar',
            icon:<FontAwesomeIcon icon={faBroom} />,
            props:{onClick:()=>limparFiltros(), className:'btn btn-sm btn-secondary mx-2'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarRegistro(true), className:'btn btn-sm btn-secondary'}
        }
    ];


    const acoesHeaderCard=[{
            label:'',
            icon:<FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props:{onClick:()=>{setMostarFiltros(!mostarFiltros);}, className:'btn btn-sm btn-secondary'},
        },
    ];    


    const limparFiltros = ()=>{
        setNameConstrutor('');
        setConstrutor('');
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

                
        if(construtor){
            filtros['id'] = construtor;   
            detalhesFiltros['id'] = {
                label:'Cód. referência',
                value:construtor,
                resetFilter:()=>{setConstrutor('');removeFilter('id')},
            };
        }

        if(nameConstrutor){
            filtros['name'] = nameConstrutor;
            detalhesFiltros['name'] = {
                label:'Construtor',
                value:nameConstrutor,
                resetFilter:()=>{setNameConstrutor('');removeFilter('name')},
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
                label:'Ordem',
                value:ordenacao,
                resetFilter:()=>{setOrdenacao('');removeFilter('ordem')},
            };
        }
        return {filtros, detalhesFiltros};
    }

    //------------

    const requestAllRegistros = async() =>{

        let {filtros, detalhesFiltros} = await montarFiltro();
        await setAppliedFilters(detalhesFiltros)
        let {url, options} = FORMULARIO_ALL_POST({...filtros}, getToken());
        if(nextPage){
            url = nextPage;
        }

        const {response, json} = await request(url, options);
        if(json){
            setRegistro(json)
        }
            
    }

    React.useEffect(()=>{

        const requestAllRegistrosEffect = async() =>{       
           await requestAllRegistros();            
        }

        requestAllRegistrosEffect();

        
    }, [nextPage, setNextPage])

    
    
    React.useEffect(()=>{

        if(cadastrarRegistro == true){
            setShowModalCriarRegistro(true);
        }else{
            setShowModalCriarRegistro(false);
        }

        
    }, [cadastrarRegistro])




    React.useEffect(()=>{
        let {filtros, detalhesFiltros} = montarFiltro();
        setAppliedFilters(detalhesFiltros)
    }, [])
    

	return(
		<>
            <Row>
             <Breadcrumbs
                items={[
                        {
                            props:{},
                            label:<> <Link className={null}  to={'/'}>Início</Link></>
                        },
                        {
                            props:{},
                            label:'Templates de fichas'
                        }
                    ]}
                buttonFiltroMobile={true}
                setMostarFiltros={setMostarFiltros}
                mostarFiltros={mostarFiltros}
            />
                {
                    (
                        <>
                            <Col  xs="12" sm="12" md="13" className={'default_card_report mb-4'}>
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
                                                                        requestAllRegistros();
                                                                    }
                                                                }, 
                                                                value:filtroMobile,

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllRegistros();}} size={'lg'} icon={faSearch}/>
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarRegistro(true);}} ><FontAwesomeIcon icon={faPlus} /> Template de ficha</Button>
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
                        dataEstado={registro}
                        loadingData={loading}
                        callBack={requestAllRegistros}
                        requestAllRegistros={requestAllRegistros}
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
                cadastrarRegistro && <Cadastrar cadastrarRegistro={cadastrarRegistro} setCadastrarRegistro={setCadastrarRegistro} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idRegistro={registroChoice} setIdRegistro={setRegistroChoice} callback={requestAllRegistros} />
            }
            
         </>

	)
}

export default ConstrutorFicha;

//<FormConstrutorFicha dataGrupo={dataGrupo} dataConstrutorFichaChoice={[]}  atualizarCadastro={false} setAtualizarCadastro={setAtualizarCadastro}  idRegistro={null} setIdRegistro={setRegistroChoice}  showModalCriarRegistro={showModalCriarRegistro} setShowModalCriarRegistro={setShowModalCriarRegistro} callback={requestAllRegistros} />
