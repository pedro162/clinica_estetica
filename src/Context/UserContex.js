import React from 'react';
import {TOKEN_POST, USER_GET,CLIENT_ID,CLIENT_SECRET} from '../api/endpoints/geral.js';
import {useHistory} from 'react-router-dom'
import {login, logout, getToken, isAuthenticated, sandBox} from '../api/Auth/index.js'
import useFetch from '../Hooks/useFetch.js';
import {Login} from '../View/index.js'
import {IS_MOBILE, MOBILE_WITH, isMobileYet, WINDOW_WIDTH} from '../var/index.js'

export const UserContex = React.createContext();

export const UserStorange = ({children})=>{

    const [loginUser, setLoginUser] = React.useState(null)
    const [dataUser, setDataUser] = React.useState(null)
    const [isMobile, setIsMobile] = React.useState(false) 

    const historyUser = useHistory();
    const {request, loading, data, error} = useFetch();

     const getDataUser = React.useCallback(async ()=>{
        

        try{

            
           await getUser();

        }catch(err){
            

        }finally{

        }


    }, [])

    const userLogout = ()=>{
        
      
        try{

            logout();
            setLoginUser(false)
            historyUser.push('/usuario/login');

        }catch(er){
            console.log(er)
        }

    }

    const getUser = async ()=>{
       
        try{

            console.log(getToken())
            setLoginUser(isAuthenticated)

            if(isAuthenticated){

                const {url, options} = USER_GET(getToken())
                const {response, json} = await request(url, options);
                if(json){ 
                    console.log('====================== Dados do usuario aqui 00 =====')  
                    setDataUser(json)    
                    console.log(json)
                    console.log('====================== Dados do usuario aqui 00 =====')           
                }
            }

            

        }catch(er){
            console.log(er)
        }
    }

    const userLogin = async (username, password)=>{
        try{
            let token = 'asdf123';
            let dtaToken = {};
            if(sandBox === false){

                const {url, options} = TOKEN_POST({
                    'grant_type':'password',
                    'client_id': CLIENT_ID,
                    'client_secret':CLIENT_SECRET,
                    'username':username,
                    'password':password
                 });

                const {response, json} = await request(url, options);

                if(json){          

                    token = json.access_token;
                    dtaToken = json;

                    if(token){
                        login(token)
                        await getUser();
                        historyUser.push('/home/painel');
                    }
                    
                }

            }
           
                   

        }catch(er){
            console.log(er)
        }
    }

    /*
     const requestToken = async() =>{
       
           const {url, options} = TOKEN_POST({
                'grant_type':'password',
                'client_id': CLIENT_ID,
                'client_secret':CLIENT_SECRET,
                'username':'admin@gmail.com',
                'password':'123456'
             });


            const {response, json} = await request(url, options);

            
        }

    */

    React.useEffect(()=>{
        getDataUser()
    }, [])


     React.useEffect(() => {
        const handleResize = () => {
          setIsMobile(isMobileYet());
        };

        // Adiciona um listener de redimensionamento
        window.addEventListener('resize', handleResize);

        // Remove o listener quando o componente é desmontado
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []); // O segundo parâmetro vazio assegura que o efeito é executado apenas uma vez durante a montagem do componente


    return(
        <UserContex.Provider value={{historyUser, isMobile, userLogin, getUser,userLogout, isAuthenticated, sandBox,loginUser, setLoginUser, loading, data, error, dataUser, setDataUser, getToken}} >
            {children}
        </UserContex.Provider>
    )
}
