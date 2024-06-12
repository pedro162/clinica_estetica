import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlRadio from '../../FormControl/Radio.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row, Tabs, Tab, Button} from 'react-bootstrap';
//import Button from '../../FormControl/Button.js';
import estilos from './FormConsulta.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import { faHome, faSearch, faPlus, faTimes, faChevronCircleRight, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CalendarioSimplesConsultaExterno  from '../../Utils/Calendario/CalendarioSimplesConsultaExterno.js'
import Swal from 'sweetalert2'
import BaseFormConsultaExterno from './BaseFormConsultaExterno.js'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_SAVE_POST, CONSULTA_ALL_POST, CONSULTA_UPDATE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, ESPECIALIDADE_ALL_POST, PROFISSIONAL_HORARIOS_ALL_POST, PROFISSIONAL_DIAS_EXPEDIENTE_ALL_POST} from '../../../api/endpoints/geral.js'


const FormConsultaExterno = ({dataConsultaChoice, dataProfissionais, setIdConsulta, idConsulta, showModalCriarConsulta, setShowModalCriarConsulta, callback, atualizarConsulta, setAtualizarConsulta, carregando, noUseModal})=>{

	const {data, error, request, loading, setError} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser, isMobile} = React.useContext(UserContex);

    const {type, is_system, tenant_id} = dataUser ? dataUser : {};

    const [dataEspecializacoes, setEspecializacoes] = React.useState(null)    
    const [dataProfissionalHorarios, setDataProfissionalHorarios] = React.useState(null)
    const [dataProfissionalDiasExprediente, setDataProfissionalDiasExprediente] = React.useState(null)
	const [dataConsulta, setDataConsulta] = React.useState([])
	const [abaAtual, setAbaAtual] = React.useState('benfeficiario')
	const [abaAtualProperty, setAbaAtualProperty] = React.useState({})
	const [benfeficiario, setBeneficiario] = React.useState(null)
	const [especializacao, setEspecializacao] = React.useState(null)
	const [horario, setHorario] = React.useState(null)
    const [horarioId, setHorarioId] = React.useState(null)
    const [dateConsultaAtendimento, setDateConsultaAtendimento] = React.useState(null)
    const [dateOfWeekConsultaAtendimento, setDateOfWeekConsultaAtendimento] = React.useState(null)
    const [profissionalId, setProfissionalId] = React.useState(null)
    const [filiallId, setFilialId] = React.useState(null)
    //filial_id
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		name,
    		historico,
			pessoa_id,
			dt_inicio,
			hr_inicio,
            horario_id,
			prioridade,
			status,
			profissional_id,
			filial_id,
			dt_fim,
			hr_fim,
			name_atendido,
			tipo,
		})=>{
			

    	const data = {
    		'name':name ? name : 'proprio',
    		'historico':historico ? historico : 'consulta' ,
    		'pessoa_id':pessoa_id > 0 ? pessoa_id : benfeficiario,
    		'dt_inicio':dt_inicio ? dt_inicio : dateConsultaAtendimento,
    		'hr_inicio':hr_inicio ? hr_inicio : horario,
            'horario_id':horario_id? horario_id : horarioId,
    		'prioridade':prioridade ? prioridade : 'normal',
    		'status':status ? status : null,
    		'profissional_id':profissional_id > 0 ? profissional_id : profissionalId,
    		'filial_id':filial_id > 0 ? filial_id : filiallId,
			'dt_fim':dt_fim ? dt_fim : null,
			'hr_fim':hr_fim ? hr_fim : null,
			'name_atendido':name_atendido ? name_atendido : 'proprio',
			'tipo':tipo ? tipo : 'consulta',
    	}

        //console.table(data)
        //return false;

		if(atualizarConsulta == true){
            const {url, options} = CONSULTA_UPDATE_POST(idConsulta, data, getToken());
            const {response, json} = await request(url, options);
            if(json){

                Swal.fire({
                  icon: "success",
                  title: "",
                  text: 'Reigistrado com sucesso',
                  footer: '',//'<a href="#">Why do I have this issue?</a>'
                  confirmButtonColor: "#07B201",
                });

                callback();
                setShowModalCriarConsulta();
                setAtualizarConsulta(false);
                setIdConsulta(null);
            }

        }else{
        	const {url, options} = CONSULTA_SAVE_POST(data, getToken());
            const {response, json} = await request(url, options);
            if(json){
            	
                

                Swal.fire({
                    icon: "success",
                    title: "",
                    text: 'Reigistrado com sucesso',
                    footer: '',//'<a href="#">Why do I have this issue?</a>'
                    confirmButtonColor: "#07B201",
                  });

                if(callback){
                    callback();
                }
            	
                if(setShowModalCriarConsulta){
                    setShowModalCriarConsulta();
                }
            	if(setAtualizarConsulta){
                    setAtualizarConsulta(false);
                }
            }



        }

    }

    const requestAllConsultas = async() =>{
       
        const {url, options} = CONSULTA_ALL_POST({}, getToken());


        const {response, json} = await dataRequest.request(url, options);
        console.log('All consultas here')
        console.log(json)
        if(json){
            setDataConsulta(json)
        }else{

        	setDataConsulta([]);
        }

            
    }

    const verficaMobile = ()=>{
        return window.innderWith <= 768;
    }

	const dataToFormConsulta = ()=>{
    	let obj = {name:'', historico:'', pessoa_id:'',	dt_inicio:'', hr_inicio:'', horario_id:'', prioridade:'', status:'', profissional_id:'',
		filial_id:'', dt_fim:'', hr_fim:'', name_atendido:'', tipo:''}
    	if(dataConsultaChoice && dataConsultaChoice.hasOwnProperty('mensagem')){
    		let data = dataConsultaChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.name = data.name;
    		}

    		if(data.hasOwnProperty('historico')){
    			obj.historico = data.historico;
    		}
    		
    		if(data.hasOwnProperty('dt_inicio')){
    			obj.dt_inicio = data.dt_inicio;
    		}

			if(data.hasOwnProperty('hr_inicio')){
    			obj.hr_inicio = data.hr_inicio;
    		}

            if(data.hasOwnProperty('horario_id')){
                obj.horario_id = data.horario_id;
            }

            if(data.hasOwnProperty('prioridade')){
                obj.prioridade = data.prioridade;
            }

            if(data.hasOwnProperty('status')){
                obj.status = data.status;
            }

			if(data.hasOwnProperty('filial_id')){
                obj.filial_id = data.filial_id;
            }

			if(data.hasOwnProperty('pessoa_id')){
                obj.pessoa_id = data.pessoa_id;
            }

			if(data.hasOwnProperty('profissional_id')){
                obj.profissional_id = data.profissional_id;
            }
			
    		if(data.hasOwnProperty('pessoa')){
    			if(data.pessoa.hasOwnProperty('id')){
					obj.pessoa_id = data.pessoa.id;
				}
    			
    		}

			if(data.hasOwnProperty('profissional')){
    			if(data.profissional.hasOwnProperty('id')){
					obj.profissional_id = data.profissional.id;
				}
    			
    		}

			if(data.hasOwnProperty('dt_fim')){
    			obj.dt_fim = data.dt_fim;    			
    		}

			if(data.hasOwnProperty('hr_fim')){
    			obj.hr_fim = data.hr_fim;    			
    		}

			if(data.hasOwnProperty('name_atendido')){
    			obj.name_atendido = data.name_atendido;    			
    		}

			if(data.hasOwnProperty('tipo')){
    			obj.tipo = data.tipo;    			
    		}

    		
    	}

    	return obj;
    }



    const gerarListEspecializacao = ()=>{
       
        let data = [];
        let dataOrdemServico = dataEspecializacoes?.mensagem//[]
        /*for(let ij=0; !(ij  == 20); ij++){
        	dataOrdemServico.push({id:(ij + 1), name:'Especialização '+(ij+1)})
        }*/
        if(dataOrdemServico && Array.isArray(dataOrdemServico) && dataOrdemServico.length > 0){
            for(let i=0; !(i == dataOrdemServico.length); i++){
                let atual = dataOrdemServico[i];
                if(atual){
                    

                    let line_style = {}

                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow: atual?.name, style:{...line_style}, mainIcon:null, className: `btn btn-sm ${especializacao > 0 && especializacao == atual?.id ? 'btn-primary' : 'btn-secondary'} `, style:{borderRadius:'50px'}, onClick:()=>{setEspecializacao((especializacao)=>{if(especializacao == atual?.id){ return 0;}else{ setAbaAtual('date'); return atual?.id;} }); setDataProfissionalDiasExprediente([]);} },
                            acoes:[
                                
                            ],
                            title:<> <div style={{display:'flex', justifyContent:'space-between',fontSize:'18pt', fontWeight:'bolder'}} ><span> {atual?.name} </span> </div> </>,
                            propsContainerTitulo:{md:'11', sm:'9', xs:'9'},
                            propsContainerButtons:{md:'1', sm:'3', xs:'3'},
                            acoesBottomCard:[
                              
                            ],
                            celBodyTableArr:[
                                [
                                    

                                ],
                                
                               
                               
                            ]
                        }

                    )

                }

            }
        }

        return data;
    }

    const dividirArray = (arrayOriginal, tamanhoDoGrupo)=>{
          let novoArray = [];

          for (let i = 0; i < arrayOriginal.length; i += tamanhoDoGrupo) {
            let grupo = arrayOriginal.slice(i, i + tamanhoDoGrupo);
            novoArray.push(grupo);
          }

          return novoArray;
    }

    const gerarListHorario = ()=>{
       
        let data = [];
        let dataOrdemServico = dataProfissionalHorarios?.mensagem;//[]
        /*for(let ij=0; !(ij  == 20); ij++){
        	dataOrdemServico.push({id:(ij + 1), name: 'Profissional : '+(ij+1)})
        }*/
        //let dataHorario = {}
        let dataHorarioAtual = []
        let dataHorarioProfissional = {}
        let contador = 0;

        if(dataOrdemServico && Array.isArray(dataOrdemServico) && dataOrdemServico.length > 0){
            for(let i=0; !(i == dataOrdemServico.length); i++){
                let atual = dataOrdemServico[i];
                if(atual){

                    let regigroAtual = {
                        title:<span style={{fontWeight:'480'}}> {String(atual?.hora).substr(0,5)} </span>,
                        label:`${String(atual?.hora).substr(0,5)}`,
                        props:{className: `btn btn-sm ${horarioId > 0 && horarioId == atual?.id ? 'btn-primary' : 'btn-secondary'}  mb-2 `, style:{borderRadius:'50px'}, onClick:()=>setHorarioId((horarioId)=>{if(horarioId == atual?.id){ setProfissionalId(null); setFilialId(null); setHorario(null); return 0;}else{ setAbaAtual('confirm'); setProfissionalId(atual?.profissional_id); setFilialId(atual?.filial_id); setHorario(atual?.hora); return atual?.id;} }) },
                        toSum:1,
                        isCoin:1,
                    }

                    if( dataHorarioProfissional[atual?.profissional_id]){
                        dataHorarioProfissional[atual?.profissional_id] = {
                            hoarios:[...dataHorarioProfissional[atual?.profissional_id].hoarios, regigroAtual],
                            name:atual?.name_profissional,
                            id:atual?.profissional_id,
                            profissional_id:atual?.profissional_id
                        }
                    }else{
                        dataHorarioProfissional[atual?.profissional_id] = {
                            hoarios:[regigroAtual],
                            name:atual?.name_profissional,
                            id:atual?.profissional_id,
                            profissional_id:atual?.profissional_id
                        }
                    }

                }

            }
        }

        if(dataHorarioProfissional){
            for(let prp in dataHorarioProfissional){
                let atual = dataHorarioProfissional[prp]
                let {hoarios, name, profissional_id} = atual;

                let dataHorario = []
                let line_style = {}

                if(hoarios){

                    dataHorario = dividirArray(hoarios, 4);
                    

                    data.push(

                        {
                            propsRow:{id:(profissional_id), titleRow:name, style:{...line_style}, mainIcon:null},
                            acoes:[
                                
                            ],
                            title:<> <div style={{display:'flex', justifyContent:'space-between',fontSize:'18pt', fontWeight:'bolder'}} ><span> {name} </span> </div> </>,
                            propsContainerTitulo:{md:'11', sm:'9', xs:'9'},
                            propsContainerButtons:{md:'1', sm:'3', xs:'3'},
                            acoesBottomCard:[
                              
                            ],
                            celBodyTableArr:[
                                ...dataHorario
                               
                            ]
                        }
                    );

                }
            }
        }

        return data;
    }


    const gerarTableAgenda = ()=>{
       
        let data = [];
        let dataAgenda = dataProfissionalDiasExprediente?.mensagem; //[{id:1, data_format:'06-02-2024'}, {id:2, data_format:'23-02-2024'}];
        if(dataAgenda && Array.isArray(dataAgenda) && dataAgenda.length > 0){
            for(let i=0; !(i == dataAgenda.length); i++){
                let atual = dataAgenda[i];
                if(atual){


                    data.push(

                        {
                            id:atual?.id,
                            propsRow:{id:(atual.id), setDataEscolhida:setDateConsultaAtendimento, callback:()=>{setAbaAtual('hour'); setDateOfWeekConsultaAtendimento(atual?.nr_dia)}},
                            data_format:null,
                            dia_semana:atual?.nr_dia,
                            hora:null,
                            mainLabel:atual?.name,
                            acoes:[
                                //{acao:()=>{setDateConsultaAtendimento(atual.id);setAbaAtual('hour'); }, label:'Editar', propsOption:{}, propsLabel:{}},
                            ],
                            dados:atual,
                            celBodyTableArr:[
                                
                            ]
                        }

                    )

                }

            }
        }

        return data;
    }


    const gerarListDate = ()=>{
       
        let data = [];
        let dataOrdemServico = dataProfissionalDiasExprediente?.mensagem; //[]
        /*for(let ij=0; !(ij  == 20); ij++){
            dataOrdemServico.push({id:(ij + 1), name: 'Profissional : '+(ij+1)})
        }*/
        if(dataOrdemServico && Array.isArray(dataOrdemServico) && dataOrdemServico.length > 0){
            for(let i=0; !(i == dataOrdemServico.length); i++){
                let atual = dataOrdemServico[i];
                if(atual){
                    
                    let dataHorario = []
                    for(let ij=0; !(ij  == 4); ij++){
                        dataHorario.push(
                            [
                                {
                                    title:<span style={{fontWeight:'480'}}> 11/01/2024 </span>,
                                    label:'11/01/2024',
                                    props:{className: `btn btn-sm ${dateConsultaAtendimento > 0 && dateConsultaAtendimento == atual?.id ? 'btn-primary' : 'btn-secondary'}  mb-2 `, style:{borderRadius:'50px'}, onClick:()=>setDateConsultaAtendimento((dateConsultaAtendimento)=>{if(dateConsultaAtendimento == atual?.id){ return 0;}else{ setAbaAtual('hour'); return atual?.id;} }) },
                                    toSum:1,
                                    isCoin:1,
                                }, {
                                    title:<span style={{fontWeight:'480'}}>19/01/2024 </span>,
                                    label:'19/01/2024',
                                    props:{className: `btn btn-sm ${dateConsultaAtendimento > 0 && dateConsultaAtendimento == atual?.id ? 'btn-primary' : 'btn-secondary'} mb-2 `, style:{borderRadius:'50px'}, onClick:()=>setDateConsultaAtendimento((dateConsultaAtendimento)=>{if(dateConsultaAtendimento == atual?.id){ return 0;}else{ setAbaAtual('hour'); return atual?.id;} }) },
                                    toSum:1,
                                    isCoin:1,
                                },
                                {
                                    title:<span style={{fontWeight:'480'}}>18/03/2024</span>,
                                    label:'18/03/2024',
                                    props:{className: `btn btn-sm ${dateConsultaAtendimento > 0 && dateConsultaAtendimento == atual?.id ? 'btn-primary' : 'btn-secondary'}  mb-2 `, style:{borderRadius:'50px'}, onClick:()=>setDateConsultaAtendimento((dateConsultaAtendimento)=>{if(dateConsultaAtendimento == atual?.id){ return 0;}else{ setAbaAtual('hour'); return atual?.id;} }) },
                                    toSum:1,
                                    isCoin:1,
                                },
                                {
                                    title:<span style={{fontWeight:'480'}}>05/02/2024</span>,
                                    label:'05/02/2024',
                                    props:{className: `btn btn-sm ${dateConsultaAtendimento > 0 && dateConsultaAtendimento == atual?.id ? 'btn-primary' : 'btn-secondary'}  mb-2 `, style:{borderRadius:'50px'}, onClick:()=>setDateConsultaAtendimento((dateConsultaAtendimento)=>{if(dateConsultaAtendimento == atual?.id){ return 0;}else{ setAbaAtual('hour'); return atual?.id;} }) },
                                    toSum:0,
                                    isCoin:0,
                                },

                            ]
                        )
                    }


                    let line_style = {}

                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow: atual?.name, style:{...line_style}, mainIcon:null},
                            acoes:[
                                
                            ],
                            title:<> <div style={{display:'flex', justifyContent:'space-between',fontSize:'18pt', fontWeight:'bolder'}} ><span> {atual?.name} </span> </div> </>,
                            propsContainerTitulo:{md:'11', sm:'9', xs:'9'},
                            propsContainerButtons:{md:'1', sm:'3', xs:'3'},
                            acoesBottomCard:[
                              
                            ],
                            celBodyTableArr:[
                                ...dataHorario
                               
                            ]
                        }

                    )

                }

            }
        }

        return data;
    }



    const getProEspecializacoes = async ()=>{
        setEspecializacoes([])
        
        const {url, options} = ESPECIALIDADE_ALL_POST({}, getToken());
        const {response, json} = await request(url, options);
        if(json){
                
            setEspecializacoes(json)
            
        }else{
            setEspecializacoes([])
        }
    }

    const getProfissionalHorarios = async ()=>{
        setDataProfissionalHorarios([])

        let dataSearch = {com_agenda:1, agenda_livre:1}
        
        //dataSearch['verificar_data_agenda'] = 1;
        if(String(dateConsultaAtendimento).trim().length > 0){
            dataSearch['verificar_data_agenda'] = dateConsultaAtendimento;
        }


        const {url, options} = PROFISSIONAL_HORARIOS_ALL_POST({...dataSearch}, getToken());
        const {response, json} = await request(url, options);
        if(json){
               
            setDataProfissionalHorarios(json)
        }else{
            setDataProfissionalHorarios([])
        }
    }


    const getProfissionalDiaExpediente = async ()=>{
        setDataProfissionalDiasExprediente([])

        let dataSearch = {com_agenda:1, agenda_livre:1}
        if(dateOfWeekConsultaAtendimento >= 0){
            dataSearch['nr_dia'] = dateOfWeekConsultaAtendimento;
        }

        if(String(dateConsultaAtendimento).trim().length > 0){
            dataSearch['verificar_data_agenda'] = dateConsultaAtendimento;
        }

        const {url, options} = PROFISSIONAL_DIAS_EXPEDIENTE_ALL_POST({...dataSearch}, getToken());
        const {response, json} = await request(url, options);
        if(json){
            
            setDataProfissionalDiasExprediente(json)
        }else{
            setDataProfissionalDiasExprediente([])
        }
    }


    React.useEffect(()=>{
    	const requesPais = async ()=>{
    		await requestAllConsultas();
    	}
    	
    	requesPais();

    }, []);


    React.useEffect(()=>{

        getProEspecializacoes()
    }, [benfeficiario])

    React.useEffect(()=>{
        getProfissionalDiaExpediente()
    }, [especializacao])

    React.useEffect(()=>{
        getProfissionalHorarios()
    }, [dateConsultaAtendimento])


    if(error){
        Swal.fire({
             icon: "error",
            title: "Oops...",
            text: error,
            footer: '',//'<a href="#">Why do I have this issue?</a>'
            confirmButtonColor: "#07B201",
            //width:'20rem',
            function() {
                setError(null)
            }
        });
    }
    



    const rowsTableArr = gerarTableAgenda();    
    const titulosTableArr = null;
    
	return(

		<>
			 <Formik 
                initialValues={{...dataToFormConsulta()}}
                validate={
                    values=>{

                        const errors = {}

                        /* if(!values.name){
                            errors.name="Obrigatório"
                        } */
						if(! atualizarConsulta){
							
							if(!values.pessoa_id){
								//errors.pessoa_id="Obrigatório"
							}
			
							if(!values.name_atendido){
								//errors.name_atendido="Obrigatório"   			
							}

							if(!values.filial_id){
								//errors.filial_id="Obrigatório"
							}
						}
                        if(!values.historico){
                            //errors.historico="Obrigatório"
                        }


                        if(!values.dt_inicio){
                            //errors.dt_inicio="Obrigatório"
                        }

                        
						
						if(!values.hr_inicio){
						    //errors.hr_inicio="Obrigatório"
						}

						if(!values.prioridade){
						    //errors.prioridade="Obrigatório"
						}

			
						if(!values.tipo){
							//errors.tipo="Obrigatório"    			
						}


						if(!values.profissional_id){
						    //errors.profissional_id="Obrigatório"
						}

						

                        return errors;
                    }
                }

                onSubmit={async(values, {setSubmitting})=>{
                    /*setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);*/
                      //alert('aqui')
                      //console.table({...values})
                      //return false; 
					 
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
                           <>
                                {
                                    noUseModal 
                                    ? (
                                        <BaseFormConsultaExterno
                                 
                                            especializacao={especializacao}
                                            carregando={carregando}
                                            atualizarConsulta={atualizarConsulta}
                                            setAbaAtual={setAbaAtual}
                                            abaAtual={abaAtual}
                                            benfeficiario={benfeficiario}
                                            handleSubmit={handleSubmit}
                                            gerarListEspecializacao={ gerarListEspecializacao}
                                            dateConsultaAtendimento={ dateConsultaAtendimento}
                                            error={error}
                                            loading={loading}
                                            dataProfissionalDiasExprediente={dataProfissionalDiasExprediente}
                                            titulosTableArr={titulosTableArr}
                                            rowsTableArr={rowsTableArr}
                                            gerarListHorario={gerarListHorario}
                                            horario={horario}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            setBeneficiario={setBeneficiario}
                                            setEspecializacoes={setEspecializacoes}
                                        />	

                                    ) 
                                    : (

                                        <Modal noBtnConcluir={true} handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarConsulta == true ? 'Atualizar' : 'Cadastrar')+' Atendimento'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarConsulta} showHide={()=>{setShowModalCriarConsulta();setAtualizarConsulta(false);setIdConsulta(null);}}>
                                            <BaseFormConsultaExterno
                                                
                                                especializacao={especializacao}
                                                carregando={carregando}
                                                atualizarConsulta={atualizarConsulta}
                                                setAbaAtual={setAbaAtual}
                                                abaAtual={abaAtual}
                                                benfeficiario={benfeficiario}
                                                handleSubmit={handleSubmit}
                                                gerarListEspecializacao={ gerarListEspecializacao}
                                                dateConsultaAtendimento={ dateConsultaAtendimento}
                                                error={error}
                                                loading={loading}
                                                dataProfissionalDiasExprediente={dataProfissionalDiasExprediente}
                                                titulosTableArr={titulosTableArr}
                                                rowsTableArr={rowsTableArr}
                                                gerarListHorario={gerarListHorario}
                                                horario={horario}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                values={values}
                                                setBeneficiario={setBeneficiario}
                                                setEspecializacoes={setEspecializacoes}
                                            />			
                                            

                                        </Modal>
                                    )
                                }
                           </>     
						
                    )
                }
            </Formik>
		</>
	)
}

export default FormConsultaExterno;
