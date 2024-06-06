import React from 'react';
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, PAIS_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ReceberAbertosPagos from './ContasReceber/ReceberAbertosPagos.js';
import FaturamentoPorMes from './Faturamento/FaturamentoPorMes.js';
import FaturamentoPorFilial from './Faturamento/FaturamentoPorFilial.js';
import FaturamentoPorProfissional from './Faturamento/FaturamentoPorProfissional.js';
import ConsultaTipos from './Consulta/ConsultaTipos.js';

const Widgets = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [estado, setPais] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarPais, setShowModalCriarPais] = React.useState(false)
    const [mostarFiltros, setMostarFiltros] = React.useState(true) 
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [ordenacao, setOrdenacao] = React.useState('')
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [consultaChoice, setPaisChoice] = React.useState(null);
    const [cadastrarPais, setCadastrarPais] = React.useState(false) 
    const [atualizarPais, setAtualizarPais] = React.useState(false) 
    const [nomePais, setNomePais] = React.useState(null) 
    const [codidoSistemaPais, setCodigoSistemaPais] = React.useState(null) 


    const {getToken} = React.useContext(UserContex);


    return(
        <>
            <Breadcrumbs
                items={[
                        {
                            props:{},
                            label:<> <Link className={null}  to={'/home/painel'}>Início</Link></>
                        },
                        {
                            props:{},
                            label:'Widgets'
                        }
                    ]}

                buttonFiltroMobile={false}
                setMostarFiltros={()=>null}
                mostarFiltros={false}
            />
            <Row style={{backgroundColor:'#FFF', padding:'50px', paddingTop:'20px'}} >
               
                
                <Col  xs="12" sm="12" md={"12"}>
                	<Row>
                		<Col  xs="12" sm="12" md={"12"}>

                			<FaturamentoPorMes/>
                		</Col>
                	</Row>
                    
                </Col>

                <Col  xs="12" sm="12" md={"4"} style={{marginTop:'20px'}} >
                	<Row>
                		<Col  xs="12" sm="12" md={"12"}>

                			<FaturamentoPorFilial/>
                		</Col>
                	</Row>
                    
                </Col>

                <Col  xs="12" sm="12" md={"4"} style={{marginTop:'20px'}} >
                	<Row>
                		<Col  xs="12" sm="12" md={"12"} style={{width:'100%',margin:'auto'}}>
                			<FaturamentoPorProfissional/>
                		</Col>
                	</Row>
                    
                </Col>

                <Col  xs="12" sm="12" md={"4"} style={{marginTop:'20px'}} >
                	<Row>
                		<Col  xs="12" sm="12" md={"12"} style={{width:'100%',margin:'auto'}}>

                			<ConsultaTipos/>
                		</Col>
                	</Row>
                    
                </Col>
            </Row>
         </>

    )
}

export default Widgets;