import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, RCA_ONE_GET } from '../../../api/endpoints/geral.js'
import { UserContex } from '../../../Context/UserContex.js'
import FormExcluirVendedor from '../FormExcluirVendedor/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import { Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2'

const Excluir = ({ idVendedor, setIdVendedor, callback, cancelarVendedor, setExcluirVendedor }) => {
	const [showModalExcluirVendedor, setShowModalExcluirVendedor] = React.useState(false)
	const [dataVendedor, setDataVendedor] = React.useState(null)
	const { getToken, dataUser } = React.useContext(UserContex);
	const { data, error, request, loading } = useFetch();

	React.useEffect(() => {

		const getVendedor = async () => {
			if (idVendedor > 0) {
				const { url, options } = RCA_ONE_GET(idVendedor, getToken());
				const { response, json } = await request(url, options);

				if (json) {
					console.log(json)
					setDataVendedor(json)
					setShowModalExcluirVendedor(true)

				} else {
					setDataVendedor([])
					setIdVendedor(null)
				}
			}
		}

		getVendedor();

	}, [idVendedor])

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
			{!dataVendedor &&
				<Modal noBtnExcluir={true} noBtnConcluir={true} handleConcluir={() => null} title={'Excluir vendedor'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalExcluirVendedor} showHide={() => { setShowModalExcluirVendedor(); }}>
					<Load />
				</Modal>
			}

			{dataVendedor &&
				<FormExcluirVendedor setIdVendedor={setIdVendedor} idVendedor={idVendedor} carregando={false} dataVendedorChoice={dataVendedor} setExcluirVendedor={setExcluirVendedor} cancelarVendedor={cancelarVendedor} showModalExcluirVendedor={showModalExcluirVendedor} setShowModalExcluirVendedor={setShowModalExcluirVendedor} callback={callback} />
			}
		</>
	)
}

export default Excluir;