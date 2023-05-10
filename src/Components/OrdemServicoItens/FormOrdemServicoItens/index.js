import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row, Tabs, Tab } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormOrdemServicoItens.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_SAVE_POST, SERVICO_ALL_POST, SERVICO_UPDATE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST} from '../../../api/endpoints/geral.js'


const FormOrdemServicoItens = ({dataOrdemServicoItensChoice, setIdOrdemServicoItens, idOrdemServicoItens, showModalCriarOrdemServicoItens, setShowModalCriarOrdemServicoItens, callback, atualizarOrdemServicoItens, setAtualizarOrdemServicoItens, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] = React.useState([])

	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		name,
    		vrDesconto,
		})=>{
			

    	const data = {
    		'name':name,
    		'vrDesconto':vrDesconto,
    	}

		if(atualizarOrdemServicoItens == true){
            const {url, options} = SERVICO_UPDATE_POST(idOrdemServicoItens, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save consulta here')
            console.log(json)
            if(json){
                console.log('Response Save consulta here')
                console.log(json)
                
                callback();
                setShowModalCriarOrdemServicoItens();
                setAtualizarOrdemServicoItens(false);
                setIdOrdemServicoItens(null);
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
            	setShowModalCriarOrdemServicoItens();
                setAtualizarOrdemServicoItens(false);
            }

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

	const dataToFormOrdemServicoItens = ()=>{
    	let obj = {name:'', vrDesconto:''}
    	if(dataOrdemServicoItensChoice && dataOrdemServicoItensChoice.hasOwnProperty('mensagem')){
    		let data = dataOrdemServicoItensChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.name = data.name;
    		}

    		if(data.hasOwnProperty('vrDesconto')){
    			obj.vrDesconto = data.vrDesconto;
    		}
    		
    		
    	}

    	return obj;
    }



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
    console.log(dataToFormOrdemServicoItens())
	return(

		<>
			 <Formik 

                initialValues={{...dataToFormOrdemServicoItens()}}
                validate={
                    values=>{

                        const errors = {}

                        /* if(!values.name){
                            errors.name="Obrigatório"
                        } */
									
						if(!values.vrDesconto){
							errors.vrDesconto="Obrigatório"    			
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

						<Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarOrdemServicoItens == true ? 'Atualizar' : 'Cadastrar')+' OrdemServicoItens'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarOrdemServicoItens} showHide={()=>{setShowModalCriarOrdemServicoItens();setAtualizarOrdemServicoItens(false);setIdOrdemServicoItens(null);}}>
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
											<Row className="mb-3">
												<Col xs="12" sm="12" md="3">
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

												<Col xs="12" sm="12" md="3">
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
												
												<Col xs="12" sm="12" md="3">
													<Field
														data={
															{
																hasLabel:true,
																contentLabel:'Vendedor *',
																atributsFormLabel:{

																},
																atributsFormControl:{
																	type:'text',
																	name:'pessoa_rca_id',
																	placeholder:'Vendedor',
																	id:'pessoa_rca_id',
																	onChange:handleChange,
																	onBlur:handleBlur,
																	value:values.pessoa_rca_id,
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
													<ErrorMessage className="alerta_error_form_label" name="pessoa_rca_id" component="div" />
													
													
												</Col>

												<Col xs="12" sm="12" md="3">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'R$ Crédito *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'vrSaldoCreditoCliente',
																		placeholder:'0,00',
																		id:'vrSaldoCreditoCliente',
																		name_cod:'vrSaldoCreditoCliente',
																		name_desacription:'vrSaldoCreditoCliente',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.vrSaldoCreditoCliente,
																		className:`${estilos.input}`,
																		size:"sm",
																		readonly:'readonly',
																	},
																	atributsContainer:{
																		className:''
																	},
																}
															}
															component={FormControlInput}
													>   </Field>    
													<ErrorMessage className="alerta_error_form_label" name="vrSaldoCreditoCliente" component="div" />
												</Col>
											</Row>
											<Row className="mb-3">
												<Col xs="12" sm="12" md="4">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Total bruto *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'vrTotal',
																		placeholder:'0,00',
																		id:'vrTotal',
																		name_cod:'vrTotal',
																		name_desacription:'vrTotal',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.vrTotal,
																		className:`${estilos.input}`,
																		size:"sm",
																		readonly:'readonly',
																	},
																	atributsContainer:{
																		className:''
																	},
																}
															}
															component={FormControlInput}
													>   </Field>    
													<ErrorMessage className="alerta_error_form_label" name="vrTotal" component="div" />
												</Col>

												<Col xs="12" sm="12" md="4">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'R$ Desconto *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'vrDesconto',
																		placeholder:'0,00',
																		id:'vrDesconto',
																		name_cod:'vrDesconto',
																		name_desacription:'vrDesconto',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.vrDesconto,
																		className:`${estilos.input}`,
																		size:"sm",
																		readonly:'readonly',
																	},
																	atributsContainer:{
																		className:''
																	},
																}
															}
															component={FormControlInput}
													>   </Field>    
													<ErrorMessage className="alerta_error_form_label" name="vrDesconto" component="div" />
												</Col>


												<Col xs="12" sm="12" md="4">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'R$ Total *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'vrLiquido',
																		placeholder:'0,00',
																		id:'vrLiquido',
																		name_cod:'vrLiquido',
																		name_desacription:'vrLiquido',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.vrLiquido,
																		className:`${estilos.input}`,
																		size:"sm",
																		readonly:'readonly',
																	},
																	atributsContainer:{
																		className:''
																	},
																}
															}
															component={FormControlInput}
													>   </Field>    
													<ErrorMessage className="alerta_error_form_label" name="vrLiquido" component="div" />
												</Col>
											</Row>
											
											<Row className="my-3 mt-5">
												<Col xs="12" sm="12" md="12">
													<Tabs
													defaultActiveKey="servicos"
													id="fill-tab-example"
													className="mb-3"
													fill
													>
														<Tab eventKey="servicos" title="Serviços">
															
														</Tab>
														<Tab eventKey="questionario" title="Questionário">
															
														</Tab>
														<Tab eventKey="cobrancas" title="Cobranças">
															
														</Tab>
													</Tabs>
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

export default FormOrdemServicoItens;
