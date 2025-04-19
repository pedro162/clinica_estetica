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

import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_SAVE_POST, CONSULTA_ALL_POST, FORMA_PAGAMENTO_DELETE_POST,CLIENTES_ALL_POST, PROFISSIONAIS_ALL_POST, PROFISSIONAL_DIAS_EXPEDIENTE_ALL_POST} from '../../../api/endpoints/geral.js'
import Details from '../Visualizar/details.js';


const FormExcluirFormaPagamento = ({dataFormaPagamentoChoice, setIdFormaPagamento, idFormaPagamento, showModalExcluirFormaPagamento, setShowModalExcluirFormaPagamento, callback, excluirFormaPagamento, setExcluirFormaPagamento, carregando})=>{

	const {data, error, request, loading} = useFetch();
	const dataRequest = useFetch();
	const {getToken, dataUser} = React.useContext(UserContex);
	const [dataFormaPagamento, setDataFormaPagamento] = React.useState([])

    const sendData = async ({
			ds_cancelamento
		})=>{

		const {url, options} = FORMA_PAGAMENTO_DELETE_POST(idFormaPagamento, getToken());
        const {response, json} = await request(url, options);

        if(json && !error){
                
            callback();
            setShowModalExcluirFormaPagamento();
            setExcluirFormaPagamento(false);
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

	const dataToFormExcluirFormaPagamento = ()=>{
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

			if (data.hasOwnProperty('created_at')) {
				obj.created_at = FORMAT_DATA_PT_BR(data.created_at);
			}

			if (data.hasOwnProperty('active')) {
				obj.active = data.active;
			}
			
		}

		return obj;
    }

	const handleSubmit = ()=>{
		sendData({ds_cancelamento:'Desistiu'})
	}

	const dataFormatCancel = dataToFormExcluirFormaPagamento();

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
			 <Modal  handleConcluir={()=>{handleSubmit(); }}  title={' Excluir forma de pagamento'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalExcluirFormaPagamento} showHide={()=>{setShowModalExcluirFormaPagamento();setExcluirFormaPagamento(false);setIdFormaPagamento(null);}}>
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
									{...dataFormaPagamentoChoice}
									dataFormaPagamentoChoice={dataFormaPagamentoChoice}
								/>												

							</>

						)
											
				}  

			</Modal>
		</>
	)
}

export default FormExcluirFormaPagamento;
