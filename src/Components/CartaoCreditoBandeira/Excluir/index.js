import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { BANDEIRA_CARTAO_ONE_GET } from '../Routes/index.js'
import { UserContex } from '../../../Context/UserContex.js'
import FormExcluirCartaoCreditoBandeira from '../FormExcluirCartaoCreditoBandeira/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2'

const Excluir = ({ idCartaoCreditoBandeira, setIdCartaoCreditoBandeira, callback, cancelarCartaoCreditoBandeira, setExcluirCartaoCreditoBandeira }) => {
	const [showModalExcluirCartaoCreditoBandeira, setShowModalExcluirCartaoCreditoBandeira] = React.useState(false)
	const [dataCartaoCreditoBandeira, setDataCartaoCreditoBandeira] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);
	const { data, error, request, loading } = useFetch();

	React.useEffect(() => {

		const getCartaoCreditoBandeira = async () => {
			if (idCartaoCreditoBandeira > 0) {
				const { url, options } = BANDEIRA_CARTAO_ONE_GET(idCartaoCreditoBandeira, getToken());
				const { response, json } = await request(url, options);

				if (json) {
					setDataCartaoCreditoBandeira(json)
					setShowModalExcluirCartaoCreditoBandeira(true)

				} else {
					setDataCartaoCreditoBandeira([])
					setIdCartaoCreditoBandeira(null)
				}
			}
		}

		getCartaoCreditoBandeira();

	}, [idCartaoCreditoBandeira])

	if (error) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: error,
			footer: '',
			confirmButtonColor: "#07B201",
			//width:'20rem',
		});
	}

	return (
		<>
			{!dataCartaoCreditoBandeira &&
				<Modal noBtnExcluir={true} noBtnConcluir={true} handleConcluir={() => null} title={'Excluir operador financeiro'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalExcluirCartaoCreditoBandeira} showHide={() => { setShowModalExcluirCartaoCreditoBandeira(); }}>
					<Load />
				</Modal>
			}

			{dataCartaoCreditoBandeira &&
				<FormExcluirCartaoCreditoBandeira setIdCartaoCreditoBandeira={setIdCartaoCreditoBandeira} idCartaoCreditoBandeira={idCartaoCreditoBandeira} carregando={false} dataCartaoCreditoBandeiraChoice={dataCartaoCreditoBandeira} setExcluirCartaoCreditoBandeira={setExcluirCartaoCreditoBandeira} cancelarCartaoCreditoBandeira={cancelarCartaoCreditoBandeira} showModalExcluirCartaoCreditoBandeira={showModalExcluirCartaoCreditoBandeira} setShowModalExcluirCartaoCreditoBandeira={setShowModalExcluirCartaoCreditoBandeira} callback={callback} />
			}
		</>
	)
}

export default Excluir;