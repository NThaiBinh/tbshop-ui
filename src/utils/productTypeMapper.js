function productTypeMapper(productTypeInfo) {
   return {
      productTypeId: productTypeInfo.MALOAISP,
      name: productTypeInfo.TENLOAISP,
      createdAt: productTypeInfo.NGAYTAO,
      updatedAt: productTypeInfo.NGAYCAPNHAT,
   }
}

export { productTypeMapper }
