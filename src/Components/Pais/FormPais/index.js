import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row} from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormPais.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Swal from 'sweetalert2'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, PAIS_SAVE_POST, PAIS_UPDATE_POST} from '../../../api/endpoints/geral.js'


const FormPais = ({dataPaisChoice, dataGrupo, setIdPais, idPais, showModalCriarPais, setShowModalCriarPais,  atualizarCadastro, setAtualizarCadastro, carregando, callback})=>{

	const {data, error, request, loading} = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		nome,
			cod_pais,
			padrao
		})=>{



    	const data = {
    		'nmPais':nome,
    		'cdPais':cod_pais,
    		'padrao':padrao,
    	}

    	
        if(atualizarCadastro == true){
            const {url, options} = PAIS_UPDATE_POST(idPais, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
                console.log(json)
                
                callback();
                setShowModalCriarPais();
                setAtualizarCadastro(false);
                setIdPais(null);

                Swal.fire({
	              icon: "success",
	              title: "",
	              text: 'Registrado com sucesso',
	              footer: '',//'<a href="#">Why do I have this issue?</a>'
	              confirmButtonColor: "#07B201",
	            });
            }

        }else{
        	const {url, options} = PAIS_SAVE_POST(data, getToken());


	        const {response, json} = await request(url, options);
	        console.log('Save clients here')
	        console.log(json)
	        if(json){
	            console.log('Response Save clients here')
	        	console.log(json)
	        	
	        	callback();
	        	setShowModalCriarPais();

	        	Swal.fire({
	              icon: "success",
	              title: "",
	              text: 'Registrado com sucesso',
	              footer: '',//'<a href="#">Why do I have this issue?</a>'
	              confirmButtonColor: "#07B201",
	            });
	        }


        }
    }


    const dataToFormPais = ()=>{
    	let obj = {namenome:'', nome: '', cod_pais:'', padrao:''}
    	if(dataPaisChoice && dataPaisChoice.hasOwnProperty('mensagem')){
    		let data = dataPaisChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.name = obj.namenome = obj.nome = data.name;
    		}

    		if(data.hasOwnProperty('nmPais')){
                obj.name = obj.namenome = obj.nome = data.nmPais;
    		}



    		if(data.hasOwnProperty('cod_pais')){
                obj.cod_pais = data.cod_pais;
    		}

    		if(data.hasOwnProperty('cdPais')){
                obj.cod_pais = data.cdPais;
    		}

    		if(data.hasOwnProperty('padrao')){
                obj.padrao = data.padrao;
    		}

    	}
    	
    	//console.log(obj)
    	return obj;
    }

    if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
            footer: '',//'<a href="#">Why do I have this issue?</a>'
            confirmButtonColor: "#07B201",
            //width:'20rem',
        });
    }
    

	return(

		<>
			 <Formik 

                initialValues={{... dataToFormPais()}}
                enableReinitialize={true}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.nome){
                            errors.nome="Obrigatório"
                        }

                        if(!values.cod_pais){
                            errors.cod_pais="Obrigatório"
                        }


                        if(!values.padrao){
                            errors.padrao="Obrigatório"
                        }

                        return errors;
                    }
                }

                onSubmit={async(values, {setSubmitting})=>{
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

                        <Modal  handleConcluir={()=>{handleSubmit(); }}  title={'Cadastrar Pais'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarPais} showHide={()=>{setShowModalCriarPais();setAtualizarCadastro(false);setIdPais(null);}}>

	                        <form onSubmit={handleSubmit}>
	                            <Row className="my-3">
	                        		<Col xs="12" sm="12" md="12">
	                        			<span className="label_title_grup_forms">Dados básicos</span>
	                        		</Col>
	                        	</Row>
	                        	<Row className="mb-1">
	                        		<Col xs="12" sm="12" md="12">
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

	                        		
	                        	</Row>

	                        	<Row className="mb-1">
	                        		<Col xs="12" sm="12" md="6">
	                        			 <Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Código *',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'cod_pais',
				                                            placeholder:'fulano de tal',
				                                            id:'cod_pais',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.cod_pais,
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
				                            <ErrorMessage className="alerta_error_form_label" name="cod_pais" component="div" />
	                        		</Col>

	                        		<Col xs="12" sm="12" md="6">
	                        			<Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Padrão',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'padrao',
				                                            placeholder:'fulano de tal',
				                                            id:'padrao',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.padrao,
				                                            className:estilos.input,
				                                            size:"sm"
				                                        },
				                                        options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'Sim',valor:'yes',props:{}},{label:'Não',valor:'no',props:{}}],
				                                        atributsContainer:{
				                                            className:''
				                                        }
				                                    }
				                                }
				                               
				                                component={FormControlSelect}
				                            ></Field>
				                            <ErrorMessage className="alerta_error_form_label" name="padrao" component="div" />
	                        		</Col>
	                        	</Row>                        

	                        </form>

                        </Modal>
                    )
                }
            </Formik>
		</>
	)
}

export default FormPais;
