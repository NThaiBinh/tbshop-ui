import { IS_LOGIN, IS_USER_UPDATE, SET_IS_UPDATE, SET_PAGE, SET_SEARCH_DASHBROAD, SET_SHOW_TOAST } from './constant'

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

function setIsUserUpdate(isUserUpdate) {
   return {
      type: IS_USER_UPDATE,
      isUserUpdate,
   }
}

function setSearchDashbroad(searchValue) {
   return {
      type: SET_SEARCH_DASHBROAD,
      searchValue,
   }
}

function setIsUpdate(isUpdate) {
   return {
      type: SET_IS_UPDATE,
      isUpdate,
   }
}

export { setPage, setShowToast, setIsLogin, setIsUserUpdate, setSearchDashbroad, setIsUpdate }
