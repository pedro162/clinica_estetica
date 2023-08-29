import React from 'react';
import estilos from './ContasReceber.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONTAS_RECEBER_ALL_POST} from '../../api/endpoints/geral.js'
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
import FormContasReceber from './FormContasReceber/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Include from './include';
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'


const ContasReceber = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setContasReceber] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarContasReceber, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setContasReceberChoice] = React.useState(null);
    const [atualizarContasReceber, setAtualizarContasReceber] = React.useState(false)   
    const [cancelarContasReceber, setCancelarContasReceber] = React.useState(false)   
    const [digitarContasReceber, setDigitarContasReceber] = React.useState(false)    
    const [cadastrarContasReceber, setCadastrarContasReceber] = React.useState(false)  
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
        props:{onClick:()=>requestAllContasRecebers(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setCadastrarContasReceber(true), className:'btn btn-sm mx-2 btn-secondary'}
    }
    ];


    React.useEffect(()=>{

        if(cadastrarContasReceber == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarContasReceber])

    const atualizarContasReceberAction = (idContasReceber)=>{
        setContasReceberChoice(idContasReceber)
        setAcao('editar')
        setAtualizarContasReceber(true);
    }

    const digitarContasReceberAction = (idContasReceber)=>{
        setContasReceberChoice(idContasReceber)
        setAcao('digitar')
        setAtualizarContasReceber(true);
    }

    const cancelarContasReceberAction = (idContasReceber)=>{
        setContasReceberChoice(idContasReceber)
        setAcao('cancelar')
        setCancelarContasReceber(true);
    }
    //cancelarContasReceber, setCancelarContasReceber
    const novaContasReceber = (idContasReceber)=>{
        setContasReceberChoice(idContasReceber)
        setAcao('consultar')
        setAtualizarContasReceber(true);
    }

    const iniciarContasReceber = (idContasReceber)=>{
        setCadastrarContasReceber(idContasReceber)
        setAcao('iniciar')
        setCadastrarContasReceber(true);
    }
    //------------

    const requestAllContasRecebers = async() =>{
       
        const {url, options} = CONTAS_RECEBER_ALL_POST({'name_pessoa':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All contas receber here')
        console.log({'name_pessoa':pessoa})
        console.log(json)
        if(json){
            setContasReceber(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllContasRecebersEffect = async() =>{
       
           await requestAllContasRecebers();

            
        }

        requestAllContasRecebersEffect();

        
    }, [])
    
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
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllContasRecebers}
                    />
                </Col>
            </Row>
            {
                cadastrarContasReceber &&
                <Cadastrar cadastrarContasReceber={cadastrarContasReceber} setCadastrarContasReceber={setCadastrarContasReceber} atualizarContasReceber={atualizarContasReceber} setAtualizarContasReceber={setAtualizarContasReceber}  idContasReceber={consultaChoice} setIdContasReceber={setContasReceberChoice} callback={requestAllContasRecebers} />
            }
           
         </>

    )
}

export default ContasReceber;