
export const CLIENT_ID = 5;
export const CLIENT_SECRET = 'nzKVwUPA3NyuSkvxBz2cNTc53mBL9BR7vrMrv8Tq';

const SANDBOX = true;
const BASE_URL =  (SANDBOX == true) ? "http://1.josepedro.tmp.k8.com.br/api" : '';///api

export const TOKEN_POST = (body)=>{
    return {
        url:'/oauth/token',
        method:'POST',
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':"*",
        },
        data:JSON.stringify(body)
    }
};

export const TESTE_API_GET = (body)=>{
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "text/html");

    var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'no-cors',
        cache: 'default' 
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