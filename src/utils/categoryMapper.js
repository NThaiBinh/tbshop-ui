function categoryMapper(categoryInfo) {
   return {
      categoryId: categoryInfo.MADM,
      name: categoryInfo.TENDM,
      createAt: categoryInfo.NGAYTAO,
      updateAt: categoryInfo.NGAYCAPNHAT,
   }
}

export { categoryMapper }
