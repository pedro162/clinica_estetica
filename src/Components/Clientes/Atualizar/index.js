import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormCliente from '../FormCliente/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Atualizar = ({idCliente, setIdcliente, callback, atualizarCadastro, setAtualizarCadastro})=>{

    
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
	        }else{
	        	setDataGrupo(null)
	        }
		}

		const getCliente = async ()=>{
			if(idCliente > 0){
				const {url, options} = CLIENTES_ONE_GET(idCliente, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataCliente(json)
					setShowModalAtualizarCliente(true)
					 
		        }else{
		        	setDataCliente([])
		        }
			}
		}

		

		getGrupo();
		getCliente();
		
	}, [idCliente])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCliente={null} atualizarCadastro={setAtualizarCadastro} idCliente={clientChoice} setDataCliente={null} setShowModalCriarCliente={setShowModalAtualizarCliente} />
	*/
	//<Pesquisar idCliente={idCliente} setDataCliente={setDataCliente} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			{! dataCliente &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar Cliente'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarCliente} showHide={()=>{setShowModalAtualizarCliente();}}>
					<Load/>
				</Modal>
			}
			{dataCliente &&
				<FormCliente dataGrupo={dataGrupo} setIdcliente={setIdcliente} idCliente={idCliente} carregando={false} dataClienteChoice={dataCliente} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarCliente={showModalAtualizarCliente} setShowModalCriarCliente={setShowModalAtualizarCliente} callback={callback} />
			}
		</>
	)
}

export default Atualizar;