import React from 'react';
import FormCartaoCreditoBandeira from '../FormCartaoCreditoBandeira/index.js'
import { Col, Row, Button } from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cadastrar = ({ callback, cadastrarCartaoCreditoBandeira, setCadastrarCartaoCreditoBandeira }) => {

	const [showModalCriarCartaoCreditoBandeira, setShowModalCartaoCreditoBandeira] = React.useState(true)
	const [carregando, setCarregando] = React.useState(false)
	const [dataCartaoCreditoBandeira, setDataCartaoCreditoBandeira] = React.useState(null)
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
					<FormCartaoCreditoBandeira

						{...data}
						carregando={carregando}
						dataCartaoCreditoBandeiraChoice={dataCartaoCreditoBandeira}
						setAtualizarCartaoCreditoBandeira={setCadastrarCartaoCreditoBandeira}
						atualizarCartaoCreditoBandeira={cadastrarCartaoCreditoBandeira}
						showModalCriarCartaoCreditoBandeira={showModalCriarCartaoCreditoBandeira}
						setShowModalCriarCartaoCreditoBandeira={setShowModalCartaoCreditoBandeira}
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
				title={'Cadastrar bandeira de cartão'}
				size="lg"
				dialogClassName={''}
				aria-labelledby={'aria-labelledby'}
				labelCanelar="Fechar"
				show={showModalCriarCartaoCreditoBandeira}
				showHide={() => { setShowModalCartaoCreditoBandeira(false); setCadastrarCartaoCreditoBandeira(false); }}
				propsConcluir={{ 'disabled': carregando }}
				labelConcluir={carregando ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
			/>

		</>
	)
}

export default Cadastrar;