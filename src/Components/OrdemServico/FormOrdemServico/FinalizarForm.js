import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import { Table as TableBootstrap } from 'react-bootstrap';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import { Col, Row, Tabs, Tab } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormOrdemServico.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import FormOrdemServicoItens from '../FormOrdemServicoItens/index.js'
import FormOrdemServicoCobrancas from '../FormOrdemServicoCobrancas/index.js'
import { FORMAT_CALC_COD, FORMAT_MONEY } from '../../../functions/index.js'
import Swal from 'sweetalert2'
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, SERVICO_SAVE_POST, SERVICO_ALL_POST, ORDEM_SERVICO_FINALIZAR_PROCEDIMENTO_POST, CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST } from '../../../api/endpoints/geral.js'
import Details from '../Visualizar/details.js';

const FinalizarForm = ({ dataOrdemServicoChoice, setDataOrdemServico, setIdOrdemServico, idOrdemServico, showModalCriarOrdemServico, setShowModalCriarOrdemServico, callback, FinalizarOrdemServico, setFinalizarOrdemServico, carregando }) => {

	const { data, error, request, loading } = useFetch();
	const dataRequest = useFetch();
	const { getToken, dataUser } = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] = React.useState([])
	const [dataItens, setDataitens] = React.useState([])
	const [qtdAtualizaCobrancas, setQtdAtualizaCobrancas] = React.useState(0)

	const sendData = async ({
		status
	}) => {

		const data = {
			status
		}

		const { url, options } = ORDEM_SERVICO_FINALIZAR_PROCEDIMENTO_POST(idOrdemServico, data, getToken());
		const { response, json } = await request(url, options);

		if (json) {
			callback && callback();
			setShowModalCriarOrdemServico && setShowModalCriarOrdemServico();
			setFinalizarOrdemServico && setFinalizarOrdemServico(false);
			setIdOrdemServico && setIdOrdemServico(null);

			Swal.fire({
				icon: "success",
				title: "",
				text: 'Registrado com sucesso',
				footer: '',
				confirmButtonColor: "#07B201",
			});
		}
	}

	const requestAllFiliais = async () => {
		const { url, options } = SERVICO_ALL_POST({}, getToken());
		const { response, json } = await dataRequest.request(url, options);

		if (json) {
			setDataFiliais(json)
		} else {
			setDataFiliais([]);
		}
	}

	const dataToFormOrdemServico = () => {
		let obj = {
			id: '', filial_id: '', vrTotal: '',
			status: '', observacao: '', dsArquivo: '', pessoa_id: '',
			pessoa_rca_id: '', filial_id: '', user_id: '', user_update_id: '',
			active: '', deleted_at: '', created_at: '', updated_at: '', vr_final: '',
			vr_desconto: '', pct_acrescimo: '', vr_acrescimo: '', profissional_id: '',
			pct_desconto: '', pessoa: {}, rca: {}, profissional: {},
		}

		let data = dataOrdemServicoChoice

		if (data?.mensagem) {
			data = data?.mensagem;
		}

		if (data?.registro) {
			data = data?.registro;
		}

		if (data?.data) {
			data = data?.data;
		}

		if (data?.data) {
			data = data?.data;
		}

		if (data && data.hasOwnProperty('id')) {

			if (data.hasOwnProperty('id')) {
				obj.id = data.id;
			}

			if (data.hasOwnProperty('filial_id')) {
				obj.filial_id = data.filial_id;
			}

			if (data.hasOwnProperty('vrTotal')) {
				obj.vrTotal = data.vrTotal;
			}

			if (data.hasOwnProperty('status')) {
				obj.status = data.status;
			}

			if (data.hasOwnProperty('observacao')) {
				obj.observacao = data.observacao;
			}

			if (data.hasOwnProperty('dsArquivo')) {
				obj.dsArquivo = data.dsArquivo;
			}

			if (data.hasOwnProperty('pessoa_id')) {
				obj.pessoa_id = data.pessoa_id;
			}

			if (data.hasOwnProperty('pessoa_rca_id')) {
				obj.pessoa_rca_id = data.pessoa_rca_id;
			}

			if (data.hasOwnProperty('vr_final')) {
				obj.vr_final = data.vr_final;
			}

			if (data.hasOwnProperty('vr_desconto')) {
				obj.vr_desconto = data.vr_desconto;
			}

			if (data.hasOwnProperty('pct_acrescimo')) {
				obj.pct_acrescimo = data.pct_acrescimo;
			}

			if (data.hasOwnProperty('vr_acrescimo')) {
				obj.vr_acrescimo = data.vr_acrescimo;
			}

			if (data.hasOwnProperty('profissional_id')) {
				obj.profissional_id = data.profissional_id;
			}

			if (data.hasOwnProperty('pct_desconto')) {
				obj.pct_desconto = data.pct_desconto;
			}

			if (data.hasOwnProperty('pessoa')) {
				obj.pessoa = data.pessoa;
			}

			if (data.hasOwnProperty('rca')) {
				obj.rca = data.rca;
			}

			if (data.hasOwnProperty('profissional')) {
				obj.profissional = data.profissional;
			}
		}

		return obj;
	}

	if (error) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: error,
			footer: '',
			confirmButtonColor: "#07B201",
		});
	}

	const FormModal = () => {
		return (
			<Row>
				<Col>
					<Details
						{...data}
						dataOrdemServicoChoice={dataOrdemServicoChoice}
					/>
				</Col>
			</Row>
		)
	}

	return (
		<>
			<Formik
				initialValues={{ ...dataToFormOrdemServico() }}
				enableReinitialize={true}
				validate={
					values => {

						const errors = {}
						return errors;
					}
				}

				onSubmit={async (values, { setSubmitting }) => {
					await sendData({ ...values });
				}}
			>
				{
					(
						{
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting
						}
					) => (

						<Modal handleConcluir={() => { handleSubmit(); }} title={'Finalizar Ordem de Servico'} size="xs" dialogClassName={'modal-90w modal-os-fullscreen-mobile'} propsConcluir={{ 'disabled': loading }} labelConcluir={loading ? 'Salvando...' : 'Concluir'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarOrdemServico} showHide={() => { setShowModalCriarOrdemServico(); setFinalizarOrdemServico(false); setIdOrdemServico(null); }}>
							{
								carregando && carregando == true
									?
									(<Load />)
									:
									(
										<FormModal />
									)
							}

						</Modal>
					)
				}
			</Formik>
		</>
	)
}

export default FinalizarForm;
