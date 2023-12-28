import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row} from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormEspecialidade.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Load from '../../Utils/Load/index.js'
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ESPECIALIDADE_SAVE_POST, ESPECIALIDADE_UPDATE_POST, ESPECIALIDADE_ONE_GET} from '../../../api/endpoints/geral.js'
import Atualizar from '../Atualizar/index.js'
import Swal from 'sweetalert2'

const FormEspecialidade = ({dataEspecialidadeChoice, setIdEspecialidade, idEspecialidade, showModalCriarEspecialidade, setShowModalCriarEspecialidade, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)
	const {data, error, request, loading} = useFetch();
	const fetchToEspecialidade = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const userLogar =  ()=>{
        console.log('Aqui............')//
    }

    const sendData = async ({
    		name
		})=>{

    	const data = {
    		'name':name
    	}

        if(atualizarCadastro == true){
            const {url, options} = ESPECIALIDADE_UPDATE_POST(idEspecialidade, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
                console.log(json)
                
                callback();
                setShowModalCriarEspecialidade();
                setAtualizarCadastro(false);
                setIdEspecialidade(null);

                Swal.fire({
                  icon: "success",
                  title: "",
                  text: 'Reigistrado com sucesso',
                  footer: '',//'<a href="#">Why do I have this issue?</a>'
                  confirmButtonColor: "#07B201",
                });

            }

        }else{


        	const {url, options} = ESPECIALIDADE_SAVE_POST(data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
            	console.log(json)
            	
            	callback();
            	setShowModalCriarEspecialidade();
                setAtualizarCadastro(false);

                Swal.fire({
                  icon: "success",
                  title: "",
                  text: 'Reigistrado com sucesso',
                  footer: '',//'<a href="#">Why do I have this issue?</a>'
                  confirmButtonColor: "#07B201",
                });
            }

        }

    }


    const dataToFormEspecialidade = ()=>{
    	let obj = {name:''}
    	if(dataEspecialidadeChoice && dataEspecialidadeChoice.hasOwnProperty('mensagem')){
    		let data = dataEspecialidadeChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.name = data.name;
    		}

    	}
    	
    	//console.log(obj)
    	return obj;
    }

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

                initialValues={{... dataToFormEspecialidade()}}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.name){
                            errors.name="Obrigatório"
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

                        <Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarCadastro == true ? 'Atualizar' : 'Cadastrar')+' especialidade'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarEspecialidade} showHide={()=>{setShowModalCriarEspecialidade();setAtualizarCadastro(false);setIdEspecialidade(null);}}>
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
				                                            name:'name',
				                                            placeholder:'fulano de tal',
				                                            id:'name',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.name,
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
				                            <ErrorMessage className="alerta_error_form_label" name="name" component="div" />
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

export default FormEspecialidade;
