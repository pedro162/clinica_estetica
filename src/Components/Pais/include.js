import React from 'react'
import estilos from './Pais.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ALL_POST} from '../../api/endpoints/geral.js'
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
import FormPais from './FormPais/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'
import { Button } from 'bootstrap';
import reactDom from 'react-dom';
//

const Include = ({dataEstado, loadingData, callBack, setMostarFiltros, nadaEncontrado, idPaisCriada, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setPais] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarPais, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setPaisChoice] = React.useState(null);
    const [atualizarPais, setAtualizarPais] = React.useState(false)   
    const [cancelarPais, setCancelarPais] = React.useState(false)   
    const [digitarPais, setDigitarPais] = React.useState(false)    
    const [cadastrarPais, setCadastrarPais] = React.useState(false)
    const [visualizarContasReceber, setVisualizarContasReceber] = React.useState(false)  
    const [atualizarCabecalhoPais, setAtualizarCabecalhoPais] = React.useState(false)  
    const [finalizarPais, setFinalizarPais] = React.useState(false)  
    const [incicarPais, setIniciarPais] = React.useState(false) 
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
                    setAtualizarPais(true);
                }else{
                    setAtualizarPais(false);
                }
                break;
            default:
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarPais == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarPais])

    const atualizarPaisAction = (idPais)=>{
        setPaisChoice(idPais)
        setAcao('editar')
        setAtualizarPais(true);
    }


    //finalizarPais, setFinalizarPais
    

    React.useEffect(()=>{
        /**
         * consultaChoice, setPaisChoice] = React.useState(()=>{
        return idPaisCriada;
    }
         */
        console.log('Ordem criada..............')
        console.log(idPaisCriada)
        console.log('Ordem criada..............')
        idPaisCriada && idPaisCriada > 0 && atualizarPaisAction(idPaisCriada)

    }, [idPaisCriada])

    const gerarTablePais = ()=>{
       
        let data = [];
        let dataPais = estado.mensagem
        if(dataPais && Array.isArray(dataPais) && dataPais.length > 0){
            for(let i=0; !(i == dataPais.length); i++){
                let atual = dataPais[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar                   = true;

                    acoesArr.push({acao:()=>atualizarPaisAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})

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
        let dataPais = estado.mensagem
        if(dataPais && Array.isArray(dataPais) && dataPais.length > 0){
            for(let i=0; !(i == dataPais.length); i++){
                let atual = dataPais[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar                   = true;

                    acoesArr.push({acao:()=>atualizarPaisAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})

                    let line_style = {}
                   
                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow: atual.id +' - '+ atual?.nmPais, style:{...line_style}, mainIcon:faFileAlt},
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
                                        label:atual?.nmPais,
                                        props:{style:{textAlign:'left', md:'5', sm:'5', xs:'5'}},
                                        toSum:1,
                                        isCoin:1,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Cód pais: </span>,
                                        label:atual?.cdPais,
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
                label:'Código pais',
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

    const requestAllPaiss = async() =>{
       
        const {url, options} = ORDEM_SERVICO_ALL_POST({'name':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All serviços here')
        console.log({'name':pessoa})
        console.log(json)
        if(json){
            setPais(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllPaissEffect = async() =>{
       
           await requestAllPaiss();

            
        }

       /// requestAllPaissEffect();

        
    }, [])

    React.useEffect(()=>{
        setPais(dataEstado)
    }, [dataEstado])
    

    const rowsTableArr = gerarTablePais();    
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
                cadastrarPais && <Cadastrar cadastrarPais={cadastrarPais} setCadastrarPais={setCadastrarPais} atualizarPais={atualizarPais} setAtualizarCadastro={setAtualizarPais} setAtualizarPais={setAtualizarPais}  idPais={consultaChoice} setIdPais={setPaisChoice} callback={callBack} />
            }
            
            {
                atualizarPais &&
                <Atualizar atualizarPais={atualizarPais} setAtualizarPais={setAtualizarPais} setAtualizarCadastro={setAtualizarPais}  idPais={consultaChoice} setIdPais={setPaisChoice} callback={callBack} />
            }

        
        </>
    )
}

export default Include;