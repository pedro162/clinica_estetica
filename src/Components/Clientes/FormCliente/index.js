import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row} from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormCliente.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Load from '../../Utils/Load/index.js'
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_SAVE_POST, CLIENTES_UPDATE_POST, CLIENTES_ONE_GET} from '../../../api/endpoints/geral.js'
import Atualizar from '../Atualizar/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'

const FormCliente = ({dataClienteChoice, dataGrupo, setIdcliente, idCliente, showModalCriarCliente, setShowModalCriarCliente, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)

	const {data, error, request, loading} = useFetch();
	const fetchToClient = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		nome,
			sobrenome,
			documento,
			doc_complementar,
			cep,
			pais,
			uf,
			logradouro,
			complemento,
			numero,
			telefone,
			celular,
			tp_telefone,
			tp_celular,
			tp_email,
			email,
			bairro,
            groupo_id,
			nascimento_fundacao,
		})=>{

    	const data = {
    		'name':nome,
    		'name_opcional':sobrenome,
    		'documento':documento,
            'documento_complementar':doc_complementar,
            'nascimento_fundacao':nascimento_fundacao,
            'sexo':'m',
            'email':email,
            'cep':cep,
            'logradouro':logradouro,
            'numero':numero,
            'tipo':'casa',
			'complemento':complemento,
			'bairro':bairro,
            'cidade':'São luis',
            'estado':uf,
            'bloco':null,
            'celular_1':celular,
            'celular_2':celular,
            'telefone':telefone,
            'idUser':1,
            'groupo_id':groupo_id,
			'pais_id':pais,

    	}

        if(atualizarCadastro == true){
            const {url, options} = CLIENTES_UPDATE_POST(idCliente, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
                console.log(json)
                
                callback();
                setShowModalCriarCliente();
                setAtualizarCadastro(false);
                setIdcliente(null);
            }

        }else{


        	const {url, options} = CLIENTES_SAVE_POST(data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
            	console.log(json)
            	
            	callback();
            	setShowModalCriarCliente();
                setAtualizarCadastro(false);
            }

        }
    }


    const dataToFormCliente = ()=>{
    	let obj = {nome:'', sobrenome:'', documento:'', doc_complementar:'', cep:'', pais:'', uf:'',logradouro:'',complemento:'', numero:'', telefone:'', celular:'', tp_telefone:'', tp_celular:'', tp_email:'', nascimento_fundacao:'', groupo_id:'', bairro:''}
    	if(dataClienteChoice && dataClienteChoice.hasOwnProperty('mensagem')){
    		let data = dataClienteChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.nome = data.name;
    		}

    		if(data.hasOwnProperty('name_opcional')){
    			obj.sobrenome = data.name_opcional;
    		}
    		if(data.hasOwnProperty('documento')){
    			obj.documento = data.documento;
    		}
    		if(data.hasOwnProperty('documento_complementar')){
    			obj.doc_complementar = data.documento_complementar;
    		}

			if(data.hasOwnProperty('nascimento_fundacao')){
    			obj.nascimento_fundacao = data.nascimento_fundacao;
    		}

            if(data.hasOwnProperty('email')){
                obj.email = data.email;
            }

            if(data.hasOwnProperty('tp_email')){
                obj.tp_email = data.tp_email;
            }

            if(! data.hasOwnProperty('tp_email')){
                obj.tp_email = 'principal';
            }

    		if(data.hasOwnProperty('logradouro')){
    			if(Array.isArray(data.logradouro) && data.logradouro.length > 0){
    				for(let i=0; !(i==data.logradouro.length); i++){
    					let atual = data.logradouro[i];
    					if(atual.hasOwnProperty('importancia') && atual.importancia.trim() == 'principal'){
    						obj.cep = atual.cep;
    						obj.uf = atual.estado;
    						obj.logradouro = atual.logradouro;
    						obj.complemento = atual.complemento;
    						obj.numero = atual.numero;
                            obj.bairro = atual.bairro;

							if(atual.hasOwnProperty('estado_logradouro') && atual.estado_logradouro.hasOwnProperty('pais_id')){
								obj.pais = atual.estado_logradouro.pais_id;

							}

    						break;
    					}
    				}
    			}
    			
    		}

    		if(data.hasOwnProperty('grupo')){
    			if(Array.isArray(data.grupo) && data.grupo.length > 0){
    				for(let i=0; !(i==data.grupo.length); i++){
    					let atual = data.grupo[i];
    					if(atual.hasOwnProperty('id') && atual.id > 0){
    						obj.groupo_id = atual.id;
    						
    					}
    				}
    			}
    			
    		}

    		if(data.hasOwnProperty('telefone')){
    			if(Array.isArray(data.telefone) && data.telefone.length > 0){
    				for(let i=0; !(i==data.telefone.length); i++){
    					let atual = data.telefone[i];
    					if(atual.hasOwnProperty('id') && atual.id > 0){
    						
    						if(atual.hasOwnProperty('tipo') && atual.tipo == 'celular' && atual.hasOwnProperty('importancia') && atual.importancia == "principal" ){
    							obj.celular =  atual.numero;
                                obj.tp_celular =  atual.importancia;
    						}

    						if(atual.hasOwnProperty('tipo') && atual.tipo == 'fixo'){
    							obj.telefone =  atual.numero;
                                obj.tp_telefone =  atual.importancia;
    						}
    						
    					}
    				}
    			}
    			
    		}

    		
    	}
    	console.log('dados para formulario ----------')
    	//console.log(obj)
    	return obj;
    }
    
   /* if(atualizarCadastro){
        return(
            <Modal  handleConcluir={()=>null}  title={'Cadastrar Cliente ..'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarCliente} showHide={()=>{setShowModalCriarCliente();}}>
                {carregandoDadosChoice && <Load/>}
                <Atualizar
                    idCliente={idCliente} 
                    setDataCliente={setDataClienteChoice}
                    setCarregandoDadosCliente={setCarregandoDadosChoice}
                />
             </Modal>
        )
    }
   */
    const preparaGrupoToForm = ()=>{
        let grupoFormat = [{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}}]
        if(dataGrupo && dataGrupo.hasOwnProperty('registro') ){
            
            if(Array.isArray(dataGrupo.registro) && dataGrupo.registro.length > 0){


                for(let i=0; !(i==dataGrupo.registro.length); i++){
                    let atual = dataGrupo.registro[i];
                    let name    = atual.hasOwnProperty('name')      ? atual.name : '';
                    let id      = atual.hasOwnProperty('id')        ? atual.id : '';
                    grupoFormat.push(
                        {label:name,valor:id,props:{}}
                    )
                }

            }
            
        }

        console.log('-------------grupo agui----------------------')
        console.log(dataGrupo)
        console.log('-------------grupo agui----------------------')

        return grupoFormat;
    }
    

	return(

		<>
			 <Formik 

                initialValues={{... dataToFormCliente()}}
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

                        if(!values.email){
                            errors.email="Obrigatório"
                        }

						if(!values.bairro){
                            errors.bairro="Obrigatório"
                        }
                        if(!values.nascimento_fundacao){
                            errors.nascimento_fundacao="Obrigatório"
                        }

                        if(!values.groupo_id){
                            errors.groupo_id="Obrigatório"
                        }

                        return errors;
                    }
                }

                onSubmit={async (values, {setSubmitting})=>{
                    /*setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);*/
                      //alert(values.nome)
                      await sendData({...values});
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

                        <Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarCadastro == true ? 'Atualizar' : 'Cadastrar')+' Cliente'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarCliente} showHide={()=>{setShowModalCriarCliente();setAtualizarCadastro(false);setIdcliente(null);}}>
                                
								{
									
                                    carregando && carregando==true
                                    ?
                                        (<Load/>)
                                    :
                                        (                 
	                        <form onSubmit={handleSubmit}>
	                            <Row className="my-3">
	                        		<Col xs="12" sm="12" md="12">
	                        			<span className="label_title_grup_forms">Dados básicos</span>
	                        		</Col>
	                        	</Row>
								{
									error && <Row className="my-3">
	                        			<Col xs="12" sm="12" md="12">
											<AlertaDismissible title="Atenção:" message={error} variant={"danger"} />
	                        			</Col>
									</Row>
								}
	                        	<Row className="mb-1">
	                        		<Col xs="12" sm="12" md="6">
	                        			 <Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Nome *',
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
				                                        contentLabel:'Cpf *',
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
	                        	<Row className="mb-1">
	                        		<Col xs="12" sm="12" md="6">
	                        			 <Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Nascimento',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'date',
				                                            name:'nascimento_fundacao',
				                                            placeholder:'fulano de tal',
				                                            id:'nascimento_fundacao',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.nascimento_fundacao,
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
				                            <ErrorMessage className="alerta_error_form_label" name="nascimento_fundacao" component="div" />
	                        		</Col>

	                        		<Col xs="12" sm="12" md="6">
	                        			<Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Grupo * ',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'groupo_id',
				                                            placeholder:'fulano de tal',
				                                            id:'groupo_id',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.groupo_id,
				                                            className:estilos.input,
				                                            size:"sm"
				                                        },
				                                        options:[...preparaGrupoToForm()],
				                                        atributsContainer:{
				                                            className:''
				                                        }
				                                    }
				                                }
				                               
				                                component={FormControlSelect}
				                            ></Field>
				                            <ErrorMessage className="alerta_error_form_label" name="groupo_id" component="div" />
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
				                                        contentLabel:'Cep *',
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
				                                        contentLabel:'Pais *',
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
				                                        options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'Brasil',valor:'1',props:{}},{label:'Argentina',valor:'2',props:{}}],
				                                        atributsContainer:{
				                                            className:''
				                                        }
				                                    }
				                                }
				                               
				                                component={FormControlSelect}
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
				                                        contentLabel:'Estado *',
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
				                                        options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'Maranhão',valor:'1',props:{}},{label:'São paulo',valor:'2',props:{}}],
				                                        atributsContainer:{
				                                            className:''
				                                        }
				                                    }
				                                }
				                               
				                                component={FormControlSelect}
				                            ></Field>
				                            <ErrorMessage className="alerta_error_form_label" name="uf" component="div" />
	                        		</Col>

	                        		<Col xs="12" sm="12" md="6">
	                        			<Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Bairro *',
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
				                                        contentLabel:'Logradouro *',
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
				                                        contentLabel:'Complemento *',
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
				                                        contentLabel:'Número *',
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
				                                        contentLabel:'Telefone *',
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
				                                        contentLabel:'Tipo de telefone *',
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
				                                        contentLabel:'Celular *',
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
				                                        contentLabel:'Tipo de celular *',
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

                        </Modal>
                    )
                }
            </Formik>
		</>
	)
}

export default FormCliente;
