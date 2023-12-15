import React from 'react';
import { Col, Row, Modal as ModalBootstrap, Button } from 'react-bootstrap';
import estilos from './Calendario.module.css'
import Card from '../../Utils/Card/index.js'
import { faHome, faSearch, faPlus, faTimes, faChevronCircleRight, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Horario = ({botoesHeader, rowsTableArr, ...props})=>{
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
	const[diasSemana, setDiasSemana] = React.useState([
		'Dom',
		'Seg',
		'Ter',
		'Qua',
		'Qui',
		'Sex',
		'Sáb',

	])
	const[dia, setDia] = React.useState(null)
	const[semana, setSemana] = React.useState(null)
	const[mes, setMes] = React.useState(null)
	const[ano, setAno] = React.useState(null)

	const proximoMes = ()=>{
		setMes(mes + 1)
	}

	const mesAnteior = ()=>{
		setMes(mes - 1)
	}

	const proximoDia = ()=>{
		setDia(dia + 1)
	}

	const diaAnteior = ()=>{
		setDia(dia - 1)
	}

	const proximaSemana = ()=>{
		let data = new Date(ano, mes, dia);
		if(new Date(ano, mes, data.getDate() + 6) > new Date(ano, mes+1, 0)){
			
			if((data.getMonth() + 1 ) > 11){
				setAno(ano+1)
				setMes(0)
			}

			if((mes +1) <= 11 ){
				setMes(mes + 1)
			}

			setDia(1)
		}else{
			setDia(data.getDate() + 6)
		}
		

		

	}

	const semanaAnteior = ()=>{

		let data = new Date(ano, mes, dia);

		if(new Date(ano, mes, data.getDate() - 6) < new Date(ano, mes, 1)){
			
			if((data.getMonth() -1 ) <= 0){
				setAno(ano-1)
			}

			if((mes -1) >=0 ){
				setMes(mes - 1)
			}else{
				setMes(11)
			}
			
			setDia(new Date(ano, mes+1, 0).getDate())
		}else{
			setDia(data.getDate() - 6)
		}

		
	}

	const gerarHorario = ()=>{
		let dt = new Date(ano, mes, dia);
		let h = [];
		h.push(dt.getHours());
		for(let i=0; !(i == (23)); i++){
			dt.setHours(dt.getHours() + 1)
			h.push(dt.getHours());
			
		}

		let hmont = [];
		for(let i=0; !(i == (h.length)); i++){
			let horaFormat = h[i] < 10 ? '0'+h[i] : h[i];
			hmont.push(`${horaFormat}: 00 - ${horaFormat} : 59`);
		}

		return hmont;
	}

	const firsAndLasDaysOfTheWeek = ()=>{
		let dt = new Date(ano, mes, dia); // current date of week
		let currentWeekDay = dt.getDay();
		let lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
		let wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
		let wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));

		return{wkStart, wkEnd}
	}

	React.useEffect(()=>{

		if(dia == null){
			setDia(new Date().getDate())
		}else{
			setDia(dia)
		}

		if(mes == null){
			setMes(new Date().getMonth())
		}else{

			setMes(mes)
		}

		if(ano == null){
			setAno(new Date().getFullYear())
		}else{
			setAno(ano)
		}

		
		
		
	}, [dia])

	//const now = new Date();
	//const mes = now.getMonth();
	//const ano = now.getFullYear();
	//gatDaysCalendar(mes, ano);

	var totDias = 0;
	let data = new Date(ano, mes, dia);
	let firstDayOfWeek =  data.getDate() - data.getDay(); //new Date(ano, mes, dia).getDay() -1;
	let getLastDayThisMonth = new Date(ano, mes+1, 0).getDate();
	let i = firstDayOfWeek;
	let ic = firstDayOfWeek;
	let dataDiaSemana = []
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
								<Button variant="primary" className={ `btn btn-sm ${estilos.mes_anterior} ${estilos.btn_ant} btn-secondary`} style={{borderRadius:'50px'}}  onClick={()=>semanaAnteior()}>
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
								<Button onClick={()=>proximaSemana()} className={ `btn btn-sm ${estilos.proximo_mes} ${estilos.btn_pro} btn-secondary`} style={{borderRadius:'50px'}} >
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
									<td ></td>
									{
										[0,1,2,3,4,5, 6].map((it, ind, ar)=>{

											totDias += 1
											
											//let firstDayOfWeek = new Date(ano, mes, 1).getDay() - 1;
											//let getLastDayThisMonth = new Date(ano, mes+1, 0).getDate();
											let classesEstilos ="";

											let dt = new Date(ano, mes, i);
											let data = dt.getDate()

											let dtNow = new Date()
											if(dtNow.getFullYear() == dt.getFullYear() && dtNow.getMonth() == dt.getMonth() && dtNow.getDate() == dt.getDate()){
												//addClass('dia_atual')
												classesEstilos += ' '+estilos.event
												classesEstilos += ' '+estilos.dia_atual
											}

											dataDiaSemana.push([dt.getFullYear(), dt.getMonth(), dt.getDate()])

											if(i < 1){
												classesEstilos += ' '+estilos.mes_anterior
											}

											if(i > getLastDayThisMonth){
												classesEstilos += ' '+estilos.proximo_mes;
											}

											if(i == 1){
												//classesEstilos += ' '+estilos.event
											}


											i+= 1;


											return(
												<td key={'day'+ind+ar.length}  className={classesEstilos} >{diasSemana[it]+' - '} {dt.getDate()}</td>
											)	
										})
										

									}
								</tr>
							</thead>
							<tbody>
								{
									gerarHorario().map((iten, idx, arr)=>{
										let itenArr = String(iten).split('-')
										let horaMinInico = String(itenArr[0]).split(':')

										let horaInico = horaMinInico[0]
										horaInico = Number(horaInico)

										let minInico = horaMinInico[1]
										minInico = Number(minInico)


										let horaMinFim = String(itenArr[1]).split(':')
										let horaFim = horaMinFim[0]
										horaFim = Number(horaFim)

										let minFim = horaMinFim[1]
										minFim = Number(minFim)

										return(

												<tr key={'ora'+idx+arr.length} >
													<td >{iten}</td>
													{
														[0,1,2,3,4,5, 6].map((it, ind, ar)=>{

															totDias += 1
															

															i+= 1;

															let dataAtual = dataDiaSemana[it];

															let dt = new Date(dataAtual[0], dataAtual[1], dataAtual[2]);

															let diaAtualTd = dt.getDate();
															diaAtualTd = Number(diaAtualTd)

															let anoAtualDt = dt.getFullYear();
															anoAtualDt = Number(anoAtualDt)

															let mesAtualDt = dt.getMonth();
															mesAtualDt = Number(mesAtualDt)
															mesAtualDt += 1;
															
															let dadosAgendaData = []

															if(rowsTableArr){
																for(let it=0; !(it == rowsTableArr.length); it++){
																	let atualItemTable = rowsTableArr[it] 
																	let {propsRow, data_format, hora, acoes, celBodyTableArr, dados} = atualItemTable

																	let data_format_arr = String(data_format).split('-')
																	let hora_arr = String(dados?.hora).split(':')

																	if(Array.isArray(data_format_arr) && data_format_arr.length == 3){
																		let nr_dia_form = data_format_arr[0]
																		let nr_mes_form = data_format_arr[1]
																		let nr_ano_form = data_format_arr[2]

																		nr_dia_form = Number(nr_dia_form)
																		nr_mes_form = Number(nr_mes_form)
																		nr_ano_form = Number(nr_ano_form)

																		if(anoAtualDt == nr_ano_form && mesAtualDt == nr_mes_form && diaAtualTd == nr_dia_form){
																			if(Array.isArray(hora_arr) && hora_arr.length >=2){
																				let horaPart = hora_arr[0]
																				let minPart = hora_arr[1]

																				horaPart = Number(horaPart)
																				minPart = Number(minPart)
																				if(horaInico <= horaPart && horaPart <= horaFim && minFim >=minPart && minInico <= minPart  ){
																					dadosAgendaData.push(atualItemTable)
																				}


																			}
																			
																		}

																	}
																}
															}
															

															ic += 1


															return(
																<td key={'day'+ind+ar.length}   >
																	{/*<span className={`${estilos.event}`}> </span>*/}

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
												                                                {/*<div>
												                                                												                                                	{dados?.data_format}
												                                                												                                                </div>*/}

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

export default Horario;