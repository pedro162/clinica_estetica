import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row} from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormServico.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_SAVE_POST, SERVICO_ALL_POST, SERVICO_UPDATE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST} from '../../../api/endpoints/geral.js'


const FormServico = ({dataServicoChoice, setIdServico, idServico, showModalCriarServico, setShowModalCriarServico, callback, atualizarServico, setAtualizarServico, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataServico, setDataServico] = React.useState([])

	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		name,
    		vrServico,
		})=>{
			

    	const data = {
    		'name':name,
    		'vrServico':vrServico,
    	}

		if(atualizarServico == true){
            const {url, options} = SERVICO_UPDATE_POST(idServico, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save consulta here')
            console.log(json)
            if(json){
                console.log('Response Save consulta here')
                console.log(json)
                
                callback();
                setShowModalCriarServico();
                setAtualizarServico(false);
                setIdServico(null);
            }

        }else{


        	const {url, options} = SERVICO_SAVE_POST(data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save consulta here')
            console.log(json)
            if(json){
                console.log('Response Save consulta here')
            	console.log(json)
            	
            	callback();
            	setShowModalCriarServico();
                setAtualizarServico(false);
            }

        }
    }

    const requestAllServicos = async() =>{
       
        const {url, options} = SERVICO_ALL_POST({}, getToken());


        const {response, json} = await dataRequest.request(url, options);
        console.log('All consultas here')
        console.log(json)
        if(json){
            setDataServico(json)
        }else{

        	setDataServico([]);
        }

            
    }

	const dataToFormServico = ()=>{
    	let obj = {name:'', vrServico:''}
    	if(dataServicoChoice && dataServicoChoice.hasOwnProperty('mensagem')){
    		let data = dataServicoChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.name = data.name;
    		}

    		if(data.hasOwnProperty('vrServico')){
    			obj.vrServico = data.vrServico;
    		}
    		
    		
    	}

    	return obj;
    }

    React.useEffect(()=>{
    	const requesPais = async ()=>{
    		await requestAllServicos();
    	}
    	
    	requesPais();

    }, []);

    console.log('----------------------------- data pais ----------------------------------')
    console.log(dataToFormServico())
	return(

		<>
			 <Formik 

                initialValues={{...dataToFormServico()}}
                validate={
                    values=>{

                        const errors = {}

                        /* if(!values.name){
                            errors.name="Obrigatório"
                        } */
									
						if(!values.vrServico){
							errors.vrServico="Obrigatório"    			
						}


						if(!values.name){
						    errors.name="Obrigatório"
						}

						

                        return errors;
                    }
                }

                onSubmit={async(values, {setSubmitting})=>{
                    /*setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);*/
                      //alert('aqui')
					 
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

						<Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarServico == true ? 'Atualizar' : 'Cadastrar')+' Servico'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarServico} showHide={()=>{setShowModalCriarServico();setAtualizarServico(false);setIdServico(null);}}>
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

											<Row className="my-3">
												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Serviço *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'name',
																		placeholder:'Nome do serviço',
																		id:'name',
																		name_cod:'name',
																		name_desacription:'name',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.name,
																		className:`${estilos.input}`,
																		size:"sm"
																	},
																	atributsContainer:{
																		className:''
																	},
																}
															}
															component={FormControlInput}
													>   </Field>    
													<ErrorMessage className="alerta_error_form_label" name="name" component="div" />
												</Col>

												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Valor *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'vrServico',
																		placeholder:'0,00',
																		id:'vrServico',
																		name_cod:'vrServico',
																		name_desacription:'vrServico',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.vrServico,
																		className:`${estilos.input}`,
																		size:"sm"
																	},
																	atributsContainer:{
																		className:''
																	},
																}
															}
															component={FormControlInput}
													>   </Field>    
													<ErrorMessage className="alerta_error_form_label" name="vrServico" component="div" />
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

export default FormServico;
