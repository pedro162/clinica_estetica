import React from 'react';
import estilos from './Servico.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_ALL_POST} from '../../api/endpoints/geral.js'
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
import FormServico from './FormServico/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'


const Servico = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setServico] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarServico, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setServicoChoice] = React.useState(null);
    const [atualizarServico, setAtualizarServico] = React.useState(false)   
    const [cancelarServico, setCancelarServico] = React.useState(false)    
    const [cadastrarServico, setCadastrarServico] = React.useState(false) 
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
        props:{onClick:()=>requestAllServicos(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setCadastrarServico(true), className:'btn btn-sm mx-2 btn-secondary'}
    }
    ];


    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarServico(true);
                }else{
                    setAtualizarServico(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarServico(true);
                }else{
                    setCancelarServico(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarServico == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarServico])

    const atualizarServicoAction = (idServico)=>{
        setServicoChoice(idServico)
        setAcao('editar')
        setAtualizarServico(true);
    }
    const cancelarServicoAction = (idServico)=>{
        setServicoChoice(idServico)
        setAcao('cancelar')
        setCancelarServico(true);
    }
    //cancelarServico, setCancelarServico
    const novaServico = (idServico)=>{
        setServicoChoice(idServico)
        setAcao('consultar')
        setAtualizarServico(true);
    }

    const gerarTableServico = ()=>{
       
        let data = [];
        let dataServico = estado.mensagem
        if(dataServico && Array.isArray(dataServico) && dataServico.length > 0){
            for(let i=0; !(i == dataServico.length); i++){
                let atual = dataServico[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar           = true;

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarServicoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
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

                                    label:atual.name,
                                    propsRow:{}
                                },
                                {

                                    label:atual.vrServico,
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
                label:'Descrição',
                props:{}
            },
            {
                label:'Valor',
                props:{}
            }
        ]

        return tableTitle;
    }
   //name_profissional

    //------------

    const requestAllServicos = async() =>{
       
        const {url, options} = SERVICO_ALL_POST({'name_servico':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All serviços here')
        console.log({'name_servico':pessoa})
        console.log(json)
        if(json){
            setServico(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllServicosEffect = async() =>{
       
           await requestAllServicos();

            
        }

        requestAllServicosEffect();

        
    }, [])

    const rowsTableArr = gerarTableServico();    
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
                            label:'Servico'
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
                cadastrarServico && <Cadastrar cadastrarServico={cadastrarServico} setCadastrarServico={setCadastrarServico} atualizarServico={atualizarServico} setAtualizarServico={setAtualizarServico}  idServico={consultaChoice} setIdServico={setServicoChoice} callback={requestAllServicos} />
            }
            
            {
                atualizarServico &&
                <Atualizar atualizarServico={atualizarServico} setAtualizarServico={setAtualizarServico}  idServico={consultaChoice} setIdServico={setServicoChoice} callback={requestAllServicos} />
            }
           
         </>

    )
}

export default Servico;