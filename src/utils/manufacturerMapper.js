function manufacturerMapper(manufacturerInfo) {
   return {
      manufacId: manufacturerInfo.MANSX,
      manufacImage: manufacturerInfo.ANHNSX,
      name: manufacturerInfo.TENNSX,
      phoneNumber: manufacturerInfo.SDTNSX,
      email: manufacturerInfo.EMAIL,
      address: manufacturerInfo.DIACHINSX,
      createdAt: manufacturerInfo.NGAYTAO,
      updatedAt: manufacturerInfo.NGAYCAPNHAT,
   }
}

export { manufacturerMapper }
