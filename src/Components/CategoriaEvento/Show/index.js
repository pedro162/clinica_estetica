import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CATEGORIA_EVENTO_ONE_GET, ESTADO_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormCategoriaEvento from '../FormCategoriaEvento/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row } from 'react-bootstrap';
import {Table as TableBootstrap } from 'react-bootstrap';

const Show = ({bodyTable, hasTitle, tituloTable})=>{

	const {getToken, dataUser} = React.useContext(UserContex);
	const {data, error, request, loading} = useFetch();
	
	return(
		<>
			<Row>
				<Col>
					
						{
						  	tituloTable && hasTitle == true && tituloTable.length > 0 ? (
						  	<Row>
								<Col>
									{tituloTable}
								</Col>
							</Row>
						) : ('')

					}
						
					<TableBootstrap striped bordered hover size="sm">				 
					  	
					  <tbody>
					  	{	

					  		bodyTable && Array.isArray(bodyTable) && bodyTable.length > 0 ? (

					  			bodyTable.map((item, index, arr)=>{
			  						let label 		= item.hasOwnProperty('label') ? item.label : '';
			  						let valor 		= item.hasOwnProperty('valor') ? item.valor : '';
			  						let propsLabel 	= item.hasOwnProperty('propsLabel') ? item.propsLabel: {};
			  						let propsValor 	= item.hasOwnProperty('propsValor') ? item.propsValor: {};
			  						let acoesRowBodyTable 	= item.hasOwnProperty('acoes') ? item.acoes: {};
						  			
						  			return (
						  				<tr key={'rowExcluir'+index+arr.length} >
						  					<td {...propsLabel}>
						  						{label}
						  					</td>
						  					<td {...propsValor} >
						  						{valor}
						  					</td>
						  				</tr>
						  			)
						  			

						  		})

					  		) : ('')
		  					
		  				}				    
					  </tbody>
					</TableBootstrap>
				</Col>
			</Row>
		</>
	)
}

export default Show;


