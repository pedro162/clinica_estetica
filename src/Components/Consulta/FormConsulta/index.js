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
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_SAVE_POST, CONSULTA_ALL_POST, CONSULTA_UPDATE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST} from '../../../api/endpoints/geral.js'


const FormConsulta = ({dataConsultaChoice, setIdConsulta, idConsulta, showModalCriarConsulta, setShowModalCriarConsulta, callback, atualizarConsulta, setAtualizarConsulta, carregando})=>{

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
			dt_inicio,
			hr_inicio,
			prioridade,
			status,
			profissional_id,
			filial_id,
			dt_fim,
			hr_fim,
			name_atendido,
			tipo,
		})=>{
			

    	const data = {
    		'name':name,
    		'historico':historico,
    		'pessoa_id':pessoa_id,
    		'dt_inicio':dt_inicio,
    		'hr_inicio':hr_inicio,
    		'prioridade':prioridade,
    		'status':status,
    		'profissional_id':profissional_id,
    		'filial_id':filial_id,
			'dt_fim':dt_fim,
			'hr_fim':hr_fim,
			'name_atendido':name_atendido,
			'tipo':tipo,
    	}

		if(atualizarConsulta == true){
            const {url, options} = CONSULTA_UPDATE_POST(idConsulta, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save consulta here')
            console.log(json)
            if(json){
                console.log('Response Save consulta here')
                console.log(json)
                
                callback();
                setShowModalCriarConsulta();
                setAtualizarConsulta(false);
                setIdConsulta(null);
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
                setAtualizarConsulta(false);
            }

        }
    }

    const requestAllConsultas = async() =>{
       
        const {url, options} = CONSULTA_ALL_POST({}, getToken());


        const {response, json} = await dataRequest.request(url, options);
        console.log('All consultas here')
        console.log(json)
        if(json){
            setDataConsulta(json)
        }else{

        	setDataConsulta([]);
        }

            
    }

	const dataToFormConsulta = ()=>{
    	let obj = {name:'', historico:'', pessoa_id:'',	dt_inicio:'', hr_inicio:'', prioridade:'', status:'', profissional_id:'',
		filial_id:'', dt_fim:'', hr_fim:'', name_atendido:'', tipo:''}
    	if(dataConsultaChoice && dataConsultaChoice.hasOwnProperty('mensagem')){
    		let data = dataConsultaChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.name = data.name;
    		}

    		if(data.hasOwnProperty('historico')){
    			obj.historico = data.historico;
    		}
    		
    		if(data.hasOwnProperty('dt_inicio')){
    			obj.dt_inicio = data.dt_inicio;
    		}

			if(data.hasOwnProperty('hr_inicio')){
    			obj.hr_inicio = data.hr_inicio;
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

			if(data.hasOwnProperty('pessoa_id')){
                obj.pessoa_id = data.pessoa_id;
            }

			if(data.hasOwnProperty('profissional_id')){
                obj.profissional_id = data.profissional_id;
            }
			
    		if(data.hasOwnProperty('pessoa')){
    			if(data.pessoa.hasOwnProperty('id')){
					obj.pessoa_id = data.pessoa.id;
				}
    			
    		}

			if(data.hasOwnProperty('profissional')){
    			if(data.profissional.hasOwnProperty('id')){
					obj.profissional_id = data.profissional.id;
				}
    			
    		}

			if(data.hasOwnProperty('dt_fim')){
    			obj.dt_fim = data.dt_fim;    			
    		}

			if(data.hasOwnProperty('hr_fim')){
    			obj.hr_fim = data.hr_fim;    			
    		}

			if(data.hasOwnProperty('name_atendido')){
    			obj.name_atendido = data.name_atendido;    			
    		}

			if(data.hasOwnProperty('tipo')){
    			obj.tipo = data.tipo;    			
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
    console.log(dataToFormConsulta())
	return(

		<>
			 <Formik 

                initialValues={{...dataToFormConsulta()}}
                validate={
                    values=>{

                        const errors = {}

                        /* if(!values.name){
                            errors.name="Obrigatório"
                        } */
						if(! atualizarConsulta){
							
							if(!values.pessoa_id){
								errors.pessoa_id="Obrigatório"
							}
			
							if(!values.name_atendido){
								errors.name_atendido="Obrigatório"   			
							}

							if(!values.filial_id){
								errors.filial_id="Obrigatório"
							}
						}
                        if(!values.historico){
                            errors.historico="Obrigatório"
                        }


                        if(!values.dt_inicio){
                            errors.dt_inicio="Obrigatório"
                        }

                        
						
						if(!values.hr_inicio){
						    errors.hr_inicio="Obrigatório"
						}

						if(!values.prioridade){
						    errors.prioridade="Obrigatório"
						}

			
						if(!values.tipo){
							errors.tipo="Obrigatório"    			
						}


						if(!values.profissional_id){
						    errors.profissional_id="Obrigatório"
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

						<Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarConsulta == true ? 'Atualizar' : 'Cadastrar')+' Atendimento'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarConsulta} showHide={()=>{setShowModalCriarConsulta();setAtualizarConsulta(false);setIdConsulta(null);}}>
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

											{
												!atualizarConsulta ? (
													<>
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
																				hookToLoadFromDescription:CLIENTES_ALL_POST,
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
																				contentLabel:'Pessoa do contato *',
																				atributsFormLabel:{

																				},
																				atributsFormControl:{
																					type:'text',
																					name:'name_atendido',
																					placeholder:'Ex: fulano de tal',
																					id:'name_atendido',
																					name_cod:'name_atendido',
																					name_desacription:'pessoa_name',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.name_atendido,
																					className:`${estilos.input}`,
																					size:"sm"
																				},
																				atributsContainer:{
																					className:''
																				},
																				hookToLoadFromDescription:CLIENTES_ALL_POST,
																			}
																		}
																		component={FormControlInput}
																>   </Field>    
																<ErrorMessage className="alerta_error_form_label" name="name_atendido" component="div" />
															</Col>
														</Row>

														<Row className="mb-1">
																										
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
																					name_desacription:'filial_name',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.filial_id,
																					className:`${estilos.input}`,
																					size:"sm"
																				},
																				atributsContainer:{
																					className:''
																				},
																				hookToLoadFromDescription:CLIENTES_ALL_POST,
																			}
																		}
																		component={Required}
																>   </Field>    
																<ErrorMessage className="alerta_error_form_label" name="filial_id" component="div" />
															</Col>
															<Col>
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
																					placeholder:'Informe a tipo',
																					id:'tipo',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.tipo,
																					className:estilos.input,
																					size:"sm"
																				},
																				options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'Serviço',valor:'servico',props:{}},{label:'Avaliacao',valor:'avaliacao',props:{}},{label:'Consulta',valor:'consulta',props:{}},{label:'Retorno',valor:'retorno',props:{}}],
																				atributsContainer:{
																					className:''
																				}
																			}
																		}
																	
																		component={FormControlSelect}
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
																				contentLabel:'Profissional *',
																				atributsFormLabel:{

																				},
																				atributsFormControl:{
																					type:'text',
																					name:'profissional_id',
																					placeholder:'Ex: fulano de tal',
																					id:'profissional_id',
																					name_cod:'profissional_id',
																					name_desacription:'profissional_name',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.profissional_id,
																					className:`${estilos.input}`,
																					size:"sm"
																				},
																				atributsContainer:{
																					className:''
																				},
																				hookToLoadFromDescription:PROFISSIONAIS_ALL_POST,
																			}
																		}
																		component={Required}
																>   </Field>    
																<ErrorMessage className="alerta_error_form_label" name="profissional_id" component="div" />
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
																	<ErrorMessage className="alerta_error_form_label" name="prioridade" component="div" />
															</Col>
														</Row>
														<Row>
															
															<Col xs="12" sm="12" md="6">
																<Field
																		data={
																			{
																				hasLabel:true,
																				contentLabel:'Data iníco',
																				atributsFormLabel:{

																				},
																				atributsFormControl:{
																					type:'date',
																					name:'dt_inicio',
																					placeholder:'DD/MM/AAAA',
																					id:'dt_inicio',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.dt_inicio,
																					className:estilos.input,
																					size:"sm"
																				},
																				options:[],
																				atributsContainer:{
																					className:''
																				}
																			}
																		}
																	
																		component={FormControlInput}
																	></Field>
																	<ErrorMessage className="alerta_error_form_label" name="dt_inicio" component="div" />
															</Col>

															<Col xs="12" sm="12" md="6">
																<Field
																		data={
																			{
																				hasLabel:true,
																				contentLabel:'Horário início',
																				atributsFormLabel:{

																				},
																				atributsFormControl:{
																					type:'time',
																					name:'hr_inicio',
																					placeholder:'HH:ii',
																					id:'hr_inicio',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.hr_inicio,
																					className:estilos.input,
																					size:"sm"
																				},
																				options:[],
																				atributsContainer:{
																					className:''
																				}
																			}
																		}
																	
																		component={FormControlInput}
																	></Field>
																	<ErrorMessage className="alerta_error_form_label" name="hr_inicio" component="div" />
															</Col>
														</Row> 

														{/*<Row>
															
															<Col xs="12" sm="12" md="6">
																<Field
																		data={
																			{
																				hasLabel:true,
																				contentLabel:'Data fim',
																				atributsFormLabel:{

																				},
																				atributsFormControl:{
																					type:'date',
																					name:'dt_fim',
																					placeholder:'DD/MM/AAAA',
																					id:'dt_fim',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.dt_fim,
																					className:estilos.input,
																					size:"sm"
																				},
																				options:[],
																				atributsContainer:{
																					className:''
																				}
																			}
																		}
																	
																		component={FormControlInput}
																	></Field>
																	<ErrorMessage className="alerta_error_form_label" name="dt_fim" component="div" />
															</Col>

															<Col xs="12" sm="12" md="6">
																<Field
																		data={
																			{
																				hasLabel:true,
																				contentLabel:'Horário fim',
																				atributsFormLabel:{

																				},
																				atributsFormControl:{
																					type:'time',
																					name:'hr_fim',
																					placeholder:'HH:ii',
																					id:'hr_fim',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.hr_fim,
																					className:estilos.input,
																					size:"sm"
																				},
																				options:[],
																				atributsContainer:{
																					className:''
																				}
																			}
																		}
																	
																		component={FormControlInput}
																	></Field>
																	<ErrorMessage className="alerta_error_form_label" name="hr_fim" component="div" />
															</Col>
														</Row> */}
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
																					placeholder:'Observação',
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
																	
																		component={FormControlInput}
																	></Field>
																	<ErrorMessage className="alerta_error_form_label" name="historico" component="div" />
															</Col>
														</Row>           
													</>
												)

												:
												(
													<>
														
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
																					name:'profissional_id',
																					placeholder:'Ex: fulano de tal',
																					id:'profissional_id',
																					name_cod:'profissional_id',
																					name_desacription:'profissional_name',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.profissional_id,
																					className:`${estilos.input}`,
																					size:"sm"
																				},
																				atributsContainer:{
																					className:''
																				},
																				hookToLoadFromDescription:PROFISSIONAIS_ALL_POST,
																			}
																		}
																		component={Required}
																>   </Field>    
																<ErrorMessage className="alerta_error_form_label" name="profissional_id" component="div" />
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
																	<ErrorMessage className="alerta_error_form_label" name="prioridade" component="div" />
															</Col>
														</Row>
														<Row>
															
															<Col xs="12" sm="12" md="6">
																<Field
																		data={
																			{
																				hasLabel:true,
																				contentLabel:'Data iníco',
																				atributsFormLabel:{

																				},
																				atributsFormControl:{
																					type:'date',
																					name:'dt_inicio',
																					placeholder:'DD/MM/AAAA',
																					id:'dt_inicio',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.dt_inicio,
																					className:estilos.input,
																					size:"sm"
																				},
																				options:[],
																				atributsContainer:{
																					className:''
																				}
																			}
																		}
																	
																		component={FormControlInput}
																	></Field>
																	<ErrorMessage className="alerta_error_form_label" name="dt_inicio" component="div" />
															</Col>

															<Col xs="12" sm="12" md="6">
																<Field
																		data={
																			{
																				hasLabel:true,
																				contentLabel:'Horário início',
																				atributsFormLabel:{

																				},
																				atributsFormControl:{
																					type:'time',
																					name:'hr_inicio',
																					placeholder:'HH:ii',
																					id:'hr_inicio',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.hr_inicio,
																					className:estilos.input,
																					size:"sm"
																				},
																				options:[],
																				atributsContainer:{
																					className:''
																				}
																			}
																		}
																	
																		component={FormControlInput}
																	></Field>
																	<ErrorMessage className="alerta_error_form_label" name="hr_inicio" component="div" />
															</Col>
														</Row> 

														<Row>
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
																					placeholder:'Informe a tipo',
																					id:'tipo',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.tipo,
																					className:estilos.input,
																					size:"sm"
																				},
																				options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'Serviço',valor:'servico',props:{}},{label:'Avaliacao',valor:'avaliacao',props:{}},{label:'Consulta',valor:'consulta',props:{}},{label:'Retorno',valor:'retorno',props:{}}],
																				atributsContainer:{
																					className:''
																				}
																			}
																		}
																	
																		component={FormControlSelect}
																	></Field>
																	<ErrorMessage className="alerta_error_form_label" name="tipo" component="div" />
															</Col>
															<Col xs="12" sm="12" md="6">
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
																					placeholder:'Observação',
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
																	
																		component={FormControlInput}
																	></Field>
																	<ErrorMessage className="alerta_error_form_label" name="historico" component="div" />
															</Col>
														</Row>     
													</>
												)
											
											}
											
											

											             

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
