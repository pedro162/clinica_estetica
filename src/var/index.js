
export const MOBILE_WITH = 768;
export const IS_MOBILE = Number(window.innerWidth) <= Number(MOBILE_WITH);
export const WINDOW_WIDTH = window.innerWidth;

export const isMobileYet = ()=>{
	return Number(window.innerWidth) <= Number(MOBILE_WITH);
}