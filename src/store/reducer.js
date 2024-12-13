import { IS_LOGIN, IS_USER_UPDATE, SET_IS_UPDATE, SET_PAGE, SET_SEARCH_DASHBROAD, SET_SHOW_TOAST } from './constant'

const initState = {
   isUserUpdate: false,
   isLogin: false,
   page: '1',
   isShowToast: false,
   toastType: '',
   toastMessage: '',
   searchValue: '',
   isUpdate: false,
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
      case SET_SEARCH_DASHBROAD:
         return {
            ...state,
            searchValue: action.searchValue,
         }
      case SET_IS_UPDATE:
         return {
            ...state,
            isUpdate: action.isUpdate,
         }
      default:
   }
}

export { initState }
export default reducer
