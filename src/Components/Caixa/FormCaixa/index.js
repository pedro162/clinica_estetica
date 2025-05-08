import React, { forwardRef, useImperativeHandle } from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import { Col, Row } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormCaixa.module.css'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Swal from 'sweetalert2'
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, FILIAIS_ALL_POST, CAIXA_UPDATE_POST, CAIXA_SAVE_POST } from '../../../api/endpoints/geral.js'

const FormCaixa = forwardRef(({
	name,
	setname,
	type,
	setTipo,
	vrMin,
	setVrMinimo,
	vrMax,
	setVrMaximo,
	status_bloqueio,
	setstatus_bloqueio,
	aceita_transferencia,
	setAceitaTransferencia,
	vr_saldo_inicial,
	setVrSaldoInicial,
	carregando,
	setAtualizarCaixa,
	callback,
	setShowModalCriarCaixa,
	showModalCriarCaixa,
	idCaixa,
	setIdCaixa,
	dataCaixaChoice,
	atualizarCaixa,
	setCarregando,
	...props
}, ref) => {

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

	const formikRef = React.useRef();

	const sendData = async ({
		...params
	}) => {
		const data = {
			...params,
		}

		let data_config = idCaixa && idCaixa > 0
			? CAIXA_UPDATE_POST(idCaixa, data, getToken())
			: CAIXA_SAVE_POST(data, getToken());

		setCarregando(true);
		const { url, options } = data_config;
		const { response, json } = await request(url, options);
		setCarregando(false);

		if (json) {
			callback && callback();
			setShowModalCriarCaixa && setShowModalCriarCaixa(false);
			setAtualizarCaixa && setAtualizarCaixa(false);
			
			setIdCaixa && setIdCaixa(null);

			Swal.fire({
				icon: "success",
				title: "",
				text: 'Registrado com sucesso',
				footer: '',
				confirmButtonColor: "#07B201",
			});
		}
	}

	const validate = (values) => {
		const errors = {};
		if (!values.name) errors.name = 'Obrigatório';
		if (!values.type) errors.type = 'Obrigatório';
		if (!values.vrMin) errors.vrMin = 'Obrigatório';
		if (!values.vrMax) errors.vrMax = 'Obrigatório';
		if (!values.status_bloqueio) errors.status_bloqueio = 'Obrigatório';
		if (!values.aceita_transferencia) errors.aceita_transferencia = 'Obrigatório';
		return errors;
	};

	useImperativeHandle(ref, () => ({
		submitForm: () => {
			formikRef.current.handleSubmit();
		},
	}));

	React.useRef(() => {
		setCarregando(loading)
	}, [loading, setCarregando]);

	const dataToFormCaixa = () => {
		let obj = { filial_id: '', name: '', type: '', vrMin: '', vrMax: '', status_bloqueio: '', aceita_transferencia: '', vr_saldo_inicial: '', active: '', deleted_at: '', created_at: '', updated_at: '' }

		if (dataCaixaChoice) {

			let data = dataCaixaChoice

			if (data?.mensagem) {
				data = data?.mensagem
			} else if (data?.data) {
				data = data?.data
			}

			if (data.hasOwnProperty('filial_id')) {
				obj.filial_id = data.filial_id;
			}

			if (data.hasOwnProperty('name')) {
				obj.name = data.name;
			}

			if (data.hasOwnProperty('status')) {
				obj.status = data.status;
			}

			if (data.hasOwnProperty('type')) {
				obj.type = data.type;
			}

			if (data.hasOwnProperty('vrMin')) {
				obj.vrMin = data.vrMin;
			}

			if (data.hasOwnProperty('vrMax')) {
				obj.vrMax = data.vrMax;
			}

			if (data.hasOwnProperty('status_bloqueio')) {
				obj.status_bloqueio = data.status_bloqueio;
			}

			if (data.hasOwnProperty('aceita_transferencia')) {
				obj.aceita_transferencia = data.aceita_transferencia;
			}

			if (data.hasOwnProperty('vr_saldo_inicial')) {
				obj.vr_saldo_inicial = data.vr_saldo_inicial;
			}

		}

		if (idFilialForm > 0) {
			obj.filial_id = idFilialForm;
		}

		return obj;
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

	const preparaFilialToForm = () => {
		if (dataFiliais.hasOwnProperty('mensagem') && Array.isArray(dataFiliais.mensagem) && dataFiliais.mensagem.length > 0) {
			let filiais = dataFiliais.mensagem.map(({ id, name_filial }, index, arr) => ({ label: name_filial, valor: id, props: {} }))
			filiais.unshift({ label: 'Selecione...', valor: '', props: { selected: 'selected', disabled: 'disabled' } })

			return filiais;
		}

		return []
	}

	React.useEffect(() => {
		const requesFiliais = async () => {
			await requestAllFiliais();
		}

		requesFiliais();

	}, []);

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
			<Formik
				innerRef={formikRef}
				initialValues={dataToFormCaixa()}
				enableReinitialize={true}
				validate={validate}
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

						<form onSubmit={handleSubmit} id="formCaixa" >
							<Row className="my-3">
								<Col xs="12" sm="12" md="12">
									<span className="label_title_grup_forms" >Dados básicos</span>
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Nome *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													type: 'text',
													name: 'name',
													placeholder: '',
													id: 'name',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.name,
													className: `${estilos.input}`,
													size: "sm"
												},
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlInput}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="name" component="div" />
								</Col>

								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Tipo *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													type: 'text',
													name: 'type',
													placeholder: '',
													id: 'type',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.type,
													className: estilos.input,
													size: "sm",
												},
												options: [
													{ label: 'Selecione', valor: '', props: { selected: 'selected', disabled: 'disabled' } }
													,{ label: 'Banco', valor: 'banco', props: { selected: '' } },
													{ label: 'Balcão', valor: 'convencional', props: {} }
												],
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlSelect}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="type" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Filial *',
												atributsFormLabel: {

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
												options: preparaFilialToForm(),
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
												contentLabel: 'Aceita transferênica *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													type: 'text',
													name: 'aceita_transferencia',
													placeholder: '',
													id: 'aceita_transferencia',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.aceita_transferencia,
													className: estilos.input,
													size: "sm"
												},
												options: [{ label: 'Selecione', valor: '', props: { selected: 'selected', disabled: 'disabled' } }, { label: 'Sim', valor: 'yes', props: { selected: '' } }, { label: 'Não', valor: 'no', props: {} }],
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlSelect}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="aceita_transferencia" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Valor mínimo *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													type: 'text',
													name: 'vrMin',
													placeholder: '',
													id: 'vrMin',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.vrMin,
													className: estilos.input,
													size: "sm"
												},
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlInput}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="vrMin" component="div" />
								</Col>

								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Valor máximo *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													type: 'text',
													name: 'vrMax',
													placeholder: '',
													id: 'vrMax',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.vrMax,
													className: estilos.input,
													size: "sm"
												},
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlInput}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="vrMax" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Status bloqueio *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													type: 'text',
													name: 'status_bloqueio',
													placeholder: '',
													id: 'status_bloqueio',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.status_bloqueio,
													className: estilos.input,
													size: "sm"
												},
												options: [{ label: 'Selecione', valor: '', props: { selected: 'selected', disabled: 'disabled' } }, { label: 'Bloqueado', valor: 'bloqueado', props: { selected: '' } }, { label: 'Liberado', valor: 'liberado', props: {} }],
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlSelect}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="status_bloqueio" component="div" />
								</Col>
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Saldo inicial *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													type: 'text',
													name: 'vr_saldo_inicial',
													placeholder: '00,00',
													id: 'vr_saldo_inicial',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.vr_saldo_inicial,
													className: estilos.input,
													size: "sm"
												},
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlInput}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="vr_saldo_inicial" component="div" />
								</Col>


							</Row>

						</form>
					)
				}
			</Formik>
		</>
	)
})

export default FormCaixa;