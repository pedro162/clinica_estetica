import React from 'react';
import estilos from './Agenda.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, AGENDA_ALL_POST} from '../../api/endpoints/geral.js'
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
import FormAgenda from './FormAgenda/index.js'


const Agenda = (props)=>{

	const {data, error, request, loading} = useFetch();
    const [cidade, setAgenda] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarAgenda, setShowModalCriarAgenda] = React.useState(false)
    const [showModalAtualizarAgenda, setShowModalAtualizarAgenda] = React.useState(false)
    const [cidadeChoice, setAgendaChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [cadastrarAgenda, setCadastrarAgenda] = React.useState(false)    
    const [dataEstado, setDataEstado] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [agenda_id, setAgendaId] = React.useState('')


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }
    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':agenda_id,onChange:setAgendaId,    onBlur:setAgendaId},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':pessoa,onChange:setPessoa,    onBlur:setPessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'nome',onChange:alerta,    onBlur:alerta},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Status',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'nome',onChange:alerta,    onBlur:alerta},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Histórico',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"12",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'nome',onChange:alerta,    onBlur:alerta},

        }
    ]

    const acoesBottomCard=[{
            label:'Pesquisar',
            icon:<FontAwesomeIcon icon={faSearch} />,
            props:{onClick:()=>requestAllAgenda(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarAgenda(true), className:'btn btn-sm mx-2 btn-secondary'}
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

    const gerarTableAgenda = ()=>{
       
        let data = [];
        let dataAgenda = cidade.mensagem
        if(dataAgenda && Array.isArray(dataAgenda) && dataAgenda.length > 0){
            for(let i=0; !(i == dataAgenda.length); i++){
                let atual = dataAgenda[i];
                if(atual){


                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                {acao:()=>setAgendaChoice(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
                                {acao:()=>alert('Agenda qui: '+(atual.id)), label:'Agenda', propsOption:{}, propsLabel:{}},
                                {acao:()=>alert('Histórico de atentimentos: '+(atual.id)), label:'Histórico de atendimentos', propsOption:{}, propsLabel:{}},
                                {acao:()=>alert('Central do cliente: '+(atual.id)), label:'Central do cliente', propsOption:{}, propsLabel:{}},
                            ],
                            celBodyTableArr:[
                                {

                                    label:atual?.id,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.name_pessoa,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.status,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.descricao,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.data_format,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.hora,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.name_pessoa_cancelamento,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.dt_cancelamento,
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
                label:'Pessoa',
                props:{}
            },
            {
                label:'Status',
                props:{}
            },
            {
                label:'Histórico',
                props:{}
            },
            {
                label:'Data',
                props:{}
            },
            {
                label:'Hora',
                props:{}
            },
            {
                label:'Cancelado por',
                props:{}
            },
            {
                label:'Cancelado em',
                props:{}
            },
        ]

        return tableTitle;
    }

    const requestAllAgenda = async() =>{
        const fil = {'name':pessoa, 'id':agenda_id};
        console.log(fil)
        
        const {url, options} = AGENDA_ALL_POST({}, getToken());


        const {response, json} = await request(url, options);
        console.log('All clients here')
        console.log(json)
        if(json){
               setAgenda(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllAgendaEffect = async() =>{
       
           await requestAllAgenda();

            
        }

        requestAllAgendaEffect();

        
    }, [])

    React.useEffect(()=>{

        if(cidadeChoice > 0){
            setAtualizarCadastro(true);
        }else{
            setAtualizarCadastro(false);
        }

        
    }, [cidadeChoice])

    React.useEffect(()=>{

        if(cadastrarAgenda == true){
            setShowModalCriarAgenda(true);
        }else{
            setShowModalCriarAgenda(false);
        }

        
    }, [cadastrarAgenda])

    
    const rowsTableArr = gerarTableAgenda();    
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
                            label:'Agenda'
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
                cadastrarAgenda && <Cadastrar cadastrarAgenda={cadastrarAgenda} setCadastrarAgenda={setCadastrarAgenda} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idAgenda={cidadeChoice} setIdAgenda={setAgendaChoice} callback={requestAllAgenda} />
            }
            
            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idAgenda={cidadeChoice} setIdAgenda={setAgendaChoice} callback={requestAllAgenda} />
            }
         </>

	)
}

export default Agenda;

//<FormAgenda dataEstado={dataEstado} dataClienteChoice={[]}  atualizarCadastro={false} setAtualizarCadastro={setAtualizarCadastro}  idAgenda={null} setIdAgenda={setAgendaChoice}  showModalCriarAgenda={showModalCriarAgenda} setShowModalCriarAgenda={setShowModalCriarAgenda} callback={requestAllAgenda} />
