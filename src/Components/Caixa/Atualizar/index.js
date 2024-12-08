import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CAIXA_ONE_GET, GRUPOS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import AtualizarForm from '../FormCaixa/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import Swal from 'sweetalert2'

const Atualizar = ({ idCaixa, setIdCaixa, callback, atualizarCaixa, setAtualizarCaixa }) => {


	const [showModalAtualizarCaixa, setShowModalAtualizarCaixa] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataCaixa, setDataCaixa] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);
	const [erroValidacao, setErroValidacao] = React.useState(null)
	const [showModalErro, setShowModalErro] = React.useState(false)

	const { data, error, request, loading } = useFetch();
	React.useEffect(() => {

		const getCaixa = async () => {
			if (idCaixa > 0) {
				const { url, options } = CAIXA_ONE_GET(idCaixa, getToken());
				const { response, json } = await request(url, options);
				if (json) {

					setDataCaixa(json)

					let data = json?.mensagem

					if (json?.data) {
						data = json?.data;
					}

					let erroValidaao = validarBaixa(data);

					if (Array.isArray(erroValidaao) && erroValidaao.length > 0) {
						setShowModalErro(true)
						erroValidaao = erroValidaao.join('<br/>')
						setErroValidacao(erroValidaao)

						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: erroValidaao,
							footer: '',
							confirmButtonColor: "#07B201",
						});
					} else {
						setDataCaixa(json)
						setShowModalAtualizarCaixa(true)
					}
				} else {
					setDataCaixa([])
				}
			}
		}

		getCaixa();

	}, [idCaixa])


	const validarBaixa = (data) => {
		let erros = [];

		let { vrLiquido, vrPago, status, id } = data;
		vrLiquido = Number(vrLiquido)
		vrPago = Number(vrPago)
		let difAberto = vrLiquido - vrPago
		let difAbertoAbs = Math.abs(difAberto);

		if (!(String(status) == 'aberto')) {

		}

		return erros;
	}

	return (
		<>
			{!dataCaixa &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Atualizar Caixa'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarCaixa} showHide={() => { setShowModalAtualizarCaixa(); }}>
					<Load />
				</Modal>
			}

			{dataCaixa &&
				<AtualizarForm setDataCaixa={setDataCaixa} setIdCaixa={setIdCaixa} idCaixa={idCaixa} carregando={false} dataCaixaChoice={dataCaixa} setAtualizarCaixa={setAtualizarCaixa} atualizarCaixa={atualizarCaixa} showModalCriarCaixa={showModalAtualizarCaixa} setShowModalCriarCaixa={setShowModalAtualizarCaixa} callback={callback} />
			}
		</>
	)
}

export default Atualizar;