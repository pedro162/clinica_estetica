import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import {Col, Row} from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormCliente.module.css'

const FormCliente = (props)=>{

	const userLogar = ()=>{
        console.log('Aqui............')
    }

	return(

		<>
			 <Formik 

                initialValues={{nome:'', sobrenome:'', documento:'', doc_complementar:'', cep:'', pais:'', uf:'',logradouro:'',complemento:'', numero:'', telefone:'', celular:'', tp_telefone:'', tp_celular:'', tp_email:''}}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.nome){
                            errors.nome="Obrigatório"
                        }

                        if(!values.sobrenome){
                            errors.sobrenome="Obrigatório"
                        }

                        if(!values.documento){
                            errors.documento="Obrigatório"
                        }

                        if(!values.doc_complementar){
                            errors.doc_complementar="Obrigatório"
                        }

						if(!values.cep){
                            errors.cep="Obrigatório"
                        }

                        if(!values.pais){
                            errors.pais="Obrigatório"
                        }

                        if(!values.uf){
                            errors.uf="Obrigatório"
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
                      userLogar(values.nome, values.sobrenome)
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
                        			<span className="label_title_grup_forms">Dados básicos</span>
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
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
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
			                                        contentLabel:'Sobrenome',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'sobrenome',
			                                            placeholder:'fulano de tal',
			                                            id:'sobrenome',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.sobrenome,
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
			                            <ErrorMessage className="alerta_error_form_label" name="sobrenome" component="div" />
                        		</Col>
                        	</Row>

                        	<Row className="mb-1">
                        		<Col xs="12" sm="12" md="6">
                        			 <Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Cpf',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'documento',
			                                            placeholder:'fulano de tal',
			                                            id:'documento',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.documento,
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
			                            <ErrorMessage className="alerta_error_form_label" name="documento" component="div" />
                        		</Col>

                        		<Col xs="12" sm="12" md="6">
                        			<Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'RG',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'doc_complementar',
			                                            placeholder:'fulano de tal',
			                                            id:'doc_complementar',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.doc_complementar,
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
			                            <ErrorMessage className="alerta_error_form_label" name="doc_complementar" component="div" />
                        		</Col>
                        	</Row>
                        	<Row className="my-3">
                        		<Col xs="12" sm="12" md="12">
                        			<span className="label_title_grup_forms">Dados de endereço</span>
                        		</Col>
                        	</Row>
                        	<Row className="mb-1">
                        		<Col xs="12" sm="12" md="6">
                        			 <Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Cep',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'cep',
			                                            placeholder:'fulano de tal',
			                                            id:'cep',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.cep,
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
			                            <ErrorMessage className="alerta_error_form_label" name="cep" component="div" />
                        		</Col>

                        		<Col xs="12" sm="12" md="6">
                        			<Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Pais',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'pais',
			                                            placeholder:'fulano de tal',
			                                            id:'pais',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.pais,
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
			                            <ErrorMessage className="alerta_error_form_label" name="pais" component="div" />
                        		</Col>
                        	</Row>
                        	<Row className="mb-1">
                        		<Col xs="12" sm="12" md="6">
                        			 <Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Estado',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'uf',
			                                            placeholder:'fulano de tal',
			                                            id:'uf',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.uf,
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
			                            <ErrorMessage className="alerta_error_form_label" name="uf" component="div" />
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
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
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
                        	<Row className="mb-1">
                        		<Col xs="12" sm="12" md="6">
                        			 <Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Logradouro',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'logradouro',
			                                            placeholder:'fulano de tal',
			                                            id:'logradouro',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.logradouro,
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
			                            <ErrorMessage className="alerta_error_form_label" name="logradouro" component="div" />
                        		</Col>

                        		<Col xs="12" sm="12" md="6">
                        			<Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Complemento',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'complemento',
			                                            placeholder:'fulano de tal',
			                                            id:'complemento',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.complemento,
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
			                            <ErrorMessage className="alerta_error_form_label" name="complemento" component="div" />
                        		</Col>
                        	</Row>
                        	<Row className="mb-1">
                        		<Col xs="12" sm="12" md="6">
                        			 <Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Número',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'numero',
			                                            placeholder:'fulano de tal',
			                                            id:'numero',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.numero,
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
			                            <ErrorMessage className="alerta_error_form_label" name="numero" component="div" />
                        		</Col>
                        	</Row>
                        	<Row className="my-3">
                        		<Col xs="12" sm="12" md="12">
                        			<span className="label_title_grup_forms" >Dados para contato</span>
                        		</Col>
                        	</Row>
                        	<Row className="mb-1">
                        		<Col xs="12" sm="12" md="6">
                        			 <Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Telefone',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'telefone',
			                                            placeholder:'fulano de tal',
			                                            id:'telefone',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.telefone,
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
			                            <ErrorMessage className="alerta_error_form_label" name="telefone" component="div" />
                        		</Col>
                        		<Col xs="12" sm="12" md="6">
                        			 <Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Tipo de telefone',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'tp_telefone',
			                                            placeholder:'fulano de tal',
			                                            id:'tp_telefone',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.tp_telefone,
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
			                            <ErrorMessage className="alerta_error_form_label" name="tp_telefone" component="div" />
                        		</Col>
                        	</Row>
                        	<Row className="mb-1">
                        		<Col xs="12" sm="12" md="6">
                        			<Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Celular',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'celular',
			                                            placeholder:'fulano de tal',
			                                            id:'celular',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.celular,
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
			                            <ErrorMessage className="alerta_error_form_label" name="celular" component="div" />
                        		</Col>
                        		<Col xs="12" sm="12" md="6">
                        			<Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Tipo de celular',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'tp_celular',
			                                            placeholder:'fulano de tal',
			                                            id:'tp_celular',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.tp_celular,
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
			                            <ErrorMessage className="alerta_error_form_label" name="tp_celular" component="div" />
                        		</Col>
                        	</Row>                            

							<Row className="mb-1">
                        		<Col xs="12" sm="12" md="6">
                        			 <Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Email',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'email',
			                                            placeholder:'fulano de tal',
			                                            id:'email',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.email,
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
			                            <ErrorMessage className="alerta_error_form_label" name="email" component="div" />
                        		</Col>

                        		<Col xs="12" sm="12" md="6">
                        			 <Field
			                                data={
			                                    {
			                                        hasLabel:true,
			                                        contentLabel:'Tipo de email',
			                                        atributsFormLabel:{

			                                        },
			                                        atributsFormControl:{
			                                            type:'text',
			                                            name:'tp_email',
			                                            placeholder:'fulano de tal',
			                                            id:'tp_email',
			                                            onChange:handleChange,
			                                            onBlur:handleBlur,
			                                            value:values.tp_email,
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
			                            <ErrorMessage className="alerta_error_form_label" name="tp_email" component="div" />
                        		</Col>


                        	</Row>                            

                        </form>
                    )
                }
            </Formik>
		</>
	)
}

export default FormCliente;