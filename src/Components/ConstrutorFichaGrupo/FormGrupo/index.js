import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row, Button} from 'react-bootstrap';
//import Button from '../../FormControl/Button.js';
import estilos from './FormGrupo.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Load from '../../Utils/Load/index.js'
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, FORMULARIO_GRUPO_SAVE_POST, FORMULARIO_GRUPO_UPDATE_POST, FORMULARIO_ONE_GET} from '../../../api/endpoints/geral.js'
import Atualizar from '../Atualizar/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import ItemFormGrupo from './ItemForm.js'
import { DragDropContext } from 'react-beautiful-dnd';
import TableForm from '../../Relatorio/TableForm/index.js';


const FormGrupo = ({dataRegistroChoice, dataGrupo, setIdRegistro, idRegistro, showModalCriarRegistro, setShowModalCriarRegistro, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)

	const {data, error, request, loading} = useFetch();
	const fetchToRegistro = useFetch();
	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataContrutorFicha, setDataContrutorFicha] = React.useState([]);
	const [item, setItem] = React.useState('')
	const [type, setType] = React.useState('')
	const [options, setOptions] = React.useState('')
	const [defaultValue, setDefaultValue] = React.useState('')
	const [label, setLabel] = React.useState('')
	const [nrLinha, setNrLinha] = React.useState('')
	const [nrColuna, setNrColuna] = React.useState('')
	const [dataItens, setDataItens] = React.useState([]);
	const [posicao, setPosicao] = React.useState(1)
	const [idItem, setIdItem] = React.useState(null)
	
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

	const handleChangeItem = ({target})=>{
		setItem(target.value)
	}
	const handleChangeType = ({target})=>{
		setType(target.value)
	}

	const handleChangeOptions = ({target})=>{
		setOptions(target.value)
	}

	const handleChangeDefaultValue = ({target})=>{
		setDefaultValue(target.value)
	}

	const handleChangeLabel = ({target})=>{
		setLabel(target.value)
	}

	const handleChangeNrLinha = ({target})=>{
		setNrLinha(target.value)
	}

	const handleChangeNrColuna = ({target})=>{
		setNrColuna(target.value)
	}

	const handleChangePosicaoItem = ({target})=>{
		setPosicao(target.value)
	}

    const sendData = async ({
			name,
            id,
		})=>{

    	const data = {
    		'name':name,
            'id':id,

    	}

		data.items = {}

		let dataRegistro = dataItens
		/* console.log('data: ====================================')
        console.log(data)
		console.log(dataRegistro) */
        if(dataRegistro && Array.isArray(dataRegistro) && dataRegistro.length > 0){
            for(let i=0; !(i == dataRegistro.length); i++){
                let atual = dataRegistro[i];
				
				console.log('atual: ====================================')
        		console.log(atual)
				data.items[i] = {
					id:				atual?.id,
					name:			atual?.item,
					type:			atual?.type,
					options:		atual?.options,
					default_value:	atual?.defaultValue,
					label:			atual?.label,
					nr_linha:		atual?.nrLinha,
					nr_coluna:		atual?.nrColuna
				}
			}
		}
		
		console.log('data: ====================================')
        console.log(data)
		const {url, options} = FORMULARIO_GRUPO_UPDATE_POST(idRegistro, data, getToken());


        const {response, json} = await request(url, options);
        console.log('Save form fields here')
        console.log(json)
        if(json){
			console.log('Response Save form fields here')
			console.log(json)
			
			callback();
			setShowModalCriarRegistro();
			setAtualizarCadastro(false);
			setIdRegistro(null);
        }

        /*if(atualizarCadastro == true){
            const {url, options} = FORMULARIO_GRUPO_UPDATE_POST(idRegistro, data, getToken());


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


        	const {url, options} = FORMULARIO_GRUPO_SAVE_POST(data, getToken());


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

        }*/
    }


    const dataToFormRegistro = ()=>{
    	let obj = {name:'', id:'', item:[]}
    	if(dataRegistroChoice && dataRegistroChoice.hasOwnProperty('mensagem')){
    		let data = dataRegistroChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.name = data.name;
    		}

			if(data.hasOwnProperty('id')){
                obj.id = data.id;
    		}
    		
    	}
    	console.log('dados para grupo ----------')
    	console.log(dataRegistroChoice)
    	return obj;
    }

	React.useEffect(()=>{
		if(dataRegistroChoice && dataRegistroChoice.hasOwnProperty('mensagem')){
			let data = dataRegistroChoice.mensagem;
			if(data.hasOwnProperty('item')){
                //let data = dataRegistroChoice.mensagem;
				//data.item;
				let itemCarregado = [];
				if(Array.isArray(data.item) && data.item.length > 0){
					for(let i = 0; !(i == data.item.length); i++){
						let atual = data.item[i];
						let {name, nr_ordem, grupo_id, props_item, id} = atual;
						
						itemCarregado.push( {item:name, posicao:nr_ordem, grupo_id, props_item, id})
						
					}

				}
				setDataItens([...itemCarregado])
				let contador = dataItens.length;
				setPosicao(contador + 1)
				//adicionarItem
				console.log("aqui oooo")
				console.log(itemCarregado)
    		}
		}
	}, [dataRegistroChoice])


	const adicionarItem = ()=>{
		let contador = dataItens.length
		if(String(item).trim().length > 0){
			
			if(atualizarCadastro == true){
				
				if(Array.isArray(dataItens) && dataItens.length > 0){
					
					let novoDtg = [] 
					let encontrou = false;
					dataItens.forEach((item, index, dadosArr)=>{
						let idIt = item?.id;
						idIt = Number(idIt)
						//let atual = item;
						if(idItem > 0 && idIt > 0 && idItem == idIt){
							item.item				= item;
							item.label				=  label;
							item.type				=  type;
							item.options			=  options;
							item.defaultValue		=  defaultValue;
							item.nrLinha			=  nrLinha;
							item.nrColuna			=  nrColuna;
							encontrou = true;
							
						}
						novoDtg.push(item)
						
					})

					if(! encontrou){
						let itemPush = {}
						itemPush.item				= item;
						itemPush.label				=  label;
						itemPush.type				=  type;
						itemPush.options			=  options;
						itemPush.defaultValue		=  defaultValue;
						itemPush.nrLinha			=  nrLinha;
						itemPush.nrColuna			=  nrColuna;
						novoDtg.push(itemPush)						
					}
					setDataItens([...novoDtg])
					contador = Number(posicao) + 1;

				}else{	

					let itemPush = {}
					itemPush.item				= item;
					itemPush.label				=  label;
					itemPush.type				=  type;
					itemPush.options			=  options;
					itemPush.defaultValue		=  defaultValue;
					itemPush.nrLinha			=  nrLinha;
					itemPush.nrColuna			=  nrColuna;
							
					setDataItens([...dataItens, itemPush])
					contador = Number(posicao) + 1;
				}
				
			}else{
				let itemPush = {}
				itemPush.item				= item;
				itemPush.label				=  label;
				itemPush.type				=  type;
				itemPush.options			=  options;
				itemPush.defaultValue		=  defaultValue;
				itemPush.nrLinha			=  nrLinha;
				itemPush.nrColuna			=  nrColuna;
				setDataItens([...dataItens, itemPush])
				contador += 1;
			}
			
			
		}
		setItem('')
		setType('')
		setOptions('')
		setDefaultValue('')
		setLabel('')
		setNrLinha('')
		setNrColuna('')
		setPosicao(contador)
		setIdItem(null)
		
				
	}

	const removeItem = (index)=>{
		console.log(index)
		if(Array.isArray(dataItens) && dataItens.length > 0){
			const newData = dataItens.filter((item, indexArr, Arr)=>{
				return indexArr != index
			})
			setDataItens(newData)
		}
	}
    
	const messag = ()=>{
		console.log('Adicionar item');
	} 

	const gerarTableRegistro = ()=>{
       
        let data = [];
        let dataRegistro = dataItens
        if(dataRegistro && Array.isArray(dataRegistro) && dataRegistro.length > 0){
            for(let i=0; !(i == dataRegistro.length); i++){
                let atual = dataRegistro[i];
				let indexAtual = (i+1);
                if(atual){
						//item, posicao
					let acoesArr = [];
					if(atualizarCadastro == true && atual?.id > 0){
						acoesArr.push({acao:()=>{
								setItem(atual?.item);
								setPosicao(atual?.posicao);
								setIdItem(atual?.id)

							}, label:'Editar', propsOption:{'className':'btn btn-sm'}, propsLabel:{}})
					}

                    data.push(

                        {
                            propsRow:{id:indexAtual},
                            acoes:acoesArr,
							acaoTrash:()=>removeItem(i),
                            celBodyTableArr:[
                                
                                {

                                    label:atual?.item,
                                    propsRow:{}
                                },
								{

                                    label:atual?.label,
                                    propsRow:{}
                                },
								{

                                    label:atual?.type,
                                    propsRow:{}
                                },
								{

                                    label:atual?.options,
                                    propsRow:{}
                                },
								{

                                    label:atual?.defaultValue,
                                    propsRow:{}
                                },
								{

                                    label:atual?.nrLinha,
                                    propsRow:{}
                                },
								{

                                    label:atual?.nrColuna,
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
                label:'Chave',
                props:{}
            },
			{
                label:'Label',
                props:{}
            },
			{
                label:'Tipo',
                props:{}
            },
			{
                label:'Options',
                props:{}
            },
			{
                label:'Vr. padrão',
                props:{}
            },
			{
                label:'Nº. linha',
                props:{}
            },
			{
                label:'Nº. coluna',
                props:{}
            }
        ]

        return tableTitle;
    }
    //------------

	console.log('Grupo', item)
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
					  //console.table({...values})
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
						
                        <Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarCadastro == true ? 'Atualizar' : 'Cadastrar')+' Grupo'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarRegistro} showHide={()=>{setShowModalCriarRegistro();setAtualizarCadastro(false);setIdRegistro(null);}}>
                                
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
				                                        contentLabel:'Grupo *',
				                                        atributsFormLabel:{

				                                        },
				                                        atributsFormControl:{
				                                            type:'text',
				                                            name:'name',
				                                            placeholder:'Grupo',
				                                            id:'name',
				                                            onChange:handleChange,
				                                            onBlur:handleBlur,
				                                            value:values.name,
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
				                            <ErrorMessage className="alerta_error_form_label" name="name" component="div" />
	                        		</Col>

	                        		
	                        	</Row>
								
								<Row className="my-3">
	                        		<Col xs="12" sm="12" md="12">
	                        			<span className="label_title_grup_forms">Campos do formulário</span>
	                        		</Col>
									<Col className="mt-3" xs="12" sm="12" md="3">
										
										<FormControlInput 
											data={
												{
													hasLabel:true,
													contentLabel:'',
													atributsFormLabel:{

													},
													atributsFormControl:{
														type:'text',
														name:'name_item',
														placeholder:'Chave',
														id:'name_item',
														onChange:handleChangeItem,
														onBlur:handleChangeItem,
														value:item,
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
									<Col className="mt-3" xs="12" sm="12" md="3">
										
										<FormControlInput 
											data={
												{
													hasLabel:true,
													contentLabel:'',
													atributsFormLabel:{

													},
													atributsFormControl:{
														type:'text',
														name:'name_item',
														placeholder:'Label',
														id:'name_item',
														onChange:handleChangeLabel,
														onBlur:handleChangeLabel,
														value:label,
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
									<Col className="mt-3" xs="12" sm="12" md="3">
										
										<FormControlInput 
											data={
												{
													hasLabel:true,
													contentLabel:'',
													atributsFormLabel:{

													},
													atributsFormControl:{
														type:'text',
														name:'type',
														placeholder:'Tipo',
														id:'type',
														onChange:handleChangeType,
														onBlur:handleChangeType,
														value:type,
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
									<Col className="mt-3" xs="12" sm="12" md="3">
										
										<FormControlInput 
											data={
												{
													hasLabel:true,
													contentLabel:'',
													atributsFormLabel:{

													},
													atributsFormControl:{
														type:'text',
														name:'name_label',
														placeholder:'Options',
														id:'name_label',
														onChange:handleChangeOptions,
														onBlur:handleChangeOptions,
														value:options,
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
									<Col className="mt-3" xs="12" sm="12" md="3">
										
										<FormControlInput 
											data={
												{
													hasLabel:true,
													contentLabel:'',
													atributsFormLabel:{

													},
													atributsFormControl:{
														type:'text',
														name:'default_value',
														placeholder:'Valor padrao',
														id:'default_value',
														onChange:handleChangeDefaultValue,
														onBlur:handleChangeDefaultValue,
														value:defaultValue,
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

									<Col className="mt-3" xs="12" sm="12" md="3">
										
										<FormControlInput 
											data={
												{
													hasLabel:true,
													contentLabel:'',
													atributsFormLabel:{

													},
													atributsFormControl:{
														type:'number',
														name:'nr_linha',
														placeholder:'Nº linha',
														id:'nr_linha',
														onChange:handleChangeNrLinha,
														onBlur:handleChangeNrLinha,
														value:nrLinha,
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
									<Col className="mt-3" xs="12" sm="12" md="3">
										
										<FormControlInput 
											data={
												{
													hasLabel:true,
													contentLabel:'',
													atributsFormLabel:{

													},
													atributsFormControl:{
														type:'number',
														name:'nr_coluna',
														placeholder:'Nº coluna',
														id:'nr_coluna',
														onChange:handleChangeNrColuna,
														onBlur:handleChangeNrColuna,
														value:nrColuna,
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
									<Col className="mt-3" xs="12" sm="12" md="3">
										<Button onClick={adicionarItem} className='btn btn-sm botao_success' >Adicionar</Button>
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

export default FormGrupo;
