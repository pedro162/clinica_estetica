import React, { forwardRef, useImperativeHandle } from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import { Col, Row } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormFormaPagamento.module.css'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Swal from 'sweetalert2'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, FILIAIS_ALL_POST, FORMA_PAGAMENTO_UPDATE_POST, FORMA_PAGAMENTO_SAVE_POST, OPERADOR_FINANCEIROALL_POST, PLANO_PAGAMENTOALL_POST } from '../../../api/endpoints/geral.js'

const FormFormaPagamento = forwardRef(({
	name,
	setname,
	tipo,
	setTipo,
	hasOperadorFinanceiro,
	setVrMinimo,
	id,
	setVrMaximo,
	cdCobrancaTipo,
	setcdCobrancaTipo,
	tpPagamento,
	setAceitaTransferencia,
	hasEntrada,
	setVrSaldoInicial,
	carregando,
	setAtualizarFormaPagamento,
	callback,
	setShowModalCriarFormaPagamento,
	showModalCriarFormaPagamento,
	idFormaPagamento,
	setIdFormaPagamento,
	dataFormaPagamentoChoice,
	atualizarFormaPagamento,
	setCarregando,
	...props
}, ref) => {

	const { data, error, request, loading } = useFetch();
	const dataRequest = useFetch();
	const { getToken, dataUser } = React.useContext(UserContex);
	const [dataOperadoresFinanceiros, setDataOperadoresFinanceiros] = React.useState([])
	const [dataPlanosPagamento, setDataPlanosPagamento] = React.useState([])

	const formikRef = React.useRef();

	const sendData = async ({
		...params
	}) => {
		const data = {
			...params,
		}

		let data_config = idFormaPagamento && idFormaPagamento > 0
			? FORMA_PAGAMENTO_UPDATE_POST(idFormaPagamento, data, getToken())
			: FORMA_PAGAMENTO_SAVE_POST(data, getToken());

		const { url, options } = data_config;
		const { response, json } = await request(url, options);

		if (json && !error) {
			callback();
			setShowModalCriarFormaPagamento();
			setAtualizarFormaPagamento(false);
			setIdFormaPagamento(null);

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
		if (!values.tipo) errors.tipo = 'Obrigatório';

		if (values.hasOperadorFinanceiro === undefined || values.hasOperadorFinanceiro === null) {
			errors.hasOperadorFinanceiro = 'Obrigatório';
		}

		if (!values.cdCobrancaTipo) errors.cdCobrancaTipo = 'Obrigatório';
		if (!values.tpPagamento) errors.tpPagamento = 'Obrigatório';

		if (values.hasLimiteDeCredito === undefined || values.hasLimiteDeCredito === null) {
			errors.hasLimiteDeCredito = 'Obrigatório';
		}

		if (values.hasAcertoCaixa === undefined || values.hasAcertoCaixa === null) {
			errors.hasAcertoCaixa = 'Obrigatório';
		}

		if (values.hasEntrada === undefined || values.hasEntrada === null) {
			errors.hasEntrada = 'Obrigatório';
		}

		if (
			!values.plano_pagamento_id ||
			!Array.isArray(values.plano_pagamento_id) ||
			values.plano_pagamento_id.length === 0 ||
			values.plano_pagamento_id.some((item) => !(Number(item) > 0))
		) {
			errors.plano_pagamento_id = 'Obrigatório';
		}

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

	const dataToFormFormaPagamento = () => {
		let obj = { hasEntrada: '', hasAcertoCaixa: '', hasAcertoBalcao: 'no', hasLimiteDeCredito: '', name: '', tipo: '', hasOperadorFinanceiro: '', id: '', cdCobrancaTipo: '', tpPagamento: '', hasEntrada: '', active: '', deleted_at: '', created_at: '', updated_at: '', plano_pagamento_id: [], operador_financeiro_id: [] }

		if (dataFormaPagamentoChoice) {

			let data = dataFormaPagamentoChoice

			if (data?.mensagem) {
				data = data?.mensagem
			} else if (data?.data) {
				data = data?.data
			}

			if (data.hasOwnProperty('hasEntrada')) {
				obj.hasEntrada = data.hasEntrada;
			}

			if (data.hasOwnProperty('hasAcertoCaixa')) {
				obj.hasAcertoCaixa = data.hasAcertoCaixa;
			}

			if (data.hasOwnProperty('hasAcertoBalcao')) {
				obj.hasAcertoBalcao = data.hasAcertoBalcao;
			}

			if (data.hasOwnProperty('hasLimiteDeCredito')) {
				obj.hasLimiteDeCredito = data.hasLimiteDeCredito;
			}

			if (data.hasOwnProperty('name')) {
				obj.name = data.name;
			}

			if (data.hasOwnProperty('hasComissao')) {
				obj.hasComissao = data.hasComissao;
			}

			if (data.hasOwnProperty('tipo')) {
				obj.tipo = data.tipo;
			}

			if (data.hasOwnProperty('hasOperadorFinanceiro')) {
				obj.hasOperadorFinanceiro = data.hasOperadorFinanceiro;
			}

			if (data.hasOwnProperty('id')) {
				obj.id = data.id;
			}

			if (data.hasOwnProperty('cdCobrancaTipo')) {
				obj.cdCobrancaTipo = data.cdCobrancaTipo;
			}

			if (data.hasOwnProperty('tpPagamento')) {
				obj.tpPagamento = data.tpPagamento;
			}

			if (data.hasOwnProperty('hasEntrada')) {
				obj.hasEntrada = data.hasEntrada;
			}

			if (data.hasOwnProperty('operador_financeiro')
				&& data.operador_financeiro && Array.isArray(data.operador_financeiro)
				&& data.operador_financeiro.length > 0) {
				let operadores = data.operador_financeiro.map(({ id }, index, arr) => id)
				obj.operador_financeiro_id = [...operadores]
			}

			if (data.hasOwnProperty('plano_pagamento')
				&& data.plano_pagamento && Array.isArray(data.plano_pagamento)
				&& data.plano_pagamento.length > 0) {
				let planos = data.plano_pagamento.map(({ id }, index, arr) => id)
				obj.plano_pagamento_id = [...planos]
			}

		}

		return obj;
	}

	const requestAllOperadoresFinanceiros = async () => {
		const { url, options } = OPERADOR_FINANCEIROALL_POST({}, getToken());
		const { response, json } = await dataRequest.request(url, options);

		if (json) {
			let data = json?.data ? json?.data : json;
			data = data?.data ? data?.data : data;
			setDataOperadoresFinanceiros(data)
		} else {

			setDataOperadoresFinanceiros([]);
		}
	}

	const requestAllPlanosPagamento = async () => {
		const { url, options } = PLANO_PAGAMENTOALL_POST({}, getToken());
		const { response, json } = await dataRequest.request(url, options);

		if (json) {
			let data = json?.data ? json?.data : json;
			data = data?.data ? data?.data : data;
			setDataPlanosPagamento(data)
		} else {

			setDataPlanosPagamento([]);
		}
	}

	React.useEffect(async () => {
		await requestAllOperadoresFinanceiros();
		await requestAllPlanosPagamento();
	}, []);

	const preparaPlanoPagamentoToForm = () => {
		let planos = [{ label: 'Selecione...', valor: '', props: {} }]

		if (dataPlanosPagamento && Array.isArray(dataPlanosPagamento) && dataPlanosPagamento.length > 0) {
			planos = dataPlanosPagamento.map(({ id, name }, index, arr) => ({ label: name, valor: id, props: {} }))
			planos.unshift({ label: 'Selecione...', valor: '', props: { selected: 'selected', } })
			return planos;
		}

		return planos
	}

	const preparaOperadorFinanceiroToForm = () => {
		let operadores = [{ label: 'Selecione...', valor: '', props: {} }]

		if (dataOperadoresFinanceiros && Array.isArray(dataOperadoresFinanceiros) && dataOperadoresFinanceiros.length > 0) {
			operadores = dataOperadoresFinanceiros.map(({ id, pessoa }, index, arr) => ({ label: pessoa?.name, valor: id, props: {} }))
			operadores.unshift({ label: 'Selecione...', valor: '', props: { selected: 'selected', } })
			return operadores;
		}

		return operadores
	}

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
			<Formik
				innerRef={formikRef}
				initialValues={dataToFormFormaPagamento()}
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

						<form onSubmit={handleSubmit} id="formFormaPagamento" >
							<Row className="my-3">
								<Col xs="12" sm="12" md="12">
									<span className="label_title_grup_forms" >Dados básicos</span>
								</Col>
							</Row>
							{
								error && <Row className="my-3">
									<Col xs="12" sm="12" md="12">
										<AlertaDismissible title="Atenção:" message={error} variant={"danger"} />
									</Col>
								</Row>
							}
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
													tipo: 'text',
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
												contentLabel: 'Código *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'cdCobrancaTipo',
													placeholder: '',
													id: 'nacdCobrancaTipoe',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.cdCobrancaTipo,
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
									<ErrorMessage className="alerta_error_form_label" name="cdCobrancaTipo" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Tipo *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'tipo',
													placeholder: '',
													id: 'tipo',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.tipo,
													className: estilos.input,
													size: "sm",
												},
												options: [{ label: 'Selecione', valor: '', props: { selected: 'selected', disabled: 'disabled' } }, { label: 'Cartão de crédito', valor: 'cartao_credito', props: { selected: '' } }, { label: 'Cartão de débito', valor: 'cartao_debito', props: {} }, { label: 'Boleto', valor: 'boleto', props: {} }, { label: 'Dinheiro', valor: 'dinheiro', props: {} }],
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlSelect}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="tipo" component="div" />
								</Col>

								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Tipo de pagamento *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'tpPagamento',
													placeholder: '',
													id: 'tpPagamento',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.tpPagamento,
													className: estilos.input,
													size: "sm"
												},
												options: [{ label: 'Selecione', valor: '', props: { selected: 'selected', disabled: 'disabled' } }, { label: 'A prazo', valor: 'a prazo', props: { selected: '' } }, { label: 'Avista', valor: 'a vista', props: {} }],
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlSelect}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="tpPagamento" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Tem comissão *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'hasComissao',
													placeholder: '',
													id: 'hasComissao',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.hasComissao,
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
									<ErrorMessage className="alerta_error_form_label" name="hasComissao" component="div" />
								</Col>

								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Tem limite de crédito *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'hasLimiteDeCredito',
													placeholder: '',
													id: 'hasLimiteDeCredito',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.hasLimiteDeCredito,
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
									<ErrorMessage className="alerta_error_form_label" name="hasLimiteDeCredito" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Tem acerto de caixa *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'hasAcertoCaixa',
													placeholder: '',
													id: 'hasAcertoCaixa',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.hasAcertoCaixa,
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
									<ErrorMessage className="alerta_error_form_label" name="hasAcertoCaixa" component="div" />
								</Col>
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Tem entrada *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'hasEntrada',
													placeholder: '',
													id: 'hasEntrada',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.hasEntrada,
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
									<ErrorMessage className="alerta_error_form_label" name="hasEntrada" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Tem operador financeiro *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'hasOperadorFinanceiro',
													placeholder: '',
													id: 'hasOperadorFinanceiro',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.hasOperadorFinanceiro,
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
									<ErrorMessage className="alerta_error_form_label" name="hasOperadorFinanceiro" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Operadores financeiros',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'operador_financeiro_id',
													placeholder: '',
													id: 'operador_financeiro_id',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.operador_financeiro_id,
													className: estilos.input,
													size: "sm",
													multiple: 'multiple',
												},
												options: [...preparaOperadorFinanceiroToForm()],
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
												contentLabel: 'Planos de pagamento *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'plano_pagamento_id',
													placeholder: '',
													id: 'plano_pagamento_id',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.plano_pagamento_id,
													className: estilos.input,
													size: "sm",
													multiple: 'multiple',
												},
												options: [...preparaPlanoPagamentoToForm()],
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

						</form>
					)
				}
			</Formik>
		</>
	)
})

export default FormFormaPagamento;