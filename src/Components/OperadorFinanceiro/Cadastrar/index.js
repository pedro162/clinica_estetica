import React from 'react';
import FormOperadorFinanceiro from '../FormOperadorFinanceiro/index.js'
import { Col, Row, Button } from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cadastrar = ({ callback, cadastrarOperadorFinanceiro, setCadastrarOperadorFinanceiro }) => {

	const [showModalCriarOperadorFinanceiro, setShowModalOperadorFinanceiro] = React.useState(true)
	const [carregando, setCarregando] = React.useState(false)
	const [dataOperadorFinanceiro, setDataOperadorFinanceiro] = React.useState(null)
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
					<FormOperadorFinanceiro

						{...data}
						carregando={carregando}
						dataOperadorFinanceiroChoice={dataOperadorFinanceiro}
						setAtualizarOperadorFinanceiro={setCadastrarOperadorFinanceiro}
						atualizarOperadorFinanceiro={cadastrarOperadorFinanceiro}
						showModalCriarOperadorFinanceiro={showModalCriarOperadorFinanceiro}
						setShowModalCriarOperadorFinanceiro={setShowModalOperadorFinanceiro}
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
				title={'Cadastrar operador financeiro'}
				size="lg"
				dialogClassName={''}
				aria-labelledby={'aria-labelledby'}
				labelCanelar="Fechar"
				show={showModalCriarOperadorFinanceiro}
				showHide={() => { setShowModalOperadorFinanceiro(false); setCadastrarOperadorFinanceiro(false); }}
				propsConcluir={{ 'disabled': carregando }}
				labelConcluir={carregando ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
			/>

		</>
	)
}

export default Cadastrar;