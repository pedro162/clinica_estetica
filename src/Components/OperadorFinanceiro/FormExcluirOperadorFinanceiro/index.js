import React from 'react';
import {Col, Row, Table} from 'react-bootstrap';
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Required from '../../FormControl/Required.js';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import {FORMAT_DATA_PT_BR} from '../../../functions/index.js'
import Swal from 'sweetalert2'

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_SAVE_POST, CONSULTA_ALL_POST, OPERADOR_FINANCEIRO_DELETE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, PROFISSIONAL_DIAS_EXPEDIENTE_ALL_POST} from '../../../api/endpoints/geral.js'
import Details from '../Visualizar/details.js';


const FormExcluirOperadorFinanceiro = ({dataOperadorFinanceiroChoice, setIdOperadorFinanceiro, idOperadorFinanceiro, showModalExcluirOperadorFinanceiro, setShowModalExcluirOperadorFinanceiro, callback, excluirOperadorFinanceiro, setExcluirOperadorFinanceiro, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();
	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataOperadorFinanceiro, setDataOperadorFinanceiro] = React.useState([])

    const sendData = async ({
			ds_cancelamento
		})=>{

		const {url, options} = OPERADOR_FINANCEIRO_DELETE_POST(idOperadorFinanceiro, getToken());
        const {response, json} = await request(url, options);

        if(json && !error){
                
            callback();
            setShowModalExcluirOperadorFinanceiro();
            setExcluirOperadorFinanceiro(false);
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

	const dataToFormExcluirOperadorFinanceiro = ()=>{
    	let obj = { filial_id: '', pessoa_id: '', vrTarifa:'', vrDesconto: '', vrPorcentagemDesconto: '', nrRemessaAtual: '', qtdDiasProtesto: '', tpLocalAtualizacaoBoleto: '', id: '', isAssumeDuplicata: '', isPadrao: 'no', isLiberado: '', active: '', deleted_at: '', created_at: '', updated_at: '' }

		if (dataOperadorFinanceiroChoice) {

			let data = dataOperadorFinanceiroChoice

			if (data?.mensagem) {
				data = data?.mensagem
			} else if (data?.data) {
				data = data?.data
			}

			if (data.hasOwnProperty('vrTarifa')) {
				obj.vrTarifa = data.vrTarifa;
			}

			if (data.hasOwnProperty('vrDesconto')) {
				obj.vrDesconto = data.vrDesconto;
			}

			if (data.hasOwnProperty('vrPorcentagemDesconto')) {
				obj.vrPorcentagemDesconto = data.vrPorcentagemDesconto;
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

			if (data.hasOwnProperty('tpLocalAtualizacaoBoleto')) {
				obj.tpLocalAtualizacaoBoleto = data.tpLocalAtualizacaoBoleto;
			}

			if (data.hasOwnProperty('id')) {
				obj.id = data.id;
			}

			if (data.hasOwnProperty('isAssumeDuplicata')) {
				obj.isAssumeDuplicata = data.isAssumeDuplicata;
			}

			if (data.hasOwnProperty('isPadrao')) {
				obj.isPadrao = data.isPadrao;
			}

			if (data.hasOwnProperty('filial_id')) {
				obj.filial_id = data.filial_id;
			}

			if (data.hasOwnProperty('created_at')) {
				obj.created_at = FORMAT_DATA_PT_BR(data.created_at);
			}

			if (data.hasOwnProperty('active')) {
				obj.active = data.active;
			}

			if (data.hasOwnProperty('isLiberado')) {
				obj.isLiberado = data.isLiberado;
			}
			
		}

		return obj;
    }

	const handleSubmit = ()=>{
		sendData({ds_cancelamento:'Desistiu'})
	}

	const dataPlanotCancel = dataToFormExcluirOperadorFinanceiro();

	if(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
            footer: '',
            confirmButtonColor: "#07B201",
        });
    }
    
	return(

		<>
			 <Modal  handleConcluir={()=>{handleSubmit(); }}  title={' Excluir plano de pagamento'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalExcluirOperadorFinanceiro} showHide={()=>{setShowModalExcluirOperadorFinanceiro();setExcluirOperadorFinanceiro(false);setIdOperadorFinanceiro(null);}}>
				{
					carregando && carregando==true
					?
						(<Load/>)
					:
						(  
							<>
								{
									error && <Row className="my-3">
										<Col xs="12" sm="12" md="12">
											<AlertaDismissible title="Atenção:" message={error} variant={"danger"} />
										</Col>
									</Row>
								}
								<Details
									{...dataOperadorFinanceiroChoice}
									dataOperadorFinanceiroChoice={dataOperadorFinanceiroChoice}
								/>												

							</>

						)				
				}  

			</Modal>
		</>
	)
}

export default FormExcluirOperadorFinanceiro;
