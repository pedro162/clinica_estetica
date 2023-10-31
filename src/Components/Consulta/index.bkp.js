import React from 'react';
import estilos from './Consulta.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
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
import Cancelar from './Cancelar/index.js'


const Consulta = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setConsulta] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarConsulta, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setConsultaChoice] = React.useState(null);
    const [atualizarConsulta, setAtualizarConsulta] = React.useState(false)   
    const [cancelarConsulta, setCancelarConsulta] = React.useState(false)    
    const [cadastrarConsulta, setCadastrarConsulta] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
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
        props:{onClick:()=>requestAllConsultas(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setCadastrarConsulta(true), className:'btn btn-sm mx-2 btn-secondary'}
    }
    ];


    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarConsulta(true);
                }else{
                    setAtualizarConsulta(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarConsulta(true);
                }else{
                    setCancelarConsulta(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarConsulta == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarConsulta])

    const atualizarConsultaAction = (idConsulta)=>{
        setConsultaChoice(idConsulta)
        setAcao('editar')
        setAtualizarConsulta(true);
    }
    const cancelarConsultaAction = (idConsulta)=>{
        setConsultaChoice(idConsulta)
        setAcao('cancelar')
        setCancelarConsulta(true);
    }
    //cancelarConsulta, setCancelarConsulta
    const novaConsulta = (idConsulta)=>{
        setConsultaChoice(idConsulta)
        setAcao('consultar')
        setAtualizarConsulta(true);
    }

    const gerarTableConsulta = ()=>{
       
        let data = [];
        let dataConsulta = estado.mensagem
        if(dataConsulta && Array.isArray(dataConsulta) && dataConsulta.length > 0){
            for(let i=0; !(i == dataConsulta.length); i++){
                let atual = dataConsulta[i];
                if(atual){
                    let acoesArr = [];
                    let btnCancelar         = true;
                    let btnEditar           = true;
                    let btnExames           = true;
                    let btnDiagnostico      = true;
                    let btnFicha            = true;
                    let btnDetalhes         = true;
                    let btnGerarFinanceiro  = true;

                    if(atual.status == 'cancelado'){
                        btnCancelar         = false;
                        btnEditar           = false;
                        btnGerarFinanceiro  = false;
                    }

                    if(atual.status == 'finalizado'){
                        btnCancelar = false;
                        btnEditar   = false;
                    }

                    if(btnGerarFinanceiro){
                        acoesArr.push({acao:()=>atualizarConsultaAction(atual.id), label:'Gerar financeiro', propsOption:{}, propsLabel:{}})
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarConsultaAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnCancelar){
                        acoesArr.push({acao:()=>cancelarConsultaAction(atual.id), label:'Cancelar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnExames){
                        acoesArr.push({acao:()=>atualizarConsultaAction(atual.id), label:'Exames', propsOption:{}, propsLabel:{}})
                    }

                    if(btnDiagnostico){
                        acoesArr.push({acao:()=>atualizarConsultaAction(atual.id), label:'Diagnóstico', propsOption:{}, propsLabel:{}})
                    }
                    if(btnFicha){
                        acoesArr.push({acao:()=>atualizarConsultaAction(atual.id), label:'Ficha', propsOption:{}, propsLabel:{}})
                    }

                    if(btnDetalhes){
                        acoesArr.push({acao:()=>alert('Detalhes qui: '+(atual.id)), label:'Detalhes', propsOption:{}, propsLabel:{}})
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

                                    label:atual.filial_id,
                                    propsRow:{}
                                },
                                {

                                    label:atual.pessoa_id,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name_pessoa,
                                    propsRow:{}
                                },
                                {

                                    label:atual.status,
                                    propsRow:{}
                                },
                                {

                                    label:atual.prioridade,
                                    propsRow:{}
                                },
                                {

                                    label:atual.profissional_id,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name_profissional,
                                    propsRow:{}
                                },
                                {

                                    label:FORMAT_DATA_PT_BR(atual.dt_inicio),
                                    propsRow:{}
                                },
                                {

                                    label:atual.hr_inicio,
                                    propsRow:{}
                                },{

                                    label:String(FORMAT_DATA_PT_BR(atual.dt_fim)).length > 0 && FORMAT_DATA_PT_BR(atual.dt_fim),
                                    propsRow:{}
                                },
                                {

                                    label:atual.hr_fim,
                                    propsRow:{}
                                },
                                {

                                    label:String(FORMAT_DATA_PT_BR(atual.dt_cancelamento)).length > 0 && FORMAT_DATA_PT_BR(atual.dt_cancelamento),
                                    propsRow:{}
                                },
                                {

                                    label:atual.ds_cancelamento,
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
                label:'Cód. filial',
                props:{}
            },
            {
                label:'Cód. pessoa',
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
                label:'Prioridade',
                props:{}
            },
            {
                label:'Cód. profissional',
                props:{}
            },
            {
                label:'Profissional',
                props:{}
            },
            {
                label:'Data início',
                props:{}
            },
            {
                label:'Horário início',
                props:{}
            },
            {
                label:'Data fim',
                props:{}
            },
            {
                label:'Horário fim',
                props:{}
            },
            {
                label:'Cancelado em',
                props:{}
            },
            {
                label:'Motivo cancelamento',
                props:{}
            },
        ]

        return tableTitle;
    }
   //name_profissional

    //------------

    const requestAllConsultas = async() =>{
       
        const {url, options} = CONSULTA_ALL_POST({'name_pessoa':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All clients here')
        console.log({'name_pessoa':pessoa})
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
                cadastrarConsulta && <Cadastrar cadastrarConsulta={cadastrarConsulta} setCadastrarConsulta={setCadastrarConsulta} atualizarConsulta={atualizarConsulta} setAtualizarConsulta={setAtualizarConsulta}  idConsulta={consultaChoice} setIdConsulta={setConsultaChoice} callback={requestAllConsultas} />
            }
            
            {
                atualizarConsulta &&
                <Atualizar atualizarConsulta={atualizarConsulta} setAtualizarConsulta={setAtualizarConsulta}  idConsulta={consultaChoice} setIdConsulta={setConsultaChoice} callback={requestAllConsultas} />
            }

            {
                cancelarConsulta &&
                <Cancelar cancelarConsulta={cancelarConsulta} setCancelarConsulta={setCancelarConsulta}  idConsulta={consultaChoice} setIdConsulta={setConsultaChoice} callback={requestAllConsultas} />
            }
           
         </>

    )
}

export default Consulta;