import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CONTAS_RECEBER_ONE_GET, GRUPOS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import BaixarForm from './BaixarForm.js'
import Modal from '../../Utils/Modal/index.js'
import ModalAlert from '../../Utils/ModalAlert/index.js'

import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import Swal from 'sweetalert2'

const Baixar = ({ idContasReceberItem, setIdContasReceberItem, callback, BaixarContasReceberItem, setBaixarContasReceberItem }) => {


	const [showModalBaixarContasReceberItem, setShowModalBaixarContasReceberItem] = React.useState(false)
	const [showModalErro, setShowModalErro] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataContasReceberItem, setDataContasReceberItem] = React.useState(null)
	const [erroValidacao, setErroValidacao] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);

	const { data, error, request, loading } = useFetch();
	React.useEffect(() => {

		const getContasReceberItem = async () => {
			if (idContasReceberItem > 0) {
				const { url, options } = CONTAS_RECEBER_ONE_GET(idContasReceberItem, getToken());
				const { response, json } = await request(url, options);
				if (json) {

					let data = json?.mensagem
					let erroValidaao = validarBaixa(data);
					if (Array.isArray(erroValidaao) && erroValidaao.length > 0) {
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
					} else {
						setDataContasReceberItem(json)
						setShowModalBaixarContasReceberItem(true)
					}




				} else {
					setDataContasReceberItem([])
					setErroValidacao(null)
				}
			}
		}

		getContasReceberItem();

	}, [idContasReceberItem])

	const validarBaixa = (data) => {
		let erros = [];

		let { vrLiquido, vrPago, status, id } = data;
		vrLiquido = Number(vrLiquido)
		vrPago = Number(vrPago)
		let difAberto = vrLiquido - vrPago
		let difAbertoAbs = Math.abs(difAberto);

		if (!(String(status) == 'aberto')) {
			erros.push(`O contas a receber de código n° ${id} encontra-se ${status} e não poderá ser modificado`);
		}

		if (vrLiquido > vrPago) {
			if (!(difAbertoAbs > 0.02)) {
				erros.push(`O contas a receber de código n° ${id} não possui mais saldo para baixa`);
			}
		}

		return erros;
	}
	//ModalAlert = ({show, showHide, title, message, variant})
	/*
		BaixarContasReceberItem && 
				<Baixar setCarregandoDadosContasReceberItem={null} BaixarContasReceberItem={setBaixarContasReceberItem} idContasReceberItem={clientChoice} setDataContasReceberItem={null} setShowModalCriarContasReceberItem={setShowModalBaixarContasReceberItem} />
	*/
	//<Pesquisar idContasReceberItem={idContasReceberItem} setDataContasReceberItem={setDataContasReceberItem} setCarregandoDadosContasReceberItem={setCarregando} />
	return (
		<>
			{!dataContasReceberItem &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Baixar ContasReceberItem'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={showModalBaixarContasReceberItem} showHide={() => { setShowModalBaixarContasReceberItem(); }}>
					<Load />
				</Modal>
			}

			{
				/*erroValidacao && <ModalAlert variant={'danger'} show={showModalErro} showHide={()=>{setShowModalErro(false);setIdContasReceberItem(null)}} title={'Erro'} message={`${erroValidacao}`} >
					
				</ModalAlert>*/
			}

			{dataContasReceberItem &&
				<BaixarForm setDataContasReceberItem={setDataContasReceberItem} setIdContasReceberItem={setIdContasReceberItem} idContasReceberItem={idContasReceberItem} carregando={false} dataContasReceberItemChoice={dataContasReceberItem} setBaixarContasReceberItem={setBaixarContasReceberItem} BaixarContasReceberItem={BaixarContasReceberItem} showModalCriarContasReceberItem={showModalBaixarContasReceberItem} setShowModalCriarContasReceberItem={setShowModalBaixarContasReceberItem} callback={callback} />
			}
		</>
	)
}

export default Baixar;