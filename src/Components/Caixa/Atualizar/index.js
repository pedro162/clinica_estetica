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
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Atualizar = ({ idCaixa, setIdCaixa, callback, atualizarCaixa, setAtualizarCaixa }) => {

	const [showModalAtualizarCaixa, setShowModalCaixa] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataCaixa, setDataCaixa] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);
	const [erroValidacao, setErroValidacao] = React.useState(null)
	const [showModalErro, setShowModalErro] = React.useState(false)
	const [sendForm, setSendForm] = React.useState(false)

	const { data, error, request, loading } = useFetch();
	const formRef = React.useRef();

	React.useEffect(() => {

		const getCaixa = async () => {
			if (idCaixa > 0) {
				const { url, options } = CAIXA_ONE_GET(idCaixa, getToken());
				const { response, json } = await request(url, options);

				if (json) {

					setDataCaixa(json)

					let data = json

					if (data?.mensagem) {
						data = json?.mensagem
					} else if (data?.data) {
						data = json?.data
					}

					let erroValidaao = validarBaixa(data);

					if (Array.isArray(erroValidaao) && erroValidaao.length > 0) {
						setShowModalErro(true)
						erroValidaao = erroValidaao.join('<br/>')
						setErroValidacao(erroValidaao)
						setAtualizarCaixa(false)
						setIdCaixa(null)

						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: erroValidaao,
							footer: '',
							confirmButtonColor: "#07B201",
						});
					} else {
						setDataCaixa(json)
						setShowModalCaixa(true)
					}
				} else {
					setDataCaixa([])
					setAtualizarCaixa(false)
					setIdCaixa(null)
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

	const handleConclude = () => {
		if (formRef.current) {
			formRef.current.submitForm();
		}
	};

	const FormModal = () => {
		return (
			<Row>
				<Col>
					<AtualizarForm
						{...data}
						setDataCaixa={setDataCaixa}
						setIdCaixa={setIdCaixa}
						idCaixa={idCaixa}
						carregando={false}
						dataCaixaChoice={dataCaixa}
						setAtualizarCaixa={setAtualizarCaixa}
						atualizarCaixa={atualizarCaixa}
						showModalCriarCaixa={showModalAtualizarCaixa}
						setShowModalCriarCaixa={setShowModalCaixa}
						callback={callback}
						setSendForm={setSendForm}
						sendForm={sendForm}
						ref={formRef}
						setCarregando={setCarregando}
					/>
				</Col>
			</Row>
		)
	}

	return (
		<>
			{!dataCaixa &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Atualizar Caixa'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={true} showHide={() => { setShowModalCaixa(); }}>
					<Load />
				</Modal>
			}

			{dataCaixa &&
				<Modal
					handleConcluir={() => { handleConclude(); }}
					children={<FormModal />}
					title={'Cadastrar caixa'}
					size="lg"
					dialogClassName={''}
					aria-labelledby={'aria-labelledby'}
					labelCanelar="Fechar"
					show={showModalAtualizarCaixa}
					showHide={() => { setShowModalCaixa(false); setAtualizarCaixa(false); setIdCaixa(null) }}
					propsConcluir={{ 'disabled': carregando }}
					labelConcluir={carregando ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
				/>
			}

		</>
	)
}

export default Atualizar;