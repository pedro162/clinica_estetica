import React from 'react';
import estilos from './Consulta.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormConsulta from './FormConsulta/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'


const Consulta = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setConsulta] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarConsulta, setShowModalCriarConstula] = React.useState(false)
    const [clientChoice, setConsultaChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [cadastrarConsulta, setCadastrarConsulta] = React.useState(false) 


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
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
                    contentLabel:'Teste Radio 01',
                    atributsFormLabel:{},
                    atributsFormControl:{'type':'radio', value:'12', size:"sm",'checked':true,'name':'nome',onChange:alerta,    onBlur:alerta},
                },
                {
                    hasLabel: true,
                    contentLabel:'Teste Radio',
                    atributsFormLabel:{},
                    atributsFormControl:{'type':'radio', value:'12', size:"sm",'checked':true,'name':'nome',onChange:alerta,    onBlur:alerta},
                }
            ],  
            hasLabel: true,
            contentLabel:'Teste',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"12",className:'mb-2',},
            atributsFormControl:{},

        }
        ,{
            type:'checkbox',
            options:[], 
            hasLabel: true,
            contentLabel:'Teste',
            atributsFormLabel:{},
            atributsContainer:{ xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'checkbox', value:'12',size:"sm",'checked':false,'name':'nome',onChange:alerta, onBlur:alerta},

        }
    ]

    const acoesBottomCard=[{
        label:'Pesquisar',
        icon:<FontAwesomeIcon icon={faSearch} />,
        props:{onClick:()=>requestAllConsultas(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setShowModalCriarConstula(true), className:'btn btn-sm mx-2 btn-secondary'}
    }
    ];

    const gerarTableConsulta = ()=>{
       
        let data = [];
        let dataConsulta = estado.mensagem
        if(dataConsulta && Array.isArray(dataConsulta) && dataConsulta.length > 0){
            for(let i=0; !(i == dataConsulta.length); i++){
                let atual = dataConsulta[i];
                if(atual){


                    data.push(

                        {
                            propsRow:{id:(atual.id)},
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

                                    label:atual.codConsulta,
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

    const gerarTitleTable = ()=>{
        let tableTitle = [
            {
                label:'Código',
                props:{}
            },
            {
                label:'Data',
                props:{}
            },
            {
                label:'Horário',
                props:{}
            },
            {
                label:'Pessoa',
                props:{}
            },
            {
                label:'Prioridade',
                props:{}
            },
            {
                label:'Status',
                props:{}
            }
        ]

        return tableTitle;
    }
   

    //------------

    const requestAllConsultas = async() =>{
       
        const {url, options} = CONSULTA_ALL_POST({}, getToken());


        const {response, json} = await request(url, options);
        console.log('All clients here')
        console.log(json)
        if(json){
            setConsulta(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllConsultasEffect = async() =>{
       
           await requestAllConsultas();

            
        }

        requestAllConsultasEffect();

        
    }, [])

    const rowsTableArr = gerarTableConsulta();    
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
                            label:'Consulta'
                        }
                    ]}
            />
            <Row>
                <Col  xs="12" sm="12" md="3">
                    <Filter
                        filtersArr={filtersArr}
                        actionsArr={acoesBottomCard}
                    />
                </Col>
                <Col  xs="12" sm="12" md="9">
                    <Table
                        titulosTableArr={titulosTableArr}
                        rowsTableArr={rowsTableArr}
                        loading={loading}

                    />
                </Col>
            </Row>

            {
                cadastrarConsulta && <Cadastrar cadastrarConsulta={cadastrarConsulta} setCadastrarConsulta={setCadastrarConsulta} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idConsulta={clientChoice} setIdConsulta={setConsultaChoice} callback={requestAllConsultas} />
            }
            
            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idConsulta={clientChoice} setIdConsulta={setConsultaChoice} callback={requestAllConsultas} />
            }
           
         </>

    )
}

export default Consulta;