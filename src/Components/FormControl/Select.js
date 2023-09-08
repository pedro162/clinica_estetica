import React from 'react';
import { Form } from 'react-bootstrap';

const FormControlSelect  =({data})=>{
    
    const hasLabel 				= data.hasOwnProperty('hasLabel') ? data.hasLabel : false;
    const contentLabel 			= data.hasOwnProperty('contentLabel') ? data.contentLabel : null;
    const atributsFormLabel 	=  data.hasOwnProperty('atributsFormLabel') ? data.atributsFormLabel : {};

    const atributsFormControl 	= data.hasOwnProperty('atributsFormControl') ? data.atributsFormControl : {};
    const atributsContainer 	= data.hasOwnProperty('atributsContainer') ? data.atributsContainer : {};
    const options 				= data.hasOwnProperty('options') ? data.options : [];

    return(
        <>
            <Form.Group {... atributsContainer} >
                {
                    hasLabel && contentLabel ? 
                        <Form.Label  {... atributsFormLabel}  >{contentLabel}</Form.Label>
                    :
                    null
                }
                <Form.Select {... atributsFormControl}  >
                	{
                		Array.isArray(options) && options.length > 0 
                		?
	                		options.map((item, index, arr)=>{
		                		let label 			= item.hasOwnProperty('label') ? item.label : '';
		                		let valor 			=  item.hasOwnProperty('valor') ? item.valor : item.hasOwnProperty('value') ? item.value : '';
		                		let atributosItem 	=  item.hasOwnProperty('props') ? item.props : {};
		                		return(
		                			<option {...atributosItem} key={index} value={valor} >{label}</option>
		                		)
		                	})
	                	: 
	                		''
	                }
                	
                </Form.Select>
            </Form.Group>
        </>
    )
}

export default FormControlSelect;