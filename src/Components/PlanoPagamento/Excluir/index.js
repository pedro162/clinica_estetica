import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, PLANO_PAGAMENTO_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormExcluirPlanoPagamento from '../FormExcluirPlanoPagamento/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import Swal from 'sweetalert2'

const Excluir = ({idPlanoPagamento, setIdPlanoPagamento, callback, cancelarPlanoPagamento, setExcluirPlanoPagamento})=>{
    const [showModalExcluirPlanoPagamento, setShowModalExcluirPlanoPagamento] = React.useState(false)    
    const [dataPlanoPagamento, setDataPlanoPagamento] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);
	const {data, error, request, loading} = useFetch();

	React.useEffect(()=>{
		
		const getPlanoPagamento = async ()=>{
			if(idPlanoPagamento > 0){
				const {url, options} = PLANO_PAGAMENTO_ONE_GET(idPlanoPagamento, getToken());
				const {response, json} = await request(url, options);
				
				if(json){
					
					setDataPlanoPagamento(json)
					setShowModalExcluirPlanoPagamento(true)
					 
		        }else{
		        	setDataPlanoPagamento([])
		        }
			}
		}

		getPlanoPagamento();
		
	}, [idPlanoPagamento])


	if(error){
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: error,
			footer: '',
			confirmButtonColor: "#07B201",
			//width:'20rem',
		});
	}
	
	return(
		<>
			{! dataPlanoPagamento &&
				<Modal noBtnExcluir={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Excluir Plano de Pagamento'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalExcluirPlanoPagamento} showHide={()=>{setShowModalExcluirPlanoPagamento();}}>
					<Load/>
				</Modal>
			}

			{dataPlanoPagamento && 
				<FormExcluirPlanoPagamento setIdPlanoPagamento={setIdPlanoPagamento} idPlanoPagamento={idPlanoPagamento} carregando={false} dataPlanoPagamentoChoice={dataPlanoPagamento} setExcluirPlanoPagamento={setExcluirPlanoPagamento} cancelarPlanoPagamento={cancelarPlanoPagamento} showModalExcluirPlanoPagamento={showModalExcluirPlanoPagamento} setShowModalExcluirPlanoPagamento={setShowModalExcluirPlanoPagamento} callback={callback} />
			}
		</>
	)
}

export default Excluir;