import React from 'react';
import { Col, Row, Modal as ModalBootstrap, Button } from 'react-bootstrap';
import estilos from './Calendario.module.css'
import Card from '../../Utils/Card/index.js'
import { faHome, faSearch, faPlus, faTimes, faChevronCircleRight, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Calendario = ({botoesHeader, rowsTableArr, ...props})=>{
	const[titulo, setTitulo] = React.useState('Dezembro')
	const[meses, setMeses] = React.useState([
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro',

	])
	const[mes, setMes] = React.useState(null)
	const[ano, setAno] = React.useState(null)

	const proximoMes = ()=>{
		setMes(mes + 1)
	}

	const mesAnteior = ()=>{
		setMes(mes - 1)
	}

	React.useEffect(()=>{
		if(mes == null){
			setMes(new Date().getMonth())
		}

		if(ano == null){
			setAno(new Date().getFullYear())
		}
		 if(mes && mes > 11){
			setMes(0)
			setAno(ano + 1)
		}else if(mes && mes < 0){
			setMes(11)
			setAno(ano - 1)
		}
	}, [mes])

	//const now = new Date();
	//const mes = now.getMonth();
	//const ano = now.getFullYear();
	//gatDaysCalendar(mes, ano);


	var totDias = 0;
	let firstDayOfWeek = new Date(ano, mes, 1).getDay() - 1;
	let getLastDayThisMonth = new Date(ano, mes+1, 0).getDate();
	let i = -firstDayOfWeek;

	return(
		<>
			<Card
				title="Agenda"
				propsCard={{className:'cardFilter'}}
				botoesHeader={botoesHeader}
			>

				<Row >
					<Col
						xs="12" sm="12" md="12"
						className={[estilos.header]}
					>
						<Row>
							<Col >
								<Button className={ `btn btn-sm ${estilos.mes_anterior} ${estilos.btn_ant} btn-secondary`} style={{borderRadius:'50px'}} onClick={()=>mesAnteior()}>
				  		           <FontAwesomeIcon icon={faChevronCircleLeft} />
				  		        </Button>		  		    
							</Col>
							<Col>
								<span
									className={[estilos.titulo]}
								>
									{
										meses[mes]+' - '+ano
									}
								</span>
							</Col>
							<Col>
								<Button onClick={()=>proximoMes()} className={ `btn btn-sm ${estilos.proximo_mes} ${estilos.btn_pro} btn-secondary`} style={{borderRadius:'50px'}} >
								 	<FontAwesomeIcon icon={faChevronCircleRight} /> 
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col
						className={[estilos.table]}
					>
						<table>
							<thead>
								<tr>
									<td>Dom</td>
									<td>Seg</td>
									<td>Ter</td>
									<td>Qua</td>
									<td>Qui</td>
									<td>Sex</td>
									<td>Sáb</td>
								</tr>
							</thead>
							<tbody>
								
								{
									
									

									[0,1,2,3,4,5].map((item, inex, arr)=>{
											
										return(
											<tr key={'seaman'+inex+arr.length} >
												{
													[0,1,2,3,4,5, 6].map((it, ind, ar)=>{

														totDias += 1
														
														let firstDayOfWeek = new Date(ano, mes, 1).getDay() - 1;
														let getLastDayThisMonth = new Date(ano, mes+1, 0).getDate();
														let classesEstilos ="";

														let dt = new Date(ano, mes, i);
														let data = dt.getDate()

														let dtNow = new Date()
														if(dtNow.getFullYear() == dt.getFullYear() && dtNow.getMonth() == dt.getMonth() && dtNow.getDate() == dt.getDate()){
															//addClass('dia_atual')
															classesEstilos += ' '+estilos.dia_atual
														}

														if(i < 1){
															classesEstilos += ' '+estilos.mes_anterior
														}

														if(i > getLastDayThisMonth){
															classesEstilos += ' '+estilos.proximo_mes;
														}

														if(i == 1){
															classesEstilos += ' '+estilos.event
														}

														let diaAtualTd = dt.getDate();
														diaAtualTd = Number(diaAtualTd)

														let anoAtualDt = ano;
														anoAtualDt = Number(anoAtualDt)

														let mesAtualDt = mes;
														mesAtualDt = Number(mesAtualDt)
														
														let dadosAgendaData = []

														if(rowsTableArr){
															for(let it=0; !(it == rowsTableArr.length); it++){
																let atualItemTable = rowsTableArr[it] 
																let {propsRow, data_format, hora, acoes, celBodyTableArr} = atualItemTable
																let data_format_arr = String(data_format).split('-')

																if(Array.isArray(data_format_arr) && data_format_arr.length == 3){
																	let nr_dia_form = data_format_arr[0]
																	let nr_mes_form = data_format_arr[1]
																	let nr_ano_form = data_format_arr[2]

																	nr_dia_form = Number(nr_dia_form)
																	nr_mes_form = Number(nr_mes_form)
																	nr_ano_form = Number(nr_ano_form)

																	if(anoAtualDt == nr_ano_form && mesAtualDt == nr_mes_form && diaAtualTd == nr_dia_form){
																		dadosAgendaData.push(atualItemTable)
																	}

																}
															}
														}
																		//console.log('========================== dados dia ====================')
																		//console.log(dadosAgendaData)
																		//console.log('========================== dados dia ====================')


														i+= 1;
														return(
															<td key={'day'+ind+ar.length}  className={classesEstilos}  >
																{dt.getDate()}
																<Col  className={'p-2'}>
																	{dadosAgendaData && Array.isArray(dadosAgendaData) && dadosAgendaData.length > 0 ? (
																		dadosAgendaData.map((dadosItem, indexDadosItem, arrDadosItem)=>{

																			console.log('========================== dados dia ====================')
																			console.log(dadosItem)
																			console.log('========================== dados dia ====================')
																			let {mainLabel, dados} = dadosItem
																			return(
																				<>
																					
																						<Col className={'mt-1 p-2'}  style={{backgroundColor:'orange', color:'#000'}}>
																							<div>
											                                                	{dados?.hora}
											                                                </div>
											                                                <div>
											                                                	{mainLabel}
											                                                </div>
											                                                <div>
											                                                	{dados?.name_pessoa}
											                                                </div>
											                                            </Col>
											                                            
											                                            {
											                                            	/*
											                                            		<div  style={{display:'flex', flexDirection:'collumn', flexWrap:'wrap'}}>
													                                                <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{return null}} ><FontAwesomeIcon icon={faTimes} /> {mainLabel}</Button>
													                                            </div>
											                                            	*/
											                                            }
																				</>
																			)
																		})

																	) : (null)}

																	
																</Col>
															</td>
														)	
													})
													

												}
											</tr>
										)
									})
								}
								
							</tbody>
						</table>
					</Col>
				</Row>
			</Card>
		</>
	)
}

export default Calendario;