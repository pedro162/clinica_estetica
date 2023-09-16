import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
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


import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_CANCEL_POST, MOTIVOS_CANCEL_OS_ALL_POST} from '../../../api/endpoints/geral.js'


const CancelarForm = ({dataClientesFichasChoice, setDataClientesFichas, setIdClientesFichas, idClientesFichas, showModalCriarClientesFichas, setShowModalCriarClientesFichas, callback, cancelarClientesFichas, setCancelarClientesFichas, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataMotivosCancelamento, setDataMotivosCancelamento] 	= React.useState([])
	const [dataItens, setDataitens]		 	= React.useState([])

	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
			motivo_cancel_id
		})=>{
			
		
		const data = {
			motivo_cancel_id
		}
		

		const {url, options} = ORDEM_SERVICO_CANCEL_POST(idClientesFichas, data, getToken());


		const {response, json} = await request(url, options);
		console.log('Save consulta here')
		console.log(json)
		if(json){
			console.log('Response Save consulta here')
			console.log(json)
			
			callback();
			setShowModalCriarClientesFichas();
			setCancelarClientesFichas(false);
			setIdClientesFichas(null);
		}
    }

	const requestAllMotivoCancel = async() =>{
       
        const {url, options} = MOTIVOS_CANCEL_OS_ALL_POST({}, getToken());


        const {response, json} = await dataRequest.request(url, options);
        console.log('All consultas here')
        console.log(json)
        if(json){
            setDataMotivosCancelamento(json)
        }else{

        	setDataMotivosCancelamento([]);
        }

            
    }

	const preparaMotivoCancelToForm = ()=>{
    	if(dataMotivosCancelamento.hasOwnProperty('mensagem') && Array.isArray(dataMotivosCancelamento.mensagem) && dataMotivosCancelamento.mensagem.length > 0){
    		let filiais = dataMotivosCancelamento.mensagem.map(({id, motivo}, index, arr)=>({label:motivo,valor:id,props:{}}))
    		filiais.unshift({label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}})
    		
    		return filiais;
    	}
    	return []
    }

	const dataToFormClientesFichas = ()=>{
    	let obj = {motivo_cancel_id:''}
    	if(dataClientesFichasChoice && dataClientesFichasChoice.hasOwnProperty('mensagem')){
    		let data = dataClientesFichasChoice.mensagem;
			
    		if(data.hasOwnProperty('motivo_cancel_id')){
                obj.motivo_cancel_id = data.motivo_cancel_id;
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

		if(dataClientesFichasChoice && dataClientesFichasChoice.hasOwnProperty('mensagem')){
			let data = dataClientesFichasChoice.mensagem;
			setDataitens(data?.item)
		}
		
	}, [])

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

						if(!values.motivo_cancel_id){
						    errors.motivo_cancel_id="Obrigatório"
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

						<Modal  handleConcluir={()=>{handleSubmit(); }}  title={ 'Cancelar Ordem de Servico'} size="xs" dialogClassName={null} propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarClientesFichas} showHide={()=>{setShowModalCriarClientesFichas();setCancelarClientesFichas(false);setIdClientesFichas(null);}}>
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
																contentLabel:'Motivo do cancelamento *',
																atributsFormLabel:{

																},
																atributsFormControl:{
																	type:'text',
																	name:'motivo_cancel_id',
																	placeholder:'Motivo do cancelamento',
																	id:'motivo_cancel_id',
																	onChange:handleChange,
																	onBlur:handleBlur,
																	value:values.motivo_cancel_id,
																	className:estilos.input,
																	size:"sm"
																},
																options:preparaMotivoCancelToForm(),
																atributsContainer:{
																	className:''
																}
															}
														}
													
														component={FormControlSelect}
													></Field>
													<ErrorMessage className="alerta_error_form_label" name="motivo_cancel_id" component="div" />
													
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

export default CancelarForm;
