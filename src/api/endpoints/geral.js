
export const CLIENT_ID = 3;//4;//
export const CLIENT_SECRET = 'GHt5adQ3HrW6NI3LkGrUQyETEK04OnczcOAIXabH';//'4mjSEP4YSokEwWyyrkV3Jqb4ABylEAT0stjpKVae';//

const SANDBOX = false;
const BASE_URL =  (SANDBOX == true) ? "http://1.josepedro.tmp.k8.com.br/api" : 'http://localhost:8080';///api

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
    return  {
        url:'/api/user',
        options:{
            method:'GET',
            headers:{
                Authorization:'Bearer '+token,
            }
        }
    }
}

export const USER_POST = (body)=>{
    return{
        url:'/api/user',
        options:{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        }
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