import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CONTAS_RECEBER_ONE_GET, GRUPOS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import AtualizarForm from '../FormContasReceberItem/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import Swal from 'sweetalert2'

const Atualizar = ({ idContasReceberItem, setIdContasReceberItem, callback, atualizarContasReceberItem, setAtualizarContasReceberItem }) => {
	const [showModalAtualizarContasReceberItem, setShowModalAtualizarContasReceberItem] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataContasReceberItem, setDataContasReceberItem] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);
	const [erroValidacao, setErroValidacao] = React.useState(null)
	const [showModalErro, setShowModalErro] = React.useState(false)
	const { data, error, request, loading } = useFetch();

	React.useEffect(() => {

		const getContasReceberItem = async () => {
			if (idContasReceberItem > 0) {
				const { url, options } = CONTAS_RECEBER_ONE_GET(idContasReceberItem, getToken());
				const { response, json } = await request(url, options);

				if (json) {

					setDataContasReceberItem(json)

					let data = json?.mensagem
					let erroValidaao = validarBaixa(data);
					if (Array.isArray(erroValidaao) && erroValidaao.length > 0) {
						setShowModalErro(true)
						erroValidaao = erroValidaao.join('<br/>')
						setErroValidacao(erroValidaao)

						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: erroValidaao,
							footer: '',
							confirmButtonColor: "#07B201",
						});
					} else {
						setDataContasReceberItem(json)
						setShowModalAtualizarContasReceberItem(true)
					}
				} else {
					setDataContasReceberItem([])
				}
			}
		}

		getContasReceberItem();

	}, [idContasReceberItem])

	const validarBaixa = (data) => {
		let erros = [];

		let { vrLiquido, vrPago, status, id } = data;
		vrLiquido = Number(vrLiquido)
		vrPago = Number(vrPago)
		let difAberto = vrLiquido - vrPago
		let difAbertoAbs = Math.abs(difAberto);

		if (!(String(status) == 'aberto')) {
			erros.push(`O contas a receber de código n° ${id} encontra-se ${status} e não poderá ser modificado`);
		}

		return erros;
	}

	return (
		<>
			{!dataContasReceberItem &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Atualizar ContasReceberItem'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarContasReceberItem} showHide={() => { setShowModalAtualizarContasReceberItem(); }}>
					<Load />
				</Modal>
			}

			{dataContasReceberItem &&
				<AtualizarForm setDataContasReceberItem={setDataContasReceberItem} setIdContasReceberItem={setIdContasReceberItem} idContasReceberItem={idContasReceberItem} carregando={false} dataContasReceberItemChoice={dataContasReceberItem} setAtualizarContasReceberItem={setAtualizarContasReceberItem} atualizarContasReceberItem={atualizarContasReceberItem} showModalCriarContasReceberItem={showModalAtualizarContasReceberItem} setShowModalCriarContasReceberItem={setShowModalAtualizarContasReceberItem} callback={callback} />
			}
		</>
	)
}

export default Atualizar;