import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row, Tabs, Tab, Button as ButtonBootstrap } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormOrdemServicoItens.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import OrdemServicoItens from '../../OrdemServicoItens/index.js'
import TableForm from '../../Relatorio/TableForm/index.js';

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_SAVE_POST, SERVICO_ALL_POST, SERVICO_UPDATE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, SERVICO_ONE_GET, ORDEM_SERVICO_ONE_GET, ORDEM_SERVICO_ADD_ITEM_POST, ORDEM_SERVICO_DELETE_ITEM_POST} from '../../../api/endpoints/geral.js'


const FormAddServico = ({dataServicoEscolhido, setIdServicoEscolhido, idOrdemServico, itensOrdem ,callback,carregando})=>{
	
	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);

	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    console.log("dataServicoEscolhido")
    console.log(dataServicoEscolhido)

    const sendData = async ({
    		servico_id,
			vrItemBruto,
    		vr_desconto,
			pct_desconto,
    		vrItem,
			qtd,
		})=>{
			
			console.log('Save consulta here')
    	const data = {
    		'servico_id':servico_id,
    		'vr_desconto':vr_desconto,
			'pct_desconto':pct_desconto,
    		'vrItem':vrItem,
    		'vrItemBruto':vrItemBruto,
			'qtd':qtd,
    	}

		const {url, options} = ORDEM_SERVICO_ADD_ITEM_POST(idOrdemServico, data, getToken());


		const {response, json} = await request(url, options);
		console.log('Save consulta here')
		console.log(json)
		if(json){
			console.log('Response Save consulta here =====')
			console.log(json)
			///await getOrdemServico(idOrdemServico);
			//callback();
		}
    }

    

	const dataToFormOrdemServicoItens = ()=>{
    	let obj = {name:'', vr_desconto:0, pct_desconto: 0, id:'', servico_id:'', vrItem:0, vrTotal:0, vr_final:0 , vrItemBruto:0, qtd:1}
    	if(dataServicoEscolhido){
			console.log('Conteceu...')
    		let data = dataServicoEscolhido;
           
			if(data.hasOwnProperty('id')){
                obj.id = data.id;
    		}

    		if(data.hasOwnProperty('name')){
                obj.name = data.name;
    		}

			if(data.hasOwnProperty('servico_id')){
                obj.servico_id = data.servico_id;
    		}

			if(data.hasOwnProperty('qtd')){
    			obj.qtd = data.qtd;
    		}else{
				obj.qtd = 1;
			}

    		if(data.hasOwnProperty('vr_desconto')){
    			obj.vr_desconto = data.vr_desconto;
    		}else{
				obj.vr_desconto = 0;
			}

			if(data.hasOwnProperty('pct_desconto')){
    			obj.pct_desconto = data.pct_desconto;
    		}else{
				obj.pct_desconto = 0;
			}


			if(data.hasOwnProperty('vrItemBruto')){
    			obj.vrItemBruto = data.vrItemBruto;
    		}else if(data.hasOwnProperty('vrServico')){	
				obj.vrItemBruto = data.vrServico;
			}

			if(data.hasOwnProperty('vrItem')){
    			obj.vrItem = data.vrItem;
    		}else if(data.hasOwnProperty('vrServico')){	
				obj.vrItem = data.vrServico;
			}
			
			if(data.hasOwnProperty('vrTotal')){
    			obj.vrTotal = data.vrTotal;
    		}else{

				let vrIt = obj.hasOwnProperty('vrItem') ? obj.vrItem : 0;
				let qtdItem = obj.hasOwnProperty('qtd') ? obj.qtd : 1;
				qtdItem = Number(qtdItem)
				vrIt 	= Number(vrIt)
				console.log('Aqui.....')
				obj.vrTotal = vrIt * qtdItem;
			}

			if(data.hasOwnProperty('vr_final')){
    			obj.vr_final = data.vr_final;
    		}else{
				obj.vr_final = obj.vrTotal;
			}
			
    		
    		
    	}

    	return obj;
    }


	const dataFormSev = dataToFormOrdemServicoItens()
    console.log('dataFormSev')
		console.log(dataFormSev)
	return(

		<>
			 <Formik 

                initialValues={{...dataFormSev}}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.servico_id){
                            errors.servico_id="Obrigatório"
                        }
									
						if(!values.vrItem){
							errors.vrItem="Obrigatório"    			
						}


						if(!values.qtd){
						    errors.qtd="Obrigatório"
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
					 console.log('=================kkkkk jfajflja======')
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

						<>
							{
									
                                carregando && carregando==true
                                ?
                                    (<Load/>)
                                :
                                    (  
										<form onSubmit={handleSubmit}>
											
											<Row className="mb-3">
												<Col xs="12" sm="12" md="12">
													
													{
														error && <Row className="my-3">
															<Col xs="12" sm="12" md="12">
																<AlertaDismissible title="Atenção:" message={error} variant={"danger"} />
															</Col>
														</Row>
													}
													<Row className='mb-3'>

														<Col xs="12" sm="12" md="12">
															<Field
																	data={
																		{
																			hasLabel:true,
																			contentLabel:'Serviço *',
																			atributsFormLabel:{

																			},
																			atributsFormControl:{
																				type:'text',
																				name:'servico_id',
																				placeholder:'Ex: serviço',
																				id:'servico_id',
																				name_cod:'servico_id',
																				name_desacription:'servico_name',
																				//onChange:()=>{setDataServicoEscolhido(0);handleChange()},
																				//onBlur:()=>{setDataServicoEscolhido(0);handleBlur()},
																				onChange:handleChange,
																				onBlur:handleBlur,
																				value:values.servico_id,
																				className:`${estilos.input}`,
																				size:"sm"
																			},
																			atributsContainer:{
																				className:''
																			},
																			hookToLoadFromDescription:SERVICO_ALL_POST,
																			callbackDataItemChoice:(param)=>{
																				let {label, value} = param
																				setIdServicoEscolhido(value)
																				//console.log('Dados do serviço excolhido');console.log(param);
																			}
																		}
																	}
																	component={Required}
															>   </Field>    
															<ErrorMessage className="alerta_error_form_label" name="servico_id" component="div" />
														</Col>
														
													</Row>
													<Row className='mb-3'>

														<Col xs="12" sm="12" md="6">
															<Field
																data={
																	{
																		hasLabel:true,
																		contentLabel:'Valor bruto *',
																		atributsFormLabel:{

																		},
																		atributsFormControl:{
																			type:'text',
																			name:'vrItemBruto',
																			placeholder:'0,00',
																			id:'vrItemBruto',
																			onChange:handleChange,
																			onBlur:handleBlur,
																			value:values.vrItemBruto,
																			className:estilos.input,
																			size:"sm",
																			readonly:"readonly"
																		},
																		options:[],
																		atributsContainer:{
																			className:''
																		}
																	}
																}
															
																component={FormControlInput}
															></Field>
															<ErrorMessage className="alerta_error_form_label" name="vrItemBruto" component="div" />
															
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
																			name:'vrItem',
																			placeholder:'0,00',
																			id:'vrItem',
																			onChange:handleChange,
																			onBlur:handleBlur,
																			value:values.vrItem,
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
															<ErrorMessage className="alerta_error_form_label" name="vrItem" component="div" />
															
														</Col>
														
													</Row>
													<Row className='mb-3'>
														<Col xs="12" sm="12" md="6">
															<Field
																data={
																	{
																		hasLabel:true,
																		contentLabel:'Quantidade *',
																		atributsFormLabel:{

																		},
																		atributsFormControl:{
																			type:'text',
																			name:'qtd',
																			placeholder:'0,00',
																			id:'qtd',
																			onChange:handleChange,
																			onBlur:handleBlur,
																			value:values.qtd,
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
															<ErrorMessage className="alerta_error_form_label" name="qtd" component="div" />
															
														</Col>

														<Col xs="12" sm="12" md="6">
															<Field
																data={
																	{
																		hasLabel:true,
																		contentLabel:'% Desconto',
																		atributsFormLabel:{

																		},
																		atributsFormControl:{
																			type:'text',
																			name:'pct_desconto',
																			placeholder:'0,00',
																			id:'pct_desconto',
																			onChange:handleChange,
																			onBlur:handleBlur,
																			value:values.pct_desconto,
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
															<ErrorMessage className="alerta_error_form_label" name="pct_desconto" component="div" />
															
														</Col>

													</Row>

													<Row className='mb-3'>
													<Col xs="12" sm="12" md="6">
															<Field
																data={
																	{
																		hasLabel:true,
																		contentLabel:'R$ Desconto',
																		atributsFormLabel:{

																		},
																		atributsFormControl:{
																			type:'text',
																			name:'vr_desconto',
																			placeholder:'0,00',
																			id:'vr_desconto',
																			onChange:handleChange,
																			onBlur:handleBlur,
																			value:values.vr_desconto,
																			className:estilos.input,
																			size:"sm",
																			readonly:"readonly"
																		},
																		options:[],
																		atributsContainer:{
																			className:''
																		}
																	}
																}
															
																component={FormControlInput}
															></Field>
															<ErrorMessage className="alerta_error_form_label" name="vr_desconto" component="div" />
															
														</Col>

														<Col xs="12" sm="12" md="6">
															<Field
																data={
																	{
																		hasLabel:true,
																		contentLabel:'Total *',
																		atributsFormLabel:{

																		},
																		atributsFormControl:{
																			type:'text',
																			name:'vrTotal',
																			placeholder:'0,00',
																			id:'vrTotal',
																			onChange:handleChange,
																			onBlur:handleBlur,
																			value:values.vrTotal,
																			className:estilos.input,
																			size:"sm",
																			readonly:"readonly"
																		},
																		options:[],
																		atributsContainer:{
																			className:''
																		}
																	}
																}
															
																component={FormControlInput}
															></Field>
															<ErrorMessage className="alerta_error_form_label" name="vrTotal" component="div" />
															
														</Col>
													</Row>
													<Row className='mb-3'>
														
														<Col className="mt-3 offset-10" xs="12" sm="12" md="2">
															<ButtonBootstrap onClick={()=>{handleSubmit(); }} className='botao_success btn btn-sm' >Adicionar</ButtonBootstrap>
														</Col>
													</Row>
												</Col>
											</Row>
											
											             

										</form>

									)
														
							}  

                        </>
                    )
                }
            </Formik>
		</>
	)
}

export default FormAddServico;
