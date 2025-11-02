import { BASE_URL } from '../../../api/endpoints/geral.js';

//--- Bandeira de cartão  ----------------------------------
export const BANDEIRA_CARTAO_ALL_POST = (data, token) => {

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + token);

    var myInit = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body: JSON.stringify(data)
    };

    return {
        url: BASE_URL + '/api/bandeiras-cartoes/json',
        options: myInit
    }

}
export const BANDEIRA_CARTAO_ONE_GET = (id, token) => {

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + token);

    var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        //body:JSON.stringify(data)
    };

    return {
        url: BASE_URL + '/api/bandeiras-cartoes/info/' + id,
        options: myInit
    }

}

export const BANDEIRA_CARTAO_SAVE_POST = (data, token) => {

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + token);

    var myInit = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body: JSON.stringify(data)
    };

    return {
        url: BASE_URL + '/api/bandeiras-cartoes/store',
        options: myInit
    }

}

export const BANDEIRA_CARTAO_UPDATE_POST = (id, data, token) => {

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + token);

    var myInit = {
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
        body: JSON.stringify(data)
    };

    return {
        url: BASE_URL + '/api/bandeiras-cartoes/update/' + id,
        options: myInit
    }

}

export const BANDEIRA_CARTAO_DELETE_POST = (id, token) => {

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json; charset=UTF-8");
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + token);

    var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'no-store',
    };

    return {
        url: BASE_URL + '/api/bandeiras-cartoes/destroy/' + id,
        options: myInit
    }

}