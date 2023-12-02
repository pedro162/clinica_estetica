import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, SERVICO_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormServico from '../FormServico/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import Swal from 'sweetalert2'

const Atualizar = ({idServico, setIdServico, callback, atualizarServico, setAtualizarServico})=>{

    
    const [showModalAtualizarServico, setShowModalAtualizarServico] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataServico, setDataServico] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getServico = async ()=>{
			if(idServico > 0){
				const {url, options} = SERVICO_ONE_GET(idServico, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataServico(json)
					setShowModalAtualizarServico(true)
					 
		        }else{
		        	setDataServico([])
		        }
			}
		}

		getServico();
		
	}, [idServico])

	/*
		atualizarServico && 
                <Atualizar setCarregandoDadosServico={null} atualizarServico={setAtualizarServico} idServico={clientChoice} setDataServico={null} setShowModalCriarServico={setShowModalAtualizarServico} />
	*/
	//<Pesquisar idServico={idServico} setDataServico={setDataServico} setCarregandoDadosServico={setCarregando} />
	return(
		<>
			{! dataServico &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar Servico'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarServico} showHide={()=>{setShowModalAtualizarServico();}}>
					<Load/>
				</Modal>
			}

			{dataServico && 
				<FormServico setIdServico={setIdServico} idServico={idServico} carregando={false} dataServicoChoice={dataServico} setAtualizarServico={setAtualizarServico} atualizarServico={atualizarServico} showModalCriarServico={showModalAtualizarServico} setShowModalCriarServico={setShowModalAtualizarServico} callback={callback} />
			}
		</>
	)
}

export default Atualizar;