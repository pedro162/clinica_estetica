import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CONTAS_RECEBER_ONE_GET, GRUPOS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import BaixarForm from './BaixarForm.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import Swal from 'sweetalert2'

const Baixar = ({ idContasReceber, setIdContasReceber, callback, BaixarContasReceber, setBaixarContasReceber }) => {

	const [showModalBaixarContasReceber, setShowModalBaixarContasReceber] = React.useState(false)
	const [showModalErro, setShowModalErro] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataContasReceber, setDataContasReceber] = React.useState(null)
	const [erroValidacao, setErroValidacao] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);

	const { data, error, request, loading } = useFetch();
	React.useEffect(() => {

		const getContasReceber = async () => {
			if (idContasReceber > 0) {
				const { url, options } = CONTAS_RECEBER_ONE_GET(idContasReceber, getToken());
				const { response, json } = await request(url, options);

				if (json) {

					let data = json

					if (json?.mensagem) {
						data = json?.mensagem
					}

					if (json?.data) {
						data = json?.data
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
						setDataContasReceber(json)
						setShowModalBaixarContasReceber(true)
					}

				} else {
					setDataContasReceber([])
					setErroValidacao(null)
				}
			}
		}

		getContasReceber();

	}, [idContasReceber])

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

	return (
		<>
			{!dataContasReceber &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Baixar ContasReceber'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={true} showHide={() => { setShowModalBaixarContasReceber(); }}>
					<Load />
				</Modal>
			}

			{dataContasReceber &&
				<BaixarForm setDataContasReceber={setDataContasReceber} setIdContasReceber={setIdContasReceber} idContasReceber={idContasReceber} carregando={false} dataContasReceberChoice={dataContasReceber} setBaixarContasReceber={setBaixarContasReceber} BaixarContasReceber={BaixarContasReceber} showModalCriarContasReceber={showModalBaixarContasReceber} setShowModalCriarContasReceber={setShowModalBaixarContasReceber} callback={callback} />
			}
		</>
	)
}

export default Baixar;