import React from 'react';
import estilos from './Servico.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
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

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Contato',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name_atendido':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Status',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'status':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Tipo',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'tipo':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. inicio',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",'dt_inico':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. fim',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",'dt_fim':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
    ]

    const acoesBottomCard=[{
        label:'Pesquisar',
        icon:<FontAwesomeIcon icon={faSearch} />,
        props:{onClick:()=>requestAllServicos(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setCadastrarServico(true), className:'btn btn-sm mx-2 btn-secondary'}
    }
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
        
        if(pessoa){
            filtros['name'] = pessoa;
            detalhesFiltros['name'] = {
                label:'Servico',
                value:pessoa,
                resetFilter:()=>setPessoa(''),
            };
        }
        if(pessoa){
            filtros['name_servico'] = pessoa;
            detalhesFiltros['name_servico'] = {
                label:'Servico',
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
            filtros['name'] = filtroMobile;
            detalhesFiltros['name'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>setFiltroMobile(''),
            };
        }

        if(filtroAtivos){
            filtros['status'] += 'ativo,';
            detalhesFiltros['status'] = {
                label:'Status',
                value:filtroMobile,
                resetFilter:()=>setFiltroAtivos(null),
            };
        }

        if(filtroInativos){
            filtros['status'] += 'inativo,';
            detalhesFiltros['status'] = {
                label:'Status',
                value:filtroMobile,
                resetFilter:()=>setFiltroInAtivos(null),
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
       
       let {filtros, detalhesFiltros} = montarFiltro();

        const {url, options} = SERVICO_ALL_POST({...filtros}, getToken());


        const {response, json} = await request(url, options);
        console.log('All serviços here')
        console.log({'name_servico':pessoa})
        console.log(json)
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
                                                {(filtroAtivos ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAtivos(false);}} ><FontAwesomeIcon icon={faTimes} /> Abertas</Button> : '')}
                                                {(filtroInativos ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroInAtivos(false);}} ><FontAwesomeIcon icon={faTimes} /> Concluídas</Button> : '')}
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAtivos(true);}} ><FontAwesomeIcon icon={faSearch} /> Ativos</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroInAtivos(true);}} ><FontAwesomeIcon icon={faSearch} /> Inativos</Button>
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