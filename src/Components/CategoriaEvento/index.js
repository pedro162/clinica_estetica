import React from 'react';
import estilos from './CategoriaEvento.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CATEGORIA_EVENTO_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormCategoriaEvento from './FormCategoriaEvento/index.js'
import Excluir from './Excluir/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'


const CategoriaEvento = (props)=>{

	const {data, error, request, loading} = useFetch();
    const [estado, setCategoriaEvento] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarCategoriaEvento, setShowModalCriarCategoriaEvento] = React.useState(false)
    const [showModalAtualizarCategoriaEvento, setShowModalAtualizarCategoriaEvento] = React.useState(false)
    const [CategoriaEventoChoice, setCategoriaEventoChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [excluirCadastro, setExcluirCadastro] = React.useState(false)    
    const [cadastrarCategoriaEvento, setCadastrarCategoriaEvento] = React.useState(false)   
    const [mostarFiltros, setMostarFiltros] = React.useState(false) 
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [acao, setAcao] = React.useState(null)  
    const [ordenacao, setOrdenacao] = React.useState('')
    const [categoriaEventoName, setCategoriaEventoName] = React.useState('')
    const [categoriaEventoCodigo, setCategoriaEventoCodigo] = React.useState('')
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [consultaChoice, setCatogoriaEventoChoice] = React.useState(null);


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const handleFiltroNomeCategoriaEvento = ({target})=>{
        setCatogoriaEventoChoice(target.value)
    }
    const handleFiltroNomeCategoriaCodigo = ({target})=>{
        setCategoriaEventoCodigo(target.value)
    }

    const setOrdenacaoFiltro = ({target})=>{
        
        setOrdenacao(target.value)
    }

    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllCategoriaEvento();
        }
    }

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'categoriaEventoCodigo':categoriaEventoCodigo,value:categoriaEventoCodigo ,onChange:handleFiltroNomeCategoriaCodigo, onBlur:handleFiltroNomeCategoriaCodigo, onKeyUp:handleSearch },

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Categoria',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'name',value:categoriaEventoName , onChange:handleFiltroNomeCategoriaEvento,    onBlur:handleFiltroNomeCategoriaEvento, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
            {'label':'Categoria A-Z', 'value':'id-asc'},{'label':'Categoria Z-A', 'value':'id-desc'},], 
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
            props:{onClick:()=>requestAllCategoriaEvento(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarCategoriaEvento(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];


    const acoesHeaderCard=[{
            label:'',
            icon:<FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props:{onClick:()=>{setMostarFiltros(!mostarFiltros);}, className:'btn btn-sm btn-secondary'},
        },
    ];

    //------------
    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}
        
        if(categoriaEventoCodigo){
            filtros['id'] = categoriaEventoCodigo;
            detalhesFiltros['id'] = {
                label:'id',
                value:categoriaEventoCodigo,
                resetFilter:()=>setCategoriaEventoCodigo(''),
            };
        }

        if(categoriaEventoName){
            filtros['name'] = categoriaEventoName;
            detalhesFiltros['name'] = {
                label:'Categoria',
                value:categoriaEventoName,
                resetFilter:()=>setCategoriaEventoName(''),
            };
        }

        if(ordenacao){
            filtros['ordem'] = ordenacao;
            detalhesFiltros['ordem'] = {
                label:'Ordenação',
                value:ordenacao,
                resetFilter:()=>setOrdenacao(''),
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


        return {filtros, detalhesFiltros};
    }

    const requestAllCategoriaEvento = async() =>{
       
        setCategoriaEvento([])

        let {filtros, detalhesFiltros} = montarFiltro();

        const {url, options} = CATEGORIA_EVENTO_ALL_POST({...filtros}, getToken());


        const {response, json} = await request(url, options);
        console.log('All clients here')
        console.log(json)
        if(json){
            setCategoriaEvento(json)
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

        const requestAllCategoriaEventoEffect = async() =>{
           await requestAllCategoriaEvento();            
        }

        requestAllCategoriaEventoEffect();
        
    }, [])

    React.useEffect(()=>{

        if(cadastrarCategoriaEvento == true){
            setShowModalCriarCategoriaEvento(true);
        }else{
            setShowModalCriarCategoriaEvento(false);
        }

        
    }, [cadastrarCategoriaEvento])

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
                            label:'Categoria de evento'
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
                            <Col  xs="12" sm="12" md="12" className={'default_card_report'}>
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
                                                                        requestAllCategoriaEvento();
                                                                    }
                                                                },
                                                                value:filtroMobile

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllCategoriaEvento();}} size={'lg'} icon={faSearch}/>
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarCategoriaEvento(true);}} ><FontAwesomeIcon icon={faPlus} /> Categoria</Button>
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
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllCategoriaEvento}
                        setMostarFiltros={setMostarFiltros}
                        idOrdemCriada={consultaChoice}
                        nadaEncontrado={nadaEncontrado}
                    />
                </Col>
            </Row>
            {
                cadastrarCategoriaEvento && <Cadastrar cadastrarCategoriaEvento={cadastrarCategoriaEvento} setCadastrarCategoriaEvento={setCadastrarCategoriaEvento} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idCategoriaEvento={CategoriaEventoChoice} setIdCategoriaEvento={setCategoriaEventoChoice} callback={requestAllCategoriaEvento} />
            }
            
            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idCategoriaEvento={CategoriaEventoChoice} setIdCategoriaEvento={setCategoriaEventoChoice} callback={requestAllCategoriaEvento} />
            }

            {
                excluirCadastro &&
                <Excluir excluirCadastro={excluirCadastro} setExcluirCadastro={setExcluirCadastro}  idCategoriaEvento={CategoriaEventoChoice} setIdCategoriaEvento={setCategoriaEventoChoice} callback={requestAllCategoriaEvento} />
            }
         </>

	)
}

export default CategoriaEvento;