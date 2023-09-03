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

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, COBRANCA_ORDEM_ONE_GET ,  ORDEM_SERVICO_ONE_GET, COBRANCA_ORDEM_DELETE_POST, FORMA_PAGAMENTOALL_POST, FORMA_PAGAMENTO_ONE_GET, PLANO_PAGAMENTOALL_POST, PLANO_PAGAMENTO_ONE_GET, OPERADOR_FINANCEIROALL_POST, COBRANCA_ORDEM_SAVE_POST, COBRANCA_ORDEM_UPDATE_POST} from '../../../api/endpoints/geral.js'


const FormOrdemServicoCobrancas = ({dataOrdemServicoChoice, setDataOrdemServicoGlobal, idOrdemServico, itensOrdem ,callback,carregando, qtdAtualizaCobrancas})=>{
	
	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataFormaPagamento, setDataFormaPagamento] = React.useState([])
	const [dataPlanoPagamento, setDataPlanoPagamento] = React.useState([])
	const [dataOperadorFinanceiro, setDataOperadorFinanceiro] = React.useState([])
	const [dataCobrancas, setDataCobrancas] = React.useState([]);//itensOrdem
    const [dataOrdemServico, setDataOrdemServico] = React.useState(null)
	const [dataBodyTable, setDataBodyTable] = React.useState([])
	const [idCobrancaEcolhidaOrdemServico, setIdCobrancaEscolhidaOrdemServico] = React.useState(0)
	const [dataServicoItemEscolhido, setDataServicoItemEscolhido] = React.useState([])
	const [idServicoEscolhido, setIdServicoEscolhido] = React.useState(0)
	const [dataFormaPagamentoEscolhido, setDataFormaPagamentoEscolhido] = React.useState([])
	const [idFormaPagamentoForm, setIdFormaPagamentoForm] = React.useState(0)				//--- Controla a quantidade do serviço
	const [vrCobrancaForm, setVrCobrancaForm] = React.useState(0)					//--- Controla a quantidade do serviço
	const [idPlanoPagamentoForm, setIdPlanoPagamentoForm] = React.useState(0)		//--- Controla a quantidade do serviço
	const [idOperadorFinanceiroForm, setIdOperadorFinanceiroForm] = React.useState(0)
	const [nrDocForm, setNrDocForm] = React.useState('')	

	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
		forma_pagamento_id,
		operador_financeiro_id,
		plano_pagamento_id,
		nr_doc,
		dt_vencimento_manual,
		vr_cobranca,
		cobranca_id,
		})=>{
			
		
		console.log('Save consulta here')
    	const data = {
    		'ordem_servico_id':idOrdemServico,
    		'forma_pagamento_id':forma_pagamento_id,
			'operador_financeiro_id':operador_financeiro_id,
    		'plano_pagamento_id':plano_pagamento_id,
    		'nr_doc':nr_doc,
			'dt_vencimento_manual':dt_vencimento_manual,
			'vr_cobranca':vr_cobranca,
			cobranca_id,
    	}
		let jsonResponse = null;
		if(Number(idCobrancaEcolhidaOrdemServico) > 0){
			//console.log(data)
			//COBRANCA_ORDEM_UPDATE_POST = (id,data, token)
			const {url, options} = COBRANCA_ORDEM_UPDATE_POST(idCobrancaEcolhidaOrdemServico, data, getToken());


			const {response, json} = await request(url, options);
			//console.log('Save cobrança here')
			//console.log(json)
			jsonResponse = json

		}else{

		
			//console.log(data)
			const {url, options} = COBRANCA_ORDEM_SAVE_POST(data, getToken());


			const {response, json} = await request(url, options);
			//console.log('Save cobrança here')
			//console.log(json)
			jsonResponse = json
			
		}

		if(jsonResponse){
				
			await getOrdemServico(idOrdemServico);
			/* setDataFormaPagamentoEscolhido([])
			setDataServicoItemEscolhido([])
			setIdCobrancaEscolhidaOrdemServico(null)
			setIdServicoEscolhido(null) */
			limparFormulario()
			//setDataOrdemServico()
			getFormaPagamentoAll();
			//calcularSaldoCobranca
			//callback();
		}

    }

	const limparFormulario = ()=>{
		setDataFormaPagamentoEscolhido([])
		setDataServicoItemEscolhido([])
		setIdCobrancaEscolhidaOrdemServico(null)
		setIdServicoEscolhido(null)

		setIdPlanoPagamentoForm(null)
		setIdOperadorFinanceiroForm(null)
		setVrCobrancaForm(0)
		setIdFormaPagamentoForm(0)
		setDataFormaPagamento(null)
		setDataPlanoPagamento(null)
		setDataOperadorFinanceiro(null)
		setNrDocForm(null)
	}

	const getTotalCobrancas = ()=>{
		let totalCobrancas 	= 0;
		let dataRegistro 	= dataCobrancas
        if(dataRegistro && Array.isArray(dataRegistro) && dataRegistro.length > 0){
            for(let i=0; !(i == dataRegistro.length); i++){
                let atual = dataRegistro[i];
                if(atual){
					totalCobrancas += Number(atual?.vr_final)
					
                }

            }
        }

		return totalCobrancas;
	}

	const calcularSaldoCobranca = ()=>{
		//console.log('Data venda --------------------')
		//console.log(dataOrdemServicoChoice)
		//console.log('Data venda ------------------------')
		let saldo 	= 0;
		let totCob 	= getTotalCobrancas()
		totCob 		= Number(totCob)

		let vrOs 	= dataOrdemServico?.mensagem?.vr_final;
		vrOs 		= Number(vrOs)

		saldo 			= vrOs - totCob;
		let saldoAbs 	= Math.abs(saldo);

		//console.log('VAlor vrOs: '+vrOs)
		//console.log('Total cobranças: '+totCob)
		//---Não tem mais saldo
		if(! (saldoAbs > 0.02)){
			saldo = 0;
			
		}else if(totCob > vrOs){
			
			saldo = 0;
		}
		//console.log('Saldo calculado: '+saldo)
		return saldo;
	}

	

	const getOrdemServico = async (idOrdemServico)=>{
		if(idOrdemServico > 0){
			const {url, options} = ORDEM_SERVICO_ONE_GET(idOrdemServico, getToken());
			const {response, json} = await request(url, options);
			
			console.log('Data venda99999999 --------------------')
		console.log(json)
		console.log('Data venda99999999 ------------------------')
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
		console.log('================ qtdAtualizaCobrancas '+qtdAtualizaCobrancas+' ========================================')
		
	}, [idOrdemServico, qtdAtualizaCobrancas])
	
	const getFormaPagamentoOrdem = async (idFormaPagamento)=>{
		if(idFormaPagamento > 0){

			const {url, options} = FORMA_PAGAMENTO_ONE_GET(idFormaPagamento, getToken());
			const {response, json} = await request(url, options);
			
			if(json){
				
				if(json && json.hasOwnProperty('mensagem')){
					let data = json.mensagem;
					//console.log("Item escolhido: ",data)
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
				//console.log("Formas de pagamento: ",data)
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

		const {url, options} = PLANO_PAGAMENTOALL_POST({forma_pagamento_id:idFormaPagamentoForm}, getToken());
		const {response, json} = await request(url, options);
		
		if(json){
				
			if(json && json.hasOwnProperty('mensagem')){
				let data = json.mensagem;
				//console.log("Planos de pagamento: ",data)
				setDataPlanoPagamento(data)
			}else{
				setDataPlanoPagamento([])
			}
			 
		}else{
			setDataPlanoPagamento([])
		}
	}

	const getOperadorFinanceiroAll = async ()=>{
		if(!(idFormaPagamentoForm > 0)){
			setDataOperadorFinanceiro([])
			return false;
		}

		const {url, options} = OPERADOR_FINANCEIROALL_POST({forma_pagamento_id:idFormaPagamentoForm}, getToken());
		const {response, json} = await request(url, options);
		
		if(json){
				
			if(json && json.hasOwnProperty('mensagem')){
				let data = json.mensagem;
				//console.log("Operadores financeiros: ",data)
				setDataOperadorFinanceiro(data)
			}else{
				setDataOperadorFinanceiro([])
			}
			 
		}else{
			setDataOperadorFinanceiro([])
		}
	}
	//
	React.useEffect(()=>{
		if(idServicoEscolhido && idServicoEscolhido > 0){
			getFormaPagamentoOrdem(idServicoEscolhido)
			setIdCobrancaEscolhidaOrdemServico(null)
			setDataServicoItemEscolhido([])
		}else{
			setDataFormaPagamentoEscolhido([])
			//getFormaPagamentoOrdem(null)
			//setIdCobrancaEscolhidaOrdemServico(null)
			//setDataServicoItemEscolhido([])
		}

	}, [idServicoEscolhido])


	const getItemCobrancaOrdemServico = async (idCobrancaEcolhidaOrdemServico)=>{
		if(idCobrancaEcolhidaOrdemServico > 0){

			const {url, options} = COBRANCA_ORDEM_ONE_GET(idCobrancaEcolhidaOrdemServico, getToken());
			const {response, json} = await request(url, options);
			
			if(json){
				
				if(json && json.hasOwnProperty('mensagem')){
					let data = json.mensagem;
					//console.log("Item ordem serviço escolhido: ",data)
					let {id, servico_id, servico} = data
					
					//setDataServicoItemEscolhido(data)

					//console.log('servico_id:',servico_id)
					/* data.id = servico_id;
					data.os_item_id = id;
					data.name = servico?.name;
					data.vrServico = servico?.vrServico; */
					
					//console.log('Dados para formulário =======================================')
					//console.log(data)
					//console.log('Dados para formulário =======================================')
					setDataFormaPagamentoEscolhido(data)
					setIdFormaPagamentoForm(data?.forma_pagamento_id)
					setIdPlanoPagamentoForm(data?.plano_pagamento_id)//
					setIdOperadorFinanceiroForm(data?.operador_financeiro_id)
					setNrDocForm(data?.nr_doc)
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
		/* if(idCobrancaEcolhidaOrdemServico > 0){
			getItemCobrancaOrdemServico(idCobrancaEcolhidaOrdemServico)
		} */
		getItemCobrancaOrdemServico(idCobrancaEcolhidaOrdemServico)
	}, [idCobrancaEcolhidaOrdemServico])


	const dataToFormOrdemServicoCobrancas = ()=>{
    	let obj = {vr_saldo:'', vr_cobranca:'', id:'', operador_financeiro_id:'', forma_pagamento_id:'', plano_pagamento_id:'', bandeira_cartao_id:'',}
    	if(dataFormaPagamentoEscolhido){
    		let data = dataFormaPagamentoEscolhido;

			if(data.hasOwnProperty('id')){
                obj.id = data.id;
				obj.cobranca_id = data.id;
    		}

			if(data.hasOwnProperty('forma_pagamento_id')){
				obj.forma_pagamento_id = data.forma_pagamento_id;
    		}

			if(data.hasOwnProperty('operador_financeiro_id')){
				obj.operador_financeiro_id = data.operador_financeiro_id;
    		}

			if(data.hasOwnProperty('plano_pagamento_id')){
				obj.plano_pagamento_id = data.plano_pagamento_id;
    		}

			if(data.hasOwnProperty('vr_cobranca')){
				obj.vr_cobranca = data.vr_cobranca;
    		}

			if(data.hasOwnProperty('vr_acrescimo')){
				obj.vr_acrescimo = data.vr_acrescimo;
    		}

			if(data.hasOwnProperty('dt_vencimento_manual')){
				obj.dt_vencimento_manual = data.dt_vencimento_manual;
    		}

			if(data.hasOwnProperty('nr_doc')){
				obj.nr_doc = data.nr_doc;
    		}
           
			
    	}

    	return obj;
    }

	React.useEffect(()=>{
		setDataFormaPagamentoEscolhido({...dataFormaPagamentoEscolhido, ...calcularCobranca({idPlanoPagamentoForm})})
	}, [idPlanoPagamentoForm])

	React.useEffect(()=>{
		setDataFormaPagamentoEscolhido({...dataFormaPagamentoEscolhido, ...calcularCobranca({idOperadorFinanceiroForm})})
	}, [idOperadorFinanceiroForm])

	React.useEffect(()=>{
		setDataFormaPagamentoEscolhido({...dataFormaPagamentoEscolhido, ...calcularCobranca({nrDocForm})})
	}, [nrDocForm])

	React.useEffect(()=>{
		
		/* if(vrCobrancaForm){
			console.log('aqui bonitinho========================================')
			setDataFormaPagamentoEscolhido({...dataFormaPagamentoEscolhido, vrItem:vrCobrancaForm, pct_desconto:0})
		} */
		console.log('================= vr_cobranca ======================')
		console.log(vrCobrancaForm)
		console.log('================= vr_cobranca end ======================')
		setDataFormaPagamentoEscolhido({...dataFormaPagamentoEscolhido, ...calcularCobranca({vrCobrancaForm}) })

	}, [vrCobrancaForm])

	const calcularCobranca = ({idFormaPagamentoForm, vrCobrancaForm, idPlanoPagamentoForm, idOperadorFinanceiroForm, dtVencimentoManualForm, nrDocForm})=>{
		let obj = {vr_saldo:'', name:'', forma_pagamento_id:'', operador_financeiro_id:'', plano_pagamento_id:'', vr_cobranca:'', nr_doc:'', ...dataFormaPagamentoEscolhido}
		let data = dataFormaPagamentoEscolhido;
		console.log('vrCobrancaForm cobrança ===========================')
		console.table(vrCobrancaForm)//

		if(data.hasOwnProperty('id')){
			obj.id = data.id;
			obj.cobranca_id = data.id;
		}

		if(idFormaPagamentoForm){
			obj.forma_pagamento_id 		= idFormaPagamentoForm

		}else if(data.hasOwnProperty('forma_pagamento_id')){
			obj.forma_pagamento_id = data.forma_pagamento_id;
		}else{
			obj.forma_pagamento_id 		= idFormaPagamentoForm
		}

		if(idOperadorFinanceiroForm){
			obj.operador_financeiro_id 		= idOperadorFinanceiroForm

		}else if(data.hasOwnProperty('operador_financeiro_id')){
			obj.operador_financeiro_id = data.operador_financeiro_id;
		}else{
			obj.operador_financeiro_id 		= idOperadorFinanceiroForm
		}

		if(idPlanoPagamentoForm){
			obj.plano_pagamento_id 		= idPlanoPagamentoForm

		}else if(data.hasOwnProperty('plano_pagamento_id')){
			obj.plano_pagamento_id = data.plano_pagamento_id;
		}else{
			obj.plano_pagamento_id 		= idPlanoPagamentoForm
		}

		if(vrCobrancaForm){
			obj.vr_cobranca 		= vrCobrancaForm

		}else if(data.hasOwnProperty('vr_cobranca')){
			obj.vr_cobranca = data.vr_cobranca;
		}else{
			obj.vr_cobranca 		= calcularSaldoCobranca()
		}

		if(idFormaPagamentoForm){
			obj.vr_acrescimo 		= idFormaPagamentoForm

		}else if(data.hasOwnProperty('vr_acrescimo')){
			obj.vr_acrescimo = data.vr_acrescimo;
			console.log('data cobrança ===========================')
			//console.table(data)//
		}else{
			obj.vr_acrescimo 		= idFormaPagamentoForm
		}

		if(dtVencimentoManualForm){
			obj.dt_vencimento_manual = dtVencimentoManualForm

		}else if(data.hasOwnProperty('dt_vencimento_manual')){
			obj.dt_vencimento_manual = data.dt_vencimento_manual;
		}else{
			obj.dt_vencimento_manual = dtVencimentoManualForm
		}

		if(nrDocForm){
			obj.nr_doc = nrDocForm

		}else if(data.hasOwnProperty('nr_doc')){
			obj.nr_doc = data.nr_doc;
		}else{
			obj.nr_doc 	= ''
		}
		
		let saldoCobrancas 	= calcularSaldoCobranca();
		saldoCobrancas 		= Number(saldoCobrancas)
		
		let vrCobAtual 		= FORMAT_CALC_COD(obj?.vr_cobranca > 0 ? obj?.vr_cobranca : 0 );
		vrCobAtual 			= Number(vrCobAtual)

		let novoSaldo 		= saldoCobrancas - vrCobAtual;
		
		let novoSaldoAbs 	= Math.abs(novoSaldo)
		if(! (novoSaldoAbs >= 0)){
			novoSaldo = 0;
		} 

		obj.vr_saldo 	= calcularSaldoCobranca();

		console.log('Calcular cobrança ===========================')
		console.table(obj)//
		
		
		
		

    	return obj;
	}

	const handleChangePctDesconto = (value)=>{
		
	}


	

	React.useEffect(()=>{
		getFormaPagamentoAll();
	}, []);

	React.useEffect(()=>{
		getOperadorFinanceiroAll()
		getPlanoPagamentoAll();
		//idFormaPagamentoForm 
		//alert(idFormaPagamentoForm)
		setDataFormaPagamentoEscolhido({...dataFormaPagamentoEscolhido, ...calcularCobranca({idFormaPagamentoForm}) })
	}, [idFormaPagamentoForm]);

	


	
	const preparaFormaPagamentoToForm = ()=>{
    	if(dataFormaPagamento && Array.isArray(dataFormaPagamento) && dataFormaPagamento.length > 0){
    		let formaPgto = dataFormaPagamento.map(({id, name}, index, arr)=>({label:name,valor:id,props:{}}))
    		//formaPgto.unshift({label:'Teste',valor:'2',props:{selected:'selected'}})
			formaPgto.unshift({label:'Selecione...',valor:'0',props:{selected:'selected', }})
    		//console.table(formaPgto)
    		return formaPgto;
    	}
    	return []
    }

	const preparaPlanoPagamentoToForm = ()=>{
    	if(dataPlanoPagamento && Array.isArray(dataPlanoPagamento) && dataPlanoPagamento.length > 0){
    		let formaPgto = dataPlanoPagamento.map(({id, name}, index, arr)=>({label:name,valor:id,props:{}}))
    		formaPgto.unshift({label:'Selecione...',valor:'',props:{selected:'selected', }})
    		//console.table(formaPgto)
    		return formaPgto;
    	}
    	return []
    }

	const preparaOperadorFinanceiroToForm = ()=>{
    	if(dataOperadorFinanceiro && Array.isArray(dataOperadorFinanceiro) && dataOperadorFinanceiro.length > 0){
    		let formaPgto = dataOperadorFinanceiro.map(({id, name}, index, arr)=>({label:name,valor:id,props:{}}))
    		formaPgto.unshift({label:'Selecione...',valor:'',props:{selected:'selected', }})
    		//console.table(formaPgto)
    		return formaPgto;
    	}
    	return []
    }
	//dataPlanoPagamento, setDataPlanoPagamento
	const excluirItem = async (idItem)=>{

		if(idItem > 0){
			const {url, options} = COBRANCA_ORDEM_DELETE_POST(idItem, getToken());
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
								setIdCobrancaEscolhidaOrdemServico(atual?.id)
							}, label:'Editar', propsOption:{'className':'btn btn-sm'}, propsLabel:{}})
					}

                    data.push(

                        {
                            propsRow:{id:indexAtual},
                            acoes:acoesArr,
							acaoTrash:()=>removeItem(atual?.id),
                            celBodyTableArr:[
                                {

                                    label:atual?.id,
                                    propsRow:{}
                                },
								{

                                    label:atual?.forma_pgto?.name,
                                    propsRow:{}
                                },
								{

                                    label:FORMAT_MONEY(atual?.vr_final),
                                    propsRow:{},
									toSum:1,
									isCoin:1,
                                },
                                {

                                    label:atual?.nr_doc,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.plano_pgto?.name,
                                    propsRow:{}
                                },

                            ]//
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
                label:'CÓDIGO',
                props:{}
            },
			{
                label:'FORMA PGTO',
                props:{}
            },
            {
                label:'VALOR',
                props:{}
            },
            {
                label:'DOC',
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
	const dataFormSev 		= calcularCobranca({})
	console.log('Cobrança adicionada')
	console.table(dataFormSev)
	const readonlyFields = idCobrancaEcolhidaOrdemServico > 0 ? {readonly:'readonly', disabled:'disabled'} : {}
	return(

		<>
			 <Formik 

                initialValues={{...dataFormSev}}
				enableReinitialize={true}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.forma_pagamento_id){
                            errors.forma_pagamento_id="Obrigatório"
                        }
									
						if(!values.vr_cobranca){
							errors.vr_cobranca="Obrigatório"    			
						}

						if(!values.plano_pagamento_id){
						    errors.plano_pagamento_id="Obrigatório"
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
																			onChange:(ev)=>{ setVrCobrancaForm(ev.target.value); handleChange(ev)},
																			onBlur:(ev)=>{ setVrCobrancaForm(ev.target.value);handleBlur(ev)},
																			//onChange:handleChange,
																			//onBlur:handleBlur,
																			value:values.vr_cobranca,
																			className:estilos.input,
																			size:"sm",
																			...readonlyFields
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
																			placeholder:'Forma de pagamento',
																			id:'forma_pagamento_id',
																			//onChange:handleChange,
																			//onBlur:handleBlur,
																			onChange:(ev)=>{ setIdFormaPagamentoForm(ev.target.value);handleChange(ev)},
																			onBlur:(ev)=>{ setIdFormaPagamentoForm(ev.target.value);handleBlur(ev)},
																			value:values.forma_pagamento_id,
																			className:estilos.input,
																			size:"sm",
																			...readonlyFields
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

																		},//
																		atributsFormControl:{
																			type:'text',
																			name:'plano_pagamento_id',
																			placeholder:'Plano de pagamento',
																			id:'plano_pagamento_id',
																			//onChange:handleChange,
																			//onBlur:handleBlur,
																			onChange:(ev)=>{ setIdPlanoPagamentoForm(ev.target.value);handleChange(ev)},
																			onBlur:(ev)=>{ setIdPlanoPagamentoForm(ev.target.value);handleBlur(ev)},
																			value:values.plano_pagamento_id,
																			className:estilos.input,
																			size:"sm",
																			...readonlyFields
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
																		contentLabel:'Operador financeiro',
																		atributsFormLabel:{

																		},//
																		atributsFormControl:{
																			type:'text',
																			name:'operador_financeiro_id',
																			placeholder:'Operador financeiro',
																			id:'operador_financeiro_id',
																			//onChange:handleChange,
																			//onBlur:handleBlur,
																			onChange:(ev)=>{ setIdOperadorFinanceiroForm(ev.target.value);handleChange(ev)},
																			onBlur:(ev)=>{ setIdOperadorFinanceiroForm(ev.target.value);handleBlur(ev)},
																			value:values.operador_financeiro_id,
																			className:estilos.input,
																			size:"sm",
																			...readonlyFields
																		},
																		options:preparaOperadorFinanceiroToForm(),
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
																			placeholder:'Bandeira do cartão',
																			id:'bandeira_cartao_id',
																			onChange:handleChange,
																			onBlur:handleBlur,
																			value:values.bandeira_cartao_id,
																			className:estilos.input,
																			size:"sm",
																			...readonlyFields
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
																			name:'nr_doc',
																			placeholder:'CV / DOC / NSU',
																			id:'nr_doc',
																			onChange:handleChange,
																			onBlur:handleBlur,
																			value:values.nr_doc,
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
															<ErrorMessage className="alerta_error_form_label" name="nr_doc" component="div" />
															
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
