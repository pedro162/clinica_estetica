import React from 'react';
import {Col, Row, Table} from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import {FORMAT_DATA_PT_BR} from '../../../functions/index.js'
import Swal from 'sweetalert2'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_SAVE_POST, CONSULTA_ALL_POST, CONSULTA_CANCELAR_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, PROFISSIONAL_DIAS_EXPEDIENTE_ALL_POST} from '../../../api/endpoints/geral.js'


const FormCancelarFormaPagamento = ({dataFormaPagamentoChoice, setIdFormaPagamento, idFormaPagamento, showModalCancelarFormaPagamento, setShowModalCancelarFormaPagamento, callback, cancelarFormaPagamento, setCancelarFormaPagamento, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataFormaPagamento, setDataFormaPagamento] = React.useState([])

    const sendData = async ({
			ds_cancelamento
		})=>{
			

    	const data = {
    		'ds_cancelamento':ds_cancelamento,
    	}

		const {url, options} = CONSULTA_CANCELAR_POST(idFormaPagamento, data, getToken());
        const {response, json} = await request(url, options);

        if(json){
                
            callback();
            setShowModalCancelarFormaPagamento();
            setCancelarFormaPagamento(false);
            setIdFormaPagamento(null);

            Swal.fire({
              icon: "success",
              title: "",
              text: 'Registrado com sucesso',
              footer: '',
              confirmButtonColor: "#07B201",
            });
    	}
    }

    const requestAllFormaPagamentos = async() =>{
       
        const {url, options} = CONSULTA_ALL_POST({}, getToken());
        const {response, json} = await dataRequest.request(url, options);
        
        if(json){
            setDataFormaPagamento(json)
        }else{

        	setDataFormaPagamento([]);
        }            
    }

	const dataToFormCancelarFormaPagamento = ()=>{
    	let obj = {name:'', historico:'', pessoa_id:'',	dt_inicio:'', hr_inicio:'', prioridade:'', status:'', profissional_id:'',
		name_profissional:'',filial_id:'', dt_fim:'', hr_fim:'', name_atendido:'', tipo:'', id:''}
    	
		if(dataFormaPagamentoChoice && dataFormaPagamentoChoice.hasOwnProperty('mensagem')){
    		let data = dataFormaPagamentoChoice.mensagem;
			
			if(data.hasOwnProperty('id')){
                obj.id = data.id;
    		}

    		if(data.hasOwnProperty('name')){
                obj.name = data.name;
    		}

    		if(data.hasOwnProperty('historico')){
    			obj.historico = data.historico;
    		}
    		
    		if(data.hasOwnProperty('dt_inicio')){
				if(String(data.dt_inicio).length > 0){
					obj.dt_inicio = FORMAT_DATA_PT_BR(data.dt_inicio);    
				}	
    		}

			if(data.hasOwnProperty('hr_inicio')){
    			obj.hr_inicio = data.hr_inicio;
    		}

            if(data.hasOwnProperty('prioridade')){
                obj.prioridade = data.prioridade;
            }

            if(data.hasOwnProperty('status')){
                obj.status = data.status;
            }

			if(data.hasOwnProperty('filial_id')){
                obj.filial_id = data.filial_id;
            }

			if(data.hasOwnProperty('pessoa_id')){
                obj.pessoa_id = data.pessoa_id;
            }

			if(data.hasOwnProperty('profissional_id')){
                obj.profissional_id = data.profissional_id;
            }

			if(data.hasOwnProperty('name_profissional')){
                obj.name_profissional = data.name_profissional;
            }

    		if(data.hasOwnProperty('pessoa')){
    			if(data.pessoa.hasOwnProperty('id')){
					obj.pessoa_id = data.pessoa.id;
				}
    			
    		}

			if(data.hasOwnProperty('profissional')){
    			if(data.profissional.hasOwnProperty('id')){
					obj.profissional_id = data.profissional.id;
					obj.name_profissional = data.profissional.pessoa.name
				}
    			
    		}

			if(data.hasOwnProperty('dt_fim')){
				if(String(data.dt_fim).length > 0){
    				obj.dt_fim = FORMAT_DATA_PT_BR(data.dt_fim);     
				}			
    		}

			if(data.hasOwnProperty('hr_fim')){
    			obj.hr_fim = data.hr_fim;    			
    		}

			if(data.hasOwnProperty('name_atendido')){
    			obj.name_atendido = data.name_atendido;    			
    		}

			if(data.hasOwnProperty('tipo')){
    			obj.tipo = data.tipo;    			
    		}

    		
    	}

    	return obj;
    }

	const handleSubmit = ()=>{
		sendData({ds_cancelamento:'Desistiu'})
	}
	const dataFormatCancel = dataToFormCancelarFormaPagamento();

	if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
            footer: '',
            confirmButtonColor: "#07B201",
        });
    }
    
	return(

		<>
			 <Modal  handleConcluir={()=>{handleSubmit(); }}  title={' Cancelar forma de pagamento'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCancelarFormaPagamento} showHide={()=>{setShowModalCancelarFormaPagamento();setCancelarFormaPagamento(false);setIdFormaPagamento(null);}}>
				{
						
					carregando && carregando==true
					?
						(<Load/>)
					:
						(  
							<>
								<Row className="my-3">
									<Col xs="12" sm="12" md="12">
										<span className="label_title_grup_forms">Dados básicos</span>
									</Col>
								</Row>

								{
									error && <Row className="my-3">
										<Col xs="12" sm="12" md="12">
											<AlertaDismissible title="Atenção:" message={error} variant={"danger"} />
										</Col>
									</Row>
								}
								
								<Row className="my-3">
									<Col xs="12" sm="12" md="12">
										<Table striped bordered hover size="sm">
											<tbody>
												<tr>
													<th>Código</th>
													<td>{dataFormatCancel?.id}</td>
													<th>Pessoa</th>
													<td>{dataFormatCancel?.name_atendido}</td>
												</tr>
												<tr>
													<th>Tipo</th>
													<td>{dataFormatCancel?.tipo}</td>
													<th>Profissíonal</th>
													<td>{dataFormatCancel?.name_profissional}</td>
												</tr>
												<tr>
													<th>Data</th>
													<td>{dataFormatCancel?.dt_inicio}</td>
													<th>Hora</th>
													<td>{dataFormatCancel?.hr_inicio}</td>
												</tr>
											</tbody>
										</Table>
									</Col>
								</Row>
													

							</>

						)
											
				}  

			</Modal>
		</>
	)
}

export default FormCancelarFormaPagamento;
