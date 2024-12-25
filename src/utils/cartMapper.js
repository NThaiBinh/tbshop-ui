function cartMapper(cartInfo) {
   return {
      cartId: cartInfo.MAGIOHANG,
      totalCartItem: cartInfo.SOSP,
   }
}

function cartItemMapper(cartItemInfo) {
   return {
      cartId: cartItemInfo.MAGIOHANG,
      productId: cartItemInfo.MASP,
      productConfigurationId: cartItemInfo.MACAUHINH,
      productColorId: cartItemInfo.MAMAUSP,
      name: cartItemInfo.TENSP,
      image: cartItemInfo.ANHSP,
      stockQuantity: cartItemInfo.SOLUONGTON,
      color: cartItemInfo.TENMAUSP,
      storageCapacity: cartItemInfo.DUNGLUONG,
      cpu: cartItemInfo.CPU,
      gpu: cartItemInfo.GPU,
      ram: cartItemInfo.RAM,
      quantity: cartItemInfo.SOLUONGSP,
      price: cartItemInfo.GIA,
      totalPrice: cartItemInfo.TONGTIEN,
      status: cartItemInfo.TRANGTHAI,
      discountList: cartItemInfo.DANHSACHKHUYENMAI
         ? cartItemInfo.DANHSACHKHUYENMAI.map((discount) => discountCarItemMapper(discount))
         : null,
   }
}

function discountCarItemMapper(discount) {
   return {
      discountId: discount.MAKM,
      discountName: discount.TENKM,
      discountPrice: discount.GIAKM,
      startDate: discount.NGAYBATDAU,
      endDate: discount.NGAYKETTHUC,
   }
}

export { cartMapper, cartItemMapper, discountCarItemMapper }
