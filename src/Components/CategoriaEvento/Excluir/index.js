import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CATEGORIA_EVENTO_ONE_GET, ESTADO_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormCategoriaEventoExcluir from '../FormCategoriaEventoExcluir/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Table as TableBootstrap } from 'react-bootstrap';

const Excluir = ({idCategoriaEvento, setIdCategoriaEvento, callback, excluirCadastro, setExcluirCadastro})=>{

    
    const [showModalAtualizarCategoriaEvento, setShowModalAtualizarCategoriaEvento] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataCategoriaEvento, setDataCategoriaEvento] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		

		const getCategoriaEvento = async ()=>{
			if(idCategoriaEvento > 0){
				const {url, options} = CATEGORIA_EVENTO_ONE_GET(idCategoriaEvento, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataCategoriaEvento(json)
					setShowModalAtualizarCategoriaEvento(true)
					 
		        }else{
		        	setDataCategoriaEvento([])
		        }
			}
		}

		getCategoriaEvento();
		
	}, [idCategoriaEvento])

	/*
		excluirCadastro && 
                <Atualizar setCarregandoDadosCliente={null} excluirCadastro={setExcluirCadastro} idCategoriaEvento={clientChoice} setDataCategoriaEvento={null} setShowModalCriarCategoriaEvento={setShowModalAtualizarCategoriaEvento} />
	*/
	//<Pesquisar idCategoriaEvento={idCategoriaEvento} setDataCategoriaEvento={setDataCategoriaEvento} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			{! dataCategoriaEvento &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Excluir Categoria de Evento'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarCategoriaEvento} showHide={()=>{setShowModalAtualizarCategoriaEvento();}}>
					<Load/>
				</Modal>
			}

			{dataCategoriaEvento &&
				<FormCategoriaEventoExcluir setIdCategoriaEvento={setIdCategoriaEvento} idCategoriaEvento={idCategoriaEvento} carregando={false} dataCategoriaEventoChoice={dataCategoriaEvento} setExcluirCadastro={setExcluirCadastro} excluirCadastro={excluirCadastro} showModalCriarCategoriaEvento={showModalAtualizarCategoriaEvento} setShowModalCriarCategoriaEvento={setShowModalAtualizarCategoriaEvento} callback={callback} />
			}
		</>
	)
}

export default Excluir;