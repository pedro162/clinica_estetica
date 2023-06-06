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

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_SAVE_POST, ORDEM_SERVICO_ITENS_ONE_GET , SERVICO_ALL_POST, SERVICO_UPDATE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, SERVICO_ONE_GET, ORDEM_SERVICO_ONE_GET, ORDEM_SERVICO_ADD_ITEM_POST, ORDEM_SERVICO_DELETE_ITEM_POST} from '../../../api/endpoints/geral.js'


const FormOrdemServicoItens = ({dataOrdemServicoChoice, setDataOrdemServicoGlobal, idOrdemServico, itensOrdem ,callback,carregando})=>{
	
	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] = React.useState([])
	const [dataItens, setDataItens] = React.useState([]);//itensOrdem
    const [dataOrdemServico, setDataOrdemServico] = React.useState(null)
	const [dataBodyTable, setDataBodyTable] = React.useState([])
	const [idItemOrdemServico, setIdItemOrdemServico] = React.useState(0)
	const [dataServicoItemEscolhido, setDataServicoItemEscolhido] = React.useState([])
	const [idServicoEscolhido, setIdServicoEscolhido] = React.useState(0)
	const [dataServicoEscolhido, setDataServicoEscolhido] = React.useState([])
	const [qtdSevicoForm, setQtdServicoForm] = React.useState(0)					//--- Controla a quantidade do serviço
	const [pctDescontoServicoForm, setPctDescontoServicoForm] = React.useState(0) 	//--- Contrla o percentual de desconto do serviço
	const [vrServicoForm, setVrServicoForm] = React.useState(0)						//--- Controla o valor do servico

	const userLogar =  ()=>{
        console.log('Aqui............')
    }

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
			await getOrdemServico(idOrdemServico);
			setDataServicoEscolhido([])
			setDataOrdemServico()
			//callback();
		}
    }
	const getOrdemServico = async (idOrdemServico)=>{
		if(idOrdemServico > 0){
			const {url, options} = ORDEM_SERVICO_ONE_GET(idOrdemServico, getToken());
			const {response, json} = await request(url, options);
			
			if(json){
				
				setDataOrdemServico(json)
				setDataOrdemServicoGlobal(json)
				if(json && json.hasOwnProperty('mensagem')){
					let data = json.mensagem;
					setDataItens(data?.item)
					
				}
				 
			}else{
				setDataOrdemServico([])
				setDataItens([])
			}
		}
	}
	React.useEffect(()=>{
		
		getOrdemServico(idOrdemServico);
		
	}, [idOrdemServico])

	const getServicoOrdem = async (idServico)=>{
		if(idServico > 0){

			const {url, options} = SERVICO_ONE_GET(idServico, getToken());
			const {response, json} = await request(url, options);
			
			if(json){
				
				if(json && json.hasOwnProperty('mensagem')){
					let data = json.mensagem;
					console.log("Item escolhido: ",data)
					setDataServicoEscolhido(data)
				}else{
					setDataServicoEscolhido([])
				}
				 
			}else{
				setDataServicoEscolhido([])
			}
		}
	}

	React.useEffect(()=>{
		if(idServicoEscolhido > 0){
			getServicoOrdem(idServicoEscolhido)
		}
	}, [idServicoEscolhido])


	const getItemOrdemServico = async (idItemOrdemServico)=>{
		if(idItemOrdemServico > 0){

			const {url, options} = ORDEM_SERVICO_ITENS_ONE_GET(idItemOrdemServico, getToken());
			const {response, json} = await request(url, options);
			
			if(json){
				
				if(json && json.hasOwnProperty('mensagem')){
					let data = json.mensagem;
					console.log("Item ordem serviço escolhido: ",data)
					setDataServicoItemEscolhido(data)
				}else{
					setDataServicoItemEscolhido([])
				}
				 
			}else{
				setDataServicoItemEscolhido([])
			}
		}
	}

	React.useEffect(()=>{
		if(idItemOrdemServico > 0){
			getItemOrdemServico(idItemOrdemServico)
		}
	}, [idItemOrdemServico])

	const dataToFormOrdemServicoItens = ()=>{
    	let obj = {name:'', vr_desconto:0, pct_desconto: 0, id:'', servico_id:'', vrItem:0, vrTotal:0, vr_final:0 , vrItemBruto:0, qtd:1}
    	if(dataServicoEscolhido){
			console.log('Conteceu...')
    		let data = dataServicoEscolhido;
           
			if(data.hasOwnProperty('id')){
                obj.id = data.id;
				obj.servico_id = data.id;
    		}

    		if(data.hasOwnProperty('name')){
                obj.name = data.name;
    		}

			if(data.hasOwnProperty('servico_id')){
                obj.servico_id = data.servico_id;
    		}

			if(data.hasOwnProperty('qtd')){
    			
				if(obj.qtd <= 0){
					obj.qtd = 1
				}else{
					obj.qtd = data.qtd;
				}

    		}else{
				obj.qtd = 1;
			}

			if(data.hasOwnProperty('pct_desconto')){
				
				obj.pct_desconto = data.pct_desconto;
    			
    		}else{
				obj.pct_desconto = 0;
			}
			
			if(obj.pct_desconto >= 100){
				obj.pct_desconto = 100
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

			if(Number(obj.vrItem) <= 0){
				obj.vrItem = data.vrServico //obj.vrItemBruto
			}

			if(Number(obj.vrItem) > Number(obj.vrItemBruto)){
				obj.vrItemBruto = obj.vrItem
			}

			if(data.hasOwnProperty('vr_desconto')){
    			obj.vr_desconto = data.vr_desconto;
    		}else{
				obj.vr_desconto = (obj.vrItemBruto * ( obj.pct_desconto/100));
			}

			obj.vrItem = obj.vrItemBruto - obj.vr_desconto;
			
			if(data.hasOwnProperty('vrTotal')){
    			obj.vrTotal = data.vrTotal;
    		}else{

				let vrIt = obj.hasOwnProperty('vrItemBruto') ? obj.vrItemBruto : 0;
				let qtdItem = obj.hasOwnProperty('qtd') ? obj.qtd : 1;
				qtdItem = Number(qtdItem)
				vrIt 	= Number(vrIt)
				obj.vrTotal = vrIt * qtdItem;
			}


			if(data.hasOwnProperty('vr_final')){
    			obj.vr_final = data.vr_final;
    		}else{
				obj.vr_final = obj.vrTotal - (obj.vr_desconto * obj.qtd);
			}

			
			
    		
    		
    	}

    	return obj;
    }

	React.useEffect(()=>{
		setDataServicoEscolhido({...dataServicoEscolhido, qtd:qtdSevicoForm})
	}, [qtdSevicoForm])


	React.useEffect(()=>{
		setDataServicoEscolhido({...dataServicoEscolhido, pct_desconto:pctDescontoServicoForm})
	}, [pctDescontoServicoForm])


	React.useEffect(()=>{
		
		if(vrServicoForm){
			setDataServicoEscolhido({...dataServicoEscolhido, vrItem:vrServicoForm})
		}

	}, [vrServicoForm])

	const excluirItem = async (idItem)=>{

		if(idItem > 0){
			const {url, options} = ORDEM_SERVICO_DELETE_ITEM_POST(idItem, getToken());
			const {response, json} = await request(url, options);
			
			if(json){
				
				await getOrdemServico(idOrdemServico);
				 
			}
		}
	}

	const removeItem = (idItem)=>{
		if(idItem > 0){
			excluirItem(idItem)
		}
	}

	const gerarTableOrdemServico = ()=>{
       
        let data = [];
        let dataRegistro = dataItens
        if(dataRegistro && Array.isArray(dataRegistro) && dataRegistro.length > 0){
            for(let i=0; !(i == dataRegistro.length); i++){
                let atual = dataRegistro[i];
				let indexAtual = (i+1);
                if(atual){
						//grupo, posicao
					let acoesArr = [];
					if(atual?.id > 0){
						acoesArr.push({acao:()=>{
								///setGrupo(atual?.grupo);
								//setPosicao(atual?.posicao);
								//setIdGrupo(atual?.id)
								setIdItemOrdemServico(atual?.id)
							}, label:'Editar', propsOption:{'className':'btn btn-sm'}, propsLabel:{}})
					}

                    data.push(

                        {
                            propsRow:{id:indexAtual},
                            acoes:acoesArr,
							acaoTrash:()=>removeItem(atual?.id),
                            celBodyTableArr:[
                                {

                                    label:atual?.servico_id,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.servico?.name,
                                    propsRow:{}
                                },
								{

                                    label:atual?.qtd,
                                    propsRow:{}
                                },
								{

                                    label:atual?.vrItem,
                                    propsRow:{}
                                },
								{

                                    label:atual?.vrTotal,
                                    propsRow:{}
                                },
								{

                                    label:atual?.vr_desconto,
                                    propsRow:{}
                                },
								{

                                    label:atual?.vr_final,
                                    propsRow:{}
                                },

                            ]
                        }

                    )

                }

            }
        }

        return data;
    }

    const gerarTitleCobTable = ()=>{
        let tableTitle = [
            {
                label:'Código',
                props:{}
            },
            {
                label:'Descrição',
                props:{}
            },
            {
                label:'QTDE',
                props:{}
            },
            {
                label:'VR ITEM',
                props:{}
            },
            {
                label:'TOT BRUTO',
                props:{}
            },
            {
                label:'VR DESCONTO',
                props:{}
            },
            {
                label:'VR FINAL',
                props:{}
            }
        ]

        return tableTitle;
    }

    const rowsTableArr 		= gerarTableOrdemServico();    
    const titulosTableArr 	= gerarTitleCobTable();
	const dataFormSev 		= dataToFormOrdemServicoItens()
	return(

		<>
			 <Formik 

                initialValues={{...dataFormSev}}
				enableReinitialize={true}
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
												<Col xs="12" sm="12" md="4">
													<Row className="my-3">
														<Col xs="12" sm="12" md="12">
															<span className="label_title_grup_forms">Adicionar serviço</span>
															<hr/>
														</Col>
													</Row>

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
																	{//
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
																			onChange:(ev)=>{ setVrServicoForm(ev.target.value);handleChange(ev)},
																			onBlur:(ev)=>{ setVrServicoForm(ev.target.value);handleBlur(ev)},
																			//onChange:handleChange,
																			//onBlur:handleBlur,
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
																			onChange:(ev)=>{ setQtdServicoForm(ev.target.value);handleChange(ev)},
																			onBlur:(ev)=>{ setQtdServicoForm(ev.target.value);handleBlur(ev)},
																			//onChange:handleChange,
																			//onBlur:handleBlur,
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
																			onChange:(ev)=>{ setPctDescontoServicoForm(ev.target.value);handleChange(ev)},
																			onBlur:(ev)=>{ setPctDescontoServicoForm(ev.target.value);handleBlur(ev)},
																			//onChange:handleChange,
																			//onBlur:handleBlur,
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
																			name:'vr_final',
																			placeholder:'0,00',
																			id:'vr_final',
																			onChange:handleChange,
																			onBlur:handleBlur,
																			value:values.vr_final,
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
															<ErrorMessage className="alerta_error_form_label" name="vr_final" component="div" />
															
														</Col>
													</Row>
													<Row className='mb-3'>
														
														<Col className="mt-3 offset-10" xs="12" sm="12" md="2">
															<ButtonBootstrap onClick={()=>{handleSubmit(); }} className='botao_success btn btn-sm' >Adicionar</ButtonBootstrap>
														</Col>
													</Row>
												</Col>

												<Col xs="12" sm="12" md="8">
													<Row className="my-3">
														<Col xs="12" sm="12" md="12">
															<span className="label_title_grup_forms">Serviços adicionados</span>
															<hr/>
														</Col>
													</Row>
													<Row className="mb-3">
														<Col xs="12" sm="12" md="12">
															
															<TableForm
																titulosTableArr={titulosTableArr}
																rowsTableArr={rowsTableArr}
																loading={loading}
																hasActionsCol={true}
																hasTrashAction={true}
																propsTrash={{className:'btn btn-sm btn-danger'}}

															/>
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

export default FormOrdemServicoItens;
