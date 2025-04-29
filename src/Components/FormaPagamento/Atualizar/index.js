import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, FORMA_PAGAMENTO_ONE_GET, GRUPOS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import AtualizarForm from '../FormFormaPagamento/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import Swal from 'sweetalert2'
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Atualizar = ({ idFormaPagamento, setIdFormaPagamento, callback, atualizarFormaPagamento, setAtualizarFormaPagamento }) => {

	const [showModalAtualizarFormaPagamento, setShowModalFormaPagamento] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataFormaPagamento, setDataFormaPagamento] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);
	const [erroValidacao, setErroValidacao] = React.useState(null)
	const [showModalErro, setShowModalErro] = React.useState(false)
	const [sendForm, setSendForm] = React.useState(false)

	const { data, error, request, loading } = useFetch();
	const formRef = React.useRef();

	React.useEffect(() => {

		const getFormaPagamento = async () => {
			if (idFormaPagamento > 0) {
				const { url, options } = FORMA_PAGAMENTO_ONE_GET(idFormaPagamento, getToken());
				const { response, json } = await request(url, options);

				if (json) {

					setDataFormaPagamento(json)

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
						setAtualizarFormaPagamento(false)
						setIdFormaPagamento(null)

						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: erroValidaao,
							footer: '',
							confirmButtonColor: "#07B201",
						});
					} else {
						setDataFormaPagamento(json)
						setShowModalFormaPagamento(true)
					}
				} else {
					setDataFormaPagamento([])
					setAtualizarFormaPagamento(false)
					setIdFormaPagamento(null)
				}
			}
		}

		getFormaPagamento();

	}, [idFormaPagamento])


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
						setDataFormaPagamento={setDataFormaPagamento}
						setIdFormaPagamento={setIdFormaPagamento}
						idFormaPagamento={idFormaPagamento}
						carregando={false}
						dataFormaPagamentoChoice={dataFormaPagamento}
						setAtualizarFormaPagamento={setAtualizarFormaPagamento}
						atualizarFormaPagamento={atualizarFormaPagamento}
						showModalCriarFormaPagamento={showModalAtualizarFormaPagamento}
						setShowModalCriarFormaPagamento={setShowModalFormaPagamento}
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
			{!dataFormaPagamento &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Atualizar Forma de Pagamento'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={true} showHide={() => { setShowModalFormaPagamento(); }}>
					<Load />
				</Modal>
			}

			{dataFormaPagamento &&
				<Modal
					handleConcluir={() => { handleConclude(); }}
					children={<FormModal />}
					title={'Atualizar forma de pagamento'}
					size="lg"
					dialogClassName={''}
					aria-labelledby={'aria-labelledby'}
					labelCanelar="Fechar"
					show={showModalAtualizarFormaPagamento}
					showHide={() => { setShowModalFormaPagamento(false); setAtualizarFormaPagamento(false); setIdFormaPagamento(null) }}
					propsConcluir={{ 'disabled': carregando }}
					labelConcluir={carregando ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
				/>
			}

		</>
	)
}

export default Atualizar;