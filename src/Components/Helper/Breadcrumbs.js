import React from 'react';
import { Breadcrumb, Row, Col, Container} from 'react-bootstrap';
import estilos from './Breadcrumbs.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Breadcrumbs = (props)=>{
	const itensArr  = props.items ? props.items: []
	return(
		<Row fluid expand="lg" className={estilos.containerCumbs}>
			
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
			
		</Row>
	)
}

export default Breadcrumbs;