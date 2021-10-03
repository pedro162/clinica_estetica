import React from 'react';
import { Breadcrumb, Row, Col, Container} from 'react-bootstrap';

const Breadcrumbs = (props)=>{
	const itensArr  = props.items ? props.items: []
	return(
		<Container fluid expand="lg" bg="primary" variant="dark">
			<Row >
				<Col>
					<Breadcrumb>
						{
							itensArr && Array.isArray(itensArr) && itensArr.map((item, index, arr)=>{
								let propsItem = item.hasOwnProperty('props') ?  item.props : '';
								let label = item.hasOwnProperty('label') ?  item.label : '';

								return(
										<Breadcrumb.Item {...propsItem}  key={index} >
										    {label}
										 </Breadcrumb.Item>
									)
							})
						}
					</Breadcrumb>
				</Col>
			</Row>
		</Container>
	)
}

export default Breadcrumbs;