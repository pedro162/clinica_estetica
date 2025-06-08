import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, OPERADOR_FINANCEIRO_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormExcluirOperadorFinanceiro from '../FormExcluirOperadorFinanceiro/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import Swal from 'sweetalert2'

const Excluir = ({idOperadorFinanceiro, setIdOperadorFinanceiro, callback, cancelarOperadorFinanceiro, setExcluirOperadorFinanceiro})=>{
    const [showModalExcluirOperadorFinanceiro, setShowModalExcluirOperadorFinanceiro] = React.useState(false)    
    const [dataOperadorFinanceiro, setDataOperadorFinanceiro] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);
	const {data, error, request, loading} = useFetch();

	React.useEffect(()=>{
		
		const getOperadorFinanceiro = async ()=>{
			if(idOperadorFinanceiro > 0){
				const {url, options} = OPERADOR_FINANCEIRO_ONE_GET(idOperadorFinanceiro, getToken());
				const {response, json} = await request(url, options);
				
				if(json){
					console.log(json)
					setDataOperadorFinanceiro(json)
					setShowModalExcluirOperadorFinanceiro(true)
					 
		        }else{
		        	setDataOperadorFinanceiro([])
					setIdOperadorFinanceiro(null)
		        }
			}
		}

		getOperadorFinanceiro();
		
	}, [idOperadorFinanceiro])

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
			{! dataOperadorFinanceiro &&
				<Modal noBtnExcluir={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Excluir operador financeiro'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalExcluirOperadorFinanceiro} showHide={()=>{setShowModalExcluirOperadorFinanceiro();}}>
					<Load/>
				</Modal>
			}

			{dataOperadorFinanceiro && 
				<FormExcluirOperadorFinanceiro setIdOperadorFinanceiro={setIdOperadorFinanceiro} idOperadorFinanceiro={idOperadorFinanceiro} carregando={false} dataOperadorFinanceiroChoice={dataOperadorFinanceiro} setExcluirOperadorFinanceiro={setExcluirOperadorFinanceiro} cancelarOperadorFinanceiro={cancelarOperadorFinanceiro} showModalExcluirOperadorFinanceiro={showModalExcluirOperadorFinanceiro} setShowModalExcluirOperadorFinanceiro={setShowModalExcluirOperadorFinanceiro} callback={callback} />
			}
		</>
	)
}

export default Excluir;