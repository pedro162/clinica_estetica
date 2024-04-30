import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, WIDGET_FAT_LIQUIDEZ_MA_ALL_POST} from '../../../api/endpoints/geral.js'
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
    const [dataFaturamentoMesAno, setFaturamentoMesAno] = React.useState([])
    const [dataLinhasFaturamentoMesAno, setLinhasFaturamentoMesAno] = React.useState([])


    const {getToken} = React.useContext(UserContex);


    let dataChart = [
    	{ name: 'Janeiro', '2023': 400, '2024': 240 },
      { name: 'Fevereiro', '2023': 300, '2024': 139 },
      { name: 'Março', '2023': 200, '2024': 980 },
      { name: 'Abril', '2023': 278, '2024': 390 },
      { name: 'Maio', '2023': 189, '2024': 480 },
      { name: 'Junho', '2023': 239, '2024': 630 },
      { name: 'Julho', '2023': 349, '2024': 830 },
      { name: 'Agosto', '2023': 449, '2024': 430 },
      { name: 'Setembro', '2023': 289, '2024': 330 },
      { name: 'Outubro', '2023': 339, '2024': 730 },
      { name: 'Novembro', '2023': 259, '2024': 230 },
      { name: 'Dezembro', '2023': 409, '2024': 530 },
    ]

    const dataLinhasChart = [
      {
        props:{
          type:'monotone',
          dataKey: '2023',
          stroke: '#8884d8',

        }

      },
      {
        props:{
          type:'monotone',
          dataKey: '2024',
          stroke: '#82ca9d',

        }

      },
    ]

    const parseDataMesAno = (dadosRequest)=>{
      let dataKey={


      }

      let dataReturn =  [
        { name: 'Janeiro',},
        { name: 'Fevereiro',},
        { name: 'Março',},
        { name: 'Abril',},
        { name: 'Maio',},
        { name: 'Junho',},
        { name: 'Julho',},
        { name: 'Agosto',},
        { name: 'Setembro',},
        { name: 'Outubro',},
        { name: 'Novembro',},
        { name: 'Dezembro',},
      ];

      let meses = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ]

      if(Array.isArray(dadosRequest) && dadosRequest.length > 0){
          dadosRequest.forEach((item, inex, arr)=>{
              
              let {filial_id, vrFaturamentoLiquidez, anoFaturamentoLiquidez,mesFaturamentoLiquidez } = item;
              let indexDataAtual = mesFaturamentoLiquidez - 1;
              

              if(!(dataKey.hasOwnProperty(`${filial_id}`)) ){
                  dataKey[filial_id] = {};
              }


              let chaveKey = `Filial - ${filial_id}`;

              

              if(Array.isArray(dataReturn) && dataReturn.indexOf(indexDataAtual) ){
                  let vrAnterior = 0;

                  for(let i = 0; i < 12; i++){
                    if(! (dataReturn[i].hasOwnProperty(`${chaveKey}`)) ) {

                      dataReturn[i][`${chaveKey}`] = 0;
                    }
                    
                  }

                  if( dataReturn[indexDataAtual].hasOwnProperty(`${chaveKey}`) ){
                      vrAnterior = dataReturn[indexDataAtual].hasOwnProperty(`${chaveKey}`);
                  }
                  vrAnterior = Number(vrAnterior)

                  dataReturn[indexDataAtual][`${chaveKey}`] = vrAnterior + Number(vrFaturamentoLiquidez);
              }

              dataKey[filial_id][chaveKey] = chaveKey;
               
          })
      }

      return {dataReturn, dataKey};
    }

    const montaDataMesAno = (dadosRequest)=>{

      let coresFiliais = {1:'#8884d8',2:'#82ca9d',3:'#82ca9d',4:'#82ca9d',}
      let dataLinhasChart = [
      
      ]

      let {dataReturn, dataKey} = parseDataMesAno(dadosRequest)

      if(dataKey){
        for(let idFilial in dataKey){

          let corAtual = coresFiliais?.idFilial

          //let dKey = dataKey[idFilial];
          let dataKeyAtual = dataKey[idFilial];

          if(!corAtual){
            corAtual = '#8884d8';
          }


          if(dataKeyAtual){
             for( let prp in dataKeyAtual){
                let dKey = dataKeyAtual[prp]

                let dataLinhaAtual = {
                  props:{
                    type:'monotone',
                    dataKey: `${dKey}`,
                    stroke: `${corAtual}`,

                  }

                }

                dataLinhasChart.push(
                  dataLinhaAtual
                )
             }
          }  


        }

      }

      setFaturamentoMesAno(dataReturn)
      setLinhasFaturamentoMesAno(dataLinhasChart)

    }

    const getDataFaturamentoMesAno = async ()=>{
      setFaturamentoMesAno([])
      setLinhasFaturamentoMesAno([])
      let filtros ={};
      const {url, options} = WIDGET_FAT_LIQUIDEZ_MA_ALL_POST({...filtros}, getToken());


      const {response, json} = await request(url, options);
      console.log('All dados here')
      console.log(json)
      if(json){
          //setFaturamentoMesAno(json?.mensagem)
          console.log('=========================== Starte dados para grafico ===================')
          console.log(montaDataMesAno(json?.mensagem))
          console.log('=========================== Starte dados para grafico ===================')

          if( json?.mensagem && json?.mensagem.length > 0){
              setNadaEncontrado(false)
          }else{
              setNadaEncontrado(true)
          }

      }else{
          setNadaEncontrado(true)
      }

    }

    React.useEffect(()=>{
      const requestAllFaturamentoMesAnoEffect = async() =>{
       
        await getDataFaturamentoMesAno();
        //setFaturamentoMesAno(dataChart)
        //setLinhasFaturamentoMesAno(dataLinhasChart)
  
      }

      requestAllFaturamentoMesAnoEffect();


    }, [])

    return(
        <>
           <Card className={'mb-5'} title={'Faturamento por Mês'} propsHeader={{className: estilos.titulo_card}} noFooter={true} >
              { loading && <Load/>}

           		{!loading && nadaEncontrado && <>Ops... <br/>Nada encontrado!</>}
              {!loading && !nadaEncontrado && <SimpleLineChart widthChart={1720} heightChart={300} dataChart={dataFaturamentoMesAno} titleChart={'Faturamento por mês'} dataLinhasChart={dataLinhasFaturamentoMesAno}  />}
           </Card>
           
         </>

    )
}

export default FaturamentoPorMes;