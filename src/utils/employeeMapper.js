function employeeMapper(employeeInfo) {
   return {
      userId: employeeInfo.MANV,
      accountId: employeeInfo.MATK,
      positionId: employeeInfo.MACV,
      name: employeeInfo.TENNV,
      image: employeeInfo.ANHNV,
      birth: employeeInfo.NGAYSINHNV,
      address: employeeInfo.DIACHINV,
      phoneNumber: employeeInfo.SDTNV,
      email: employeeInfo.EMAILNV,
      createdAt: employeeInfo.NGAYTAO,
      updatedAt: employeeInfo.NGAYCAPNHAT,
   }
}

export { employeeMapper }
