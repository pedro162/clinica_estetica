import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ONE_GET, ESTADO_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormCategoriaEvento from '../FormCategoriaEvento/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idCategoriaEvento, setIdCategoriaEvento, callback, atualizarCadastro, setAtualizarCadastro, cadastrarCategoriaEvento, setCadastrarCategoriaEvento})=>{

    
    const [showModalAtualizarCategoriaEvento, setShowModalAtualizarCategoriaEvento] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataCategoriaEvento, setDataCategoriaEvento] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	
	React.useEffect(()=>{
		
		setShowModalAtualizarCategoriaEvento(true)
		
		
	}, [cadastrarCategoriaEvento])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCliente={null} atualizarCadastro={setAtualizarCadastro} idCategoriaEvento={clientChoice} setDataCategoriaEvento={null} setShowModalCriarCategoriaEvento={setShowModalAtualizarCategoriaEvento} />
	*/
	//<Pesquisar idCategoriaEvento={idCategoriaEvento} setDataCategoriaEvento={setDataCategoriaEvento} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			<FormCategoriaEvento setIdCategoriaEvento={setIdCategoriaEvento} idCategoriaEvento={idCategoriaEvento} carregando={false} dataCategoriaEventoChoice={dataCategoriaEvento} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarCategoriaEvento={showModalAtualizarCategoriaEvento} setShowModalCriarCategoriaEvento={()=>{setShowModalAtualizarCategoriaEvento();setCadastrarCategoriaEvento()}} callback={callback} />
		</>
	)
}

export default Cadastrar;