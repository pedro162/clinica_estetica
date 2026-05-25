import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import { faHome, faSearch, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import { Col, Row, Tabs, Tab } from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './Estornar.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import { UserContex } from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, SERVICO_SAVE_POST, SERVICO_ALL_POST, ORDEM_SERVICO_FINALIZAR_POST, CAIXA_ALL_POST, PROFISSIONAIS_ALL_POST, CONTAS_RECEBER_UPDATE_POST, CONTAS_RECEBER_SAVE_POST, CONTAS_RECEBER_ITEM_ESTORNAR_POST } from '../../../api/endpoints/geral.js'
import Caixa from '../../Caixa/index.js';

const FormEstornarContasReceberItem = ({ dataContasReceberItemChoice, setDataContasReceberItem, setIdContasReceberItem, idContasReceberItem, showModalEstornarontasReceber, setShowModalEstornarContasReceberItem, callback, setEstornarContasReceberItem, atualizarContasReceberItem, setAtualizarContasReceberItem, showModalCriarContasReceberItem, setShowModalCriarContasReceberItem, carregando }) => {
	const { data, error, request, loading } = useFetch();
	const dataRequest = useFetch();
	const { getToken, dataUser } = React.useContext(UserContex);
	const [dataFiliais, setDataFiliais] = React.useState([])
	const [dataItens, setDataitens] = React.useState([])
	const [isOrcamento, setIsOramento] = React.useState(false)
	const [qtdAtualizaCobrancas, setQtdAtualizaCobrancas] = React.useState(0)

	const sendData = async ({
		...params
	}) => {
		const data = {
			...params
		}

		const { url, options } = CONTAS_RECEBER_ITEM_ESTORNAR_POST(idContasReceberItem, data, getToken());
		const { response, json } = await request(url, options);

		if (!error) {
			callback && callback();
			setShowModalEstornarContasReceberItem && setShowModalEstornarContasReceberItem();
			setAtualizarContasReceberItem && setAtualizarContasReceberItem(false);
			setIdContasReceberItem && setIdContasReceberItem(null);
		}
	}

	const dataToFormContasReceberItem = () => {
		let obj = { caixa_id: '', descricao: '' }

		let dataContasReceberItem = dataContasReceberItemChoice

		if (dataContasReceberItem?.mensagem) {
			dataContasReceberItem = dataContasReceberItem?.mensagem;
		}

		if (dataContasReceberItem?.registro) {
			dataContasReceberItem = dataContasReceberItem?.registro;
		}

		if (dataContasReceberItem?.data) {
			dataContasReceberItem = dataContasReceberItem?.data;
		}

		if (dataContasReceberItem?.data) {
			dataContasReceberItem = dataContasReceberItem?.data;
		}

		if (dataContasReceberItem && dataContasReceberItem.hasOwnProperty('id')) {
			obj = { ...obj, ...dataContasReceberItem }
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

				initialValues={{ ...dataToFormContasReceberItem() }}
				enableReinitialize={true}
				validate={
					values => {
						const errors = {}

						if (!values.descricao) {
							errors.descricao = "Obrigatório"
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
							bottomButtons={null}
							handleConcluir={() => { handleSubmit(); }}
							title={'Estornar contas a receber'}
							size="xs"
							propsConcluir={{ 'disabled': loading }}
							labelConcluir={loading ? <><FontAwesomeIcon icon={faCheck} /> Salvando...</> : <><FontAwesomeIcon icon={faCheck} /> Concluir </>}
							dialogClassName={''}
							aria-labelledby={'aria-labelledby'}
							labelCanelar="Fechar"
							show={showModalCriarContasReceberItem} showHide={() => { setShowModalCriarContasReceberItem(); setEstornarContasReceberItem(false); setIdContasReceberItem(null); }}
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

												<Col xs="12" sm="12" md="12">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Caixa para extorno *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'caixa_id',
																	placeholder: 'Caixa para extorno',
																	id: 'caixa_id',
																	name_cod: 'caixa_id',
																	name_desacription: 'caixa_name',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.caixa_id,
																	name_servico: values?.caixa_name,
																	className: `${estilos.input}`,
																	size: "sm"
																},
																atributsContainer: {
																	className: ''
																},
																hookToLoadFromDescription: CAIXA_ALL_POST,
																callbackDataItemChoice: (param) => {
																	let { label, value } = param

																	setFieldValue('caixa_id', value)
																}
															}
														}

														ComponentFilter={Caixa}
														componentTitle={'Escolha um caixa'}
														component={Required}
													>   </Field>
													<ErrorMessage className="alerta_error_form_label" name="caixa_id" component="div" />
												</Col>
											</Row>
											<Row className="mb-3">
												<Col xs="12" sm="12" md="12">
													<Field
														data={
															{
																hasLabel: true,
																contentLabel: 'Histórico *',
																atributsFormLabel: {

																},
																atributsFormControl: {
																	type: 'text',
																	name: 'descricao',
																	placeholder: '0,00',
																	id: 'descricao',
																	name_cod: 'descricao',
																	name_desacription: 'descricao',
																	onChange: handleChange,
																	onBlur: handleBlur,
																	value: values.descricao,
																	className: `${estilos.input}`,
																	size: "sm",
																},
																atributsContainer: {
																	className: ''
																},
															}
														}
														component={FormControlInput}
													>   </Field>
													<ErrorMessage className="alerta_error_form_label" name="descricao" component="div" />
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

export default FormEstornarContasReceberItem;
