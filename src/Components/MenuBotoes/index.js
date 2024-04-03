import React from 'react';
import estilos from './MenuBotoes.module.css'
import useFetch from '../../Hooks/useFetch.js';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, AGENDA_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faTimes, faHandHolding, faUser, faUsers, faFolderOpen, faClone, faFileAlt, faTasks, faUserMd, faList, faCalendarAlt,faCoins, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormControlInput from '../FormControl/index.js'


const MenuBotoes = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [agenda, setAgenda] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarCliente, setShowModalCriarCliente] = React.useState(false)
    const [showModalAtualizarCliente, setShowModalAtualizarCliente] = React.useState(false)
    const [clientChoice, setClienteChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [cadastrarCliente, setCadastrarCliente] = React.useState(false)    
    const [dataGrupo, setDataGrupo] = React.useState(null)
    const [tpView, setTpView] = React.useState('mes')//mes//semana 
    const [mostarFiltros, setMostarFiltros] = React.useState(true) 
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [ordenacao, setOrdenacao] = React.useState('')
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)


    const [filtroAbertas, setFiltroAbertas] = React.useState(false)
    const [filtroConcluidas, setFiltroConcluidas] = React.useState(false)
    const [filtroCanceladas, setFiltroCanceladas] = React.useState(false)

    const {getToken, dataUser, isMobile, historyUser} = React.useContext(UserContex);

    const {type, is_system, tenant_id} = dataUser ? dataUser : {};

    const botoesRotas = [//financeiro/caixa
        
        {
            'label':'Agenda',
            'iconLabel':<FontAwesomeIcon icon={faCalendarAlt} />,
            'url':'/agenda/calendario',
        },
        {
            'label':'Agenda',
            'iconLabel':<FontAwesomeIcon icon={faList} />,
            'url':'/agenda/painel',
        },
        {
            'label':'Clientes',
            'iconLabel':<FontAwesomeIcon icon={faUser} />,
            'url':'/clientes/painel',
        },
        {
            'label':'Caixa',
            'iconLabel':<FontAwesomeIcon icon={faCoins} />,
            'url':'/financeiro/caixa',
        },
        ,{
            'label':'C. receber',
            'iconLabel':<FontAwesomeIcon icon={faHandHolding} />,
            'url':'/financeiro/contas_receber',
        },
        {
            'label':'Consultas',
            'iconLabel':<FontAwesomeIcon icon={faClone} />,
            'url':'/consulta/index',
        },
        {
            'label':'Con. fichas',
            'iconLabel':<FontAwesomeIcon icon={faPuzzlePiece} />,
            'url':'/configuracoes/construtor/ficha',
        },
        {
            'label':'Fichas',
            'iconLabel':<FontAwesomeIcon icon={faFolderOpen} />,
            'url':'/fichas/index',
        },
        {
            'label':'Grupos',
            'iconLabel':<FontAwesomeIcon icon={faUsers} />,
            'url':'/grupos/painel',
        },
        {
            'label':'M. caixa',
            'iconLabel':<FontAwesomeIcon icon={faList} />,
            'url':'/financeiro/movimentacoes/painel',
        },
        {
            'label':'O. serviço',
            'iconLabel':<FontAwesomeIcon icon={faFileAlt} />,
            'url':'/ordem/servico/painel',
        },
        {
            'label':'Profissionais',
            'iconLabel':<FontAwesomeIcon icon={faUserMd} />,
            'url':'/profissionais/painel',
        },
        {
            'label':'Serviços',
            'iconLabel':<FontAwesomeIcon icon={faTasks} />,
            'url':'/servico/painel',
        },

    ]

    return(
        <>
            
            <Row className={estilos.estilo_container_botoes_menu}>
                <Col>
                    <Row style={{marginTop:'20pt'}}>
                    
                    {
                        Array.isArray(botoesRotas) && botoesRotas.length > 0  ? (
                                botoesRotas.map(({label, iconLabel, url}, index, arr)=>{

                                    return(
                                        <Col sm='4' xs='4' md='4' key={'MenuBotoes_'+index}  className={'my-2'} >
                                             <Link className={null}  to={url} style={{width:'100%', height:'100%'}} >
                                                <Button style={{alignItems: 'center', width: '100%', height: '80pt', color: '#FFF', backgroundColor: 'rgba(204, 204, 204, 0.2)', border: 'none', boxShadow:'2px 2px 4px #000', display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }}>
                                                    <span style={{fontSize:'32pt', marginTop: 'auto', color:'#FFF', opacity: '1 !important', fontWeight:'bolder'}} >{iconLabel}</span>
                                                    <span className={estilos.estilo_label_button}>{label}</span>
                                                </Button>

                                            </Link>
                                        </Col>

                                    ) 
                                })

                            ) : (null)
                    }
                    
                    </Row>
                </Col>
            </Row>
         </>

    )
}

export default MenuBotoes;
