import React from 'react'
import { Form } from 'react-bootstrap';

const Checkbox = ({checked, hasLabel,label, setValue, value,propsLabel, ...props})=>{
	return(
			<>
				
				<label {...propsLabel}  style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'flex-start',alignItems:'center'}}>
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
					<span style={{marginLeft:'4px'}}>{hasLabel ? label: ''}</span>
				</label>
				
			</>
		)
}

export default Checkbox;