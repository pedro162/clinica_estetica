import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, RCA_ONE_GET, GRUPOS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import AtualizarForm from '../FormVendedor/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import Swal from 'sweetalert2'
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Atualizar = ({ idVendedor, setIdVendedor, callback, atualizarVendedor, setAtualizarVendedor }) => {

	const [showModalAtualizarVendedor, setShowModalVendedor] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataVendedor, setDataVendedor] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);
	const [erroValidacao, setErroValidacao] = React.useState(null)
	const [showModalErro, setShowModalErro] = React.useState(false)
	const [sendForm, setSendForm] = React.useState(false)

	const { data, error, request, loading } = useFetch();
	const formRef = React.useRef();

	React.useEffect(() => {

		const getVendedor = async () => {
			if (idVendedor > 0) {
				const { url, options } = RCA_ONE_GET(idVendedor, getToken());
				const { response, json } = await request(url, options);

				if (json) {

					setDataVendedor(json)

					let data = json

					if (data?.mensagem) {
						data = json?.mensagem
					} else if (data?.data) {
						data = json?.data
					}

					let erroValidaao = validarAtualizacao(data);

					if (Array.isArray(erroValidaao) && erroValidaao.length > 0) {
						setShowModalErro(true)
						erroValidaao = erroValidaao.join('<br/>')
						setErroValidacao(erroValidaao)
						setAtualizarVendedor(false)
						setIdVendedor(null)

						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: erroValidaao,
							footer: '',
							confirmButtonColor: "#07B201",
						});
					} else {
						setDataVendedor(json)
						setShowModalVendedor(true)
					}
				} else {
					setDataVendedor([])
					setAtualizarVendedor(false)
					setIdVendedor(null)
				}
			}
		}

		getVendedor();

	}, [idVendedor])


	const validarAtualizacao = (data) => {
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
						setDataVendedor={setDataVendedor}
						setIdVendedor={setIdVendedor}
						idVendedor={idVendedor}
						carregando={carregando}
						dataVendedorChoice={dataVendedor}
						setAtualizarVendedor={setAtualizarVendedor}
						atualizarVendedor={atualizarVendedor}
						showModalCriarVendedor={showModalAtualizarVendedor}
						setShowModalCriarVendedor={setShowModalVendedor}
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

	if (error) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: error,
			footer: '',
			confirmButtonColor: "#07B201",
		});
	}

	return (
		<>
			{!dataVendedor &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Atualizar vendedor'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={true} showHide={() => { setShowModalVendedor(); }}>
					<Load />
				</Modal>
			}

			{dataVendedor &&
				<Modal
					handleConcluir={() => { handleConclude(); }}
					children={<FormModal />}
					title={'Atualizar vendedor'}
					size="lg"
					dialogClassName={''}
					aria-labelledby={'aria-labelledby'}
					labelCanelar="Fechar"
					show={showModalAtualizarVendedor}
					showHide={() => { setShowModalVendedor(false); setAtualizarVendedor(false); setIdVendedor(null) }}
					propsConcluir={{ 'disabled': carregando }}
					labelConcluir={carregando ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
				/>
			}

		</>
	)
}

export default Atualizar;