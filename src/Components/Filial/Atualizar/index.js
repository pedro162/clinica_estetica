import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormFilial from '../FormFilial/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'

const Atualizar = ({idFilial, setIdFilial, callback, atualizarFilial, setAtualizarFilial})=>{

    
    const [showModalAtualizarFilial, setShowModalAtualizarFilial] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataFilial, setDataFilial] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getFilial = async ()=>{
			if(idFilial > 0){
				const {url, options} = CONSULTA_ONE_GET(idFilial, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataFilial(json)
					setShowModalAtualizarFilial(true)
					 
		        }else{
		        	setDataFilial([])
		        }
			}
		}

		getFilial();
		
	}, [idFilial])

	/*
		atualizarFilial && 
                <Atualizar setCarregandoDadosFilial={null} atualizarFilial={setAtualizarFilial} idFilial={clientChoice} setDataFilial={null} setShowModalCriarFilial={setShowModalAtualizarFilial} />
	*/
	//<Pesquisar idFilial={idFilial} setDataFilial={setDataFilial} setCarregandoDadosFilial={setCarregando} />
	return(
		<>
			{! dataFilial &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar Filial'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarFilial} showHide={()=>{setShowModalAtualizarFilial();}}>
					<Load/>
				</Modal>
			}

			{dataFilial && 
				<FormFilial setIdFilial={setIdFilial} idFilial={idFilial} carregando={false} dataFilialChoice={dataFilial} setAtualizarFilial={setAtualizarFilial} atualizarFilial={atualizarFilial} showModalCriarFilial={showModalAtualizarFilial} setShowModalCriarFilial={setShowModalAtualizarFilial} callback={callback} />
			}
		</>
	)
}

export default Atualizar;