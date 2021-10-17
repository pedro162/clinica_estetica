import React from 'react';
import { Container, Col, Row, Card as CartBootstrap, Button } from 'react-bootstrap';
import estilos from './Card.module.css'

const Card =({children, title, acoesBottomCard, propsCard, ...props})=>{
	
	return(
		<>
			<CartBootstrap {...propsCard} >
				<CartBootstrap.Header className={[estilos.headerCard]}>
					<CartBootstrap.Title>{title}</CartBootstrap.Title>
				</CartBootstrap.Header>
				<CartBootstrap.Body>
				    {children}				
				</CartBootstrap.Body>
				<CartBootstrap.Footer bg="light" className={[{'text-muted':'text-muted'}, estilos.headerFooter]} >
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