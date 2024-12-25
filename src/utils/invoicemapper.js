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

function invoicePrintMapper(invoicePrintInfo) {
   return {
      status: invoicePrintInfo.TRANGTHAI,
      invoiceId: invoicePrintInfo.MAHD,
      customerName: invoicePrintInfo.TENKH,
      address: invoicePrintInfo.DIACHIGIAO,
      phoneNumber: invoicePrintInfo.SDTKH,
      employeeName: invoicePrintInfo.TENNV,
      totalPrice: invoicePrintInfo.TONGTIEN,
      createdAt: invoicePrintInfo.NGAYTAO,
      discountList: invoicePrintInfo.DANHSACHKHUYENMAI?.map((discount) => {
         return {
            discountName: discount.TENKM,
            discountPrice: discount.GIAKM,
            applyTo: discount.TENSP,
         }
      }),
      productList: invoicePrintInfo?.DANHSACHSANPHAM.map((product) => {
         return {
            productName: product.TENSP,
            price: product.GIA,
            quantity: product.SOLUONGSP,
            totalPrice: product.TONGTIEN,
         }
      }),
   }
}

export { invoiceItemMapper, invoicePrintMapper }
