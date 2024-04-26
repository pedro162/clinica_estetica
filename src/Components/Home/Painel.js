import React from 'react';
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONTAS_RECEBER_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormControlInput from '../FormControl/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'

import {MenuBotoes, Widgets} from '../../View/index.js'


const Painel = ({defaultFilters ,...props})=>{

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
    const [mostarFiltros, setMostarFiltros] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [filtroAbertas, setFiltroAbertas] = React.useState(false)
    const [filtroPagas, setFiltroPagas] = React.useState(false)
    const [filtroVencidas, setFiltroVencidas] = React.useState(false)
    const [filtroAvencer, setFiltroAvencer] = React.useState(false)
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    /**
     * 
     * let idRef   = defaultFilters?.referencia_id;
        let ref     = defaultFilters?.referencia;
        let name_pessoa     = defaultFilters?.name_pessoa;
     */

    const {getToken, dataUser, isMobile} = React.useContext(UserContex);

    
    return(
        <>
            
            <Row>
               

                <Col  xs="12" sm="12" md={"12"} >
                    {
                    	isMobile
                    	? 
                    	(
                    		<MenuBotoes/>
                    	)
                    	:
                    	(
                    		<Widgets/>
                    	)

                    }
                </Col>
            </Row>
           
         </>

    )
}

export default Painel;