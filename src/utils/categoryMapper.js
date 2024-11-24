function categoryMapper(categoryInfo) {
   return {
      categoryId: categoryInfo.MADM,
      name: categoryInfo.TENDM,
   }
}

export { categoryMapper }
