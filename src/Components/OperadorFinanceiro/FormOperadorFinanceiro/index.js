import React, { forwardRef, useImperativeHandle } from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import { Col, Row } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormOperadorFinanceiro.module.css'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Swal from 'sweetalert2'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, FILIAIS_ALL_POST, OPERADOR_FINANCEIRO_UPDATE_POST, OPERADOR_FINANCEIRO_SAVE_POST, CLIENTES_ALL_POST } from '../../../api/endpoints/geral.js'
import Required from '../../FormControl/Required.js';
import Clientes from '../../Clientes/index.js';
import Filial from '../../Filial/index.js';

const FormOperadorFinanceiro = forwardRef(({
	pessoa_id,
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
	isAssumeDuplicata,
	setVrSaldoInicial,
	carregando,
	setAtualizarOperadorFinanceiro,
	callback,
	setShowModalCriarOperadorFinanceiro,
	showModalCriarOperadorFinanceiro,
	idOperadorFinanceiro,
	setIdOperadorFinanceiro,
	dataOperadorFinanceiroChoice,
	atualizarOperadorFinanceiro,
	setCarregando,
	...props
}, ref) => {

	const { data, error, request, loading } = useFetch();
	const dataRequest = useFetch();
	const { getToken, dataUser } = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] = React.useState([])
	const [dataItens, setDataitens] = React.useState([])
	const [dataOperadorFinanceiro, setDataOperadorFinanceiro] = React.useState([])
	const [dataOperadorFinanceiroEscolhido, setDataOperadorFinanceiroEscolhido] = React.useState([])
	const [idOperadorFinanceiroForm, setIdOperadorFinanceiroForm] = React.useState(0)
	const [vrCobrancaForm, setVrCobrancaForm] = React.useState(0)
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

		let data_config = idOperadorFinanceiro && idOperadorFinanceiro > 0
			? OPERADOR_FINANCEIRO_UPDATE_POST(idOperadorFinanceiro, data, getToken())
			: OPERADOR_FINANCEIRO_SAVE_POST(data, getToken());

		const { url, options } = data_config;
		const { response, json } = await request(url, options);

		if (json && !error) {
			callback();
			setShowModalCriarOperadorFinanceiro();
			setAtualizarOperadorFinanceiro(false);
			setIdOperadorFinanceiro(null);

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
		if (!values.pessoa_id) errors.pessoa_id = 'Obrigatório';
		if (!(String(values.vrTarifa).length > 0)) errors.vrTarifa = 'Obrigatório';
		if (!(String(values.vrDesconto).length > 0)) errors.vrDesconto = 'Obrigatório';
		if (!( String(values.vrPorcentagemDesconto).length > 0)) errors.vrPorcentagemDesconto = 'Obrigatório';
		if (!values.filial_id) errors.filial_id = 'Obrigatório';
		//if (!values.nrRemessaAtual) errors.nrRemessaAtual = 'Obrigatório';
		//if (!values.nrNossoNumero) errors.nrNossoNumero = 'Obrigatório';
		if (!values.tpLocalAtualizacaoBoleto) errors.tpLocalAtualizacaoBoleto = 'Obrigatório';
		if (!( String(values.qtdDiasProtesto).length > 0)) errors.qtdDiasProtesto = 'Obrigatório';
		if (!values.isAssumeDuplicata) errors.isAssumeDuplicata = 'Obrigatório';
		if (!values.isPadrao) errors.isPadrao = 'Obrigatório';
		if (!values.isLiberado) errors.isLiberado = 'Obrigatório';
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

	const dataToFormOperadorFinanceiro = () => {
		let obj = { pessoa_id: '', vrPorcentagemDesconto:'', filial_id:'', vrTarifa:'',  isPadrao: 'no', vrDesconto: '', isLiberado: '', nrRemessaAtual: '', nrNossoNumero: '', qtdDiasProtesto: '', id: '', tpLocalAtualizacaoBoleto: '', isAssumeDuplicata:'', isPadrao: '', active: '', deleted_at: '', created_at: '', updated_at: '' }

		if (dataOperadorFinanceiroChoice) {

			let data = dataOperadorFinanceiroChoice

			if (data?.mensagem) {
				data = data?.mensagem
			} else if (data?.data) {
				data = data?.data
			}

			if (data.hasOwnProperty('pessoa_id')) {
				obj.pessoa_id = data.pessoa_id;
			}

			if (data.hasOwnProperty('filial_id')) {
				obj.filial_id = data.filial_id;
			}

			if (data.hasOwnProperty('isPadrao')) {
				obj.isPadrao = data.isPadrao;
			}

			if (data.hasOwnProperty('vrDesconto')) {
				obj.vrDesconto = data.vrDesconto;
			}

			if (data.hasOwnProperty('isLiberado')) {
				obj.isLiberado = data.isLiberado;
			}

			if (data.hasOwnProperty('nrRemessaAtual')) {
				obj.nrRemessaAtual = data.nrRemessaAtual;
			}

			if (data.hasOwnProperty('nrNossoNumero')) {
				obj.nrNossoNumero = data.nrNossoNumero;
			}

			if (data.hasOwnProperty('qtdDiasProtesto')) {
				obj.qtdDiasProtesto = data.qtdDiasProtesto;
			}

			if (data.hasOwnProperty('vrTarifa')) {
				obj.vrTarifa = data.vrTarifa;
			}

			if (data.hasOwnProperty('id')) {
				obj.id = data.id;
			}

			if (data.hasOwnProperty('tpLocalAtualizacaoBoleto')) {
				obj.tpLocalAtualizacaoBoleto = data.tpLocalAtualizacaoBoleto;
			}

			if (data.hasOwnProperty('isPadrao')) {
				obj.isPadrao = data.isPadrao;
			}

			if (data.hasOwnProperty('isAssumeDuplicata')) {
				obj.isAssumeDuplicata = data.isAssumeDuplicata;
			}

			if (data.hasOwnProperty('vrPorcentagemDesconto')) {
				obj.vrPorcentagemDesconto = data.vrPorcentagemDesconto;
			}

		}

		if(idFilialForm){
			obj.filial_id = idFilialForm;
		}

		if(idPessoaForm){
			obj.pessoa_id = idPessoaForm;
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
				initialValues={dataToFormOperadorFinanceiro()}
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
							isSubmitting,
							setFieldValue
						}
					) => (

						<form onSubmit={handleSubmit} id="formOperadorFinanceiro" >
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
												contentLabel: 'Pessoa *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'pessoa_id',
													placeholder: '',
													id: 'pessoa_id',
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

													setFieldValue('pessoa_id', value)
												}
											}
										}

										ComponentFilter={Clientes}
										componentTitle={'Escolha uma pessoa'}
										component={Required}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="pessoa_id" component="div" />
								</Col>
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Filial *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'filial_id',
													placeholder: '',
													id: 'filial_id',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.filial_id,
													className: `${estilos.input}`,
													size: "sm"
												},
												atributsContainer: {
													className: ''
												},
												hookToLoadFromDescription: FILIAIS_ALL_POST,
												callbackDataItemChoice: (param) => {
													let { label, value } = param

													handleChange({
														target: {
															name: 'filial_id',
															value: value
														}
													})
												}
											}
										}

										ComponentFilter={Filial}
										componentTitle={'Escolha uma filial'}
										component={Required}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="filial_id" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Dias para protesto *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'qtdDiasProtesto',
													placeholder: '',
													id: 'qtdDiasProtesto',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.qtdDiasProtesto,
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
									<ErrorMessage className="alerta_error_form_label" name="qtdDiasProtesto" component="div" />
								</Col>
								
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Valor de tarifa *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'vrTarifa',
													placeholder: '',
													id: 'vrTarifa',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.vrTarifa,
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
									<ErrorMessage className="alerta_error_form_label" name="vrTarifa" component="div" />
								</Col>
								
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Remessa atual',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'nrRemessaAtual',
													placeholder: '',
													id: 'nrRemessaAtual',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.nrRemessaAtual,
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
									<ErrorMessage className="alerta_error_form_label" name="nrRemessaAtual" component="div" />
								</Col>

								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Nosso número atual',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'nrNossoNumero',
													placeholder: '',
													id: 'nrNossoNumero',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.nrNossoNumero,
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
									<ErrorMessage className="alerta_error_form_label" name="nrNossoNumero" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">	
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Percentual de desconto *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'vrPorcentagemDesconto',
													placeholder: '',
													id: 'vrPorcentagemDesconto',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.vrPorcentagemDesconto,
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
									<ErrorMessage className="alerta_error_form_label" name="vrPorcentagemDesconto" component="div" />
								</Col>

								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Valor desconto *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'vrDesconto',
													placeholder: '',
													id: 'vrDesconto',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.vrDesconto,
													className: estilos.input,
													size: "sm"
												},
												options: [],
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlInput}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="vrDesconto" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Local de atualização de boletos *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'tpLocalAtualizacaoBoleto',
													placeholder: '',
													id: 'tpLocalAtualizacaoBoleto',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.tpLocalAtualizacaoBoleto,
													className: estilos.input,
													size: "sm",
												},
												options: [{ label: 'Selecione', valor: '', props: { selected: 'selected', disabled: 'disabled' } }, { label: 'Banco', valor: 'banco', props: { selected: '' } }, { label: 'Empresa', valor: 'empresa', props: {} }],
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlSelect}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="tpLocalAtualizacaoBoleto" component="div" />
								</Col>

								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Padrão *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'isPadrao',
													placeholder: '',
													id: 'isPadrao',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.isPadrao,
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
									<ErrorMessage className="alerta_error_form_label" name="isPadrao" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Liberado *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'isLiberado',
													placeholder: '',
													id: 'isLiberado',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.isLiberado,
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
									<ErrorMessage className="alerta_error_form_label" name="isLiberado" component="div" />
								</Col>
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Assume duplicata *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'isAssumeDuplicata',
													placeholder: '',
													id: 'isAssumeDuplicata',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.isAssumeDuplicata,
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
									<ErrorMessage className="alerta_error_form_label" name="isAssumeDuplicata" component="div" />
								</Col>
							</Row>
						</form>
					)
				}
			</Formik>
		</>
	)
})

export default FormOperadorFinanceiro;