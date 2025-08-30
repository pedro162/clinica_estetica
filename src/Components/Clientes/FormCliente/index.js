import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import { Col, Row } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormCliente.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Load from '../../Utils/Load/index.js'
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, CLIENTES_SAVE_POST, CLIENTES_UPDATE_POST, CLIENTES_ONE_GET, PAIS_ALL_POST, ESTADO_ALL_POST } from '../../../api/endpoints/geral.js'
import Atualizar from '../Atualizar/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import Swal from 'sweetalert2'
import Required from '../../FormControl/Required.js';
import Estado from '../../Estado/index.js';
import Pais from '../../Pais/index.js';

const FormCliente = ({ dataClienteChoice, dataGrupo, setIdcliente, idCliente, showModalCriarCliente, setShowModalCriarCliente, callback, atualizarCadastro, setAtualizarCadastro, carregando }) => {

	const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)

	const { data, error, request, loading } = useFetch();
	const fetchToClient = useFetch();
	const { getToken, dataUser } = React.useContext(UserContex);

	const sendData = async ({
		nome,
		sobrenome,
		documento,
		doc_complementar,
		cep,
		pais,
		uf,
		cidade,
		logradouro,
		complemento,
		numero,
		telefone,
		celular,
		tp_telefone,
		tp_celular,
		tp_email,
		email,
		bairro,
		grupo_id,
		nascimento_fundacao,
		sexo,
	}) => {

		const data = {
			'name': nome,
			'documento': documento,
			'sexo': sexo ? sexo : 'm',
			'email': email ? email : '',
			'tipo': 'fisica',
			'grupo_id': grupo_id,
			'active': 'yes',
			'endereco': {
				'cep': cep,
				'logradouro': logradouro,
				'complemento': complemento && String(complemento).length > 0 ? complemento : '',
				'bairro': bairro,
				'cidade': cidade,
				'estado': uf,
				'pais_id': pais,
				'numero': numero,
			}
		}

		let contatos = [];

		if (telefone) {
			contatos.push({
				'tipo': 'fixo',
				'valor': telefone,
				'importancia': 'principal',
			})
		}

		if (celular) {
			contatos.push({
				'tipo': 'celular',
				'valor': celular,
				'importancia': 'principal',

			})
		}

		if (contatos.length > 0) {
			data['contatos'] = contatos;
		}

		if (nascimento_fundacao && String(nascimento_fundacao).trim() != '') {
			data.nascimento_fundacao = nascimento_fundacao;
		}

		if (doc_complementar && String(doc_complementar).trim() != '') {
			data.documento_complementar = doc_complementar;
		}

		if (sobrenome && String(sobrenome).trim() != '') {
			data.name_opcional = sobrenome;
		}

		if (atualizarCadastro == true) {
			const { url, options } = CLIENTES_UPDATE_POST(idCliente, data, getToken());
			const { response, json } = await request(url, options);

			if (json && !error) {

				callback();
				setShowModalCriarCliente();
				setAtualizarCadastro(false);
				setIdcliente(null);

				Swal.fire({
					icon: "success",
					title: "",
					text: 'Registrado com sucesso',
					footer: '',
					confirmButtonColor: "#07B201",
				});
			}

		} else {

			const { url, options } = CLIENTES_SAVE_POST(data, getToken());
			const { response, json } = await request(url, options);

			if (json && !error) {

				callback();
				setShowModalCriarCliente();
				setAtualizarCadastro(false);

				Swal.fire({
					icon: "success",
					title: "",
					text: 'Registrado com sucesso',
					footer: '',
					confirmButtonColor: "#07B201",
				});
			}

		}
	}

	const dataToFormCliente = () => {
		let obj = { nome: '', sobrenome: '', sexo: '', documento: '', doc_complementar: '', cep: '', pais: '', uf: '', cidade: '', logradouro: '', complemento: '', numero: '', telefone: '', celular: '', tp_telefone: '', tp_celular: '', tp_email: '', nascimento_fundacao: '', grupo_id: '', bairro: '' }

		let data = dataClienteChoice;

		if (dataClienteChoice?.mensagem) {
			data = dataClienteChoice?.mensagem;
		}

		if (dataClienteChoice?.data) {
			data = dataClienteChoice?.data;
		}

		if (data) {
			if (data.hasOwnProperty('name')) {
				obj.nome = data.name;
			}

			if (data.hasOwnProperty('name_opcional')) {
				obj.sobrenome = data.name_opcional;
			}

			if (data?.sexo) {
				obj.sexo = data.sexo;
			}

			if (data.hasOwnProperty('documento')) {
				obj.documento = data.documento;
			}

			if (data.hasOwnProperty('documento_complementar')) {
				obj.doc_complementar = data.documento_complementar;
			}

			if (data.hasOwnProperty('nascimento_fundacao')) {
				obj.nascimento_fundacao = data.nascimento_fundacao;
			}

			if (data.hasOwnProperty('email')) {
				obj.email = data.email;
			}

			if (data.hasOwnProperty('tp_email')) {
				obj.tp_email = data.tp_email;
			}

			if (!data.hasOwnProperty('tp_email')) {
				obj.tp_email = 'principal';
			}

			if (data.hasOwnProperty('logradouro')) {
				if (Array.isArray(data.logradouro) && data.logradouro.length > 0) {
					for (let i = 0; !(i == data.logradouro.length); i++) {
						let atual = data.logradouro[i];
						if (atual.hasOwnProperty('importancia') && atual.importancia.trim() == 'principal') {
							obj.cep = atual.cep;
							obj.uf = atual.estado;
							obj.logradouro = atual.logradouro;
							obj.complemento = atual.complemento;
							obj.numero = atual.numero;
							obj.bairro = atual.bairro;
							obj.cidade = atual.cidade;

							if (atual.hasOwnProperty('estado_logradouro')) {
								obj.pais = atual.estado_logradouro?.pais?.id;

							}

							break;
						}
					}
				} else if (data.logradouro) {
					let atual = data.logradouro;
					if (atual.hasOwnProperty('importancia') && atual.importancia.trim() == 'principal') {
						obj.cep = atual.cep;
						obj.uf = atual.estado;
						obj.logradouro = atual.logradouro;
						obj.complemento = atual.complemento;
						obj.numero = atual.numero;
						obj.bairro = atual.bairro;

						if (atual.hasOwnProperty('estado_logradouro')) {
							obj.pais = atual.estado_logradouro?.pais?.id;
						}
					}
				}
			}

			if (data.hasOwnProperty('grupo')) {
				if (Array.isArray(data.grupo) && data.grupo.length > 0) {
					for (let i = 0; !(i == data.grupo.length); i++) {
						let atual = data.grupo[i];
						if (atual.hasOwnProperty('id') && atual.id > 0) {
							obj.grupo_id = atual.id;

						}
					}
				}
			}

			if (data.hasOwnProperty('telefone')) {
				if (Array.isArray(data.telefone) && data.telefone.length > 0) {
					for (let i = 0; !(i == data.telefone.length); i++) {
						let atual = data.telefone[i];
						if (atual.hasOwnProperty('id') && atual.id > 0) {

							if (atual.hasOwnProperty('tipo') && atual.tipo == 'celular' && atual.hasOwnProperty('importancia') && atual.importancia == "principal") {
								obj.celular = atual.numero;
								obj.tp_celular = atual.importancia;
							}

							if (atual.hasOwnProperty('tipo') && atual.tipo == 'fixo') {
								obj.telefone = atual.numero;
								obj.tp_telefone = atual.importancia;
							}

						}
					}
				}

			}
		}

		return obj;
	}

	const preparaGrupoToForm = () => {
		let grupoFormat = [{ label: 'Selecione...', valor: '', props: { selected: 'selected', disabled: 'disabled' } }]

		if (dataGrupo && dataGrupo.hasOwnProperty('registro')) {

			if (Array.isArray(dataGrupo.registro) && dataGrupo.registro.length > 0) {

				for (let i = 0; !(i == dataGrupo.registro.length); i++) {
					let atual = dataGrupo.registro[i];
					let name = atual.hasOwnProperty('name') ? atual.name : '';
					let id = atual.hasOwnProperty('id') ? atual.id : '';
					grupoFormat.push(
						{ label: name, valor: id, props: {} }
					)
				}
			}
		}

		return grupoFormat;
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

				initialValues={{ ...dataToFormCliente() }}
				enableReinitialize={true}
				validate={
					values => {

						const errors = {}

						if (!values.nome) {
							errors.nome = "Obrigatório"
						}

						if (!values.sobrenome) {
							//errors.sobrenome = "Obrigatório"
						}

						if (!values.documento) {
							errors.documento = "Obrigatório"
						}

						if (!values.doc_complementar) {
							//errors.doc_complementar="Obrigatório"
						}

						if (!values.sexo) {
							errors.sexo = "Obrigatório"
						}

						if (!values.cep) {
							errors.cep = "Obrigatório"
						}

						if (!values.pais) {
							errors.pais = "Obrigatório"
						}

						if (!values.uf) {
							errors.uf = "Obrigatório"
						}

						if (!values.cidade) {
							errors.cidade = "Obrigatório"
						}

						if (!values.logradouro) {
							errors.logradouro = "Obrigatório"
						}

						if (!values.complemento) {
							//errors.complemento="Obrigatório"
						}

						if (!values.numero) {
							errors.numero = "Obrigatório"
						}


						if (!values.telefone) {
							//errors.telefone = "Obrigatório"
						}

						if (!values.celular) {
							errors.celular = "Obrigatório"
						}

						if (!values.tp_telefone) {
							//errors.tp_telefone="Obrigatório"
						}

						if (!values.tp_celular) {
							//errors.tp_celular = "Obrigatório"
						}

						if (!values.tp_email) {
							//errors.tp_email="Obrigatório"
						}

						if (!values.email) {
							//errors.email="Obrigatório"
						}

						if (!values.bairro) {
							errors.bairro = "Obrigatório"
						}
						if (!values.nascimento_fundacao) {
							//errors.nascimento_fundacao="Obrigatório"
						}

						if (!values.grupo_id) {
							errors.grupo_id = "Obrigatório"
						}

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
							isSubmitting,
							setFieldValue
						}
					) => (

						<Modal handleConcluir={() => { handleSubmit(); }} title={(atualizarCadastro == true ? 'Atualizar' : 'Cadastrar') + ' Cliente'} size="lg" propsConcluir={{ 'disabled': loading }} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarCliente} showHide={() => { setShowModalCriarCliente(); setAtualizarCadastro(false); setIdcliente(null); }}>

							{
								carregando && carregando == true
									?
									(<Load />)
									:
									(
										<form onSubmit={handleSubmit}>
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
											<Row className="mb-1">
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
																	name: 'nome',
																	placeholder: 'Nome',
																	id: 'nome',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.nome,
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
													<ErrorMessage className="alerta_error_form_label" name="nome" component="div" />
												</Col>

												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Sobrenome',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'sobrenome',
																	placeholder: 'Sobrenome',
																	id: 'sobrenome',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.sobrenome,
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
													<ErrorMessage className="alerta_error_form_label" name="sobrenome" component="div" />
												</Col>
											</Row>

											<Row className="mb-1">
												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Cpf *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'documento',
																	placeholder: '000.000.000-00',
																	id: 'documento',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.documento,
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
													<ErrorMessage className="alerta_error_form_label" name="documento" component="div" />
												</Col>

												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'RG',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'doc_complementar',
																	placeholder: 'RG',
																	id: 'doc_complementar',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.doc_complementar,
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
													<ErrorMessage className="alerta_error_form_label" name="doc_complementar" component="div" />
												</Col>
											</Row>
											<Row className="mb-1">
												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Nascimento',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'date',
																	name: 'nascimento_fundacao',
																	placeholder: '00/00/0000',
																	id: 'nascimento_fundacao',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.nascimento_fundacao,
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
													<ErrorMessage className="alerta_error_form_label" name="nascimento_fundacao" component="div" />
												</Col>

												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Grupo * ',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'grupo_id',
																	placeholder: 'Grupo',
																	id: 'grupo_id',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.grupo_id,
																	className: estilos.input,
																	size: "sm"
																},
																options: [...preparaGrupoToForm()],
																atributsContainer: {
																	className: ''
																}
															}
														}

														component={FormControlSelect}
													></Field>
													<ErrorMessage className="alerta_error_form_label" name="grupo_id" component="div" />
												</Col>
											</Row>
											<Row className="mb-1">
												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Sexo * ',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'sexo',
																	placeholder: 'Sexo',
																	id: 'sexo',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.sexo,
																	className: estilos.input,
																	size: "sm"
																},
																options: [
																	{ label: 'Selecione...', valor: '', props: { selected: 'selected', disabled: 'disabled' } },
																	{ label: 'Mascuilino', valor: 'm' },
																	{ label: 'Feminino', valor: 'f' },
																],
																atributsContainer: {
																	className: ''
																}
															}
														}

														component={FormControlSelect}
													></Field>
													<ErrorMessage className="alerta_error_form_label" name="sexo" component="div" />
												</Col>
											</Row>

											<Row className="my-3">
												<Col xs="12" sm="12" md="12">
													<span className="label_title_grup_forms">Dados de endereço</span>
												</Col>
											</Row>
											<Row className="mb-1">
												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Logradouro *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'logradouro',
																	placeholder: 'Logradouro',
																	id: 'logradouro',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.logradouro,
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
													<ErrorMessage className="alerta_error_form_label" name="logradouro" component="div" />
												</Col>

												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Bairro *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'bairro',
																	placeholder: 'Bairro',
																	id: 'bairro',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.bairro,
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
													<ErrorMessage className="alerta_error_form_label" name="bairro" component="div" />
												</Col>
											</Row>
											<Row className="mb-1">
												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Complemento / Ponto de referência',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'complemento',
																	placeholder: 'Complemento',
																	id: 'complemento',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.complemento,
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
													<ErrorMessage className="alerta_error_form_label" name="complemento" component="div" />
												</Col>
												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Cep *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'cep',
																	placeholder: 'Cep',
																	id: 'cep',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.cep,
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
													<ErrorMessage className="alerta_error_form_label" name="cep" component="div" />
												</Col>
											</Row>
											<Row className="mb-1">
												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Número *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'numero',
																	placeholder: 'Número',
																	id: 'numero',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.numero,
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
													<ErrorMessage className="alerta_error_form_label" name="numero" component="div" />
												</Col>
												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Cidade *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'cidade',
																	placeholder: 'Cidade',
																	id: 'cidade',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.cidade,
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
													<ErrorMessage className="alerta_error_form_label" name="cidade" component="div" />
												</Col>
											</Row>
											<Row className="mb-1">
												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Estado *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'uf',
																	placeholder: 'Estado',
																	id: 'uf',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.uf,
																	className: estilos.input,
																	size: "sm"
																},
																options: [],
																atributsContainer: {
																	className: ''
																},
																hookToLoadFromDescription: ESTADO_ALL_POST,
																callbackDataItemChoice: (param) => {
																	let { label, value } = param
																	setFieldValue('uf', value)
																}
															}
														}
														ComponentFilter={Estado}
														component={Required}
													></Field>
													<ErrorMessage className="alerta_error_form_label" name="uf" component="div" />
												</Col>
												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Pais *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'pais',
																	placeholder: 'Pais',
																	id: 'pais',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.pais,
																	className: estilos.input,
																	size: "sm"
																},
																options: [],
																atributsContainer: {
																	className: ''
																},
																hookToLoadFromDescription: PAIS_ALL_POST,
																callbackDataItemChoice: (param) => {
																	let { label, value } = param
																	setFieldValue('pais', value)
																}
															}
														}
														ComponentFilter={Pais}
														component={Required}
													></Field>
													<ErrorMessage className="alerta_error_form_label" name="pais" component="div" />
												</Col>
											</Row>
											<Row className="my-3">
												<Col xs="12" sm="12" md="12">
													<span className="label_title_grup_forms" >Dados para contato</span>
												</Col>
											</Row>
											<Row className="mb-1">
												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Telefone',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'telefone',
																	placeholder: '99999999999',
																	id: 'telefone',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.telefone,
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
													<ErrorMessage className="alerta_error_form_label" name="telefone" component="div" />
												</Col>
												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Celular *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'celular',
																	placeholder: '99999999999',
																	id: 'celular',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.celular,
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
													<ErrorMessage className="alerta_error_form_label" name="celular" component="div" />
												</Col>
											</Row>
											<Row className="mb-1">
												<Col xs="12" sm="12" md="6">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Email',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'email',
																	placeholder: 'email@exemplo.com',
																	id: 'email',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.email,
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
													<ErrorMessage className="alerta_error_form_label" name="email" component="div" />
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

export default FormCliente;
