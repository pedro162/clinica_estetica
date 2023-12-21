import React from 'react';
import estilos from './Home.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, AGENDA_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row, Button } from 'react-bootstrap';
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
import FormHome from './FormHome/index.js'
import Calendario  from '../Utils/Calendario/index.js'
import Horario  from '../Utils/Calendario/Horario.js'
import FormControlInput from '../FormControl/index.js'
import Include from './include';


const Home = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [agenda, setAgenda] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarCliente, setShowModalCriarCliente] = React.useState(false)
    const [showModalAtualizarCliente, setShowModalAtualizarCliente] = React.useState(false)
    const [clientChoice, setClienteChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [cadastrarCliente, setCadastrarCliente] = React.useState(false)    
    const [dataGrupo, setDataGrupo] = React.useState(null)
    const [tpView, setTpView] = React.useState('mes')//mes//semana 
    const [mostarFiltros, setMostarFiltros] = React.useState(false) 
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [ordenacao, setOrdenacao] = React.useState('')
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)


    const [filtroAbertas, setFiltroAbertas] = React.useState(false)
    const [filtroConcluidas, setFiltroConcluidas] = React.useState(false)
    const [filtroCanceladas, setFiltroCanceladas] = React.useState(false)


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

    const setOrdenacaoFiltro = ({target})=>{
        
        setOrdenacao(target.value)
    }

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Teste',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"12",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'nome',onChange:alerta,    onBlur:alerta},

        },
        {
            type:'radio',
            options:[
                {
                    hasLabel: true,
                    contentLabel:'Por semana',
                    atributsFormLabel:{},
                    atributsFormControl:{'type':'radio', value:'semana', size:"sm",'checked': (tpView == 'semana'),'name':'nome',onChange:(ev)=>setTpView(ev.target.value),    onBlur:(ev)=>setTpView(ev.target.value)},
                },
                {
                    hasLabel: true,
                    contentLabel:'Por mes',
                    atributsFormLabel:{},
                    atributsFormControl:{'type':'radio', value:'mes', size:"sm",'checked':(tpView == 'mes'),'name':'nome',onChange:(ev)=>setTpView(ev.target.value),    onBlur:(ev)=>setTpView(ev.target.value)},
                }
            ],  
            hasLabel: true,
            contentLabel:'Teste',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"12",className:'mb-2',},
            atributsFormControl:{},

        }
        /*,{
            type:'checkbox',
            options:[], 
            hasLabel: true,
            contentLabel:'Teste',
            atributsFormLabel:{},
            atributsContainer:{ xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'checkbox', value:'12',size:"sm",'checked':false,'name':'nome',onChange:alerta, onBlur:alerta},

        }*/
    ]

    const acoesBottomCard=[{
            label:'Pesquisar',
            icon:<FontAwesomeIcon icon={faSearch} />,
            props:{onClick:()=>requestAllAgenda(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarCliente(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];
    const gerarExemplos = ()=>{
         let exemplos = [];
        for(let i=0; !(i == 10); i++){
            exemplos.push(

                    {
                        propsRow:{id:(i+1)},
                        celBodyTableArr:[
                            {

                                label:'1',
                                propsRow:{}
                            },
                            {

                                label:'Peddro',
                                propsRow:{}
                            },
                            {

                                label:'(98) 98425-7623',
                                propsRow:{}
                            },
                            {

                                label:'phedroclooney@gmail.com',
                                propsRow:{}
                            }
                        ]
                    }

                )

        }

        return exemplos;
    }

    const gerarTableHome = ()=>{
       
        let data = [];
        let dataHome = Home.mensagem
        if(dataHome && Array.isArray(dataHome) && dataHome.length > 0){
            for(let i=0; !(i == dataHome.length); i++){
                let atual = dataHome[i];
                if(atual){


                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                {acao:()=>setClienteChoice(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
                                {acao:()=>alert('Agenda qui: '+(atual.id)), label:'Agenda', propsOption:{}, propsLabel:{}},
                                {acao:()=>alert('Histórico de atentimentos: '+(atual.id)), label:'Histórico de atendimentos', propsOption:{}, propsLabel:{}},
                                {acao:()=>alert('Central do cliente: '+(atual.id)), label:'Central do cliente', propsOption:{}, propsLabel:{}},
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

                                    label:atual.name_opcional,
                                    propsRow:{}
                                },
                                {

                                    label:atual.email,
                                    propsRow:{}
                                },
                                {

                                    label:atual.sexo,
                                    propsRow:{}
                                }
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
                label:'Nome',
                props:{}
            },
            {
                label:'Sobremone',
                props:{}
            },
            {
                label:'Email',
                props:{}
            },
            {
                label:'Sexo',
                props:{}
            },
        ]

        return tableTitle;
    }
    //------------
   
   //------------
    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}


        

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

    const requestAllAgenda = async() =>{
        setAgenda([])

        let {filtros, detalhesFiltros} = montarFiltro();

        const {url, options} = AGENDA_ALL_POST({...filtros}, getToken());


        const {response, json} = await request(url, options);
        
        if(json){
            setAgenda(json)
            
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

        const requestAllAgendaEffect = async() =>{
       
           await requestAllAgenda();

            
        }

        requestAllAgendaEffect();

        
    }, [filtroConcluidas, filtroCanceladas, filtroAbertas])

   

    React.useEffect(()=>{

        if(cadastrarCliente == true){
            setShowModalCriarCliente(true);
        }else{
            setShowModalCriarCliente(false);
        }

        
    }, [cadastrarCliente])

   
    
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
                            label:'Home'
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
                                                                        requestAllAgenda();
                                                                    }
                                                                },
                                                                value:filtroMobile

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllAgenda();}} size={'lg'} icon={faSearch}/>
                                            </Col>
                                        
                                            
                                         </Row>

                                         <Row className={'mt-2'}>
                                            <div  style={{display:'flex', flexDirection:'collumn', flexWrap:'wrap'}}>
                                                {(filtroAbertas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAbertas(false);}} ><FontAwesomeIcon icon={faTimes} /> Abertas</Button> : '')}
                                                {(filtroConcluidas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroConcluidas(false);}} ><FontAwesomeIcon icon={faTimes} /> Concluídas</Button> : '')}
                                                {(filtroCanceladas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroCanceladas(false);}} ><FontAwesomeIcon icon={faTimes} /> Canceladas</Button> : '')}
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
                                        
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAbertas(true);}} ><FontAwesomeIcon icon={faSearch} /> Consultas</Button>
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarCliente(true);}} ><FontAwesomeIcon icon={faPlus} /> Evento</Button>
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
                        dataEstado={agenda}
                        loadingData={loading}
                        callBack={requestAllAgenda}
                        setMostarFiltros={setMostarFiltros}
                        idAgendaCriada={clientChoice}
                        nadaEncontrado={nadaEncontrado}
                        tpViewChoice={tpView}
                    />
                    
                </Col>
            </Row>
            {
                cadastrarCliente && <Cadastrar cadastrarCliente={cadastrarCliente} setCadastrarCliente={setCadastrarCliente} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idCliente={clientChoice} setIdcliente={setClienteChoice} callback={requestAllAgenda} />
            }
            
            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idCliente={clientChoice} setIdcliente={setClienteChoice} callback={requestAllAgenda} />
            }
         </>

    )
}

export default Home;
