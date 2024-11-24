function manufacturerMapper(manufacturerInfo) {
   return {
      manufacId: manufacturerInfo.MANSX,
      name: manufacturerInfo.TENNSX,
      image: manufacturerInfo.ANHNSX,
      phoneNumber: manufacturerInfo.SDTNSX,
      email: manufacturerInfo.EMAILNSX,
      address: manufacturerInfo.DIACHINSX,
   }
}

export { manufacturerMapper }
