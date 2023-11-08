import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row, Tabs, Tab } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormContasReceber.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'


import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_SAVE_POST, SERVICO_ALL_POST, ORDEM_SERVICO_FINALIZAR_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, CONTAS_RECEBER_UPDATE_POST, CONTAS_RECEBER_SAVE_POST} from '../../../api/endpoints/geral.js'


const FormContasReceber = ({dataContasReceberChoice, setDataContasReceber, setIdContasReceber, idContasReceber, showModalCriarContasReceber, setShowModalCriarContasReceber, callback, atualizarContasReceber, setAtualizarContasReceber, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] 	= React.useState([])
	const [dataItens, setDataitens]		 	= React.useState([])
	const [isOrcamento, setIsOramento]		 	= React.useState(false)
	const [qtdAtualizaCobrancas, setQtdAtualizaCobrancas]		 	= React.useState(0)
	

	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
			...params
		})=>{
			
		
		/*const data = {
			referencia_id,
			referencia,
			pessoa_id,
			descricao,
			documento,
			dtVencimentoOriginal,
			dtVencimento,
			vrBruto,
			vrLiquido,
			vrDevolvido,
			vrPago,
			vrTaxa,
			vrDesconto,
			vrJuros,
			user_id,
			user_update_id,
			active,
			deleted_at,
			created_at,
			updated_at,
			responsavel_id,
			importacao_dados,
			forma_pgto_orig_id,
			conta_orig_id,
			prazo_orig_id,
			qtd_parcelas,
			vrAberto,
			vrSaldoAberto,
			pessoa_autor_id 
		}*/
		

		const data = {
			...params
		}

		let data_config = {}
		if(idContasReceber && idContasReceber > 0){
			data_config = CONTAS_RECEBER_UPDATE_POST(idContasReceber, data, getToken());
		}else{
			data_config = CONTAS_RECEBER_SAVE_POST(data, getToken());
		}

		
		const {url, options} = data_config;


		const {response, json} = await request(url, options);
		console.log('Save consulta here')
		console.log(json)
		if(json){
			console.log('Response Save consulta here')
			console.log(json)
			
			callback();
			setShowModalCriarContasReceber();
			setAtualizarContasReceber(false);
			setIdContasReceber(null);
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

	const dataToFormContasReceber = ()=>{
    	let obj = {filial_id:'', vrLiquido:'', descricao:'', dsArquivo:'', pessoa_id:'', pessoa_rca_id:'', filial_id:'', user_id:'', user_update_id:'', active:'', deleted_at:'', created_at:'', updated_at:''}
    	if(dataContasReceberChoice && dataContasReceberChoice.hasOwnProperty('mensagem')){
    		let data = dataContasReceberChoice.mensagem;
			
    		if(data.hasOwnProperty('filial_id')){
                obj.filial_id = data.filial_id;
    		}

    		if(data.hasOwnProperty('vrLiquido')){
    			obj.vrLiquido = data.vrLiquido;
    		}
			
			if(data.hasOwnProperty('status')){
    			obj.status = data.status;
    		}

			if(data.hasOwnProperty('descricao')){
    			obj.descricao = data.descricao;
    		}

			if(data.hasOwnProperty('dsArquivo')){
    			obj.dsArquivo = data.dsArquivo;
    		}

			if(data.hasOwnProperty('pessoa_id')){
    			obj.pessoa_id = data.pessoa_id;
    		}

			if(data.hasOwnProperty('pessoa_rca_id')){
    			obj.pessoa_rca_id = data.pessoa_rca_id;
    		}

			if(data.hasOwnProperty('vr_final')){
    			obj.vr_final = data.vr_final;
    		}

			if(data.hasOwnProperty('vr_desconto')){
    			obj.vr_desconto = data.vr_desconto;
    		}

			if(data.hasOwnProperty('pct_acrescimo')){
    			obj.pct_acrescimo = data.pct_acrescimo;
    		}

			if(data.hasOwnProperty('vr_acrescimo')){
    			obj.vr_acrescimo = data.vr_acrescimo;
    		}

			if(data.hasOwnProperty('profissional_id')){
    			obj.profissional_id = data.profissional_id;
    		}

			if(data.hasOwnProperty('pct_desconto')){
    			obj.pct_desconto = data.pct_desconto;
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

		if(dataContasReceberChoice && dataContasReceberChoice.hasOwnProperty('mensagem')){
			let data = dataContasReceberChoice.mensagem;
			setDataitens(data?.item)
		}
		
	}, [])

    React.useEffect(()=>{
    	const requesFiliais = async ()=>{
    		await requestAllFiliais();
    	}
    	
    	requesFiliais();

    }, []);

    console.log('----------------------------- data pais ----------------------------------')
    console.log(dataToFormContasReceber())


	return(

		<>
			 <Formik 

                initialValues={{...dataToFormContasReceber()}}
				enableReinitialize={true}
                validate={
                    values=>{

                        const errors = {}

                        /* if(!values.name){
                            errors.name="Obrigatório"
                        } */
									
						if(!values.descricao){
							errors.descricao="Obrigatório"    			
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
						
						<Modal
							bottomButtons={null}
							handleConcluir={()=>{handleSubmit(); }}
							title={ (atualizarContasReceber == true ? 'Atualizar' : 'Cadastrar')+' Ordem de Servico'}
							size="lg"
							propsConcluir={{'disabled':loading}}
							labelConcluir={loading ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
							dialogClassName={''}
							aria-labelledby={'aria-labelledby'}
							labelCanelar="Fechar"
							show={showModalCriarContasReceber}
							showHide={()=>{setShowModalCriarContasReceber();setAtualizarContasReceber(false);setIdContasReceber(null);}}
						>
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
											{ !(idContasReceber && idContasReceber > 0) && 
											(
												<>
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
																			contentLabel:'Caixa para baixa *',
																			atributsFormLabel:{

																			},
																			atributsFormControl:{
																				type:'text',
																				name:'caixa_id',
																				placeholder:'Caixa para baixa',
																				id:'caixa_id',
																				name_cod:'caixa_id',
																				name_desacription:'caixa_name',
																				onChange:handleChange,
																				onBlur:handleBlur,
																				value:values.caixa_id,
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
															<ErrorMessage className="alerta_error_form_label" name="caixa_id" component="div" />
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
												</>
											)

										}
											
											<Row className="mb-3">
												

												<Col xs="12" sm="12" md="12">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Histórico *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'descricao',
																		placeholder:'0,00',
																		id:'descricao',
																		name_cod:'descricao',
																		name_desacription:'descricao',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.descricao,
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
													<ErrorMessage className="alerta_error_form_label" name="descricao" component="div" />
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

export default FormContasReceber;
