import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import { Col, Row, Tabs, Tab } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormContasReceber.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import Swal from 'sweetalert2'//https://sweetalert2.github.io/#examples
import * as Yup from 'yup';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, FORMA_PAGAMENTOALL_POST, OPERADOR_FINANCEIROALL_POST, PLANO_PAGAMENTOALL_POST, SERVICO_SAVE_POST, FILIAIS_ALL_POST, ORDEM_SERVICO_FINALIZAR_POST, CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, CONTAS_RECEBER_UPDATE_POST, CONTAS_RECEBER_SAVE_POST, CAIXA_ALL_POST } from '../../../api/endpoints/geral.js'
import Caixa from '../../Caixa/index.js';
import Clientes from '../../Clientes/index.js';

const FormContasReceber = ({ dataContasReceberChoice, setDataContasReceber, setIdContasReceber, idContasReceber, showModalCriarContasReceber, setShowModalCriarContasReceber, callback, atualizarContasReceber, setAtualizarContasReceber, carregando }) => {

	const { data, error, request, loading } = useFetch();
	const dataRequest = useFetch();
	const { getToken, dataUser } = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] = React.useState([])
	const [dataItens, setDataitens] = React.useState([])
	const [dataFormaPagamento, setDataFormaPagamento] = React.useState([])
	const [dataPlanoPagamento, setDataPlanoPagamento] = React.useState([])
	const [dataOperadorFinanceiro, setDataOperadorFinanceiro] = React.useState([])
	const [dataFormaPagamentoEscolhido, setDataFormaPagamentoEscolhido] = React.useState([])
	const [idFormaPagamentoForm, setIdFormaPagamentoForm] = React.useState(0)
	const [vrCobrancaForm, setVrCobrancaForm] = React.useState(0)
	const [idPlanoPagamentoForm, setIdPlanoPagamentoForm] = React.useState(0)
	const [idOperadorFinanceiroForm, setIdOperadorFinanceiroForm] = React.useState(0)
	const [idFilialForm, setIdFilialForm] = React.useState(0)
	const [nrDocForm, setNrDocForm] = React.useState('')
	const [idPessoaForm, setIdPessoaForm] = React.useState(0)
	const [idCaixaForm, setIdCaixaForm] = React.useState(0)

	const sendData = async ({
		...params
	}) => {

		const data = {
			...params,
			vrBruto: params?.vrLiquido
		}

		let data_config = {}

		if (idContasReceber && idContasReceber > 0) {
			data_config = CONTAS_RECEBER_UPDATE_POST(idContasReceber, data, getToken());
		} else {
			data_config = CONTAS_RECEBER_SAVE_POST(data, getToken());
		}

		const { url, options } = data_config;
		const { response, json } = await request(url, options);

		if (json || !error) {
			callback();
			setShowModalCriarContasReceber();
			setAtualizarContasReceber(false);
			setIdContasReceber(null);

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

		const { url, options } = FILIAIS_ALL_POST({}, getToken());
		const { response, json } = await dataRequest.request(url, options);

		if (json) {
			setDataFiliais(json)
		} else {

			setDataFiliais([]);
		}
	}

	const dataToFormContasReceber = React.useMemo(() => {
		let obj = { filial_id: '', vrLiquido: '', descricao: '', documento: '', dsArquivo: '', pessoa_id: '', pessoa_name: '', pessoa_rca_id: '', forma_pagamento_id: '', plano_pagamento_id: '', operador_financeiro_id: '', active: '', deleted_at: '', created_at: '', updated_at: '' }

		if (dataContasReceberChoice) {

			let data = dataContasReceberChoice

			if (data?.mensagem) {
				data = data?.mensagem
			} else if (data?.data) {
				data = data?.data
			}

			if (data.hasOwnProperty('filial_id')) {
				obj.filial_id = data.filial_id;
			}

			if (data.hasOwnProperty('vrLiquido')) {
				obj.vrLiquido = data.vrLiquido;
			}

			if (data.hasOwnProperty('status')) {
				obj.status = data.status;
			}

			if (data.hasOwnProperty('descricao')) {
				obj.descricao = data.descricao;
			}

			if (data.hasOwnProperty('documento')) {
				obj.documento = data.documento;
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

			if (data.hasOwnProperty('forma_pagamento_id')) {
				obj.forma_pagamento_id = data.forma_pagamento_id;
			}

			if (data.hasOwnProperty('operador_financeiro_id')) {
				obj.operador_financeiro_id = data.operador_financeiro_id;
			}

			if (data.hasOwnProperty('plano_pagamento_id')) {
				obj.plano_pagamento_id = data.plano_pagamento_id;
			}

		}

		if (idPessoaForm > 0) {
			obj.pessoa_id = idPessoaForm;
		}

		if (idFilialForm > 0) {
			obj.filial_id = idFilialForm;
		}

		return obj;
	}, [dataContasReceberChoice, idPessoaForm, idFilialForm])

	const preparaFilialToForm = React.useMemo(() => {
		if (dataFiliais.hasOwnProperty('mensagem') && Array.isArray(dataFiliais.mensagem) && dataFiliais.mensagem.length > 0) {
			let filiais = dataFiliais.mensagem.map(({ id, name_filial }, index, arr) => ({ label: name_filial, valor: id, props: {} }))
			filiais.unshift({ label: 'Selecione...', valor: '', props: { selected: 'selected', disabled: 'disabled' } })

			return filiais;
		}

		return []
	}, [dataFiliais])

	const getFormaPagamentoAll = async () => {

		const { url, options } = FORMA_PAGAMENTOALL_POST({}, getToken());
		const { response, json } = await dataRequest.request(url, options);

		if (json) {

			if (json && json.hasOwnProperty('mensagem')) {
				let data = json.mensagem;
				setDataFormaPagamento(data)
			}else if(json && json.hasOwnProperty('data')){
				let data = json.data?.data;
				setDataFormaPagamento(data)
			} else {
				setDataFormaPagamento([])
			}

		} else {
			setDataFormaPagamento([])
		}
	}

	const getPlanoPagamentoAll = async () => {
		if (!(idFormaPagamentoForm > 0)) {
			setDataPlanoPagamento([])
			return false;
		}

		const { url, options } = PLANO_PAGAMENTOALL_POST({ forma_pagamento_id: idFormaPagamentoForm }, getToken());
		const { response, json } = await dataRequest.request(url, options);

		if (json) {

			if (json && json.hasOwnProperty('mensagem')) {
				let data = json.mensagem;
				setDataPlanoPagamento(data)
			}else if(json && json.hasOwnProperty('data')){
				let data = json.data?.data;
				setDataPlanoPagamento(data)
			}else {
				setDataPlanoPagamento([])
			}

		} else {
			setDataPlanoPagamento([])
		}
	}

	const getOperadorFinanceiroAll = async () => {
		if (!(idFormaPagamentoForm > 0)) {
			setDataOperadorFinanceiro([])
			return false;
		}

		const { url, options } = OPERADOR_FINANCEIROALL_POST({ forma_pagamento_id: idFormaPagamentoForm }, getToken());
		const { response, json } = await dataRequest.request(url, options);

		if (json) {

			if (json && json.hasOwnProperty('mensagem')) {
				let data = json.mensagem;
				setDataOperadorFinanceiro(data)
			}else if(json && json.hasOwnProperty('data')){
				let data = json.data?.data;
				setDataOperadorFinanceiro(data)
			} else {
				setDataOperadorFinanceiro([])
			}

		} else {
			setDataOperadorFinanceiro([])
		}
	}

	const preparaFormaPagamentoToForm = React.useMemo(() => {
		if (dataFormaPagamento && Array.isArray(dataFormaPagamento) && dataFormaPagamento.length > 0) {
			let formaPgto = dataFormaPagamento.map(({ id, name }, index, arr) => ({ label: name, valor: id, props: {} }))
			formaPgto.unshift({ label: 'Selecione...', valor: '0', props: { selected: 'selected', } })
			return formaPgto;
		}

		return []
	}, [dataFormaPagamento])

	const preparaPlanoPagamentoToForm = () => {
		if (dataPlanoPagamento && Array.isArray(dataPlanoPagamento) && dataPlanoPagamento.length > 0) {
			let formaPgto = dataPlanoPagamento.map(({ id, name }, index, arr) => ({ label: name, valor: id, props: {} }))
			formaPgto.unshift({ label: 'Selecione...', valor: '', props: { selected: 'selected', } })
			return formaPgto;
		}

		return []
	}

	const preparaOperadorFinanceiroToForm = () => {
		if (dataOperadorFinanceiro && Array.isArray(dataOperadorFinanceiro) && dataOperadorFinanceiro.length > 0) {
			let formaPgto = dataOperadorFinanceiro.map(({ id, name }, index, arr) => ({ label: name, valor: id, props: {} }))
			formaPgto.unshift({ label: 'Selecione...', valor: '', props: { selected: 'selected', } })
			return formaPgto;
		}

		return []
	}

	React.useEffect(() => {
		getFormaPagamentoAll();
	}, []);

	React.useEffect(() => {
		getOperadorFinanceiroAll()
		getPlanoPagamentoAll();
		setDataFormaPagamentoEscolhido({ ...dataFormaPagamentoEscolhido })
	}, [idFormaPagamentoForm]);


	React.useEffect(() => {

		if (dataContasReceberChoice && dataContasReceberChoice.hasOwnProperty('mensagem')) {
			let data = dataContasReceberChoice.mensagem;
			setDataitens(data?.item)
		}

	}, [])

	React.useEffect(() => {
		const requesFiliais = async () => {
			await requestAllFiliais();
		}

		requesFiliais();

	}, []);

	const validationSchema = Yup.object({
		filial_id: Yup.string().required('Filial é obrigatório'),
		pessoa_id: Yup.string().required('O campo pessoa é obrigatório'),
	});

	return (

		<>
			<Formik

				initialValues={{ ...dataToFormContasReceber }}
				enableReinitialize={true}
				validate={
					values => {

						const errors = {}

						if (!values.descricao) {
							errors.descricao = "Obrigatório"
						}

						if (!values.filial_id) {
							errors.filial_id = "Obrigatório"
						}

						if (!values.pessoa_id) {
							errors.pessoa_id = "Obrigatório"
						}

						if (!values.vrLiquido) {
							errors.vrLiquido = "Obrigatório"
						}

						if (!values.forma_pagamento_id) {
							errors.forma_pagamento_id = "Obrigatório"
						}

						if (!values.plano_pagamento_id) {
							errors.plano_pagamento_id = "Obrigatório"
						}

						if (!values.operador_financeiro_id) {
							errors.operador_financeiro_id = "Obrigatório"
						}

						if (!values.documento) {
							//errors.documento="Obrigatório"    			
						}

						return errors;
					}
				}

				onSubmit={async (values, { setSubmitting }) => {

					await sendData({ ...values });
				}}
				validationSchema={validationSchema}
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

						<Modal
							bottomButtons={null}
							handleConcluir={() => { handleSubmit(); }}
							title={(atualizarContasReceber == true ? 'Atualizar' : 'Cadastrar') + ' Contas a Receber'}
							size="lg"
							propsConcluir={{ 'disabled': loading }}
							labelConcluir={loading ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
							dialogClassName={''}
							aria-labelledby={'aria-labelledby'}
							labelCanelar="Fechar"
							show={showModalCriarContasReceber}
							showHide={() => { setShowModalCriarContasReceber(); setAtualizarContasReceber(false); setIdContasReceber(null); }}
						>
							{

								carregando && carregando == true
									?
									(<Load />)
									:
									(
										<form onSubmit={handleSubmit}>
											<Col xs="12" sm="12" md="12">
												<span className="label_title_grup_forms">Dados básicos</span>
												<hr />
											</Col>

											{
												error && <Row className="my-3">
													<Col xs="12" sm="12" md="12">
														<AlertaDismissible title="Atenção:" message={error} variant={"danger"} />
													</Col>
												</Row>
											}
											{!(idContasReceber && idContasReceber > 0) &&
												(
													<>
														<Row className="mb-3">
															<Col xs="12" sm="12" md="6">
																<Field
																	data={
																		{
																			hasLabel: true,
																			contentLabel: 'Filial *',
																			atributsFormLabel: {//setIdFilialForm

																			},
																			atributsFormControl: {
																				type: 'text',
																				name: 'filial_id',
																				placeholder: 'Filial',
																				id: 'filial_id',
																				onChange: (ev) => { setIdFilialForm(ev.target.value); handleChange(ev) },
																				onBlur: (ev) => { setIdFilialForm(ev.target.value); handleBlur(ev) },
																				value: values.filial_id,
																				className: estilos.input,
																				size: "sm"
																			},
																			options: preparaFilialToForm,
																			atributsContainer: {
																				className: ''
																			}
																		}
																	}

																	component={FormControlSelect}
																></Field>
																<ErrorMessage className="alerta_error_form_label" name="filial_id" component="div" />
															</Col>

															<Col xs="12" sm="12" md="6">
																<Field
																	data={
																		{
																			hasLabel: true,
																			contentLabel: 'Pessoa *',
																			atributsFormLabel: {

																			},
																			atributsFormControl: {
																				type: 'text',
																				name: 'pessoa_id',
																				placeholder: 'Ex: fulano de tal',
																				id: 'pessoa_id',
																				name_cod: 'pessoa_id',
																				name_desacription: 'pessoa_name',
																				onChange: handleChange,
																				onBlur: handleBlur,
																				value: values.pessoa_id,
																				className: `${estilos.input}`,
																				size: "sm"
																			},
																			atributsContainer: {
																				className: ''
																			},
																			hookToLoadFromDescription: CLIENTES_ALL_POST,
																			callbackDataItemChoice: (param) => {
																				let { label, value } = param

																				setIdPessoaForm(value)
																			}
																		}
																	}
																	ComponentFilter={Clientes}
																	componentTitle={'Escolha uma pessoa'}
																	component={Required}
																>   </Field>
																<ErrorMessage className="alerta_error_form_label" name="pessoa_id" component="div" />
															</Col>
														</Row>

														<Row className="mb-3">

															<Col xs="12" sm="12" md="6">
																<Field
																	data={
																		{
																			hasLabel: true,
																			contentLabel: 'Caixa para baixa',
																			atributsFormLabel: {

																			},
																			atributsFormControl: {
																				type: 'text',
																				name: 'caixa_id',
																				placeholder: 'Caixa para baixa',
																				id: 'caixa_id',
																				name_cod: 'caixa_id',
																				name_desacription: 'caixa_name',
																				onChange: handleChange,
																				onBlur: handleBlur,
																				value: values.caixa_id,
																				className: `${estilos.input}`,
																				size: "sm"
																			},
																			atributsContainer: {
																				className: ''
																			},
																			hookToLoadFromDescription: CAIXA_ALL_POST,
																		}
																	}
																	ComponentFilter={Caixa}
																	componentTitle={'Escolha um caixa'}
																	component={Required}
																>   </Field>
																<ErrorMessage className="alerta_error_form_label" name="caixa_id" component="div" />
															</Col>

															<Col xs="12" sm="12" md="6">
																<Field
																	data={
																		{
																			hasLabel: true,
																			contentLabel: 'Valor *',
																			atributsFormLabel: {

																			},
																			atributsFormControl: {
																				type: 'text',
																				name: 'vrLiquido',
																				placeholder: '0,00',
																				id: 'vrLiquido',
																				name_cod: 'vrLiquido',
																				name_desacription: 'vrLiquido',
																				onChange: handleChange,
																				onBlur: handleBlur,
																				value: values.vrLiquido,
																				className: `${estilos.input}`,
																				size: "sm",
																			},
																			atributsContainer: {
																				className: ''
																			},
																		}
																	}
																	component={FormControlInput}
																>   </Field>
																<ErrorMessage className="alerta_error_form_label" name="vrLiquido" component="div" />
															</Col>
														</Row>

														<Row className="mb-3">
															<Col xs="12" sm="12" md="6">
																<Field
																	data={
																		{
																			hasLabel: true,
																			contentLabel: 'Forma de pagamento *',
																			atributsFormLabel: {

																			},
																			atributsFormControl: {
																				type: 'text',
																				name: 'forma_pagamento_id',
																				placeholder: 'Forma de pagament',
																				id: 'forma_pagamento_id',
																				onChange: (ev) => { setIdFormaPagamentoForm(ev.target.value); handleChange(ev) },
																				onBlur: (ev) => { setIdFormaPagamentoForm(ev.target.value); handleBlur(ev) },
																				value: values.forma_pagamento_id,
																				className: estilos.input,
																				size: "sm",
																			},
																			options: preparaFormaPagamentoToForm,
																			atributsContainer: {
																				className: ''
																			}
																		}
																	}

																	component={FormControlSelect}
																></Field>
																<ErrorMessage className="alerta_error_form_label" name="forma_pagamento_id" component="div" />
															</Col>

															<Col xs="12" sm="12" md="6">
																<Field
																	data={
																		{
																			hasLabel: true,
																			contentLabel: 'Plano de pagamento *',
																			atributsFormLabel: {

																			},
																			atributsFormControl: {
																				type: 'text',
																				name: 'plano_pagamento_id',
																				placeholder: 'Plano de pagament',
																				id: 'plano_pagamento_id',
																				onChange: handleChange,
																				onBlur: handleBlur,
																				value: values.plano_pagamento_id,
																				className: estilos.input,
																				size: "sm"
																			},
																			options: preparaPlanoPagamentoToForm(),
																			atributsContainer: {
																				className: ''
																			}
																		}
																	}

																	component={FormControlSelect}
																></Field>
																<ErrorMessage className="alerta_error_form_label" name="plano_pagamento_id" component="div" />

															</Col>
														</Row>

														<Row className="mb-3">

															<Col xs="12" sm="12" md="6">
																<Field
																	data={
																		{
																			hasLabel: true,
																			contentLabel: 'Agente financeiro',
																			atributsFormLabel: {

																			},
																			atributsFormControl: {
																				type: 'text',
																				name: 'operador_financeiro_id',
																				placeholder: 'Plano de pagament',
																				id: 'operador_financeiro_id',
																				onChange: handleChange,
																				onBlur: handleBlur,
																				value: values.operador_financeiro_id,
																				className: estilos.input,
																				size: "sm"
																			},
																			options: preparaOperadorFinanceiroToForm(),
																			atributsContainer: {
																				className: ''
																			}
																		}
																	}

																	component={FormControlSelect}
																></Field>
																<ErrorMessage className="alerta_error_form_label" name="operador_financeiro_id" component="div" />
															</Col>

															<Col xs="12" sm="12" md="6">
																<Field
																	data={
																		{
																			hasLabel: true,
																			contentLabel: 'Nº documento',
																			atributsFormLabel: {

																			},
																			atributsFormControl: {
																				type: 'text',
																				name: 'documento',
																				placeholder: 'Nº documento',
																				id: 'documento',
																				name_cod: 'documento',
																				name_desacription: 'documento',
																				onChange: handleChange,
																				onBlur: handleBlur,
																				value: values.documento,
																				className: `${estilos.input}`,
																				size: "sm",
																			},
																			atributsContainer: {
																				className: ''
																			},
																		}
																	}
																	component={FormControlInput}
																>   </Field>
																<ErrorMessage className="alerta_error_form_label" name="documento" component="div" />
															</Col>
														</Row>
														<Row className="mb-3">
															<Col xs="12" sm="12" md="6">
																<Field
																	data={
																		{
																			hasLabel: true,
																			contentLabel: 'Data de competência *',
																			atributsFormLabel: {

																			},
																			atributsFormControl: {
																				type: 'date',
																				name: 'dt_competencia',
																				placeholder: '0,00',
																				id: 'dt_competencia',
																				name_cod: 'dt_competencia',
																				name_desacription: 'dt_competencia',
																				onChange: handleChange,
																				onBlur: handleBlur,
																				value: values.dt_competencia,
																				className: `${estilos.input}`,
																				size: "sm",
																			},
																			atributsContainer: {
																				className: ''
																			},
																		}
																	}
																	component={FormControlInput}
																>   </Field>
																<ErrorMessage className="alerta_error_form_label" name="dt_competencia" component="div" />
															</Col>

															<Col xs="12" sm="12" md="6">
																<Field
																	data={
																		{
																			hasLabel: true,
																			contentLabel: 'Data de pagamento',
																			atributsFormLabel: {

																			},
																			atributsFormControl: {
																				type: 'date',
																				name: 'dt_pagamento',
																				placeholder: '0,00',
																				id: 'dt_pagamento',
																				name_cod: 'dt_pagamento',
																				name_desacription: 'dt_pagamento',
																				onChange: handleChange,
																				onBlur: handleBlur,
																				value: values.dt_pagamento,
																				className: `${estilos.input}`,
																				size: "sm",
																			},
																			atributsContainer: {
																				className: ''
																			},
																		}
																	}
																	component={FormControlInput}
																>   </Field>
																<ErrorMessage className="alerta_error_form_label" name="dt_pagamento" component="div" />
															</Col>

														</Row>
													</>
												)

											}

											<Row className="mb-3">
												<Col xs="12" sm="12" md="12">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Histórico *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'descricao',
																	placeholder: 'Histórico',
																	id: 'descricao',
																	name_cod: 'descricao',
																	name_desacription: 'descricao',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.descricao,
																	className: `${estilos.input}`,
																	size: "sm",
																},
																atributsContainer: {
																	className: ''
																},
															}
														}
														component={FormControlInput}
													>   </Field>
													<ErrorMessage className="alerta_error_form_label" name="descricao" component="div" />
												</Col>

											</Row>
										</form>
									)
							}

						</Modal>
					)
				}
			</Formik>
		</>
	)
}

export default FormContasReceber;
