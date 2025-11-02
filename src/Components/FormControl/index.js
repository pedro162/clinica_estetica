import React from 'react';
import { Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import {NumericFormat} from 'react-number-format';

const FormControlInput  =({data})=>{
    
    const hasLabel = data.hasOwnProperty('hasLabel') ? data.hasLabel : false;
    const contentLabel = data.hasOwnProperty('contentLabel') ? data.contentLabel : null;
    const atributsFormLabel =  data.hasOwnProperty('atributsFormLabel') ? data.atributsFormLabel : {};

    const atributsFormControl =  data.hasOwnProperty('atributsFormControl') ? data.atributsFormControl : {};
    const atributsContainer =  data.hasOwnProperty('atributsContainer') ? data.atributsContainer : {};

    const hasMask = data.hasOwnProperty('mask');
    const hasNumberFormat = data.hasOwnProperty('hasNumberFormat');
    
    return(
        <>
            <Form.Group {... atributsContainer} >
                {
                    hasLabel && contentLabel ? 
                        <Form.Label  {... atributsFormLabel}  >{contentLabel}</Form.Label>
                    :
                    null
                }

                {hasMask ? (
                    <InputMask mask={data.mask} {...atributsFormControl}>
                    {(inputProps) => <Form.Control {...inputProps} />}
                    </InputMask>
                ) : 
                hasNumberFormat ? (
                     <NumericFormat
                        class='form-control form-control-sm'
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix=""
                        decimalScale={2}
                        fixedDecimalScale
                        placeholder="0,00"
                        {...atributsFormControl}
                    />
                ): (

                    <Form.Control {...atributsFormControl}  />
                )}
                
            </Form.Group>
        </>
    )
}

export default FormControlInput;