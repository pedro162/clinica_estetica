import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row, Tabs, Tab } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormOrdemServicoIniciar.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_SAVE_POST, SERVICO_ALL_POST, SERVICO_UPDATE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, RCA_ALL_POST} from '../../../api/endpoints/geral.js'


const FormOrdemServicoIniciar = ({dataOrdemServicoChoice, setIdOrdemServico, idOrdemServico, showModalCriarOrdemServico, setShowModalCriarOrdemServico, callback, atualizarOrdemServico, setAtualizarOrdemServico, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] = React.useState([])	
	const [dataRca, setDataRca] = React.useState([])
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
			rca_id,
			filial_id,
			pessoa_id,
			profissional_id,
			name_pessoa_contato
		})=>{
			

    	const data = {
    		rca_id,
			filial_id,
			pessoa_id,
			profissional_id,
			name_pessoa_contato
    	}

		const {url, options} = ORDEM_SERVICO_SAVE_POST(data, getToken());

		const {response, json} = await request(url, options);
		console.log('Save service here')
		console.log(json)
		if(json){
			console.log('Response Save service here')
			console.log(json)
			
			callback();
			setShowModalCriarOrdemServico();
			setAtualizarOrdemServico(false);
			setIdOrdemServico(json?.mensagem?.id)
		}
    }

    const requestAllFiliais = async() =>{
       
        const {url, options} = SERVICO_ALL_POST({}, getToken());


        const {response, json} = await dataRequest.request(url, options);
        console.log('All consultas here')
        console.log(json)
        if(json){
            setDataFiliais(json)
        }else{

        	setDataFiliais([]);
        }

            
    }

	const requestAllRca = async() =>{
       
        const {url, options} = RCA_ALL_POST({}, getToken());


        const {response, json} = await dataRequest.request(url, options);
        console.log('All response rca here')
        console.log(json)
        if(json){
            setDataRca(json)
        }else{

        	setDataRca([]);
        }

            
    }

	

	const dataToFormOrdemServicoIniciar = ()=>{
    	let obj = {name:'', vrDesconto:''}
    	if(dataOrdemServicoChoice && dataOrdemServicoChoice.hasOwnProperty('mensagem')){
    		let data = dataOrdemServicoChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.name = data.name;
    		}

    		if(data.hasOwnProperty('vrDesconto')){
    			obj.vrDesconto = data.vrDesconto;
    		}
    		
    		
    	}

    	return obj;
    }

	//RCA_ALL_POST
	const preparaRcaToForm = ()=>{
    	if(dataRca.hasOwnProperty('mensagem') && Array.isArray(dataRca.mensagem) && dataRca.mensagem.length > 0){
    		let filiais = dataRca.mensagem.map(({id, name}, index, arr)=>({label:name,valor:id,props:{}}))
    		filiais.unshift({label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}})
    		
    		return filiais;
    	}
    	return []
    }

    React.useEffect(()=>{
    	const requesRca = async ()=>{
    		await requestAllRca();
    	}
    	
    	requesRca();

    }, []);

    const preparaFilialToForm = ()=>{
    	if(dataFiliais.hasOwnProperty('mensagem') && Array.isArray(dataFiliais.mensagem) && dataFiliais.mensagem.length > 0){
    		let filiais = dataFiliais.mensagem.map(({id, name}, index, arr)=>({label:name,valor:id,props:{}}))
    		filiais.unshift({label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}})
    		
    		return filiais;
    	}
    	return []
    }

	React.useEffect(()=>{
    	const requesFiliais = async ()=>{
    		await requestAllFiliais();
    	}
    	
    	requesFiliais();

    }, []);

    console.log('----------------------------- data pais ----------------------------------')
    console.log(dataToFormOrdemServicoIniciar())
	return(

		<>
			 <Formik 

                initialValues={{...dataToFormOrdemServicoIniciar()}}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.rca_id){
                            errors.rca_id="Obrigatório"
                        }
									
						if(!values.filial_id){
							errors.filial_id="Obrigatório"    			
						}


						if(!values.pessoa_id){
						    errors.pessoa_id="Obrigatório"
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

						<Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarOrdemServico == true ? 'Atualizar' : 'Iniciar')+' Ordem de Servico'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarOrdemServico} showHide={()=>{setShowModalCriarOrdemServico();setAtualizarOrdemServico(false);setIdOrdemServico(null);}}>
							{
									
                                carregando && carregando==true
                                ?
                                    (<Load/>)
                                :
                                    (  
										<form onSubmit={handleSubmit}>
											<Col xs="12" sm="12" md="12">
												<span className="label_title_grup_forms">Dados básicos</span>
												<hr/>
											</Col>

											{
												error && <Row className="my-3">
													<Col xs="12" sm="12" md="12">
														<AlertaDismissible title="Atenção:" message={error} variant={"danger"} />
													</Col>
												</Row>
											}
											<Row className="mb-3">
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
																	placeholder:'Filial',
																	id:'filial_id',
																	onChange:handleChange,
																	onBlur:handleBlur,
																	value:values.filial_id,
																	className:estilos.input,
																	size:"sm"
																},
																options:preparaFilialToForm(),
																atributsContainer:{
																	className:''
																}
															}
														}
													
														component={FormControlSelect}
													></Field>
													<ErrorMessage className="alerta_error_form_label" name="filial_id" component="div" />
													
													
												</Col>

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
											</Row>
											<Row className="mb-3">
												
												
												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel:true,
																contentLabel:'Vendedor *',
																atributsFormLabel:{

																},
																atributsFormControl:{
																	type:'text',
																	name:'rca_id',
																	placeholder:'Vendedor',
																	id:'rca_id',
																	onChange:handleChange,
																	onBlur:handleBlur,
																	value:values.rca_id,
																	className:estilos.input,
																	size:"sm"
																},
																options:preparaRcaToForm(),
																atributsContainer:{
																	className:''
																}
															}
														}
													
														component={FormControlSelect}
													></Field>
													<ErrorMessage className="alerta_error_form_label" name="rca_id" component="div" />
													
													
												</Col>

												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Profissinal ',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'profissional_id',
																		placeholder:'Ex: fulano de tal',
																		id:'profissional_id',
																		name_cod:'profissional_id',
																		name_desacription:'pessoa_name',
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
											</Row>
											<Row className="mb-3">
												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Pessoa de contato *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'name_pessoa_contato',
																		placeholder:'Fulano de tal',
																		id:'name_pessoa_contato',
																		name_cod:'name_pessoa_contato',
																		name_desacription:'name_pessoa_contato',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.name_pessoa_contato,
																		className:`${estilos.input}`,
																		size:"sm",
																	},
																	atributsContainer:{
																		className:''
																	},
																}
															}
															component={FormControlInput}
													>   </Field>    
													<ErrorMessage className="alerta_error_form_label" name="name_pessoa_contato" component="div" />
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

export default FormOrdemServicoIniciar;
