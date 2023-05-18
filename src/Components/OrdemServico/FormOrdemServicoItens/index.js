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

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_SAVE_POST, SERVICO_ALL_POST, SERVICO_UPDATE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, ORDEM_SERVICO_ONE_GET} from '../../../api/endpoints/geral.js'


const FormOrdemServicoItens = ({dataOrdemServicoChoice, idOrdemServico, itensOrdem ,callback,carregando})=>{
	
	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] = React.useState([])
	const [dataItens, setDataItens] = React.useState(itensOrdem);
    const [dataOrdemServico, setDataOrdemServico] = React.useState(null)

	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		servico_id,
    		vr_desconto,
    		vrItem,
		})=>{
			

    	const data = {
    		'servico_id':servico_id,
    		'vr_desconto':vr_desconto,
    		'vrItem':vrItem,
    	}

		const {url, options} = SERVICO_UPDATE_POST(idOrdemServico, data, getToken());


		const {response, json} = await request(url, options);
		console.log('Save consulta here')
		console.log(json)
		if(json){
			console.log('Response Save consulta here')
			console.log(json)
			
			callback();
		}
    }

	React.useEffect(()=>{
		
		const getOrdemServico = async ()=>{
			if(dataOrdemServicoChoice > 0){
				const {url, options} = ORDEM_SERVICO_ONE_GET(idOrdemServico, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataOrdemServico(json)
					 
		        }else{
		        	setDataOrdemServico([])
		        }
			}
		}

		getOrdemServico();
		
	}, [dataOrdemServicoChoice])

	const dataToFormOrdemServicoItens = ()=>{
    	let obj = {name:'', vr_desconto:'', id:'', servico_id:'', vrTotal:''}
    	if(dataOrdemServicoChoice && dataOrdemServicoChoice.hasOwnProperty('mensagem')){
    		let data = dataOrdemServicoChoice.mensagem;
           
			if(data.hasOwnProperty('id')){
                obj.id = data.id;
    		}

    		if(data.hasOwnProperty('name')){
                obj.name = data.name;
    		}

			if(data.hasOwnProperty('servico_id')){
                obj.servico_id = data.servico_id;
    		}

    		if(data.hasOwnProperty('vr_desconto')){
    			obj.vr_desconto = data.vr_desconto;
    		}

			if(data.hasOwnProperty('vrTotal')){
    			obj.vrTotal = data.vrTotal;
    		}

			if(data.hasOwnProperty('vrItem')){
    			obj.vrItem = data.vrItem;
    		}
    		
    		
    	}

    	return obj;
    }

	const removeItem = (index)=>{
		console.log(index)
		if(Array.isArray(dataItens) && dataItens.length > 0){
			const newData = dataItens.filter((item, indexArr, Arr)=>{
				return indexArr != index
			})
			setDataItens(newData)
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

							}, label:'Editar', propsOption:{'className':'btn btn-sm'}, propsLabel:{}})
					}

                    data.push(

                        {
                            propsRow:{id:indexAtual},
                            acoes:acoesArr,
							acaoTrash:()=>removeItem(i),
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

    const rowsTableArr = gerarTableOrdemServico();    
    const titulosTableArr = gerarTitleCobTable();

	return(

		<>
			 <Formik 

                initialValues={{...dataToFormOrdemServicoItens()}}
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
																		}
																	}
																	component={Required}
															>   </Field>    
															<ErrorMessage className="alerta_error_form_label" name="pessoa_id" component="div" />
														</Col>
														
													</Row>
													<Row className='mb-3'>

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
													</Row>
													<Row className='mb-3'>

														<Col xs="12" sm="12" md="6">
															<Field
																data={
																	{
																		hasLabel:true,
																		contentLabel:'Desconto *',
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
