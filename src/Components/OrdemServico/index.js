import React from 'react';
import estilos from './OrdemServico.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ALL_POST} from '../../api/endpoints/geral.js'
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
import FormOrdemServico from './FormOrdemServico/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Iniciar from './Iniciar/index.js'


const OrdemServico = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setOrdemServico] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarOrdemServico, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setOrdemServicoChoice] = React.useState(null);
    const [atualizarOrdemServico, setAtualizarOrdemServico] = React.useState(false)   
    const [cancelarOrdemServico, setCancelarOrdemServico] = React.useState(false)    
    const [cadastrarOrdemServico, setCadastrarOrdemServico] = React.useState(false)  
    const [incicarOrdemServico, setIniciarOrdemServico] = React.useState(false) 
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
        props:{onClick:()=>requestAllOrdemServicos(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setIniciarOrdemServico(true), className:'btn btn-sm mx-2 btn-secondary'}
    }
    ];


    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarOrdemServico(true);
                }else{
                    setAtualizarOrdemServico(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarOrdemServico(true);
                }else{
                    setCancelarOrdemServico(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarOrdemServico == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarOrdemServico])

    const atualizarOrdemServicoAction = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('editar')
        setAtualizarOrdemServico(true);
    }
    const cancelarOrdemServicoAction = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('cancelar')
        setCancelarOrdemServico(true);
    }
    //cancelarOrdemServico, setCancelarOrdemServico
    const novaOrdemServico = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('consultar')
        setAtualizarOrdemServico(true);
    }

    const iniciarOrdemServico = (idOrdemServico)=>{
        setIniciarOrdemServico(idOrdemServico)
        setAcao('iniciar')
        setIniciarOrdemServico(true);
    }

    const gerarTableOrdemServico = ()=>{
       
        let data = [];
        let dataOrdemServico = estado.mensagem
        if(dataOrdemServico && Array.isArray(dataOrdemServico) && dataOrdemServico.length > 0){
            for(let i=0; !(i == dataOrdemServico.length); i++){
                let atual = dataOrdemServico[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar           = true;

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarOrdemServicoAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
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

                                    label:atual.name_filial,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name,
                                    propsRow:{}
                                },
                                {

                                    label:atual.status,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name_profissional,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name_rca,
                                    propsRow:{}
                                },
                                {

                                    label:atual.observacao,
                                    propsRow:{}
                                },
                                {

                                    label:atual.created_at,
                                    propsRow:{}
                                },
                                {

                                    label:atual.vr_final,
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
                label:'Filial',
                props:{}
            },
            {
                label:'Cliente',
                props:{}
            },
            {
                label:'Status',
                props:{}
            },
            {
                label:'Profissional',
                props:{}
            },
            {
                label:'Vendedor',
                props:{}
            },
            {
                label:'Observação',
                props:{}
            },
            {
                label:'Iniciado em',
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

    const requestAllOrdemServicos = async() =>{
       
        const {url, options} = ORDEM_SERVICO_ALL_POST({'name_servico':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All serviços here')
        console.log({'name_servico':pessoa})
        console.log(json)
        if(json){
            setOrdemServico(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllOrdemServicosEffect = async() =>{
       
           await requestAllOrdemServicos();

            
        }

        requestAllOrdemServicosEffect();

        
    }, [])
    

    const rowsTableArr = gerarTableOrdemServico();    
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
                            label:'Ordem de servico'
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
                cadastrarOrdemServico && <Cadastrar cadastrarOrdemServico={cadastrarOrdemServico} setCadastrarOrdemServico={setCadastrarOrdemServico} atualizarOrdemServico={atualizarOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico}  idOrdemServico={consultaChoice} setIdOrdemServico={setOrdemServicoChoice} callback={requestAllOrdemServicos} />
            }
            
            {
                atualizarOrdemServico &&
                <Atualizar atualizarOrdemServico={atualizarOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico}  idOrdemServico={consultaChoice} setIdOrdemServico={setOrdemServicoChoice} callback={requestAllOrdemServicos} />
            }

            {
                incicarOrdemServico &&
                <Iniciar incicarOrdemServico={incicarOrdemServico} setIniciarOrdemServico={setIniciarOrdemServico} atualizarOrdemServico={atualizarOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico}  idOrdemServico={consultaChoice} setIdOrdemServico={setOrdemServicoChoice} callback={requestAllOrdemServicos} />
            }
           
         </>

    )
}

export default OrdemServico;