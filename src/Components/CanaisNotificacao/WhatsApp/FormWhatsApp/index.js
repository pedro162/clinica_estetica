import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../../FormControl/index.js'
import FormControlSelect from '../../../FormControl/Select.js'
import {Col, Row, Button} from 'react-bootstrap';
import estilos from './FormWhatsApp.module.css'
import Modal from '../../../Utils/Modal/index.js'
import useFetch from '../../../../Hooks/useFetch.js';
import {UserContex} from '../../../../Context/UserContex.js'
import Load from '../../../Utils/Load/index.js'
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CIDADE_SAVE_POST, CIDADE_UPDATE_POST, CIDADE_ONE_GET} from '../../../../api/endpoints/geral.js'
import Swal from 'sweetalert2'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormWhatsApp = ({noUseModal, dataWhatsApp, setCarregando, formikRef, dataEstado, setIdWhatsApp, idWhatsApp, showModalCriarWhatsApp, setShowModalCriarWhatsApp, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)
    //dataEstado={dataEstado} setIdWhatsApp={setIdWhatsApp} idWhatsApp={idWhatsApp} carregando={false} dataWhatsApp={dataWhatsApp} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarWhatsApp={showModalAtualizarWhatsApp} setShowModalCriarWhatsApp={()=>{setShowModalAtualizarWhatsApp();setCadastrarWhatsApp()}} callback={callback} 
	const {data, error, request, loading} = useFetch();
    const [file, setFile] = React.useState(null);
	const fetchToWhatsApp = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const sendData = async ({
    		mensagem, data_file, whats_dest, destinatario_id
            
		})=>{

    	const data = {
    		mensagem,
            data_file,
            whats_dest,
            destinatario_id

    	}

        if(atualizarCadastro == true){
            const {url, options} = CIDADE_UPDATE_POST(idWhatsApp, data, getToken());
            const {response, json} = await request(url, options);
            if(json){
                
                callback();
                setShowModalCriarWhatsApp();
                setAtualizarCadastro(false);
                setIdWhatsApp(null);

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
            	setShowModalCriarWhatsApp();
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


    const dataToFormWhatsApp = ()=>{
    	let obj = {mensagem:'', data_file:'', whats_dest:'', destinatario_id:''}
    	if(dataWhatsApp && dataWhatsApp.hasOwnProperty('registro')){
    		let data = dataWhatsApp.registro;
           
    		if(data.hasOwnProperty('mensagem')){
                obj.mensagem = data.mensagem;
    		}

    		if(data.hasOwnProperty('data_file')){
    			obj.data_file = data.data_file;
    		}
    		
            if(data.hasOwnProperty('whats_dest')){
    			obj.whats_dest = data.whats_dest;
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

                initialValues={{... dataToFormWhatsApp()}}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.mensagem){
                            errors.mensagem="Obrigatório"
                        }

                        if(!values.data_file){
                            errors.data_file="Obrigatório"
                        }

                        if(!values.whats_dest){
                            errors.whats_dest="Obrigatório"
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
                            isSubmitting,
                            ...formik
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
                                                            contentLabel:'WhatsApp destinatário *',
                                                            atributsFormLabel:{

                                                            },
                                                            atributsFormControl:{
                                                                type:'text',
                                                                name:'whats_dest',
                                                                placeholder:'99999999999',
                                                                id:'whats_dest',
                                                                onChange:handleChange,
                                                                onBlur:handleBlur,
                                                                value:values.whats_dest,
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
                                                <ErrorMessage className="alerta_error_form_label" name="whats_dest" component="div" />
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
                                                                rows:3,
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

export default FormWhatsApp;
