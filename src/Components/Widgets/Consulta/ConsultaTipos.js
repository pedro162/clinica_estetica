import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, WIDGET_ATENDIMENTOS_TIPOS_ALL_POST} from '../../../api/endpoints/geral.js'
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



const ConsultaTipos = (props)=>{

    const {data, error, request, loading} = useFetch();
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false) 
    const [dataConsultaTipo, setConsultaTipo] = React.useState([])
    const [dataLinhasConsultaTipo, setLinhasConsultaTipo] = React.useState([]) 

    const {getToken} = React.useContext(UserContex);


    let dataChart = {
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

    let fill = ['#8884d8', '#82ca9d', '#ffc658']

    /*{ name: 'Grupo A', value: 400 },
  { name: 'Grupo B', value: 300 },
  { name: 'Grupo C', value: 200 },
  { name: 'Grupo D', value: 500 },
   */

  function generateColor() {

    const letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
    
  }

    const parseDataFilial = (dadosRequest)=>{
      let dataKey={


      }

      let dataReturn =  [
        
      ];


      if(Array.isArray(dadosRequest) && dadosRequest.length > 0){
            dadosRequest.forEach((item, inex, arr)=>{
              
              let {tpAtendimento, qtdAtendimentos } = item;
              qtdAtendimentos = Number(qtdAtendimentos)
              

              if(!(dataKey.hasOwnProperty(`${tpAtendimento}`)) ){
                  dataKey[tpAtendimento] = {};
              }


              let chaveKey = `${tpAtendimento}`;

              let item_exitente = false;
              if(Array.isArray(dataReturn) && dataReturn.length > 0 ){
                dataReturn.forEach((itemReturn, indexRturn, arrReturn)=>{
                    
                    if(String(itemReturn?.name).trim() == String(chaveKey).trim()){
                        let vrAnteriorFilial = itemReturn?.Faturamento
                        vrAnteriorFilial = Number(vrAnteriorFilial);
                        dataReturn[indexRturn]['value'] =  vrAnteriorFilial + qtdAtendimentos
                        item_exitente = true;
                    }
                })
              }

              if(! item_exitente){
                    dataReturn.push({
                        'value':qtdAtendimentos,
                        'name':chaveKey,
                    })
              }

              //dataKey[tpAtendimento][chaveKey] = chaveKey;
              dataKey[tpAtendimento][chaveKey] = 'value';

               
            })
        }

        return {dataReturn, dataKey};
    }


    const montaDataFilial = (dadosRequest)=>{

      let coresFiliais = {1:'#8884d8',2:'#82ca9d',3:'#82ca9d',4:'#82ca9d',}
      let dataLinhasChart = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042']

      let {dataReturn, dataKey} = parseDataFilial(dadosRequest)

      console.log('All dados here==============================')
      console.log(dataReturn)
      console.log('All dados here==============================')
      setConsultaTipo(dataReturn)
      setLinhasConsultaTipo(dataLinhasChart)

    }


    const getDataFaturamentoMesAno = async ()=>{
      setConsultaTipo([])
      setLinhasConsultaTipo([])
      
      let filtros ={};
      const {url, options} = WIDGET_ATENDIMENTOS_TIPOS_ALL_POST({...filtros}, getToken());
      const {response, json} = await request(url, options);
      if(json){
          montaDataFilial(json?.mensagem)
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
  
      }

      requestAllFaturamentoMesAnoEffect();


    }, [])


    return(
        <>
            <Card className={'mb-5'} title={'Tipos de atendimentos'} propsHeader={{className: estilos.titulo_card}} noFooter={true} >
                <Row>
                    <Col style={{display:'flex', flexDirection:'column', alignItems:'center'}} >
                        {<PieChart widthChart={300} heightChart={300} titleChart={'Tipos de atendimentos'} dataChart={dataConsultaTipo} dataKey={'value'} dataChartColors={dataLinhasConsultaTipo} />}
                    </Col>
                </Row>
                
            </Card>
         </>

    )
}

export default ConsultaTipos;