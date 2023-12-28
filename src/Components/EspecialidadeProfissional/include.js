import React from 'react'
import estilos from './Especialidade.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ESPECIALIDADE_ALL_POST} from '../../api/endpoints/geral.js'
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
import FormEspecialidade from './FormEspecialidade/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'
import { Button } from 'bootstrap';
import reactDom from 'react-dom';
//

const Include = ({dataEstado, loadingData, callBack, setMostarFiltros, nadaEncontrado, idEspecialidadeCriada, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setEspecialidade] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarEspecialidade, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setEspecialidadeChoice] = React.useState(null);
    const [atualizarEspecialidade, setAtualizarEspecialidade] = React.useState(false)   
    const [cancelarEspecialidade, setCancelarEspecialidade] = React.useState(false)   
    const [digitarEspecialidade, setDigitarEspecialidade] = React.useState(false)    
    const [cadastrarEspecialidade, setCadastrarEspecialidade] = React.useState(false)
    const [visualizarContasReceber, setVisualizarContasReceber] = React.useState(false)  
    const [atualizarCabecalhoEspecialidade, setAtualizarCabecalhoEspecialidade] = React.useState(false)  
    const [finalizarEspecialidade, setFinalizarEspecialidade] = React.useState(false)  
    const [incicarEspecialidade, setIniciarEspecialidade] = React.useState(false) 
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



    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarEspecialidade(true);
                }else{
                    setAtualizarEspecialidade(false);
                }
                break;
            default:
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarEspecialidade == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarEspecialidade])

    const atualizarEspecialidadeAction = (idEspecialidade)=>{
        setEspecialidadeChoice(idEspecialidade)
        setAcao('editar')
        setAtualizarEspecialidade(true);
    }

    

    React.useEffect(()=>{
        /**
         * consultaChoice, setEspecialidadeChoice] = React.useState(()=>{
        return idEspecialidadeCriada;
    }
         */
        console.log('Ordem criada..............')
        console.log(idEspecialidadeCriada)
        console.log('Ordem criada..............')
        idEspecialidadeCriada && idEspecialidadeCriada > 0 && atualizarEspecialidadeAction(idEspecialidadeCriada)

    }, [idEspecialidadeCriada])

    const gerarTableEspecialidade = ()=>{
       
        let data = [];
        let dataEspecialidade = estado.mensagem
        if(dataEspecialidade && Array.isArray(dataEspecialidade) && dataEspecialidade.length > 0){
            for(let i=0; !(i == dataEspecialidade.length); i++){
                let atual = dataEspecialidade[i];
                if(atual){
                    
                    let line_style = {}
                    if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
                    } 
                    
                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                {acao:()=>atualizarEspecialidadeAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
                                //{acao:()=>alert('Agenda qui: '+(atual.id)), label:'Agenda', propsOption:{}, propsLabel:{}},
                                //{acao:()=>alert('Histórico de atentimentos: '+(atual.id)), label:'Histórico de atendimentos', propsOption:{}, propsLabel:{}},
                                //{acao:()=>alert('Central do cliente: '+(atual.id)), label:'Central do cliente', propsOption:{}, propsLabel:{}},
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
        let dataEspecialidade = estado.mensagem
        if(dataEspecialidade && Array.isArray(dataEspecialidade) && dataEspecialidade.length > 0){
            for(let i=0; !(i == dataEspecialidade.length); i++){
                let atual = dataEspecialidade[i];
                if(atual){
                    let acoesArr = [
                    	{acao:()=>atualizarEspecialidadeAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
                         
                    ]

                    let line_style = {}
                    if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
                    } 

                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow: atual.id +' - '+ atual?.name, style:{...line_style}, mainIcon:faFileAlt},
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
                                        title:<span style={{fontWeight:'480'}}>Descrição</span>,
                                        label:atual?.name,
                                        props:{style:{textAlign:'left', md:'3', sm:'3', xs:'3'}},
                                        toSum:1,
                                        isCoin:1,
                                    }

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
                label:'Descrição',
                props:{}
            }
        ]

        return tableTitle;
    }

    //------------

    const requestAllEspecialidades = async() =>{
       
        const {url, options} = ESPECIALIDADE_ALL_POST({'name_servico':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All serviços here')
        console.log({'name_servico':pessoa})
        console.log(json)
        if(json){
            setEspecialidade(json)
        }

            
    }

    React.useEffect(()=>{
        setEspecialidade(dataEstado)
    }, [dataEstado])
    

    const rowsTableArr = gerarTableEspecialidade();    
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

                    {
                    /*
                    <CardMobile
                        titulosTableArr={null}
                        rowsTableArr={gerarCardContasReceber()}
                        loading={loadingData}
                        botoesHeader={[{acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> }]}
                    />
                    */
                    }
                </Col>

                <Col  xs="12" sm="12" md="12"  className={'default_card_report'}>
                    <Table
                        titulosTableArr={titulosTableArr}
                        rowsTableArr={rowsTableArr}
                        loading={loadingData}
                        nadaEncontrado={nadaEncontrado}
                        botoesHeader={[{acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> }]}

                    />
                </Col>
            </Row>

            {
                cadastrarEspecialidade && <Cadastrar cadastrarEspecialidade={cadastrarEspecialidade} setCadastrarEspecialidade={setCadastrarEspecialidade} atualizarEspecialidade={atualizarEspecialidade} setAtualizarEspecialidade={setAtualizarEspecialidade}  idEspecialidade={consultaChoice} setIdEspecialidade={setEspecialidadeChoice} callback={callBack} />
            }
            
            {
                atualizarEspecialidade &&
                <Atualizar atualizarEspecialidade={atualizarEspecialidade} atualizarCadastro={atualizarEspecialidade} setAtualizarCadastro={setAtualizarEspecialidade}  idEspecialidade={consultaChoice} setIdEspecialidade={setEspecialidadeChoice} callback={callBack} />
            }
        
        </>
    )
}

export default Include;