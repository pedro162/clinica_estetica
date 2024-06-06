import React from 'react';
import {Table as TableBootstrap, Row, Col } from 'react-bootstrap';
import Card from '../../Utils/Card/index.js'
import Checkbox from '../../FormControl/Checkbox.js'
import Load from '../../Utils/Load/index.js'
import MenuOpcoes from '../MenuOpcoes/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../../functions/index.js'
import Pagination from 'react-bootstrap/Pagination';

const Table = ({children, titulosTableArr, rowsTableArr,loading, nadaEncontrado, botoesHeader, usePagination, nrPageAtual, previousPageRout, nextPageRout, firstPageRout, lastPageRout, totalPageCount, qtdItemsTo, qtdItemsTotal, ... props})=>{
	const titulosTable = titulosTableArr ? titulosTableArr : []
	const bodyTable =  rowsTableArr ? rowsTableArr : []
	const [selecionados, setSelecionados] = React.useState([])
	const [selecionaTodos, setSelecionaTodos] = React.useState(false)	
    const [showModalOptions, setShowModalOptions] = React.useState(false)
    const [dataMenu, setDataMenu] = React.useState([])

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
	//nadaEncontrado
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

	const opt = [
			{acao:()=>alert('Aqui'), label:'Editar', propsOption:{}, propsLabel:{}}
		]
	let arraySum = {};
	return(
		<>
			<Card
				title="Relatório"
				propsCard={{className:'cardFilter'}}
				botoesHeader={botoesHeader}
			>
				<div>
				
				{

					loading 

					?
						<Load/>
					:
						<>
							<TableBootstrap striped bordered hover size="sm" style={{width:'100%',maxHeight:'36rem', overflow:'auto'}} className={'mx-2'} >				 
							  	{
							  		titulosTable && Array.isArray(titulosTable) && titulosTable.length > 0 ? (
							  			<thead>
							  				<tr  >
							  					<th>
							  						<Checkbox type="checkbox" checked={selecionaTodos} setValue={selecionarTodos} label="" />
							  					</th>
								  				{

								  					titulosTable.map((item, index, arr)=>{
								  						let labelCelHeadrTable 		= item.hasOwnProperty('label') ? item.label : '';
								  						let propsLabelHeaderTable 	= item.hasOwnProperty('props') ? item.props: {};
								  						let rand = Math.floor(Math.random()*999999);
											  			console.log(labelCelHeadrTable)


											  			return <th key={index+arr.length+labelCelHeadrTable+rand} { ...propsLabelHeaderTable} >{labelCelHeadrTable}</th>

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

					  						let acoesRowBodyTable 	= item.hasOwnProperty('acoes') ? item.acoes: {};
					  						let rand = Math.floor(Math.random()*999999);
								  			
								  			return (
								  				<tr key={index+arr.length+id+'body'+rand} { ...propsRowBodyTable}>
								  					<td><Checkbox type="checkbox" value={id} checked={id > 0 ? selecionados.includes(id) : false} label="" setValue={handleChange} /></td>
								  					{
								  						celBodyTableArr && Array.isArray(celBodyTableArr) && celBodyTableArr.length > 0 ? (
															celBodyTableArr.map((itemCel, indexCel, arrCel)=>{

																let rand = Math.floor(Math.random()*999999);

																let labelCel = itemCel.hasOwnProperty('label') ? itemCel.label :'';
																let toSum = itemCel.hasOwnProperty('toSum') ? itemCel.toSum :0;
																//, 
																let isCoin              = itemCel.hasOwnProperty('isCoin') ? itemCel.isCoin :0;
																if(arraySum[indexCel] && arraySum[indexCel].hasOwnProperty("isCoin")){
																	if(isCoin){
																		arraySum[indexCel]['isCoin'] = isCoin;
																	}
																	if(toSum){
																		//arraySum[indexCel]['valor'] += Number(FORMAT_CALC_COD(labelCel))
																		arraySum[indexCel]['valor'] = Number(FORMAT_CALC_COD(labelCel)) + Number(FORMAT_CALC_COD(arraySum[indexCel]['valor']))
																	}else{
																		arraySum[indexCel]['valor'] = ''
																	}
																}else{
																	arraySum[indexCel] = {'isCoin':'','valor':''}
																	if(isCoin){
																		arraySum[indexCel]['isCoin'] = isCoin;
																	}
																	if(toSum){
																		//arraySum[indexCel]['valor'] += Number(FORMAT_CALC_COD(labelCel))
																		arraySum[indexCel]['valor'] = Number(FORMAT_CALC_COD(labelCel)) + Number(FORMAT_CALC_COD(arraySum[indexCel]['valor']))
																	}else{
																		arraySum[indexCel]['valor'] = ''
																	}

																}
																

																let propsCelBodyTable 	= itemCel.hasOwnProperty('props') ? itemCel.props : {};
																return <td key={indexCel+id+arrCel.length+'td'+rand} {...propsCelBodyTable} onClick={()=>{setDataMenu(acoesRowBodyTable);setShowModalOptions(true)}}  >{labelCel}</td>
															})

														) : ('')
								  					}
								  				</tr>
								  			)
								  			

								  		})

							  		) : ('')
				  					
				  				}				    
							  </tbody>
							  <tfoot>
								{arraySum && (
									<tr>
										<td></td>
										{Object.keys(arraySum).map((ojKey, index, arr)=>{
											let {valor,isCoin} = arraySum[ojKey]
											let rand = Math.floor(Math.random()*999999);
											
											if(! (String(valor).trim().length > 0)){
												return <td></td>
											}
				
											let valorAtual = '';
											if(isCoin){
												valorAtual = FORMAT_MONEY(valor);
											}else{
												valorAtual = valor;
											}
											return <td key={rand+index+'tfooter'} >{valorAtual}</td>
										})}

										
									</tr>

								)}
								
							  </tfoot>
							</TableBootstrap>
							{
								usePagination && (
										<>	
											{(qtdItemsTo > 0 && qtdItemsTotal > 0) && <div>Mostrando: {qtdItemsTo} de {qtdItemsTotal} registros</div>}									
											<Pagination>
													<Pagination.First onClick={()=>firstPageRout()} />
													<Pagination.Prev onClick={()=>previousPageRout()} />
													<Pagination.Item>Página {nrPageAtual ? nrPageAtual : 1} de { totalPageCount ? totalPageCount : 1}</Pagination.Item>
													<Pagination.Next onClick={()=>nextPageRout()}  />
													<Pagination.Last onClick={()=>lastPageRout()}  />
											</Pagination>
										</>
									)



							}
						</>
					
				}
				
				</div>
			</Card>
			<MenuOpcoes showModal={showModalOptions} setShowModal={setShowModalOptions} opcoes={dataMenu} />
		</>
		)
}

export default Table;