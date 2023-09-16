import React from 'react';
import estilos from './ClientesFichas.module.css'
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
import FormClientesFichas from './FormClientesFichas/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Include from './include';
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'


const ClientesFichas = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setClientesFichas] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarClientesFichas, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setClientesFichasChoice] = React.useState(null);
    const [atualizarClientesFichas, setAtualizarClientesFichas] = React.useState(false)   
    const [cancelarClientesFichas, setCancelarClientesFichas] = React.useState(false)   
    const [digitarClientesFichas, setDigitarClientesFichas] = React.useState(false)    
    const [cadastrarClientesFichas, setCadastrarClientesFichas] = React.useState(false)  
    const [mostarFiltros, setMostarFiltros] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [ordenacao, setOrdenacao] = React.useState('')


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const setNamePessoa = ({target})=>{
        
        setPessoa(target.value)
    }

    const setOrdenacaoFiltro = ({target})=>{
        
        setOrdenacao(target.value)
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
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
            {'label':'Pessoa A-Z', 'value':'id-asc'},{'label':'Pessoa Z-A', 'value':'id-desc'},], 
            hasLabel: true,
            contentLabel:'Classificar',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'select', size:"sm",'ordem':ordenacao, value:ordenacao, onChange:setOrdenacaoFiltro,    onBlur:setOrdenacaoFiltro},

        },
    ]

    const acoesBottomCard=[{
        label:'Pesquisar',
        icon:<FontAwesomeIcon icon={faSearch} />,
        props:{onClick:()=>requestAllClientesFichass(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setCadastrarClientesFichas(true), className:'btn btn-sm mx-2 btn-secondary'}
    }
    ];


    React.useEffect(()=>{

        if(cadastrarClientesFichas == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarClientesFichas])

    const atualizarClientesFichasAction = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('editar')
        setAtualizarClientesFichas(true);
    }

    const digitarClientesFichasAction = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('digitar')
        setAtualizarClientesFichas(true);
    }

    const cancelarClientesFichasAction = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('cancelar')
        setCancelarClientesFichas(true);
    }
    //cancelarClientesFichas, setCancelarClientesFichas
    const novaClientesFichas = (idClientesFichas)=>{
        setClientesFichasChoice(idClientesFichas)
        setAcao('consultar')
        setAtualizarClientesFichas(true);
    }

    const CadastrarClientesFichas = (idClientesFichas)=>{
        setCadastrarClientesFichas(idClientesFichas)
        setAcao('Cadastrar')
        setCadastrarClientesFichas(true);
    }
    //------------
    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}
        
        if(pessoa){
            filtros['name_pessoa'] = pessoa;
            detalhesFiltros['name_pessoa'] = {
                label:'Pessoa',
                value:pessoa,
                resetFilter:()=>setPessoa(''),
            };
        }

        if(ordenacao){
            filtros['ordem'] = ordenacao;
            detalhesFiltros['ordem'] = {
                label:'Ordenação',
                value:ordenacao,
                resetFilter:()=>setOrdenacao(''),
            };
        }
        

        return {filtros, detalhesFiltros};
    }

    const requestAllClientesFichass = async() =>{
        let {filtros, detalhesFiltros} = montarFiltro();
        const {url, options} = ORDEM_SERVICO_ALL_POST({...filtros}, getToken());


        const {response, json} = await request(url, options);
        console.log('All serviços here')
        console.log({'name_servico':pessoa})
        console.log(json)
        if(json){
            setClientesFichas(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllClientesFichassEffect = async() =>{
       
           await requestAllClientesFichass();

            
        }

        requestAllClientesFichassEffect();

        
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
                        callBack={requestAllClientesFichass}
                        setMostarFiltros={setMostarFiltros}
                        idOrdemCriada={consultaChoice}
                    />
                </Col>
            </Row>
            {
                cadastrarClientesFichas &&
                <Cadastrar cadastrarClientesFichas={cadastrarClientesFichas} setCadastrarClientesFichas={setCadastrarClientesFichas} atualizarClientesFichas={atualizarClientesFichas} setAtualizarClientesFichas={setAtualizarClientesFichas}  idClientesFichas={consultaChoice} setIdClientesFichas={setClientesFichasChoice} callback={requestAllClientesFichass} />
            }
           
         </>

    )
}

export default ClientesFichas;