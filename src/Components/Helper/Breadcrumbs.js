import React from 'react';
import { Breadcrumb, Row, Col, Container, Button} from 'react-bootstrap';
import estilos from './Breadcrumbs.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { faHome, faSearch, faPlus, faEllipsisH, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Breadcrumbs = ({setMostarFiltros, buttonFiltroMobile, mostarFiltros, ...props})=>{
	const itensArr  = props.items ? props.items: []
	return(
		<Row fluid expand="lg" className={estilos.containerCumbs}>
			{

				buttonFiltroMobile ? (
						<>
							<Col xs={'10'} sm={'10'} md={'10'} lg={'10'} >
								<Breadcrumb>
									{
										itensArr && Array.isArray(itensArr) && itensArr.map((item, index, arr)=>{
											let propsItem = item.hasOwnProperty('props') ?  item.props : '';
											let label = item.hasOwnProperty('label') ?  item.label : '';
											let to = item.hasOwnProperty('to') ?  item.to : '';

											return(
													<Breadcrumb.Item {...propsItem}  key={index} >
														{to ?  (<Link to={to} >{label}</Link>) : label}
													 </Breadcrumb.Item>
												)
										})
									}
								</Breadcrumb>
							</Col>
							<Col xs={'2'} sm={'2'} md={'2'} lg={'2'} className={'mobile_card_report'} style={{textAlign:'left'}} >
								<Button className={'btn btn-sm btn-light'} style={{backgroundColor:'transparent', border:'none'}} onClick={()=>setMostarFiltros((val)=>!val)}>{mostarFiltros ? <FontAwesomeIcon size={'lg'} icon={faTimesCircle}/> : <FontAwesomeIcon size={'lg'} icon={faSearch}/> } </Button>
							</Col>
						</>
					) : (
						<Col>
							<Breadcrumb>
								{
									itensArr && Array.isArray(itensArr) && itensArr.map((item, index, arr)=>{
										let propsItem = item.hasOwnProperty('props') ?  item.props : '';
										let label = item.hasOwnProperty('label') ?  item.label : '';
										let to = item.hasOwnProperty('to') ?  item.to : '';

										return(
												<Breadcrumb.Item {...propsItem}  key={index} >
													{to ?  (<Link to={to} >{label}</Link>) : label}
												 </Breadcrumb.Item>
											)
									})
								}
							</Breadcrumb>
						</Col>
					)
			}
			
			
			
			
		</Row>
	)
}

export default Breadcrumbs;