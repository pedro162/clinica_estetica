import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormOrdemServicoItens from '../FormOrdemServicoItens/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'

const Atualizar = ({idOrdemServicoItens, setIdOrdemServicoItens, callback, atualizarOrdemServicoItens, setAtualizarOrdemServicoItens})=>{

    
    const [showModalAtualizarOrdemServicoItens, setShowModalAtualizarOrdemServicoItens] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataOrdemServicoItens, setDataOrdemServicoItens] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getOrdemServicoItens = async ()=>{
			if(idOrdemServicoItens > 0){
				const {url, options} = SERVICO_ONE_GET(idOrdemServicoItens, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataOrdemServicoItens(json)
					setShowModalAtualizarOrdemServicoItens(true)
					 
		        }else{
		        	setDataOrdemServicoItens([])
		        }
			}
		}

		getOrdemServicoItens();
		
	}, [idOrdemServicoItens])

	/*
		atualizarOrdemServicoItens && 
                <Atualizar setCarregandoDadosOrdemServicoItens={null} atualizarOrdemServicoItens={setAtualizarOrdemServicoItens} idOrdemServicoItens={clientChoice} setDataOrdemServicoItens={null} setShowModalCriarOrdemServicoItens={setShowModalAtualizarOrdemServicoItens} />
	*/
	//<Pesquisar idOrdemServicoItens={idOrdemServicoItens} setDataOrdemServicoItens={setDataOrdemServicoItens} setCarregandoDadosOrdemServicoItens={setCarregando} />
	return(
		<>
			{! dataOrdemServicoItens &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar OrdemServicoItens'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarOrdemServicoItens} showHide={()=>{setShowModalAtualizarOrdemServicoItens();}}>
					<Load/>
				</Modal>
			}

			{dataOrdemServicoItens && 
				<FormOrdemServicoItens setIdOrdemServicoItens={setIdOrdemServicoItens} idOrdemServicoItens={idOrdemServicoItens} carregando={false} dataOrdemServicoItensChoice={dataOrdemServicoItens} setAtualizarOrdemServicoItens={setAtualizarOrdemServicoItens} atualizarOrdemServicoItens={atualizarOrdemServicoItens} showModalCriarOrdemServicoItens={showModalAtualizarOrdemServicoItens} setShowModalCriarOrdemServicoItens={setShowModalAtualizarOrdemServicoItens} callback={callback} />
			}
		</>
	)
}

export default Atualizar;