import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row} from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormAgenda.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Load from '../../Utils/Load/index.js'
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CIDADE_SAVE_POST, CIDADE_UPDATE_POST, CIDADE_ONE_GET} from '../../../api/endpoints/geral.js'
import Atualizar from '../Atualizar/index.js'
import Swal from 'sweetalert2'

const FormAgenda = ({dataAgendaChoice, dataEstado, setIdAgenda, idAgenda, showModalCriarAgenda, setShowModalCriarAgenda, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)
    //dataEstado={dataEstado} setIdAgenda={setIdAgenda} idAgenda={idAgenda} carregando={false} dataAgendaChoice={dataAgenda} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarAgenda={showModalAtualizarAgenda} setShowModalCriarAgenda={()=>{setShowModalAtualizarAgenda();setCadastrarAgenda()}} callback={callback} 
	const {data, error, request, loading} = useFetch();
	const fetchToAgenda = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		nome,
			cd_cidade,
			sigla,
			estado_id
		})=>{

    	const data = {
    		'nmAgenda':nome,
    		'cdAgenda':cd_cidade,
    		'sigla':sigla,
            'estado_id':estado_id,
            'idUser':1,

    	}

        if(atualizarCadastro == true){
            const {url, options} = CIDADE_UPDATE_POST(idAgenda, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
                console.log(json)
                
                callback();
                setShowModalCriarAgenda();
                setAtualizarCadastro(false);
                setIdAgenda(null);

                Swal.fire({
                  icon: "success",
                  title: "",
                  text: 'Registrado com sucesso',
                  footer: '',//'<a href="#">Why do I have this issue?</a>'
                  confirmButtonColor: "#07B201",
                });
            }

        }else{


        	const {url, options} = CIDADE_SAVE_POST(data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
            	console.log(json)
            	
            	callback();
            	setShowModalCriarAgenda();
                setAtualizarCadastro(false);

                Swal.fire({
                  icon: "success",
                  title: "",
                  text: 'Registrado com sucesso',
                  footer: '',//'<a href="#">Why do I have this issue?</a>'
                  confirmButtonColor: "#07B201",
                });
            }

        }

    }


    const dataToFormAgenda = ()=>{
    	let obj = {nome:'', cd_cidade:'', sigla:'', estado_id:''}
    	if(dataAgendaChoice && dataAgendaChoice.hasOwnProperty('registro')){
    		let data = dataAgendaChoice.registro;
           
    		if(data.hasOwnProperty('nmAgenda')){
                obj.nome = data.nmAgenda;
    		}

    		if(data.hasOwnProperty('cdAgenda')){
    			obj.cd_cidade = data.cdAgenda;
    		}
    		if(data.hasOwnProperty('sigla')){
    			obj.sigla = data.sigla;
    		}
    		if(data.hasOwnProperty('estado_id')){
    			obj.estado_id = data.estado_id;
    		}

    	}
    	
    	//console.log(obj)
    	return obj;
    }
    
   /* if(atualizarCadastro){
        return(
            <Modal  handleConcluir={()=>null}  title={'Cadastrar Cliente ..'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarAgenda} showHide={()=>{setShowModalCriarAgenda();}}>
                {carregandoDadosChoice && <Load/>}
                <Atualizar
                    idAgenda={idAgenda} 
                    setDataCliente={setDataAgendaChoice}
                    setCarregandoDadosCliente={setCarregandoDadosChoice}
                />
             </Modal>
        )
    }
   */
    const preparaAgendaToForm = ()=>{
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

                initialValues={{... dataToFormAgenda()}}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.nome){
                            errors.nome="Obrigatório"
                        }

                        if(!values.cd_cidade){
                            errors.cd_cidade="Obrigatório"
                        }

                        if(!values.sigla){
                            errors.sigla="Obrigatório"
                        }

                        if(!values.estado_id){
                            errors.estado_id="Obrigatório"
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

                        <Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarCadastro == true ? 'Atualizar' : 'Cadastrar')+' Agenda'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarAgenda} showHide={()=>{setShowModalCriarAgenda();setAtualizarCadastro(false);setIdAgenda(null);}}>
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

                                        <Col xs="12" sm="12" md="6">
                                            <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Sigla *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'sigla',
                                                            placeholder:'fulano de tal',
                                                            id:'sigla',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.sigla,
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
                                            <ErrorMessage className="alerta_error_form_label" name="sigla" component="div" />
	                        		</Col>
	                        	</Row>

	                        	
	                        	<Row className="mb-1">                               

                                    <Col xs="12" sm="12" md="6">
                                        <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'CD. Agenda *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'cd_cidade',
                                                            placeholder:'fulano de tal',
                                                            id:'cd_cidade',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.cd_cidade,
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
                                            <ErrorMessage className="alerta_error_form_label" name="cd_cidade" component="div" />
                                    </Col>
	                        		<Col xs="12" sm="12" md="6">
	                        			<Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Estado * ',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'estado_id',
				                                            placeholder:'fulano de tal',
				                                            id:'estado_id',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.estado_id,
				                                            className:estilos.input,
				                                            size:"sm"
				                                        },
				                                        options:[...preparaAgendaToForm()],
				                                        atributsContainer:{
				                                            className:''
				                                        }
				                                    }
				                                }
				                               
				                                component={FormControlSelect}
				                            ></Field>
				                            <ErrorMessage className="alerta_error_form_label" name="estado_id" component="div" />
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

export default FormAgenda;
