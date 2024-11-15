function manufacturerMapper(manufacturerInfo) {
   return {
      manufacId: manufacturerInfo.MANSX,
      manufacImage: manufacturerInfo.ANHNSX,
      name: manufacturerInfo.TENNSX,
      phoneNumber: manufacturerInfo.SDTNSX,
      email: manufacturerInfo.EMAIL,
      address: manufacturerInfo.DIACHINSX,
      createAt: manufacturerInfo.NGAYTAO,
      updateAt: manufacturerInfo.NGAYCAPNHAT,
   }
}

export { manufacturerMapper }
