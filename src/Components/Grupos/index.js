import React from 'react';
import estilos from './Grupos.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, GRUPOS_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormGrupo from './FormGrupo/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'


const Grupos = (props)=>{

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


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
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

    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllGrupos();
        }
    }

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código',
            atributsFormLabel:{},
            atributsContainer:{xs:"4", sm:"4", md:"4",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'nome',onChange:setCodeGroupFilter,    onBlur:setCodeGroupFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Descrição',
            atributsFormLabel:{},
            atributsContainer:{xs:"8", sm:"8", md:"8",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'nome',onChange:setNameGroupFilter,    onBlur:setNameGroupFilter, onKeyUp:handleSearch},

        },
    ]

    const acoesBottomCard=[{
            label:'Pesquisar',
            icon:<FontAwesomeIcon icon={faSearch} />,
            props:{onClick:()=>requestAllGrupos(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setShowModalCriarGrupo(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];


     //------------
    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}
        
        if(grupo){
            filtros['name'] = grupo;
            detalhesFiltros['name'] = {
                label:'Grupo',
                value:grupo,
                resetFilter:()=>setGrupo(''),
            };
        }

        if(codigoGrupo){
            filtros['id'] = codigoGrupo;
            detalhesFiltros['id'] = {
                label:'Cód grupo',
                value:codigoGrupo,
                resetFilter:()=>setCodigoGrupo(null),
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
            filtros['grupo'] = filtroMobile;
            detalhesFiltros['grupo'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>setFiltroMobile(''),
            };
        }

        return {filtros, detalhesFiltros};
    }
  

    const requestAllGrupos = async() =>{
        let {filtros, detalhesFiltros} = montarFiltro();
        const {url, options} = GRUPOS_ALL_POST({...filtros}, getToken());


        const {response, json} = await request(url, options);
        console.log('All clients here')
        console.log(json)
        if(json){
            setGrupos(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllGruposEffect = async() =>{
       
           await requestAllGrupos();

            
        }

        requestAllGruposEffect();

        
    }, [])

    React.useEffect(()=>{

        if(clientChoice > 0){
            setAtualizarCadastro(true);
        }else{
            setAtualizarCadastro(false);
        }

        
    }, [clientChoice])

    
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
                            label:'Grupos'
                        }
                    ]}
                buttonFiltroMobile={true}
                setMostarFiltros={setMostarFiltros}
                mostarFiltros={mostarFiltros}
            />
            <Row>
                 {mostarFiltros && 
                    (<>
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
                
                <Col  xs="12" sm="12" md={mostarFiltros ? "9":"12"}>
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllGrupos}
                        setMostarFiltros={setMostarFiltros}
                        idGrupoCriado={clientChoice}
                        nadaEncontrado={nadaEncontrado}
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