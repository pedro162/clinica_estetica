import React from 'react';
import estilos from './CategoriaEvento.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CATEGORIA_EVENTO_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormCategoriaEvento from './FormCategoriaEvento/index.js'
import Excluir from './Excluir/index.js'


const CategoriaEvento = (props)=>{

	const {data, error, request, loading} = useFetch();
    const [CategoriaEvento, setCategoriaEvento] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarCategoriaEvento, setShowModalCriarCategoriaEvento] = React.useState(false)
    const [showModalAtualizarCategoriaEvento, setShowModalAtualizarCategoriaEvento] = React.useState(false)
    const [CategoriaEventoChoice, setCategoriaEventoChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [excluirCadastro, setExcluirCadastro] = React.useState(false)    
    const [cadastrarCategoriaEvento, setCadastrarCategoriaEvento] = React.useState(false)    


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
            props:{onClick:()=>requestAllCategoriaEvento(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarCategoriaEvento(true), className:'btn btn-sm mx-2 btn-secondary'}
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

    const gerarTableCategoriaEvento = ()=>{
       
        let data = [];
        let dataCategoriaEvento = CategoriaEvento.mensagem
        if(dataCategoriaEvento && Array.isArray(dataCategoriaEvento) && dataCategoriaEvento.length > 0){
            for(let i=0; !(i == dataCategoriaEvento.length); i++){
                let atual = dataCategoriaEvento[i];
                if(atual){


                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                {acao:()=>{setCategoriaEventoChoice(atual.id);setAtualizarCadastro(true);}, label:'Editar', propsOption:{}, propsLabel:{}},
                                {acao:()=>{setCategoriaEventoChoice(atual.id);setExcluirCadastro(true);}, label:'Excluir', propsOption:{}, propsLabel:{}},
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

                                    label:atual.sigla,
                                    propsRow:{}
                                },
                                {

                                    label:atual.cdCiade,
                                    propsRow:{}
                                },
                                {

                                    label:atual.nmEStado,
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
                label:'Descrição',
                props:{}
            }
        ]

        return tableTitle;
    }

    const requestAllCategoriaEvento = async() =>{
       
        const {url, options} = CATEGORIA_EVENTO_ALL_POST({}, getToken());


        const {response, json} = await request(url, options);
        console.log('All clients here')
        console.log(json)
        if(json){
               setCategoriaEvento(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllCategoriaEventoEffect = async() =>{
       
           await requestAllCategoriaEvento();

            
        }

        requestAllCategoriaEventoEffect();

        
    }, [])

    /*React.useEffect(()=>{

        if(CategoriaEventoChoice > 0){
            setAtualizarCadastro(true);
        }else{
            setAtualizarCadastro(false);
        }

        
    }, [CategoriaEventoChoice])*/

    React.useEffect(()=>{

        if(cadastrarCategoriaEvento == true){
            setShowModalCriarCategoriaEvento(true);
        }else{
            setShowModalCriarCategoriaEvento(false);
        }

        
    }, [cadastrarCategoriaEvento])

    
    const rowsTableArr = gerarTableCategoriaEvento();    
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
                            label:'CategoriaEvento'
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
                cadastrarCategoriaEvento && <Cadastrar cadastrarCategoriaEvento={cadastrarCategoriaEvento} setCadastrarCategoriaEvento={setCadastrarCategoriaEvento} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idCategoriaEvento={CategoriaEventoChoice} setIdCategoriaEvento={setCategoriaEventoChoice} callback={requestAllCategoriaEvento} />
            }
            
            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idCategoriaEvento={CategoriaEventoChoice} setIdCategoriaEvento={setCategoriaEventoChoice} callback={requestAllCategoriaEvento} />
            }

            {
                excluirCadastro &&
                <Excluir excluirCadastro={excluirCadastro} setExcluirCadastro={setExcluirCadastro}  idCategoriaEvento={CategoriaEventoChoice} setIdCategoriaEvento={setCategoriaEventoChoice} callback={requestAllCategoriaEvento} />
            }
         </>

	)
}

export default CategoriaEvento;