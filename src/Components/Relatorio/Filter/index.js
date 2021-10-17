import React from 'react';
import {Col, Row } from 'react-bootstrap';
import Card from '../../Utils/Card/index.js'
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index'
import Checkbox from '../../FormControl/Checkbox.js'
import Radio from '../../FormControl/Radio.js'
import estilos from './Filter.module.css';

const Filter = ({children,... props})=>{
	const alerta = (target)=>{
		console.log(target)
	}
	const data = [
		{
			type:'text',
			options:[],	
			hasLabel: true,
			contentLabel:'Teste',
			atributsFormLabel:{},
			atributsContainer:{xs:"12", sm:"12", md:"12",className:'mb-2'},
			atributsFormControl:{'type':'text', size:"sm",'name':'nome',onChange:alerta,	onBlur:alerta},

		},
		{
			type:'radio',
			options:[
				{
					hasLabel: true,
					contentLabel:'Teste Radio 01',
					atributsFormLabel:{},
					atributsFormControl:{'type':'radio', value:'12', size:"sm",'checked':true,'name':'nome',onChange:alerta,	onBlur:alerta},
				},
				{
					hasLabel: true,
					contentLabel:'Teste Radio',
					atributsFormLabel:{},
					atributsFormControl:{'type':'radio', value:'12', size:"sm",'checked':true,'name':'nome',onChange:alerta,	onBlur:alerta},
				}
			],	
			hasLabel: true,
			contentLabel:'Teste',
			atributsFormLabel:{},
			atributsContainer:{xs:"12", sm:"12", md:"12",className:'mb-2',},
			atributsFormControl:{},

		}
		,{
			type:'checkbox',
			options:[],	
			hasLabel: true,
			contentLabel:'Teste',
			atributsFormLabel:{},
			atributsContainer:{ xs:"12", sm:"12", md:"6",className:'mb-2'},
			atributsFormControl:{'type':'checkbox', value:'12',size:"sm",'checked':false,'name':'nome',onChange:alerta,	onBlur:alerta},

		}
	]
	return(
			<>
				<Card
					title="Filtros"
					propsCard={{className:'cardFilter'}}
				>
					<Row>
						{
							Array.isArray(data) && data.length > 0 
							?
							 	data.map((item, index, arr)=>{
							 		let type 					= item.hasOwnProperty('type') 					? item.type: 'text' ;
							 		let hasLabel 				= item.hasOwnProperty('hasLabel') 				? item.hasLabel: false 
							 		let contentLabel 			= item.hasOwnProperty('contentLabel') 			? item.contentLabel: '' 
							 		let atributsFormLabel 		= item.hasOwnProperty('atributsFormLabel') 		? item.atributsFormLabel: {}
							 		let atributsContainer 		= item.hasOwnProperty('atributsContainer') 		? item.atributsContainer: {}
							 		let atributsFormControl 	= item.hasOwnProperty('atributsFormControl') 	? item.atributsFormControl: {}
							 		let options 				= item.hasOwnProperty('options') 				? item.options: []
							 		
							 		let dados = {
							 			key:index,
							 			hasLabel: hasLabel,
							 			contentLabel:contentLabel,
							 			atributsFormLabel:atributsFormLabel,
							 			atributsContainer:atributsContainer,
							 			atributsFormControl:atributsFormControl

							 		}
									
									switch(type.trim()){
										case 'text':
										case 'email':
										case 'number':
											return (<Col {...atributsContainer} ><FormControlInput key={index} data={dados} /></Col>)
										break;
										case 'radio':

											
											if(
												Array.isArray(options) && options.length > 0
											){
												return(<Col {...atributsContainer}>
													<Row>
														{
															options.map((itemOption, indexOption, arrOption)=>{
														 		let hasLabelOption				= itemOption.hasOwnProperty('hasLabel') 				? itemOption.hasLabel: false 
														 		let contentLabelOption			= itemOption.hasOwnProperty('contentLabel') 			? itemOption.contentLabel: '' 
														 		let atributsFormLabelOption		= itemOption.hasOwnProperty('atributsFormLabel') 		? itemOption.atributsFormLabel: {}
														 		let atributsContainerOption		= itemOption.hasOwnProperty('atributsContainer') 		? itemOption.atributsContainer: {}
														 		let atributsFormControlOption 	= itemOption.hasOwnProperty('atributsFormControl') 		? itemOption.atributsFormControl: {}

														 		let setValueRadio 				= atributsFormControlOption.hasOwnProperty('onChange') 	? atributsFormControlOption.onChange : null; 
														 		return (<Col xs="12" sm="12" md="6"><Radio setValue={setValueRadio} key={indexOption} hasLabel={hasLabelOption}  propsLabel={atributsFormLabelOption} label={contentLabelOption} {...atributsFormControlOption} /></Col>)

															})
														}
													</Row>
												</Col>)

											}
											

											
										break;
										case 'checkbox':

											let label 		= contentLabel;
											let propsLabel 	= atributsFormLabel;
											let setValue 	= atributsFormControl.hasOwnProperty('onChange') ? atributsFormControl.onChange : null; 

											return(<Col {...atributsContainer}><Checkbox setValue={setValue} propsLabel={propsLabel} hasLabel={hasLabel} label={label} {...atributsFormControl} /></Col>)
										break;
										default:
											return (<Col {...atributsContainer}><FormControlInput key={index} data={dados} /></Col>)
										break;

									}


									

							 	}) 
							:
							 ('')

						}
					</Row>
				</Card>
			</>
		)

}

export default Filter;