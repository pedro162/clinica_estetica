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
import Include from './include';
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'


const OrdemServico = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setOrdemServico] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarOrdemServico, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setOrdemServicoChoice] = React.useState(null);
    const [atualizarOrdemServico, setAtualizarOrdemServico] = React.useState(false)   
    const [cancelarOrdemServico, setCancelarOrdemServico] = React.useState(false)   
    const [digitarOrdemServico, setDigitarOrdemServico] = React.useState(false)    
    const [cadastrarOrdemServico, setCadastrarOrdemServico] = React.useState(false)  
    const [incicarOrdemServico, setIniciarOrdemServico] = React.useState(false) 
    const [mostarFiltros, setMostarFiltros] = React.useState(false) 
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

    const digitarOrdemServicoAction = (idOrdemServico)=>{
        setOrdemServicoChoice(idOrdemServico)
        setAcao('digitar')
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

    /**
     * Deve ter a opção de cadastrar salas de consulta
     * Definir parâmetros do sistema
     * Ter a opção de criar perfies de usuáiros para acessos
     * Ter a opão de cadastrar os caixa e bancos para controle financeiro
     * Ter a opção de gerenciar os planos de contas que serão utilizados no sistema
     * Ter a opção de definir os tipos de agenda[Consulta, Retorno, Encaixe, Pessoal]
     * Ter a opção de criar documentos padrões como [Prontuários, Atestados, Etc]
     * 
     * No controle de estoque, deve ter opção de cadastrar unidades de medida
     * Vincular o produto ao fornecedor, Vincular o produto ao fabricante 
     */
    
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
                {mostarFiltros && 
                    (
                        <Col  xs="12" sm="12" md="3">
                            <Filter
                                filtersArr={filtersArr}
                                actionsArr={acoesBottomCard}
                            />
                        </Col>
                    )
                }
                
                <Col  xs="12" sm="12" md={mostarFiltros ? "9":"12"}>
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllOrdemServicos}
                        setMostarFiltros={setMostarFiltros}
                        idOrdemCriada={consultaChoice}
                    />
                </Col>
            </Row>
            {
                incicarOrdemServico &&
                <Iniciar incicarOrdemServico={incicarOrdemServico} setIniciarOrdemServico={setIniciarOrdemServico} atualizarOrdemServico={atualizarOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico}  idOrdemServico={consultaChoice} setIdOrdemServico={setOrdemServicoChoice} callback={requestAllOrdemServicos} />
            }
           
         </>

    )
}

export default OrdemServico;