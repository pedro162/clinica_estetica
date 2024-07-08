import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONTAS_RECEBER_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import AtualizarForm from '../FormParametro/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import Swal from 'sweetalert2'

const Atualizar = ({idParametro, setIdParametro, callback, atualizarParametro, setAtualizarParametro})=>{

    
    const [showModalAtualizarParametro, setShowModalAtualizarParametro] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataParametro, setDataParametro] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);	
    const [erroValidacao, setErroValidacao] = React.useState(null)
    const [showModalErro, setShowModalErro] = React.useState(false)

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getParametro = async ()=>{
			if(idParametro > 0){
				const {url, options} = CONTAS_RECEBER_ONE_GET(idParametro, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataParametro(json)
					
					let data = json?.mensagem
					let erroValidaao  = validarBaixa(data);
					if(Array.isArray(erroValidaao) && erroValidaao.length > 0){
						setShowModalErro(true)
						erroValidaao = erroValidaao.join('<br/>')
						setErroValidacao(erroValidaao)
						Swal.fire({
							  	icon: "error",
							  	title: "Oops...",
							  	text: erroValidaao,
							  	footer: '',//'<a href="#">Why do I have this issue?</a>'
			  					confirmButtonColor: "#07B201",
							});
					}else{
						setDataParametro(json)
						setShowModalAtualizarParametro(true)
					 }
		        }else{
		        	setDataParametro([])
		        }
			}
		}

		getParametro();
		
	}, [idParametro])


	const validarBaixa = (data)=>{
		let erros = [];

		let {vrLiquido, vrPago, status, id} = data;
		vrLiquido 	= Number(vrLiquido)
		vrPago 		= Number(vrPago)
		let difAberto = vrLiquido - vrPago
		let difAbertoAbs = Math.abs(difAberto);

		if(!(String(status) == 'aberto')){
			erros.push(`O contas a receber de código n° ${id} encontra-se ${status} e não poderá ser modificado`);
		}

		return erros;
	}

	return(
		<>
			{! dataParametro &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar Parametro'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarParametro} showHide={()=>{setShowModalAtualizarParametro();}}>
					<Load/>
				</Modal>
			}

			{dataParametro && 
				<AtualizarForm setDataParametro={setDataParametro} setIdParametro={setIdParametro} idParametro={idParametro} carregando={false} dataParametroChoice={dataParametro} setAtualizarParametro={setAtualizarParametro} atualizarParametro={atualizarParametro} showModalCriarParametro={showModalAtualizarParametro} setShowModalCriarParametro={setShowModalAtualizarParametro} callback={callback} />
			}
		</>
	)
}

export default Atualizar;