import React from 'react';
import { Container, Col, Row, Card as CartBootstrap, Button } from 'react-bootstrap';
import estilos from './Card.module.css'

const Card =({children, title, acoesBottomCard, propsContainerTitulo, propsContainerButtons, propsCard, botoesHeader, propsHeader, noFooter, noBody,...props})=>{
	//console.log('Acoes de relatorio')
	//console.log(botoesHeader)
	if(!propsHeader){
		propsHeader = {}
	}
	return(
		<>
			<CartBootstrap {...propsCard}  className={[estilos.card]}>
				<CartBootstrap.Header className={[estilos.headerCard]} {...propsHeader}>
					<Row style={{}}>
						<Col  {...propsContainerTitulo} >
							<CartBootstrap.Title>{title}</CartBootstrap.Title>
						</Col>
						{
							Array.isArray(botoesHeader) && botoesHeader.length > 0 
							? (


									<Col style={{display:'flex',flexCirection:'collumn',justifyContent: 'flex-end'}} {...propsContainerButtons} >
										
										{Array.isArray(botoesHeader) && botoesHeader.length > 0 && botoesHeader.map((item, index, arr)=>{
											let {acao, label, propsAcoes, props, icon} = item;
											if(!propsAcoes){
												propsAcoes = props;
											}
											if(label || icon){
												return (
													<Button key={'__btn_action_'+index+'-'+arr.length} onClick={acao} {...propsAcoes} >{icon?icon:''} {label?label:''}</Button>
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
				{!noBody && <CartBootstrap.Body className={`${estilos.bodyCard}`}>
				    {children}				
				</CartBootstrap.Body>}
				{!noFooter && (


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
				)}
			</CartBootstrap>
		</>
	)
}

export default Card;