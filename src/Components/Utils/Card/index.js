import React from 'react';
import { Container, Col, Row, Card as CartBootstrap, Button } from 'react-bootstrap';
import estilos from './Card.module.css'

const Card =({children, title, acoesBottomCard, propsCard, botoesHeader,...props})=>{
	//console.log('Acoes de relatorio')
	//console.log(botoesHeader)
	return(
		<>
			<CartBootstrap {...propsCard} >
				<CartBootstrap.Header className={[estilos.headerCard]}>
					<Row style={{}}>
						<Col>
							<CartBootstrap.Title>{title}</CartBootstrap.Title>
						</Col>
						{
							Array.isArray(botoesHeader) && botoesHeader.length > 0 
							? (


									<Col style={{display:'flex',flexCirection:'collumn',justifyContent: 'flex-end'}}>
										
										{Array.isArray(botoesHeader) && botoesHeader.length > 0 && botoesHeader.map((item, index, arr)=>{
											let {acao, label, propsAcoes, icon} = item;
											if(label || icon){
												return (
													<Button key={index+'-'+arr.length} onClick={acao} {...propsAcoes} >{icon?icon:''} {label?label:''}</Button>
												)
											}

										}) }
									</Col>

							)
							:
							(null)
						}
					

					</Row>
				</CartBootstrap.Header>
				<CartBootstrap.Body className={`${estilos.bodyCard}`}>
				    {children}				
				</CartBootstrap.Body>
				<CartBootstrap.Footer bg="light" className={[{'text-muted':'text-muted'}, estilos.headerFooter]} >
					{
						acoesBottomCard && Array.isArray(acoesBottomCard) && acoesBottomCard.length > 0 ? (
							acoesBottomCard.map((item, index, arr)=>{
								let label = item.hasOwnProperty('label') ? item.label : '';
								let icon = item.hasOwnProperty('icon') ? item.icon : '';
								let propsItem = item.hasOwnProperty('props') ? item.props : {};
								return(
									<Button key={index} {... propsItem} >{icon} {label}</Button>
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