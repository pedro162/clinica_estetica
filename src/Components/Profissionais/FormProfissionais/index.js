import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row} from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormProfissionais.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Load from '../../Utils/Load/index.js'
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, PROFISSIONAIS_SAVE_POST, PROFISSIONAIS_UPDATE_POST, AGENDA_EVENTO_ONE_GET} from '../../../api/endpoints/geral.js'
import Atualizar from '../Atualizar/index.js'

const FormProfissionais = ({dataProfissionaisChoice, setIdProfissionais, idProfissionais, showModalCriarProfissionais, setShowModalCriarProfissionais, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)
    const {data, error, request, loading} = useFetch();
    const fetchToProfissionais = useFetch();

    const {getToken, dataUser} = React.useContext(UserContex);
    const userLogar =  ()=>{
        console.log('Aqui............')
    }

    /*
        'espec_prof', 'profissional_id', 'especialidade_id')
        ->withPivot('nr_doc', 'dt_emiss_doc', 'dt_vencimento_doc','org_expedidor','especialidade_id','profissional_id',
            'user_id','user_update_id','active'
    */

    const sendData = async ({
            pessoa_id,
            especialidade_id,
            dt_emiss_doc,
            dt_vencimento_doc,
            nr_doc,
            org_expedidor,
        })=>{

        const data = {            
            'pessoa_id':pessoa_id,
            'especialidade_id':especialidade_id,
            'dt_emiss_doc':dt_emiss_doc,
            'dt_vencimento_doc':dt_vencimento_doc,
            'nr_doc':nr_doc,
            'org_expedidor':org_expedidor,
        }

        if(atualizarCadastro == true){
            const {url, options} = PROFISSIONAIS_UPDATE_POST(idProfissionais, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
                console.log(json)
                
                callback();
                setShowModalCriarProfissionais();
                setAtualizarCadastro(false);
                setIdProfissionais(null);
            }

        }else{


            const {url, options} = PROFISSIONAIS_SAVE_POST(data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
                console.log(json)
                
                callback();
                setShowModalCriarProfissionais();
                setAtualizarCadastro(false);
            }

        }

    }


    const dataToFormProfissionais = ()=>{
        let obj = {pessoa_id:'',  especialidade_id:'', dt_emiss_doc:'', dt_vencimento_doc:'', nr_doc:''}
        if(dataProfissionaisChoice && dataProfissionaisChoice.hasOwnProperty('mensagem')){
            let data = dataProfissionaisChoice.mensagem;
           
            if(data.hasOwnProperty('pessoa_id')){
                obj.pessoa_id = data.pessoa_id;
            }

            if(data.hasOwnProperty('especialidade_id')){
                obj.especialidade_id = data.especialidade_id;
            }

            if(data.hasOwnProperty('dt_emiss_doc')){
                obj.dt_emiss_doc = data.dt_emiss_doc;
            }

            if(data.hasOwnProperty('dt_vencimento_doc')){
                obj.dt_vencimento_doc = data.dt_vencimento_doc;
            }

            if(data.hasOwnProperty('nr_doc')){
                obj.nr_doc = data.nr_doc;
            }

            if(data.hasOwnProperty('org_expedidor')){
                obj.org_expedidor = data.org_expedidor;
            }

        }
        
        //console.log(obj)
        return obj;
    }
    

    return(

        <>
             <Formik 

                initialValues={{... dataToFormProfissionais()}}
                validate={
                    values=>{

                        const errors = {}

                        if(!values.pessoa_id){
                            errors.pessoa_id="Obrigatório"
                        }

                        if(!values.especialidade_id){
                            errors.especialidade_id="Obrigatório"
                        }

                        if(!values.dt_emiss_doc){
                            errors.dt_emiss_doc="Obrigatório"
                        }

                        if(!values.dt_vencimento_doc){
                            errors.dt_vencimento_doc="Obrigatório"
                        }

                        if(!values.nr_doc){
                            errors.nr_doc="Obrigatório"
                        } 

                        if(!values.org_expedidor){
                            errors.org_expedidor="Obrigatório"
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

                        <Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarCadastro == true ? 'Atualizar' : 'Cadastrar')+' profissional'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarProfissionais} showHide={()=>{setShowModalCriarProfissionais();setAtualizarCadastro(false);setIdProfissionais(null);}}>
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
                                                            name:'pessoa_id',
                                                            placeholder:'Ex: fulano de tal',
                                                            id:'pessoa_id',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.pessoa_id,
                                                            className:`${estilos.input}`,
                                                            size:"sm"
                                                        },
                                                        atributsContainer:{
                                                            className:''
                                                        }
                                                    }
                                                }
                                               
                                                component={FormControlInput}
                                            >
                                        </Field>
                                            <ErrorMessage className="alerta_error_form_label" name="pessoa_id" component="div" />
                                    </Col>

                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Especialidade *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'especialidade_id',
                                                            placeholder:'Especialidade',
                                                            id:'especialidade_id',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.especialidade_id,
                                                            className:`${estilos.input}`,
                                                            size:"sm"
                                                        },
                                                        atributsContainer:{
                                                            className:''
                                                        }
                                                    }
                                                }
                                               
                                                component={FormControlInput}
                                            >
                                        </Field>
                                            <ErrorMessage className="alerta_error_form_label" name="especialidade_id" component="div" />
                                    </Col>

                                        
                                </Row>
                                <Row className="mb-1">
                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Documento *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'nr_doc',
                                                            placeholder:'Ex: nº crm',
                                                            id:'nr_doc',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.nr_doc,
                                                            className:`${estilos.input}`,
                                                            size:"sm"
                                                        },
                                                        atributsContainer:{
                                                            className:''
                                                        }
                                                    }
                                                }
                                               
                                                component={FormControlInput}
                                            >
                                        </Field>
                                            <ErrorMessage className="alerta_error_form_label" name="nr_doc" component="div" />
                                    </Col>

                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Org. Expedidor *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'org_expedidor',
                                                            placeholder:'Especialidade',
                                                            id:'org_expedidor',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.org_expedidor,
                                                            className:`${estilos.input}`,
                                                            size:"sm"
                                                        },
                                                        atributsContainer:{
                                                            className:''
                                                        }
                                                    }
                                                }
                                               
                                                component={FormControlInput}
                                            >
                                        </Field>
                                            <ErrorMessage className="alerta_error_form_label" name="org_expedidor" component="div" />
                                    </Col>

                                        
                                </Row>
                                <Row className="mb-1">

                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Data de emissão *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'date',
                                                            name:'dt_emiss_doc',
                                                            placeholder:'Especialidade',
                                                            id:'dt_emiss_doc',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.dt_emiss_doc,
                                                            className:`${estilos.input}`,
                                                            size:"sm"
                                                        },
                                                        atributsContainer:{
                                                            className:''
                                                        }
                                                    }
                                                }
                                               
                                                component={FormControlInput}
                                            >
                                        </Field>
                                            <ErrorMessage className="alerta_error_form_label" name="dt_emiss_doc" component="div" />
                                    </Col>
                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Data de vencimento *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'date',
                                                            name:'dt_vencimento_doc',
                                                            placeholder:'',
                                                            id:'dt_vencimento_doc',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.dt_vencimento_doc,
                                                            className:`${estilos.input}`,
                                                            size:"sm"
                                                        },
                                                        atributsContainer:{
                                                            className:''
                                                        }
                                                    }
                                                }
                                               
                                                component={FormControlInput}
                                            >
                                        </Field>
                                            <ErrorMessage className="alerta_error_form_label" name="dt_vencimento_doc" component="div" />
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

export default FormProfissionais;
