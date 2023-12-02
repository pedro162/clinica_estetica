import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import AtualizarCabecalhoForm from '../FormOrdemServico/AtualizarCabecalhoForm.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import Swal from 'sweetalert2'

const AtualizarCabecalho = ({idOrdemServico, setIdOrdemServico, callback, atualizarOrdemServico, setAtualizarCabecalhoOrdemServico})=>{

    
    const [showModalAtualizarCabecalhoOrdemServico, setShowModalAtualizarCabecalhoOrdemServico] = React.useState(false)
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
					setShowModalAtualizarCabecalhoOrdemServico(true)
					 
		        }else{
		        	setDataOrdemServico([])
		        }
			}
		}

		getOrdemServico();
		
	}, [idOrdemServico])

	/*
		atualizarOrdemServico && 
                <AtualizarCabecalho setCarregandoDadosOrdemServico={null} atualizarOrdemServico={setAtualizarCabecalhoOrdemServico} idOrdemServico={clientChoice} setDataOrdemServico={null} setShowModalCriarOrdemServico={setShowModalAtualizarCabecalhoOrdemServico} />
	*/
	//<Pesquisar idOrdemServico={idOrdemServico} setDataOrdemServico={setDataOrdemServico} setCarregandoDadosOrdemServico={setCarregando} />
	return(
		<>
			{! dataOrdemServico &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'AtualizarCabecalho OrdemServico'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarCabecalhoOrdemServico} showHide={()=>{setShowModalAtualizarCabecalhoOrdemServico();}}>
					<Load/>
				</Modal>
			}

			{dataOrdemServico && 
				<AtualizarCabecalhoForm setDataOrdemServico={setDataOrdemServico} setIdOrdemServico={setIdOrdemServico} idOrdemServico={idOrdemServico} carregando={false} dataOrdemServicoChoice={dataOrdemServico} setAtualizarCabecalhoOrdemServico={setAtualizarCabecalhoOrdemServico} atualizarOrdemServico={atualizarOrdemServico} showModalCriarOrdemServico={showModalAtualizarCabecalhoOrdemServico} setShowModalCriarOrdemServico={setShowModalAtualizarCabecalhoOrdemServico} callback={callback} />
			}
		</>
	)
}

export default AtualizarCabecalho;