import { productDiscountMapper } from './productDiscountMapper'
import { storewideDiscountMapper } from './storewideDiscountMapper'

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
      productDiscounts: productInfo.DANHSACHKHUYENMAI,
      discountPercentage: productInfo.PHANTRAMGIAM,
      discountPrice: productInfo.GIAKM,
      storewideDiscounts: productInfo.DANHSACHKHUYENMAICHUNG,
   }
}

function productDetailMapper(productDetailInfo) {
   return {
      productInfo: {
         productId: productDetailInfo.productInfo.MASP,
         manufacId: productDetailInfo.productInfo.MANSX,
         categoryId: productDetailInfo.productInfo?.MADM,
         productTypeId: productDetailInfo.productInfo?.MALOAISP,
         name: productDetailInfo.productInfo.TENSP,
         price: productDetailInfo.productInfo.GIASP,
         discountPrice: productDetailInfo.productInfo.GIAKM,
         discountPercentage: productDetailInfo.productInfo.PHANTRAMGIAM,
         quantity: productDetailInfo.productInfo.SOLUONGTON,
         productDiscounts: productDetailInfo.productInfo.DANHSACHKHUYENMAI
            ? productDetailInfo.productInfo.DANHSACHKHUYENMAI.map((productDiscount) =>
                 productDiscountMapper(productDiscount),
              )
            : null,
         storewideDiscounts: productDetailInfo.productInfo.DANHSACHKHUYENMAICHUNG
            ? productDetailInfo.productInfo.DANHSACHKHUYENMAICHUNG.map((storewideDiscount) =>
                 storewideDiscountMapper(storewideDiscount),
              )
            : null,
         createdAt: productDetailInfo.productInfo.NGAYTAO,
         updatedAt: productDetailInfo.productInfo.NGAYCAPNHAT,
      },
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
