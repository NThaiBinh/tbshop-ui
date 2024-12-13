function storeInfoMapper(storeInfo) {
   return {
      name: storeInfo.TENCUAHANG,
      address: storeInfo.DIACHICUAHANG,
      phoneNumber: storeInfo.SDTCUAHANG,
      email: storeInfo.EMAILCUAHANG,
      image: storeInfo.LOGO,
   }
}

export { storeInfoMapper }
