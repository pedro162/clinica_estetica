import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CLIENTES_ONE_GET, PAIS_ALL_POST } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import FormPais from '../FormPais/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({ idPais, setIdPais, callback, atualizarCadastro, setAtualizarCadastro, setAtualizarPais, cadastrarPais, setCadastrarPais }) => {


	const [showModalAtualizarPais, setShowModalAtualizarPais] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataPais, setDataPais] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);

	const { data, error, request, loading } = useFetch();
	React.useEffect(() => {

		const getGrupo = async () => {
			const { url, options } = PAIS_ALL_POST({}, getToken());

			const { response, json } = await request(url, options);

			if (json) {
				setDataGrupo(json)
				setShowModalAtualizarPais(true)
			} else {
				setDataGrupo(null)
			}
		}
		if (cadastrarPais == true) {
			getGrupo();
		}


	}, [cadastrarPais])

	return (
		<>
			{!dataGrupo &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Cadastrar Pais'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarPais} showHide={() => { setShowModalAtualizarPais(); }}>
					<Load />
				</Modal>
			}
			{dataGrupo &&
				<FormPais dataGrupo={dataGrupo} setIdPais={setIdPais} idPais={idPais} carregando={false} dataPaisChoice={dataPais} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarPais={showModalAtualizarPais} setShowModalCriarPais={() => { setShowModalAtualizarPais(); setCadastrarPais() }} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;