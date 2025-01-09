import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import FormContasReceberItem from '../FormContasReceberItem/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({ idContasReceberItem, setIdContasReceberItem, callback, atualizarContasReceberItem, setAtualizarContasReceberItem, cadastrarContasReceberItem, setCadastrarContasReceberItem }) => {
	const [showModalAtualizarContasReceberItem, setShowModalAtualizarContasReceberItem] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataContasReceberItem, setDataContasReceberItem] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);
	const { data, error, request, loading } = useFetch();

	React.useEffect(() => {

		const getGrupo = async () => {
			const { url, options } = GRUPOS_ALL_POST({}, getToken());
			const { response, json } = await request(url, options);

			if (json) {
				setDataGrupo(json)
				setShowModalAtualizarContasReceberItem(true)
			} else {
				setDataGrupo(null)
			}
		}
		if (cadastrarContasReceberItem == true) {
			getGrupo();
		}

	}, [cadastrarContasReceberItem])

	return (
		<>
			{!dataGrupo &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Cadastrar ContasReceberItem'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarContasReceberItem} showHide={() => { setShowModalAtualizarContasReceberItem(); }}>
					<Load />
				</Modal>
			}
			{dataGrupo &&
				<FormContasReceberItem dataGrupo={dataGrupo} setIdContasReceberItem={setIdContasReceberItem} idContasReceberItem={idContasReceberItem} carregando={false} dataContasReceberItemChoice={dataContasReceberItem} setAtualizarContasReceberItem={setAtualizarContasReceberItem} atualizarContasReceberItem={atualizarContasReceberItem} showModalCriarContasReceberItem={showModalAtualizarContasReceberItem} setShowModalCriarContasReceberItem={() => { setShowModalAtualizarContasReceberItem(); setCadastrarContasReceberItem() }} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;