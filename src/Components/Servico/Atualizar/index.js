import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, SERVICO_ONE_GET, GRUPOS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import FormServico from '../FormServico/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import Swal from 'sweetalert2'
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Atualizar = ({ idServico, setIdServico, callback, atualizarServico, setAtualizarServico }) => {

	const [showModalAtualizarServico, setShowModalAtualizarServico] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false);
	const [dataServico, setDataServico] = React.useState(null);
	const { getToken, dataUser } = React.useContext(UserContex);
	const [sendForm, setSendForm] = React.useState(false)

	const { data, error, request, loading } = useFetch();
	const formRef = React.useRef();

	React.useEffect(() => {

		const getServico = async () => {
			if (idServico > 0) {
				const { url, options } = SERVICO_ONE_GET(idServico, getToken());
				const { response, json } = await request(url, options);

				if (json) {
					setDataServico(json)
					setShowModalAtualizarServico(true)

				} else {
					setDataServico([])
				}
			}
		}

		getServico();

	}, [idServico])

	const handleConclude = () => {
		if (formRef.current) {
			formRef.current.submitForm();
		}
	};

	const FormModal = () => {
		return (
			<Row>
				<Col>
					<FormServico
						{...data}
						setDataServico={setDataServico}
						setIdServico={setIdServico}
						idServico={idServico}
						carregando={carregando}
						dataServicoChoice={dataServico}
						setAtualizarServico={setAtualizarServico}
						atualizarServico={atualizarServico}
						showModalCriarServico={showModalAtualizarServico}
						setShowModalCriarServico={setShowModalAtualizarServico}
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
			{!dataServico &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Atualizar Servico'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarServico} showHide={() => { setShowModalAtualizarServico(); }}>
					<Load />
				</Modal>
			}

			{dataServico &&
				<Modal
					handleConcluir={() => { handleConclude(); }}
					children={<FormModal />}
					title={'Cadastrar serviço'}
					size="lg"
					dialogClassName={''}
					aria-labelledby={'aria-labelledby'}
					labelCanelar="Fechar"
					show={showModalAtualizarServico}
					showHide={() => { setShowModalAtualizarServico(false); setAtualizarServico(false); setIdServico(null) }}
					propsConcluir={{ 'disabled': carregando }}
					labelConcluir={carregando ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
				/>
			}
		</>
	)
}

export default Atualizar;