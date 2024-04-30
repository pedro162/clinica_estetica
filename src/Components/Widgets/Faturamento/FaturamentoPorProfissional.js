import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, PAIS_ALL_POST} from '../../../api/endpoints/geral.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../../Relatorio/Table/index.js'
import Filter from '../../Relatorio/Filter/index.js'
import Breadcrumbs from '../../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {UserContex} from '../../../Context/UserContex.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import SimpleBarChart from '../../../Charts/SimpleBarChart.js'
import Card from '../../Utils/Card/index.js'
import estilos from '../estilos.module.css'


const FaturamentoPorProfissional = (props)=>{

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


    let dataChart = [
    	{ name: 'Profissional 01', vendas: 4000 },
		{ name: 'Profissional 02', vendas: 3000 },
		{ name: 'Profissional 03', vendas: 2000 },
		{ name: 'Profissional 04', vendas: 1000 },
		{ name: 'Profissional 05', vendas: 500 },
    ]

    let fill = ['#8884d8', '#82ca9d', '#ffc658']

    return(
        <>
           <Card className={'mb-5'} title={'Faturamento por profissional'} propsHeader={{className: estilos.titulo_card}} noFooter={true} >
           		{<SimpleBarChart widthChart={500} heightChart={300} dataChart={dataChart} titleChart={'Faturamento por mês'} fillChart={fill}  />}
           </Card>
           
         </>

    )
}

export default FaturamentoPorProfissional;