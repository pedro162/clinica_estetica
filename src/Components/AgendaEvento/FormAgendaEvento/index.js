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

const FormAgendaEvento = ({dataCategoria,dataAgendaEventoChoice, setIdAgendaEvento, idAgendaEvento, showModalCriarAgendaEvento, setShowModalCriarAgendaEvento, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)
	const {data, error, request, loading} = useFetch();
	const fetchToAgendaEvento = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		nome,
			descricao,
            periodo,
            dt_inicio,
            dt_fim,
            hr_inicio,
            hr_fim,
            profissional_id,
            categoria_evento_id,
            recorrente,
            nivel
		})=>{

    	const data = {
    		'name':nome,
            'descricao':descricao,
            'periodo':periodo,
            'dt_inicio':dt_inicio,
            'dt_fim':dt_fim,
            'hr_inicio':hr_inicio,
            'hr_fim':hr_fim,
            'profissional_id':profissional_id,
            'categoria_evento_id':categoria_evento_id,
            'recorrente':recorrente,
            'nivel':nivel,
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
    	let obj = {nome:'', descricao:'', periodo:'', dt_inicio:'', dt_fim:'', hr_inicio:'', hr_fim:'', profissional_id:'', categoria_evento_id:'', recorrente:'', nivel:''}
    	if(dataAgendaEventoChoice && dataAgendaEventoChoice.hasOwnProperty('mensagem')){
    		let data = dataAgendaEventoChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.nome = data.name;
    		}

            if(data.hasOwnProperty('descricao')){
                obj.nome = data.descricao;
            }

            if(data.hasOwnProperty('periodo')){
                obj.nome = data.periodo;
            }

            if(data.hasOwnProperty('dt_inicio')){
                obj.nome = data.dt_inicio;
            }

            if(data.hasOwnProperty('dt_fim')){
                obj.nome = data.dt_fim;
            }

            if(data.hasOwnProperty('hr_inicio')){
                obj.nome = data.hr_inicio;
            }

            if(data.hasOwnProperty('hr_fim')){
                obj.nome = data.hr_fim;
            }

            if(data.hasOwnProperty('profissional_id')){
                obj.nome = data.profissional_id;
            }

            if(data.hasOwnProperty('categoria_evento_id')){
                obj.nome = data.categoria_evento_id;
            }

            if(data.hasOwnProperty('recorrente')){
                obj.nome = data.recorrente;
            }

            if(data.hasOwnProperty('nivel')){
                obj.nome = data.nivel;
            }

    	}
    	
    	//console.log(obj)
    	return obj;
    }

    /*

user_update_id
    */

     const preparaCategoriaToForm = ()=>{
        let categoriaFormat = [{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}}]
        if(dataCategoria && dataCategoria.hasOwnProperty('mensagem') ){
            
            if(Array.isArray(dataCategoria.mensagem) && dataCategoria.mensagem.length > 0){


                for(let i=0; !(i==dataCategoria.mensagem.length); i++){
                    let atual = dataCategoria.mensagem[i];
                    let name    = atual.hasOwnProperty('name')      ? atual.name : '';
                    let id      = atual.hasOwnProperty('id')        ? atual.id : '';
                    categoriaFormat.push(
                        {label:name,valor:id,props:{}}
                    )
                }

            }
            
        }

        console.log('-------------categoria agui----------------------')
        console.log(categoriaFormat)
        console.log('-------------categoria agui----------------------')

        return categoriaFormat;
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

                        if(!values.descricao){
                            errors.descricao="Obrigatório"
                        }

                        if(!values.periodo){
                            errors.periodo="Obrigatório"
                        }

                        if(!values.dt_inicio){
                            errors.dt_inicio="Obrigatório"
                        }

                        if(!values.dt_fim){
                            errors.dt_fim="Obrigatório"
                        }

                        if(!values.hr_inicio){
                            errors.hr_inicio="Obrigatório"
                        }

                        if(!values.hr_fim){
                            errors.hr_fim="Obrigatório"
                        }

                        if(!values.profissional_id){
                            errors.profissional_id="Obrigatório"
                        }

                        if(!values.categoria_evento_id){
                            errors.categoria_evento_id="Obrigatório"
                        }

                        if(!values.recorrente){
                            errors.recorrente="Obrigatório"
                        }

                        if(!values.nivel){
                            errors.nivel="Obrigatório"
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
                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Profissional *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'profissional_id',
                                                            placeholder:'',
                                                            id:'profissional_id',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.profissional_id,
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
                                            <ErrorMessage className="alerta_error_form_label" name="profissional_id" component="div" />
                                        </Col>

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
	                        	</Row>

                                <Row className="mb-1">
                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Categoria *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'categoria_evento_id',
                                                            placeholder:'',
                                                            id:'categoria_evento_id',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.categoria_evento_id,
                                                            className:`${estilos.input}`,
                                                            size:"sm"
                                                        },
                                                        options:[...preparaCategoriaToForm()],
                                                        atributsContainer:{
                                                            className:''
                                                        }
                                                    }
                                                }
                                               
                                                component={FormControlSelect}
                                            ></Field>
                                            <ErrorMessage className="alerta_error_form_label" name="categoria_evento_id" component="div" />
                                        </Col>
                                        
                                         <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Nível *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'nivel',
                                                            placeholder:'',
                                                            id:'nivel',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.nivel,
                                                            className:`${estilos.input}`,
                                                            size:"sm"
                                                        },
                                                        options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}}, {label:'Baixo',valor:'baixo',props:{}},
                                                         {label:'Médio',valor:'medio',props:{}}, {label:'Alto',valor:'auto',props:{}}, {label:'Urgente',valor:'urgente',props:{}}],
                                                        atributsContainer:{
                                                            className:''
                                                        }
                                                    }
                                                }
                                                    
                                                component={FormControlSelect}
                                            ></Field>
                                            <ErrorMessage className="alerta_error_form_label" name="nivel" component="div" />
                                        </Col>  
                                    </Row>
                                     <Row className="mb-1">   

                                        <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Data início *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'date',
                                                            name:'dt_inicio',
                                                            placeholder:'',
                                                            id:'dt_inicio',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.dt_inicio,
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
                                            <ErrorMessage className="alerta_error_form_label" name="dt_inicio" component="div" />
                                        </Col>

                                        <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Hora início *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'time',
                                                            name:'hr_inicio',
                                                            placeholder:'',
                                                            id:'hr_inicio',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.hr_inicio,
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
                                            <ErrorMessage className="alerta_error_form_label" name="hr_inicio" component="div" />
                                        </Col>
                                        
                                </Row>

                                <Row className="mb-1">
                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Data fim *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'date',
                                                            name:'dt_fim',
                                                            placeholder:'00/00/0000',
                                                            id:'dt_fim',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.dt_fim,
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
                                            <ErrorMessage className="alerta_error_form_label" name="dt_fim" component="div" />
                                        </Col>

                                        <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Hora fim *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'time',
                                                            name:'hr_fim',
                                                            placeholder:'',
                                                            id:'hr_fim',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.hr_fim,
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
                                            <ErrorMessage className="alerta_error_form_label" name="hr_fim" component="div" />
                                        </Col>
                                        
                                </Row>

                                <Row className="mb-1">
                                        
                                        
                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Período *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'periodo',
                                                            placeholder:'Ex: tarde',
                                                            id:'periodo',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.periodo,
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
                                            <ErrorMessage className="alerta_error_form_label" name="periodo" component="div" />
                                        </Col>
                                        <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Recorrente  ? *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'recorrente',
                                                            placeholder:'',
                                                            id:'recorrente',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.recorrente,
                                                            className:`${estilos.input}`,
                                                            size:"sm"
                                                        },
                                                        options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}}, {label:'Sim',valor:'yes',props:{}}, {label:'Não',valor:'no',props:{}}],
                                                        atributsContainer:{
                                                            className:''
                                                        }
                                                    }
                                                }
                                               
                                                component={FormControlSelect}
                                            ></Field>
                                            <ErrorMessage className="alerta_error_form_label" name="recorrente" component="div" />
                                        </Col>   
                                </Row>

                                <Row className="mb-1">
                                        <Col xs="12" sm="12" md="12">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Histórico *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'descricao',
                                                            placeholder:'Descrição',
                                                            id:'descricao',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.descricao,
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

export default FormAgendaEvento;
