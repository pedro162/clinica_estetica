import React from 'react';
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../../FormControl/index.js'
import FormControlSelect from '../../../FormControl/Select.js'
import {Col, Row, Table} from 'react-bootstrap';
import Button from '../../../FormControl/Button.js';
import Modal from '../../../Utils/Modal/index.js'
import useFetch from '../../../../Hooks/useFetch.js';
import {UserContex} from '../../../../Context/UserContex.js'
import Load from '../../../Utils/Load/index.js'
import "./print.css";
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_SAVE_POST, CLIENTES_UPDATE_POST, CLIENTES_ONE_GET, CLIENTES_FICHA_MAIS_RECENTE_ONE_GET} from '../../../../api/endpoints/geral.js'


const FormCliente = ({dataClienteChoice, dataGrupo, setIdcliente, idCliente, showModalCriarCliente, setShowModalCriarCliente, callback, atualizarCadastro, setAtualizarCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)
	const [dataUltimaFichaCliente, setDataUltimaFichaCliente] = React.useState([])

	const {data, error, request, loading} = useFetch();
	const fetchToClient = useFetch();
	const fetchToFichaCliente = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ({
    		nome,
			sobrenome,
			documento,
			doc_complementar,
			cep,
			pais,
			uf,
			logradouro,
			complemento,
			numero,
			telefone,
			celular,
			tp_telefone,
			tp_celular,
			tp_email,
			email,
			bairro,
            groupo_id,
			nascimento_fundacao,
		})=>{

    	const data = {
    		'name':nome,
    		'name_opcional':sobrenome,
    		'documento':documento,
            'documento_complementar':doc_complementar,
            'nascimento_fundacao':nascimento_fundacao,
            'sexo':'m',
            'email':email,
            'cep':cep,
            'logradouro':logradouro,
            'numero':numero,
            'tipo':'casa',
			'complemento':complemento,
			'bairro':bairro,
            'cidade':'São luis',
            'estado':uf,
            'bloco':null,
            'celular_1':celular,
            'celular_2':celular,
            'telefone':telefone,
            'idUser':1,
            'groupo_id':groupo_id,
			'pais_id':pais,

    	}

        if(atualizarCadastro == true){
            const {url, options} = CLIENTES_UPDATE_POST(idCliente, data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
                console.log(json)
                
                callback();
                setShowModalCriarCliente();
                setAtualizarCadastro(false);
                setIdcliente(null);
            }

        }else{


        	const {url, options} = CLIENTES_SAVE_POST(data, getToken());


            const {response, json} = await request(url, options);
            console.log('Save clients here')
            console.log(json)
            if(json){
                console.log('Response Save clients here')
            	console.log(json)
            	
            	callback();
            	setShowModalCriarCliente();
                setAtualizarCadastro(false);
            }

        }
    }

	React.useEffect(()=>{
		const getLastFichaCliente = async ()=>{
			
			const {url, options} = CLIENTES_FICHA_MAIS_RECENTE_ONE_GET(idCliente, getToken());


            const {response, json} = await fetchToFichaCliente.request(url, options);

			if(json){
				let {mensagem} = json;
				if(mensagem){
					setDataUltimaFichaCliente(mensagem)
				}else{
					setDataUltimaFichaCliente([])
				}
			}else{
				setDataUltimaFichaCliente([])
			}
		}

		getLastFichaCliente()

	}, [idCliente])


    const dataToFormCliente = ()=>{
    	let obj = {nome:'', sobrenome:'', documento:'', doc_complementar:'', cep:'', pais:'', uf:'',logradouro:'',complemento:'', numero:'', telefone:'', celular:'', tp_telefone:'', tp_celular:'', tp_email:'', nascimento_fundacao:'', groupo_id:'', bairro:''}
    	if(dataClienteChoice && dataClienteChoice.hasOwnProperty('mensagem')){
    		let data = dataClienteChoice.mensagem;
           
    		if(data.hasOwnProperty('name')){
                obj.nome = data.name;
    		}

    		if(data.hasOwnProperty('name_opcional')){
    			obj.sobrenome = data.name_opcional;
    		}
    		if(data.hasOwnProperty('documento')){
    			obj.documento = data.documento;
    		}
    		if(data.hasOwnProperty('documento_complementar')){
    			obj.doc_complementar = data.documento_complementar;
    		}

			if(data.hasOwnProperty('nascimento_fundacao')){
    			obj.nascimento_fundacao = data.nascimento_fundacao;
    		}

            if(data.hasOwnProperty('email')){
                obj.email = data.email;
            }

            if(data.hasOwnProperty('tp_email')){
                obj.tp_email = data.tp_email;
            }

            if(! data.hasOwnProperty('tp_email')){
                obj.tp_email = 'principal';
            }

    		if(data.hasOwnProperty('logradouro')){
    			if(Array.isArray(data.logradouro) && data.logradouro.length > 0){
    				for(let i=0; !(i==data.logradouro.length); i++){
    					let atual = data.logradouro[i];
    					if(atual.hasOwnProperty('importancia') && atual.importancia.trim() == 'principal'){
    						obj.cep = atual.cep;
    						obj.uf = atual.estado;
    						obj.logradouro = atual.logradouro;
    						obj.complemento = atual.complemento;
    						obj.numero = atual.numero;
                            obj.bairro = atual.bairro;

							if(atual.hasOwnProperty('estado_logradouro') && atual.estado_logradouro && atual.estado_logradouro.hasOwnProperty('pais_id')){
								obj.pais = atual.estado_logradouro.pais_id;

							}

    						break;
    					}
    				}
    			}
    			
    		}

    		if(data.hasOwnProperty('grupo')){
    			if(Array.isArray(data.grupo) && data.grupo.length > 0){
    				for(let i=0; !(i==data.grupo.length); i++){
    					let atual = data.grupo[i];
    					if(atual.hasOwnProperty('id') && atual.id > 0){
    						obj.groupo_id = atual.id;
    						
    					}
    				}
    			}
    			
    		}

    		if(data.hasOwnProperty('telefone')){
    			if(Array.isArray(data.telefone) && data.telefone.length > 0){
    				for(let i=0; !(i==data.telefone.length); i++){
    					let atual = data.telefone[i];
    					if(atual.hasOwnProperty('id') && atual.id > 0){
    						
    						if(atual.hasOwnProperty('tipo') && atual.tipo == 'celular' && atual.hasOwnProperty('importancia') && atual.importancia == "principal" ){
    							obj.celular =  atual.numero;
                                obj.tp_celular =  atual.importancia;
    						}

    						if(atual.hasOwnProperty('tipo') && atual.tipo == 'fixo'){
    							obj.telefone =  atual.numero;
                                obj.tp_telefone =  atual.importancia;
    						}
    						
    					}
    				}
    			}
    			
    		}

    		
    	}
    	console.log('dados para formulario ----------')
    	//console.log(obj)
    	return obj;
    }
    
   /* if(atualizarCadastro){
        return(
            <Modal  handleConcluir={()=>null}  title={'Cadastrar Cliente ..'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarCliente} showHide={()=>{setShowModalCriarCliente();}}>
                {carregandoDadosChoice && <Load/>}
                <Atualizar
                    idCliente={idCliente} 
                    setDataCliente={setDataClienteChoice}
                    setCarregandoDadosCliente={setCarregandoDadosChoice}
                />
             </Modal>
        )
    }
   */
    const preparaGrupoToForm = ()=>{
        let grupoFormat = [{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}}]
        if(dataGrupo && dataGrupo.hasOwnProperty('registro') ){
            
            if(Array.isArray(dataGrupo.registro) && dataGrupo.registro.length > 0){


                for(let i=0; !(i==dataGrupo.registro.length); i++){
                    let atual = dataGrupo.registro[i];
                    let name    = atual.hasOwnProperty('name')      ? atual.name : '';
                    let id      = atual.hasOwnProperty('id')        ? atual.id : '';
                    grupoFormat.push(
                        {label:name,valor:id,props:{}}
                    )
                }

            }
            
        }

        console.log('-------------grupo agui----------------------')
        console.log(dataGrupo)
        console.log('-------------grupo agui----------------------')

        return grupoFormat;
    }
    const dataFormAnswerHeader = dataUltimaFichaCliente?.formulario
	const dataFormAnswerFields = dataUltimaFichaCliente?.formulario?.resposta
    const dataFicha = dataToFormCliente();

    const handlePrint = () => {
        const content = document.getElementById('content-to-print');
        const printWindow = window.open('', '_blank');
        printWindow.document.write(content.innerHTML);
        printWindow.document.title='FICHA DE ATENDIMENTO'
        printWindow.document.close();
        printWindow.print();
  };


	return(

		<>
                               
            {
                
                carregando && carregando==true
                ?
                    (<Load/>)
                :
                    (   
                        <div id="content-to-print" > 
                            <button className="btn btn-sm no-print" type='button' onClick={handlePrint} >Print</button>     
                            <Row>
								<Col xs="12" sm="12" md="12"  className="py-4" style={{fontSize:40, textAlign:'center'}}>
                                    <b >FICHA DE ATENDIMENTO</b>
                                </Col>
                            </Row> 
                            <Row>
                                <hr style={{height:20, background:'#000', color:'#000', border:'#000'}}/>
                            </Row>
                            <Row className="mb-3 ">
									<Col xs="12" sm="12" md="12">
										<Table  hover size="sm">
											<tbody>
												<tr>
													<th>Código</th>
													<td colSpan={2}>{dataFicha?.id}</td>
												</tr>
                                                <tr>
													<th>Sexo</th>
													<td>{dataFicha?.hr_inicio}</td>
													<th>DT. nascimento</th>
													<td>{dataFicha?.dt_inicio}</td>
												</tr>
												<tr>
													<th>Telefone</th>
													<td>{dataFicha?.tipo}</td>
													<th>Email</th>
													<td>{dataFicha?.name_profissional}</td>
												</tr>

                                                <tr>
                                                    <th>Endereço</th>
                                                    <td>{dataFicha?.tipo}</td>
													<th>Cep</th>
													<td>{dataFicha?.name_profissional}</td>
                                                </tr>
												
											</tbody>
										</Table>
									</Col>
								</Row>
                                <Row>
                                    <hr style={{height:20, background:'#000', color:'#000', border:'#000'}}/>
                                </Row>
                                <Row className="mb-3 ">
                                       {/* <Col xs="12" sm="12" md="12">
                                            <Table  hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Condição
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Condição</td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </Table>
                                        </Col>*/}
										{dataFormAnswerFields && Array.isArray(dataFormAnswerFields) && dataFormAnswerFields.length > 0 && dataFormAnswerFields.map((item, index, arr)=>{
											let {id, formitem, observacao, resposta } = item
											let {label, type, options} = formitem
											let optionsArr = []
											if(type == 'checkbox'){
												optionsArr = options.split(',')
												return(
													<Col className={'mb-2'}  key={id+label+dataFormAnswerFields.length} xs="12" sm="12" md="6">
														<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}} >
															<spam style={{fontWeight:'bolder'}} >{label}</spam>
															<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
																{optionsArr && Array.isArray(optionsArr) && optionsArr.length > 0 && optionsArr.map((itemOption, indexOption, arrOption)=>{
																	return(
																		<div key={id+formitem?.id+itemOption+indexOption} style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
																			<spam>{itemOption}</spam>
																			<spam style={{width:'20px', height:'20px', marginLeft:'4px', marginRight:'4px', border:'1px solid #000'}}> {resposta && itemOption[0] == 'S' && <FontAwesomeIcon icon={faCheck} />} </spam>
																		</div>
																	)
																})}
															</div>
															
														</div>
														<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'end'}} >
															<span style={{fontSize:'12px'}}>Específico</span>____________________________________
														</div>
														
													</Col>
												)
											}else{
												return(
													<Col className={'mb-2'}  key={id+label+dataFormAnswerFields.length} xs="12" sm="12" md="6">
														<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}} >
															<spam style={{fontWeight:'bolder'}} >{label}</spam>
															<spam>{resposta}</spam>
														</div>
														
													</Col>
												)
											}

											
											
										})}
										
										
                                    </Row>
                               
                            {/* Link para a folha de estilo de impressão */}
                            <link rel="stylesheet" type="text/css" href="./print.css" media="print" />
                        </div>
                                                
                    )
            }
		</>
	)
}

export default FormCliente;
