import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONTAS_RECEBER_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import BaixarForm from './BaixarForm.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'

const Baixar = ({idContasReceber, setIdContasReceber, callback, BaixarContasReceber, setBaixarContasReceber})=>{

    
    const [showModalBaixarContasReceber, setShowModalBaixarContasReceber] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataContasReceber, setDataContasReceber] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getContasReceber = async ()=>{
			if(idContasReceber > 0){
				const {url, options} = CONTAS_RECEBER_ONE_GET(idContasReceber, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataContasReceber(json)
					setShowModalBaixarContasReceber(true)
					 
		        }else{
		        	setDataContasReceber([])
		        }
			}
		}

		getContasReceber();
		
	}, [idContasReceber])

	/*
		BaixarContasReceber && 
                <Baixar setCarregandoDadosContasReceber={null} BaixarContasReceber={setBaixarContasReceber} idContasReceber={clientChoice} setDataContasReceber={null} setShowModalCriarContasReceber={setShowModalBaixarContasReceber} />
	*/
	//<Pesquisar idContasReceber={idContasReceber} setDataContasReceber={setDataContasReceber} setCarregandoDadosContasReceber={setCarregando} />
	return(
		<>
			{! dataContasReceber &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Baixar ContasReceber'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalBaixarContasReceber} showHide={()=>{setShowModalBaixarContasReceber();}}>
					<Load/>
				</Modal>
			}

			{dataContasReceber && 
				<BaixarForm setDataContasReceber={setDataContasReceber} setIdContasReceber={setIdContasReceber} idContasReceber={idContasReceber} carregando={false} dataContasReceberChoice={dataContasReceber} setBaixarContasReceber={setBaixarContasReceber} BaixarContasReceber={BaixarContasReceber} showModalCriarContasReceber={showModalBaixarContasReceber} setShowModalCriarContasReceber={setShowModalBaixarContasReceber} callback={callback} />
			}
		</>
	)
}

export default Baixar;