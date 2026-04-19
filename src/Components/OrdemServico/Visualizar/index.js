import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { ORDEM_SERVICO_ONE_GET } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import Details from './details.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Visualizar = ({ idOrdemServico, setIdOrdemServico, callback, atualizarOrdemServico, setVisualizarOrdemServico }) => {


	const [showModalVisualizarOrdemServico, setShowModalVisualizarOrdemServico] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataOrdemServico, setDataOrdemServico] = React.useState(null)
	const { getToken } = React.useContext(UserContex);

	const { data, error, request } = useFetch();
	const formRef = React.useRef();
	React.useEffect(() => {

		const getOrdemServico = async () => {
			if (idOrdemServico > 0) {
				const { url, options } = ORDEM_SERVICO_ONE_GET(idOrdemServico, getToken());
				const { response, json } = await request(url, options);
				if (json) {
					setDataOrdemServico(json)

					let data = json

					if (data?.mensagem) {
						data = json?.mensagem
					} else if (data?.data) {
						data = json?.data
					}

					let erroValidaao = validarAtualizacao(data);

					if (Array.isArray(erroValidaao) && erroValidaao.length > 0) {
						erroValidaao = erroValidaao.join('<br/>')
						setVisualizarOrdemServico(false)
						setIdOrdemServico(null)

						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: erroValidaao,
							footer: '',
							confirmButtonColor: "#07B201",
						});
					} else {
						setDataOrdemServico(json)
						setShowModalVisualizarOrdemServico(true)
					}

				} else {
					setDataOrdemServico([])
					setVisualizarOrdemServico(false)
					setIdOrdemServico(null)
				}
			}
		}

		getOrdemServico();

	}, [idOrdemServico])

	/*
		atualizarOrdemServico && 
				<Atualizar setCarregandoDadosOrdemServico={null} atualizarOrdemServico={setAtualizarOrdemServico} idOrdemServico={clientChoice} setDataOrdemServico={null} setShowModalCriarOrdemServico={setShowModalAtualizarOrdemServico} />
	*/
	const validarAtualizacao = (data) => {
		let erros = [];
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
						dataOrdemServicoChoice={dataOrdemServico}
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
			{!dataOrdemServico &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Visualizar OrdemServico'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-os-fullscreen-mobile'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={true} showHide={() => { setShowModalVisualizarOrdemServico(); }}>
					<Load />
				</Modal>
			}

			{dataOrdemServico &&
				<Modal
					handleConcluir={() => { handleConclude(); }}
					children={<FormModal />}
					title={'Visualizar OrdemServico'}
					size="lg"
					dialogClassName={'modal-90w modal-os-fullscreen-mobile'}
					aria-labelledby={'aria-labelledby'}
					labelCanelar="Fechar"
					show={showModalVisualizarOrdemServico}
					showHide={() => { setShowModalVisualizarOrdemServico(false); setVisualizarOrdemServico(false); setIdOrdemServico(null) }}
					propsConcluir={{ 'disabled': carregando }}
					noBtnConcluir={true}
					labelConcluir={carregando ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
				/>
			}

		</>
	)
}

export default Visualizar;