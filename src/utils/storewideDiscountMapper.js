function storewideDiscountMapper(storewideDiscountInfo) {
   return {
      storewideDiscountId: storewideDiscountInfo.MAKMCHUNG,
      name: storewideDiscountInfo.TENKM,
      image: storewideDiscountInfo.ANHKM,
      price: storewideDiscountInfo.GIAKM,
      startDate: storewideDiscountInfo.NGAYBATDAU,
      endDate: storewideDiscountInfo.NGAYKETTHUC,
      createdAt: storewideDiscountInfo.NGAYTAO,
      updatedAt: storewideDiscountInfo.NGAYCAPNHAT,
   }
}

function storewidePosterDiscountMapper(storewidePosterDiscountInfo) {
   return {
      posterDiscount: storewidePosterDiscountInfo.ANHKM,
   }
}

export { storewideDiscountMapper, storewidePosterDiscountMapper }
