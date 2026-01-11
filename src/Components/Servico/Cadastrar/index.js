import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import FormServico from '../FormServico/index.js'
import { Col, Row, Button } from 'react-bootstrap';
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import Swal from 'sweetalert2'
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Cadastrar = ({ idServico, setIdServico, callback, atualizarServico, setAtualizarServico, cadastrarServico, setCadastrarServico }) => {


	const [showModalAtualizarServico, setShowModalAtualizarServico] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataServico, setDataServico] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);
	const [sendForm, setSendForm] = React.useState(false)

	const { data, error, request, loading } = useFetch();
	const formRef = React.useRef();

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
						carregando={false}
						dataServicoChoice={dataServico}
						setAtualizarServico={setCadastrarServico}
						atualizarServico={cadastrarServico}
						showModalCriarServico={showModalAtualizarServico}
						setShowModalCriarServico={setShowModalAtualizarServico}
						setShowModalServico={setShowModalAtualizarServico}
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

	React.useEffect(() => {

		const getGrupo = async () => {
			const { url, options } = GRUPOS_ALL_POST({}, getToken());

			const { response, json } = await request(url, options);

			if (json) {
				setDataGrupo(json)
				setShowModalAtualizarServico(true)
			} else {
				setDataGrupo(null)
			}
		}
		if (cadastrarServico == true) {
			getGrupo();
		}


	}, [cadastrarServico])

	/*
		atualizarServico && 
				<Atualizar setCarregandoDadosServico={null} atualizarServico={setAtualizarServico} idServico={clientChoice} setDataServico={null} setShowModalCriarServico={setShowModalAtualizarServico} />
	*/
	//<Pesquisar idServico={idServico} setDataServico={setDataServico} setCarregandoDadosServico={setCarregando} />
	return (
		<>
			<Modal
				handleConcluir={() => { handleConclude(); }}
				children={<FormModal />}
				title={'Cadastrar servicço'}
				size="lg"
				dialogClassName={''}
				aria-labelledby={'aria-labelledby'}
				labelCanelar="Fechar"
				show={showModalAtualizarServico}
				showHide={() => { setShowModalAtualizarServico(false); setCadastrarServico(false); }}
				propsConcluir={{ 'disabled': carregando }}
				labelConcluir={carregando ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
			/>
		</>
	)
}

export default Cadastrar;