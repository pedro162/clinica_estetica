import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { BANDEIRA_CARTAO_ONE_GET } from './../Routes/index.js'
import { UserContex } from '../../../Context/UserContex.js'
import Details from './details.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import Swal from 'sweetalert2'
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Visualizar = ({ idCartaoCreditoBandeira, setIdCartaoCreditoBandeira, callback, atualizarCartaoCreditoBandeira, setVisualizarCartaoCreditoBandeira }) => {

	const [showModalVisualizarCartaoCreditoBandeira, setShowModalCartaoCreditoBandeira] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataCartaoCreditoBandeira, setDataCartaoCreditoBandeira] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);
	const [erroValidacao, setErroValidacao] = React.useState(null)
	const [showModalErro, setShowModalErro] = React.useState(false)
	const [sendForm, setSendForm] = React.useState(false)

	const { data, error, request, loading } = useFetch();
	const formRef = React.useRef();

	React.useEffect(() => {

		const getCartaoCreditoBandeira = async () => {
			if (idCartaoCreditoBandeira > 0) {
				const { url, options } = BANDEIRA_CARTAO_ONE_GET(idCartaoCreditoBandeira, getToken());
				const { response, json } = await request(url, options);

				if (json) {

					setDataCartaoCreditoBandeira(json)

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
						setVisualizarCartaoCreditoBandeira(false)
						setIdCartaoCreditoBandeira(null)

						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: erroValidaao,
							footer: '',
							confirmButtonColor: "#07B201",
						});
					} else {
						setDataCartaoCreditoBandeira(json)
						setShowModalCartaoCreditoBandeira(true)
					}
				} else {
					setDataCartaoCreditoBandeira([])
					setVisualizarCartaoCreditoBandeira(false)
					setIdCartaoCreditoBandeira(null)
				}
			}
		}

		getCartaoCreditoBandeira();

	}, [idCartaoCreditoBandeira])


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
					<Details
						{...data}
						dataCartaoCreditoBandeiraChoice={dataCartaoCreditoBandeira}
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
			{!dataCartaoCreditoBandeira &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Visualizar bandeira cartão'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={true} showHide={() => { setShowModalCartaoCreditoBandeira(); }}>
					<Load />
				</Modal>
			}

			{dataCartaoCreditoBandeira &&
				<Modal
					handleConcluir={() => { handleConclude(); }}
					children={<FormModal />}
					title={'Visualizar bandeira cartão'}
					size="lg"
					dialogClassName={''}
					aria-labelledby={'aria-labelledby'}
					labelCanelar="Fechar"
					show={showModalVisualizarCartaoCreditoBandeira}
					showHide={() => { setShowModalCartaoCreditoBandeira(false); setVisualizarCartaoCreditoBandeira(false); setIdCartaoCreditoBandeira(null) }}
					propsConcluir={{ 'disabled': carregando }}
					labelConcluir={carregando ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
				/>
			}

		</>
	)
}

export default Visualizar;