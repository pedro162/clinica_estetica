import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormMovimentacoesFinanceira from '../FormMovimentacoesFinanceira/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idMovimentacoesFinanceira, setIdMovimentacoesFinanceira, callback, atualizarMovimentacoesFinanceira, setAtualizarMovimentacoesFinanceira, cadastrarMovimentacoesFinanceira, setCadastrarMovimentacoesFinanceira})=>{

    
    const [showModalAtualizarMovimentacoesFinanceira, setShowModalAtualizarMovimentacoesFinanceira] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataMovimentacoesFinanceira, setDataMovimentacoesFinanceira] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getGrupo = async ()=>{
			const {url, options} = GRUPOS_ALL_POST({}, getToken());

	        const {response, json} = await request(url, options);
	        console.log('All grupos here')
	        console.log(json)
	        if(json){
	            setDataGrupo(json)
	            setShowModalAtualizarMovimentacoesFinanceira(true)
	        }else{
	        	setDataGrupo(null)
	        }
		}
		if(cadastrarMovimentacoesFinanceira == true){
			getGrupo();
		}
		
		
	}, [cadastrarMovimentacoesFinanceira])

	/*
		atualizarMovimentacoesFinanceira && 
                <Atualizar setCarregandoDadosMovimentacoesFinanceira={null} atualizarMovimentacoesFinanceira={setAtualizarMovimentacoesFinanceira} idMovimentacoesFinanceira={clientChoice} setDataMovimentacoesFinanceira={null} setShowModalCriarMovimentacoesFinanceira={setShowModalAtualizarMovimentacoesFinanceira} />
	*/
	//<Pesquisar idMovimentacoesFinanceira={idMovimentacoesFinanceira} setDataMovimentacoesFinanceira={setDataMovimentacoesFinanceira} setCarregandoDadosMovimentacoesFinanceira={setCarregando} />
	return(
		<>
			{! dataGrupo &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar atendimento'} size="log" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarMovimentacoesFinanceira} showHide={()=>{setShowModalAtualizarMovimentacoesFinanceira();}}>
					<Load/>
				</Modal>
			}
			{dataGrupo &&
				<FormMovimentacoesFinanceira dataGrupo={dataGrupo} setIdMovimentacoesFinanceira={setIdMovimentacoesFinanceira} idMovimentacoesFinanceira={idMovimentacoesFinanceira} carregando={false} dataMovimentacoesFinanceiraChoice={dataMovimentacoesFinanceira} setAtualizarMovimentacoesFinanceira={setAtualizarMovimentacoesFinanceira} atualizarMovimentacoesFinanceira={atualizarMovimentacoesFinanceira} showModalCriarMovimentacoesFinanceira={showModalAtualizarMovimentacoesFinanceira} setShowModalCriarMovimentacoesFinanceira={()=>{setShowModalAtualizarMovimentacoesFinanceira();setCadastrarMovimentacoesFinanceira()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;