import React from 'react';
import { Col, Row, Modal as ModalBootstrap, Button } from 'react-bootstrap';
import estilos from './Calendario.module.css'
import Card from '../../Utils/Card/index.js'

const Calendario = (props)=>{
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
			>

				<Row >
					<Col
						xs="12" sm="12" md="12"
						className={[estilos.header]}
					>
						<Row>
							<Col >
								<Button variant="primary" className={ `btn btn-sm ${estilos.mes_anterior} ${estilos.btn_ant}`} onClick={()=>mesAnteior()}>
				  		           {'<'}
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
								<Button onClick={()=>proximoMes()} className={ `btn btn-sm ${estilos.proximo_mes} ${estilos.btn_pro}`} > {'>'} </Button>
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


														i+= 1;
														return(
															<td key={'day'+ind+ar.length}  className={classesEstilos} >{dt.getDate()}</td>
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