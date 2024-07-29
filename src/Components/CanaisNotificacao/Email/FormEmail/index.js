import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../../FormControl/index.js'
import FormControlSelect from '../../../FormControl/Select.js'
import {Col, Row, Button} from 'react-bootstrap';
import estilos from './FormEmail.module.css'
import Modal from '../../../Utils/Modal/index.js'
import useFetch from '../../../../Hooks/useFetch.js';
import {UserContex} from '../../../../Context/UserContex.js'
import Load from '../../../Utils/Load/index.js'
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CIDADE_SAVE_POST, CIDADE_UPDATE_POST, CIDADE_ONE_GET} from '../../../../api/endpoints/geral.js'
import Swal from 'sweetalert2'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormEmail = ({noUseModal, formikRef, setCarregando, dataEmailChoice, dataEstado, setIdEmail, idEmail, showModalCriarEmail, setShowModalCriarEmail, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)
    //dataEstado={dataEstado} setIdEmail={setIdEmail} idEmail={idEmail} carregando={false} dataEmailChoice={dataEmail} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarEmail={showModalAtualizarEmail} setShowModalCriarEmail={()=>{setShowModalAtualizarEmail();setCadastrarEmail()}} callback={callback} 
	const {data, error, request, loading} = useFetch();
	const fetchToEmail = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		mensagem,
			data_file, 
            email_dest,
            email_assunto,
            destinatario_id
		})=>{

    	const data = {
    		mensagem,
    		data_file, email_dest, email_assunto, destinatario_id

    	}

        if(atualizarCadastro == true){
            const {url, options} = CIDADE_UPDATE_POST(idEmail, data, getToken());


            const {response, json} = await request(url, options);
            if(json){                
                callback();
                setShowModalCriarEmail();
                setAtualizarCadastro(false);
                setIdEmail(null);

                Swal.fire({
                  icon: "success",
                  title: "",
                  text: 'Registrado com sucesso',
                  footer: '',//'<a href="#">Why do I have this issue?</a>'
                  confirmButtonColor: "#07B201",
                });
            }

        }else{


        	const {url, options} = CIDADE_SAVE_POST(data, getToken());
            const {response, json} = await request(url, options);
            if(json){            	
            	callback();
            	setShowModalCriarEmail();
                setAtualizarCadastro(false);

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


    const dataToFormEmail = ()=>{
    	let obj = {mensagem:'', data_file:'', email_dest:'', email_assunto:'', destinatario_id:''}
    	if(dataEmailChoice && dataEmailChoice.hasOwnProperty('registro')){
    		let data = dataEmailChoice.registro;
           
    		if(data.hasOwnProperty('mensagem')){
                obj.mensagem = data.mensagem;
    		}

    		if(data.hasOwnProperty('data_file')){
    			obj.data_file = data.data_file;
    		}
    		
            if(data.hasOwnProperty('email_dest')){
    			obj.email_dest = data.email_dest;
    		}
    		
            if(data.hasOwnProperty('email_assunto')){
    			obj.email_assunto = data.email_assunto;
    		}

    		if(data.hasOwnProperty('destinatario_id')){
    			obj.destinatario_id = data.destinatario_id;
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


    React.useEffect(()=>{
        if(!noUseModal && setCarregando){
            setCarregando(loading)
        }
    }, [loading])

	return(

		<>
			 <Formik 

                initialValues={{... dataToFormEmail()}}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.mensagem){
                            errors.mensagem="Obrigatório"
                        }

                        if(!values.data_file){
                            errors.data_file="Obrigatório"
                        }

                        if(!values.email_dest){
                            errors.email_dest="Obrigatório"
                        }

                        return errors;
                    }
                }

                onSubmit={async (values, {setSubmitting})=>{
                    
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
                    )=>{
                        if(!noUseModal){
                            formikRef.current = handleSubmit;
                        }
                        return (
                            <>
                            {
                                    carregando && carregando==true
                                    ?
                                        (<Load/>)
                                    :
                                        (                 
	                        <form onSubmit={()=>handleSubmit()}>
	                            <Row className="my-3">
	                        		<Col xs="12" sm="12" md="12">
	                        			<span className="label_title_grup_forms">Dados básicos</span>
	                        		</Col>
	                        	</Row>
	                        	<Row className="mb-3">
	                        		<Col xs="12" sm="12" md="12">
	                        			 <Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Email destinatário *',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'email_dest',
				                                            placeholder:'nome@exemplo.com',
				                                            id:'email_dest',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.email_dest,
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
				                            <ErrorMessage className="alerta_error_form_label" name="email_dest" component="div" />
                                        </Col>
	                        	</Row>
                                <Row className="mb-3">
	                        		<Col xs="12" sm="12" md="12">
	                        			 <Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Assunto',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'email_assunto',
				                                            placeholder:'nome@exemplo.com',
				                                            id:'email_assunto',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.email_assunto,
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
				                            <ErrorMessage className="alerta_error_form_label" name="email_assunto" component="div" />
                                        </Col>
	                        	</Row>

                                <Row className="mb-3">
	                        		<Col xs="12" sm="12" md="12">
	                        			 <Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Mensagem *',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'textarea',
                                                            as:'textarea',
                                                            rows:6,
				                                            name:'mensagem',
				                                            placeholder:'Digite sua mensagem',
				                                            id:'mensagem',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.mensagem,
				                                            className:`${estilos.input}`,
				                                            size:"sm",
				                                        },
				                                        atributsContainer:{
				                                            className:''
				                                        }
				                                    }
				                                }
				                               
				                                component={FormControlInput}
				                            ></Field>
				                            <ErrorMessage className="alerta_error_form_label" name="mensagem" component="div" />
                                        </Col>
	                        	</Row>

	                        	
	                        	<Row className="mb-3">                               

                                    <Col xs="12" sm="12" md="12">
                                        <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Adicionar arquivo *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'file',
                                                            name:'data_file',
                                                            placeholder:'fulano de tal',
                                                            id:'data_file',
                                                            multiple:'multiple',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.data_file,
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
                                            <ErrorMessage className="alerta_error_form_label" name="data_file" component="div" />
                                    </Col>
	                        		
	                        	</Row>
                                {noUseModal && (
                                    <Row className="justify-content-end mt-5">
                                        <Col xs="auto" >
                                            
                                            <Button variant="primary" onClick={handleSubmit} className="botao_success btn btn-sm" >
                                                {loading ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
                                            </Button>
                                        </Col>
                                    </Row>

                                )}
	                        </form>
                            )
                            
                            }       
                        </>
                        
                        )
                    }
                }
            </Formik>
		</>
	)
}

export default FormEmail;
