import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, PLANO_PAGAMENTO_ONE_GET, GRUPOS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import Details from './details.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import Swal from 'sweetalert2'
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Visualizar = ({ idPlanoPagamento, setIdPlanoPagamento, callback, atualizarPlanoPagamento, setVisualizarPlanoPagamento }) => {

	const [showModalVisualizarPlanoPagamento, setShowModalPlanoPagamento] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataPlanoPagamento, setDataPlanoPagamento] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);
	const [erroValidacao, setErroValidacao] = React.useState(null)
	const [showModalErro, setShowModalErro] = React.useState(false)
	const [sendForm, setSendForm] = React.useState(false)

	const { data, error, request, loading } = useFetch();
	const formRef = React.useRef();

	React.useEffect(() => {

		const getPlanoPagamento = async () => {
			if (idPlanoPagamento > 0) {
				const { url, options } = PLANO_PAGAMENTO_ONE_GET(idPlanoPagamento, getToken());
				const { response, json } = await request(url, options);

				if (json) {

					setDataPlanoPagamento(json)

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
						setVisualizarPlanoPagamento(false)
						setIdPlanoPagamento(null)

						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: erroValidaao,
							footer: '',
							confirmButtonColor: "#07B201",
						});
					} else {
						setDataPlanoPagamento(json)
						setShowModalPlanoPagamento(true)
					}
				} else {
					setDataPlanoPagamento([])
					setVisualizarPlanoPagamento(false)
					setIdPlanoPagamento(null)
				}
			}
		}

		getPlanoPagamento();

	}, [idPlanoPagamento])


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
						dataPlanoPagamentoChoice={dataPlanoPagamento}
					/>
				</Col>
			</Row>
		)
	}

	if(error){
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
			{!dataPlanoPagamento &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Visualizar Plano de Pagamento'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={true} showHide={() => { setShowModalPlanoPagamento(); }}>
					<Load />
				</Modal>
			}

			{dataPlanoPagamento &&
				<Modal
					handleConcluir={() => { handleConclude(); }}
					children={<FormModal />}
					title={'Visualizar Plano de Pagamento'}
					size="lg"
					dialogClassName={''}
					aria-labelledby={'aria-labelledby'}
					labelCanelar="Fechar"
					show={showModalVisualizarPlanoPagamento}
					showHide={() => { setShowModalPlanoPagamento(false); setVisualizarPlanoPagamento(false); setIdPlanoPagamento(null) }}
					propsConcluir={{ 'disabled': carregando }}
					labelConcluir={carregando ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
				/>
			}

		</>
	)
}

export default Visualizar;