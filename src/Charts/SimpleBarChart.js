import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Grupo A', vendas: 400 },
  { name: 'Grupo B', vendas: 300 },
  { name: 'Grupo C', vendas: 200 },
  { name: 'Grupo D', vendas: 500 },
];

const SimpleBarChart = ({widthChart, heightChart,  dataChart,titleChart, dataLinhasChart, fillChart}) => {
	if(!widthChart){
		widthChart = 600;

	}

	if(! heightChart){
		heightChart = 300;
	}

	if(!dataChart){
		dataChart = data
	}
	if(!fillChart){
		//fillChart = ['#8884d8']
	}


  	if(!dataLinhasChart){
	    dataLinhasChart = [
	      
	      {
	        props:{
	          dataKey: 'vendas',
	          fill: '#8884d8',

	        }

	      },
	    ]
	}

	console.log('dataLinhasChart:  ', dataLinhasChart)

	return(
	  <BarChart width={widthChart} height={heightChart} data={dataChart} >
	    <CartesianGrid strokeDasharray="3 3" />
	    <XAxis dataKey="name" />
	    <YAxis />
	    <Tooltip />
	    <Legend />
	    {/*<Bar dataKey="vendas" fill="#8884d8" />*/}

	    {
	        Array.isArray(dataLinhasChart) && dataLinhasChart.length > 0 && (
	          dataLinhasChart.map((item, index, arr)=>{

	            return(
	              <Bar {...item?.props}/>
	            ) 
	          })
	       	)
	    }
	  </BarChart>
  )
}

export default SimpleBarChart;
