import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import Checkbox from '../../FormControl/Checkbox.js'
import Radio from '../../FormControl/Radio.js'

import {Col, Row, Tabs, Tab, Button as ButtonBootstrap } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormClientesFichasItens.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import TableForm from '../../Relatorio/TableForm/index.js';
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../../functions/index.js'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_SAVE_POST, ORDEM_SERVICO_ITENS_ONE_GET , SERVICO_ALL_POST, SERVICO_UPDATE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, FORMULARIO_GRUPO_ONE_GET, SERVICO_ONE_GET, ORDEM_SERVICO_ONE_GET, ORDEM_SERVICO_ADD_ITEM_POST, FORMULARIO_ITEM_ALL_POST} from '../../../api/endpoints/geral.js'


const FormClientesFichasItens = ({setAddionarResposta, dataRespostaFormulario,values, handleChange, handleBlur, idGrupoFormulario, dataGrupo, dataClientesFichasChoice, setDataClientesFichasGlobal, idClientesFichas, itensOrdem ,callback,carregando, setQtdAtualizaCobrancas})=>{
	
	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();
	const dataRequestGrupo = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataItens, setDataItens] = React.useState([]);//itensOrdem
    const [dataClientesFichas, setDataClientesFichas] = React.useState(null)
	const [dataBodyTable, setDataBodyTable] = React.useState([])
	const [idItemClientesFichas, setIdItemClientesFichas] = React.useState(0)
	const [dataServicoItemEscolhido, setDataServicoItemEscolhido] = React.useState([])
	const [idServicoEscolhido, setIdServicoEscolhido] = React.useState(0)
	const [dataServicoEscolhido, setDataServicoEscolhido] = React.useState([])
	const [dataItensGrupoFormulario, setDataItensGrupoFormulario] = React.useState([])
	
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

		const {url, options} = ORDEM_SERVICO_ADD_ITEM_POST(idClientesFichas, data, getToken());


		const {response, json} = await request(url, options);
		console.log('Save consulta here')
		console.log(json)
		if(json){
			console.log('Response Save consulta here =====')
			console.log(json)
			await getClientesFichas(idClientesFichas);
			setDataServicoEscolhido([])
			setDataServicoItemEscolhido([])
			setIdItemClientesFichas(null)
			setIdServicoEscolhido(null)
			
			setDataClientesFichas()
			setQtdAtualizaCobrancas((qtdAtual)=>qtdAtual+1)
			//callback();
		}
    }
	const getClientesFichas = async (idClientesFichas)=>{
		if(idClientesFichas > 0){
			const {url, options} = ORDEM_SERVICO_ONE_GET(idClientesFichas, getToken());
			const {response, json} = await request(url, options);
			
			if(json){
				
				setDataClientesFichas(json)
				setDataClientesFichasGlobal(json)
				if(json && json.hasOwnProperty('mensagem')){
					let data = json.mensagem;
					setDataItens(data?.item)
					
				}
				 
			}else{
				setDataClientesFichas([])
				setDataItens([])
			}
		}
	}
	React.useEffect(()=>{
		
		getClientesFichas(idClientesFichas);
		
	}, [idClientesFichas])

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
		if(idServicoEscolhido && idServicoEscolhido > 0){
			getServicoOrdem(idServicoEscolhido)
			setIdItemClientesFichas(null)
			setDataServicoItemEscolhido([])
		}else{
			setDataServicoEscolhido([])
			//getServicoOrdem(null)
			//setIdItemClientesFichas(null)
			//setDataServicoItemEscolhido([])
		}

	}, [idServicoEscolhido])


	const getItemClientesFichas = async (idItemClientesFichas)=>{
		if(idItemClientesFichas > 0){

			const {url, options} = ORDEM_SERVICO_ITENS_ONE_GET(idItemClientesFichas, getToken());
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
					setDataServicoEscolhido(data)
				}else{
					setDataServicoItemEscolhido([])
					setDataServicoEscolhido([])
				}
				 
			}else{
				setDataServicoItemEscolhido([])
				setDataServicoEscolhido([])
			}
		}else{

			setDataServicoItemEscolhido([])
			setDataServicoEscolhido([])
		}
	}

	React.useEffect(()=>{
		/* if(idItemClientesFichas > 0){
			getItemClientesFichas(idItemClientesFichas)
		} */
		getItemClientesFichas(idItemClientesFichas)
	}, [idItemClientesFichas])


	const getItensGrupoFormulario = async (idFormulario)=>{
		if(idFormulario > 0){
			//dataRequestGrupo 
			/* const configFormG = FORMULARIO_GRUPO_ONE_GET(idFormulario, getToken());
			const responseFormG = await dataRequest.request(v?.url, configFormG?.options);
			
			if(responseFormG.json){
				if(responseFormG.json && responseFormG.json.hasOwnProperty('mensagem')){
					let dataGrupo = responseFormG.json.mensagem;
					console.log("Grupo escolhido: ",dataGrupo)
					setDataItensGrupoFormulario(dataGrupo)
				}else{
					setDataItensGrupoFormulario([])
				}
			} */
			console.log('Dados do grupo agui=-======================')
			console.table(dataGrupo)
			console.log('Dados do grupo agui=-======================')

			const {url, options} = FORMULARIO_ITEM_ALL_POST({'formulario_grupo_id':idFormulario, 'ordem':'nr_linha-asc,nr_coluna-asc, id-asc'}, getToken());//FORMULARIO_GRUPO_ONE_GET(idFormulario, getToken());
			const {response, json} = await dataRequest.request(url, options);
			
			if(json){
				
				if(json && json.hasOwnProperty('mensagem')){
					let data = json.mensagem;
					console.log("Formulário escolhido: ",data)
					setDataItensGrupoFormulario(data)
				}else{
					setDataItensGrupoFormulario([])
				}
				 
			}else{
				setDataItensGrupoFormulario([])
			}
		}
	}

	React.useEffect(()=>{
		if(idGrupoFormulario > 0){
			getItensGrupoFormulario(idGrupoFormulario)
		}else{
			setDataItensGrupoFormulario([])
		}

	}, [idGrupoFormulario])



	const dataToFormClientesFichasItens = ()=>{
    	let obj = {name:'', vr_desconto:0, pct_desconto: 0, id:'', servico_id:'', vrItem:0, vrTotal:0, vr_final:0 , vrItemBruto:0, qtd:1, os_item_id:null}
    	if(dataServicoEscolhido){
			console.log('Conteceu...03003=====================')
    		let data = dataServicoEscolhido;
			console.log(dataServicoEscolhido.vrItemBruto)
			console.log('Conteceu...03003==============')

			if(data.hasOwnProperty('id')){
                obj.id = data.id;
				obj.servico_id = data.id;
    		}
           
			if(data.hasOwnProperty('os_item_id')){
                obj.os_item_id = data.os_item_id;
    		}


			
				
    		
    	}

    	return obj;
    }

	const calcularServico = ({pctDesconto, vrServicoForm})=>{
		let obj = {}
    	return obj;
	}




	const dataFormSev 		= dataToFormClientesFichasItens()
	return(

		<>
			{
			 dataRequest.carregando && dataRequest.carregando==true
			?
				(<Load/>)
			:
				( 
					dataItensGrupoFormulario &&
					(				
						<Row className="mb-3">
							<Col xs="12" sm="12" md="12">
								<Row className="my-3">
									<Col xs="12" sm="12" md="12">
										<span className="label_title_grup_forms">{dataGrupo?.name}</span>
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
								{Array.isArray(dataItensGrupoFormulario) && dataItensGrupoFormulario.length > 0 && (
									dataItensGrupoFormulario.map((item, index, arr)=>{
										let type 					= item.hasOwnProperty('type') 					? item.type: 'text' ;
										let name 					= item.hasOwnProperty('name') 					? item.name: '' ;
										let hasLabel 				= item.hasOwnProperty('label') && String(item.label).length > 0 					? true: false 
										let contentLabel 			= item.hasOwnProperty('label') 					? item.label: '' 
										let atributsFormLabel 		= item.hasOwnProperty('atributsFormLabel') 		? item.atributsFormLabel: {}
										let optionsFields			= item.hasOwnProperty('options') 				? item.options: ''; 
										let atributsContainer 		= {className:'mb-3', xs:"12", sm:"12", md:"6"}
										let valorAtual 				= null; 
										let hasValueArmazenado		= dataRespostaFormulario && dataRespostaFormulario.hasOwnProperty(`${name}`)
										let optionsFieldsArr 		= []
										
										//----Tento encontrar as opções de valores para esse campo
										if(String(optionsFields).indexOf(';') > -1){
											optionsFieldsArr = String(optionsFields).split(";")

										}else if(String(optionsFields).indexOf(',') > -1){
											optionsFieldsArr = String(optionsFields).split(",")
										}

										if(hasValueArmazenado){
											let {value} = dataRespostaFormulario[name];
											valorAtual = value;
										}
										//alert(valorAtual)
										let atributsFormControl 	= {"handleChange":setAddionarResposta, value:valorAtual/* values[name] */, type, name}
										let options 				= []

										if(Array.isArray(optionsFieldsArr) && optionsFieldsArr.length > 0){
											for(let iop = 0; iop < optionsFieldsArr.length; iop++){
												let valOptAtual = optionsFieldsArr[iop]
												options.push(
													{
														hasLabel: true,
														contentLabel:valOptAtual,
														atributsFormLabel:{},
														atributsFormControl:{'type':'radio', value:valOptAtual, size:"sm",'checked':(valOptAtual == valorAtual),'name':name,handleChange:setAddionarResposta},
													},
												)
												if(type.trim() == 'checkbox'){
													if(['Sim', 1, true, 'S', 's'].indexOf(valorAtual) > -1 && valOptAtual == valorAtual){
														atributsFormControl.checked = (valOptAtual == valorAtual)
													}
												}
												
											}
											
										}

										//handleChange, handleBlur
										let dados = {
											key:index,
											hasLabel: hasLabel,
											contentLabel:contentLabel,
											atributsFormLabel:atributsFormLabel,
											atributsContainer:atributsContainer,
											atributsFormControl:atributsFormControl,
											options

										}
										//
										
										switch(type.trim()){
											case 'text':
											case 'email':
											case 'number':
												
												dados['atributsContainer'] = {...dados['atributsContainer'], onChange:({target})=>setAddionarResposta(target)}
												return (<Col xs="12" sm="12" md="6" {...atributsContainer} ><FormControlInput key={index} data={dados} /></Col>)
											break;
											case 'select':

												dados['atributsContainer'] = {...dados['atributsContainer'], onChange:({target})=>setAddionarResposta(target)}
												return (<Col xs="12" sm="12" md="6" {...atributsContainer} ><FormControlSelect key={index} data={dados} /></Col>)
											break;
											case 'radio':
												/* options = [
													{
														hasLabel: true,
														contentLabel:'Teste Radio 01',
														atributsFormLabel:{},
														atributsFormControl:{'type':'radio', value:'12', size:"sm",'checked':true,'name':'nome',onChange:()=>alert('teste'),    onBlur:()=>alert('teste')},
													},
													{
														hasLabel: true,
														contentLabel:'Teste Radio',
														atributsFormLabel:{},
														atributsFormControl:{'type':'radio', value:'12', size:"sm",'checked':true,'name':'nome',onChange:()=>alert('teste'),    onBlur:()=>alert('teste')},
													}
												] */
												
												if(
													Array.isArray(options) && options.length > 0
												){
													return(<Col {...atributsContainer}>
														<Row>
															<Col  xs="12" sm="12" md="8">{contentLabel}</Col>
															{
																options.map((itemOption, indexOption, arrOption)=>{
																	let hasLabelOption				= itemOption.hasOwnProperty('hasLabel') 				? itemOption.hasLabel: false 
																	let contentLabelOption			= itemOption.hasOwnProperty('contentLabel') 			? itemOption.contentLabel: '' 
																	let atributsFormLabelOption		= itemOption.hasOwnProperty('atributsFormLabel') 		? itemOption.atributsFormLabel: {}
																	let atributsContainerOption		= itemOption.hasOwnProperty('atributsContainer') 		? itemOption.atributsContainer: {}
																	let atributsFormControlOption 	= itemOption.hasOwnProperty('atributsFormControl') 		? itemOption.atributsFormControl: {}

																	let setValueRadio 				= atributsFormControlOption.hasOwnProperty('handleChange') 	? atributsFormControlOption.handleChange : null; 
																	
																	console.log("=============================== setValueRadio ==================================")
																	console.log(atributsFormControlOption)
																	console.log("=============================== setValueRadio ==================================")
																	return (<Col xs="12" sm="12" md="2"><Radio setValue={setValueRadio} key={indexOption} hasLabel={hasLabelOption}  propsLabel={atributsFormLabelOption} label={contentLabelOption}  {...atributsFormControlOption} /></Col>)

																})
															}
														</Row>
													</Col>)

												}
												

												
											break;
											case 'checkbox':

												let label 		= contentLabel;
												let propsLabel 	= atributsFormLabel;
												let setValue 	= atributsFormControl.hasOwnProperty('handleChange') ? atributsFormControl.handleChange : null; 

												return(<Col xs="12" sm="12" md="6" {...atributsContainer}><Checkbox setValue={setValue} propsLabel={propsLabel} hasLabel={hasLabel} label={label} {...atributsFormControl} /></Col>)
											break;
											default:

												dados['atributsContainer'] = {...dados['atributsContainer'], onChange:({target})=>setAddionarResposta(target)}
												return (<Col xs="12" sm="12" md="6" {...atributsContainer}><FormControlInput key={index} data={dados} /></Col>)
											break;

										}
									})

								)}

									
									
								</Row>
							</Col>

							
						</Row>
					)
				)
			}
		</>
	)
}

export default FormClientesFichasItens;
