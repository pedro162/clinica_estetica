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
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, FILIAIS_ALL_POST, FORMA_PAGAMENTO_UPDATE_POST, FORMA_PAGAMENTO_SAVE_POST } from '../../../api/endpoints/geral.js'

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
		if (!values.hasOperadorFinanceiro) errors.hasOperadorFinanceiro = 'Obrigatório';
		if (!values.cdCobrancaTipo) errors.cdCobrancaTipo = 'Obrigatório';
		if (!values.tpPagamento) errors.tpPagamento = 'Obrigatório';
		if (!values.hasLimiteDeCredito) errors.hasLimiteDeCredito = 'Obrigatório';
		if (!values.hasAcertoCaixa) errors.hasAcertoCaixa = 'Obrigatório';
		if (!values.hasEntrada) errors.hasEntrada = 'Obrigatório';
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
		let obj = { hasEntrada: '', hasAcertoCaixa: '', hasAcertoBalcao: 'no', hasLimiteDeCredito: '', name: '', tipo: '', hasOperadorFinanceiro: '', id: '', cdCobrancaTipo: '', tpPagamento: '', hasEntrada: '', active: '', deleted_at: '', created_at: '', updated_at: '' }

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

		}

		return obj;
	}

	if(error){
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
												options: [{ label: 'Selecione', valor: '', props: { selected: 'selected', disabled: 'disabled' } }, { label: 'Cartão de crédito', valor: 'cartao_credito', props: { selected: '' } }, { label: 'Cartão de débito', valor: 'cartao_debito', props: {} }, { label: 'Boleto', valor: 'boleto', props: {}}, { label: 'Dinheiro', valor: 'dinheiro', props: {} }],
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

						</form>
					)
				}
			</Formik>
		</>
	)
})

export default FormFormaPagamento;