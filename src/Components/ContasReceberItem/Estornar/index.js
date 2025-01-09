import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST, CONTAS_RECEBER_ONE_GET } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import EstornarContasReceberItemForm from './EstornarContasReceberItemForm.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Estornar = ({ idContasReceberItem, setIdContasReceberItem, callback, atualizarContasReceberItem, setAtualizarContasReceberItem, cadastrarContasReceberItem, setEstornarContasReceberItem }) => {


	const [showModalAtualizarContasReceberItem, setShowModalAtualizarContasReceberItem] = React.useState(false)

	const [showModalEstornarContasReceberItem, setShowModalEstornarContasReceberItem] = React.useState(false)
	const [carregando, setCarregando] = React.useState(false)
	const [dataContasReceberItem, setDataContasReceberItem] = React.useState(null)
	const [dataGrupo, setDataGrupo] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);

	const { data, error, request, loading } = useFetch();
	React.useEffect(() => {



		const getContasReceberItem = async () => {
			if (idContasReceberItem > 0) {
				const { url, options } = CONTAS_RECEBER_ONE_GET(idContasReceberItem, getToken());
				const { response, json } = await request(url, options);
				if (json) {

					setDataContasReceberItem(json)
					setShowModalEstornarContasReceberItem(true)

				} else {
					setDataContasReceberItem([])
				}
			}
		}

		getContasReceberItem();


	}, [idContasReceberItem])

	/*
		atualizarContasReceberItem && 
				<Atualizar setCarregandoDadosContasReceberItem={null} atualizarContasReceberItem={setAtualizarContasReceberItem} idContasReceberItem={clientChoice} setDataContasReceberItem={null} setShowModalCriarContasReceberItem={setShowModalAtualizarContasReceberItem} />
	*/
	//<Pesquisar idContasReceberItem={idContasReceberItem} setDataContasReceberItem={setDataContasReceberItem} setCarregandoDadosContasReceberItem={setCarregando} />
	return (
		<>
			{!dataContasReceberItem &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={() => null} title={'Estornar ContasReceberItem'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={showModalEstornarContasReceberItem} showHide={() => { setShowModalEstornarContasReceberItem(); }}>
					<Load />
				</Modal>
			}
			{dataContasReceberItem &&
				<EstornarContasReceberItemForm setDataContasReceberItem={setDataContasReceberItem} setIdContasReceberItem={setIdContasReceberItem} idContasReceberItem={idContasReceberItem} carregando={false} dataContasReceberItemChoice={dataContasReceberItem} setEstornarContasReceberItem={setEstornarContasReceberItem} showModalCriarContasReceberItem={showModalEstornarContasReceberItem} setShowModalCriarContasReceberItem={setShowModalEstornarContasReceberItem} callback={callback} />
			}
		</>
	)
}

export default Estornar;