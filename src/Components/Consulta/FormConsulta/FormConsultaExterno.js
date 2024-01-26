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
import Swal from 'sweetalert2'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_SAVE_POST, CONSULTA_ALL_POST, CONSULTA_UPDATE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST} from '../../../api/endpoints/geral.js'


const FormConsultaExterno = ({dataConsultaChoice, setIdConsulta, idConsulta, showModalCriarConsulta, setShowModalCriarConsulta, callback, atualizarConsulta, setAtualizarConsulta, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataConsulta, setDataConsulta] = React.useState([])
	const [abaAtual, setAbaAtual] = React.useState('benfeficiario')
	const [abaAtualProperty, setAbaAtualProperty] = React.useState({})
	const [benfeficiario, setBeneficiario] = React.useState(null)
	const [especializacao, setEspecializacao] = React.useState(null)
	const [horario, setHorario] = React.useState(null)

	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		name,
    		historico,
			pessoa_id,
			dt_inicio,
			hr_inicio,
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
    		'name':name,
    		'historico':historico,
    		'pessoa_id':pessoa_id,
    		'dt_inicio':dt_inicio,
    		'hr_inicio':hr_inicio,
    		'prioridade':prioridade,
    		'status':status,
    		'profissional_id':profissional_id,
    		'filial_id':filial_id,
			'dt_fim':dt_fim,
			'hr_fim':hr_fim,
			'name_atendido':name_atendido,
			'tipo':tipo,
    	}

		if(atualizarConsulta == true){
            const {url, options} = CONSULTA_UPDATE_POST(idConsulta, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save consulta here')
            console.log(json)
            if(json){
                console.log('Response Save consulta here')
                console.log(json)
                
                callback();
                setShowModalCriarConsulta();
                setAtualizarConsulta(false);
                setIdConsulta(null);

                Swal.fire({
                  icon: "success",
                  title: "",
                  text: 'Reigistrado com sucesso',
                  footer: '',//'<a href="#">Why do I have this issue?</a>'
                  confirmButtonColor: "#07B201",
                });
            }

        }else{


        	const {url, options} = CONSULTA_SAVE_POST(data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save consulta here')
            console.log(json)
            if(json){
                console.log('Response Save consulta here')
            	console.log(json)
            	
            	callback();
            	setShowModalCriarConsulta();
                setAtualizarConsulta(false);

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

	const dataToFormConsulta = ()=>{
    	let obj = {name:'', historico:'', pessoa_id:'',	dt_inicio:'', hr_inicio:'', prioridade:'', status:'', profissional_id:'',
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
        let dataOrdemServico = []
        for(let ij=0; !(ij  == 20); ij++){
        	dataOrdemServico.push({id:(ij + 1), name:'Especialização '+(ij+1)})
        }
        if(dataOrdemServico && Array.isArray(dataOrdemServico) && dataOrdemServico.length > 0){
            for(let i=0; !(i == dataOrdemServico.length); i++){
                let atual = dataOrdemServico[i];
                if(atual){
                    

                    let line_style = {}

                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow: atual?.name, style:{...line_style}, mainIcon:null, className: `btn btn-sm ${especializacao > 0 && especializacao == atual?.id ? 'btn-primary' : 'btn-secondary'} `, style:{borderRadius:'50px'}, onClick:()=>setEspecializacao((especializacao)=>{if(especializacao == atual?.id){ return 0;}else{ setAbaAtual('hour'); return atual?.id;} }) },
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


    const gerarListHorario = ()=>{
       
        let data = [];
        let dataOrdemServico = []
        for(let ij=0; !(ij  == 20); ij++){
        	dataOrdemServico.push({id:(ij + 1), name: 'Profissional : '+(ij+1)})
        }
        if(dataOrdemServico && Array.isArray(dataOrdemServico) && dataOrdemServico.length > 0){
            for(let i=0; !(i == dataOrdemServico.length); i++){
                let atual = dataOrdemServico[i];
                if(atual){
                    
                    let dataHorario = []
			        for(let ij=0; !(ij  == 4); ij++){
			        	dataHorario.push(
			        		[
                                {
                                    title:<span style={{fontWeight:'480'}}> 11:25 </span>,
                                    label:'11:25',
                                    props:{className: `btn btn-sm ${especializacao > 0 && especializacao == atual?.id+(ij+1) ? 'btn-primary' : 'btn-secondary'}  mb-2 `, style:{borderRadius:'50px'}, onClick:()=>setEspecializacao((especializacao)=>{if(especializacao == atual?.id+(ij+1)){ return 0;}else{ setAbaAtual('date'); return atual?.id+(ij+1);} }) },
                                    toSum:1,
                                    isCoin:1,
                                }, {
                                    title:<span style={{fontWeight:'480'}}>12:35: </span>,
                                    label:'12:35',
                                    props:{className: `btn btn-sm ${especializacao > 0 && especializacao == atual?.id+(ij+2) ? 'btn-primary' : 'btn-secondary'} mb-2 `, style:{borderRadius:'50px'}, onClick:()=>setEspecializacao((especializacao)=>{if(especializacao == atual?.id+(ij+2)){ return 0;}else{ setAbaAtual('date'); return atual?.id+(ij+2);} }) },
                                    toSum:1,
                                    isCoin:1,
                                },
                                {
                                    title:<span style={{fontWeight:'480'}}>14:31</span>,
                                    label:'14:47',
                                    props:{className: `btn btn-sm ${especializacao > 0 && especializacao == atual?.id+(ij+3) ? 'btn-primary' : 'btn-secondary'}  mb-2 `, style:{borderRadius:'50px'}, onClick:()=>setEspecializacao((especializacao)=>{if(especializacao == atual?.id+(ij+3)){ return 0;}else{ setAbaAtual('date'); return atual?.id+(ij+3);} }) },
                                    toSum:1,
                                    isCoin:1,
                                },
                                {
                                    title:<span style={{fontWeight:'480'}}>16:55</span>,
                                    label:'16:55',
                                    props:{className: `btn btn-sm ${especializacao > 0 && especializacao == atual?.id+(ij+4) ? 'btn-primary' : 'btn-secondary'}  mb-2 `, style:{borderRadius:'50px'}, onClick:()=>setEspecializacao((especializacao)=>{if(especializacao == atual?.id+(ij+4)){ return 0;}else{ setAbaAtual('date'); return atual?.id+(ij+4);} }) },
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



    React.useEffect(()=>{
    	const requesPais = async ()=>{
    		await requestAllConsultas();
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
    console.log('Disparou o evento')
    
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
								errors.pessoa_id="Obrigatório"
							}
			
							if(!values.name_atendido){
								errors.name_atendido="Obrigatório"   			
							}

							if(!values.filial_id){
								errors.filial_id="Obrigatório"
							}
						}
                        if(!values.historico){
                            errors.historico="Obrigatório"
                        }


                        if(!values.dt_inicio){
                            errors.dt_inicio="Obrigatório"
                        }

                        
						
						if(!values.hr_inicio){
						    errors.hr_inicio="Obrigatório"
						}

						if(!values.prioridade){
						    errors.prioridade="Obrigatório"
						}

			
						if(!values.tipo){
							errors.tipo="Obrigatório"    			
						}


						if(!values.profissional_id){
						    errors.profissional_id="Obrigatório"
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

						<Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarConsulta == true ? 'Atualizar' : 'Cadastrar')+' Atendimento'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarConsulta} showHide={()=>{setShowModalCriarConsulta();setAtualizarConsulta(false);setIdConsulta(null);}}>
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

											{
												!atualizarConsulta ? (
													<>
														<Row className='mb-1'>
															<Col >
																<Tabs
																      defaultActiveKey={'benfeficiario'}
																      activeKey={abaAtual}
																      onSelect={setAbaAtual}

																      id="uncontrolled-tab-example"
																      className="mb-3"
																      fill
																 >
																	<Tab eventKey="benfeficiario" title={<span style={abaAtual == 'benfeficiario' ? {color:'green', fontWeight:'bolder'} : {} } >Beneficíario</span>} { ...( abaAtual != 'benfeficiario' ? {disabled:'disabled'} : {}) }  variant="pills"   >
																    	<Row className="mb-1" >
																    		<Col className={'justify-content-md-center'} md={{ span: 6, offset: 3 }} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
																				<Button className={ `btn btn-sm ${benfeficiario > 0 ? 'btn-primary' : 'btn-secondary'} `} style={{borderRadius:'50px'}} onClick={()=>{setBeneficiario((benfeficiario)=>{ if(benfeficiario > 0){ return 0}else{setAbaAtual('especialization'); return 1;} } ); }}>
																  		           	José pedro Aguirar Ferreira
																  		        </Button>	
																			</Col>
																    	</Row>

																    	<Row>
        																	
        																	{benfeficiario > 0 ? (
        																		<>
        																			<Col md={4} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
		        																		<Button onClick={()=>{setAbaAtual('especialization') } } className={ `btn btn-sm btn-secondary`} style={{borderRadius:'50px'}} >
																						 	<FontAwesomeIcon icon={faChevronCircleRight} /> 
																						</Button>
		        																	</Col>

		        																	<Col md={{ span: 4, offset: 4 }} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
		        																		<Button onClick={()=>{setAbaAtual('especialization') } } className={ `btn btn-sm btn-secondary`} style={{borderRadius:'50px'}} >
																						 	<FontAwesomeIcon icon={faChevronCircleRight} /> 
																						</Button>
		        																	</Col>
        																		</>
        																	):(
        																		<>
        																			<Col md={{ span: 4, offset: 8 }}>
		        																		<Button onClick={()=>{setAbaAtual('especialization') } } className={ `btn btn-sm btn-secondary`} style={{borderRadius:'50px'}} >
																						 	<FontAwesomeIcon icon={faChevronCircleRight} /> 
																						</Button>
		        																	</Col>
        																		</>
        																	)}
																		</Row>

																    </Tab>
																  	<Tab eventKey="especialization" title={<span style={abaAtual == 'especialization' ? {color:'green', fontWeight:'bolder'} : {} } >Especialização</span>}   { ...(abaAtual != 'especialization' ? {disabled:'disabled'} : {}) } className={'btn-next-especialization'}   >
																    	 
																    	<Row className="mb-2" >
																    		
																    	

																	    	{Array.isArray(gerarListEspecializacao()) && gerarListEspecializacao().length > 0 ? 
																	    		 (
																	    			gerarListEspecializacao().map((item, index, arr)=>{
																	    				let celBodyTableArr 		= item.hasOwnProperty('celBodyTableArr') 		? item.celBodyTableArr : [];
																		  				let propsRowBodyTable 		= item.hasOwnProperty('propsRow') 				? item.propsRow: {};
																		  				let id 						= propsRowBodyTable.hasOwnProperty('id') 		? propsRowBodyTable.id: 0;
																		  				let propsContainerTitulo 	= item.hasOwnProperty('propsContainerTitulo') 	? item.propsContainerTitulo: {};
																		  				let propsContainerButtons 	= item.hasOwnProperty('propsContainerButtons') 	? item.propsContainerButtons: {};
																		  				let acoesBottomCard 		= item.hasOwnProperty('acoesBottomCard') 		? item.acoesBottomCard: [];


																		  				let titleRow 				= propsRowBodyTable.hasOwnProperty('titleRow') 		? propsRowBodyTable.titleRow : '';
																		  				let style 					= propsRowBodyTable.hasOwnProperty('style') 		? propsRowBodyTable.style : {};
																		  				let mainIcon 				= propsRowBodyTable.hasOwnProperty('mainIcon') 		? propsRowBodyTable.mainIcon : null;

																		  				id = Number(id);
																		  				let titleCard 			= item?.title
																		  				if(!titleCard){
																		  					titleCard = ''
																		  				}

																		  				return(
																		  					<Col md={3} sm={6} xs={6} key={id+index+arr.length} className={'justify-content-md-center mb-4'} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
																								<Button {...propsRowBodyTable} >
																				  		           	{titleRow}
																				  		        </Button>	
																							</Col>
																		  				)
																	    			})
	                               
																	    		)
																	    		:('')
																	    	 }


																    	</Row>
																    	<Row>
																			

																			{especializacao > 0 ? (
        																		<>
        																			<Col md={4} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
		        																		<Button onClick={()=>{setAbaAtual('benfeficiario') } } className={ `btn btn-sm btn-secondary`} style={{borderRadius:'50px'}} >
																						 	<FontAwesomeIcon icon={faChevronCircleLeft} /> 
																						</Button>
		        																	</Col>

		        																	<Col md={{ span: 4, offset: 4 }} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
		        																		<Button onClick={()=>{setAbaAtual('hour') } } className={ `btn btn-sm btn-secondary`} style={{borderRadius:'50px'}} >
																						 	<FontAwesomeIcon icon={faChevronCircleRight} /> 
																						</Button>
		        																	</Col>
        																		</>
        																	):(
        																		<>
        																			<Col md={4} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
		        																		<Button onClick={()=>{setAbaAtual('benfeficiario') } } className={ `btn btn-sm btn-secondary`} style={{borderRadius:'50px'}} >
																						 	<FontAwesomeIcon icon={faChevronCircleLeft} /> 
																						</Button>
		        																	</Col>
        																		</>
        																	)}

																		</Row>
																    </Tab>
																  	<Tab eventKey="hour" title={<span style={abaAtual == 'hour' ? {color:'green', fontWeight:'bolder'} : {} } >Horáro</span>} { ...(abaAtual != 'hour' ? {disabled:'disabled'} : {}) }  >
																    	<Row className="mb-2">
																    		<Col>
																    			{
																    				Array.isArray(gerarListHorario()) && gerarListHorario().length > 0 ? 
																		    		 (
																		    			gerarListHorario().map((item, index, arr)=>{
																		    				let celBodyTableArr 		= item.hasOwnProperty('celBodyTableArr') 		? item.celBodyTableArr : [];
																			  				let propsRowBodyTable 		= item.hasOwnProperty('propsRow') 				? item.propsRow: {};
																			  				let id 						= propsRowBodyTable.hasOwnProperty('id') 		? propsRowBodyTable.id: 0;
																			  				let propsContainerTitulo 	= item.hasOwnProperty('propsContainerTitulo') 	? item.propsContainerTitulo: {};
																			  				let propsContainerButtons 	= item.hasOwnProperty('propsContainerButtons') 	? item.propsContainerButtons: {};
																			  				let acoesBottomCard 		= item.hasOwnProperty('acoesBottomCard') 		? item.acoesBottomCard: [];


																			  				let titleRow 				= propsRowBodyTable.hasOwnProperty('titleRow') 		? propsRowBodyTable.titleRow : '';
																			  				let style 					= propsRowBodyTable.hasOwnProperty('style') 		? propsRowBodyTable.style : {};
																			  				let mainIcon 				= propsRowBodyTable.hasOwnProperty('mainIcon') 		? propsRowBodyTable.mainIcon : null;

																			  				id = Number(id);
																			  				let titleCard 			= item?.title
																			  				if(!titleCard){
																			  					titleCard = ''
																			  				}

																			  				return(
																			  					<Col  key={id+index+arr.length}>

														                                     		<Row className={'pb-2 px-1'}  style={{...style}} > 
																										
														                                                <Col xs={12} sm={12} md={12}  style={{textAlign:'left', fontSize:'10pt'}}>
														                                                	<Row className={'mb-1'}>
														                                                        <span style={{fontSize:'14pt', fontWeight:'bolder'}} >{titleRow}</span>
														                                                    </Row>

														                                       
														                                            	{
																					  						celBodyTableArr && Array.isArray(celBodyTableArr) && celBodyTableArr.length > 0 ? (
																												celBodyTableArr.map((itemCelArr, indexCelArr, arrCelArr)=>{

																													return(
																															<div  key={indexCelArr+arrCelArr.length+itemCelArr.length} >
																																<Row>

																																	{
																																		Array.isArray(itemCelArr) && itemCelArr.length > 0 ? 

																																		(
																																			itemCelArr.map((itemCel, indexCel, arrCel)=>{


																																				let labelCel = itemCel.hasOwnProperty('label') ? itemCel.label :'';
																																				let toSum = itemCel.hasOwnProperty('toSum') ? itemCel.toSum :0;
																																				let title = itemCel.hasOwnProperty('title') ? itemCel.title : '';
																																				let propsRow = itemCel.hasOwnProperty('propsRow') ? itemCel.propsRow : {};
																																				 
																																				let isCoin              = itemCel.hasOwnProperty('isCoin') ? itemCel.isCoin :0;
																																				
																																				

																																				let propsCelBodyTable 	= itemCel.hasOwnProperty('props') ? itemCel.props : {};
																																				return <Col key={indexCel} ><Button {...propsCelBodyTable} >{labelCel}</Button></Col>
																																			})
																																		)
																																		:

																																		('')
																																	}
																																 </Row>
																																	
																															</div>	
																													)
																												})

																											) : ('')
																					  					}
																					  					</Col>
																					  				</Row>
																					  				<hr style={{margin:'0',padding:'0'}}/>

														                                     </Col>
																			  				)
																		    			})
		                               
																		    		)
																		    		:('')
																		    	 }

																    		</Col>
																    	</Row>
																    	
																    	<Row >
																			

																			{horario > 0 ? (
        																		<>
        																			<Col md={4} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
		        																		<Button onClick={()=>{setAbaAtual('especialization') } } className={ `btn btn-sm btn-secondary`} style={{borderRadius:'50px'}} >
																						 	<FontAwesomeIcon icon={faChevronCircleLeft} /> 
																						</Button>
		        																	</Col>

		        																	<Col md={{ span: 4, offset: 4 }} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
		        																		<Button onClick={()=>{setAbaAtual('date') } } className={ `btn btn-sm btn-secondary`} style={{borderRadius:'50px'}} >
																						 	<FontAwesomeIcon icon={faChevronCircleRight} /> 
																						</Button>
		        																	</Col>
        																		</>
        																	):(
        																		<>
        																			<Col md={4} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
		        																		<Button onClick={()=>{setAbaAtual('especialization') } } className={ `btn btn-sm btn-secondary`} style={{borderRadius:'50px'}} >
																						 	<FontAwesomeIcon icon={faChevronCircleLeft} /> 
																						</Button>
		        																	</Col>
        																		</>
        																	)}

																		</Row>
																    </Tab>
																  	<Tab eventKey="date" title={<span style={abaAtual == 'date' ? {color:'green', fontWeight:'bolder'} : {} } >Data</span>} { ...(abaAtual != 'date' ? {disabled:'disabled'} : {}) }  >
																    	Tab content for Data
																    	<Row>
																			<Col >
																				<Button className={ `btn btn-sm btn-secondary`} style={{borderRadius:'50px'}} onClick={()=>setAbaAtual('hour')}>
																  		           <FontAwesomeIcon icon={faChevronCircleLeft} />
																  		        </Button>		  		    
																			</Col>
																			<Col>
																				<span
																					
																				>
																					
																				</span>
																			</Col>
																			<Col>
																				<Button onClick={()=>setAbaAtual('confirm')} className={ `btn btn-sm btn-secondary`} style={{borderRadius:'50px'}} >
																				 	<FontAwesomeIcon icon={faChevronCircleRight} /> 
																				</Button>
																			</Col>
																		</Row>
																    </Tab>

																  	<Tab eventKey="confirm" title={<span style={abaAtual == 'confirm' ? {color:'green', fontWeight:'bolder'} : {} } >Confirmar</span>}  { ...(abaAtual != 'confirm' ? {disabled:'disabled'} : {}) }  >
																    	Tab content for confirmar
																    	<Row>
																			<Col >
																				<Button className={ `btn btn-sm btn-secondary`} style={{borderRadius:'50px'}} onClick={()=>setAbaAtual('date')}>
																  		           <FontAwesomeIcon icon={faChevronCircleLeft} />
																  		        </Button>		  		    
																			</Col>
																			<Col>
																				<span
																					
																				>
																					
																				</span>
																			</Col>
																		</Row>
																    </Tab>
																    {/*<Tab eventKey="contact" title="Contact" disabled>
																    																    Tab content for Contact
																    															    </Tab>*/}
																</Tabs>
															</Col >
														</Row>

														{/*<Row className="mb-1">
														        															<Col xs="12" sm="12" md="6">
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
														        																					className:`${estilos.input}`,
														        																					size:"sm"
														        																				},
														        																				atributsContainer:{
														        																					className:''
														        																				},
														        																				hookToLoadFromDescription:CLIENTES_ALL_POST,
														        																			}
														        																		}
														        																		component={FormControlRadio}
														        																		
														        																>   </Field>    
														        																<ErrorMessage className="alerta_error_form_label" name="pessoa_id" component="div" />
														        															</Col>
														        
														        															<Col xs="12" sm="12" md="6">
														        																<Field
														        																		data={
														        																			{
														        																				hasLabel:true,
														        																				contentLabel:'Pessoa do contato *',
														        																				atributsFormLabel:{
														        
														        																				},
														        																				atributsFormControl:{
														        																					type:'text',
														        																					name:'name_atendido',
														        																					placeholder:'Ex: fulano de tal',
														        																					id:'name_atendido',
														        																					name_cod:'name_atendido',
														        																					name_desacription:'pessoa_name',
														        																					onChange:handleChange,
														        																					onBlur:handleBlur,
														        																					value:values.name_atendido,
														        																					className:`${estilos.input}`,
														        																					size:"sm"
														        																				},
														        																				atributsContainer:{
														        																					className:''
														        																				},
														        																				hookToLoadFromDescription:CLIENTES_ALL_POST,
														        																			}
														        																		}
														        																		component={FormControlInput}
														        																>   </Field>    
														        																<ErrorMessage className="alerta_error_form_label" name="name_atendido" component="div" />
														        															</Col>
														        														</Row>
														        
														        														<Row className="mb-1">
														        																										
														        															<Col xs="12" sm="12" md="6">
														        																<Field
														        																		data={
														        																			{
														        																				hasLabel:true,
														        																				contentLabel:'Filial *',
														        																				atributsFormLabel:{
														        
														        																				},
														        																				atributsFormControl:{
														        																					type:'text',
														        																					name:'filial_id',
														        																					placeholder:'Ex: fulano de tal',
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
														        																		component={Required}
														        																>   </Field>    
														        																<ErrorMessage className="alerta_error_form_label" name="filial_id" component="div" />
														        															</Col>
														        															<Col>
														        																<Field
														        																		data={
														        																			{
														        																				hasLabel:true,
														        																				contentLabel:'Tipo',
														        																				atributsFormLabel:{
														        
														        																				},
														        																				atributsFormControl:{
														        																					type:'text',
														        																					name:'tipo',
														        																					placeholder:'Informe a tipo',
														        																					id:'tipo',
														        																					onChange:handleChange,
														        																					onBlur:handleBlur,
														        																					value:values.tipo,
														        																					className:estilos.input,
														        																					size:"sm"
														        																				},
														        																				options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'Procedimento',valor:'procedimento',props:{}},{label:'Avaliacao',valor:'avaliacao',props:{}},{label:'Consulta',valor:'consulta',props:{}},{label:'Retorno',valor:'retorno',props:{}}],
														        																				atributsContainer:{
														        																					className:''
														        																				}
														        																			}
														        																		}
														        																	
														        																		component={FormControlSelect}
														        																	></Field>
														        																	<ErrorMessage className="alerta_error_form_label" name="tipo" component="div" />
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
														        																					placeholder:'Ex: fulano de tal',
														        																					id:'profissional_id',
														        																					name_cod:'profissional_id',
														        																					name_desacription:'profissional_name',
														        																					onChange:handleChange,
														        																					onBlur:handleBlur,
														        																					value:values.profissional_id,
														        																					className:`${estilos.input}`,
														        																					size:"sm"
														        																				},
														        																				atributsContainer:{
														        																					className:''
														        																				},
														        																				hookToLoadFromDescription:PROFISSIONAIS_ALL_POST,
														        																			}
														        																		}
														        																		component={Required}
														        																>   </Field>    
														        																<ErrorMessage className="alerta_error_form_label" name="profissional_id" component="div" />
														        															</Col>
														        
														        															<Col xs="12" sm="12" md="6">
														        																<Field
														        																		data={
														        																			{
														        																				hasLabel:true,
														        																				contentLabel:'Prioridade',
														        																				atributsFormLabel:{
														        
														        																				},
														        																				atributsFormControl:{
														        																					type:'text',
														        																					name:'prioridade',
														        																					placeholder:'Informe a prioridade',
														        																					id:'prioridade',
														        																					onChange:handleChange,
														        																					onBlur:handleBlur,
														        																					value:values.prioridade,
														        																					className:estilos.input,
														        																					size:"sm"
														        																				},
														        																				options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'Baixa',valor:'baixa',props:{}},{label:'Normal',valor:'normal',props:{}},{label:'Média',valor:'media',props:{}},{label:'Alta',valor:'alta',props:{}},{label:'Urgente',valor:'urgente',props:{}}],
														        																				atributsContainer:{
														        																					className:''
														        																				}
														        																			}
														        																		}
														        																	
														        																		component={FormControlSelect}
														        																	></Field>
														        																	<ErrorMessage className="alerta_error_form_label" name="prioridade" component="div" />
														        															</Col>
														        														</Row>
														        														<Row>
														        															
														        															<Col xs="12" sm="12" md="6">
														        																<Field
														        																		data={
														        																			{
														        																				hasLabel:true,
														        																				contentLabel:'Data iníco',
														        																				atributsFormLabel:{
														        
														        																				},
														        																				atributsFormControl:{
														        																					type:'date',
														        																					name:'dt_inicio',
														        																					placeholder:'DD/MM/AAAA',
														        																					id:'dt_inicio',
														        																					onChange:handleChange,
														        																					onBlur:handleBlur,
														        																					value:values.dt_inicio,
														        																					className:estilos.input,
														        																					size:"sm"
														        																				},
														        																				options:[],
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
														        																				contentLabel:'Horário início',
														        																				atributsFormLabel:{
														        
														        																				},
														        																				atributsFormControl:{
														        																					type:'time',
														        																					name:'hr_inicio',
														        																					placeholder:'HH:ii',
														        																					id:'hr_inicio',
														        																					onChange:handleChange,
														        																					onBlur:handleBlur,
														        																					value:values.hr_inicio,
														        																					className:estilos.input,
														        																					size:"sm"
														        																				},
														        																				options:[],
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
														        
														        														<Row>
														        															
														        															<Col xs="12" sm="12" md="12">
														        																<Field
														        																		data={
														        																			{
														        																				hasLabel:true,
														        																				contentLabel:'Observação',
														        																				atributsFormLabel:{
														        
														        																				},
														        																				atributsFormControl:{
														        																					type:'text',
														        																					name:'historico',
														        																					placeholder:'Observação',
														        																					id:'historico',
														        																					onChange:handleChange,
														        																					onBlur:handleBlur,
														        																					value:values.historico,
														        																					className:estilos.input,
														        																					size:"sm"
														        																				},
														        																				options:[],
														        																				atributsContainer:{
														        																					className:''
														        																				}
														        																			}
														        																		}
														        																	
														        																		component={FormControlInput}
														        																	></Field>
														        																	<ErrorMessage className="alerta_error_form_label" name="historico" component="div" />
														        															</Col>
														        														</Row>   */}        
													</>
												)

												:
												(
													<>
														
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
																					placeholder:'Ex: fulano de tal',
																					id:'profissional_id',
																					name_cod:'profissional_id',
																					name_desacription:'profissional_name',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.profissional_id,
																					className:`${estilos.input}`,
																					size:"sm"
																				},
																				atributsContainer:{
																					className:''
																				},
																				hookToLoadFromDescription:PROFISSIONAIS_ALL_POST,
																			}
																		}
																		component={Required}
																>   </Field>    
																<ErrorMessage className="alerta_error_form_label" name="profissional_id" component="div" />
															</Col>

															<Col xs="12" sm="12" md="6">
																<Field
																		data={
																			{
																				hasLabel:true,
																				contentLabel:'Prioridade',
																				atributsFormLabel:{

																				},
																				atributsFormControl:{
																					type:'text',
																					name:'prioridade',
																					placeholder:'Informe a prioridade',
																					id:'prioridade',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.prioridade,
																					className:estilos.input,
																					size:"sm"
																				},
																				options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'Baixa',valor:'baixa',props:{}},{label:'Normal',valor:'normal',props:{}},{label:'Média',valor:'media',props:{}},{label:'Alta',valor:'alta',props:{}},{label:'Urgente',valor:'urgente',props:{}}],
																				atributsContainer:{
																					className:''
																				}
																			}
																		}
																	
																		component={FormControlSelect}
																	></Field>
																	<ErrorMessage className="alerta_error_form_label" name="prioridade" component="div" />
															</Col>
														</Row>
														<Row>
															
															<Col xs="12" sm="12" md="6">
																<Field
																		data={
																			{
																				hasLabel:true,
																				contentLabel:'Data iníco',
																				atributsFormLabel:{

																				},
																				atributsFormControl:{
																					type:'date',
																					name:'dt_inicio',
																					placeholder:'DD/MM/AAAA',
																					id:'dt_inicio',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.dt_inicio,
																					className:estilos.input,
																					size:"sm"
																				},
																				options:[],
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
																				contentLabel:'Horário início',
																				atributsFormLabel:{

																				},
																				atributsFormControl:{
																					type:'time',
																					name:'hr_inicio',
																					placeholder:'HH:ii',
																					id:'hr_inicio',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.hr_inicio,
																					className:estilos.input,
																					size:"sm"
																				},
																				options:[],
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

														<Row>
															<Col xs="12" sm="12" md="6">
																<Field
																		data={
																			{
																				hasLabel:true,
																				contentLabel:'Tipo',
																				atributsFormLabel:{

																				},
																				atributsFormControl:{
																					type:'text',
																					name:'tipo',
																					placeholder:'Informe a tipo',
																					id:'tipo',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.tipo,
																					className:estilos.input,
																					size:"sm"
																				},
																				options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'Serviço',valor:'servico',props:{}},{label:'Avaliacao',valor:'avaliacao',props:{}},{label:'Consulta',valor:'consulta',props:{}},{label:'Retorno',valor:'retorno',props:{}}],
																				atributsContainer:{
																					className:''
																				}
																			}
																		}
																	
																		component={FormControlSelect}
																	></Field>
																	<ErrorMessage className="alerta_error_form_label" name="tipo" component="div" />
															</Col>
															<Col xs="12" sm="12" md="6">
																<Field
																		data={
																			{
																				hasLabel:true,
																				contentLabel:'Observação',
																				atributsFormLabel:{

																				},
																				atributsFormControl:{
																					type:'text',
																					name:'historico',
																					placeholder:'Observação',
																					id:'historico',
																					onChange:handleChange,
																					onBlur:handleBlur,
																					value:values.historico,
																					className:estilos.input,
																					size:"sm"
																				},
																				options:[],
																				atributsContainer:{
																					className:''
																				}
																			}
																		}
																	
																		component={FormControlInput}
																	></Field>
																	<ErrorMessage className="alerta_error_form_label" name="historico" component="div" />
															</Col>
														</Row>     
													</>
												)
											
											}
											
											

											             

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

export default FormConsultaExterno;
