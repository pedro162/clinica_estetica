import React, { forwardRef, useImperativeHandle } from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import { Col, Row } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormPlanoPagamento.module.css'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Swal from 'sweetalert2'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, FILIAIS_ALL_POST, PLANO_PAGAMENTO_UPDATE_POST, PLANO_PAGAMENTO_SAVE_POST } from '../../../api/endpoints/geral.js'

const FormPlanoPagamento = forwardRef(({
	name,
	setname,
	tipo,
	setTipo,
	hasOperadorFinanceiro,
	setVrMinimo,
	id,
	setVrMaximo,
	descricao,
	setdescricao,
	tpPagamento,
	setAceitaTransferencia,
	exibe_balcao,
	setVrSaldoInicial,
	carregando,
	setAtualizarPlanoPagamento,
	callback,
	setShowModalCriarPlanoPagamento,
	showModalCriarPlanoPagamento,
	idPlanoPagamento,
	setIdPlanoPagamento,
	dataPlanoPagamentoChoice,
	atualizarPlanoPagamento,
	setCarregando,
	...props
}, ref) => {

	const { data, error, request, loading } = useFetch();
	const dataRequest = useFetch();
	const { getToken, dataUser } = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] = React.useState([])
	const [dataItens, setDataitens] = React.useState([])
	const [dataPlanoPagamento, setDataPlanoPagamento] = React.useState([])
	const [dataOperadorFinanceiro, setDataOperadorFinanceiro] = React.useState([])
	const [dataPlanoPagamentoEscolhido, setDataPlanoPagamentoEscolhido] = React.useState([])
	const [idPlanoPagamentoForm, setIdPlanoPagamentoForm] = React.useState(0)
	const [vrCobrancaForm, setVrCobrancaForm] = React.useState(0)
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

		let data_config = idPlanoPagamento && idPlanoPagamento > 0
			? PLANO_PAGAMENTO_UPDATE_POST(idPlanoPagamento, data, getToken())
			: PLANO_PAGAMENTO_SAVE_POST(data, getToken());

		const { url, options } = data_config;
		const { response, json } = await request(url, options);

		if (json && !error) {
			callback();
			setShowModalCriarPlanoPagamento();
			setAtualizarPlanoPagamento(false);
			setIdPlanoPagamento(null);

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
		if (!(values.qtdParcelas >= 0)) errors.qtdParcelas = 'Obrigatório';
		if (!values.descricao) errors.descricao = 'Obrigatório';
		if (!(values.qtdDiasIntervaloParcelas >= 0)) errors.qtdDiasIntervaloParcelas = 'Obrigatório';
		if (!values.isAberto) errors.isAberto = 'Obrigatório';
		if (!(values.diasmedios >= 0)) errors.diasmedios = 'Obrigatório';
		if (!(values.qtdMinParcelas >= 0)) errors.qtdMinParcelas = 'Obrigatório';
		if (!(values.qtd_dias_pri_parcela >= 0)) errors.qtd_dias_pri_parcela = 'Obrigatório';
		if (!values.exibe_balcao) errors.exibe_balcao = 'Obrigatório';
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

	const dataToFormPlanoPagamento = () => {
		let obj = { qtdParcelas: '', qtdDiasIntervaloParcelas:'',  desdrobrarDuplicataManual: 'no', gerarDuplicataManual: '', isAberto: '', name: '', diasmedios: '', qtdMinParcelas: '', id: '', descricao: '', exibe_balcao:'', qtd_dias_pri_parcela: '', active: '', deleted_at: '', created_at: '', updated_at: '' }

		if (dataPlanoPagamentoChoice) {

			let data = dataPlanoPagamentoChoice

			if (data?.mensagem) {
				data = data?.mensagem
			} else if (data?.data) {
				data = data?.data
			}

			if (data.hasOwnProperty('qtdParcelas')) {
				obj.qtdParcelas = data.qtdParcelas;
			}

			if (data.hasOwnProperty('desdrobrarDuplicataManual')) {
				obj.desdrobrarDuplicataManual = data.desdrobrarDuplicataManual;
			}

			if (data.hasOwnProperty('gerarDuplicataManual')) {
				obj.gerarDuplicataManual = data.gerarDuplicataManual;
			}

			if (data.hasOwnProperty('isAberto')) {
				obj.isAberto = data.isAberto;
			}

			if (data.hasOwnProperty('name')) {
				obj.name = data.name;
			}

			if (data.hasOwnProperty('diasmedios')) {
				obj.diasmedios = data.diasmedios;
			}

			if (data.hasOwnProperty('qtdMinParcelas')) {
				obj.qtdMinParcelas = data.qtdMinParcelas;
			}

			if (data.hasOwnProperty('qtdDiasIntervaloParcelas')) {
				obj.qtdDiasIntervaloParcelas = data.qtdDiasIntervaloParcelas;
			}

			if (data.hasOwnProperty('id')) {
				obj.id = data.id;
			}

			if (data.hasOwnProperty('descricao')) {
				obj.descricao = data.descricao;
			}

			if (data.hasOwnProperty('qtd_dias_pri_parcela')) {
				obj.qtd_dias_pri_parcela = data.qtd_dias_pri_parcela;
			}

			if (data.hasOwnProperty('exibe_balcao')) {
				obj.exibe_balcao = data.exibe_balcao;
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
				initialValues={dataToFormPlanoPagamento()}
				enableReinitialize={false}
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

						<form onSubmit={handleSubmit} id="formPlanoPagamento" >
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
												contentLabel: 'Descrição *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'descricao',
													placeholder: '',
													id: 'nadescricaoe',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.descricao,
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
									<ErrorMessage className="alerta_error_form_label" name="descricao" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Quantida mínima de parcelas *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'qtdMinParcelas',
													placeholder: '',
													id: 'qtdMinParcelas',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.qtdMinParcelas,
													className: estilos.input,
													size: "sm",
												},
												options: [],
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlInput}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="qtdMinParcelas" component="div" />
								</Col>

								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Quantidade parcelas *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'qtdParcelas',
													placeholder: '',
													id: 'qtdParcelas',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.qtdParcelas,
													className: estilos.input,
													size: "sm",
												},
												options: [],
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlInput}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="qtdParcelas" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">	
								
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Dias entre parcelas *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'qtdDiasIntervaloParcelas',
													placeholder: '',
													id: 'qtdDiasIntervaloParcelas',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.qtdDiasIntervaloParcelas,
													className: estilos.input,
													size: "sm",
												},
												options: [],
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlInput}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="qtdDiasIntervaloParcelas" component="div" />
								</Col>
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Dias para primeira parcela *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'qtd_dias_pri_parcela',
													placeholder: '',
													id: 'qtd_dias_pri_parcela',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.qtd_dias_pri_parcela,
													className: estilos.input,
													size: "sm",
												},
												options: [],
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlInput}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="qtd_dias_pri_parcela" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Dias médios *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'diasmedios',
													placeholder: '',
													id: 'diasmedios',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.diasmedios,
													className: estilos.input,
													size: "sm",
												},
												options: [],
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlInput}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="diasmedios" component="div" />
								</Col>
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Gerar duplicata manual *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'gerarDuplicataManual',
													placeholder: '',
													id: 'gerarDuplicataManual',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.gerarDuplicataManual,
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
									<ErrorMessage className="alerta_error_form_label" name="gerarDuplicataManual" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Aberta *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'isAberto',
													placeholder: '',
													id: 'isAberto',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.isAberto,
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
									<ErrorMessage className="alerta_error_form_label" name="isAberto" component="div" />
								</Col>
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Exibe no balcão *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'exibe_balcao',
													placeholder: '',
													id: 'exibe_balcao',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.exibe_balcao,
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
									<ErrorMessage className="alerta_error_form_label" name="exibe_balcao" component="div" />
								</Col>
							</Row>
						</form>
					)
				}
			</Formik>
		</>
	)
})

export default FormPlanoPagamento;