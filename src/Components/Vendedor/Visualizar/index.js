import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, RCA_ONE_GET, GRUPOS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import Details from './details.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import Swal from 'sweetalert2'
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Visualizar = ({ idVendedor, setIdVendedor, callback, atualizarVendedor, setVisualizarVendedor }) => {
	const [showModalVisualizarVendedor, setShowModalVendedor] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataVendedor, setDataVendedor] = React.useState(null)
	const { getToken } = React.useContext(UserContex);
	const { error, request } = useFetch();
	const formRef = React.useRef();

	React.useEffect(() => {
		const getVendedor = async () => {
			if (idVendedor > 0) {
				const { url, options } = RCA_ONE_GET(idVendedor, getToken());
				const { json } = await request(url, options);
				if (json) {
					// Extrai o objeto correto do vendedor
					let data = json;
					if (data?.mensagem) {
						data = data.mensagem;
					} else if (data?.data) {
						data = data.data;
					}
					setDataVendedor(data);
					setShowModalVendedor(true);
				} else {
					setDataVendedor(null);
					setVisualizarVendedor(false);
					setIdVendedor(null);
				}
			}
		};
		getVendedor();
	}, [idVendedor]);


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


	const FormModal = () => (
		<Row>
			<Col>
				<Details dataVendedorChoice={dataVendedor} />
			</Col>
		</Row>
	);

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
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Visualizar Operador Financeiro'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={true} showHide={() => { setShowModalVendedor(); }}>
					<Load />
				</Modal>
			}

			{dataVendedor &&
				<Modal
					handleConcluir={() => { handleConclude(); }}
					children={<FormModal />}
					title={'Visualizar Vendedor'}
					size="lg"
					dialogClassName={''}
					aria-labelledby={'aria-labelledby'}
					labelCanelar="Fechar"
					show={showModalVisualizarVendedor}
					showHide={() => { setShowModalVendedor(false); setVisualizarVendedor(false); setIdVendedor(null) }}
					propsConcluir={{ 'disabled': carregando }}
					labelConcluir={carregando ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
				/>
			}

		</>
	)
}

export default Visualizar;