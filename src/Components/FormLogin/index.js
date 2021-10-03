import Reaact from 'react';
import estilos from './FormLogin.module.css';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../FormControl/index.js'

import Button from '../FormControl/Button.js';

const FormLogin = ({logar, ...props})=>{
    const userLogar = (user, password)=>{
        logar(user, password)

    }

    return(
        <>
            <Formik
                initialValues={{user:'', password:''}}
                validate={
                    values=>{
                        const errors = {}
                        if(!values.user){
                            errors.user="Obrigatório"
                        }

                        if(!values.password){
                            errors.password="Obrigatório"
                        }

                        return errors;
                    }
                }

                onSubmit={(values, {setSubmitting})=>{
                    /*setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);*/
                      userLogar(values.user, values.password)
                }}
            >
                {
                    (
                        {
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting
                        }
                    )=>(

                        <form onSubmit={handleSubmit}>
                            

                            <Field
                                data={
                                    {
                                        hasLabel:false,
                                        contentLabel:'Usuário',
                                        atributsFormLabel:{

                                        },
                                        atributsFormControl:{
                                            type:'email',
                                            name:'user',
                                            placeholder:'usuairo@exemplo.com',
                                            id:'user',
                                            onChange:handleChange,
                                            onBlur:handleBlur,
                                            value:values.user,
                                            className:estilos.input
                                        },
                                        atributsContainer:{
                                            className:''
                                        }
                                    }
                                }
                               
                                component={FormControlInput}
                            ></Field>
                            <ErrorMessage name="user" component="div" />

                            <Field
                                data={
                                    {
                                        hasLabel:false,
                                        contentLabel:'Senha',
                                        atributsFormLabel:{

                                        },
                                        atributsFormControl:{
                                            type:'password',
                                            name:'password',
                                            placeholder:'senha',
                                            id:'password',
                                            onChange:handleChange,
                                            onBlur:handleBlur,
                                            value:values.password,
                                            className:estilos.input
                                        },
                                        atributsContainer:{
                                            className:''
                                        }
                                        
                                    }
                                }
                               
                                component={FormControlInput}
                            ></Field>
                            <ErrorMessage name="password" component="div" />
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                size="lg"
                                typeButton="grid"
                                classNameButton={estilos.btn_concluir}
                            >
                                Entrar
                            </Button>
                        </form>
                    )
                }
            </Formik>
        </>
    )
}


export default FormLogin;