import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import { Col, Row, Tabs, Tab } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormOrdemServico.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import FormOrdemServicoItens from '../FormOrdemServicoItens/index.js'
import FormOrdemServicoCobrancas from '../FormOrdemServicoCobrancas/index.js'
import Swal from 'sweetalert2'


import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, SERVICO_SAVE_POST, SERVICO_ALL_POST, ORDEM_SERVICO_FINALIZAR_POST, CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, FILIAIS_ALL_POST, RCA_ALL_POST } from '../../../api/endpoints/geral.js'
import Vendedor from '../../Vendedor/index.js';
import Clientes from '../../Clientes/index.js';
import Filial from '../../Filial/index.js';


const FormOrdemServico = ({ dataOrdemServicoChoice, setDataOrdemServico, setIdOrdemServico, idOrdemServico, showModalCriarOrdemServico, setShowModalCriarOrdemServico, callback, atualizarOrdemServico, setAtualizarOrdemServico, carregando }) => {

	const { data, error, request, loading } = useFetch();
	const dataRequest = useFetch();

	const { getToken, dataUser } = React.useContext(UserContex);
	const formikRef = React.useRef(null)
	const [dataFiliais, setDataFiliais] = React.useState([])
	const [dataItens, setDataitens] = React.useState([])
	const [isOrcamento, setIsOramento] = React.useState(false)
	const [qtdAtualizaCobrancas, setQtdAtualizaCobrancas] = React.useState(0)

	const sendData = async ({
		rca_id,
		pessoa_rca_id,
		filial_id,
		pessoa_id,
		profissional_id,
		name_pessoa_contato
	}) => {

		rca_id = pessoa_rca_id > 0 && !rca_id ? pessoa_rca_id : rca_id;
		let is_orcamento = isOrcamento ? true : false;

		const data = {
			rca_id,
			pessoa_rca_id,
			filial_id,
			pessoa_id,
			profissional_id,
			name_pessoa_contato,
			is_orcamento
		}

		const { url, options } = ORDEM_SERVICO_FINALIZAR_POST(idOrdemServico, data, getToken());
		const { response, json } = await request(url, options);
		if (json) {
			callback();
			setShowModalCriarOrdemServico();
			setAtualizarOrdemServico(false);
			setIdOrdemServico(null);

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
		setDataFiliais([]);
		const { url, options } = FILIAIS_ALL_POST({}, getToken());
		const { response, json } = await dataRequest.request(url, options);

		if (json) {
			setDataFiliais(json)
		} else {

			setDataFiliais([]);
		}
	}

	const dataToFormOrdemServico = () => {
		let obj = {
			filial_id: '', vrTotal: '',
			status: '', observacao: '', dsArquivo: '', pessoa_id: '', pessoa_name: '', pessoa_rca_id: '', filial_id: '', filial_name: '', user_id: '', user_update_id: '', active: '', deleted_at: '', created_at: '', updated_at: '', vr_final: '', vr_desconto: '', pct_acrescimo: '', vr_acrescimo: '', profissional_id: '', pct_desconto: ''
		}

		let data = dataOrdemServicoChoice;

		if (data?.mensagem) {
			data = data?.mensagem;
		}

		if (data?.registro) {
			data = data?.registro;
		}

		if (data?.data) {
			data = data?.data;
		}

		if (data?.data) {
			data = data?.data;
		}

		if (data?.id) {

			if (data.hasOwnProperty('filial_id')) {
				obj.filial_id = data.filial_id;
			}

			if (data.hasOwnProperty('filial')) {
				obj.filial_name = data?.filial?.pessoa?.name;
			}

			if (data.hasOwnProperty('vrTotal')) {
				obj.vrTotal = data.vrTotal;
			}

			if (data.hasOwnProperty('status')) {
				obj.status = data.status;
			}

			if (data.hasOwnProperty('observacao')) {
				obj.observacao = data.observacao;
			}

			if (data.hasOwnProperty('dsArquivo')) {
				obj.dsArquivo = data.dsArquivo;
			}

			if (data.hasOwnProperty('pessoa_id')) {
				obj.pessoa_id = data.pessoa_id;
			}

			if (data.hasOwnProperty('pessoa')) {
				obj.pessoa_name = data?.pessoa?.name;
			}

			if (data.hasOwnProperty('pessoa_rca_id')) {
				obj.pessoa_rca_id = data.pessoa_rca_id;
			}

			if (data.hasOwnProperty('vr_final')) {
				obj.vr_final = data.vr_final;
			}

			if (data.hasOwnProperty('vr_desconto')) {
				obj.vr_desconto = data.vr_desconto;
			}

			if (data.hasOwnProperty('pct_acrescimo')) {
				obj.pct_acrescimo = data.pct_acrescimo;
			}

			if (data.hasOwnProperty('vr_acrescimo')) {
				obj.vr_acrescimo = data.vr_acrescimo;
			}

			if (data.hasOwnProperty('profissional_id')) {
				obj.profissional_id = data.profissional_id;
			}

			if (data.hasOwnProperty('pct_desconto')) {
				obj.pct_desconto = data.pct_desconto;
			}

		}

		return obj;
	}

	React.useEffect(() => {
		if (!formikRef.current) {
			return;
		}

		const next = dataToFormOrdemServico();
		formikRef.current.setFieldValue('vrTotal', next.vrTotal);
		formikRef.current.setFieldValue('vr_desconto', next.vr_desconto);
		formikRef.current.setFieldValue('vr_final', next.vr_final);
	}, [dataOrdemServicoChoice])

	const preparaFilialToForm = () => {
		if (dataFiliais.hasOwnProperty('mensagem') && Array.isArray(dataFiliais.mensagem) && dataFiliais.mensagem.length > 0) {
			let filiais = dataFiliais.mensagem.map(({ id, name_filial }, index, arr) => ({ label: name_filial, valor: id, props: {} }))
			filiais.unshift({ label: 'Selecione...', valor: '', props: { selected: 'selected', disabled: 'disabled' } })

			return filiais;
		}

		return []
	}

	React.useEffect(() => {

		if (dataOrdemServicoChoice && dataOrdemServicoChoice.hasOwnProperty('mensagem')) {
			let data = dataOrdemServicoChoice.mensagem;
			setDataitens(data?.item)
		}

	}, [])

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
			//width:'20rem',
		});
	}

	return (

		<>
			<Formik

				initialValues={{ ...dataToFormOrdemServico() }}
				enableReinitialize={false}
				innerRef={formikRef}
				validate={
					values => {

						const errors = {}

						if (!values.filial_id) {
							errors.filial_id = "Obrigatório"
						}


						if (!values.pessoa_rca_id) {
							errors.pessoa_rca_id = "Obrigatório"
						}

						if (!values.pessoa_id) {
							errors.pessoa_id = "Obrigatório"
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

						<Modal
							bottomButtons={[{ acao: () => { setIsOramento(true); handleSubmit(); }, label: 'Orçamento', propsAcoes: { className: 'btn btn-sm btn-secondary', style: { 'justifyContent': 'flex-end' } }, icon: <FontAwesomeIcon icon={faCheck} /> }]}
							handleConcluir={() => { handleSubmit(); }}
							title={(atualizarOrdemServico == true ? 'Atualizar' : 'Cadastrar') + ' Ordem de Servico'}
							size="lg"
							propsConcluir={{ 'disabled': loading }}
							labelConcluir={loading ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
							dialogClassName={'modal-90w'}
							aria-labelledby={'aria-labelledby'}
							labelCanelar="Fechar"
							show={showModalCriarOrdemServico}
							showHide={() => { setShowModalCriarOrdemServico(); setAtualizarOrdemServico(false); setIdOrdemServico(null); }}
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
											<Row className="mb-3">
												<Col xs="12" sm="12" md="3">
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
																	name_cod: 'filial_id',
																	name_desacription: 'filial_name',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.filial_id,
																	name_servico: values.filial_name,
																	className: estilos.input,
																	size: "sm"
																},
																atributsContainer: {
																	className: ''
																},
																hookToLoadFromDescription: CLIENTES_ALL_POST,
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

												<Col xs="12" sm="12" md="3">
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
													>   </Field>
													<ErrorMessage className="alerta_error_form_label" name="pessoa_id" component="div" />
												</Col>

												<Col xs="12" sm="12" md="3">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Vendedor *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'pessoa_rca_id',
																	placeholder: 'Vendedor',
																	id: 'pessoa_rca_id',
																	name_cod: 'pessoa_rca_id',
																	name_desacription: 'rca_name',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.pessoa_rca_id,
																	className: estilos.input,
																	size: "sm"
																},
																atributsContainer: {
																	className: ''
																},
																hookToLoadFromDescription: RCA_ALL_POST,
																callbackDataItemChoice: (param) => {
																	let { label, value } = param
																	setFieldValue('pessoa_rca_id', value)
																}
															}
														}

														ComponentFilter={Vendedor}
														componentTitle={'Escolha vendedor'}
														component={Required}
													></Field>
													<ErrorMessage className="alerta_error_form_label" name="pessoa_rca_id" component="div" />


												</Col>

												<Col xs="12" sm="12" md="3">
													<Field
														data={
															{
																hasNumberFormat: true,
																hasLabel: true,
																contentLabel: 'R$ Crédito *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'vrSaldoCreditoCliente',
																	placeholder: '0,00',
																	id: 'vrSaldoCreditoCliente',
																	name_cod: 'vrSaldoCreditoCliente',
																	name_desacription: 'vrSaldoCreditoCliente',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.vrSaldoCreditoCliente,
																	className: estilos.input,
																	size: "sm",
																	readonly: 'readonly',
																},
																atributsContainer: {
																	className: ''
																},
															}
														}
														component={FormControlInput}
													>   </Field>
													<ErrorMessage className="alerta_error_form_label" name="vrSaldoCreditoCliente" component="div" />
												</Col>
											</Row>
											<Row className="mb-3">
												<Col xs="12" sm="12" md="4">
													<Field
														data={
															{
																hasNumberFormat: true,
																hasLabel: true,
																contentLabel: 'Total bruto *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'vrTotal',
																	placeholder: '0,00',
																	id: 'vrTotal',
																	name_cod: 'vrTotal',
																	name_desacription: 'vrTotal',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.vrTotal,
																	className: estilos.input,
																	size: "sm",
																	readonly: 'readonly',
																},
																atributsContainer: {
																	className: ''
																},
															}
														}
														component={FormControlInput}
													>   </Field>
													<ErrorMessage className="alerta_error_form_label" name="vrTotal" component="div" />
												</Col>

												<Col xs="12" sm="12" md="4">
													<Field
														data={
															{
																hasNumberFormat: true,
																hasLabel: true,
																contentLabel: 'R$ Desconto *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'vr_desconto',
																	placeholder: '0,00',
																	id: 'vr_desconto',
																	name_cod: 'vr_desconto',
																	name_desacription: 'vr_desconto',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.vr_desconto,
																	className: estilos.input,
																	size: "sm",
																	readonly: 'readonly',
																},
																atributsContainer: {
																	className: ''
																},
															}
														}
														component={FormControlInput}
													>   </Field>
													<ErrorMessage className="alerta_error_form_label" name="vr_desconto" component="div" />
												</Col>


												<Col xs="12" sm="12" md="4">
													<Field
														data={
															{
																hasNumberFormat: true,
																hasLabel: true,
																contentLabel: 'R$ Total *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'vr_final',
																	placeholder: '0,00',
																	id: 'vr_final',
																	name_cod: 'vr_final',
																	name_desacription: 'vr_final',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.vr_final,
																	className: estilos.input,
																	size: "sm",
																	readonly: 'readonly',
																},
																atributsContainer: {
																	className: ''
																},
															}
														}
														component={FormControlInput}
													>   </Field>
													<ErrorMessage className="alerta_error_form_label" name="vr_final" component="div" />
												</Col>
											</Row>

											<Row className="my-3 mt-5">
												<Col xs="12" sm="12" md="12">
													<Tabs
														defaultActiveKey="servicos"
														id="fill-tab-example"
														className="mb-3"
														fill
													>
														<Tab eventKey="servicos" title="Serviços">
															<FormOrdemServicoItens

																idOrdemServico={idOrdemServico}
																itensOrdem={dataItens}
																setDataitens={setDataitens}
																setDataOrdemServicoGlobal={setDataOrdemServico}
																setQtdAtualizaCobrancas={setQtdAtualizaCobrancas}
															/>
														</Tab>
														<Tab eventKey="cobrancas" title="Cobranças">
															<FormOrdemServicoCobrancas

																idOrdemServico={idOrdemServico}
																itensOrdem={dataItens}
																setDataitens={setDataitens}
																setDataOrdemServicoGlobal={setDataOrdemServico}
																qtdAtualizaCobrancas={qtdAtualizaCobrancas}
															/>
														</Tab>
													</Tabs>
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

export default FormOrdemServico;
