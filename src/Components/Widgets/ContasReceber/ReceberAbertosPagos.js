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
import PieChart from '../../../Charts/PieChart.js'
import Card from '../../Utils/Card/index.js'
import estilos from '../estilos.module.css'



const ReceberAbertosPagos = (props)=>{

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

    // utils/Data.js
    const Data = [
      {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823
      },
      {
        id: 2,
        year: 2017,
        userGain: 45677,
        userLost: 345
      },
      {
        id: 3,
        year: 2018,
        userGain: 78888,
        userLost: 555
      },
      {
        id: 4,
        year: 2019,
        userGain: 90000,
        userLost: 4555
      },
      {
        id: 5,
        year: 2020,
        userGain: 4300,
        userLost: 234
      }
    ];


    const dataChart = {
        labels: ['Red', 'Orange', 'Blue'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
              label: 'Popularity of colours',
              data: [55, 23, 96],
              // you can set indiviual colors for each bar
              backgroundColor: [
                'rgba(255, 255, 255, 0.6)',
                'rgba(255, 255, 255, 0.6)',
                'rgba(255, 255, 255, 0.6)',
              ],
              borderWidth: 1,
            }
        ]
    }


    const [chartData, setChartData] = React.useState({
        labels: Data.map((data) => data.year), 
        datasets: [
            {
                label: "Users Gained ",
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "&quot;#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    });



    return(
        <>
            <Card className={'mb-5'} title={'Faturamento por Mês'} propsHeader={{className: estilos.titulo_card}} noFooter={true} >
                <Row>
                    <Col style={{display:'flex', flexDirection:'column', alignItems:'center'}} >
                        {<PieChart widthChart={300} heightChart={300} titleChart={'Faturamento por mês'} chartData={chartData} />}
                    </Col>
                </Row>
                
            </Card>
         </>

    )
}

export default ReceberAbertosPagos;