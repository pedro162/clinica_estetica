import React from 'react';
import estilos from './User.module.css';
import useFetch from '../../Hooks/useFetch.js';
import useModal from '../../Hooks/useModal.js';
import {TESTE_API_GET, CLIENT_ID,CLIENT_SECRET, USER_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Head from '../Header/Head.js'
import Modal from '../Utils/Modal/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import Create from './Cadastrar/index.js'
import { faHome, faSearch,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {UserContex} from '../../Context/UserContex.js'

const User = (props)=>{
	const {data, error, request, loading} = useFetch();
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarUser, setShowModalCriarUser] = React.useState(false)

    const {getToken} = React.useContext(UserContex);
    
    const alerta = (target)=>{
        console.log(target)
    }
    const gerarExemplos = ()=>{
        let exemplos = [];
        for(let i=0; !(i == 10); i++){
            exemplos.push(

                    {
                        propsRow:{id:(i+1), onClick:()=>alert('aqui:'+(i+1))},
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

    const gerarTitleTable = ()=>{
        let exemplos = [
            {
                label:'Coluna exemplo 1',
                props:{}
            },
            {
                label:'Coluna exemplo 2',
                props:{}
            },
            {
                label:'Coluna exemplo 3',
                props:{}
            },
            {
                label:'Coluna exemplo 4',
                props:{}
            },
        ]

        return exemplos;
    }
    
     const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Teste afafaf',
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
    ];

    const acoesBottomCard=[{
        	label:'Pesquisar',
        	icon:<FontAwesomeIcon icon={faSearch} />,
        	props:{onClick:()=>alert('cliclou aq'), className:'btn btn-sm botao_success'}
    	},
    	{

    		label:'Novo User',
	        icon:<FontAwesomeIcon icon={faPlus} />,
	        props:{onClick:()=>setShowModalCriarUser(true), className:'mx-2 btn btn-sm btn-secondary'}
    	},
    ];


    React.useEffect(()=>{

        const requestAllUsers = async() =>{
       
           const {url, options} = USER_ALL_POST({}, getToken());


            const {response, json} = await request(url, options);
            console.log('All users here')
            console.log(json)

            
        }

        requestAllUsers();

        
    }, [])

    React.useEffect(()=>{

        setExemplos(gerarExemplos());
        setExemplosTitleTable(gerarTitleTable());

    }, [])



    const rowsTableArr = exemplos;    
    const titulosTableArr = exemplosTitleTable;

    return (
        <>
        	<Head
        		title="User"
        		content="Estúdio beleza, user "
        	/>
            <Breadcrumbs
                items={[
                        {
                            to:'/',
                            props:{},
                            label:'Início'
                        },
                        {
                            props:{},
                            label:'Usuário'
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

                    />
                </Col>
            </Row>
            <Create showModalCriarUser={showModalCriarUser} setShowModalCriarUser={setShowModalCriarUser} />
        </>
    )
}

export default User;