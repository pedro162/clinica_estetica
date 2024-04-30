import React from 'react';
import { LineChart,Text,  Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Label } from 'recharts';

const data = [
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
];

const SimpleLineChart = ({widthChart, heightChart, dataChart,titleChart, dataLinhasChart}) => {
	if(!widthChart){
		widthChart = 600;

	}

	if(! heightChart){
		heightChart = 300;
	}

	if(!dataChart){
		dataChart = data
	}

  if(!dataLinhasChart){
    dataLinhasChart = [
      {
        props:{
          type:'monotone',
          dataKey: 'vendasA',
          stroke: '#8884d8',

        }

      },
      {
        props:{
          type:'monotone',
          dataKey: 'vendasB',
          stroke: '#82ca9d',

        }

      },
    ]
  }
	return(


	  <LineChart width={widthChart} height={heightChart} data={dataChart}>
 	    
	    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
	    {/*<Line type="monotone" dataKey="vendas" stroke="#8884d8" activeDot={{ r: 8 }} />
	    	    <Label value="Gráfico de Linha" offset={0} position="top" />*/}
	     {/*<Line type="monotone" dataKey="vendasA" stroke="#8884d8" />
             <Line type="monotone" dataKey="vendasB" stroke="#82ca9d"/>*/}

      {
        Array.isArray(dataLinhasChart) && dataLinhasChart.length > 0 && (
          dataLinhasChart.map((item, index, arr)=>{

            return(
              <Line {...item?.props}/>
            ) 
          })
        )
      }

	  </LineChart>

  	)
};

export default SimpleLineChart;
