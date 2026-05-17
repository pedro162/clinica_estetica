import React, { forwardRef, useImperativeHandle } from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import { Col, Row } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormVendedor.module.css'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Swal from 'sweetalert2'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, FILIAIS_ALL_POST, RCA_UPDATE_POST, RCA_SAVE_POST, CLIENTES_ALL_POST } from '../../../api/endpoints/geral.js'
import Required from '../../FormControl/Required.js';
import Clientes from '../../Clientes/index.js';
import Filial from '../../Filial/index.js';

const FormVendedor = forwardRef(({
	pessoa_id,
	setname,
	tipo,
	setTipo,
	hasVendedor,
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
	setAtualizarVendedor,
	callback,
	setShowModalCriarVendedor,
	showModalCriarVendedor,
	idVendedor,
	setIdVendedor,
	dataVendedorChoice,
	atualizarVendedor,
	setCarregando,
	...props
}, ref) => {

	const { data, error, request, loading } = useFetch();
	const dataRequest = useFetch();
	const { getToken, dataUser } = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] = React.useState([])
	const [dataItens, setDataitens] = React.useState([])
	const [dataVendedor, setDataVendedor] = React.useState([])
	const [dataVendedorEscolhido, setDataVendedorEscolhido] = React.useState([])
	const [idVendedorForm, setIdVendedorForm] = React.useState(0)
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

		setCarregando && setCarregando(true);

		let data_config = idVendedor && idVendedor > 0
			? RCA_UPDATE_POST(idVendedor, data, getToken())
			: RCA_SAVE_POST(data, getToken());

		const { url, options } = data_config;
		const { response, json } = await request(url, options);

		if (!error) {
			callback && callback && callback();
			setShowModalCriarVendedor && setShowModalCriarVendedor && setShowModalCriarVendedor();
			setAtualizarVendedor && setAtualizarVendedor && setAtualizarVendedor(false);
			setIdVendedor && setIdVendedor && setIdVendedor(null);

			Swal.fire({
				icon: "success",
				title: "",
				text: 'Registrado com sucesso',
				footer: '',
				confirmButtonColor: "#07B201",
			});
		}

		setCarregando && setCarregando(false);
	}

	const validate = (values) => {
		const err = {};
		if (!values.pessoa_id) err.pessoa_id = 'Obrigatório';
		if (!values.filial_id) err.filial_id = 'Obrigatório';

		if (!values.metaPositivacao || String(values.metaPositivacao).trim() == '') err.metaPositivacao = 'Obrigatório';
		if (!values.metaFaturamento || String(values.metaFaturamento).trim() == '') err.metaFaturamento = 'Obrigatório';
		if (!values.metaMargem || String(values.metaMargem).trim() == '') err.metaMargem = 'Obrigatório';

		if (!values.acessaTodosRcas || !['yes', 'no'].includes(String(values.acessaTodosRcas).toLowerCase())) err.acessaTodosRcas = 'Valor inválido';
		if (!values.situacao || String(values.situacao).trim() === '') err.situacao = 'Obrigatório';

		return err;
	};

	useImperativeHandle(ref, () => ({
		submitForm: () => {
			formikRef.current.handleSubmit();
		},
	}));

	React.useRef(() => {
		//setCarregando(loading)
	}, [loading, setCarregando]);

	const dataToFormVendedor = () => {
		let obj = {
			pessoa_id: '',
			pessoa_name: '',
			metaPositivacao: '',
			filial_id: '',
			filial_name: '',
			metaPositivacao: '',
			metaFaturamento: '',
			metaMargem: '',
			situacao: '',
			acessaTodosRcas: '',
			id: '',
			deleted_at: '',
			created_at: '',
			updated_at: ''

		}

		if (dataVendedorChoice) {

			let data = dataVendedorChoice

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

			if (data.hasOwnProperty('metaFaturamento')) {
				obj.metaFaturamento = data.metaFaturamento;
			}

			if (data.hasOwnProperty('metaMargem')) {
				obj.metaMargem = data.metaMargem;
			}

			if (data.hasOwnProperty('situacao')) {
				obj.situacao = data.situacao;
			}

			if (data.hasOwnProperty('acessaTodosRcas')) {
				obj.acessaTodosRcas = data.acessaTodosRcas;
			}

			if (data.hasOwnProperty('metaPositivacao')) {
				obj.metaPositivacao = data.metaPositivacao;
			}

			if (data.hasOwnProperty('id')) {
				obj.id = data.id;
			}

			if (data.hasOwnProperty('metaPositivacao')) {
				obj.metaPositivacao = data.metaPositivacao;
			}

			if (data.hasOwnProperty('pessoa')) {
				obj.pessoa_name = data.pessoa?.name;
			}

			if (data.hasOwnProperty('filial')) {
				obj.filial_name = data.filial?.pessoa?.name;
			}
		}

		if (idFilialForm) {
			obj.filial_id = idFilialForm;
		}

		if (idPessoaForm) {
			obj.pessoa_id = idPessoaForm;
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
			//width:'20rem',
		});
	}

	return (

		<>
			<Formik
				innerRef={formikRef}
				initialValues={dataToFormVendedor()}
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

						<form onSubmit={handleSubmit} id="formVendedor" >
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
													name_servico: values.pessoa_name,
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
													name_servico: values.filial_name,
													className: `${estilos.input}`,
													size: "sm"
												},
												atributsContainer: {
													className: ''
												},
												hookToLoadFromDescription: FILIAIS_ALL_POST,
												callbackDataItemChoice: (param) => {
													let { label, value } = param

													setFieldValue('filial_id', value)
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
										data={{
											hasNumberFormat: true,
											hasLabel: true,
											contentLabel: 'Meta positivação *',
											atributsFormLabel: {},
											atributsFormControl: {
												tipo: 'text',
												name: 'metaPositivacao',
												placeholder: '',
												id: 'metaPositivacao',
												onChange: handleChange,
												onBlur: handleBlur,
												value: values.metaPositivacao,
												className: estilos.input,
												size: "sm"
											},
											options: [],
											atributsContainer: { className: '' }
										}}
										component={FormControlInput}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="metaPositivacao" component="div" />
								</Col>
								<Col xs="12" sm="12" md="6">
									<Field
										data={{
											hasNumberFormat: true,
											hasLabel: true,
											contentLabel: 'Meta faturamento *',
											atributsFormLabel: {},
											atributsFormControl: {
												tipo: 'text',
												name: 'metaFaturamento',
												placeholder: '',
												id: 'metaFaturamento',
												onChange: handleChange,
												onBlur: handleBlur,
												value: values.metaFaturamento,
												className: estilos.input,
												size: "sm"
											},
											options: [],
											atributsContainer: { className: '' }
										}}
										component={FormControlInput}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="metaFaturamento" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={{
											hasNumberFormat: true,
											hasLabel: true,
											contentLabel: 'Meta margem *',
											atributsFormLabel: {},
											atributsFormControl: {
												tipo: 'text',
												name: 'metaMargem',
												placeholder: '',
												id: 'metaMargem',
												onChange: handleChange,
												onBlur: handleBlur,
												value: values.metaMargem,
												className: estilos.input,
												size: "sm"
											},
											options: [],
											atributsContainer: { className: '' }
										}}
										component={FormControlInput}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="metaMargem" component="div" />
								</Col>
								<Col xs="12" sm="12" md="6">
									<Field
										data={{
											hasLabel: true,
											contentLabel: 'Situação *',
											atributsFormLabel: {},
											atributsFormControl: {
												tipo: 'text',
												name: 'situacao',
												placeholder: '',
												id: 'situacao',
												onChange: handleChange,
												onBlur: handleBlur,
												value: values.situacao,
												className: estilos.input,
												size: "sm"
											},
											options: [
												{ label: 'Selecione', valor: '', props: { selected: 'selected', disabled: 'disabled' } },
												{ label: 'Ativo', valor: 'ativo', props: {} },
												{ label: 'Inativo', valor: 'inativo', props: {} }
											],
											atributsContainer: { className: '' }
										}}
										component={FormControlSelect}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="situacao" component="div" />
								</Col>
							</Row>
							<Row className="mb-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={{
											hasLabel: true,
											contentLabel: 'Visualiza outros vendedores *',
											atributsFormLabel: {},
											atributsFormControl: {
												tipo: 'text',
												name: 'acessaTodosRcas',
												placeholder: '',
												id: 'acessaTodosRcas',
												onChange: handleChange,
												onBlur: handleBlur,
												value: values.acessaTodosRcas,
												className: estilos.input,
												size: "sm"
											},
											options: [
												{ label: 'Selecione', valor: '', props: { selected: 'selected', disabled: 'disabled' } },
												{ label: 'Sim', valor: 'yes', props: { selected: '' } },
												{ label: 'Não', valor: 'no', props: {} }
											],
											atributsContainer: { className: '' }
										}}
										component={FormControlSelect}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="acessaTodosRcas" component="div" />
								</Col>
							</Row>
						</form>
					)
				}
			</Formik>
		</>
	)
})

export default FormVendedor;