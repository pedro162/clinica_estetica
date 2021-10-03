import React from 'react';
import { Form } from 'react-bootstrap';

const FormControlInput  =({data})=>{
    
    const hasLabel = data.hasOwnProperty('hasLabel') ? data.hasLabel : false;
    const contentLabel = data.hasOwnProperty('contentLabel') ? data.contentLabel : null;
    const atributsFormLabel =  data.hasOwnProperty('atributsFormLabel') ? data.atributsFormLabel : {};

    const atributsFormControl =  data.hasOwnProperty('atributsFormControl') ? data.atributsFormControl : {};
    const atributsContainer =  data.hasOwnProperty('atributsContainer') ? data.atributsContainer : {};

    return(
        <>
            <Form.Group {... atributsContainer} >
                {
                    hasLabel && contentLabel ? 
                        <Form.Label  {... atributsFormLabel}  >{contentLabel}</Form.Label>
                    :
                    null
                }
                <Form.Control {... atributsFormControl}  />
            </Form.Group>
        </>
    )
}

export default FormControlInput;