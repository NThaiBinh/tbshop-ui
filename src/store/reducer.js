import {
   SET_INFO_EMPLOYEE,
   SET_POSITION_INFO,
   SET_INPUT_VALUE,
   SET_LOCATION,
   SET_PAGE,
   SET_SHOW_TOAST,
   SET_NSX,
} from './constant'

const initState = {
   searchValue: '',
   positionInfo: [],
   infoEmployees: [],
   page: '1',
   isShowToast: false,
   toastType: '',
   toastMessage: '',
   previousPath: '',
   infoNSX: [],
}

function reducer(state, action) {
   switch (action.type) {
      case SET_INPUT_VALUE:
         return {
            ...state,
            searchValue: action.payload,
         }

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
      case SET_INFO_EMPLOYEE:
         return {
            ...state,
            infoEmployee: action.payload,
         }
      case SET_POSITION_INFO:
         return {
            ...state,
            positionInfo: action.payload,
         }
      case SET_LOCATION:
         return {
            ...state,
            previousPath: action.payload,
         }
      case SET_NSX:
         return {
            ...state,
            infoNSX: action.payload,
         }
      default:
   }
}

export { initState }
export default reducer
