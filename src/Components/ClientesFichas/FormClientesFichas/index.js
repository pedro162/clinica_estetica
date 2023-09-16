import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row, Tabs, Tab } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormClientesFichas.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import FormClientesFichasItens from '../FormClientesFichasItens/index.js'


import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_SAVE_POST, FORMULARIO_ALL_POST, FORMULARIO_GRUPO_ALL_POST, FORMULARIO_ONE_GET, SERVICO_ALL_POST, ORDEM_SERVICO_FINALIZAR_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST} from '../../../api/endpoints/geral.js'


const FormClientesFichas = ({dataClientesFichasChoice, setDataClientesFichas, setIdClientesFichas, idClientesFichas, showModalCriarClientesFichas, setShowModalCriarClientesFichas, callback, atualizarClientesFichas, setAtualizarClientesFichas, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();
	const dataRequestGrupoForm = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] 	= React.useState([])
	const [dataItens, setDataitens]		 	= React.useState([])
	const [dataGrupo, setDataGrupo]		 	= React.useState([])
	const [dataFormulario, setDataFormulario] = React.useState([])
	const [dataFormularios, setDataFormularios] = React.useState([])
	const [dataFormulariosGrupos, setDataFormulariosGrupos] = React.useState([])
	const [isOrcamento, setIsOramento]		 	= React.useState(false)
	const [qtdAtualizaCobrancas, setQtdAtualizaCobrancas]		 	= React.useState(0)

	const [idFormularioForm, setIdFormularioForm]		 	= React.useState(0)	

	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
			rca_id,
			pessoa_rca_id,
			filial_id,
			pessoa_id,
			profissional_id,
			name_pessoa_contato
		})=>{
			
		rca_id= pessoa_rca_id > 0 && !rca_id ?  pessoa_rca_id : rca_id;
		let is_orcamento = isOrcamento ? true : false;

		const data = {
			rca_id,
			pessoa_rca_id,
			filial_id,
			pessoa_id,
			profissional_id,
			name_pessoa_contato,
			is_orcamento
		}

		const {url, options} = ORDEM_SERVICO_FINALIZAR_POST(idClientesFichas, data, getToken());


		const {response, json} = await request(url, options);
		console.log('Save consulta here')
		console.log(json)
		if(json){
			console.log('Response Save consulta here')
			console.log(json)
			
			callback();
			setShowModalCriarClientesFichas();
			setAtualizarClientesFichas(false);
			setIdClientesFichas(null);
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

	const requestAllFormularios = async() =>{
       
        const {url, options} = FORMULARIO_ALL_POST({}, getToken());


        const {response, json} = await dataRequest.request(url, options);
        console.log('All formulários here')
        console.log(json)
        if(json){
            setDataFormularios(json)
        }else{

        	setDataFormularios([]);
        }

            
    }

	const requestAllFormulariosGrupos = async(filters={}) =>{
       
        const {url, options} = FORMULARIO_GRUPO_ALL_POST({...filters}, getToken());


        const {response, json} = await dataRequestGrupoForm.request(url, options);
        console.log('All formulários here')
        console.log(json)
        if(json){
			let dataGr = json?.mensagem
            setDataFormulariosGrupos(dataGr)
        }else{

        	setDataFormulariosGrupos([]);
        }

            
    }
//setDataGruposFormularios
	const dataToFormClientesFichas = ()=>{
    	let obj = {filial_id:'', vrTotal:'',
			status:'', observacao:'', dsArquivo:'', pessoa_id:'', pessoa_rca_id:'', filial_id:'', user_id:'', user_update_id:'', active:'', deleted_at:'', created_at:'', updated_at:'', vr_final:'', vr_desconto:'', pct_acrescimo:'', vr_acrescimo:'', profissional_id:'', pct_desconto:''
		}
    	if(dataClientesFichasChoice && dataClientesFichasChoice.hasOwnProperty('mensagem')){
    		let data = dataClientesFichasChoice.mensagem;
			
    		if(data.hasOwnProperty('filial_id')){
                obj.filial_id = data.filial_id;
    		}

    		if(data.hasOwnProperty('vrTotal')){
    			obj.vrTotal = data.vrTotal;
    		}
			
			if(data.hasOwnProperty('status')){
    			obj.status = data.status;
    		}

			if(data.hasOwnProperty('observacao')){
    			obj.observacao = data.observacao;
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

	const preparaFormularioToForm = ()=>{
    	if(dataFormularios.hasOwnProperty('mensagem') && Array.isArray(dataFormularios.mensagem) && dataFormularios.mensagem.length > 0){
    		let filiais = dataFormularios.mensagem.map(({id, name}, index, arr)=>({label:name,valor:id,props:{}}))
    		filiais.unshift({label:'Selecione...',valor:'',props:{selected:'selected', /* disabled:'disabled' */}})
    		
    		return filiais;
    	}
    	return []
    }

	React.useEffect(()=>{

		if(dataClientesFichasChoice && dataClientesFichasChoice.hasOwnProperty('mensagem')){
			let data = dataClientesFichasChoice.mensagem;
			setDataitens(data?.item)
		}
		
	}, [])

    React.useEffect(()=>{
    	const requesFiliais = async ()=>{
    		await requestAllFiliais();
    	}
    	
    	requesFiliais();

    }, []);
	
	React.useEffect(()=>{
    	const requesFormularios = async ()=>{
    		await requestAllFormularios();
    	}
    	
    	requesFormularios();

    }, []);

	
	const getFormulario = async (idFormulario)=>{
		if(idFormulario > 0){

			const {url, options} = FORMULARIO_ONE_GET(idFormulario, getToken());
			const {response, json} = await request(url, options);
			
			if(json){
				
				if(json && json.hasOwnProperty('mensagem')){
					let data = json.mensagem;
					console.log("Formulário escolhido: ",data)
					setDataFormulario(data)
				}else{
					setDataFormulario([])
				}
				 
			}else{
				setDataFormulario([])
			}
		}
	}

	React.useEffect(()=>{
		if(idFormularioForm > 0){//''
			requestAllFormulariosGrupos({grupo_id:idFormularioForm})
		}else{
			setDataFormulariosGrupos([])
		}

	}, [idFormularioForm])

    console.log('----------------------------- data pais ----------------------------------')
    console.log(dataToFormClientesFichas())


	return(

		<>
			 <Formik 

                initialValues={{...dataToFormClientesFichas()}}
				enableReinitialize={true}
                validate={
                    values=>{

                        const errors = {}

                        /* if(!values.name){
                            errors.name="Obrigatório"
                        } */
									
						if(!values.filial_id){
							errors.filial_id="Obrigatório"    			
						}


						if(!values.pessoa_rca_id){
						    errors.pessoa_rca_id="Obrigatório"
						}

						if(!values.pessoa_id){
						    errors.pessoa_id="Obrigatório"
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
							bottomButtons={[{acao:()=>{setIsOramento(true); handleSubmit();}, label:'Orçamento', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faCheck} /> }]}
							handleConcluir={()=>{handleSubmit(); }}
							title={ (atualizarClientesFichas == true ? 'Atualizar' : 'Cadastrar')+' Ficha'}
							size="lg"
							propsConcluir={{'disabled':loading}}
							labelConcluir={loading ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
							dialogClassName={''}
							aria-labelledby={'aria-labelledby'}
							labelCanelar="Fechar"
							show={showModalCriarClientesFichas}
							showHide={()=>{setShowModalCriarClientesFichas();setAtualizarClientesFichas(false);setIdClientesFichas(null);}}
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
																contentLabel:'Formulário *',
																atributsFormLabel:{

																},
																atributsFormControl:{
																	type:'text',
																	name:'formulario_id',
																	placeholder:'Formulário',
																	id:'formulario_id',
																	//onChange:handleChange,
																	//onBlur:handleBlur,

																	onChange:(ev)=>{ setIdFormularioForm(ev.target.value); handleChange(ev)},
																	onBlur:(ev)=>{ setIdFormularioForm(ev.target.value);handleBlur(ev)},
																	value:values.formulario_id,
																	className:estilos.input,
																	size:"sm"
																},
																options:preparaFormularioToForm(),
																atributsContainer:{
																	className:''
																}
															}
														}
													
														component={FormControlSelect}
													></Field>
													<ErrorMessage className="alerta_error_form_label" name="formulario_id" component="div" />
													
													
												</Col>

												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel:true,
																contentLabel:'Sigiloso ? *',
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
											</Row>

											<Row className="mb-3">

												
												<Col xs="12" sm="12" md="12">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Observação *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'vrSaldoCreditoCliente',
																		placeholder:'Alguma observação....',
																		id:'vrSaldoCreditoCliente',
																		name_cod:'vrSaldoCreditoCliente',
																		name_desacription:'vrSaldoCreditoCliente',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.vrSaldoCreditoCliente,
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
													<ErrorMessage className="alerta_error_form_label" name="vrSaldoCreditoCliente" component="div" />
												</Col>
											</Row>
											
											{
												 dataRequestGrupoForm.carregando && dataRequestGrupoForm.carregando==true
												 ?
													 (<Load/>)
												 :
													 ( 
														Array.isArray(dataFormulariosGrupos) && dataFormulariosGrupos.length > 0 && 
														<Row className="my-3 mt-5">
															<Col xs="12" sm="12" md="12">
																{dataFormulariosGrupos.map((item, index, arr)=>{
																	return(

																		<FormClientesFichasItens
																			key={index+item?.id}
																			dataGrupo={dataGrupo}
																			idGrupoFormulario={item?.id}
																			setDataGrupo={setDataGrupo}
																			setDataClientesFichasGlobal={setDataClientesFichas}
																			values={values} handleChange={handleChange} handleBlur={handleBlur} idFormularioChoice={null}
																		/>
																	)
																})}
																
															</Col>
														</Row>

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

export default FormClientesFichas;
