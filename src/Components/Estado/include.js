import React from 'react'
import estilos from './Estado.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ESTADO_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faUserCircle, faHandHoldingUsd,faHandHolding, faTasks, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormEstado from './FormEstado/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'
import { Button } from 'bootstrap';
import reactDom from 'react-dom';
//

const Include = ({dataEstado, loadingData, callBack, setMostarFiltros, nadaEncontrado, idEstadoCriada, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setEstado] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarEstado, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setEstadoChoice] = React.useState(null);
    const [atualizarEstado, setAtualizarEstado] = React.useState(false)   
    const [cancelarEstado, setCancelarEstado] = React.useState(false)   
    const [digitarEstado, setDigitarEstado] = React.useState(false)    
    const [cadastrarEstado, setCadastrarEstado] = React.useState(false)
    const [visualizarContasReceber, setVisualizarContasReceber] = React.useState(false)  
    const [atualizarCabecalhoEstado, setAtualizarCabecalhoEstado] = React.useState(false)  
    const [finalizarEstado, setFinalizarEstado] = React.useState(false)  
    const [incicarEstado, setIniciarEstado] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [defaultFiltersCobReceber, setDefaultFiltersCobReceber] = React.useState({})


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const setNamePessoa = ({target})=>{
        
        setPessoa(target.value)
    }

    const filtersArr = []

    const acoesBottomCard=[];


    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarEstado(true);
                }else{
                    setAtualizarEstado(false);
                }
                break;
            default:
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarEstado == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarEstado])

    const atualizarEstadoAction = (idEstado)=>{
        setEstadoChoice(idEstado)
        setAcao('editar')
        setAtualizarEstado(true);
    }


    //finalizarEstado, setFinalizarEstado
    

    React.useEffect(()=>{
        console.log('Ordem criada..............')
        console.log(idEstadoCriada)
        console.log('Ordem criada..............')
        idEstadoCriada && idEstadoCriada > 0 && atualizarEstadoAction(idEstadoCriada)

    }, [idEstadoCriada])

    const gerarTableEstado = ()=>{
       
        let data = [];
        let dataEstado = estado.mensagem
        if(dataEstado && Array.isArray(dataEstado) && dataEstado.length > 0){
            for(let i=0; !(i == dataEstado.length); i++){
                let atual = dataEstado[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar                   = true;

                    acoesArr.push({acao:()=>atualizarEstadoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})

                    let line_style = {}
                    
                    //'remarcado','finalizado','cancelado','pendente'
                    data.push(

                        {
                            propsRow:{id:(atual.id), style:{...line_style}},
                            acoes:[
                                ...acoesArr
                            ],
                            celBodyTableArr:[
                                {

                                    label:atual.id,
                                    propsRow:{}
                                },
                                {

                                    label:atual.nmEStado,
                                    propsRow:{}
                                },
                                {

                                    label:atual.codEstado,
                                    propsRow:{}
                                },
                                {

                                    label:atual.nmPais,
                                    propsRow:{}
                                },
                                {

                                    label:atual.cdPais,
                                    propsRow:{}
                                },
                                {

                                    label:atual.padrao,
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

    const gerarListMobileRelatorio = ()=>{
       
        let data = [];
        let dataEstado = estado.mensagem
        if(dataEstado && Array.isArray(dataEstado) && dataEstado.length > 0){
            for(let i=0; !(i == dataEstado.length); i++){
                let atual = dataEstado[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar                   = true;

                    acoesArr.push({acao:()=>atualizarEstadoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})

                    let line_style = {}
                   
                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow: atual.id +' - '+ atual?.nmEStado, style:{...line_style}, mainIcon:faFileAlt},
                            acoes:[
                                ...acoesArr
                            ],
                            title:<> <div style={{display:'flex', justifyContent:'space-between',fontSize:'18pt', fontWeight:'bolder'}} ><span><FontAwesomeIcon size={'lg'} icon={faUserCircle}/> {atual?.name} </span> </div> </>,
                            propsContainerTitulo:{md:'11', sm:'9', xs:'9'},
                            propsContainerButtons:{md:'1', sm:'3', xs:'3'},
                            acoesBottomCard:[
                              
                            ],
                            celBodyTableArr:[
                                [
                                    {
                                        title:<span style={{fontWeight:'480'}}>Código: </span>,
                                        label:atual?.id,
                                        props:{style:{textAlign:'left', md:'2', sm:'2', xs:'2'}},
                                        toSum:1,
                                        isCoin:1,
                                    }, {
                                        title:<span style={{fontWeight:'480'}}>Nome: </span>,
                                        label:atual?.nmEStado,
                                        props:{style:{textAlign:'left', md:'5', sm:'5', xs:'5'}},
                                        toSum:1,
                                        isCoin:1,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Cód estado: </span>,
                                        label:atual?.codEstado,
                                        props:{style:{textAlign:'left', fontWeight:'bolder', md:'5', sm:'5', xs:'5'}},
                                        toSum:1,
                                        isCoin:1,
                                    },

                                ],
                                
                               
                               
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
                label:'Código estado',
                props:{}
            },
            {
                label:'País',
                props:{}
            },
            {
                label:'Código país',
                props:{}
            },

            {
                label:'Padrão',
                props:{}
            }
        ]

        return tableTitle;
    }

    //------------

    const requestAllEstados = async() =>{
       
        const {url, options} = ESTADO_ALL_POST({'name':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All serviços here')
        console.log({'name':pessoa})
        console.log(json)
        if(json){
            setEstado(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllEstadosEffect = async() =>{
       
           await requestAllEstados();

            
        }

       /// requestAllEstadosEffect();

        
    }, [])

    React.useEffect(()=>{
        setEstado(dataEstado)
    }, [dataEstado])
    

    const rowsTableArr = gerarTableEstado();    
    const titulosTableArr = gerarTitleTable();

    return(
        <>
            <Row>
                <Col  xs="12" sm="12" md="12" className={'mobile_card_report py-4'}  style={{backgroundColor:'#FFF',}}>

                   
                    
                    <ListMobile
                        titulosTableArr={null}
                        rowsTableArr={gerarListMobileRelatorio()}
                        loading={loadingData}
                        nadaEncontrado={nadaEncontrado}
                        withoutFirstCol={true}
                        botoesHeader={[{acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> }]}
                    />
                </Col>

                <Col  xs="12" sm="12" md="12"  className={'default_card_report'}>
                    <Table
                        titulosTableArr={titulosTableArr}
                        rowsTableArr={rowsTableArr}
                        loading={loadingData}
                        nadaEncontrado={nadaEncontrado}
                        botoesHeader={[]}

                    />
                </Col>
            </Row>

            {
                cadastrarEstado && <Cadastrar cadastrarEstado={cadastrarEstado} setCadastrarEstado={setCadastrarEstado} atualizarEstado={atualizarEstado} setAtualizarCadastro={setAtualizarEstado} setAtualizarEstado={setAtualizarEstado}  idEstado={consultaChoice} setIdEstado={setEstadoChoice} callback={callBack} />
            }
            
            {
                atualizarEstado &&
                <Atualizar atualizarEstado={atualizarEstado} atualizarCadastro={atualizarEstado} setAtualizarEstado={setAtualizarEstado} setAtualizarCadastro={setAtualizarEstado}  idEstado={consultaChoice} setIdEstado={setEstadoChoice} callback={callBack} />
            }

        
        </>
    )
}

export default Include;