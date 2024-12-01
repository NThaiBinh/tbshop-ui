import { IS_LOGIN, IS_USER_UPDATE, SET_PAGE, SET_SHOW_TOAST } from './constant'

const initState = {
   isUserUpdate: false,
   isLogin: false,
   page: '1',
   isShowToast: false,
   toastType: '',
   toastMessage: '',
}

function reducer(state, action) {
   switch (action.type) {
      case SET_PAGE:
         return {
            ...state,
            page: action.payload,
         }
      case SET_SHOW_TOAST:
         return {
            ...state,
            isShowToast: action.isShowToast,
            toastType: action.toastType,
            toastMessage: action.toastMessage,
         }
      case IS_LOGIN:
         return {
            ...state,
            isLogin: action.isLogin,
         }
      case IS_USER_UPDATE:
         return {
            ...state,
            isUserUpdate: action.isUserUpdate,
         }
      default:
   }
}

export { initState }
export default reducer
