import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST, PROFISSIONAIS_ALL_POST, ESPECIALIDADE_ALL_POST, PROFISSIONAL_HORARIOS_ALL_POST, PROFISSIONAL_DIAS_EXPEDIENTE_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormFormaPagamentoExterno from '../FormFormaPagamento/FormFormaPagamentoExterno.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const CadastroExterno = ({idFormaPagamento, setIdFormaPagamento, callback, atualizarFormaPagamento, setAtualizarFormaPagamento, cadastrarFormaPagamento, setCadastrarFormaPagamento})=>{

    
    const [showModalAtualizarFormaPagamento, setShowModalAtualizarFormaPagamento] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataFormaPagamento, setDataFormaPagamento] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
    const [dataProfissionais, setProfissionais] = React.useState(null)
    const [dataEspecializacoes, setEspecializacoes] = React.useState(null)
    const [dataProfissionalHorarios, setDataProfissionalHorarios] = React.useState(null)
    const [dataProfissionalDiasExprediente, setDataProfissionalDiasExprediente] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getProfissionais = async ()=>{
			const {url, options} = PROFISSIONAIS_ALL_POST({}, getToken());
			const {response, json} = await request(url, options);
			
			if(json){
				
				setProfissionais(json)
	        }else{
	        	setProfissionais([])
	        }
		}

		const getGrupo = async ()=>{
			const {url, options} = GRUPOS_ALL_POST({}, getToken());
	        const {response, json} = await request(url, options);
	        
	        if(json){
	            setDataGrupo(json)
	            
	        }else{
	        	setDataGrupo(null)
	        }
		}
		
		if(cadastrarFormaPagamento == true){
			getGrupo();
		}

		getProfissionais();
		setShowModalAtualizarFormaPagamento(true)
		
	}, [cadastrarFormaPagamento])

	return(
		<>
			{! dataGrupo &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar forma de pagamento'} size="log" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarFormaPagamento} showHide={()=>{setShowModalAtualizarFormaPagamento();}}>
					<Load/>
				</Modal>
			}
			{dataGrupo &&
				<FormFormaPagamentoExterno dataProfissionalDiasExprediente={dataProfissionalDiasExprediente} dataProfissionalHorarios={dataProfissionalHorarios} dataProfissionais={dataProfissionais} dataEspecializacoes={dataEspecializacoes} dataGrupo={dataGrupo} setIdFormaPagamento={setIdFormaPagamento} idFormaPagamento={idFormaPagamento} carregando={false} dataFormaPagamentoChoice={dataFormaPagamento} setAtualizarFormaPagamento={setAtualizarFormaPagamento} atualizarFormaPagamento={atualizarFormaPagamento} showModalCriarFormaPagamento={showModalAtualizarFormaPagamento} setShowModalCriarFormaPagamento={()=>{setShowModalAtualizarFormaPagamento();setCadastrarFormaPagamento()}} callback={callback} />
			}
		</>
	)
}

export default CadastroExterno;