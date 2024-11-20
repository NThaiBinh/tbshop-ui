function productDiscountMapper(productDiscountInfo) {
   return {
      productDiscountId: productDiscountInfo.MAKM,
      productId: productDiscountInfo.MASP,
      name: productDiscountInfo.TENKM,
      price: productDiscountInfo.GIAKM,
      startDate: productDiscountInfo.NGAYBATDAU,
      endDate: productDiscountInfo.NGAYKETTHUC,
      createdAt: productDiscountInfo.NGAYTAO,
      updatedAt: productDiscountInfo.NGAYCAPNHAT,
   }
}

export { productDiscountMapper }