import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, WIDGET_FAT_LIQUIDEZ_PROFISSIONAL_ALL_POST} from '../../../api/endpoints/geral.js'
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
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../../functions/index.js'


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


    const [dataFaturamentoProfissional, setFaturamentoProfissional] = React.useState([])
    const [dataLinhasFaturamentoProfissional, setLinhasFaturamentoProfissional] = React.useState([]) 


    const {getToken} = React.useContext(UserContex);


    let dataChart = [
        { name: 'Profissional 01', vendas: 4000 },
        { name: 'Profissional 02', vendas: 3000 },
        { name: 'Profissional 03', vendas: 2000 },
        { name: 'Profissional 04', vendas: 1000 },
        { name: 'Profissional 05', vendas: 500 },
    ]

    let fill = ['#8884d8', '#82ca9d', '#ffc658']


    const parseDataProfissional = (dadosRequest)=>{
      let dataKey={


      }

      let dataReturn =  [
        
      ];


      if(Array.isArray(dadosRequest) && dadosRequest.length > 0){
            dadosRequest.forEach((item, inex, arr)=>{
              
              let {profissional_id, name_profissional, vrFaturamentoLiquidez } = item;
              vrFaturamentoLiquidez = Number(vrFaturamentoLiquidez)
              

              if(!(dataKey.hasOwnProperty(`${profissional_id}`)) ){
                  dataKey[profissional_id] = {};
              }


              let chaveKey = `${profissional_id} - ${name_profissional}`;

              let item_exitente = false;
              if(Array.isArray(dataReturn) && dataReturn.length > 0 ){
                dataReturn.forEach((itemReturn, indexRturn, arrReturn)=>{
                    
                    if(String(itemReturn?.name).trim() == String(chaveKey).trim()){
                        let vrAnteriorProfissional = itemReturn?.Faturamento
                        vrAnteriorProfissional = Number(vrAnteriorProfissional);
                        dataReturn[indexRturn]['Faturamento'] =  vrAnteriorProfissional + vrFaturamentoLiquidez
                        item_exitente = true;
                    }
                })
              }

              if(! item_exitente){
                    dataReturn.push({
                        'Faturamento':vrFaturamentoLiquidez,
                        'name':chaveKey,
                    })
              }

              //dataKey[profissional_id][chaveKey] = chaveKey;
              dataKey[profissional_id][chaveKey] = 'Faturamento';

               
            })
        }

        return {dataReturn, dataKey};
    }


    const montaDataProfissional = (dadosRequest)=>{

      let coresFiliais = {1:'#8884d8',2:'#82ca9d',3:'#82ca9d',4:'#82ca9d',}
      let dataLinhasChart = [
      
      ]

      let {dataReturn, dataKey} = parseDataProfissional(dadosRequest)

      if(dataKey){
        for(let idProfissional in dataKey){

            let corAtual = coresFiliais?.idProfissional

            //let dKey = dataKey[idProfissional];
            let dataKeyAtual = dataKey[idProfissional];

            if(!corAtual){
                corAtual = '#8884d8';
            }

            /*
                dataKey
                fill
             */

            // Estava pensando em algo para cada barra ficar com uma cor diferente
            if(dataKeyAtual && (!dataLinhasChart.length > 0) ){
                for( let prp in dataKeyAtual){
                    let dKey = dataKeyAtual[prp]

                    let dataLinhaAtual = {
                      props:{
                        dataKey: `${dKey}`,
                        fill: `${corAtual}`,

                      }

                    }

                    dataLinhasChart.push(
                      dataLinhaAtual
                    )
                    break;
                }
            }  


        }

      }

      setFaturamentoProfissional(dataReturn)
      setLinhasFaturamentoProfissional(dataLinhasChart)
      console.log('dataLinhasFaturamentoProfissional: ', dataLinhasFaturamentoProfissional)

    }


    const getDataFaturamentoMesAno = async ()=>{
      setFaturamentoProfissional([])
      setLinhasFaturamentoProfissional([])
      let filtros ={};
      const {url, options} = WIDGET_FAT_LIQUIDEZ_PROFISSIONAL_ALL_POST({...filtros}, getToken());


      const {response, json} = await request(url, options);
      console.log('All dados here')
      console.log(json)
      if(json){
          console.log(montaDataProfissional(json?.mensagem))

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
        //setFaturamentoProfissional(dataChart)
        //setLinhasFaturamentoProfissional(dataLinhasChart)
  
      }

      requestAllFaturamentoMesAnoEffect();


    }, [])
    

    return(
        <>
           <Card className={'mb-5'} title={'Faturamento por profissional'} propsHeader={{className: estilos.titulo_card}} noFooter={true} >
                { loading && <Load/>}

                {!loading && nadaEncontrado && <>Ops... <br/>Nada encontrado!</>}

                {!loading && !nadaEncontrado &&  <SimpleBarChart widthChart={500} heightChart={300} dataChart={dataFaturamentoProfissional} dataLinhasChart={dataLinhasFaturamentoProfissional} titleChart={'Faturamento por profissional'} fillChart={fill}  />}
           </Card>
           
         </>

    )
}

export default FaturamentoPorProfissional;