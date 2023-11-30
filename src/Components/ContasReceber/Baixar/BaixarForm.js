import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row, Tabs, Tab } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './BaixarForm.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import Caixa from '../../Caixa/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../../functions/index.js'
import Swal from 'sweetalert2'


import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_SAVE_POST, SERVICO_ALL_POST, CONTAS_RECEBER_BAIXAR_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST} from '../../../api/endpoints/geral.js'


const BaixarForm = ({dataContasReceberChoice, setDataContasReceber, setIdContasReceber, idContasReceber, showModalCriarContasReceber, setShowModalCriarContasReceber, callback, atualizarContasReceber, baixarContasReceber, setBaixarContasReceber, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] 	= React.useState([])
	const [dataItens, setDataitens]		 	= React.useState()
	const [vrJurosForm, setVrJurosForm]		 		= React.useState(0)
	const [vrMultaForm, setVrMultaForm]		 		= React.useState(0)
	const [vrAcrescimosForm, setVrAcrescimosForm]	= React.useState(0)
	const [vrDescontoForm, setVrDescontoForm]		= React.useState(0)

	const [dataBaixaContasReceber, setDataBaixaContasReceber] = React.useState(dataContasReceberChoice.mensagem)


	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async (dados)=>{
			
		const data = {
			...dados,
			vr_pago:dados?.vr_final,
			observacao:dados?.ds_observacao
		}
		

		const {url, options} = CONTAS_RECEBER_BAIXAR_POST(idContasReceber, data, getToken());


		const {response, json} = await request(url, options);
		console.log('Save consulta here')
		console.log(json)


		if(json){
			console.log('Response Save consulta here')
			console.log(json)
			
			callback();
			setShowModalCriarContasReceber();
			setBaixarContasReceber(false);
			setIdContasReceber(null);

			Swal.fire({
			  icon: "success",
			  title: "",
			  text: 'Reigistrado com sucesso',
			  footer: '',//'<a href="#">Why do I have this issue?</a>'
			  confirmButtonColor: "#07B201",
			});
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

    const handleChangeDesconto = (ve)=>{
    	let vrDesconto 	= ve.target.value
    	vrDesconto		= FORMAT_CALC_COD(vrDesconto)
    	vrDesconto 		= Number(vrDesconto)
    	//console.log({vrDesconto })

    	let vrJuros		= FORMAT_CALC_COD(vrJurosForm)
    	vrJuros 		= Number(vrJuros)


    	let vrMulta		= FORMAT_CALC_COD(vrMultaForm)
    	vrMulta 		= Number(vrMulta)
    	console.log({vrMultaForm,vrJurosForm })
//
    	if( (vrMulta > 0 || vrMulta > 0) && vrDesconto > 0){
			//vrDesconto = 0;

		}
		console.log({vrMultaForm,vrJurosForm,vrDesconto })
		setVrDescontoForm(vrDesconto)
    }

	const calcularCobranca = (objParams={})=>{
    	let obj = {filial_id:'', vrLiquido:'',status:'', vr_total:'', vr_acrescimo:'', vr_final:'', vr_multa:'', vr_juros:'', vr_desconto:'', ds_observacao:'', ...dataBaixaContasReceber}
    	let data = dataBaixaContasReceber;//dataContasReceberChoice?.mensagem;
    	/*
			if(dataContasReceberChoice && dataContasReceberChoice.hasOwnProperty('mensagem')){
    		let data = dataContasReceberChoice.mensagem;
    	*/
    	//console.log('======================================== objParams ================')//vrMultaForm
    	//console.log(objParams)
    	//
    	let vrJurosForm 		= objParams?.vrJurosForm
    	let vrMultaForm 		= objParams?.vrMultaForm
    	let vrDescontoForm 		= objParams?.vrDescontoForm
    	let vrAcrescimosForm 	= objParams?.vrAcrescimosForm

    	if(data.hasOwnProperty('filial_id')){
            obj.filial_id = data.filial_id;
		}

		if(data.hasOwnProperty('vrLiquido')){
			obj.vrLiquido = data.vrLiquido;
			obj.vr_total = data.vrLiquido;
		}
		
		if(data.hasOwnProperty('status')){
			obj.status = data.status;
		}

		//console.log('vrDesconto: '+vrDescontoForm)

		let vrJuros 	= 0
		let vrDesconto 	= 0
		let vrMulta 	= 0
		let vrAcrescimo	= 0
		let vrBaixar	= FORMAT_CALC_COD(data?.vrLiquido)
		let subTotal	= 0;
		//console.log("=========================== "+vrBaixar +"================================")

		if(vrJurosForm  != undefined && vrJurosForm != null){
			vrJuros 	= FORMAT_CALC_COD(vrJurosForm)
		}else if(data.hasOwnProperty('vr_juros')){
			vrJuros = FORMAT_CALC_COD(data.vr_juros);
		}

		if(vrDescontoForm != undefined && vrDescontoForm != null){
			vrDesconto 	= FORMAT_CALC_COD(vrDescontoForm)

		}else if(data.hasOwnProperty('vr_desconto')){
			vrDesconto = FORMAT_CALC_COD(data.vr_desconto);
		}

		if(vrMultaForm != undefined && vrMultaForm != null){
			vrMulta 	= FORMAT_CALC_COD(vrMultaForm)
		}else if(data.hasOwnProperty('vr_multa')){
			vrMulta = FORMAT_CALC_COD(data.vr_multa);

		}

		if(vrAcrescimosForm  != undefined && vrAcrescimosForm != null){
			vrAcrescimo 	= FORMAT_CALC_COD(vrAcrescimosForm)
		}else if(data.hasOwnProperty('vr_acrescimo')){
			vrAcrescimo = FORMAT_CALC_COD(data.vr_acrescimo);
		}

		Number(vrJuros)
		Number(vrDesconto)
		Number(vrMulta)
		Number(vrAcrescimo)
		Number(vrBaixar)

		if(!( !isNaN(vrJuros) && vrJuros >= 0)){
			vrJuros = 0;
		}else{

		}
		console.log('vrDesconto: '+vrDesconto)
		if(!( !isNaN(vrDesconto) && vrDesconto >= 0)){
			vrDesconto = 0;
		}

		if(!( !isNaN(vrMulta) && vrMulta >= 0)){
			vrMulta = 0;
		}

		if(!( !isNaN(vrAcrescimo) && vrAcrescimo >= 0)){
			vrAcrescimo = 0;
		}

		if(!( !isNaN(vrBaixar) && vrBaixar >= 0)){
			vrBaixar = 0;
		}

		console.log('vrDesconto: '+vrDesconto)
		console.log('vrMulta: '+vrMulta)
		console.log('vrJuros: '+vrJuros)

		if( (vrMulta > 0 || vrJuros > 0) && vrDesconto > 0){
			vrDesconto = 0;

		}
		
		subTotal = vrBaixar + vrMulta + vrJuros + vrAcrescimo;

		if(vrDesconto >= subTotal){
			vrDesconto = 0;
		}

		subTotal += vrDesconto

		obj.vr_final = FORMAT_MONEY(subTotal);

		obj.vr_desconto 	= vrDesconto//FORMAT_MONEY(vrDesconto);
		obj.vr_juros 		= vrJuros//FORMAT_MONEY(vrJuros);
		obj.vr_multa 		= vrMulta//FORMAT_MONEY(vrMulta);
		obj.vr_acrescimo 	= vrAcrescimo//FORMAT_MONEY(vrAcrescimo);

    	return obj;
    }



	React.useEffect(()=>{

		if(dataContasReceberChoice && dataContasReceberChoice.hasOwnProperty('mensagem')){
			let data = dataContasReceberChoice.mensagem;
			//console.log('========================================')//
    		//console.log(data)
			setDataBaixaContasReceber(data)
		}

		
	}, [])


    React.useEffect(()=>{
		
		setDataBaixaContasReceber({...dataBaixaContasReceber, ...calcularCobranca({vrJurosForm}) })

	}, [vrJurosForm])

	React.useEffect(()=>{
		console.log('Multa: '+vrMultaForm)
		setDataBaixaContasReceber({...dataBaixaContasReceber, ...calcularCobranca({vrMultaForm}) })

	}, [vrMultaForm])

	React.useEffect(()=>{
		
		setDataBaixaContasReceber({...dataBaixaContasReceber, ...calcularCobranca({vrDescontoForm}) })

	}, [vrDescontoForm])

	React.useEffect(()=>{
		
		setDataBaixaContasReceber({...dataBaixaContasReceber, ...calcularCobranca({vrAcrescimosForm}) })

	}, [vrAcrescimosForm])
 


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
    console.log(calcularCobranca())

	const dataFormCob 		= calcularCobranca({})


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

	return(

		<>
			 <Formik 

                initialValues={{...dataFormCob}}
				enableReinitialize={true}
                validate={
                    values=>{

                        const errors = {}


						if(!values.caixa_id){
						    errors.caixa_id="Obrigatório"
						}

						if(!values.vr_final){
						    errors.vr_final="Obrigatório"
						}

						if(!values.ds_observacao){
						    errors.ds_observacao="Obrigatório"
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

						<Modal  handleConcluir={()=>{handleSubmit(); }}  title={ 'Baixar Contas a Receber'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarContasReceber} showHide={()=>{setShowModalCriarContasReceber();setBaixarContasReceber(false);setIdContasReceber(null);}}>
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
																	contentLabel:'Caixa *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'caixa_id',
																		placeholder:'Ex: caixa',
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
															ComponentFilter={<Caixa/>}
															titleCompontent={'Caixa'}
															component={Required}
													>   </Field>    
													<ErrorMessage className="alerta_error_form_label" name="caixa_id" component="div" />
												</Col>
												
												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Total bruto *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'vr_total',
																		placeholder:'0,00',
																		id:'vr_total',
																		name_cod:'vr_total',
																		name_desacription:'vr_total',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.vr_total,
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
													<ErrorMessage className="alerta_error_form_label" name="vr_total" component="div" />
												</Col>

												
											</Row>
											<Row className="mb-3">
												

												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'R$ Juros',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'vr_juros',
																		placeholder:'0,00',
																		id:'vr_juros',
																		name_cod:'vr_juros',
																		name_desacription:'vr_juros',
																		//onChange:handleChange,
																		//onBlur:handleBlur,
																		onChange:(ev)=>{ setVrJurosForm(ev.target.value); handleChange(ev)},
																		onBlur:(ev)=>{ setVrJurosForm(ev.target.value);handleBlur(ev)},
																		value:values.vr_juros,
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
													<ErrorMessage className="alerta_error_form_label" name="vr_juros" component="div" />
												</Col>

												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'R$ multa',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'vr_multa',
																		placeholder:'0,00',
																		id:'vr_multa',
																		name_cod:'vr_multa',
																		name_desacription:'vr_multa',
																		//onChange:handleChange,
																		//onBlur:handleBlur,
																		onChange:(ev)=>{ setVrMultaForm(ev.target.value); handleChange(ev)},
																		onBlur:(ev)=>{ setVrMultaForm(ev.target.value);handleBlur(ev)},
																		value:values.vr_multa,
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
													<ErrorMessage className="alerta_error_form_label" name="vr_multa" component="div" />
												</Col>
											</Row>
											
											<Row className="mb-3">

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
																		name_cod:'vr_desconto',
																		name_desacription:'vr_desconto',
																		//onChange:handleChange,
																		//onBlur:handleBlur,

																		onChange:(ev)=>{ setVrDescontoForm(ev.target.value); handleChange(ev)},
																		onBlur:(ev)=>{ setVrDescontoForm(ev.target.value);handleBlur(ev)},
																		value:values.vr_desconto,
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
													<ErrorMessage className="alerta_error_form_label" name="vr_desconto" component="div" />
												</Col>

												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'R$ Acréssimos',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'vr_acrescimo',
																		placeholder:'0,00',
																		id:'vr_acrescimo',
																		name_cod:'vr_acrescimo',
																		name_desacription:'vr_acrescimo',
																		//onChange:handleChange,
																		//onBlur:handleBlur,
																		onChange:(ev)=>{ setVrAcrescimosForm(ev.target.value); handleChange(ev)},
																		onBlur:(ev)=>{ setVrAcrescimosForm(ev.target.value);handleBlur(ev)},
																		value:values.vr_acrescimo,
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
													<ErrorMessage className="alerta_error_form_label" name="vr_acrescimo" component="div" />
												</Col>
											</Row>

											<Row className="mb-3">
												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'Histórico',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'ds_observacao',
																		placeholder:'Observação de baixa',
																		id:'ds_observacao',
																		name_cod:'ds_observacao',
																		name_desacription:'ds_observacao',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.ds_observacao,
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
													<ErrorMessage className="alerta_error_form_label" name="ds_observacao" component="div" />
												</Col>

												<Col xs="12" sm="12" md="6">
													<Field
															data={
																{
																	hasLabel:true,
																	contentLabel:'R$ valor final *',
																	atributsFormLabel:{

																	},
																	atributsFormControl:{
																		type:'text',
																		name:'vr_final',
																		placeholder:'0,00',
																		id:'vr_final',
																		name_cod:'vr_final',
																		name_desacription:'vr_final',
																		onChange:handleChange,
																		onBlur:handleBlur,
																		value:values.vr_final,
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
													<ErrorMessage className="alerta_error_form_label" name="vr_final" component="div" />
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

export default BaixarForm;
