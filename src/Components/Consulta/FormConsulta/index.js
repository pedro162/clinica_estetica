import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row} from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormConsulta.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_SAVE_POST, CONSULTA_ALL_POST, CONSULTA_UPDATE_POST} from '../../../api/endpoints/geral.js'


const FormConsulta = ({dataConsultaChoice, setIdcliente, idConsulta, showModalCriarConsulta, setShowModalCriarConsulta, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataConsulta, setDataConsulta] = React.useState([])

	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		name,
    		historico,
			pessoa_id,
			dt_marcado,
			hr_marcado,
			prioridade,
			status,
			profissional_id,
			filial_id,
		})=>{


    	const data = {
    		'name':name,
    		'historico':historico,
    		'pessoa_id':pessoa_id,
    		'dt_marcado':dt_marcado,
    		'hr_marcado':hr_marcado,
    		'prioridade':prioridade,
    		'status':status,
    		'profissional_id':profissional_id,
    		'filial_id':filial_id,
    	}

		if(atualizarCadastro == true){
            const {url, options} = CONSULTA_UPDATE_POST(idConsulta, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save consulta here')
            console.log(json)
            if(json){
                console.log('Response Save consulta here')
                console.log(json)
                
                callback();
                setShowModalCriarConsulta();
                setAtualizarCadastro(false);
                setIdcliente(null);
            }

        }else{


        	const {url, options} = CONSULTA_SAVE_POST(data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save consulta here')
            console.log(json)
            if(json){
                console.log('Response Save consulta here')
            	console.log(json)
            	
            	callback();
            	setShowModalCriarConsulta();
                setAtualizarCadastro(false);
            }

        }
    }

    const requestAllConsultas = async() =>{
       
        const {url, options} = CONSULTA_ALL_POST({}, getToken());


        const {response, json} = await dataRequest.request(url, options);
        console.log('All Paises here')
        console.log(json)
        if(json){
            setDataConsulta(json)
        }else{

        	setDataConsulta([]);
        }

            
    }

	const dataToFormConsulta = ()=>{
    	let obj = {name:'', historico:'', pessoa_id:'',	dt_marcado:'', hr_marcado:'', prioridade:'', status:'', profissional_id:'', filial_id:''}
    	if(dataConsultaChoice && dataConsultaChoice.hasOwnProperty('mensagem')){
    		let data = dataConsultaChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.name = data.name;
    		}

    		if(data.hasOwnProperty('historico')){
    			obj.historico = data.historico;
    		}
    		
    		if(data.hasOwnProperty('dt_marcado')){
    			obj.dt_marcado = data.dt_marcado;
    		}

			if(data.hasOwnProperty('hr_marcado')){
    			obj.hr_marcado = data.hr_marcado;
    		}

            if(data.hasOwnProperty('prioridade')){
                obj.prioridade = data.prioridade;
            }

            if(data.hasOwnProperty('status')){
                obj.status = data.status;
            }

			if(data.hasOwnProperty('filial_id')){
                obj.filial_id = data.filial_id;
            }
			
    		if(data.hasOwnProperty('pessoa')){
    			if(data.pessoa.hasOwnProperty('pessoa_id')){
					obj.pessoa_id = data.pessoa.pessoa_id;
				}
    			
    		}

			if(data.hasOwnProperty('profissional')){
    			if(data.pessoa.hasOwnProperty('profissional_id')){
					obj.profissional_id = data.pessoa.profissional_id;
				}
    			
    		}

    		
    	}

    	return obj;
    }

    React.useEffect(()=>{
    	const requesPais = async ()=>{
    		await requestAllConsultas();
    	}
    	
    	requesPais();

    }, []);

    console.log('----------------------------- data pais ----------------------------------')
    console.log(dataConsulta)
	return(

		<>
			 <Formik 

                initialValues={{... dataToFormConsulta()}}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.name){
                            errors.name="Obrigatório"
                        }

                        if(!values.historico){
                            errors.historico="Obrigatório"
                        }


                        if(!values.dt_marcado){
                            errors.dt_marcado="Obrigatório"
                        }

                        if(!values.pessoa_id){
                            errors.pessoa_id="Obrigatório"
                        }
						
						if(!values.hr_marcado){
						    errors.hr_marcado="Obrigatório"
						}

						if(!values.prioridade){
						    errors.prioridade="Obrigatório"
						}

						if(!values.status){
						    errors.status="Obrigatório"
						}

						if(!values.profissional_id){
						    errors.profissional_id="Obrigatório"
						}

						if(!values.filial_id){
						    errors.filial_id="Obrigatório"
						}

                        return errors;
                    }
                }

                onSubmit={async(values, {setSubmitting})=>{
                    /*setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);*/
                      //alert(values.name)
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

                        <Modal  handleConcluir={()=>{handleSubmit(); }}  title={'Cadastrar Consulta'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarConsulta} showHide={setShowModalCriarConsulta}>
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
											<Row className="mb-1">
											<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Pessoa *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'pessoa_id',
																		placeholder:'Ex: fulano de tal',
																		id:'pessoa_id',
																		name_cod:'pessoa_id',
																		name_desacription:'pessoa_name',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.pessoa_id,
																		className:`${estilos.input}`,
																		size:"sm"
																	},
																	atributsContainer:{
																		className:''
																	},
																	hookToLoadFromDescription:CONSULTA_ALL_POST,
																}
															}
															component={Required}
													>   </Field>    
													<ErrorMessage className="alerta_error_form_label" name="pessoa_id" component="div" />
												</Col>

												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Filial *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'filial_id',
																		placeholder:'Ex: fulano de tal',
																		id:'filial_id',
																		name_cod:'filial_id',
																		name_desacription:'pessoa_name',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.filial_id,
																		className:`${estilos.input}`,
																		size:"sm"
																	},
																	atributsContainer:{
																		className:''
																	},
																	hookToLoadFromDescription:CONSULTA_ALL_POST,
																}
															}
															component={Required}
													>   </Field>    
													<ErrorMessage className="alerta_error_form_label" name="filial_id" component="div" />
												</Col>
												
											</Row>

											<Row className="mb-1">
												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Profissional *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'pessoa_id',
																		placeholder:'Ex: fulano de tal',
																		id:'pessoa_id',
																		name_cod:'pessoa_id',
																		name_desacription:'pessoa_name',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.pessoa_id,
																		className:`${estilos.input}`,
																		size:"sm"
																	},
																	atributsContainer:{
																		className:''
																	},
																	hookToLoadFromDescription:CONSULTA_ALL_POST,
																}
															}
															component={Required}
													>   </Field>    
													<ErrorMessage className="alerta_error_form_label" name="pessoa_id" component="div" />
												</Col>
												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Data',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'date',
																		name:'dt_marcado',
																		placeholder:'DD/MM/AAAA',
																		id:'dt_marcado',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.dt_marcado,
																		className:estilos.input,
																		size:"sm"
																	},
																	options:[],
																	atributsContainer:{
																		className:''
																	}
																}
															}
														
															component={FormControlSelect}
														></Field>
														<ErrorMessage className="alerta_error_form_label" name="dt_marcado" component="div" />
												</Col>
											</Row>
											<Row>
												
												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Horário',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'time',
																		name:'hr_marcado',
																		placeholder:'HH:ii',
																		id:'hr_marcado',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.hr_marcado,
																		className:estilos.input,
																		size:"sm"
																	},
																	options:[],
																	atributsContainer:{
																		className:''
																	}
																}
															}
														
															component={FormControlSelect}
														></Field>
														<ErrorMessage className="alerta_error_form_label" name="dt_marcado" component="div" />
												</Col>
												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Prioridade',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'prioridade',
																		placeholder:'Informe a prioridade',
																		id:'prioridade',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.prioridade,
																		className:estilos.input,
																		size:"sm"
																	},
																	options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'Baixa',valor:'baixa',props:{}},{label:'Normal',valor:'normal',props:{}},{label:'Média',valor:'media',props:{}},{label:'Alta',valor:'alta',props:{}},{label:'Urgente',valor:'urgente',props:{}}],
																	atributsContainer:{
																		className:''
																	}
																}
															}
														
															component={FormControlSelect}
														></Field>
														<ErrorMessage className="alerta_error_form_label" name="dt_marcado" component="div" />
												</Col>
											</Row> 
											<Row>
												
												<Col xs="12" sm="12" md="12">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Observação',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'historico',
																		placeholder:'HH:ii',
																		id:'historico',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.historico,
																		className:estilos.input,
																		size:"sm"
																	},
																	options:[],
																	atributsContainer:{
																		className:''
																	}
																}
															}
														
															component={FormControlSelect}
														></Field>
														<ErrorMessage className="alerta_error_form_label" name="historico" component="div" />
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

export default FormConsulta;
