
export const CLIENT_ID = 4;//3;//
export const CLIENT_SECRET = 'Ko9WDBtcRdD0O0RfnK8rzSHs88ODPVcjDUeeba8D';//'PxXWykq33uGGN779ofMq0qnVeoN6GiiimUd4dtYz';//

const SANDBOX = false;
const BASE_URL =  (SANDBOX === true) ? "http://1.josepedro.tmp.k8.com.br/api" : 'http://localhost:8081';///api

export const TOKEN_POST = (data)=>{
   
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/oauth/token',
        options:myInit
    }
};

export const TESTE_API_GET = (body)=>{
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "text/html");

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'no-cors',
        cache:'no-store'
   };

   return{
        url:BASE_URL+'/country',
        options:myInit
    }

};

export const TOKEN_VALIDATE_POST = (token)=>{

    return{
        url:'/jwt-auth/v1/token/validate',
        options:{
            method:'POST',
            headers:{
                Authorization:'Bearer '+token
            }
        }
    }
}

export const USER_GET = (token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/user',
        options:myInit
    }

}

export const USER_ALL_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/usuario/json',
        options:myInit
    }

}

export const CLIENTES_ALL_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/pessoa/json',
        options:myInit
    }

}
export const CLIENTES_ONE_GET = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/pessoa/info/'+id,
        options:myInit
    }

}

export const CLIENTES_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/pessoa/store',
        options:myInit
    }

}

export const CLIENTES_UPDATE_POST = (id,data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/pessoa/update/'+id,
        options:myInit
    }

}

//---- HOME ----------------
export const HOME_ALL_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/pessoa/json',
        options:myInit
    }

}
export const HOME_ONE_GET = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/pessoa/info/'+id,
        options:myInit
    }

}

export const HOME_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/pessoa/store',
        options:myInit
    }

}

export const HOME_UPDATE_POST = (id,data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/pessoa/update/'+id,
        options:myInit
    }

}

//--- GRUPOS --------------------
export const GRUPOS_ALL_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/grupo/json',
        options:myInit
    }

}
export const GRUPOS_ONE_GET = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/grupo/info/'+id,
        options:myInit
    }

}

export const GRUPOS_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/grupo/store',
        options:myInit
    }

}

export const GRUPOS_UPDATE_POST = (id,data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/grupo/update/'+id,
        options:myInit
    }

}
//--- CIDADE ----------------------------------
export const CIDADE_ALL_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/cidade/json',
        options:myInit
    }

}
export const CIDADE_ONE_GET = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/cidade/info/'+id,
        options:myInit
    }

}

export const CIDADE_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/cidade/store',
        options:myInit
    }

}

export const CIDADE_UPDATE_POST = (id,data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/cidade/update/'+id,
        options:myInit
    }

}
//--- PAÍS -----------------------
export const PAIS_ALL_POST= (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/pais/json',
        options:myInit
    }

}
export const PAIS_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/pais/store',
        options:myInit
    }

}


//--- ESTADO -----------------------
export const ESTADO_ALL_POST= (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/estado/json',
        options:myInit
    }

}
export const ESTADO_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/estado/store',
        options:myInit
    }

}
//------------


//--- AGENDA EVENTO ----------------------------------
export const AGENDA_EVENTO_ALL_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/agenda/evento/json',
        options:myInit
    }

}
export const AGENDA_EVENTO_ONE_GET = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/agenda/evento/info/'+id,
        options:myInit
    }

}

export const AGENDA_EVENTO_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/agenda/evento/store',
        options:myInit
    }

}

export const AGENDA_EVENTO_UPDATE_POST = (id,data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/agenda/evento/update/'+id,
        options:myInit
    }

}

//--- CATEGORIA EVENTO ----------------------------------
export const CATEGORIA_EVENTO_ALL_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/categoria/evento/json',
        options:myInit
    }

}
export const CATEGORIA_EVENTO_ONE_GET = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/categoria/evento/info/'+id,
        options:myInit
    }

}

export const CATEGORIA_EVENTO_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/categoria/evento/store',
        options:myInit
    }

}

export const CATEGORIA_EVENTO_UPDATE_POST = (id,data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/categoria/evento/update/'+id,
        options:myInit
    }

}

export const CATEGORIA_EVENTO_DELETE_POST = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
   };

   return{
        url:BASE_URL+'/api/categoria/evento/destroy/'+id,
        options:myInit
    }

}

//--- ESPECIALIDADES  ----------------------------------
export const ESPECIALIDADE_ALL_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/especialidade/json',
        options:myInit
    }

}
export const ESPECIALIDADE_ONE_GET = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/especialidade/info/'+id,
        options:myInit
    }

}

export const ESPECIALIDADE_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/especialidade/store',
        options:myInit
    }

}

export const ESPECIALIDADE_UPDATE_POST = (id,data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/especialidade/update/'+id,
        options:myInit
    }

}

export const ESPECIALIDADE_DELETE_POST = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
   };

   return{
        url:BASE_URL+'/api/especialidade/destroy/'+id,
        options:myInit
    }

}

//--- PROFISSIONAIS  ----------------------------------
export const PROFISSIONAIS_ALL_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/profissional/json',
        options:myInit
    }

}
export const PROFISSIONAIS_ONE_GET = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/profissional/info/'+id,
        options:myInit
    }

}

export const PROFISSIONAIS_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/profissional/store',
        options:myInit
    }

}

export const PROFISSIONAIS_UPDATE_POST = (id,data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/profissional/update/'+id,
        options:myInit
    }

}

export const PROFISSIONAIS_DELETE_POST = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
   };

   return{
        url:BASE_URL+'/api/profissional/destroy/'+id,
        options:myInit
    }

}
//------------





//--- CONSULTA  ----------------------------------
export const CONSULTA_ALL_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/atendimento/json',
        options:myInit
    }

}
export const CONSULTA_ONE_GET = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/atendimento/info/'+id,
        options:myInit
    }

}

export const CONSULTA_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/atendimento/store',
        options:myInit
    }

}

export const CONSULTA_UPDATE_POST = (id,data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/atendimento/update/'+id,
        options:myInit
    }

}

export const CONSULTA_DELETE_POST = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
   };

   return{
        url:BASE_URL+'/api/atendimento/destroy/'+id,
        options:myInit
    }

}
export const CONSULTA_CANCELAR_POST = (id,data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/atendimento/cancelar/'+id,
        options:myInit
    }

}


//--- Formularis  ----------------------------------
export const FORMULARIO_ALL_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/formulario/json',
        options:myInit
    }

}
export const FORMULARIO_ONE_GET = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/formulario/info/'+id,
        options:myInit
    }

}

export const FORMULARIO_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/formulario/store',
        options:myInit
    }

}

export const FORMULARIO_UPDATE_POST = (id,data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/formulario/update/'+id,
        options:myInit
    }

}

export const FORMULARIO_DELETE_POST = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
   };

   return{
        url:BASE_URL+'/api/formulario/destroy/'+id,
        options:myInit
    }

}



//--- Formulario grupo  ----------------------------------
export const FORMULARIO_GRUPO_ALL_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/formulario/grupo/json',
        options:myInit
    }

}
export const FORMULARIO_GRUPO_ONE_GET = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/formulario/grupo/info/'+id,
        options:myInit
    }

}

export const FORMULARIO_GRUPO_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/formulario/grupo/store',
        options:myInit
    }

}

export const FORMULARIO_GRUPO_UPDATE_POST = (id,data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/formulario/grupo/update/'+id,
        options:myInit
    }

}

export const FORMULARIO_GRUPO_DELETE_POST = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
   };

   return{
        url:BASE_URL+'/api/formulario/grupo/destroy/'+id,
        options:myInit
    }

}


//--- Formulario items  ----------------------------------
export const FORMULARIO_ITEM_ALL_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/formulario/item/json',
        options:myInit
    }

}
export const FORMULARIO_ITEM_ONE_GET = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/formulario/item/info/'+id,
        options:myInit
    }

}

export const FORMULARIO_ITEM_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/formulario/item/store',
        options:myInit
    }

}

export const FORMULARIO_ITEM_UPDATE_POST = (id,data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/formulario/item/update/'+id,
        options:myInit
    }

}

export const FORMULARIO_ITEM_DELETE_POST = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
   };

   return{
        url:BASE_URL+'/api/formulario/item/destroy/'+id,
        options:myInit
    }

}

//--- Agenda  ----------------------------------
export const AGENDA_ALL_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/agenda/json',
        options:myInit
    }

}
export const AGENDA_ONE_GET = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/agenda/info/'+id,
        options:myInit
    }

}

export const AGENDA_SAVE_POST = (data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/agenda/store',
        options:myInit
    }

}

export const AGENDA_UPDATE_POST = (id,data, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body:JSON.stringify(data)
   };

   return{
        url:BASE_URL+'/api/agenda/update/'+id,
        options:myInit
    }

}

export const AGENDA_DELETE_POST = (id, token)=>{

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("Authorization", 'Bearer '+token);

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
   };

   return{
        url:BASE_URL+'/api/agenda/destroy/'+id,
        options:myInit
    }

}





export const PHOTO_POST = (formData, token)=>{
    return{
        url:'/api/photo',
        options:{
            method:'POST',
            headers:{
                Authorization:'Bearer '+token,
            },
            body:formData
        }
    }
}

export const PHOTOS_GET = ({page, total, user})=>{
    return({
        url: `/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
        options:{
            method:'GET',
            cache:'no-store'
        }
    })
}

export const PHOTO_GET = ({id})=>{
    return({
        url:`/api/photo/${id}`,
        options:{
            method: 'GET',
            cache:'no-store'
        }
        
    })
}

export const COMMENT_POST = (id, body)=>{

    return({
        url: `/api/comment/${id}`,
        options:{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization:'Bearer '+window.localStorage.getItem('token')
            },
            body:JSON.stringify(body)
        },
    })
}

export const PHOTO_DELET = (id)=>{
    return{
        url: `/api/photo/${id}`,
        options:{
            method:'DELETE',
            headers:{
                Authorization:'Bearer '+window.localStorage.getItem('toke'),
            }
        }
    }
}

export const PASSWORD_LOST =(body)=>{
    return{
        url:"/api/password/lost",
        options:{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(body)
        }
    }
}

export const PASSWORD_RESET=(body)=>{
    return{
        url:'/api/password/reset',
        options:{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(body)
        }
    }
}