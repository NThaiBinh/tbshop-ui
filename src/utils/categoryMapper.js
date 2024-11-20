function categoryMapper(categoryInfo) {
   return {
      categoryId: categoryInfo.MADM,
      name: categoryInfo.TENDM,
      createdAt: categoryInfo.NGAYTAO,
      updatedAt: categoryInfo.NGAYCAPNHAT,
   }
}

export { categoryMapper }
