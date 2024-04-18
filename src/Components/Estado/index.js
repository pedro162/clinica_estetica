import React from 'react';
import estilos from './Estado.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ESTADO_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row , Button} from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormEstado from './FormEstado/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import Cadastrar from './Cadastrar/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const Estado = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setEstado] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarEstado, setShowModalCriarEstado] = React.useState(false)
    const [mostarFiltros, setMostarFiltros] = React.useState(true) 
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [ordenacao, setOrdenacao] = React.useState('')
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [consultaChoice, setEstadoChoice] = React.useState(null);
    const [cadastrarEstado, setCadastrarEstado] = React.useState(false) 
    const [atualizarEstado, setAtualizarEstado] = React.useState(false) 
    const [nomeEstado, setNomeEstado] = React.useState(null) 
    const [codidoSistemaEstado, setCodigoSistemaEstado] = React.useState(null) 


    const {getToken} = React.useContext(UserContex);

    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const setNameEstadoFiltro = ({target})=>{
        
        setNomeEstado(target.value)
    }

    const setCodigoSistemaEstadoFiltro = ({target})=>{
        
        setCodigoSistemaEstado(target.value)
    }

    const setOrdenacaoFiltro = ({target})=>{
        
        setOrdenacao(target.value)
    }


    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllEstados();
        }
    }


    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}


        
        if(codidoSistemaEstado){
            filtros['id'] = codidoSistemaEstado;
            detalhesFiltros['id'] = {
                label:'id',
                value:codidoSistemaEstado,
                resetFilter:()=>setCodigoSistemaEstado(''),
            };
        }

        if(nomeEstado){
            filtros['name'] = nomeEstado;
            detalhesFiltros['name'] = {
                label:'name',
                value:nomeEstado,
                resetFilter:()=>setNomeEstado(''),
            };

            filtros['name_nomestado'] = nomeEstado;
            detalhesFiltros['name_nomestado'] = {
                label:'name_nomestado',
                value:nomeEstado,
                resetFilter:()=>setNomeEstado(''),
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

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'estado_id':Estado, value:codidoSistemaEstado, onChange:setCodigoSistemaEstadoFiltro, onBlur:setCodigoSistemaEstadoFiltro, onKeyUp:handleSearch},

        },   {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Estado',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'name', value:nomeEstado, onChange:setNameEstadoFiltro, onBlur:setNameEstadoFiltro, onKeyUp:handleSearch},

        },     
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
            {'label':'Estado A-Z', 'value':'name-asc'},{'label':'Estado Z-A', 'value':'name-desc'},], 
            hasLabel: true,
            contentLabel:'Classificar',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'select', size:"sm",'ordem':ordenacao, value:ordenacao, onChange:setOrdenacaoFiltro, onBlur:setOrdenacaoFiltro, onKeyUp:handleSearch},

        },
    ]

    const acoesBottomCard=[{
        label:'Pesquisar',
        icon:<FontAwesomeIcon icon={faSearch} />,
        props:{onClick:()=>requestAllEstados(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setShowModalCriarEstado(true), className:'btn btn-sm mx-2 btn-secondary'}
    }
    ];

    

    const requestAllEstados = async() =>{
       
        setEstado([])

        let {filtros, detalhesFiltros} = montarFiltro();
        const {url, options} = ESTADO_ALL_POST({...filtros}, getToken());


        const {response, json} = await request(url, options);
        console.log('All estados here')
        console.log(json)
        if(json){
            setEstado(json)

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

        const requestAllEstadosEffect = async() =>{
       
           await requestAllEstados();

            
        }

        requestAllEstadosEffect();

        
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
                            label:'Etado'
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
                            <Col  xs="12" sm="12" md="3" className={'default_card_report'}>
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
                                                                        requestAllEstados();
                                                                    }
                                                                },
                                                                value:filtroMobile

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllEstados();}} size={'lg'} icon={faSearch}/>
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarEstado(true);}} ><FontAwesomeIcon icon={faPlus} /> Cadastrar estado</Button>
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
                
                <Col  xs="12" sm="12" md={mostarFiltros ? "9":"12"}>
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllEstados}
                        setMostarFiltros={setMostarFiltros}
                        idEstadoCriado={consultaChoice}
                        nadaEncontrado={nadaEncontrado}
                    />
                </Col>
            </Row>
            
            {
                cadastrarEstado &&
                <Cadastrar cadastrarEstado={cadastrarEstado} setCadastrarEstado={setCadastrarEstado} atualizarEstado={atualizarEstado} setAtualizarEstado={setAtualizarEstado}  idPais={consultaChoice} setIdPais={setEstadoChoice} callback={requestAllEstados} />
            }
         </>

    )
}

export default Estado;