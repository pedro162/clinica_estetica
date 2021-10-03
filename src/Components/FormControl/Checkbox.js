import React from 'react'
import { Form } from 'react-bootstrap';

const Checkbox = ({checked, label, setValue, value,propsLabel, ...props})=>{
	return(
			<>
				{label && <label {...propsLabel} >{label}</label>}
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
			</>
		)
}

export default Checkbox;