import React from 'react';
import { Container, Col, Row, Card as CartBootstrap, Button } from 'react-bootstrap';

const Card =({children, title, acoesBottomCard, ...props})=>{
	
	return(
		<>
			<CartBootstrap >
				<CartBootstrap.Header>
					<CartBootstrap.Title>{title}</CartBootstrap.Title>
				</CartBootstrap.Header>
				<CartBootstrap.Body>
				    {children}				
				</CartBootstrap.Body>
				<CartBootstrap.Footer className="text-muted">
					{
						acoesBottomCard && Array.isArray(acoesBottomCard) && acoesBottomCard.length > 0 ? (
							acoesBottomCard.map((item, index, arr)=>{
								let label = item.hasOwnProperty('label') ? item.label : '';
								let propsItem = item.hasOwnProperty('props') ? item.props : {};
								return(
									<Button key={index} variant="primary" {... propsItem} >{label}</Button>
								)
							})
						) : ('')

					}
				</CartBootstrap.Footer>
			</CartBootstrap>
		</>
	)
}

export default Card;