import React from 'react';
import {Table as TableBootstrap, Row, Col } from 'react-bootstrap';
import Card from '../../Utils/Card/index.js'
import Checkbox from '../../FormControl/Checkbox.js'
import Load from '../../Utils/Load/index.js'
import MenuOpcoes from '../MenuOpcoes/index.js'
import { faHome, faSearch, faPlus, faPen, faHandHoldingUsd, faList, faFile, faTrash, faHandHolding, faUser, faUserCircle, faEllipsisH, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../../functions/index.js'
import Pagination from 'react-bootstrap/Pagination';

const ListMobile = ({children, titulosTableArr, rowsTableArr,loading, nadaEncontrado, botoesHeader, title, withoutFirstCol, usePagination, nrPageAtual, previousPageRout, nextPageRout, firstPageRout, lastPageRout, totalPageCount, qtdItemsTo, qtdItemsTotal, ... props})=>{
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
    //nadaEncontrado={nadaEncontrado}           
	//
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
	if( loading){
		return	(
			<Load/>

						
		)
	}

	let nrColList = 2;
	if(!withoutFirstCol){
		nrColList = 12
	}

	
	return(
		<>

			<Row>
                <Col  xs="12" sm="12" md="12" className={'mobile_card_report'} style={{maxHeight:'calc(100vh - 28vh)',  overflowY:'auto'}}>
                    {
                        bodyTable && Array.isArray(bodyTable) && bodyTable.length > 0 ? (
                            bodyTable.map((item, index, arr)=>{
                               

                                let celBodyTableArr 		= item.hasOwnProperty('celBodyTableArr') 		? item.celBodyTableArr : [];
				  				let propsRowBodyTable 		= item.hasOwnProperty('propsRow') 				? item.propsRow: {};
				  				let id 						= propsRowBodyTable.hasOwnProperty('id') 		? propsRowBodyTable.id: 0;
				  				let propsContainerTitulo 	= item.hasOwnProperty('propsContainerTitulo') 	? item.propsContainerTitulo: {};
				  				let propsContainerButtons 	= item.hasOwnProperty('propsContainerButtons') 	? item.propsContainerButtons: {};
				  				let acoesBottomCard 		= item.hasOwnProperty('acoesBottomCard') 		? item.acoesBottomCard: [];


				  				let titleRow 				= propsRowBodyTable.hasOwnProperty('titleRow') 		? propsRowBodyTable.titleRow: '';
				  				let style 					= propsRowBodyTable.hasOwnProperty('style') 		? propsRowBodyTable.style: {};
				  				let mainIcon 				= propsRowBodyTable.hasOwnProperty('mainIcon') 		? propsRowBodyTable.mainIcon: faUserCircle;

				  				id = Number(id);
				  				let titleCard 			= item?.title
				  				if(!titleCard){
				  					titleCard = ''
				  				}

				  				let acoesRowBodyTable 	= item.hasOwnProperty('acoes') ? item.acoes: {};

                                return(
                                	
                                     <Col  key={id+index+arr.length}>

                                     		<Row className={'pb-2 px-1'}  onClick={()=>{setDataMenu(acoesRowBodyTable);setShowModalOptions(true)}} style={{...style}} > 
												{!withoutFirstCol && (
													<Col xs="2" sm="2" md="2"  style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',fontSize:'25pt'}}>
                                                    	<FontAwesomeIcon size={'sm'} icon={mainIcon}/>
                                               	 	</Col>
												)}
                                                <Col xs={withoutFirstCol} sm={withoutFirstCol} md={withoutFirstCol}  style={{textAlign:'left', fontSize:'10pt'}}>
                                                	<Row className={'mb-1'}>
                                                        <span style={{fontSize:'14pt', fontWeight:'bolder'}} >{titleRow}</span>
                                                    </Row>

                                       
                                            	{
							  						celBodyTableArr && Array.isArray(celBodyTableArr) && celBodyTableArr.length > 0 ? (
														celBodyTableArr.map((itemCelArr, indexCelArr, arrCelArr)=>{

															return(
																	<div  key={indexCelArr+arrCelArr.length+itemCelArr.length} >
																		<Row>

																			{
																				Array.isArray(itemCelArr) && itemCelArr.length > 0 ? 

																				(
																					itemCelArr.map((itemCel, indexCel, arrCel)=>{


																						let labelCel = itemCel.hasOwnProperty('label') ? itemCel.label :'';
																						let toSum = itemCel.hasOwnProperty('toSum') ? itemCel.toSum :0;
																						let title = itemCel.hasOwnProperty('title') ? itemCel.title : '';
																						let propsRow = itemCel.hasOwnProperty('propsRow') ? itemCel.propsRow : {};
																						 
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
																						return <Col key={indexCel} {...propsCelBodyTable}><span>{title}</span> {labelCel}</Col>
																					})
																				)
																				:

																				('')
																			}
																		 </Row>
																			
																	</div>	
															)
														})

													) : ('')
							  					}
							  					</Col>
							  				</Row>
							  				<hr style={{margin:'0',padding:'0'}}/>

                                     </Col>
                                )
                            })


                        ) : (
                        	nadaEncontrado && <Row>
                        		<Col style={{textAlign:'center'}} ><span>Ops...</span><br/><span style={{textAlign:'center'}}>Nenhum registro encontrado!</span></Col>
                        	</Row>
                        )
                    
                    }

                     {
						bodyTable && Array.isArray(bodyTable) && bodyTable.length > 0 && usePagination && (
								<>		
								{(qtdItemsTo > 0 && qtdItemsTotal > 0) && <div>Mostrando: {qtdItemsTo} de {qtdItemsTotal} registros</div>}							
								<Pagination className='mt-3'>
										<Pagination.First onClick={()=>firstPageRout()} />
										<Pagination.Prev onClick={()=>previousPageRout()} />
										<Pagination.Item>Página {nrPageAtual ? nrPageAtual : 1} de { totalPageCount ? totalPageCount : 1}</Pagination.Item>
										<Pagination.Next onClick={()=>nextPageRout()}  />
										<Pagination.Last onClick={()=>lastPageRout()}  />
								</Pagination>
								</>
								
							)



					}
                </Col>
               
             </Row>
			
			<MenuOpcoes showModal={showModalOptions} setShowModal={setShowModalOptions} opcoes={dataMenu} />
		</>
		)
}

export default ListMobile;