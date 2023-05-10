import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormOrdemServico from '../FormOrdemServico/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'

const Atualizar = ({idOrdemServico, setIdOrdemServico, callback, atualizarOrdemServico, setAtualizarOrdemServico})=>{

    
    const [showModalAtualizarOrdemServico, setShowModalAtualizarOrdemServico] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataOrdemServico, setDataOrdemServico] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getOrdemServico = async ()=>{
			if(idOrdemServico > 0){
				const {url, options} = SERVICO_ONE_GET(idOrdemServico, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataOrdemServico(json)
					setShowModalAtualizarOrdemServico(true)
					 
		        }else{
		        	setDataOrdemServico([])
		        }
			}
		}

		getOrdemServico();
		
	}, [idOrdemServico])

	/*
		atualizarOrdemServico && 
                <Atualizar setCarregandoDadosOrdemServico={null} atualizarOrdemServico={setAtualizarOrdemServico} idOrdemServico={clientChoice} setDataOrdemServico={null} setShowModalCriarOrdemServico={setShowModalAtualizarOrdemServico} />
	*/
	//<Pesquisar idOrdemServico={idOrdemServico} setDataOrdemServico={setDataOrdemServico} setCarregandoDadosOrdemServico={setCarregando} />
	return(
		<>
			{! dataOrdemServico &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar OrdemServico'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarOrdemServico} showHide={()=>{setShowModalAtualizarOrdemServico();}}>
					<Load/>
				</Modal>
			}

			{dataOrdemServico && 
				<FormOrdemServico setIdOrdemServico={setIdOrdemServico} idOrdemServico={idOrdemServico} carregando={false} dataOrdemServicoChoice={dataOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico} atualizarOrdemServico={atualizarOrdemServico} showModalCriarOrdemServico={showModalAtualizarOrdemServico} setShowModalCriarOrdemServico={setShowModalAtualizarOrdemServico} callback={callback} />
			}
		</>
	)
}

export default Atualizar;