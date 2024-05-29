import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, WIDGET_FAT_LIQUIDEZ_FILIAL_ALL_POST} from '../../../api/endpoints/geral.js'
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
import HorizontalBarChart from '../../../Charts/HorizontalBarChart.js'
import Card from '../../Utils/Card/index.js'
import estilos from '../estilos.module.css'


const FaturamentoPorFilial = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false) 
    const [dataFaturamentoFilial, setFaturamentoFilial] = React.useState([])
    const [dataLinhasFaturamentoFilial, setLinhasFaturamentoFilial] = React.useState([]) 


    const {getToken} = React.useContext(UserContex);

    let dataChart = [
    	{ name: 'Filial 01', vendas: 4000 },
		{ name: 'Filial 02', vendas: 3000 },
		{ name: 'Filial 03', vendas: 2000 },
		{ name: 'Filial 04', vendas: 1000 },
		{ name: 'Filial 05', vendas: 500 },
    ]

    let fill = ['#8884d8', '#82ca9d', '#ffc658']


    const parseDataFilial = (dadosRequest)=>{
      let dataKey={


      }

      let dataReturn =  [
        
      ];


      if(Array.isArray(dadosRequest) && dadosRequest.length > 0){
            dadosRequest.forEach((item, inex, arr)=>{
              
              let {filial_id, vrFaturamentoLiquidez } = item;
              vrFaturamentoLiquidez = Number(vrFaturamentoLiquidez)
              

              if(!(dataKey.hasOwnProperty(`${filial_id}`)) ){
                  dataKey[filial_id] = {};
              }


              let chaveKey = `Filial - ${filial_id}`;

              let item_exitente = false;
              if(Array.isArray(dataReturn) && dataReturn.length > 0 ){
                dataReturn.forEach((itemReturn, indexRturn, arrReturn)=>{
                    
                    if(String(itemReturn?.name).trim() == String(chaveKey).trim()){
                        let vrAnteriorFilial = itemReturn?.Faturamento
                        vrAnteriorFilial = Number(vrAnteriorFilial);
                        dataReturn[indexRturn]['Faturamento'] =  vrAnteriorFilial + vrFaturamentoLiquidez
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

              //dataKey[filial_id][chaveKey] = chaveKey;
              dataKey[filial_id][chaveKey] = 'Faturamento';

               
            })
        }

        return {dataReturn, dataKey};
    }


    const montaDataFilial = (dadosRequest)=>{

      let coresFiliais = {1:'#8884d8',2:'#82ca9d',3:'#82ca9d',4:'#82ca9d',}
      let dataLinhasChart = [
      
      ]

      let {dataReturn, dataKey} = parseDataFilial(dadosRequest)

      if(dataKey){
        for(let idFilial in dataKey){

            let corAtual = coresFiliais?.idFilial

            //let dKey = dataKey[idFilial];
            let dataKeyAtual = dataKey[idFilial];

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

      setFaturamentoFilial(dataReturn)
      setLinhasFaturamentoFilial(dataLinhasChart)

    }


    const getDataFaturamentoMesAno = async ()=>{
      setFaturamentoFilial([])
      setLinhasFaturamentoFilial([])

      let filtros ={};
      const {url, options} = WIDGET_FAT_LIQUIDEZ_FILIAL_ALL_POST({...filtros}, getToken());
      const {response, json} = await request(url, options);

      if(json){
          console.log(montaDataFilial(json?.mensagem))
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
        //setFaturamentoFilial(dataChart)
        //setLinhasFaturamentoFilial(dataLinhasChart)
  
      }

      requestAllFaturamentoMesAnoEffect();


    }, [])


    return(
        <>
           <Card className={'mb-5'} title={'Faturamento por Mês'} propsHeader={{className: estilos.titulo_card}} noFooter={true} >
                { loading && <Load/>}

                {!loading && nadaEncontrado && <>Ops... <br/>Nada encontrado!</>}

           		{!loading && !nadaEncontrado &&  <HorizontalBarChart widthChart={500} heightChart={300} dataChart={dataFaturamentoFilial} dataLinhasChart={dataLinhasFaturamentoFilial} titleChart={'Faturamento por mês'} fillChart={fill}  />}
           </Card>
           
         </>

    )
}

export default FaturamentoPorFilial;