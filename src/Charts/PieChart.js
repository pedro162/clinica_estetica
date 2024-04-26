import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const data = [
  { name: 'Grupo A', value: 400 },
  { name: 'Grupo B', value: 300 },
  { name: 'Grupo C', value: 200 },
  { name: 'Grupo D', value: 500 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SimplePieChart = ({widthChart, heightChart, dataChart,titleChart}) => {
	if(!widthChart){
		widthChart = 400;

	}

	if(! heightChart){
		heightChart = 400;
	}

	if(!dataChart){
		dataChart = data
	}
	return(
	  <PieChart width={widthChart} height={heightChart}>
	    <Pie
	      data={dataChart}
	      cx={widthChart / 2}
	      cy={heightChart / 2}
	      innerRadius={60}
	      outerRadius={80}
	      fill="#8884d8"
	      paddingAngle={5}
	      dataKey="value"
	    >
	      {
	        data.map((entry, index) => (
	          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
	        ))
	      }
	    </Pie>
	    <Tooltip />
	    <Legend />
	  </PieChart>
  )
}

export default SimplePieChart;
