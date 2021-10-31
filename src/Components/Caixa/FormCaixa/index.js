import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import {Col, Row} from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormCaixa.module.css'

const FormCaixa = ({
			nome,
			setNome,
			tipo,
			setTipo,
			vr_minimo,
			setVrMinimo,
			vr_maximo,
			setVrMaximo,
			bloquear,
			setBloquear,
			aceita_transferencia,
			setAceitaTransferencia,
			vr_saldo_inicial,
			setVrSaldoInicial,
			...props
	})=>{

	const userLogar = ()=>{
        console.log('Aqui............')
    }

    nome 					= nome 					? nome 					: '';
    tipo 					= tipo 					? tipo 					: '';
    vr_minimo 				= vr_minimo 			? vr_minimo 			: '';
    vr_maximo 				= vr_maximo 			? vr_maximo 			: '';
    bloquear 				= bloquear 				? bloquear 				: '';
    aceita_transferencia  	= aceita_transferencia 	? aceita_transferencia 	: '';    
    vr_saldo_inicial 		= vr_saldo_inicial 		? vr_saldo_inicial 		: '';
	
	return(

		<>
			 <Formik 

                initialValues={{nome, tipo, vr_minimo, vr_maximo, bloquear, aceita_transferencia, vr_saldo_inicial}}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.nome){
                            errors.nome="Obrigatório"
                        }

                        if(!values.tipo){
                            errors.tipo="Obrigatório"
                        }

                        if(!values.vr_minimo){
                            errors.vr_minimo="Obrigatório"
                        }

                        if(!values.vr_maximo){
                            errors.vr_maximo="Obrigatório"
                        }

						if(!values.bloquear){
                            errors.bloquear="Obrigatório"
                        }

                        if(!values.aceita_transferencia){
                            errors.aceita_transferencia="Obrigatório"
                        }

                        if(!values.vr_saldo_inicial){
                            errors.vr_saldo_inicial="Obrigatório"
                        }

                        if(!values.logradouro){
                            errors.logradouro="Obrigatório"
                        }

                        if(!values.complemento){
                            errors.complemento="Obrigatório"
                        }

                        if(!values.numero){
                            errors.numero="Obrigatório"
                        }


                        if(!values.telefone){
                            errors.telefone="Obrigatório"
                        }

                        if(!values.celular){
                            errors.celular="Obrigatório"
                        }

                        if(!values.tp_telefone){
                            errors.tp_telefone="Obrigatório"
                        }

                        if(!values.tp_celular){
                            errors.tp_celular="Obrigatório"
                        }

                        if(!values.tp_email){
                            errors.tp_email="Obrigatório"
                        }

                        return errors;
                    }
                }

                onSubmit={(values, {setSubmitting})=>{
                    /*setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);*/
                      userLogar(values.nome, values.tipo)
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
                            <Row className="my-3">
                        		<Col xs="12" sm="12" md="12">
                        			<span className="label_title_grup_forms" >Dados básicos</span>
                        		</Col>
                        	</Row>
                        	<Row className="mb-1">
                        		<Col xs="12" sm="12" md="6">
                        			 <Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Nome',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'nome',
			                                            placeholder:'fulano de tal',
			                                            id:'nome',
			                                            onChange:(data)=>{handleChange(data);setNome(values.nome)},
			                                            onBlur:(data)=>{handleBlur(data);setNome(values.nome)},
			                                            value:values.nome,
			                                            className:`${estilos.input}`,
			                                            size:"sm"
			                                        },
			                                        atributsContainer:{
			                                            className:''
			                                        }
			                                    }
			                                }
			                               
			                                component={FormControlInput}
			                            ></Field>
			                            <ErrorMessage className="alerta_error_form_label" name="nome" component="div" />
                        		</Col>

                        		<Col xs="12" sm="12" md="6">
                        			<Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Tipo',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'tipo',
			                                            placeholder:'fulano de tal',
			                                            id:'tipo',
			                                            onChange:(data)=>{handleChange(data);setTipo(values.tipo)},
			                                            onBlur:(data)=>{handleBlur(data);setTipo(values.tipo)},
			                                            value:values.tipo,
			                                            className:estilos.input,
			                                            size:"sm"
			                                        },
			                                        atributsContainer:{
			                                            className:''
			                                        }
			                                    }
			                                }
			                               
			                                component={FormControlInput}
			                            ></Field>
			                            <ErrorMessage className="alerta_error_form_label" name="tipo" component="div" />
                        		</Col>
                        	</Row>

                        	<Row className="mb-1">
                        		<Col xs="12" sm="12" md="6">
                        			 <Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Valor mínimo',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'vr_minimo',
			                                            placeholder:'fulano de tal',
			                                            id:'vr_minimo',
			                                            onChange:(data)=>{handleChange(data);setVrMinimo(values.vr_minimo)},
			                                            onBlur:(data)=>{handleBlur(data);setVrMinimo(values.vr_minimo)},
			                                            value:values.vr_minimo,
			                                            className:estilos.input,
			                                            size:"sm"
			                                        },
			                                        atributsContainer:{
			                                            className:''
			                                        }
			                                    }
			                                }
			                               
			                                component={FormControlInput}
			                            ></Field>
			                            <ErrorMessage className="alerta_error_form_label" name="vr_minimo" component="div" />
                        		</Col>

                        		<Col xs="12" sm="12" md="6">
                        			<Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Valor máximo',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'vr_maximo',
			                                            placeholder:'fulano de tal',
			                                            id:'vr_maximo',
			                                            onChange:(data)=>{handleChange(data);setVrMaximo(values.vr_maximo)},
			                                            onBlur:(data)=>{handleBlur(data);setVrMaximo(values.vr_maximo)},
			                                            value:values.vr_maximo,
			                                            className:estilos.input,
			                                            size:"sm"
			                                        },
			                                        atributsContainer:{
			                                            className:''
			                                        }
			                                    }
			                                }
			                               
			                                component={FormControlInput}
			                            ></Field>
			                            <ErrorMessage className="alerta_error_form_label" name="vr_maximo" component="div" />
                        		</Col>
                        	</Row>
                        	<Row className="my-3">
                        		<Col xs="12" sm="12" md="12">
                        			<span className="label_title_grup_forms">Dados de complementares</span>
                        		</Col>
                        	</Row>
                        	<Row className="mb-1">
                        		<Col xs="12" sm="12" md="6">
                        			 <Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Bloquear',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'bloquear',
			                                            placeholder:'fulano de tal',
			                                            id:'bloquear',
			                                            onChange:(data)=>{handleChange(data);setBloquear(values.bloquear)},
			                                            onBlur:(data)=>{handleBlur(data);setBloquear(values.bloquear)},
			                                            value:values.bloquear,
			                                            className:estilos.input,
			                                            size:"sm"
			                                        },
			                                        atributsContainer:{
			                                            className:''
			                                        }
			                                    }
			                                }
			                               
			                                component={FormControlInput}
			                            ></Field>
			                            <ErrorMessage className="alerta_error_form_label" name="bloquear" component="div" />
                        		</Col>

                        		<Col xs="12" sm="12" md="6">
                        			<Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Aceita transferênica',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'aceita_transferencia',
			                                            placeholder:'fulano de tal',
			                                            id:'aceita_transferencia',
			                                            onChange:(data)=>{handleChange(data);setAceitaTransferencia(values.aceita_transferencia)},
			                                            onBlur:(data)=>{handleBlur(data);setAceitaTransferencia(values.aceita_transferencia)},
			                                            value:values.aceita_transferencia,
			                                            className:estilos.input,
			                                            size:"sm"
			                                        },
			                                        atributsContainer:{
			                                            className:''
			                                        }
			                                    }
			                                }
			                               
			                                component={FormControlInput}
			                            ></Field>
			                            <ErrorMessage className="alerta_error_form_label" name="aceita_transferencia" component="div" />
                        		</Col>
                        	</Row>
                        	<Row className="mb-1">
                        		<Col xs="12" sm="12" md="6">
                        			 <Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Saldo inicial',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'vr_saldo_inicial',
			                                            placeholder:'fulano de tal',
			                                            id:'vr_saldo_inicial',
			                                            onChange:(data)=>{handleChange(data);setVrSaldoInicial(values.vr_saldo_inicial)},
			                                            onBlur:(data)=>{handleBlur(data);setVrSaldoInicial(values.vr_saldo_inicial)},
			                                            value:values.vr_saldo_inicial,
			                                            className:estilos.input,
			                                            size:"sm"
			                                        },
			                                        atributsContainer:{
			                                            className:''
			                                        }
			                                    }
			                                }
			                               
			                                component={FormControlInput}
			                            ></Field>
			                            <ErrorMessage className="alerta_error_form_label" name="vr_saldo_inicial" component="div" />
                        		</Col>

                        		<Col xs="12" sm="12" md="6">
                        			<Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Bairro',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'bairro',
			                                            placeholder:'fulano de tal',
			                                            id:'bairro',
			                                            onChange:(data)=>{handleChange(data);console.log(values.vr_minimo)},
			                                            onBlur:(data)=>{handleBlur(data);console.log(values.vr_minimo)},
			                                            value:values.bairro,
			                                            className:estilos.input,
			                                            size:"sm"
			                                        },
			                                        atributsContainer:{
			                                            className:''
			                                        }
			                                    }
			                                }
			                               
			                                component={FormControlInput}
			                            ></Field>
			                            <ErrorMessage className="alerta_error_form_label" name="bairro" component="div" />
                        		</Col>
                        	</Row>
                        	
                        </form>
                    )
                }
            </Formik>
		</>
	)
}

export default FormCaixa;