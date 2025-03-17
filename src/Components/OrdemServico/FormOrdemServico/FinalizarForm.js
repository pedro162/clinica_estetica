import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import {Table as TableBootstrap } from 'react-bootstrap';
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
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../../functions/index.js'
import Swal from 'sweetalert2'


import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_SAVE_POST, SERVICO_ALL_POST, ORDEM_SERVICO_FINALIZAR_PROCEDIMENTO_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST} from '../../../api/endpoints/geral.js'


const FinalizarForm = ({dataOrdemServicoChoice, setDataOrdemServico, setIdOrdemServico, idOrdemServico, showModalCriarOrdemServico, setShowModalCriarOrdemServico, callback, FinalizarOrdemServico, setFinalizarOrdemServico, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] 							= React.useState([])
	const [dataItens, setDataitens]		 							= React.useState([])
	const [qtdAtualizaCobrancas, setQtdAtualizaCobrancas]		 	= React.useState(0)
	
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
			status
		})=>{
			
		const data = {
			status
		}
		

		const {url, options} = ORDEM_SERVICO_FINALIZAR_PROCEDIMENTO_POST(idOrdemServico, data, getToken());


		const {response, json} = await request(url, options);
		console.log('Save consulta here')
		console.log(json)
		if(json){
			console.log('Response Save consulta here')
			console.log(json)
			
			callback();
			setShowModalCriarOrdemServico();
			setFinalizarOrdemServico(false);
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

	const dataToFormOrdemServico = ()=>{
    	let obj = {id:'', filial_id:'', vrTotal:'',
			status:'', observacao:'', dsArquivo:'', pessoa_id:'',
			pessoa_rca_id:'', filial_id:'', user_id:'', user_update_id:'',
			active:'', deleted_at:'', created_at:'', updated_at:'', vr_final:'',
			vr_desconto:'', pct_acrescimo:'', vr_acrescimo:'', profissional_id:'', 
			pct_desconto:'', pessoa:''
		}

    	if(dataOrdemServicoChoice && dataOrdemServicoChoice.hasOwnProperty('mensagem')){
    		let data = dataOrdemServicoChoice.mensagem;
			
			if(data.hasOwnProperty('id')){
                obj.id = data.id;
    		}

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

			if(data.hasOwnProperty('pessoa')){
    			obj.pessoa = data.pessoa;
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

                        /* if(!values.name){
                            errors.name="Obrigatório"
                        } */
									
						if(!values.status){
							//errors.status="Obrigatório"    			
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

						<Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (FinalizarOrdemServico == true ? 'Finalizar' : 'Cadastrar')+' Ordem de Servico'} size="xs" dialogClassName={null} propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarOrdemServico} showHide={()=>{setShowModalCriarOrdemServico();setFinalizarOrdemServico(false);setIdOrdemServico(null);}}>
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
												<Col xs="12" sm="12" md="3">
													<TableBootstrap striped bordered hover size="sm">				 
														<thead>
															<tr>
																<th>
																	Código
																</th>
																<th style={{minWidth:'38vh'}} >
																	{values?.id}
																</th>															
															</tr>
															<tr>
																<th>
																	Pessoa
																</th>
																<th style={{minWidth:'38vh'}} >
																	{values?.pessoa?.name}
																</th>																
															</tr>

															<tr>
																<th>
																	Status
																</th>
																<th style={{minWidth:'38vh'}} >
																	{values?.status}
																</th>
															</tr>

															<tr>
																<th>
																	Valor
																</th>
																<th style={{minWidth:'38vh'}}>
																	{FORMAT_MONEY(values?.vr_final)}
																</th>
															</tr>

															<tr>
																<th>
																	Profissional
																</th>
																<th style={{minWidth:'38vh'}} >
																	{values?.profissional?.name}
																</th>
																
															</tr>

															<tr>
																<th>
																	Vendedor
																</th>
																<th style={{minWidth:'38vh'}} >
																	{values?.vendedor?.name}
																</th>
																
															</tr>

															<tr>
																<th>
																	Observação
																</th>
																<th style={{minWidth:'38vh'}} >
																	{values?.observacao}
																</th>
																
															</tr>
														</thead>
													</TableBootstrap>

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

export default FinalizarForm;
