import React from 'react';
import FormCaixa from '../FormCaixa/index.js'
import { Col, Row, Button } from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cadastrar = ({ callback, cadastrarCaixa, setCadastrarCaixa }) => {

	const [showModalCriarCaixa, setShowModalCaixa] = React.useState(true)
	const [carregando, setCarregando] = React.useState(false)
	const [dataCaixa, setDataCaixa] = React.useState(null)
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
					<FormCaixa

						{...data}
						carregando={false}
						dataCaixaChoice={dataCaixa}
						setAtualizarCaixa={setCadastrarCaixa}
						atualizarCaixa={cadastrarCaixa}
						showModalCriarCaixa={showModalCriarCaixa}
						setShowModalCriarCaixa={setShowModalCaixa}
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
				title={'Cadastrar caixa'}
				size="lg"
				dialogClassName={''}
				aria-labelledby={'aria-labelledby'}
				labelCanelar="Fechar"
				show={showModalCriarCaixa}
				showHide={() => { setShowModalCaixa(false); setCadastrarCaixa(false); }}
				propsConcluir={{ 'disabled': carregando }}
				labelConcluir={carregando ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
			/>

		</>
	)
}

export default Cadastrar;