import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CONTAS_RECEBER_ONE_GET, GRUPOS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import AtualizarForm from '../FormContasReceber/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import Swal from 'sweetalert2'
import Detalhes from './Detalhes.js'

const Visualizar = ({ idContasReceber, setIdContasReceber, callback, atualizarContasReceber, setAtualizarContasReceber, noUseModal }) => {
	const [showModalAtualizarContasReceber, setShowModalAtualizarContasReceber] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataContasReceber, setDataContasReceber] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);
	const [erroValidacao, setErroValidacao] = React.useState(null)
	const [showModalErro, setShowModalErro] = React.useState(false)

	const { data, error, request, loading } = useFetch();

	React.useEffect(() => {

		const getContasReceber = async () => {
			if (idContasReceber > 0) {
				const { url, options } = CONTAS_RECEBER_ONE_GET(idContasReceber, getToken());
				const { response, json } = await request(url, options);

				if (json) {

					setDataContasReceber(json)

					let data = json

					if (data?.mensagem) {
						data = json?.mensagem
					}

					if (data?.data) {
						data = json?.data
					}

					let erroValidaao = validarCobranca(data);

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
						setShowModalAtualizarContasReceber(true)
					}
				} else {
					setDataContasReceber([])
				}
			}
		}

		getContasReceber();

	}, [idContasReceber])


	const validarCobranca = (data) => {
		let erros = [];

		let { vrLiquido, vrPago, status, id } = data;

		return erros;
	}

	if (noUseModal) {
		return (
			<>

				{!dataContasReceber &&
					<Load />
				}

				<Detalhes

					carregando={carregando}
					error={error}
					loading={loading}

				/>
			</>
		)
	}

	return (
		<>
			{!dataContasReceber &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Atualizar ContasReceber'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarContasReceber} showHide={() => { setShowModalAtualizarContasReceber(); }}>
					<Load />
				</Modal>
			}

			{dataContasReceber &&
				<Modal
					noBtnConcluir={true}
					handleConcluir={() => null}
					title={'Detalhes conta a receber nº ' + idContasReceber}
					size="lg" propsConcluir={{ 'disabled': loading }}
					labelConcluir={loading ? 'Salvando...' : 'Concluir'}
					dialogClassName={''} aria-labelledby={'aria-labelledby'}
					labelCanelar="Fechar"
					show={showModalAtualizarContasReceber}
					showHide={() => { setShowModalAtualizarContasReceber(); setIdContasReceber(null); }}

				>
					<Detalhes

						carregando={carregando}
						error={error}
						loading={loading}
						setDataContasReceber={setDataContasReceber}
						setIdContasReceber={setIdContasReceber}
						idContasReceber={idContasReceber}
						dataContasReceberChoice={dataContasReceber}
						showModalCriarContasReceber={showModalAtualizarContasReceber}
						setShowModalCriarContasReceber={setShowModalAtualizarContasReceber}
						callback={callback}

					/>

				</Modal>

			}
		</>
	)
}

export default Visualizar;