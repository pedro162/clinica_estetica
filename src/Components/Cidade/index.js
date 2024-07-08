import React from 'react';
import estilos from './Cidade.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CIDADE_ALL_POST} from '../../api/endpoints/geral.js'
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
import {UserContex} from '../../Context/UserContex.js'
import FormCidade from './FormCidade/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const Cidade = (props)=>{

	const {data, error, request, loading} = useFetch();
    const [estado, setCidade] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarCidade, setShowModalCriarCidade] = React.useState(false)
    const [showModalAtualizarCidade, setShowModalAtualizarCidade] = React.useState(false)
    const [consultaChoice, setCidadeChoice] = React.useState(null);

    //const [consultaChoice, setPaisChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [cadastrarCidade, setCadastrarCidade] = React.useState(false)    
    const [dataEstado, setDataEstado] = React.useState(null)
    const [mostarFiltros, setMostarFiltros] = React.useState(true) 
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [ordenacao, setOrdenacao] = React.useState('')
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [nomeCidade, setNomeCidade] = React.useState(null) 
    const [codidoSistemaCidade, setCodigoSistemaCidade] = React.useState(null) 


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const setNameCidadeFiltro = ({target})=>{        
        setNomeCidade(target.value)
    }

    const setCodigoSistemaCidadeFiltro = ({target})=>{
        
        setCodigoSistemaCidade(target.value)
    }

    const setOrdenacaoFiltro = ({target})=>{        
        setOrdenacao(target.value)
    }

    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllCidade();
        }
    }

    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}
        
        if(codidoSistemaCidade){
            filtros['id'] = codidoSistemaCidade;
            detalhesFiltros['id'] = {
                label:'id',
                value:codidoSistemaCidade,
                resetFilter:()=>setCodigoSistemaCidade(''),
            };
        }

        if(nomeCidade){
            filtros['name'] = nomeCidade;
            detalhesFiltros['name'] = {
                label:'name',
                value:nomeCidade,
                resetFilter:()=>setNomeCidade(''),
            };

            filtros['name_nome_cidade'] = nomeCidade;
            detalhesFiltros['name_nome_cidade'] = {
                label:'name_nome_cidade',
                value:nomeCidade,
                resetFilter:()=>setNomeCidade(''),
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



    const limparFiltros = ()=>{
        setNomeCidade('');
        setCodigoSistemaCidade('');
        setFiltroMobile('');
        setOrdenacao('');
    }

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':codidoSistemaCidade, value:codidoSistemaCidade, onChange:setCodigoSistemaCidadeFiltro, onBlur:setCodigoSistemaCidadeFiltro, onKeyUp:handleSearch},

        },   {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Cidade',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':nomeCidade, value:nomeCidade, onChange:setNameCidadeFiltro, onBlur:setNameCidadeFiltro, onKeyUp:handleSearch},

        },     
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
            {'label':'Cidade A-Z', 'value':'name-asc'},{'label':'Cidade Z-A', 'value':'name-desc'},], 
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
            props:{onClick:()=>requestAllCidade(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Limpar',
            icon:<FontAwesomeIcon icon={faBroom} />,
            props:{onClick:()=>limparFiltros(), className:'btn btn-sm btn-secondary mx-2'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarCidade(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];
    

    const acoesHeaderCard=[{
            label:'',
            icon:<FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props:{onClick:()=>{setMostarFiltros(!mostarFiltros);}, className:'btn btn-sm btn-secondary'},
        },
    ];

    const requestAllCidade = async() =>{
        setCidade([]);

        let {filtros, detalhesFiltros} = montarFiltro();

        const {url, options} = CIDADE_ALL_POST({...filtros}, getToken());


        const {response, json} = await request(url, options);
        if(json){
             setCidade(json)

            let dataCity = json?.mensagem ?  json?.mensagem : json?.registro;
            if( dataCity && dataCity.length > 0){
                setNadaEncontrado(false)
            }else{
                setNadaEncontrado(true)
            }

        }else{
            setNadaEncontrado(true)
        }            
    }

    React.useEffect(()=>{

        const requestAllCidadeEffect = async() =>{
           await requestAllCidade();            
        }

        requestAllCidadeEffect();
        
    }, [])

    React.useEffect(()=>{

        if(consultaChoice > 0){
            setAtualizarCadastro(true);
        }else{
            setAtualizarCadastro(false);
        }

        
    }, [consultaChoice])

    React.useEffect(()=>{

        if(cadastrarCidade == true){
            setShowModalCriarCidade(true);
        }else{
            setShowModalCriarCidade(false);
        }

        
    }, [cadastrarCidade])

    
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
                            label:'Cidade'
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
                                                                        requestAllCidade();
                                                                    }
                                                                },
                                                                value:filtroMobile

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllCidade();}} size={'lg'} icon={faSearch}/>
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarCidade(true);}} ><FontAwesomeIcon icon={faPlus} /> Cadastrar cidade</Button>
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
                
                <Col  xs="12" sm="12" md={"12"}>
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllCidade}
                        setMostarFiltros={setMostarFiltros}
                        idOrdemCriada={consultaChoice}
                        nadaEncontrado={nadaEncontrado}
                    />
                </Col>
            </Row>
            {
                cadastrarCidade && <Cadastrar cadastrarCidade={cadastrarCidade} setCadastrarCidade={setCadastrarCidade} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idCidade={consultaChoice} setIdCidade={setCidadeChoice} callback={requestAllCidade} />
            }
            
            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idCidade={consultaChoice} setIdCidade={setCidadeChoice} callback={requestAllCidade} />
            }
         </>

	)
}

export default Cidade;

//<FormCidade dataEstado={dataEstado} dataClienteChoice={[]}  atualizarCadastro={false} setAtualizarCadastro={setAtualizarCadastro}  idCidade={null} setIdCidade={setCidadeChoice}  showModalCriarCidade={showModalCriarCidade} setShowModalCriarCidade={setShowModalCriarCidade} callback={requestAllCidade} />
