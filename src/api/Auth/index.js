
export const TOKEN_KEY_ROOT = "ROOT_API";
export const isAuthenticated =()=>localStorage.getItem(TOKEN_KEY_ROOT) !== null;
export const getToken = ()=>localStorage.getItem(TOKEN_KEY_ROOT);
export const sandBox = false; 

export const login = token=>{
    localStorage.setItem(TOKEN_KEY_ROOT, token);
}

export const logout = ()=>{
    localStorage.removeItem(TOKEN_KEY_ROOT)
}