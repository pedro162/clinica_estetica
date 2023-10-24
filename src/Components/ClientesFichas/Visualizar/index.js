import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ONE_GET, FORMULARIO_PESSOA_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import Ver from './Ver/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Visualizar = ({idFormClientesFicha, idClientesFichas, idClientes, setIdClientesFichas, callback, setVisualizarFicha, FichaCadastro, setFicha})=>{

    
    const [showModalFichaCliente, setShowModalFichaCliente] = React.useState(false)
	const [showModalVerFichaCliente, setShowModalVerFichaCliente] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataCliente, setDataCliente] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
    const [dataFormCliente, setDataFormCliente] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getFicha = async ()=>{
			if(idClientesFichas > 0){
				const {url, options} = FORMULARIO_PESSOA_ONE_GET(idClientesFichas, getToken());

				const {response, json} = await request(url, options);
				if(json){
					if(json && json.hasOwnProperty('mensagem')){
						let dataPessoa = json.mensagem?.pessoa
						
						console.log("pessoa =================================")
						console.log(dataPessoa)
						console.log("pessoa =================================")
						console.log(json.mensagem)
						setDataCliente(dataPessoa)
						setDataFormCliente(json.mensagem)
						setShowModalFichaCliente(true)
					}else{
						setDataFormCliente(null)
						setDataCliente(null)
					}

					
				}else{
					setDataFormCliente(null)
					setDataCliente(null)
				}
			}else{
				setDataFormCliente(null)
				setDataCliente(null)
			}
		}

		const getCliente = async ()=>{
			if(idClientes > 0){
				const {url, options} = CLIENTES_ONE_GET(idClientes, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataCliente(json)
					setShowModalFichaCliente(true)
					 
		        }else{
		        	setDataCliente([])
		        }
			}else{
				setDataCliente([])
			}
		}

		

		getFicha();
		//getCliente();
		
	}, [idFormClientesFicha, idClientesFichas, idClientes])

	/*
		FichaCadastro && 
             <Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarCadastro == true ? 'Atualizar' : 'Cadastrar')+' Cliente'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarCliente} showHide={()=>{setShowModalCriarCliente();setAtualizarCadastro(false);setIdClientesFichas(null);}}>
                                
	*/
	//<Pesquisar idFormClientesFicha={idFormClientesFicha} setDataCliente={setDataCliente} setCarregandoDadosCliente={setCarregando} />
	
	if(dataCliente && dataFormCliente){
		
	}
	return(
		<>
			{( !dataCliente ||  !dataFormCliente) &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Ficha Cliente'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalFichaCliente} showHide={()=>{setShowModalFichaCliente();}}>
					<Load/>
				</Modal>
			}
			{(dataCliente && dataFormCliente) &&
				<Modal  handleConcluir={()=>null} noBtnConcluir={true}  title={'Ficha do cliente'} size="lg" propsConcluir={null} labelConcluir={null} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalFichaCliente} showHide={()=>{setShowModalVerFichaCliente(false);setShowModalFichaCliente(false);setIdClientesFichas(null); setVisualizarFicha(false)}}>                    
					<Ver  setIdFicha={setIdClientesFichas} idFicha={idFormClientesFicha} carregando={false} dataFicha={dataFormCliente} setFicha={setDataFormCliente} dataCliente={dataCliente} setDataCliente={setDataCliente}  showModalCriarFicha={showModalFichaCliente} callback={callback} />
				</Modal>
			}
		</>
	)
}

export default Visualizar;