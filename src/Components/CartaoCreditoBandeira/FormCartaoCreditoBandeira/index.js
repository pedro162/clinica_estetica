import React, { forwardRef, useImperativeHandle } from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import { Col, Row } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormCartaoCreditoBandeira.module.css'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Swal from 'sweetalert2'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import { BANDEIRA_CARTAO_SAVE_POST, BANDEIRA_CARTAO_UPDATE_POST } from './../Routes/index.js'
import Required from '../../FormControl/Required.js';
import Clientes from '../../Clientes/index.js';
import Filial from '../../Filial/index.js';

const FormCartaoCreditoBandeira = forwardRef(({
	name,
	setname,
	tipo,
	setTipo,
	hasCartaoCreditoBandeira,
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
	setAtualizarCartaoCreditoBandeira,
	callback,
	setShowModalCriarCartaoCreditoBandeira,
	showModalCriarCartaoCreditoBandeira,
	idCartaoCreditoBandeira,
	setIdCartaoCreditoBandeira,
	dataCartaoCreditoBandeiraChoice,
	atualizarCartaoCreditoBandeira,
	setCarregando,
	...props
}, ref) => {

	const { data, error, request, loading } = useFetch();
	const dataRequest = useFetch();
	const { getToken, dataUser } = React.useContext(UserContex);
	const [idFilialForm, setIdFilialForm] = React.useState(0)
	const [idPessoaForm, setIdPessoaForm] = React.useState(0)

	const formikRef = React.useRef();

	const sendData = async ({
		...params
	}) => {
		const data = {
			...params,
		}

		let data_config = idCartaoCreditoBandeira && idCartaoCreditoBandeira > 0
			? BANDEIRA_CARTAO_UPDATE_POST(idCartaoCreditoBandeira, data, getToken())
			: BANDEIRA_CARTAO_SAVE_POST(data, getToken());

		const { url, options } = data_config;
		const { response, json } = await request(url, options);

		if (json && !error) {
			callback();
			setShowModalCriarCartaoCreditoBandeira();
			setAtualizarCartaoCreditoBandeira(false);
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

	const validate = (values) => {
		const errors = {};
		if (!values.name) errors.name = 'Obrigatório';
		if (!values.standard) errors.standard = 'Obrigatório';
		return errors;
	};

	useImperativeHandle(ref, () => ({
		submitForm: () => {
			setCarregando(true)
			formikRef.current.handleSubmit();
		},
	}));

	React.useRef(() => {
		setCarregando(loading)
	}, [loading, setCarregando]);

	const dataToFormCartaoCreditoBandeira = () => {
		let obj = { name: '', standard: 'no', id: '' }

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

			if (data.hasOwnProperty('standard')) {
				obj.standard = data.standard;
			}

			if (data.hasOwnProperty('id')) {
				obj.id = data.id;
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

	return (

		<>
			<Formik
				innerRef={formikRef}
				initialValues={dataToFormCartaoCreditoBandeira()}
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

						<form onSubmit={handleSubmit} id="formCartaoCreditoBandeira" >
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
									<ErrorMessage className="alerta_error_form_label" name="name" component="div" />
								</Col>

								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Padrão? *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													tipo: 'text',
													name: 'standard',
													placeholder: '',
													id: 'standard',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.standard,
													className: estilos.input,
													size: "sm",
												},
												options: [{ label: 'Selecione', valor: '', props: { selected: 'selected', disabled: 'disabled' } }, { label: 'Sim', valor: 'yes', props: { selected: '' } }, { label: 'Não', valor: 'no', props: {} }],
												atributsContainer: {
													className: ''
												}
											}
										}

										component={FormControlSelect}
									></Field>
									<ErrorMessage className="alerta_error_form_label" name="standard" component="div" />
								</Col>
							</Row>
						</form>
					)
				}
			</Formik>
		</>
	)
})

export default FormCartaoCreditoBandeira;