import { IS_LOGIN, SET_PAGE, SET_SHOW_TOAST } from './constant'

function setPage(payload) {
   return {
      type: SET_PAGE,
      payload,
   }
}

function setShowToast(isShowToast, toastType, toastMessage) {
   return {
      type: SET_SHOW_TOAST,
      isShowToast,
      toastType,
      toastMessage,
   }
}

function setIsLogin(isLogin) {
   return {
      type: IS_LOGIN,
      isLogin: isLogin,
   }
}

export { setPage, setShowToast, setIsLogin }
