import React from 'react';
import {Table as TableBootstrap, Row, Col } from 'react-bootstrap';
import Card from '../../Utils/Card/index.js'
import Checkbox from '../../FormControl/Checkbox.js'
import Load from '../../Utils/Load/index.js'
import MenuOpcoes from '../MenuOpcoes/index.js'
import { faHome, faSearch, faPlus, faPen, faHandHoldingUsd, faList, faFile, faTrash, faHandHolding, faUser, faUserCircle, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../../functions/index.js'

const CardMobile = ({children, titulosTableArr, rowsTableArr,loading, botoesHeader, acoesBottomCard, title, ... props})=>{
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
			<Card
					title="Relatório"
					propsCard={{className:'cardFilter'}}
					botoesHeader={botoesHeader}
				>
				<Load/>
			</Card>

						
		)
	}

	return(
		<>

			<Row>
                <Col  xs="12" sm="12" md="12" className={'mobile_card_report'}>
                    {
                        bodyTable && Array.isArray(bodyTable) && bodyTable.length > 0 ? (
                            bodyTable.map((item, index, arr)=>{
                               

                                let celBodyTableArr 	= item.hasOwnProperty('celBodyTableArr') ? item.celBodyTableArr : [];
				  				let propsRowBodyTable 	= item.hasOwnProperty('propsRow') ? item.propsRow: {};
				  				let id 					= propsRowBodyTable.hasOwnProperty('id') ? propsRowBodyTable.id: 0;
				  				id = Number(id);
				  				let titleCard 			= item?.title
				  				if(!titleCard){
				  					titleCard = ''
				  				}

				  				let acoesRowBodyTable 	= item.hasOwnProperty('acoes') ? item.acoes: {};

                                return(
                                     <div className={'mb-2'} key={id+index+arr.length}>
                                        <Card className={'mb-5'} title={titleCard}
                                                acoesBottomCard={acoesBottomCard}
                                                propsCard={{className:'cardFilter'}}
												botoesHeader={[{acao:()=>{setDataMenu(acoesRowBodyTable);setShowModalOptions(true)}, label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon size={'lg'} icon={faEllipsisH} /> }]}
                                             >

                                            
                                            <Row className={'mb-3'} style={{fontSize:'14pt'}}>
                                            	{
							  						celBodyTableArr && Array.isArray(celBodyTableArr) && celBodyTableArr.length > 0 ? (
														celBodyTableArr.map((itemCel, indexCel, arrCel)=>{
																
															
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
															return <Col key={indexCel} {...propsCelBodyTable}>{title} {labelCel}</Col>
														})

													) : ('')
							  					}

                                            </Row>

                                        </Card>
                                     </div>
                                )
                            })
                        ) : (null)
                    
                    }
                </Col>

             </Row>
			
			<MenuOpcoes showModal={showModalOptions} setShowModal={setShowModalOptions} opcoes={dataMenu} />
		</>
		)
}

export default CardMobile;