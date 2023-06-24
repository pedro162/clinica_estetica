import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row, Tabs, Tab, Button as ButtonBootstrap } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormOrdemServicoCobrancas.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import OrdemServicoItens from '../../OrdemServicoItens/index.js'
import TableForm from '../../Relatorio/TableForm/index.js';
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../../functions/index.js'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_SAVE_POST, ORDEM_SERVICO_ITENS_ONE_GET , SERVICO_ALL_POST, SERVICO_UPDATE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, SERVICO_ONE_GET, ORDEM_SERVICO_ONE_GET, ORDEM_SERVICO_ADD_ITEM_POST, ORDEM_SERVICO_DELETE_ITEM_POST, FORMA_PAGAMENTOALL_POST, FORMA_PAGAMENTO_ONE_GET, PLANO_PAGAMENTOALL_POST, PLANO_PAGAMENTO_ONE_GET} from '../../../api/endpoints/geral.js'


const FormOrdemServicoCobrancas = ({dataOrdemServicoChoice, setDataOrdemServicoGlobal, idOrdemServico, itensOrdem ,callback,carregando})=>{
	
	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] = React.useState([])
	const [dataFormaPagamento, setDataFormaPagamento] = React.useState([])
	const [dataPlanoPagamento, setDataPlanoPagamento] = React.useState([])
	const [dataCobrancas, setDataCobrancas] = React.useState([]);//itensOrdem
    const [dataOrdemServico, setDataOrdemServico] = React.useState(null)
	const [dataBodyTable, setDataBodyTable] = React.useState([])
	const [idFormaPagamentoOrdemServico, setIdFormaPagamentoOrdemServico] = React.useState(0)
	const [dataServicoItemEscolhido, setDataServicoItemEscolhido] = React.useState([])
	const [idServicoEscolhido, setIdServicoEscolhido] = React.useState(0)
	const [dataFormaPagamentoEscolhido, setDataFormaPagamentoEscolhido] = React.useState([])
	const [idFormaPagamentoForm, setIdFormaPagamentoForm] = React.useState(0)					//--- Controla a quantidade do serviço
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
			os_item_id,
		})=>{
			
			console.log('Save consulta here')
    	const data = {
    		'servico_id':servico_id,
    		'vr_desconto':vr_desconto,
			'pct_desconto':pct_desconto,
    		'vrItem':vrItem,
    		'vrItemBruto':vrItemBruto,
			'qtd':qtd,
			os_item_id,
    	}

		const {url, options} = ORDEM_SERVICO_ADD_ITEM_POST(idOrdemServico, data, getToken());


		const {response, json} = await request(url, options);
		console.log('Save consulta here')
		console.log(json)
		if(json){
			console.log('Response Save consulta here =====')
			console.log(json)
			await getOrdemServico(idOrdemServico);
			setDataFormaPagamentoEscolhido([])
			setDataServicoItemEscolhido([])
			setIdFormaPagamentoOrdemServico(null)
			setIdServicoEscolhido(null)
			
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
					setDataCobrancas(data?.cobranca)
					
				}
				 
			}else{
				setDataOrdemServico([])
				setDataCobrancas([])
			}
		}
	}
	React.useEffect(()=>{
		
		getOrdemServico(idOrdemServico);
		
	}, [idOrdemServico])

	const getFormaPagamentoOrdem = async (idFormaPagamento)=>{
		if(idFormaPagamento > 0){

			const {url, options} = FORMA_PAGAMENTO_ONE_GET(idFormaPagamento, getToken());
			const {response, json} = await request(url, options);
			
			if(json){
				
				if(json && json.hasOwnProperty('mensagem')){
					let data = json.mensagem;
					console.log("Item escolhido: ",data)
					setDataFormaPagamentoEscolhido(data)
				}else{
					setDataFormaPagamentoEscolhido([])
				}
				 
			}else{
				setDataFormaPagamentoEscolhido([])
			}
		}
	}

	const getFormaPagamentoAll = async ()=>{
		
		const {url, options} = FORMA_PAGAMENTOALL_POST({}, getToken());
		const {response, json} = await request(url, options);
		
		if(json){
				
			if(json && json.hasOwnProperty('mensagem')){
				let data = json.mensagem;
				console.log("Formas de pagamento: ",data)
				setDataFormaPagamento(data)
			}else{
				setDataFormaPagamento([])
			}
			 
		}else{
			setDataFormaPagamento([])
		}
	}

	const getPlanoPagamentoAll = async ()=>{
		if(!(idFormaPagamentoForm > 0)){
			setDataPlanoPagamento([])
			return false;
		}

		const {url, options} = PLANO_PAGAMENTOALL_POST({forma_pagamentos_id:idFormaPagamentoForm}, getToken());
		const {response, json} = await request(url, options);
		
		if(json){
				
			if(json && json.hasOwnProperty('mensagem')){
				let data = json.mensagem;
				console.log("Planos de pagamento: ",data)
				setDataPlanoPagamento(data)
			}else{
				setDataPlanoPagamento([])
			}
			 
		}else{
			setDataPlanoPagamento([])
		}
	}

	React.useEffect(()=>{
		if(idServicoEscolhido && idServicoEscolhido > 0){
			getFormaPagamentoOrdem(idServicoEscolhido)
			setIdFormaPagamentoOrdemServico(null)
			setDataServicoItemEscolhido([])
		}else{
			setDataFormaPagamentoEscolhido([])
			//getFormaPagamentoOrdem(null)
			//setIdFormaPagamentoOrdemServico(null)
			//setDataServicoItemEscolhido([])
		}

	}, [idServicoEscolhido])


	const getItemCobrancaOrdemServico = async (idFormaPagamentoOrdemServico)=>{
		if(idFormaPagamentoOrdemServico > 0){

			const {url, options} = ORDEM_SERVICO_ITENS_ONE_GET(idFormaPagamentoOrdemServico, getToken());
			const {response, json} = await request(url, options);
			
			if(json){
				
				if(json && json.hasOwnProperty('mensagem')){
					let data = json.mensagem;
					console.log("Item ordem serviço escolhido: ",data)
					let {id, servico_id, servico} = data
					
					setDataServicoItemEscolhido(data)

					console.log('servico_id:',servico_id)
					data.id = servico_id;
					data.os_item_id = id;
					data.name = servico?.name;
					data.vrServico = servico?.vrServico;
					
					console.log('Dados para formulário =======================================')
					console.log(data)
					console.log('Dados para formulário =======================================')
					setDataFormaPagamentoEscolhido(data)
				}else{
					setDataServicoItemEscolhido([])
					setDataFormaPagamentoEscolhido([])
				}
				 
			}else{
				setDataServicoItemEscolhido([])
				setDataFormaPagamentoEscolhido([])
			}
		}else{

			setDataServicoItemEscolhido([])
			setDataFormaPagamentoEscolhido([])
		}
	}

	React.useEffect(()=>{
		/* if(idFormaPagamentoOrdemServico > 0){
			getItemCobrancaOrdemServico(idFormaPagamentoOrdemServico)
		} */
		getItemCobrancaOrdemServico(idFormaPagamentoOrdemServico)
	}, [idFormaPagamentoOrdemServico])


	const dataToFormOrdemServicoCobrancas = ()=>{
    	let obj = {vr_saldo:'', vr_cobranca:'', id:'', oper_pagamentos_id:'', forma_pagamentos_id:'', plano_pagamentos_id:'', bandeira_cartao_id:'',}
    	if(dataFormaPagamentoEscolhido){
    		let data = dataFormaPagamentoEscolhido;

			if(data.hasOwnProperty('id')){
                obj.id = data.id;
				obj.servico_id = data.id;
    		}
           
			
    	}

    	return obj;
    }

	React.useEffect(()=>{
		setDataFormaPagamentoEscolhido({...dataFormaPagamentoEscolhido, qtd:qtdSevicoForm})
	}, [qtdSevicoForm])

	const calcularServico = ({pctDesconto, vrServicoForm})=>{
		let obj = {vr_saldo:'', vr_cobranca:'', id:'', oper_pagamentos_id:'', forma_pagamentos_id:'', plano_pagamentos_id:'', bandeira_cartao_id:'', ...dataFormaPagamentoEscolhido}
		let data = dataFormaPagamentoEscolhido;
		
		let escutaVrbruto 		= false;
		let escutaChangeVrItem 	= false;
		let escutaChangePctItem	= false;
		let escutaChangeQtdItem	= false;

		if(data.hasOwnProperty('id')){
			obj.id = data.id;
			obj.servico_id = data.id;
		}
		
		if(data.hasOwnProperty('os_item_id')){
			obj.os_item_id = data.os_item_id;
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

		/* if(data.hasOwnProperty('pct_desconto')){
			
			obj.pct_desconto = Number(FORMAT_CALC_COD(data.pct_desconto));
			
		}else{
			obj.pct_desconto = 0;
		} */

		if(data.hasOwnProperty('vrItemBruto')){
			escutaVrbruto = true;
			obj.vrItemBruto = Number(FORMAT_CALC_COD(data.vrItemBruto));
		}else if(data.hasOwnProperty('vrServico')){	
			obj.vrItemBruto = Number(FORMAT_CALC_COD(data.vrServico));
		}

		if(vrServicoForm != null && vrServicoForm != undefined){
			escutaChangeVrItem 	= true;
			vrServicoForm 		= Number(FORMAT_CALC_COD(vrServicoForm));
			

		}

		if(pctDesconto != null && pctDesconto != undefined){
			pctDesconto 		= Number(FORMAT_CALC_COD(pctDesconto));
			obj.pct_desconto 	= pctDesconto
			escutaChangePctItem	= true;

		}

		if(pctDesconto != null && pctDesconto != undefined){
			pctDesconto 		= Number(FORMAT_CALC_COD(pctDesconto));
			
			escutaChangePctItem	= true;

		}else{

			if(data.hasOwnProperty('pct_desconto')){
			
				obj.pct_desconto = Number(FORMAT_CALC_COD(data.pct_desconto));
				
			}else{
				obj.pct_desconto = 0;
			}
		}

		
		let vrItemCalc = obj.vrItemBruto;

		if(escutaChangePctItem){
			obj.pct_desconto 	= pctDesconto
			
			if(obj.pct_desconto >= 100){
				obj.pct_desconto = 100
			}
	
			obj.vr_desconto = (obj.vrItemBruto * ( obj.pct_desconto/100));
			obj.vr_desconto = Number(FORMAT_CALC_COD(obj.vr_desconto));

			vrItemCalc = obj.vrItemBruto - obj.vr_desconto;
			vrItemCalc = Number(FORMAT_CALC_COD(vrItemCalc));
			
			obj.vrItem  = vrItemCalc
			

		}else if(escutaChangeVrItem){
			obj.pct_desconto = 0
			obj.vrItem  = Number(FORMAT_CALC_COD(vrServicoForm));
			
			

			if(escutaVrbruto &&  obj.vrItemBruto > obj.vrItem){
				obj.vrItemBruto = data.vrServico;
				//alert(obj.vrItemBruto)
			}

			if(Number(obj.vrItem) > Number(obj.vrItemBruto)){
				obj.vrItemBruto = obj.vrItem
			}

			if(obj.vrItemBruto > obj.vrItem){
				let vrDes = obj.vrItemBruto - obj.vrItem;
				vrDes = Number(vrDes)
				if(! (vrDes > 0.01) ){
					vrDes = 0
				}

				obj.pct_desconto = (vrDes / Number(obj.vrItemBruto) ) * 100;
				obj.pct_desconto = Number(FORMAT_CALC_COD(obj.pct_desconto));
				
			}
	
			if(obj.pct_desconto >= 100){
				obj.pct_desconto = 100
			}
	
			obj.vr_desconto = (obj.vrItemBruto * ( obj.pct_desconto/100));
			obj.vr_desconto = Number(FORMAT_CALC_COD(obj.vr_desconto));
			

		}else if(escutaChangeQtdItem){
			
		}else{

			if(data.hasOwnProperty('pct_desconto')){
					
				obj.pct_desconto = Number(FORMAT_CALC_COD(data.pct_desconto));
				
			}else{
				obj.pct_desconto = 0;
			}
			

			if(data.hasOwnProperty('vrItemBruto')){
				obj.vrItemBruto = Number(FORMAT_CALC_COD(data.vrItemBruto));
			}else if(data.hasOwnProperty('vrServico')){	
				obj.vrItemBruto = Number(FORMAT_CALC_COD(data.vrServico));
			}

			if(data.hasOwnProperty('vrItem')){
				obj.vrItem = Number(FORMAT_CALC_COD(data.vrItem));
			}else if(data.hasOwnProperty('vrServico')){	
				obj.vrItem = Number(FORMAT_CALC_COD(data.vrServico));				
			}

			if(obj.pct_desconto >= 100){
				obj.pct_desconto = 100
			}

			obj.vr_desconto = (obj.vrItemBruto * ( obj.pct_desconto/100));
			obj.vr_desconto = Number(FORMAT_CALC_COD(obj.vr_desconto));
			
		}
		
		
		
		

		

		let vrIt = obj.hasOwnProperty('vrItemBruto') ? obj.vrItemBruto : 0;
		let qtdItem = obj.hasOwnProperty('qtd') ? obj.qtd : 1;
		qtdItem = Number(qtdItem)
		vrIt 	= Number(vrIt)
		obj.vrTotal = vrIt * qtdItem;

		obj.vr_final = obj.vrTotal - (obj.vr_desconto * obj.qtd); 
		console.log('Conteceu obj ...================================================')
		console.log(obj)
		console.log('Conteceu obj ..================================================')

    	return obj;
	}

	const handleChangePctDesconto = (value)=>{
		let pctDesconto = value
		pctDesconto = Number(FORMAT_CALC_COD(pctDesconto));
		if(pctDesconto >= 100){
			pctDesconto = 100
		}else if(pctDesconto < 0){
			pctDesconto = 0;
		}
		console.log('pctDesconto======================================='+pctDesconto)
		setPctDescontoServicoForm(pctDesconto);
	}
	React.useEffect(()=>{
		let pctDesconto  = pctDescontoServicoForm;
		let cloneServicoEscolhido = dataFormaPagamentoEscolhido
		if(cloneServicoEscolhido){

			if(pctDesconto >= 100){
				pctDesconto = 100
			}else if(pctDesconto < 0){
				pctDesconto = 0;
			}
			
		}
		//calcularServico({pctDesconto})
		setDataFormaPagamentoEscolhido({...dataFormaPagamentoEscolhido, ...calcularServico({pctDesconto}) })
	}, [pctDescontoServicoForm])


	React.useEffect(()=>{
		
		/* if(vrServicoForm){
			console.log('aqui bonitinho========================================')
			setDataFormaPagamentoEscolhido({...dataFormaPagamentoEscolhido, vrItem:vrServicoForm, pct_desconto:0})
		} */

		setDataFormaPagamentoEscolhido({...dataFormaPagamentoEscolhido, ...calcularServico({vrServicoForm}) })

	}, [vrServicoForm])

	React.useEffect(()=>{
		getFormaPagamentoAll();
	}, []);

	React.useEffect(()=>{
		getPlanoPagamentoAll();
		//idFormaPagamentoForm 
		//alert(idFormaPagamentoForm)
	}, [idFormaPagamentoForm]);

	


	
	const preparaFormaPagamentoToForm = ()=>{
    	if(dataFormaPagamento && Array.isArray(dataFormaPagamento) && dataFormaPagamento.length > 0){
    		let formaPgto = dataFormaPagamento.map(({id, name}, index, arr)=>({label:name,valor:id,props:{}}))
    		//formaPgto.unshift({label:'Teste',valor:'2',props:{selected:'selected'}})
			formaPgto.unshift({label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}})
    		console.table(formaPgto)
    		return formaPgto;
    	}
    	return []
    }

	const preparaPlanoPagamentoToForm = ()=>{
    	if(dataPlanoPagamento && Array.isArray(dataPlanoPagamento) && dataPlanoPagamento.length > 0){
    		let formaPgto = dataPlanoPagamento.map(({id, name}, index, arr)=>({label:name,valor:id,props:{}}))
    		formaPgto.unshift({label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}})
    		console.table(formaPgto)
    		return formaPgto;
    	}
    	return []
    }
	//dataPlanoPagamento, setDataPlanoPagamento
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
        let dataRegistro = dataCobrancas
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
								setIdFormaPagamentoOrdemServico(atual?.id)
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

                                    label:FORMAT_MONEY(atual?.qtd),
                                    propsRow:{}
                                },
                                {

                                    label:atual?.servico?.name,
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
                label:'VALOR',
                props:{}
            },
            {
                label:'PLANO',
                props:{}
            },
        ]

        return tableTitle;
    }

    const rowsTableArr 		= gerarTableOrdemServico();    
    const titulosTableArr 	= gerarTitleCobTable();
	const dataFormSev 		= dataToFormOrdemServicoCobrancas()
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
															<span className="label_title_grup_forms">Adicionar cobrança</span>
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
														<Col xs="12" sm="12" md="6">
															<Field
																data={
																	{
																		hasLabel:true,
																		contentLabel:'Saldo *',
																		atributsFormLabel:{

																		},
																		atributsFormControl:{
																			type:'text',
																			name:'vr_saldo',
																			placeholder:'0,00',
																			id:'vr_saldo',
																			onChange:handleChange,
																			onBlur:handleBlur,
																			value:values.vr_saldo,
																			className:estilos.input,
																			size:"sm",
																			readonly:'readonly'
																		},
																		options:[],
																		atributsContainer:{
																			className:''
																		}
																	}
																}
															
																component={FormControlInput}
															></Field>
															<ErrorMessage className="alerta_error_form_label" name="vr_saldo" component="div" />
															
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
																			name:'vr_cobranca',
																			placeholder:'0,00',
																			id:'vr_cobranca',
																			onChange:(ev)=>{ /* setVrServicoForm(ev.target.value); */handleChange(ev)},
																			onBlur:(ev)=>{ setVrServicoForm(ev.target.value);handleBlur(ev)},
																			//onChange:handleChange,
																			//onBlur:handleBlur,
																			value:values.vr_cobranca,
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
															<ErrorMessage className="alerta_error_form_label" name="vr_cobranca" component="div" />
															
														</Col>
																												
													</Row>

													<Row className='mb-3'>
														

														<Col xs="12" sm="12" md="6">
															<Field
																data={
																	{
																		hasLabel:true,
																		contentLabel:'Forma pagamento *',
																		atributsFormLabel:{

																		},
																		atributsFormControl:{
																			type:'text',
																			name:'forma_pagamento_id',
																			placeholder:'Vendedor',
																			id:'forma_pagamento_id',
																			//onChange:handleChange,
																			//onBlur:handleBlur,
																			onChange:(ev)=>{ setIdFormaPagamentoForm(ev.target.value);handleChange(ev)},
																			onBlur:(ev)=>{ setIdFormaPagamentoForm(ev.target.value);handleBlur(ev)},
																			value:values.forma_pagamento_id,
																			className:estilos.input,
																			size:"sm"
																		},
																		options:preparaFormaPagamentoToForm(),
																		atributsContainer:{
																			className:''
																		}
																	}
																}
																
																component={FormControlSelect}
															></Field>
															<ErrorMessage className="alerta_error_form_label" name="forma_pagamento_id" component="div" />
														</Col>

														<Col xs="12" sm="12" md="6">
															<Field
																data={
																	{
																		hasLabel:true,
																		contentLabel:'Plano pagamento *',
																		atributsFormLabel:{

																		},
																		atributsFormControl:{
																			type:'text',
																			name:'plano_pagamento_id',
																			placeholder:'Vendedor',
																			id:'plano_pagamento_id',
																			onChange:handleChange,
																			onBlur:handleBlur,
																			value:values.plano_pagamento_id,
																			className:estilos.input,
																			size:"sm"
																		},
																		options:preparaPlanoPagamentoToForm(),
																		atributsContainer:{
																			className:''
																		}
																	}
																}
																
																component={FormControlSelect}
															></Field>
															<ErrorMessage className="alerta_error_form_label" name="plano_pagamento_id" component="div" />
														</Col>
													</Row>
													<Row className='mb-3'>
														

														<Col xs="12" sm="12" md="6">
															<Field
																data={
																	{
																		hasLabel:true,
																		contentLabel:'Operador financeiro *',
																		atributsFormLabel:{

																		},
																		atributsFormControl:{
																			type:'text',
																			name:'operador_financeiro_id',
																			placeholder:'Vendedor',
																			id:'operador_financeiro_id',
																			onChange:handleChange,
																			onBlur:handleBlur,
																			value:values.operador_financeiro_id,
																			className:estilos.input,
																			size:"sm"
																		},
																		options:preparaFormaPagamentoToForm(),
																		atributsContainer:{
																			className:''
																		}
																	}
																}
																
																component={FormControlSelect}
															></Field>
															<ErrorMessage className="alerta_error_form_label" name="operador_financeiro_id" component="div" />
														</Col>

														<Col xs="12" sm="12" md="6">
															<Field
																data={
																	{
																		hasLabel:true,
																		contentLabel:'Bandeira cartão *',
																		atributsFormLabel:{

																		},
																		atributsFormControl:{
																			type:'text',
																			name:'bandeira_cartao_id',
																			placeholder:'Vendedor',
																			id:'bandeira_cartao_id',
																			onChange:handleChange,
																			onBlur:handleBlur,
																			value:values.bandeira_cartao_id,
																			className:estilos.input,
																			size:"sm"
																		},
																		options:preparaFormaPagamentoToForm(),
																		atributsContainer:{
																			className:''
																		}
																	}
																}
																
																component={FormControlSelect}
															></Field>
															<ErrorMessage className="alerta_error_form_label" name="bandeira_cartao_id" component="div" />
														</Col>

														
													</Row>
													<Row className='mb-3'>
														<Col xs="12" sm="12" md="6">
															<Field
																data={
																	{//
																		hasLabel:true,
																		contentLabel:'CV / DOC',
																		atributsFormLabel:{

																		},
																		atributsFormControl:{
																			type:'text',
																			name:'doc',
																			placeholder:'CV / DOC / NSU',
																			id:'doc',
																			onChange:handleChange,
																			onBlur:handleBlur,
																			value:values.doc,
																			className:estilos.input,
																			size:"sm",
																		},
																		options:[],
																		atributsContainer:{
																			className:''
																		}
																	}
																}
															
																component={FormControlInput}
															></Field>
															<ErrorMessage className="alerta_error_form_label" name="doc" component="div" />
															
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
															<span className="label_title_grup_forms">Cobranças adicionadas</span>
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

export default FormOrdemServicoCobrancas;
