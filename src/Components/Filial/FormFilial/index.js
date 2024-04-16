import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row} from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormFilial.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Load from '../../Utils/Load/index.js'
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET,FILIAIS_SAVE_POST, FILIAIS_UPDATE_POST, FILIAIS_ONE_GET, CLIENTES_ALL_POST} from '../../../api/endpoints/geral.js'
import Atualizar from '../Atualizar/index.js'
import Required from '../../FormControl/Required.js';
import Swal from 'sweetalert2'

const FormFilial = ({dataFilialChoice, dataEstado, setIdFilial, idFilial, showModalCriarFilial, setShowModalCriarFilial, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)
    //dataEstado={dataEstado} setIdFilial={setIdFilial} idFilial={idFilial} carregando={false} dataFilialChoice={dataFilial} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarFilial={showModalAtualizarFilial} setShowModalCriarFilial={()=>{setShowModalAtualizarFilial();setCadastrarFilial()}} callback={callback} 
	const {data, error, request, loading} = useFetch();
	const fetchToFilial = useFetch();
	const [idPessoa, setIdPessoa] = React.useState(null)

	const {getToken, dataUser} = React.useContext(UserContex);
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
			id,
			pessoa_id
		})=>{

    	const data = {
    		'id':id,
            'pessoa_id':pessoa_id,

    	}

    	//alert('aqui')

        if(atualizarCadastro == true){
            const {url, options} = FILIAIS_UPDATE_POST(idFilial, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
                console.log(json)
                
                callback();
                setShowModalCriarFilial();
                setAtualizarCadastro(false);
                setIdFilial(null);

                Swal.fire({
                  icon: "success",
                  title: "",
                  text: 'Reigistrado com sucesso',
                  footer: '',//'<a href="#">Why do I have this issue?</a>'
                  confirmButtonColor: "#07B201",
                });
            }

        }else{


        	const {url, options} = FILIAIS_SAVE_POST(data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
            	console.log(json)
            	
            	callback();
            	setShowModalCriarFilial();
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


    const dataToFormFilial = ()=>{
    	let obj = {id:'', pessoa_id:'', pessoa_name:'', name_servico:''}
    	if(dataFilialChoice && dataFilialChoice.hasOwnProperty('registro')){
    		let data = dataFilialChoice.registro;
           
    		if(data.hasOwnProperty('pessoa_id')){
    			obj.pessoa_id = data.pessoa_id;
    		}
    		if(data.hasOwnProperty('pessoa')){
    			obj.name_servico = obj.pessoa_name = data?.pessoa?.name;
    		}

    	}

    	if(dataFilialChoice && dataFilialChoice.hasOwnProperty('mensagem')){
    		let data = dataFilialChoice.mensagem;
           
    		if(data.hasOwnProperty('pessoa_id')){
    			obj.pessoa_id = data.pessoa_id;
    		}

    		if(data.hasOwnProperty('pessoa')){
    			obj.name_servico = obj.pessoa_name = data?.pessoa?.name;
    		}

    	}

    	if(idPessoa > 0){
    		obj.pessoa_id = idPessoa;
    	}
    	
    	//console.log(obj)
    	return obj;
    }
    
   /* if(atualizarCadastro){
        return(
            <Modal  handleConcluir={()=>null}  title={'Cadastrar Cliente ..'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarFilial} showHide={()=>{setShowModalCriarFilial();}}>
                {carregandoDadosChoice && <Load/>}
                <Atualizar
                    idFilial={idFilial} 
                    setDataCliente={setDataFilialChoice}
                    setCarregandoDadosCliente={setCarregandoDadosChoice}
                />
             </Modal>
        )
    }
   */
    const preparaFilialToForm = ()=>{
        let grupoFormat = [{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}}]
        if(dataEstado && dataEstado.hasOwnProperty('mensagem') ){
            
            if(Array.isArray(dataEstado.mensagem) && dataEstado.mensagem.length > 0){


                for(let i=0; !(i==dataEstado.mensagem.length); i++){
                    let atual = dataEstado.mensagem[i];
                    let name    = atual.hasOwnProperty('nmEStado')      ? atual.nmEStado : '';
                    let id      = atual.hasOwnProperty('id')        ? atual.id : '';
                    grupoFormat.push(
                        {label:name,valor:id,props:{}}
                    )
                }

            }
            
        }

        console.log('-------------grupo agui----------------------')
        console.log(dataEstado)
        console.log('-------------grupo agui aa----------------------')

        return grupoFormat;
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

                initialValues={{... dataToFormFilial()}}
				enableReinitialize={true}

                validate={
                    values=>{

                        const errors = {}

                        if(!values.pessoa_id){
                            errors.pessoa_id="Obrigatório"
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

                        <Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarCadastro == true ? 'Atualizar' : 'Cadastrar')+' Filial'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarFilial} showHide={()=>{setShowModalCriarFilial();setAtualizarCadastro(false);setIdFilial(null);}}>
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
                                                        contentLabel:'Pessoa *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'pessoa_id',
                                                            placeholder:'Ex: fulano de tal',
                                                            id:'pessoa_id',
                                                            name_cod:'pessoa_id',
                                                            name_desacription:'pessoa_name',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.pessoa_id,
                                                            name_servico:values.pessoa_name,
                                                            className:`${estilos.input}`,
                                                            size:"sm"
                                                        },
                                                        atributsContainer:{
                                                            className:''
                                                        },
                                                        hookToLoadFromDescription:CLIENTES_ALL_POST,
                                                        callbackDataItemChoice:(param)=>{
															let {label, value} = param
															/*handleChange(value)
															handleBlur(value)*/
															console.log('Handlechange')
															console.log(handleChange)
															setIdPessoa(value)
														}
                                                    }
                                                }
                                                component={Required}
                                         >   </Field>    
                                          <ErrorMessage className="alerta_error_form_label" name="pessoa_id" component="div" />
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

export default FormFilial;
