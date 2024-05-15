import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,LabelList } from 'recharts';

const data = [
  { name: 'Grupo A', vendas: 400 },
  { name: 'Grupo B', vendas: 300 },
  { name: 'Grupo C', vendas: 200 },
  { name: 'Grupo D', vendas: 500 },
];

const SimpleBarChartCurrency = ({widthChart, heightChart,  dataChart,titleChart, dataLinhasChart, fillChart}) => {
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


	const currencyFormatter = (value) => `$ ${value.toLocaleString()}`;

	const CustomYAxisTick = (props) => {
	  const { x, y, payload } = props;
	  return (
	    <g transform={`translate(${x},${y})`}>
	      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-45)">
	        {currencyFormatter(payload.value)}
	      </text>
	    </g>
	  );
	};

	const CustomTooltip = ({ active, payload, label }) => {
	  if (active && payload && payload.length) {
	    return (
	      <div className="custom-tooltip">
	        <p className="label">{`${label} : ${currencyFormatter(payload[0].value)}`}</p>
	      </div>
	    );
	  }

	  return null;
	};


	return(
	  <BarChart width={widthChart} height={heightChart} data={dataChart} >
	    <CartesianGrid strokeDasharray="3 3" />
	    <XAxis dataKey="name" />	    
	    <YAxis tick={<CustomYAxisTick />} />
	    <Tooltip content={<CustomTooltip />} />
	    <Legend />
	    {/*<Bar dataKey="vendas" fill="#8884d8" />*/}

	    {
	        Array.isArray(dataLinhasChart) && dataLinhasChart.length > 0 && (
	          dataLinhasChart.map((item, index, arr)=>{

	            return(
	              <Bar {...item?.props}></Bar>
	            ) 
	          })
	       	)
	    }
	  </BarChart>
  )
}

export default SimpleBarChartCurrency;
