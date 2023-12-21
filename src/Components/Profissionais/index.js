import React from 'react';
import estilos from './Profissionais.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, PROFISSIONAIS_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row,Button } from 'react-bootstrap';
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
import FormProfissionais from './FormProfissionais/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'


const Profissionais = (props)=>{

	const {data, error, request, loading} = useFetch();
    const [estado, setProfissionais] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarProfissionais, setShowModalCriarProfissionais] = React.useState(false)
    const [showModalAtualizarProfissionais, setShowModalAtualizarProfissionais] = React.useState(false)
    const [profissionaisChoice, setProfissionaisChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [cadastrarProfissionais, setCadastrarProfissionais] = React.useState(false)    
    const [ordenacao, setOrdenacao] = React.useState('')
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [codigoPessoa, setCodigoPessoa] = React.useState('')
    const [codigoProfissional, setCodigoProfissional] = React.useState('')
    const [status, setStatus] = React.useState('')
    const [mostarFiltros, setMostarFiltros] = React.useState(false) 
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [filtroAdmitidos, setFiltroAdmitidos] = React.useState(false)
    const [filtroDemitidos, setFiltroDemitidos] = React.useState(false)


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const setNamePessoa = ({target})=>{
        
        setPessoa(target.value)
    }

    const setCodigoPessoaFiltro = ({target})=>{
        
        setCodigoPessoa(target.value)
    }

    const setOrdenacaoFiltro = ({target})=>{
        
        setOrdenacao(target.value)
    }

    const setStatusFiltro = ({target})=>{
        
        setStatus(target.value)
    }
    const setCodigoProfissionalFiltro = ({target})=>{
        
        setCodigoProfissional(target.value)
    }

    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllProfissionais();
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
            atributsFormControl:{'type':'text', size:"sm",'id':'id', value:codigoProfissional, onChange:setCodigoProfissionalFiltro,    onBlur:setCodigoProfissionalFiltro, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'pessoa_id':'pessoa_id', value:codigoPessoa, onChange:setCodigoPessoaFiltro,    onBlur:setCodigoPessoaFiltro, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Profissional',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'nome', value:pessoa, onChange:setNamePessoa,    onBlur:setNamePessoa, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Adminitidos', 'value':'admitido'},{'label':'Demitidos', 'value':'demitido'}], 
            hasLabel: true,
            contentLabel:'Status',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'select', size:"sm",'status':status, value:status, onChange:setStatusFiltro,    onBlur:setStatusFiltro, onKeyUp:handleSearch},

        },,{
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
            {'label':'Pessoa A-Z', 'value':'name-asc'},{'label':'Pessoa Z-A', 'value':'name-desc'},], 
            hasLabel: true,
            contentLabel:'Classificar',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'select', size:"sm",'ordem':ordenacao, value:ordenacao, onChange:setOrdenacaoFiltro,    onBlur:setOrdenacaoFiltro, onKeyUp:handleSearch},

        },
        
    ]

    const acoesBottomCard=[{
            label:'Pesquisar',
            icon:<FontAwesomeIcon icon={faSearch} />,
            props:{onClick:()=>requestAllProfissionais(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarProfissionais(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];

    //------------
    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}
        
        if(pessoa){
            filtros['name_pessoa'] = pessoa;
            detalhesFiltros['name_pessoa'] = {
                label:'Pessoa',
                value:pessoa,
                resetFilter:()=>setPessoa(''),
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
            filtros['name_pessoa'] = filtroMobile;
            detalhesFiltros['name_pessoa'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>setFiltroMobile(''),
            };
        }


        if(filtroAdmitidos){
            if(filtros.hasOwnProperty('status')){
                filtros['status'] += 'admitido,';
            }else{
                filtros['status'] = 'admitido,';
            }

            detalhesFiltros['status'] = {
                label:'Status',
                value:filtroAdmitidos,
                resetFilter:()=>setFiltroAdmitidos(''),
            };
        }

        if(filtroDemitidos){
            if(filtros.hasOwnProperty('status')){
                filtros['status'] += 'demitido,';
            }else{
                filtros['status'] = 'demitido,';
            }

            detalhesFiltros['status'] = {
                label:'Status',
                value:filtroDemitidos,
                resetFilter:()=>setFiltroDemitidos(''),
            };
        }



        if(status){
            
            filtros['status'] = status;

            detalhesFiltros['status'] = {
                label:'Status',
                value:status,
                resetFilter:()=>setStatus(''),
            };
        }

        if(codigoProfissional){
             filtros['id'] = codigoProfissional;

            detalhesFiltros['id'] = {
                label:'Código',
                value:codigoProfissional,
                resetFilter:()=>setCodigoProfissional(''),
            };
        }

        if(codigoPessoa){
             filtros['pessoa_id'] = codigoPessoa;

            detalhesFiltros['pessoa_id'] = {
                label:'Código pessoa',
                value:codigoPessoa,
                resetFilter:()=>setCodigoPessoa(''),
            };
        }



        return {filtros, detalhesFiltros};
    }


    const requestAllProfissionais = async() =>{
        setProfissionais([])

        let {filtros, detalhesFiltros} = montarFiltro();
        const {url, options} = PROFISSIONAIS_ALL_POST({...filtros}, getToken());


        const {response, json} = await request(url, options);
        console.log('All clients here')
        console.log(json)
        if(json){
            setProfissionais(json)
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

        const requestAllProfissionaisEffect = async() =>{
       
           await requestAllProfissionais();

            
        }

        requestAllProfissionaisEffect();

        
    }, [filtroAdmitidos, filtroDemitidos])

    React.useEffect(()=>{

        if(profissionaisChoice > 0){
            setAtualizarCadastro(true);
        }else{
            setAtualizarCadastro(false);
        }

        
    }, [profissionaisChoice])

    React.useEffect(()=>{

        if(cadastrarProfissionais == true){
            setShowModalCriarProfissionais(true);
        }else{
            setShowModalCriarProfissionais(false);
        }

        
    }, [cadastrarProfissionais])

    
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
                            label:'Profissionais'
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
                                                                        requestAllProfissionais();
                                                                    }
                                                                },
                                                                value:filtroMobile

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllProfissionais();}} size={'lg'} icon={faSearch}/>
                                            </Col>
                                        
                                            
                                         </Row>

                                         <Row className={'mt-2'}>
                                            <div  style={{display:'flex', flexDirection:'collumn', flexWrap:'wrap'}}>
                                                {(filtroAdmitidos ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAdmitidos(false);}} ><FontAwesomeIcon icon={faTimes} /> Adminitidos</Button> : '')}
                                                {(filtroDemitidos ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroDemitidos(false);}} ><FontAwesomeIcon icon={faTimes} /> Demitidos</Button> : '')}
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
                                        
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAdmitidos(true);}} ><FontAwesomeIcon icon={faSearch} /> Adminitidos</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroDemitidos(true);}} ><FontAwesomeIcon icon={faSearch} /> Demitidos</Button>
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarProfissionais(true);}} ><FontAwesomeIcon icon={faPlus} /> Cadastrar profissional</Button>
                                    </div>
                                </Row>
                            </Col>
                        </>
                    )
                }

                <Col style={{backgroundColor:'#FFF'}} xs="12" sm="12" md="12"  className={'pt-3 mobile_card_report'}>
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
                        callBack={requestAllProfissionais}
                        setMostarFiltros={setMostarFiltros}
                        idProfissionalCriado={profissionaisChoice}
                        nadaEncontrado={nadaEncontrado}
                    />
                </Col>
            </Row>
            {
                cadastrarProfissionais && <Cadastrar cadastrarProfissionais={cadastrarProfissionais} setCadastrarProfissionais={setCadastrarProfissionais} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idProfissionais={profissionaisChoice} setIdProfissionais={setProfissionaisChoice} callback={requestAllProfissionais} />
            }
            
            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idProfissionais={profissionaisChoice} setIdProfissionais={setProfissionaisChoice} callback={requestAllProfissionais} />
            }
         </>

	)
}

export default Profissionais;