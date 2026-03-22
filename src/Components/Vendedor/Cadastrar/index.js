import React from 'react';
import FormVendedor from '../FormVendedor/index.js'
import { Col, Row, Button } from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cadastrar = ({ callback, cadastrarVendedor, setCadastrarVendedor }) => {

	const [showModalCriarVendedor, setShowModalVendedor] = React.useState(true)
	const [carregando, setCarregando] = React.useState(false)
	const [dataVendedor, setDataVendedor] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);
	const [erroValidacao, setErroValidacao] = React.useState(null)
	const [showModalErro, setShowModalErro] = React.useState(false)
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
					<FormVendedor

						{...data}
						carregando={carregando}
						dataVendedorChoice={dataVendedor}
						setAtualizarVendedor={setCadastrarVendedor}
						atualizarVendedor={cadastrarVendedor}
						showModalCriarVendedor={showModalCriarVendedor}
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

	return (
		<>
			<Modal
				handleConcluir={() => { handleConclude(); }}
				children={<FormModal />}
				title={'Cadastrar vendedor'}
				size="lg"
				dialogClassName={''}
				aria-labelledby={'aria-labelledby'}
				labelCanelar="Fechar"
				show={showModalCriarVendedor}
				showHide={() => { setShowModalVendedor(false); setCadastrarVendedor(false); }}
				propsConcluir={{ 'disabled': carregando }}
				labelConcluir={carregando ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
			/>

		</>
	)
}

export default Cadastrar;