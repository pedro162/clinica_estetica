import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import { FORMAT_DATA_PT_BR } from '../../../functions/index.js'
import Swal from 'sweetalert2'
import { BANDEIRA_CARTAO_DELETE_POST } from './../Routes/index.js'
import Details from '../Visualizar/details.js';


const FormExcluirCartaoCreditoBandeira = ({ dataCartaoCreditoBandeiraChoice, setIdCartaoCreditoBandeira, idCartaoCreditoBandeira, showModalExcluirCartaoCreditoBandeira, setShowModalExcluirCartaoCreditoBandeira, callback, excluirCartaoCreditoBandeira, setExcluirCartaoCreditoBandeira, carregando }) => {

	const { data, error, request, loading } = useFetch();
	const dataRequest = useFetch();
	const { getToken, dataUser } = React.useContext(UserContex);
	const [dataCartaoCreditoBandeira, setDataCartaoCreditoBandeira] = React.useState([])

	const sendData = async ({
		ds_cancelamento
	}) => {

		const { url, options } = BANDEIRA_CARTAO_DELETE_POST(idCartaoCreditoBandeira, getToken());
		const { response, json } = await request(url, options);

		if (json && !error) {

			callback();
			setShowModalExcluirCartaoCreditoBandeira();
			setExcluirCartaoCreditoBandeira(false);
			setIdCartaoCreditoBandeira(null);

			Swal.fire({
				icon: "success",
				title: "",
				text: 'Registrado com sucesso',
				footer: '',
				confirmButtonColor: "#07B201",
			});
		}
	}

	const dataToFormExcluirCartaoCreditoBandeira = () => {
		let obj = { name: '', id: '', standard: 'no', active: '', deleted_at: '', created_at: '', updated_at: '' }

		if (dataCartaoCreditoBandeiraChoice) {

			let data = dataCartaoCreditoBandeiraChoice

			if (data?.mensagem) {
				data = data?.mensagem
			} else if (data?.data) {
				data = data?.data
			}

			if (data.hasOwnProperty('name')) {
				obj.name = data.name;
			}

			if (data.hasOwnProperty('id')) {
				obj.id = data.id;
			}

			if (data.hasOwnProperty('standard')) {
				obj.standard = data.standard;
			}

			if (data.hasOwnProperty('created_at')) {
				obj.created_at = FORMAT_DATA_PT_BR(data.created_at);
			}

			if (data.hasOwnProperty('active')) {
				obj.active = data.active;
			}

		}

		return obj;
	}

	const handleSubmit = () => {
		sendData({ ds_cancelamento: 'Desistiu' })
	}

	const dataPlanotCancel = dataToFormExcluirCartaoCreditoBandeira();

	if (error) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: error,
			footer: '',
			confirmButtonColor: "#07B201",
		});
	}

	return (

		<>
			<Modal handleConcluir={() => { handleSubmit(); }} title={' Excluir plano de pagamento'} size="lg" propsConcluir={{ 'disabled': loading }} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalExcluirCartaoCreditoBandeira} showHide={() => { setShowModalExcluirCartaoCreditoBandeira(); setExcluirCartaoCreditoBandeira(false); setIdCartaoCreditoBandeira(null); }}>
				{
					carregando && carregando == true
						?
						(<Load />)
						:
						(
							<>
								{
									error && <Row className="my-3">
										<Col xs="12" sm="12" md="12">
											<AlertaDismissible title="Atenção:" message={error} variant={"danger"} />
										</Col>
									</Row>
								}
								<Details
									{...dataCartaoCreditoBandeiraChoice}
									dataCartaoCreditoBandeiraChoice={dataCartaoCreditoBandeiraChoice}
								/>

							</>

						)
				}

			</Modal>
		</>
	)
}

export default FormExcluirCartaoCreditoBandeira;
