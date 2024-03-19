import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormCancelarConsulta from '../FormCancelarConsulta/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'

const Cancelar = ({idConsulta, setIdConsulta, callback, cancelarConsulta, setCancelarConsulta})=>{

    
    const [showModalCancelarConsulta, setShowModalCancelarConsulta] = React.useState(false)
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
					setShowModalCancelarConsulta(true)
					 
		        }else{
		        	setDataConsulta([])
		        }
			}
		}

		getConsulta();
		
	}, [idConsulta])

	/*
		cancelarConsulta && 
                <Cancelar setCarregandoDadosConsulta={null} cancelarConsulta={setCancelarConsulta} idConsulta={clientChoice} setDataConsulta={null} setShowModalCancelarConsulta={setShowModalCancelarConsulta} />
	*/
	//<Pesquisar idConsulta={idConsulta} setDataConsulta={setDataConsulta} setCarregandoDadosConsulta={setCarregando} />
	return(
		<>
			{! dataConsulta &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cancelar Consulta'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalCancelarConsulta} showHide={()=>{setShowModalCancelarConsulta();}}>
					<Load/>
				</Modal>
			}

			{dataConsulta && 
				<FormCancelarConsulta setIdConsulta={setIdConsulta} idConsulta={idConsulta} carregando={false} dataConsultaChoice={dataConsulta} setCancelarConsulta={setCancelarConsulta} cancelarConsulta={cancelarConsulta} showModalCancelarConsulta={showModalCancelarConsulta} setShowModalCancelarConsulta={setShowModalCancelarConsulta} callback={callback} />
			}
		</>
	)
}

export default Cancelar;