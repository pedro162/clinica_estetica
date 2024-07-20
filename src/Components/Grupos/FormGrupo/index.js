import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row} from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormGrupo.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Load from '../../Utils/Load/index.js'
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, GRUPOS_SAVE_POST, GRUPOS_UPDATE_POST, GRUPOS_ONE_GET} from '../../../api/endpoints/geral.js'
import Atualizar from '../Atualizar/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import Swal from 'sweetalert2'

const FormGrupo = ({dataGrupoChoice, setIdGrupo, idGrupo, showModalCriarGrupo, setShowModalCriarGrupo, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)

	const {data, error, request, loading} = useFetch();
	const fetchToClient = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		nome,
			descricao,
			
		})=>{

    	const data = {
    		'name':nome,
    		'descricao':descricao,    		
            'idUser':1,

    	}

        if(atualizarCadastro == true){
            const {url, options} = GRUPOS_UPDATE_POST(idGrupo, data, getToken());
            const {response, json} = await request(url, options);
            if(json){
                
                callback();
                setShowModalCriarGrupo();
                setAtualizarCadastro(false);
                setIdGrupo(null);


                 Swal.fire({
                  icon: "success",
                  title: "",
                  text: 'Reigistrado com sucesso',
                  footer: '',//'<a href="#">Why do I have this issue?</a>'
                  confirmButtonColor: "#07B201",
                });
            }

        }else{


        	const {url, options} = GRUPOS_SAVE_POST(data, getToken());


            const {response, json} = await request(url, options);
            if(json){
            	callback();
            	setShowModalCriarGrupo();
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


    const dataToFormGrupo = ()=>{
    	let obj = {nome:'', descricao:''}
    	if(dataGrupoChoice && dataGrupoChoice.hasOwnProperty('mensagem')){
    		let data = dataGrupoChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.nome = data.name;
    		}

    		if(data.hasOwnProperty('descricao')){
    			obj.descricao = data.descricao;
    		}
    		    		
    	}
        
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

                initialValues={{... dataToFormGrupo()}}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.nome){
                            errors.nome="Obrigatório"
                        }

                        if(!values.descricao){
                           //errors.descricao="Obrigatório"
                        }

                        return errors;
                    }
                }

                onSubmit={async (values, {setSubmitting})=>{
                    /*setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);*/
                      //alert(values.nome)
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

                        <Modal  handleConcluir={()=>{handleSubmit(); }}  title={'Cadastrar Grupo'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarGrupo} showHide={()=>{setShowModalCriarGrupo();setAtualizarCadastro(false);setIdGrupo(null);}}>
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
				                                        contentLabel:'Nome *',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'nome',
				                                            placeholder:'Nome do grupo',
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

	                        		<Col xs="12" sm="12" md="6">
	                        			<Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Descrição',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'descricao',
				                                            placeholder:'Descrição do grupo',
				                                            id:'descricao',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.descricao,
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
				                            <ErrorMessage className="alerta_error_form_label" name="descricao" component="div" />
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

export default FormGrupo;
