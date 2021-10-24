import React from 'react'
import useFetch from '../../Hooks/useFetch.js';
import useModal from '../../Hooks/useModal.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET} from '../../api/endpoints/geral.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Head from '../Header/Head.js'
import Modal from '../Utils/Modal/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import Create from './Create.js'
import { faHome, faSearch,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContasReceber = () => {

    const {data, error, request, loading} = useFetch();
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarReceber, setShowModalCriarReceber] = React.useState(false)


    const alerta = (target)=>{
        console.log(target)
    }
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
        	props:{onClick:()=>alert('cliclou'), className:'btn btn-sm botao_success'}
    	},
    	{

    		label:'Lançar',
	        icon:<FontAwesomeIcon icon={faPlus} />,
	        props:{onClick:()=>setShowModalCriarReceber(true), className:'mx-2 btn btn-sm btn-secondary'}
    	},
    ];


    React.useEffect( ()=>{
        const response = async() =>{
            const body = TOKEN_POST({
                'grant_type':'password',
                'client_id': CLIENT_ID,
                'client_secret':CLIENT_SECRET,
                'username':'admin@gmail.com',
                'password':'123654',
                'scope':'',
            })
            console.log(body)
            await request(body);
        }

        response()
        
    }, []);

    React.useEffect(()=>{

        setExemplos(gerarExemplos());
        setExemplosTitleTable(gerarTitleTable());

    }, [])


    const rowsTableArr = exemplos;    
    const titulosTableArr = exemplosTitleTable;

    return (
        <>
        	<Head
        		title="Contas a receber"
        		content="Estúdio beleza, contas a receber "
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
                            label:'Contas a receber'
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
            <Modal children={<Create/>} title={'Lançar conta a receber'} labelConcluir="Finalizar" dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarReceber} showHide={setShowModalCriarReceber}/>
        </>
    )
}

export default ContasReceber;
