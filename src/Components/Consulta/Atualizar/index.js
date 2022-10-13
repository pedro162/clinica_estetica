import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormConsulta from '../FormConsulta/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'

const Atualizar = ({idConsulta, setIdConsulta, callback, atualizarConsulta, setAtualizarConsulta})=>{

    
    const [showModalAtualizarConsulta, setShowModalAtualizarConsulta] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataConsulta, setDataConsulta] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getConsulta = async ()=>{
			if(idConsulta > 0){
				const {url, options} = CONSULTA_ONE_GET(idConsulta, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataConsulta(json)
					setShowModalAtualizarConsulta(true)
					 
		        }else{
		        	setDataConsulta([])
		        }
			}
		}

		getConsulta();
		
	}, [idConsulta])

	/*
		atualizarConsulta && 
                <Atualizar setCarregandoDadosConsulta={null} atualizarConsulta={setAtualizarConsulta} idConsulta={clientChoice} setDataConsulta={null} setShowModalCriarConsulta={setShowModalAtualizarConsulta} />
	*/
	//<Pesquisar idConsulta={idConsulta} setDataConsulta={setDataConsulta} setCarregandoDadosConsulta={setCarregando} />
	return(
		<>
			{! dataConsulta &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar Consulta'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarConsulta} showHide={()=>{setShowModalAtualizarConsulta();}}>
					<Load/>
				</Modal>
			}

			{dataConsulta && 
				<FormConsulta setIdConsulta={setIdConsulta} idConsulta={idConsulta} carregando={false} dataConsultaChoice={dataConsulta} setAtualizarConsulta={setAtualizarConsulta} atualizarConsulta={atualizarConsulta} showModalCriarConsulta={showModalAtualizarConsulta} setShowModalCriarConsulta={setShowModalAtualizarConsulta} callback={callback} />
			}
		</>
	)
}

export default Atualizar;