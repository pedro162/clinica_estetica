
import React from 'react'
import { Form, Row, Col } from 'react-bootstrap';

const Radio = ({checked, hasLabel, label, setValue, value,propsLabel, ...props})=>{
	return(
			<>

				<label {...propsLabel} style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'flex-start',alignItems:'center'}}>
					<Form.Check 
						aria-label="option {value}"
						type="switch"
						checked={checked}
						value={value}
						onChange={
							({target})=>setValue(target)
						}

						{...props}
					/>
					<span style={{marginLeft:'4px'}}>{hasLabel ? label : ''}</span>
				</label>
			</>
		)
}

export default Radio;