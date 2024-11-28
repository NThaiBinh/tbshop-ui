function customerMapper(customerInfo) {
   return {
      userId: customerInfo.MAKH,
      accountId: customerInfo.MATK,
      name: customerInfo.TENKH,
      image: customerInfo.ANHNV,
      birth: customerInfo.NGAYSINHNV,
      address: customerInfo.DIACHINV,
      phoneNumber: customerInfo.SDTNV,
      email: customerInfo.EMAILNV,
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
