import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormCancelarFormaPagamento from '../FormCancelarFormaPagamento/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'

const Cancelar = ({idFormaPagamento, setIdFormaPagamento, callback, cancelarFormaPagamento, setCancelarFormaPagamento})=>{

    
    const [showModalCancelarFormaPagamento, setShowModalCancelarFormaPagamento] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataFormaPagamento, setDataFormaPagamento] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);
	const {data, error, request, loading} = useFetch();

	React.useEffect(()=>{
		
		const getFormaPagamento = async ()=>{
			if(idFormaPagamento > 0){
				const {url, options} = CONSULTA_ONE_GET(idFormaPagamento, getToken());
				const {response, json} = await request(url, options);
				
				if(json){
					
					setDataFormaPagamento(json)
					setShowModalCancelarFormaPagamento(true)
					 
		        }else{
		        	setDataFormaPagamento([])
		        }
			}
		}

		getFormaPagamento();
		
	}, [idFormaPagamento])

	return(
		<>
			{! dataFormaPagamento &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cancelar FormaPagamento'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalCancelarFormaPagamento} showHide={()=>{setShowModalCancelarFormaPagamento();}}>
					<Load/>
				</Modal>
			}

			{dataFormaPagamento && 
				<FormCancelarFormaPagamento setIdFormaPagamento={setIdFormaPagamento} idFormaPagamento={idFormaPagamento} carregando={false} dataFormaPagamentoChoice={dataFormaPagamento} setCancelarFormaPagamento={setCancelarFormaPagamento} cancelarFormaPagamento={cancelarFormaPagamento} showModalCancelarFormaPagamento={showModalCancelarFormaPagamento} setShowModalCancelarFormaPagamento={setShowModalCancelarFormaPagamento} callback={callback} />
			}
		</>
	)
}

export default Cancelar;