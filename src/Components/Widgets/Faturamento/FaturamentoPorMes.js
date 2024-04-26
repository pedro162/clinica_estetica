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
import SimpleLineChart from '../../../Charts/SimpleLineChart.js'
import Card from '../../Utils/Card/index.js'
import estilos from '../estilos.module.css'


const FaturamentoPorMes = (props)=>{

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
    	{ name: 'Janeiro', vendasA: 400, vendasB: 240 },
  { name: 'Fevereiro', vendasA: 300, vendasB: 139 },
  { name: 'Março', vendasA: 200, vendasB: 980 },
  { name: 'Abril', vendasA: 278, vendasB: 390 },
  { name: 'Maio', vendasA: 189, vendasB: 480 },
  { name: 'Junho', vendasA: 239, vendasB: 630 },
  { name: 'Julho', vendasA: 349, vendasB: 830 },
  { name: 'Agosto', vendasA: 449, vendasB: 430 },
  { name: 'Setembro', vendasA: 289, vendasB: 330 },
  { name: 'Outubro', vendasA: 339, vendasB: 730 },
  { name: 'Novembro', vendasA: 259, vendasB: 230 },
  { name: 'Dezembro', vendasA: 409, vendasB: 530 },
    ]

    return(
        <>
           <Card className={'mb-5'} title={'Faturamento por Mês'} propsHeader={{className: estilos.titulo_card}} noFooter={true} >
           		{<SimpleLineChart widthChart={1720} heightChart={300} dataChart={dataChart} titleChart={'Faturamento por mês'}  />}
           </Card>
           
         </>

    )
}

export default FaturamentoPorMes;