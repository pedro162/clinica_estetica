import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CIDADE_ONE_GET, ESTADO_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormCidadeExcluir from '../FormCidadeExcluir/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Table as TableBootstrap } from 'react-bootstrap';

const Excluir = ({idCidade, setIdCidade, callback, excluirCadastro, setExcluirCadastro})=>{

    
    const [showModalAtualizarCidade, setShowModalAtualizarCidade] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataCidade, setDataCidade] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		

		const getCidade = async ()=>{
			if(idCidade > 0){
				const {url, options} = CIDADE_ONE_GET(idCidade, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataCidade(json)
					setShowModalAtualizarCidade(true)
					 
		        }else{
		        	setDataCidade([])
		        }
			}
		}

		getCidade();
		
	}, [idCidade])

	/*
		excluirCadastro && 
                <Atualizar setCarregandoDadosCliente={null} excluirCadastro={setExcluirCadastro} idCidade={clientChoice} setDataCidade={null} setShowModalCriarCidade={setShowModalAtualizarCidade} />
	*/
	//<Pesquisar idCidade={idCidade} setDataCidade={setDataCidade} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			{! dataCidade &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Excluir Categoria de Evento'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarCidade} showHide={()=>{setShowModalAtualizarCidade();}}>
					<Load/>
				</Modal>
			}

			{dataCidade &&
				<FormCidadeExcluir setIdCidade={setIdCidade} idCidade={idCidade} carregando={false} dataCidadeChoice={dataCidade} setExcluirCadastro={setExcluirCadastro} excluirCadastro={excluirCadastro} showModalCriarCidade={showModalAtualizarCidade} setShowModalCriarCidade={setShowModalAtualizarCidade} callback={callback} />
			}
		</>
	)
}

export default Excluir;