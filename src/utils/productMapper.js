function productMapper(productInfo) {
   return {
      productId: productInfo.MASP,
      categoryId: productInfo.MADM,
      manufacId: productInfo.MANSX,
      productTypeId: productInfo.MALOAISP,
      name: productInfo.TENSP,
      price: productInfo.GIASP,
      quantity: productInfo.SOLUONGTON,
      createdAt: productInfo.NGAYTAO,
      updatedAt: productInfo.NGAYCAPNHAT,
   }
}

function productInfoMapper(productInfo) {
   return {
      productId: productInfo.MASP,
      productConfigurationId: productInfo.MACAUHINH,
      productImage: productInfo.ANHSP,
      name: productInfo.TENSP,
      cpu: productInfo.CPU,
      gpu: productInfo.GPU,
      monitor: productInfo.MANHINH,
      resolution: productInfo.DOPHANGIAI,
      refreshRate: productInfo.TANGSOQUET,
      storageCapacity: productInfo.DUNGLUONG,
      ram: productInfo.RAM,
      charging: productInfo.SAC,
      price: productInfo.GIASP,
      createdAt: productInfo.NGAYTAO,
      updatedAt: productInfo.NGAYCAPNHAT,
   }
}

function productDetailMapper(productDetailInfo) {
   return {
      productInfo: {
         categoryId: productDetailInfo.productInfo.MADM,
         productTypeId: productDetailInfo.productInfo.MALOAISP,
         manufacId: productDetailInfo.productInfo.MANSX,
         name: productDetailInfo.productInfo.TENSP,
         quantity: productDetailInfo.productInfo.SOLUONGTON,
         price: productDetailInfo.productInfo.GIASP,
      },
      productColors: [],
      productConfiguration: {
         operatingSystem: productDetailInfo.productConfiguration.HEDIEUHANH,
         cpu: productDetailInfo.productConfiguration.CPU,
         gpu: productDetailInfo.productConfiguration.GPU,
         core: productDetailInfo.productConfiguration.SONHAN,
         threads: productDetailInfo.productConfiguration.SOLUONG,
         cpuSpeed: productDetailInfo.productConfiguration.TOCDOCPU,
         maxSpeed: productDetailInfo.productConfiguration.TOCDOTOIDA,
         cacheCPU: productDetailInfo.productConfiguration.BONHODEM,
         ram: productDetailInfo.productConfiguration.RAM,
         ramType: productDetailInfo.productConfiguration.LOAIRAM,
         monitor: productDetailInfo.productConfiguration.MANHINH,
         resolution: productDetailInfo.productConfiguration.DOPHANGIAI,
         refreshRate: productDetailInfo.productConfiguration.TANGSOQUET,
         colorCoverage: productDetailInfo.productConfiguration.DOPHUMAU,
         monitorTechnology: productDetailInfo.productConfiguration.CONGNGHEMANHINH,
         brightness: productDetailInfo.productConfiguration.DOSANG,
         storageCapacity: productDetailInfo.productConfiguration.DUNGLUONG,
         availableStorageCapacity: productDetailInfo.productConfiguration.DUNGLUONGKHADUNG,
         frontCamera: productDetailInfo.productConfiguration.CAMERATRUOC,
         frontCameraTechnology: productDetailInfo.productConfiguration.CONGNGHECAMERATRUOC,
         backCamera: productDetailInfo.productConfiguration.CAMERASAU,
         backCameraTechnology: productDetailInfo.productConfiguration.CONGNGHECAMERASAU,
         charging: productDetailInfo.productConfiguration.SAC,
         material: productDetailInfo.productConfiguration.CHATLIEU,
         weight: productDetailInfo.productConfiguration.KHOILUONG,
         port: productDetailInfo.productConfiguration.CONGGIAOTIEP,
         wireless: productDetailInfo.productConfiguration.KHONGDAY,
         keyboardLight: productDetailInfo.productConfiguration.DENBANPHIM,
      },
   }
}

function productImageMapper(productImageInfo) {
   return {
      imageId: productImageInfo.MAANH,
      image: productImageInfo.ANHSP,
   }
}

function productColorsMapper(productColorsInfo) {
   return {
      productColorId: productColorsInfo.MAMAUSP,
      productConfigurationId: productColorsInfo.MACAUHINH,
      color: productColorsInfo.MAUSP,
      name: productColorsInfo.TENMAUSP,
   }
}

export { productMapper, productInfoMapper, productDetailMapper, productImageMapper, productColorsMapper }
