import React from 'react';
import {Table as TableBootstrap } from 'react-bootstrap';
import Card from '../../Utils/Card/index.js'
import Checkbox from '../../FormControl/Checkbox.js'

const Table = ({children, titulosTableArr, rowsTableArr,... props})=>{
	const titulosTable = titulosTableArr ? titulosTableArr : []
	const bodyTable =  rowsTableArr ? rowsTableArr : []
	const [selecionados, setSelecionados] = React.useState([1,2,3])
	const [selecionaTodos, setSelecionaTodos] = React.useState(false)

	const handleChange = (target)=>{
		let id = target.value;
		id = Number(id)
		if(target.checked){
			setSelecionados([...selecionados, id])
		}else{
			setSelecionados(
				selecionados.filter((item)=>{
					return item != id
				})
			)
		}

		
		
	}

	console.log(selecionados)

	const selecionarTodos = (target)=>{
		let itens = [];
		if(target){
			if(target.checked){


				if(bodyTable && Array.isArray(bodyTable) && bodyTable.length > 0){
					bodyTable.map((item, index, arr)=>{
			  			
			  			let propsRowBodyTable 	= item.hasOwnProperty('propsRow') ? item.propsRow: {};
		  				let id = propsRowBodyTable.hasOwnProperty('id') ? propsRowBodyTable.id: 0;
		  				id = Number(id);

			  			id = Number(id);

			  			if(id > 0){
			  				itens.push(id)
			  			}
			  			
					})
				}
				setSelecionados([...itens])
				setSelecionaTodos(true)
			}else{
				setSelecionados([])
				setSelecionaTodos(false)
			}
			

		}else{
			setSelecionaTodos(false)
		}
		
		
	}

	React.useEffect(()=>{
		console.log(selecionados)
		console.log(selecionaTodos)
	}, [selecionados, selecionaTodos])

	return(
			<Card
				title="Relatório"
			>
				<TableBootstrap striped bordered hover size="sm">				 
				  	{
				  		titulosTable && Array.isArray(titulosTable) && titulosTable.length > 0 ? (
				  			<thead>
				  				<tr>
				  					<th>
				  						<Checkbox type="checkbox" checked={selecionaTodos} setValue={selecionarTodos} label="" />
				  					</th>
					  				{

					  					titulosTable.map((item, index, arr)=>{
					  						let labelCelHeadrTable 		= item.hasOwnProperty('label') ? item.label : '';
					  						let propsLabelHeaderTable 	= item.hasOwnProperty('props') ? item.props: {};
								  			console.log(labelCelHeadrTable)
								  			return <th key={index} { ...propsLabelHeaderTable} >{labelCelHeadrTable}</th>

								  		})
					  				}
				  				</tr>
				  			</thead>
				  			

				  	) : ('')

				  	}
				  <tbody>
				  	{	

				  		bodyTable && Array.isArray(bodyTable) && bodyTable.length > 0 ? (

				  			bodyTable.map((item, index, arr)=>{
		  						let celBodyTableArr 		= item.hasOwnProperty('celBodyTableArr') ? item.celBodyTableArr : [];
		  						let propsRowBodyTable 	= item.hasOwnProperty('propsRow') ? item.propsRow: {};
		  						let id = propsRowBodyTable.hasOwnProperty('id') ? propsRowBodyTable.id: 0;
		  						id = Number(id);
					  			
					  			return (
					  				<tr  key={index} { ...propsRowBodyTable}>
					  					<td><Checkbox type="checkbox" value={id} checked={id > 0 ? selecionados.includes(id) : false} label="" setValue={handleChange} /></td>
					  					{
					  						celBodyTableArr && Array.isArray(celBodyTableArr) && celBodyTableArr.length > 0 ? (
												celBodyTableArr.map((itemCel, indexCel, arrCel)=>{
													let labelCel = itemCel.hasOwnProperty('label') ? itemCel.label :'';
													let propsCelBodyTable 	= item.hasOwnProperty('propsRow') ? item.propsRow: {};
													return <td key={indexCel}>{labelCel}</td>
												})

											) : ('')
					  					}
					  				</tr>
					  			)
					  			

					  		})

				  		) : ('')
	  					
	  				}				    
				  </tbody>
				</TableBootstrap>
			</Card>
		)
}

export default Table;