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
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, PROFISSIONAIS_SAVE_POST, PROFISSIONAIS_UPDATE_POST, AGENDA_EVENTO_ONE_GET, CLIENTES_ALL_POST} from '../../../api/endpoints/geral.js'
import Atualizar from '../Atualizar/index.js'
import Required from '../../FormControl/Required.js';

const FormProfissionais = ({dataProfissionaisChoice, setIdProfissionais, idProfissionais, showModalCriarProfissionais, setShowModalCriarProfissionais, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)
    const {data, error, request, loading} = useFetch();
    const fetchToProfissionais = useFetch();

    const {getToken, dataUser} = React.useContext(UserContex);
    const userLogar =  ()=>{
        console.log('Aqui............')
    }

    /*
        'vr_salario',
        'titulo_eleitor',
        'zona_eleitor',
        'naturalidade',
        'name_mae',
        'name_conjuge',
        'nr_serie_cnh',
        'name_banco_salario',
        'nr_agencia_banco_salario',
        'nr_conta_banco_salario',
        'ponto_obrigatorio',
        'estado_civil',
        'grau_instrucao',
        'status',
        'tipo_contrato',
        'filial_id',
        'uf_cnh_id',
    */

    const sendData = async ({
            pessoa_id,
            especialidade_id,
            dt_emiss_doc,
            dt_vencimento_doc,
            nr_doc,
            vr_salario,
            org_expedidor,
            titulo_eleitor,
            zona_eleitor,
            naturalidade,
            name_mae,
            name_conjuge,
            nr_serie_cnh,
            name_banco_salario,
            nr_agencia_banco_salario,
            nr_conta_banco_salario,
            ponto_obrigatorio,
            estado_civil,
            grau_instrucao,
            status,
            tipo_contrato,
            cargo,
            dt_admissao,
            filial_id,
            uf_cnh_id,
        })=>{

        const data = {            
            'pessoa_id':pessoa_id,
            'especialidade_id':especialidade_id,
            'dt_emiss_doc':dt_emiss_doc,
            'dt_vencimento_doc':dt_vencimento_doc,
            'nr_doc':nr_doc,
            'org_expedidor':org_expedidor,
            'vr_salario':vr_salario,
            'titulo_eleitor':titulo_eleitor,
            'zona_eleitor':zona_eleitor,
            'naturalidade':naturalidade,
            'name_mae':name_mae,
            'name_conjuge':name_conjuge,
            'nr_serie_cnh':nr_serie_cnh,
            'name_banco_salario':name_banco_salario,
            'nr_agencia_banco_salario':nr_agencia_banco_salario,
            'nr_conta_banco_salario':nr_conta_banco_salario,
            'ponto_obrigatorio':ponto_obrigatorio,
            'estado_civil':estado_civil,
            'grau_instrucao':grau_instrucao,
            'status':status,
            'tipo_contrato':tipo_contrato,
            'cargo':cargo,//--novo
            'dt_admissao':dt_admissao,//--novo
            'filial_id':filial_id,
            'uf_cnh_id':uf_cnh_id,
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
        let obj = {pessoa_id:'',  especialidade_id:'', dt_emiss_doc:'', dt_vencimento_doc:'', nr_doc:'', cargo:''}
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

            if(data.hasOwnProperty('vr_salario')){
                obj.vr_salario = data.vr_salario;
            }

            if(data.hasOwnProperty('titulo_eleitor')){
                obj.titulo_eleitor = data.titulo_eleitor;
            }
            
            if(data.hasOwnProperty('zona_eleitor')){
                obj.zona_eleitor = data.zona_eleitor;
            }
            
            if(data.hasOwnProperty('naturalidade')){
                obj.naturalidade = data.naturalidade;
            }
            
            if(data.hasOwnProperty('name_mae')){
                obj.name_mae = data.name_mae;
            }
            
            if(data.hasOwnProperty('name_conjuge')){
                obj.name_conjuge = data.name_conjuge;
            }
            
            if(data.hasOwnProperty('nr_serie_cnh')){
                obj.nr_serie_cnh = data.nr_serie_cnh;
            }
            
            if(data.hasOwnProperty('name_banco_salario')){
                obj.name_banco_salario = data.name_banco_salario;
            }

            if(data.hasOwnProperty('nr_agencia_banco_salario')){
                obj.nr_agencia_banco_salario = data.nr_agencia_banco_salario;
            }

            if(data.hasOwnProperty('nr_conta_banco_salario')){
                obj.nr_conta_banco_salario = data.nr_conta_banco_salario;
            }

            if(data.hasOwnProperty('ponto_obrigatorio')){
                obj.ponto_obrigatorio = data.ponto_obrigatorio;
            }

            if(data.hasOwnProperty('estado_civil')){
                obj.estado_civil = data.estado_civil;
            }

            if(data.hasOwnProperty('grau_instrucao')){
                obj.grau_instrucao = data.grau_instrucao;
            }

            if(data.hasOwnProperty('status')){
                obj.status = data.status;
            }

            if(data.hasOwnProperty('tipo_contrato')){
                obj.tipo_contrato = data.tipo_contrato;
            }

            if(data.hasOwnProperty('filial_id')){
                obj.filial_id = data.filial_id;
            }

            if(data.hasOwnProperty('uf_cnh_id')){
                obj.uf_cnh_id = data.uf_cnh_id;
            }

            if(data.hasOwnProperty('cargo')){
                obj.cargo = data.cargo;
            }

            if(data.hasOwnProperty('dt_admissao')){
                obj.dt_admissao = data.dt_admissao;
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
                            //errors.especialidade_id="Obrigatório"
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

                        if( !values.vr_salario){
                            errors.vr_salario="Obrigatório";
                        }
                        
                        if( !values.titulo_eleitor){
                            errors.titulo_eleitor="Obrigatório";
                        }
                        
                        if( !values.zona_eleitor){
                            errors.zona_eleitor="Obrigatório";
                        }
                        
                        if( !values.naturalidade){
                           // errors.naturalidade="Obrigatório";
                        }
                        
                        if( !values.name_mae){
                            errors.name_mae="Obrigatório";
                        }
                        
                        if( !values.name_conjuge){
                            errors.name_conjuge="Obrigatório";
                        }
                        
                        if( !values.nr_serie_cnh){
                            //errors.nr_serie_cnh="Obrigatório";
                        }
                        
                        if( !values.name_banco_salario){
                            errors.name_banco_salario="Obrigatório";
                        }
                        
                        if( !values.nr_agencia_banco_salario){
                            errors.nr_agencia_banco_salario="Obrigatório";
                        }
                        
                        if( !values.nr_conta_banco_salario){
                            errors.nr_conta_banco_salario="Obrigatório";
                        }
                        
                        if( !values.ponto_obrigatorio){
                            errors.ponto_obrigatorio="Obrigatório";
                        }
                        
                        if( !values.estado_civil){
                            //errors.estado_civil="Obrigatório";
                        }
                        
                        if( !values.grau_instrucao){
                           // errors.grau_instrucao="Obrigatório";
                        }
                        
                        if( !values.status){
                           // errors.status="Obrigatório";
                        }
                        
                        if( !values.tipo_contrato){
                            errors.tipo_contrato="Obrigatório";
                        }
                        
                        if( !values.filial_id){
                            errors.filial_id="Obrigatório";
                        }
                        
                        if( !values.uf_cnh_id){
                            //errors.uf_cnh_id="Obrigatório";
                        }

                        if( !values.cargo){
                            errors.cargo="Obrigatório";
                        }

                        if( !values.dt_admissao){
                            errors.dt_admissao="Obrigatório";
                        }
                        console.log(errors)

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

                        <Modal  handleConcluir={()=>{handleSubmit();}}  title={ (atualizarCadastro == true ? 'Atualizar' : 'Cadastrar')+' profissional'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarProfissionais} showHide={()=>{setShowModalCriarProfissionais();setAtualizarCadastro(false);setIdProfissionais(null);}}>
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
                                        <hr/>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col xs="12" sm="12" md="6">
                                       
                                        <Required
                                               data={
                                                {
                                                    hasLabel:true,
                                                    contentLabel:'Filial *',
                                                    atributsFormLabel:{

                                                    },
                                                    atributsFormControl:{
                                                        type:'text',
                                                        name:'filial_id',
                                                        placeholder:'',
                                                        id:'filial_id',
                                                        name_cod:'filial_id',
                                                        name_desacription:'filial_name',
                                                        onChange:handleChange,
                                                        onBlur:handleBlur,
                                                        value:values.filial_id,
                                                        className:`${estilos.input}`,
                                                        size:"sm"
                                                    },
                                                    atributsContainer:{
                                                        className:''
                                                    },
                                                    hookToLoadFromDescription:CLIENTES_ALL_POST,
                                                }
                                            }
                                         />  
                                    </Col>

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
                                                            name_cod:'pessoa_id',
                                                            name_desacription:'pessoa_name',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.pessoa_id,
                                                            className:`${estilos.input}`,
                                                            size:"sm"
                                                        },
                                                        atributsContainer:{
                                                            className:''
                                                        },
                                                        hookToLoadFromDescription:CLIENTES_ALL_POST,
                                                    }
                                                }
                                                component={Required}
                                         >   </Field>    
                                          <ErrorMessage className="alerta_error_form_label" name="pessoa_id" component="div" />
                                    </Col>

                                        
                                </Row>
                                <Row className="mb-3">
                                    <Col xs="12" sm="12" md="6">
                                        <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'CNH ',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'nr_serie_cnh',
                                                            placeholder:'Nº cnh',
                                                            id:'nr_serie_cnh',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.nr_serie_cnh,
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
                                            <ErrorMessage className="alerta_error_form_label" name="nr_serie_cnh" component="div" />
                                    </Col>

                                    <Col xs="12" sm="12" md="6">
                                        <Required
                                               data={
                                                {
                                                    hasLabel:true,
                                                    contentLabel:'UF CNH',
                                                    atributsFormLabel:{

                                                    },
                                                    atributsFormControl:{
                                                        type:'text',
                                                        name:'uf_cnh_id',
                                                        placeholder:'UF CNH',
                                                        id:'uf_cnh_id',
                                                        name_cod:'uf_cnh_id',
                                                        name_desacription:'uf_cnh_name',
                                                        onChange:handleChange,
                                                        onBlur:handleBlur,
                                                        value:values.uf_cnh_id,
                                                        className:`${estilos.input}`,
                                                        size:"sm"
                                                    },
                                                    atributsContainer:{
                                                        className:''
                                                    },
                                                    hookToLoadFromDescription:CLIENTES_ALL_POST,
                                                }
                                            }
                                         />  
                                         
                                    </Col>

                                        
                                </Row>
                                <Row className="mb-3">
                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Documento ',
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
                                                        contentLabel:'Org. Expedidor ',
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
                                <Row className="mb-3">

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

                                <Row className="mb-3">
                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Título de eleitor ',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'titulo_eleitor',
                                                            placeholder:'Nº do título',
                                                            id:'titulo_eleitor',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.titulo_eleitor,
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
                                            <ErrorMessage className="alerta_error_form_label" name="titulo_eleitor" component="div" />
                                    </Col>

                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Zona eleitoral',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'zona_eleitor',
                                                            placeholder:'Nº zona',
                                                            id:'zona_eleitor',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.zona_eleitor,
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
                                            <ErrorMessage className="alerta_error_form_label" name="zona_eleitor" component="div" />
                                    </Col>

                                        
                                </Row>

                                <Row className="mb-3">
                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Conjuge ',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'name_conjuge',
                                                            placeholder:'Nome do(a) conjuge',
                                                            id:'name_conjuge',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.name_conjuge,
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
                                            <ErrorMessage className="alerta_error_form_label" name="name_conjuge" component="div" />
                                    </Col>

                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Nome da mãe',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'name_mae',
                                                            placeholder:'Nome da mãe',
                                                            id:'name_mae',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.name_mae,
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
                                            <ErrorMessage className="alerta_error_form_label" name="name_mae" component="div" />
                                    </Col>

                                        
                                </Row>

                                <Row className="my-3">
                                    <Col xs="12" sm="12" md="12">
                                        <span className="label_title_grup_forms">Informações de contrato</span>
                                        <hr/>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Tipo de contrato ',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'tipo_contrato',
                                                            placeholder:'',
                                                            id:'tipo_contrato',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.tipo_contrato,
                                                            className:`${estilos.input}`,
                                                            size:"sm"
                                                        },
                                                        options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'CLT',valor:1,props:{}},{label:'PJ',valor:'2',props:{}}],
                                                        atributsContainer:{
                                                            className:''
                                                        }
                                                    }
                                                }
                                               
                                                component={FormControlSelect}
                                            >
                                        </Field>
                                            <ErrorMessage className="alerta_error_form_label" name="tipo_contrato" component="div" />
                                    </Col>

                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Banco',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'name_banco_salario',
                                                            placeholder:'Nome do banco',
                                                            id:'name_banco_salario',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.name_banco_salario,
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
                                            <ErrorMessage className="alerta_error_form_label" name="name_banco_salario" component="div" />
                                    </Col>

                                        
                                </Row>
                                <Row className="mb-3">
                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Cargo *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'cargo',
                                                            placeholder:'',
                                                            id:'cargo',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.cargo,
                                                            className:`${estilos.input}`,
                                                            size:"sm"
                                                        },
                                                        options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'Epilador (a)',valor:1,props:{}},{label:'Design de sobrancelhas',valor:'2',props:{}}],
                                                        atributsContainer:{
                                                            className:''
                                                        }
                                                    }
                                                }
                                               
                                                component={FormControlSelect}
                                            >
                                        </Field>
                                            <ErrorMessage className="alerta_error_form_label" name="cargo" component="div" />
                                    </Col>

                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Salário *',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'vr_salario',
                                                            placeholder:'0,00',
                                                            id:'vr_salario',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.vr_salario,
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
                                            <ErrorMessage className="alerta_error_form_label" name="vr_salario" component="div" />
                                    </Col>

                                        
                                </Row>
                                <Row className="mb-3">
                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Nº Agência ',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'nr_agencia_banco_salario',
                                                            placeholder:'',
                                                            id:'nr_agencia_banco_salario',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.nr_agencia_banco_salario,
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
                                            <ErrorMessage className="alerta_error_form_label" name="nr_agencia_banco_salario" component="div" />
                                    </Col>

                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Conta',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'nr_conta_banco_salario',
                                                            placeholder:'Nº conta',
                                                            id:'nr_conta_banco_salario',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.nr_conta_banco_salario,
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
                                            <ErrorMessage className="alerta_error_form_label" name="nr_conta_banco_salario" component="div" />
                                    </Col>

                                        
                                </Row>
                                <Row className="mb-3">
                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Obrigatóriedade de ponto ',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'text',
                                                            name:'ponto_obrigatorio',
                                                            placeholder:'',
                                                            id:'ponto_obrigatorio',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.ponto_obrigatorio,
                                                            className:`${estilos.input}`,
                                                            size:"sm"
                                                        },
                                                        options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'Sim',valor:'yes',props:{}},{label:'Não',valor:'no',props:{}}],
                                                        atributsContainer:{
                                                            className:''
                                                        }
                                                    }
                                                }
                                               
                                                component={FormControlSelect}
                                            >
                                        </Field>
                                            <ErrorMessage className="alerta_error_form_label" name="ponto_obrigatorio" component="div" />
                                    </Col>
                                    <Col xs="12" sm="12" md="6">
                                         <Field
                                                data={
                                                    {
                                                        hasLabel:true,
                                                        contentLabel:'Admissão ',
                                                        atributsFormLabel:{

                                                        },
                                                        atributsFormControl:{
                                                            type:'date',
                                                            name:'dt_admissao',
                                                            placeholder:'',
                                                            id:'dt_admissao',
                                                            onChange:handleChange,
                                                            onBlur:handleBlur,
                                                            value:values.dt_admissao,
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
                                            <ErrorMessage className="alerta_error_form_label" name="dt_admissao" component="div" />
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
