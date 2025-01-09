import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import FormContasReceber from '../FormContasReceber/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({ idContasReceber, setIdContasReceber, callback, atualizarContasReceber, setAtualizarContasReceber, cadastrarContasReceber, setCadastrarContasReceber }) => {
	const [showModalAtualizarContasReceber, setShowModalAtualizarContasReceber] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataContasReceber, setDataContasReceber] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);
	const { data, error, request, loading } = useFetch();

	React.useEffect(() => {

		const getGrupo = async () => {
			const { url, options } = GRUPOS_ALL_POST({}, getToken());
			const { response, json } = await request(url, options);

			if (json) {
				setDataGrupo(json)
				setShowModalAtualizarContasReceber(true)
			} else {
				setDataGrupo(null)
			}
		}

		if (cadastrarContasReceber == true) {
			getGrupo();
		}

	}, [cadastrarContasReceber])

	return (
		<>
			{!dataGrupo &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Cadastrar ContasReceber'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarContasReceber} showHide={() => { setShowModalAtualizarContasReceber(); }}>
					<Load />
				</Modal>
			}
			{dataGrupo &&
				<FormContasReceber dataGrupo={dataGrupo} setIdContasReceber={setIdContasReceber} idContasReceber={idContasReceber} carregando={false} dataContasReceberChoice={dataContasReceber} setAtualizarContasReceber={setAtualizarContasReceber} atualizarContasReceber={atualizarContasReceber} showModalCriarContasReceber={showModalAtualizarContasReceber} setShowModalCriarContasReceber={() => { setShowModalAtualizarContasReceber(); setCadastrarContasReceber() }} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;