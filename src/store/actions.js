import {
   SET_INFO_EMPLOYEE,
   SET_POSITION_INFO,
   SET_INPUT_VALUE,
   SET_LOCATION,
   SET_PAGE,
   SET_SHOW_TOAST,
   SET_NSX,
} from './constant'

function setSearchValue(payload) {
   return {
      type: SET_INPUT_VALUE,
      payload,
   }
}

function setNSX(payload) {
   return {
      type: SET_NSX,
      payload,
   }
}
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

function setInfoEmployee(payload) {
   return {
      type: SET_INFO_EMPLOYEE,
      payload,
   }
}

function setPositionInfo(payload) {
   return {
      type: SET_POSITION_INFO,
      payload,
   }
}

function setLocation(payload) {
   return {
      type: SET_LOCATION,
      payload,
   }
}

export { setSearchValue, setPage, setShowToast, setInfoEmployee, setPositionInfo, setLocation, setNSX }
