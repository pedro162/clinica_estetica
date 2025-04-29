import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row, Tabs, Tab } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormOrdemServico.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import FormOrdemServicoItens from '../FormOrdemServicoItens/index.js'
import FormOrdemServicoCobrancas from '../FormOrdemServicoCobrancas/index.js'
import Swal from 'sweetalert2'


import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_UPDATE_POST, MOTIVOS_CANCEL_OS_ALL_POST} from '../../../api/endpoints/geral.js'


const AtualizarCabecalhoForm  = ({dataOrdemServicoChoice, setDataOrdemServico, setIdOrdemServico, idOrdemServico, showModalCriarOrdemServico, setShowModalCriarOrdemServico, callback, cancelarOrdemServico, setAtualizarCabecalhoOrdemServico, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} 			= React.useContext(UserContex);
	const [observacao, setObservacao] 	= React.useState([])
	const [dataItens, setDataitens]		= React.useState([])

	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
			observacao
		})=>{
			
		
		const data = {
			observacao
		}
		

		const {url, options} = ORDEM_SERVICO_UPDATE_POST(idOrdemServico, data, getToken());


		const {response, json} = await request(url, options);
		console.log('Save consulta here')
		console.log(json)
		if(json){
			console.log('Response Save consulta here')
			console.log(json)
			
			callback();
			setShowModalCriarOrdemServico();
			setAtualizarCabecalhoOrdemServico(false);
			setIdOrdemServico(null);

			Swal.fire({
			  icon: "success",
			  title: "",
			  text: 'Registrado com sucesso',
			  footer: '',//'<a href="#">Why do I have this issue?</a>'
			  confirmButtonColor: "#07B201",
			});
		}
    }

	const requestAllMotivoCancel = async() =>{
       
        const {url, options} = MOTIVOS_CANCEL_OS_ALL_POST({}, getToken());


        const {response, json} = await dataRequest.request(url, options);
        console.log('All consultas here')
        console.log(json)
        if(json){
            setObservacao(json)
        }else{

        	setObservacao([]);
        }

            
    }

	const preparaMotivoCancelToForm = ()=>{
    	if(observacao.hasOwnProperty('mensagem') && Array.isArray(observacao.mensagem) && observacao.mensagem.length > 0){
    		let filiais = observacao.mensagem.map(({id, motivo}, index, arr)=>({label:motivo,valor:id,props:{}}))
    		filiais.unshift({label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}})
    		
    		return filiais;
    	}
    	return []
    }

	const dataToFormOrdemServico = ()=>{
    	let obj = {observacao:''}
    	if(dataOrdemServicoChoice && dataOrdemServicoChoice.hasOwnProperty('mensagem')){
    		let data = dataOrdemServicoChoice.mensagem;
			
    		if(data.hasOwnProperty('observacao')){
                obj.observacao = data.observacao;
    		}
    		
    	}

    	return obj;
    }

	React.useEffect(()=>{
    	const requesFiliais = async ()=>{
    		await requestAllMotivoCancel();
    	}
    	
    	requesFiliais();

    }, []);


	React.useEffect(()=>{

		if(dataOrdemServicoChoice && dataOrdemServicoChoice.hasOwnProperty('mensagem')){
			let data = dataOrdemServicoChoice.mensagem;
			setDataitens(data?.item)
		}
		
	}, [])

    console.log('----------------------------- data pais ----------------------------------')
    console.log(dataToFormOrdemServico())

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

                initialValues={{...dataToFormOrdemServico()}}
				enableReinitialize={true}
                validate={
                    values=>{

                        const errors = {}

						if(!values.observacao){
						    errors.observacao="Obrigatório"
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

						<Modal  handleConcluir={()=>{handleSubmit(); }}  title={ 'Atualizar ordem de servico'} size="xs" dialogClassName={null} propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarOrdemServico} showHide={()=>{setShowModalCriarOrdemServico();setAtualizarCabecalhoOrdemServico(false);setIdOrdemServico(null);}}>
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
																	name:'observacao',
																	placeholder:'Observação',
																	id:'observacao',
																	onChange:handleChange,
																	onBlur:handleBlur,
																	value:values.observacao,
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
													<ErrorMessage className="alerta_error_form_label" name="observacao" component="div" />
													
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

export default AtualizarCabecalhoForm ;
