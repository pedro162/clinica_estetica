import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormCliente from '../FormCliente/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idCliente, setIdcliente, callback, atualizarCadastro, setAtualizarCadastro, cadastrarCliente, setCadastrarCliente})=>{

    
    const [showModalAtualizarCliente, setShowModalAtualizarCliente] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataCliente, setDataCliente] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getGrupo = async ()=>{
			const {url, options} = GRUPOS_ALL_POST({}, getToken());

	        const {response, json} = await request(url, options);
	        console.log('All grupos here')
	        console.log(json)
	        if(json){
	            setDataGrupo(json)
	            setShowModalAtualizarCliente(true)
	        }else{
	        	setDataGrupo(null)
	        }
		}
		if(cadastrarCliente == true){
			getGrupo();
		}
		
		
	}, [cadastrarCliente])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCliente={null} atualizarCadastro={setAtualizarCadastro} idCliente={clientChoice} setDataCliente={null} setShowModalCriarCliente={setShowModalAtualizarCliente} />
	*/
	//<Pesquisar idCliente={idCliente} setDataCliente={setDataCliente} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			{! dataGrupo &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar Cliente'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarCliente} showHide={()=>{setShowModalAtualizarCliente();}}>
					<Load/>
				</Modal>
			}
			{dataGrupo &&
				<FormCliente dataGrupo={dataGrupo} setIdcliente={setIdcliente} idCliente={idCliente} carregando={false} dataClienteChoice={dataCliente} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarCliente={showModalAtualizarCliente} setShowModalCriarCliente={()=>{setShowModalAtualizarCliente();setCadastrarCliente()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;