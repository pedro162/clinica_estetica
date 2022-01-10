import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row} from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormAgendaEvento.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Load from '../../Utils/Load/index.js'
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, AGENDA_EVENTO_SAVE_POST, AGENDA_EVENTO_UPDATE_POST, AGENDA_EVENTO_ONE_GET} from '../../../api/endpoints/geral.js'
import Atualizar from '../Atualizar/index.js'

const FormAgendaEvento = ({dataAgendaEventoChoice, setIdAgendaEvento, idAgendaEvento, showModalCriarAgendaEvento, setShowModalCriarAgendaEvento, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)
	const {data, error, request, loading} = useFetch();
	const fetchToAgendaEvento = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		nome,
			cd_AgendaEvento,
			sigla,
			estado_id
		})=>{

    	const data = {
    		'name':nome
    	}

        if(atualizarCadastro == true){
            const {url, options} = AGENDA_EVENTO_UPDATE_POST(idAgendaEvento, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
                console.log(json)
                
                callback();
                setShowModalCriarAgendaEvento();
                setAtualizarCadastro(false);
                setIdAgendaEvento(null);
            }

        }else{


        	const {url, options} = AGENDA_EVENTO_SAVE_POST(data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
            	console.log(json)
            	
            	callback();
            	setShowModalCriarAgendaEvento();
                setAtualizarCadastro(false);
            }

        }

    }


    const dataToFormAgendaEvento = ()=>{
    	let obj = {nome:''}
    	if(dataAgendaEventoChoice && dataAgendaEventoChoice.hasOwnProperty('mensagem')){
    		let data = dataAgendaEventoChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.nome = data.name;
    		}

    	}
    	
    	//console.log(obj)
    	return obj;
    }
    

	return(

		<>
			 <Formik 

                initialValues={{... dataToFormAgendaEvento()}}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.nome){
                            errors.nome="Obrigatório"
                        }
                        return errors;
                    }
                }

                onSubmit={async (values, {setSubmitting})=>{
                    
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

                        <Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarCadastro == true ? 'Atualizar' : 'Cadastrar')+' evento de agenda'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarAgendaEvento} showHide={()=>{setShowModalCriarAgendaEvento();setAtualizarCadastro(false);setIdAgendaEvento(null);}}>
                                {
                                    carregando && carregando==true
                                    ?
                                        (<Load/>)
                                    :
                                        (                 
	                        <form onSubmit={()=>handleSubmit()}>
	                            <Row className="my-3">
	                        		<Col xs="12" sm="12" md="12">
	                        			<span className="label_title_grup_forms">Dados básicos</span>
	                        		</Col>
	                        	</Row>
	                        	<Row className="mb-1">
	                        		<Col xs="12" sm="12" md="12">
	                        			 <Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Nome *',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'nome',
				                                            placeholder:'fulano de tal',
				                                            id:'nome',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.nome,
				                                            className:`${estilos.input}`,
				                                            size:"sm"
				                                        },
				                                        atributsContainer:{
				                                            className:''
				                                        }
				                                    }
				                                }
				                               
				                                component={FormControlInput}
				                            ></Field>
				                            <ErrorMessage className="alerta_error_form_label" name="nome" component="div" />
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

export default FormAgendaEvento;
