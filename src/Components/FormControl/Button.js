import React from 'react';
import {Button as ButtonBoostrap} from 'react-bootstrap'

const Button = ({type, classNameButton, typeButton, children, ... props})=>{

    if(typeButton == 'grid'){
        return (
            <div className="d-grid gap-2">
                <ButtonBoostrap  type={type} className={classNameButton ? classNameButton:''} variant="primary" size="lg" >
                    {children}
                </ButtonBoostrap>
            </div>
        )
    }else{
        return (
            <ButtonBoostrap>
                {children}
            </ButtonBoostrap>
        )
    }
    
}

export default Button;