import React, { forwardRef, useImperativeHandle } from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import { Col, Row } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormServico.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import Swal from 'sweetalert2'

import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, SERVICO_SAVE_POST, SERVICO_ALL_POST, SERVICO_UPDATE_POST, CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST } from '../../../api/endpoints/geral.js'
import { FORMAT_CALC_COD } from '../../../functions/index.js';


const FormServico = forwardRef(({
	dataServicoChoice,
	setIdServico,
	idServico,
	showModalCriarServico,
	setShowModalCriarServico,
	callback,
	atualizarServico,
	setAtualizarServico,
	carregando,
	setCarregando,
	...props }, ref) => {

	const { data, error, request, loading } = useFetch();
	const dataRequest = useFetch();
	const { getToken, dataUser } = React.useContext(UserContex);
	const [dataServico, setDataServico] = React.useState([])
	const formikRef = React.useRef();

	const sendData = async ({
		...params
	}) => {

		const data = {
			...params
		}

		data['vrServico'] = FORMAT_CALC_COD(data['vrServico']);

		setCarregando && setCarregando(true);

		let data_config = idServico && idServico > 0
			? SERVICO_UPDATE_POST(idServico, data, getToken())
			: SERVICO_SAVE_POST(data, getToken());

		const { url, options } = data_config;
		const { response, json } = await request(url, options);

		if (!error) {
			callback && callback();
			setShowModalCriarServico && setShowModalCriarServico();
			setAtualizarServico && setAtualizarServico(false);
			setIdServico && setIdServico(null);

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
		const errors = {};

		if (!values.name) errors.name = 'Obrigatório';
		if (!(FORMAT_CALC_COD(values.vrServico) > 0)) errors.vrServico = 'Obrigatório';

		return errors;
	};

	useImperativeHandle(ref, () => ({
		submitForm: () => {
			formikRef.current.handleSubmit();
		},
	}));

	React.useRef(() => {
		setCarregando && setCarregando(loading);
	}, [loading, setCarregando]);

	const dataToFormServico = () => {
		let obj = { name: '', vrServico: '' }
		if (dataServicoChoice) {
			let data = dataServicoChoice

			if (data?.mensagem) {
				data = data?.mensagem
			} else if (data?.data) {
				data = data?.data
			}

			if (data.hasOwnProperty('name')) {
				obj.name = data.name;
			}

			if (data.hasOwnProperty('vrServico')) {
				obj.vrServico = data.vrServico;
			}


		}

		return obj;
	}

	React.useEffect(() => {
		if (error) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: error,
				footer: '',
				confirmButtonColor: "#07B201",
			});
		}

	}, [error])

	return (

		<>
			<Formik

				innerRef={formikRef}
				initialValues={dataToFormServico()}
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

						<form onSubmit={handleSubmit} id="formServico">
							<Row className="my-3">
								<Col xs="12" sm="12" md="12">
									<span className="label_title_grup_forms">Dados básicos</span>
								</Col>
							</Row>

							{
								error && <Row className="my-3">
									<Col xs="12" sm="12" md="12">
										<AlertaDismissible title="Atenção:" message={error} variant={"danger"} />
									</Col>
								</Row>
							}

							<Row className="my-3">
								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasLabel: true,
												contentLabel: 'Serviço *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													type: 'text',
													name: 'name',
													placeholder: 'Nome do serviço',
													id: 'name',
													name_cod: 'name',
													name_desacription: 'name',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.name,
													className: `${estilos.input}`,
													size: "sm"
												},
												atributsContainer: {
													className: ''
												},
											}
										}
										component={FormControlInput}
									>   </Field>
									<ErrorMessage className="alerta_error_form_label" name="name" component="div" />
								</Col>

								<Col xs="12" sm="12" md="6">
									<Field
										data={
											{
												hasNumberFormat: true,
												hasLabel: true,
												contentLabel: 'Valor *',
												atributsFormLabel: {

												},
												atributsFormControl: {
													type: 'text',
													name: 'vrServico',
													placeholder: '0,00',
													id: 'vrServico',
													name_cod: 'vrServico',
													name_desacription: 'vrServico',
													onChange: handleChange,
													onBlur: handleBlur,
													value: values.vrServico,
													className: estilos.input,
													size: "sm"
												},
												atributsContainer: {
													className: ''
												},
											}
										}
										component={FormControlInput}
									>   </Field>
									<ErrorMessage className="alerta_error_form_label" name="vrServico" component="div" />
								</Col>
							</Row>
						</form>
					)
				}
			</Formik>
		</>
	)
})

export default FormServico;
