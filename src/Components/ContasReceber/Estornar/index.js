import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST, CONTAS_RECEBER_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import EstornarContasReceberForm from './EstornarContasReceberForm.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Estornar = ({idContasReceber, setIdContasReceber, callback, atualizarContasReceber, setAtualizarContasReceber, cadastrarContasReceber, setEstornarContasReceber})=>{

    
    const [showModalAtualizarContasReceber, setShowModalAtualizarContasReceber] = React.useState(false)

    const [showModalEstornarContasReceber, setShowModalEstornarContasReceber] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataContasReceber, setDataContasReceber] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
			

		const getContasReceber = async ()=>{
			if(idContasReceber > 0){
				const {url, options} = CONTAS_RECEBER_ONE_GET(idContasReceber, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataContasReceber(json)
					setShowModalEstornarContasReceber(true)
					 
		        }else{
		        	setDataContasReceber([])
		        }
			}
		}

		getContasReceber();
		
		
	}, [idContasReceber])

	/*
		atualizarContasReceber && 
                <Atualizar setCarregandoDadosContasReceber={null} atualizarContasReceber={setAtualizarContasReceber} idContasReceber={clientChoice} setDataContasReceber={null} setShowModalCriarContasReceber={setShowModalAtualizarContasReceber} />
	*/
	//<Pesquisar idContasReceber={idContasReceber} setDataContasReceber={setDataContasReceber} setCarregandoDadosContasReceber={setCarregando} />
	return(
		<>
			{! dataContasReceber &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Estornar ContasReceber'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={showModalEstornarContasReceber} showHide={()=>{setShowModalEstornarContasReceber();}}>
					<Load/>
				</Modal>
			}
			{dataContasReceber &&
				<EstornarContasReceberForm setDataContasReceber={setDataContasReceber} setIdContasReceber={setIdContasReceber} idContasReceber={idContasReceber} carregando={false} dataContasReceberChoice={dataContasReceber} setEstornarContasReceber={setEstornarContasReceber} showModalCriarContasReceber={showModalEstornarContasReceber} setShowModalCriarContasReceber={setShowModalEstornarContasReceber} callback={callback} />
			}
		</>
	)
}

export default Estornar;