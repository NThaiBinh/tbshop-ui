function productTypeMapper(productTypeInfo) {
   return {
      productTypeId: productTypeInfo.MALOAISP,
      name: productTypeInfo.TENLOAISP,
      createAt: productTypeInfo.NGAYTAO,
      updateAt: productTypeInfo.NGAYCAPNHAT,
   }
}

export { productTypeMapper }
