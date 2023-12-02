import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FinalizarForm from '../FormOrdemServico/FinalizarForm.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import Swal from 'sweetalert2'

const Finalizar = ({idOrdemServico, setIdOrdemServico, callback, atualizarOrdemServico, setFinalizarOrdemServico})=>{

    
    const [showModalFinalizarOrdemServico, setShowModalFinalizarOrdemServico] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataOrdemServico, setDataOrdemServico] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();

	React.useEffect(()=>{
		
		const getOrdemServico = async ()=>{
			if(idOrdemServico > 0){
				const {url, options} = ORDEM_SERVICO_ONE_GET(idOrdemServico, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataOrdemServico(json)
					setShowModalFinalizarOrdemServico(true)
					 
		        }else{
		        	setDataOrdemServico([])
		        }
			}
		}

		getOrdemServico();
		
	}, [idOrdemServico])

	/*
		atualizarOrdemServico && 
                <Finalizar setCarregandoDadosOrdemServico={null} atualizarOrdemServico={setFinalizarOrdemServico} idOrdemServico={clientChoice} setDataOrdemServico={null} setShowModalCriarOrdemServico={setShowModalFinalizarOrdemServico} />
	*/
	//<Pesquisar idOrdemServico={idOrdemServico} setDataOrdemServico={setDataOrdemServico} setCarregandoDadosOrdemServico={setCarregando} />
	return(
		<>
			{! dataOrdemServico &&
				<Modal noBtnFinalizar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Finalizar OrdemServico'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalFinalizarOrdemServico} showHide={()=>{setShowModalFinalizarOrdemServico();}}>
					<Load/>
				</Modal>
			}

			{dataOrdemServico && 
				<FinalizarForm setDataOrdemServico={setDataOrdemServico} setIdOrdemServico={setIdOrdemServico} idOrdemServico={idOrdemServico} carregando={false} dataOrdemServicoChoice={dataOrdemServico} setFinalizarOrdemServico={setFinalizarOrdemServico} atualizarOrdemServico={atualizarOrdemServico} showModalCriarOrdemServico={showModalFinalizarOrdemServico} setShowModalCriarOrdemServico={setShowModalFinalizarOrdemServico} callback={callback} />
			}
		</>
	)
}

export default Finalizar;