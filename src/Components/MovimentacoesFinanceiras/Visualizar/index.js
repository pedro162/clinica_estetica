import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONTAS_MOVIMENTACOES_FINANCEIRAS_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import AtualizarForm from '../FormMovimentacoesFinanceira/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import Swal from 'sweetalert2'
import Detalhes from './Detalhes.js'

const Visualizar = ({idMovimentacoesFinanceira, setIdMovimentacoesFinanceira, callback, atualizarMovimentacoesFinanceira, setAtualizarMovimentacoesFinanceira, setVisualizarMovimentacoesFinanceira, noUseModal})=>{

    
    const [showModalAtualizarMovimentacoesFinanceira, setShowModalAtualizarMovimentacoesFinanceira] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataMovimentacoesFinanceira, setDataMovimentacoesFinanceira] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);	
    const [erroValidacao, setErroValidacao] = React.useState(null)
    const [showModalErro, setShowModalErro] = React.useState(false)

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getMovimentacoesFinanceira = async ()=>{
			if(idMovimentacoesFinanceira > 0){
				const {url, options} = CONTAS_MOVIMENTACOES_FINANCEIRAS_ONE_GET(idMovimentacoesFinanceira, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataMovimentacoesFinanceira(json)
					
					let data = json?.mensagem
					let erroValidaao  = validarBaixa(data);
					if(Array.isArray(erroValidaao) && erroValidaao.length > 0){
						setShowModalErro(true)
						erroValidaao = erroValidaao.join('<br/>')
						setErroValidacao(erroValidaao)
						Swal.fire({
							  	icon: "error",
							  	title: "Oops...",
							  	text: erroValidaao,
							  	footer: '',//'<a href="#">Why do I have this issue?</a>'
			  					confirmButtonColor: "#07B201",
							});
					}else{
						setDataMovimentacoesFinanceira(json)
						setShowModalAtualizarMovimentacoesFinanceira(true)
					 }
		        }else{
		        	setDataMovimentacoesFinanceira([])
		        	setVisualizarMovimentacoesFinanceira(false)
		        }
			}
		}

		getMovimentacoesFinanceira();
		
	}, [idMovimentacoesFinanceira])


	const validarBaixa = (data)=>{
		let erros = [];

		let {vrLiquido, vrPago, status, id} = data;
		vrLiquido 	= Number(vrLiquido)
		vrPago 		= Number(vrPago)
		let difAberto = vrLiquido - vrPago
		let difAbertoAbs = Math.abs(difAberto);

		if(!(String(status) == 'aberto')){
			//erros.push(`O contas a receber de código n° ${id} encontra-se ${status} e não poderá ser modificado`);
		}

		return erros;
	}
	
	if(noUseModal){
		return(
			<>

				{! dataMovimentacoesFinanceira &&
					<Load/>
				}

				<Detalhes
                            
                    carregando={carregando}
                    error={error}
                    loading={loading}
                        
                />
			</>
		)
	}

	return(
		<>
			{! dataMovimentacoesFinanceira &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Loading...'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarMovimentacoesFinanceira} showHide={()=>{setShowModalAtualizarMovimentacoesFinanceira(); setVisualizarMovimentacoesFinanceira(false)}}>
					<Load/>
				</Modal>
			}

			{dataMovimentacoesFinanceira && 
				<Modal 
						noBtnConcluir={true}
						handleConcluir={()=>null}
						title={'Detalhes movimentação nº '+idMovimentacoesFinanceira}
						size="lg" propsConcluir={{'disabled':loading}}
						labelConcluir={loading ? 'Salvando...' : 'Concluir'}
						dialogClassName={''} aria-labelledby={'aria-labelledby'}
						labelCanelar="Fechar"
						show={showModalAtualizarMovimentacoesFinanceira}
						showHide={()=>{setShowModalAtualizarMovimentacoesFinanceira();setIdMovimentacoesFinanceira(null); setVisualizarMovimentacoesFinanceira(false)}}

				>
	                <Detalhes
	                    
	                    carregando={carregando}
	                    error={error}
	                    loading={loading}
	                    setDataMovimentacoesFinanceira={setDataMovimentacoesFinanceira}
	                    setIdMovimentacoesFinanceira={setIdMovimentacoesFinanceira}
	                    idMovimentacoesFinanceira={idMovimentacoesFinanceira}
	                    dataMovimentacoesFinanceiraChoice={dataMovimentacoesFinanceira}
	                    showModalCriarMovimentacoesFinanceira={showModalAtualizarMovimentacoesFinanceira}
	                    setShowModalCriarMovimentacoesFinanceira={setShowModalAtualizarMovimentacoesFinanceira}
	                    callback={callback}
	                    
	                />			

	            </Modal>

			}
		</>
	)
}

export default Visualizar;