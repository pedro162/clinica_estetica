import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, PLANO_PAGAMENTO_ONE_GET, GRUPOS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import AtualizarForm from '../FormPlanoPagamento/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import Swal from 'sweetalert2'
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Atualizar = ({ idPlanoPagamento, setIdPlanoPagamento, callback, atualizarPlanoPagamento, setAtualizarPlanoPagamento }) => {

	const [showModalAtualizarPlanoPagamento, setShowModalPlanoPagamento] = React.useState(false)
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
						setAtualizarPlanoPagamento(false)
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
					setAtualizarPlanoPagamento(false)
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
					<AtualizarForm
						{...data}
						setDataPlanoPagamento={setDataPlanoPagamento}
						setIdPlanoPagamento={setIdPlanoPagamento}
						idPlanoPagamento={idPlanoPagamento}
						carregando={false}
						dataPlanoPagamentoChoice={dataPlanoPagamento}
						setAtualizarPlanoPagamento={setAtualizarPlanoPagamento}
						atualizarPlanoPagamento={atualizarPlanoPagamento}
						showModalCriarPlanoPagamento={showModalAtualizarPlanoPagamento}
						setShowModalCriarPlanoPagamento={setShowModalPlanoPagamento}
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
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Atualizar Plano de Pagamento'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={true} showHide={() => { setShowModalPlanoPagamento(); }}>
					<Load />
				</Modal>
			}

			{dataPlanoPagamento &&
				<Modal
					handleConcluir={() => { handleConclude(); }}
					children={<FormModal />}
					title={'Cadastrar plano de pagamento'}
					size="lg"
					dialogClassName={''}
					aria-labelledby={'aria-labelledby'}
					labelCanelar="Fechar"
					show={showModalAtualizarPlanoPagamento}
					showHide={() => { setShowModalPlanoPagamento(false); setAtualizarPlanoPagamento(false); setIdPlanoPagamento(null) }}
					propsConcluir={{ 'disabled': carregando }}
					labelConcluir={carregando ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
				/>
			}

		</>
	)
}

export default Atualizar;