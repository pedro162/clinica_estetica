import React from 'react';
import {Col, Row, Table} from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import {FORMAT_DATA_PT_BR} from '../../../functions/index.js'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_SAVE_POST, CONSULTA_ALL_POST, CONSULTA_CANCELAR_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST} from '../../../api/endpoints/geral.js'


const FormCancelarConsulta = ({dataConsultaChoice, setIdConsulta, idConsulta, showModalCancelarConsulta, setShowModalCancelarConsulta, callback, cancelarConsulta, setCancelarConsulta, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataConsulta, setDataConsulta] = React.useState([])

    const sendData = async ({
			dsCancelamento
		})=>{
			

    	const data = {
    		'dsCancelamento':dsCancelamento,
    	}

		const {url, options} = CONSULTA_CANCELAR_POST(idConsulta, data, getToken());


        const {response, json} = await request(url, options);
        console.log('Save consulta here')
        console.log(json)
        if(json){
            console.log('Response Save consulta here')
            console.log(json)
                
            callback();
            setShowModalCancelarConsulta();
            setCancelarConsulta(false);
            setIdConsulta(null);
    	}
    }

    const requestAllConsultas = async() =>{
       
        const {url, options} = CONSULTA_ALL_POST({}, getToken());


        const {response, json} = await dataRequest.request(url, options);
        console.log('All consultas here')
        console.log(json)
        if(json){
            setDataConsulta(json)
        }else{

        	setDataConsulta([]);
        }

            
    }

	const dataToFormCancelarConsulta = ()=>{
    	let obj = {name:'', historico:'', pessoa_id:'',	dt_inicio:'', hr_inicio:'', prioridade:'', status:'', profissional_id:'',
		name_profissional:'',filial_id:'', dt_fim:'', hr_fim:'', name_atendido:'', tipo:'', id:''}
    	if(dataConsultaChoice && dataConsultaChoice.hasOwnProperty('mensagem')){
    		let data = dataConsultaChoice.mensagem;
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
    			//obj.dt_inicio = data.dt_inicio;
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
		sendData({dsCancelamento:'Desistiu'})
	}
	const dataFormatCancel = dataToFormCancelarConsulta();
	return(

		<>
			 <Modal  handleConcluir={()=>{handleSubmit(); }}  title={' Cancelar consulta'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCancelarConsulta} showHide={()=>{setShowModalCancelarConsulta();setCancelarConsulta(false);setIdConsulta(null);}}>
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

export default FormCancelarConsulta;