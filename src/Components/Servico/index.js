import React from 'react';
import estilos from './Servico.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faTimes,faChevronUp, faChevronDown, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormServico from './FormServico/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'


const Servico = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setServico] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarServico, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setServicoChoice] = React.useState(null);
    const [atualizarServico, setAtualizarServico] = React.useState(false)   
    const [cancelarServico, setCancelarServico] = React.useState(false)    
    const [cadastrarServico, setCadastrarServico] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [mostarFiltros, setMostarFiltros] = React.useState(false) 
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [filtroAtivos, setFiltroAtivos] = React.useState(null)
    const [filtroInativos, setFiltroInAtivos] = React.useState(null)
    const [ordenacao, setOrdenacao] = React.useState('')
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [appliedFilters, setAppliedFilters] = React.useState([])
    const [vrMin, setVrMin] = React.useState('')
    const [vrMax, setVrMax] = React.useState('')
    const [descricao, setDescricao] = React.useState('')
    const [serivicoCode, setServicoCode] = React.useState('')





    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllServicos();
        }
    }


    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const setNamePessoa = ({target})=>{
        
        setPessoa(target.value)
    }

    const setVrMaxFilter = ({target})=>{
        
        setVrMax(target.value)
    }

    const setVrMinFilter = ({target})=>{
        
        setVrMin(target.value)
    }

    const setDescricaoFilter = ({target})=>{
        
        setDescricao(target.value)
    }

    const setCodeSerivicoFilter = ({target})=>{
        
        setServicoCode(target.value)
    }

    const setOrdenacaoFiltro = ({target})=>{
        
        setOrdenacao(target.value)
    }

    const limparFiltros = ()=>{
        setServicoCode('');
        setVrMin('');
        setVrMax('');
        setDescricao('');
        setOrdenacao('');
        setFiltroMobile('');
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

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'id', value:serivicoCode,onChange:setCodeSerivicoFilter, onBlur:setCodeSerivicoFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Descrição',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'name', value:descricao,onChange:setDescricaoFilter, onBlur:setDescricaoFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Valor mínimo',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'vr_minimo', value:vrMin,onChange:setVrMinFilter, onBlur:setVrMinFilter, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Valor máximo',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",name:'vr_maximo', value:vrMax,onChange:setVrMaxFilter, onBlur:setVrMaxFilter, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
            {'label':'Descrição A-Z', 'value':'name-asc'},{'label':'Descrição Z-A', 'value':'name-desc'},], 
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
            props:{onClick:()=>requestAllServicos(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Limpar',
            icon:<FontAwesomeIcon icon={faBroom} />,
            props:{onClick:()=>limparFiltros(), className:'btn btn-sm btn-secondary mx-2'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarServico(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];
    const acoesHeaderCard=[{
            label:'',
            icon:<FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props:{onClick:()=>{setMostarFiltros(!mostarFiltros);}, className:'btn btn-sm btn-secondary'},
        },
    ];    


    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarServico(true);
                }else{
                    setAtualizarServico(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarServico(true);
                }else{
                    setCancelarServico(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarServico == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarServico])


    //------------
    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}
        
        if(serivicoCode){
            filtros['id'] = serivicoCode;
            detalhesFiltros['id'] = {
                label:'Código',
                value:serivicoCode,
                resetFilter:()=>{setServicoCode('');removeFilter('id')},
            };
        }

        if(vrMin){
            filtros['vr_min'] = vrMin;
            detalhesFiltros['vr_min'] = {
                label:'Valor mínimo',
                value:vrMin,
                resetFilter:()=>{setVrMin('');removeFilter('vr_min')},
            };
        }

        if(vrMax){
            filtros['vr_max'] = vrMax;
            detalhesFiltros['vr_max'] = {
                label:'Valor máximo',
                value:vrMax,
                resetFilter:()=>{setVrMax('');removeFilter('vr_max')},
            };
        }
        if(descricao){
            filtros['name'] = descricao;
            detalhesFiltros['name'] = {
                label:'Descrição',
                value:descricao,
                resetFilter:()=>{setDescricao('');removeFilter('name')},
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

        if(filtroMobile){
            filtros['name'] = filtroMobile;
            detalhesFiltros['name'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>{setFiltroMobile('');removeFilter('name')},
            };
        }

        return {filtros, detalhesFiltros};
    }


    const atualizarServicoAction = (idServico)=>{
        setServicoChoice(idServico)
        setAcao('editar')
        setAtualizarServico(true);
    }
    const cancelarServicoAction = (idServico)=>{
        setServicoChoice(idServico)
        setAcao('cancelar')
        setCancelarServico(true);
    }
    //cancelarServico, setCancelarServico
    const novaServico = (idServico)=>{
        setServicoChoice(idServico)
        setAcao('consultar')
        setAtualizarServico(true);
    }

    const gerarTableServico = ()=>{
       
        let data = [];
        let dataServico = estado.mensagem
        if(dataServico && Array.isArray(dataServico) && dataServico.length > 0){
            for(let i=0; !(i == dataServico.length); i++){
                let atual = dataServico[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar           = true;

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarServicoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    
                    //'remarcado','finalizado','cancelado','pendente'
                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                ...acoesArr
                            ],
                            celBodyTableArr:[
                                {

                                    label:atual.id,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name,
                                    propsRow:{}
                                },
                                {

                                    label:atual.vrServico,
                                    propsRow:{}
                                },
                            ]
                        }

                    )

                }

            }
        }

        return data;
    }

    const gerarTitleTable = ()=>{
        let tableTitle = [
            {
                label:'Código',
                props:{}
            },
            {
                label:'Descrição',
                props:{}
            },
            {
                label:'Valor',
                props:{}
            }
        ]

        return tableTitle;
    }
   //name_profissional

    //------------

    const requestAllServicos = async() =>{
        setServico([])
        let {filtros, detalhesFiltros} = montarFiltro();
        setAppliedFilters(detalhesFiltros)
        const {url, options} = SERVICO_ALL_POST({...filtros}, getToken());
        const {response, json} = await request(url, options);
        if(json){
            
            setServico(json)
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

        const requestAllServicosEffect = async() =>{
       
           await requestAllServicos();

            
        }

        requestAllServicosEffect();

        
    }, [filtroAtivos, filtroInativos])

    const rowsTableArr = gerarTableServico();    
    const titulosTableArr = gerarTitleTable();
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
                            label:'Servico'
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
                                                                        requestAllServicos();
                                                                    }
                                                                },
                                                                value:filtroMobile

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllServicos();}} size={'lg'} icon={faSearch}/>
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarServico(true);}} ><FontAwesomeIcon icon={faPlus} /> Serviço</Button>
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
                        callBack={requestAllServicos}
                        setMostarFiltros={setMostarFiltros}
                        idOrdemCriada={consultaChoice}
                        nadaEncontrado={nadaEncontrado}
                    />
                </Col>
            </Row>

            {
                cadastrarServico && <Cadastrar cadastrarServico={cadastrarServico} setCadastrarServico={setCadastrarServico} atualizarServico={atualizarServico} setAtualizarServico={setAtualizarServico}  idServico={consultaChoice} setIdServico={setServicoChoice} callback={requestAllServicos} />
            }
            
           
         </>

    )
}

export default Servico;