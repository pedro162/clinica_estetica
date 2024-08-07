import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row} from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormEstado.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Swal from 'sweetalert2'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ESTADO_SAVE_POST, PAIS_ALL_POST, ESTADO_UPDATE_POST} from '../../../api/endpoints/geral.js'


const FormEstado = ({dataEstadoChoice, dataGrupo, setIdEstado, idEstado, showModalCriarEstado, setShowModalCriarEstado,  atualizarCadastro, setAtualizarCadastro, carregando, callback})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataPais, setDataPais] = React.useState([])

	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		nome,
    		cd_estado,
			pais_id,
			sigla,
			padrao
		})=>{



    	const data = {
    		'nmEStado':nome,
    		'codEstado':cd_estado,
    		'sigla':sigla,
    		'pais_id':pais_id,
    		'padrao':padrao,
    	}

    	

        if(atualizarCadastro == true){
            const {url, options} = ESTADO_UPDATE_POST(idEstado, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
                console.log(json)
                
                callback();
                setShowModalCriarEstado();
                setAtualizarCadastro(false);
                setIdEstado(null);

                Swal.fire({
	              icon: "success",
	              title: "",
	              text: 'Registrado com sucesso',
	              footer: '',//'<a href="#">Why do I have this issue?</a>'
	              confirmButtonColor: "#07B201",
	            });
            }

        }else{

        	const {url, options} = ESTADO_SAVE_POST(data, getToken());


	        const {response, json} = await request(url, options);
	        console.log('Save clients here')
	        console.log(json)

	        if(json){
	            console.log('Response Save clients here')
	        	console.log(json)
	        	
	        	callback();
	        	setShowModalCriarEstado();

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

    const requestAllPaises = async() =>{
       
        const {url, options} = PAIS_ALL_POST({}, getToken());


        const {response, json} = await dataRequest.request(url, options);
        console.log('All Paises here')
        console.log(json)
        if(json){
            setDataPais(json)
        }else{

        	setDataPais([]);
        }

            
    }



    const dataToFormEstado = ()=>{
    	let obj = {nome:'', cd_estado:'', sigla:'', pais_id:'', padrao:''}
    	if(dataEstadoChoice && dataEstadoChoice.hasOwnProperty('mensagem')){
    		let data = dataEstadoChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.nome = data.name;
    		}else if(data.hasOwnProperty('nmEStado')){
    			 obj.nome = data.nmEStado;

    		}

    		if(data.hasOwnProperty('cd_estado')){
                obj.cd_estado = data.cd_estado;
    		}else if(data.hasOwnProperty('codEstado')){
    			 obj.cd_estado = data.codEstado;

    		}

    		if(data.hasOwnProperty('sigla')){
                obj.sigla = data.sigla;
    		}

    		if(data.hasOwnProperty('pais_id')){
                obj.pais_id = data.pais_id;
    		}

    		if(data.hasOwnProperty('padrao')){
                obj.padrao = data.padrao;// == 'yes' ? 'Sim' :  'Não';
    		}
    	}
    	
    	//console.log(obj)
    	return obj;
    }

    const preparaPaisToForm = ()=>{
    	if(dataPais.hasOwnProperty('mensagem') && Array.isArray(dataPais.mensagem) && dataPais.mensagem.length > 0){
    		let paises = dataPais.mensagem.map(({id, nmPais, cdPais, padrao}, index, arr)=>({label:nmPais,valor:id,props:{}}))
    		paises.unshift({label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}})
    		
    		return paises;
    	}
    	return []
    }

    React.useEffect(()=>{
    	const requesPais = async ()=>{
    		await requestAllPaises();
    	}
    	
    	requesPais();

    }, []);


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
    

    console.log('----------------------------- data pais ----------------------------------')
    console.log(dataPais)
	return(

		<>
			 <Formik 

                initialValues={{... dataToFormEstado()}}
                enableReinitialize={true}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.nome){
                            errors.nome="Obrigatório"
                        }

                        if(!values.cd_estado){
                            errors.cd_estado="Obrigatório"
                        }


                        if(!values.padrao){
                            errors.padrao="Obrigatório"
                        }

                        if(!values.pais_id){
                            errors.pais_id="Obrigatório"
                        }
						
						if(!values.sigla){
						    errors.sigla="Obrigatório"
						}

                        return errors;
                    }
                }

                onSubmit={async(values, {setSubmitting})=>{
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

                        <Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarCadastro == true ? 'Atualizar' : 'Cadastrar')+' Estado'}  size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarEstado} showHide={ ()=>{setShowModalCriarEstado();setAtualizarCadastro(false);setIdEstado(null);}}>

	                        <form onSubmit={handleSubmit}>
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
				                                            placeholder:'Nom do estado',
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

	                        	<Row className="mb-1">
	                        		<Col xs="12" sm="12" md="6">
	                        			 <Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Código *',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'cd_estado',
				                                            placeholder:'Código do estado',
				                                            id:'cd_estado',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.cd_estado,
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
				                            <ErrorMessage className="alerta_error_form_label" name="cd_estado" component="div" />
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
				                                            placeholder:'Sigla do estado',
				                                            id:'sigla',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.sigla,
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
				                            <ErrorMessage className="alerta_error_form_label" name="sigla" component="div" />
	                        		</Col>
	                        	</Row>
	                        	<Row>
	                        		
	                        		<Col xs="12" sm="12" md="6">
	                        			 <Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'País *',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'pais_id',
				                                            placeholder:'Código do estado',
				                                            id:'pais_id',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.pais_id,
				                                            className:estilos.input,
				                                            size:"sm"
				                                        },
				                                        options:preparaPaisToForm(),
				                                        atributsContainer:{
				                                            className:''
				                                        }
				                                    }
				                                }
				                               
				                                component={FormControlSelect}
				                            ></Field>
				                            <ErrorMessage className="alerta_error_form_label" name="pais_id" component="div" />
	                        		</Col>
	                        		<Col xs="12" sm="12" md="6">
	                        			<Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Padrão',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'padrao',
				                                            placeholder:'fulano de tal',
				                                            id:'padrao',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.padrao,
				                                            className:estilos.input,
				                                            size:"sm"
				                                        },
				                                        options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'Sim',valor:'yes',props:{}},{label:'Não',valor:'no',props:{}}],
				                                        atributsContainer:{
				                                            className:''
				                                        }
				                                    }
				                                }
				                               
				                                component={FormControlSelect}
				                            ></Field>
				                            <ErrorMessage className="alerta_error_form_label" name="padrao" component="div" />
	                        		</Col>
	                        	</Row>                        

	                        </form>

                        </Modal>
                    )
                }
            </Formik>
		</>
	)
}

export default FormEstado;
