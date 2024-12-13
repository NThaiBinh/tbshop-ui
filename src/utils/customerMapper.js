function customerMapper(customerInfo) {
   return {
      userId: customerInfo.MAKH,
      accountId: customerInfo.MATK,
      name: customerInfo.TENKH,
      image: customerInfo.ANHKH,
      birth: customerInfo.NGAYSINHKH,
      address: customerInfo.DIACHIKH,
      phoneNumber: customerInfo.SDTKH,
      email: customerInfo.EMAILKH,
      createdAt: customerInfo.NGAYTAO,
      updatedAt: customerInfo.NGAYCAPNHAT,
   }
}

function customerAddressMapper(customerAddressInfo) {
   return {
      addressId: customerAddressInfo.MADIACHI,
      customerId: customerAddressInfo.MAKH,
      address: customerAddressInfo.DIACHIGIAO,
      isDefault: customerAddressInfo.MACDINH,
   }
}

export { customerMapper, customerAddressMapper }
