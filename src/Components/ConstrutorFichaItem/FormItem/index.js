import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row, Button} from 'react-bootstrap';
//import Button from '../../FormControl/Button.js';
import estilos from './FormItem.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Load from '../../Utils/Load/index.js'
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, FORMULARIO_SAVE_POST, FORMULARIO_UPDATE_POST, FORMULARIO_ONE_GET} from '../../../api/endpoints/geral.js'
import Atualizar from '../Atualizar/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import { DragDropContext } from 'react-beautiful-dnd';
import TableForm from '../../Relatorio/TableForm/index.js';


const FormItem = ({dataRegistroChoice, dataGrupo, setIdRegistro, idRegistro, showModalCriarRegistro, setShowModalCriarRegistro, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)

	const {data, error, request, loading} = useFetch();
	const fetchToRegistro = useFetch();
	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataContrutorFicha, setDataContrutorFicha] = React.useState([]);
	const [grupo, setGrupo] = React.useState('')
	const [dataGrupos, setDataGrupos] = React.useState([]);
	const [posicao, setPosicao] = React.useState(1)
	const [idGrupo, setIdGrupo] = React.useState(null)
	
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

	const handleChangeGroup = ({target})=>{
		setGrupo(target.value)
	}

	const handleChangePosicaoGroup = ({target})=>{
		setPosicao(target.value)
	}

    const sendData = async ({
			formulario,
            formulario_id,
		})=>{

    	const data = {
    		'name':formulario,
            'id':formulario_id,

    	}

		data.grupos = {}

		let dataRegistro = dataGrupos
        if(dataRegistro && Array.isArray(dataRegistro) && dataRegistro.length > 0){
            for(let i=0; !(i == dataRegistro.length); i++){
                let atual = dataRegistro[i];
				data.grupos[i] = {name:atual?.grupo, nr_ordem:atual?.posicao, id:atual?.id}
			}
		}

        if(atualizarCadastro == true){
            const {url, options} = FORMULARIO_UPDATE_POST(idRegistro, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
                console.log(json)
                
                callback();
                setShowModalCriarRegistro();
                setAtualizarCadastro(false);
                setIdRegistro(null);
            }

        }else{


        	const {url, options} = FORMULARIO_SAVE_POST(data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
            	console.log(json)
            	
            	callback();
            	setShowModalCriarRegistro();
                setAtualizarCadastro(false);
            }

        }
    }


    const dataToFormRegistro = ()=>{
    	let obj = {name:'', id:'', grupo:[]}
    	if(dataRegistroChoice && dataRegistroChoice.hasOwnProperty('mensagem')){
    		let data = dataRegistroChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.formulario = data.name;
    		}

			if(data.hasOwnProperty('id')){
                obj.id = data.id;
    		}

			
    		
    		

    		
    	}
    	console.log('dados para formulario ----------')
    	//console.log(obj)
    	return obj;
    }

	React.useEffect(()=>{
		if(dataRegistroChoice && dataRegistroChoice.hasOwnProperty('mensagem')){
			let data = dataRegistroChoice.mensagem;
			if(data.hasOwnProperty('grupo')){
                //let data = dataRegistroChoice.mensagem;
				//data.grupo;
				let grupoCarregado = [];
				if(Array.isArray(data.grupo) && data.grupo.length > 0){
					for(let i = 0; !(i == data.grupo.length); i++){
						let atual = data.grupo[i];
						let {name, nr_ordem, formulario_id, props_grupo, id} = atual;
						
						grupoCarregado.push( {grupo:name, posicao:nr_ordem, formulario_id, props_grupo, id})
						
					}

				}
				setDataGrupos([...grupoCarregado])
				let contador = dataGrupos.length;
				setPosicao(contador + 1)
				//adicionarGrupo
				console.log("aqui oooo")
				console.log(grupoCarregado)
    		}
		}
	}, [dataRegistroChoice])


	const adicionarGrupo = ()=>{
		let contador = dataGrupos.length
		if(String(grupo).trim().length > 0){
			
			if(atualizarCadastro == true){
				if(Array.isArray(dataGrupos) && dataGrupos.length > 0){
					let novoDtg = [] 
					let encontrou = false;
					dataGrupos.forEach((item, index, dadosArr)=>{
						let idGr = item?.id;
						idGr = Number(idGr)
						//let atual = item;
						if(idGrupo > 0 && idGr > 0 && idGrupo == idGr){
							item.grupo		= grupo;
							item.posicao 	= posicao;
							encontrou = true;
							
						}
						novoDtg.push(item)
					})
					if(! encontrou){
						novoDtg.push({grupo, posicao})						
					}
					setDataGrupos([...novoDtg])
					contador = Number(posicao) + 1;
				}
			}else{
				setDataGrupos([...dataGrupos, {grupo, posicao}])
				contador += 1;
			}
			
			
		}
		setGrupo('')
		setPosicao(contador)
		setIdGrupo(null)
				
	}

	const removeGroup = (index)=>{
		console.log(index)
		if(Array.isArray(dataGrupos) && dataGrupos.length > 0){
			const newData = dataGrupos.filter((item, indexArr, Arr)=>{
				return indexArr != index
			})
			setDataGrupos(newData)
		}
	}
    
	const messag = ()=>{
		console.log('Adicionar grupo');
	} 

	const gerarTableRegistro = ()=>{
       
        let data = [];
        let dataRegistro = dataGrupos
        if(dataRegistro && Array.isArray(dataRegistro) && dataRegistro.length > 0){
            for(let i=0; !(i == dataRegistro.length); i++){
                let atual = dataRegistro[i];
				let indexAtual = (i+1);
                if(atual){
						//grupo, posicao
					let acoesArr = [];
					if(atualizarCadastro == true && atual?.id > 0){
						acoesArr.push({acao:()=>{
								setGrupo(atual?.grupo);
								setPosicao(atual?.posicao);
								setIdGrupo(atual?.id)

							}, label:'Editar', propsOption:{'className':'btn btn-sm'}, propsLabel:{}})
					}

                    data.push(

                        {
                            propsRow:{id:indexAtual},
                            acoes:acoesArr,
							acaoTrash:()=>removeGroup(i),
                            celBodyTableArr:[
                                
                                {

                                    label:atual?.grupo,
                                    propsRow:{}
                                },
								{

                                    label:atual?.posicao,
                                    propsRow:{}
                                },

                            ]
                        }

                    )

                }

            }
        }

        return data;
    }

	const gerarTitleTable = ()=>{
        let tableTitle = [
            {
                label:'Nome',
                props:{}
            },
			{
                label:'Posição',
                props:{}
            }
        ]

        return tableTitle;
    }
    //------------

	console.log('Grupo', grupo)
    const rowsTableArr = gerarTableRegistro();    
    const titulosTableArr = gerarTitleTable();
	return(

		<>
			 <Formik 

                initialValues={{... dataToFormRegistro()}}
                validate={
                    values=>{

                        const errors = {}



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
						
                        <Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarCadastro == true ? 'Atualizar' : 'Cadastrar')+' Formulário'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarRegistro} showHide={()=>{setShowModalCriarRegistro();setAtualizarCadastro(false);setIdRegistro(null);}}>
                                
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
	                        		<Col xs="12" sm="12" md="12">
	                        			 <Field
				                                data={
				                                    {
				                                        hasLabel:true,
				                                        contentLabel:'Formulário *',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'formulario',
				                                            placeholder:'Formulário',
				                                            id:'formulario',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.formulario,
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
				                            <ErrorMessage className="alerta_error_form_label" name="formulario" component="div" />
	                        		</Col>

	                        		
	                        	</Row>
								
								<Row className="my-3">
	                        		<Col xs="12" sm="12" md="12">
	                        			<span className="label_title_grup_forms">Grupos do formulario</span>
	                        		</Col>
									<Col className="mt-3" xs="12" sm="12" md="8">
										
										<FormControlInput 
											data={
												{
													hasLabel:true,
													contentLabel:'',
													atributsFormLabel:{

													},
													atributsFormControl:{
														type:'text',
														name:'name_group',
														placeholder:'Nome do grupo',
														id:'name_group',
														onChange:handleChangeGroup,
														onBlur:handleChangeGroup,
														value:grupo,
														className:`${estilos.input}`,
														size:"sm"
													},
													atributsContainer:{
														className:''
													}
												}
											}
										/>
									</Col>
									<Col className="mt-3" xs="12" sm="12" md="2">
										
										<FormControlInput 
											data={
												{
													hasLabel:true,
													contentLabel:'',
													atributsFormLabel:{

													},
													atributsFormControl:{
														type:'number',
														name:'posicao_group',
														placeholder:'Posição',
														id:'posicao_group',
														onChange:handleChangePosicaoGroup,
														onBlur:handleChangePosicaoGroup,
														value:posicao,
														className:`${estilos.input}`,
														size:"sm"
													},
													atributsContainer:{
														className:''
													}
												}
											}
										/>
									</Col>
									<Col className="mt-3" xs="12" sm="12" md="2">
										<Button onClick={adicionarGrupo} className='btn btn-sm botao_success' >Adicionar</Button>
									</Col>
	                        	</Row>

								<Row>
									<Col  xs="12" sm="12" md="12">
										<TableForm
											titulosTableArr={titulosTableArr}
											rowsTableArr={rowsTableArr}
											loading={loading}
											hasActionsCol={true}
											hasTrashAction={true}
											propsTrash={{className:'btn btn-sm btn-danger'}}

										/>
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

export default FormItem;
