function invoiceItemMapper(invoiceInfo) {
   return {
      invoiceId: invoiceInfo.MAHD,
      productId: invoiceInfo.MASP,
      productConfigurationId: invoiceInfo.MACAUHINH,
      productColorId: invoiceInfo.MAMAUSP,
      name: invoiceInfo.TENSP,
      image: invoiceInfo.ANHSP,
      stockQuantity: invoiceInfo.SOLUONGTON,
      color: invoiceInfo.TENMAUSP,
      storageCapacity: invoiceInfo.DUNGLUONG,
      cpu: invoiceInfo.CPU,
      gpu: invoiceInfo.GPU,
      ram: invoiceInfo.RAM,
      quantity: invoiceInfo.SOLUONGSP,
      price: invoiceInfo.GIA,
      totalPrice: invoiceInfo.TONGTIEN,
      status: invoiceInfo.TRANGTHAI,
   }
}

export { invoiceItemMapper }
