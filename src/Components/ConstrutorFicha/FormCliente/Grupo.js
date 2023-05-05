import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row, Button} from 'react-bootstrap';
//import Button from '../../FormControl/Button.js';
import estilos from './Grupo.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Load from '../../Utils/Load/index.js'
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_SAVE_POST, CLIENTES_UPDATE_POST, CLIENTES_ONE_GET} from '../../../api/endpoints/geral.js'
import Atualizar from '../Atualizar/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import ItemGrupo from './ItemGrupo.js'

const Grupo = ({dataClienteChoice, dataGrupo, setIdcliente, idCliente, showModalCriarCliente, setShowModalCriarCliente, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)

	const {data, error, request, loading} = useFetch();
	const fetchToClient = useFetch();
	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataContrutorFicha, setDataContrutorFicha] = React.useState([]);
	const [grupo, setGrupo] = React.useState('')
	const [posicao, setPosicao] = React.useState(1)
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
			grupo,
            groupo_id,
            posicao,
		})=>{

    	const data = {
    		'grupo':grupo,
            'groupo_id':groupo_id,
			'posicao':posicao

    	}

        if(atualizarCadastro == true){
            const {url, options} = CLIENTES_UPDATE_POST(idCliente, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
                console.log(json)
                
                callback();
                setShowModalCriarCliente();
                setAtualizarCadastro(false);
                setIdcliente(null);
            }

        }else{


        	const {url, options} = CLIENTES_SAVE_POST(data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
            	console.log(json)
            	
            	callback();
            	setShowModalCriarCliente();
                setAtualizarCadastro(false);
            }

        }
    }


    const dataToGrupo = ()=>{
    	let obj = {grupo:'', groupo_id:'', posicao:''}
    	if(dataClienteChoice && dataClienteChoice.hasOwnProperty('mensagem')){
    		let data = dataClienteChoice.mensagem;
           
    		if(data.hasOwnProperty('grupo')){
                obj.grupo = data.grupo;
    		}

    		if(data.hasOwnProperty('groupo_id')){
    			obj.groupo_id = data.groupo_id;
    		}

			if(data.hasOwnProperty('posicao')){
    			obj.posicao = data.posicao;
    		}
    		
    		

    		
    	}
    	console.log('dados para formulario ----------')
    	//console.log(obj)
    	return obj;
    }
    
	const messag = ()=>{
		console.log('Adicionar grupo');
	} 
	return(

		<>
			 <Formik 

                initialValues={{... dataToGrupo()}}
                validate={
                    values=>{

                        const errors = {}



                        return errors;
                    }
                }

                onSubmit={async (values, {setSubmitting})=>{
                    /*setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);*/
                      //alert(values.nome)
                      //await sendData({...values});
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

                        <Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarCadastro == true ? 'Atualizar' : 'Cadastrar')+' Cliente'} size="xl" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarCliente} showHide={()=>{setShowModalCriarCliente();setAtualizarCadastro(false);setIdcliente(null);}}>
                                
								{
									
                                    carregando && carregando==true
                                    ?
                                        (<Load/>)
                                    :
                                        (                 
	                        <form onSubmit={handleSubmit}>
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
	                        	
								<Row className="mb-1">
	                        		<Col xs="12" sm="12" md="6">
	                        			 <Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Grupo *',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'grupo',
				                                            placeholder:'Grupo',
				                                            id:'grupo',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.grupo,
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

	                        		<Col xs="12" sm="12" md="6">
	                        			<Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Posição',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'posicao',
				                                            placeholder:'Posição',
				                                            id:'posicao',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.posicao,
				                                            className:estilos.input,
				                                            size:"sm"
				                                        },
				                                        atributsContainer:{
				                                            className:''
				                                        }
				                                    }
				                                }
				                               
				                                component={FormControlInput}
				                            ></Field>
				                            <ErrorMessage className="alerta_error_form_label" name="posicao" component="div" />
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

export default Grupo;
