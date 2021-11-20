import React from 'react';
import estilos from './Estado.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ESTADO_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormEstado from './FormEstado/index.js'


const Estado = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setEstado] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarEstado, setShowModalCriarEstado] = React.useState(false)


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
        props:{onClick:()=>requestAllEstados(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setShowModalCriarEstado(true), className:'btn btn-sm mx-2 btn-secondary'}
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

    const gerarTableEstado = ()=>{
       
        let data = [];
        let dataEstado = estado.mensagem
        if(dataEstado && Array.isArray(dataEstado) && dataEstado.length > 0){
            for(let i=0; !(i == dataEstado.length); i++){
                let atual = dataEstado[i];
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
   /* React.useEffect( ()=>{
        const requestToken = async() =>{
       
           const {url, options} = TOKEN_POST({
                'grant_type':'password',
                'client_id': CLIENT_ID,
                'client_secret':CLIENT_SECRET,
                'username':'admin@gmail.com',
                'password':'123456'
             });


            const {response, json} = await request(url, options);

            
        }

        requestToken();
        
    }, []);*/

    //----
    /*React.useEffect(()=>{

        setExemplos(gerarExemplos());
        setExemplosTitleTable(gerarTitleTable());

    }, [])*/

    const requestAllEstados = async() =>{
       
        const {url, options} = ESTADO_ALL_POST({}, getToken());


        const {response, json} = await request(url, options);
        console.log('All estados here')
        console.log(json)
        if(json){
               setEstado(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllEstadosEffect = async() =>{
       
           await requestAllEstados();

            
        }

        requestAllEstadosEffect();

        
    }, [])
    const rowsTableArr = gerarTableEstado();    
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
                            label:'Estado'
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
            <FormEstado showModalCriarEstado={showModalCriarEstado} setShowModalCriarEstado={setShowModalCriarEstado} callback={requestAllEstados} />
         </>

    )
}

export default Estado;